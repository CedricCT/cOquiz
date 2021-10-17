const db = require('../database');

class CoreModel {

    static tableName = null;


    //on protège l'accès à la propriété en précédant son d'un #
    //on dit que cette propriété est privée, uniquement accessible dans le code de la classe
    #id;

    constructor(obj) {
        this.#id = obj.id;
    }

    // getId() {
    //     return this.#id
    // }

    //setId(newValue) {
        //verifs de l'intégrité
        //et pour finir, quand on a décidé que la value était cohérent
        //this.#id = newValue;
    //}

    //on déclare ici une fonction bizarre (avec un espace au milieu du nom) et le plus curieux dans l'histoire, c'est qu'on va l'utiliser comme si c'était une propriété
    // console.log(levelInstance.id)

    //un getter permet de lire la valeur d'une propriété cachée
    get id() {
        return this.#id;        
    }


    //un setter permet de mettre à jour la valeur d'une prorpiété cachée
    //en général, on profite de ce setter pour mettre en place une validation de l'intégrité de la data

    set id(newValue) {
        if (typeof newValue !== 'number') {
            console.error('id doit être un nombre');
        } else if (newValue < 0) {
            console.error('id doit être un entier positif');
        } else {
            this.#id = newValue;
        }
    }

    //on doit ici factoriser la partie variable de nos requête SQL (le nom de table) ainsi que le nom de class à utiliser pour générer l'instance du bon type
    //on a définit dans chaque modèle une propriété statique tableName qui contient une valeur différente pour chaque modèle.
    //Selon le modèle qui appellera la méthode findAll, la valeur de tableName s'adaptera et permettra d'interroger la "bonne" table en BDD
    //dans le contexte statique, this va contenir une référence à la classe, on peut s'en servir pour utiliser le bon constructeur afin de générer nos instances
    //User.findAll, this vaudra la class User, on peut remplacer l'appel à new User(...) par new this(...)
    //Encore une fois, selon le modèle qui va appeler la méthode, la valeur de this va changer, on aura toujours la "bonne" class pour générer nos instances
    
    static findAll(callback) {
                    //SELECT * FROM "user"
                    //SELECT * FROM "level"
        console.log('Dans un contexte statique, this vaut', this);
        console.log('Ici, tableName vaut', this.tableName);                       
        db.query(`SELECT * FROM "${this.tableName}"`, (error, result) => {
            if (error) {
                callback(error);
            } else {
                const instances = [];
                for (const row of result.rows) {
                    instances.push(new this(row));
                }
                //on a le tableau users qui contient des instances de User, les data sont prêtes à l'emploi, on les envoie au contrôleur
                callback(null, instances);
            }
        })
    }

    static findOne(id, callback) {
        db.query(`SELECT * FROM "${this.tableName}" WHERE id=$1`, [id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                if (result.rows.length === 0) {
                    callback(`Record in table ${this.tableName} with id ${id} not found`);
                } else {
                    //pour générer notre instance, on extrait le seul enregistrement renvoyé par la bdd du tableau de rows
                    const instance = new this(result.rows[0]);
                    callback(null, instance);
                }
            }
        });
    }

    insert(callback) {
        //dans ce contexte, this contient une référence vers un object et non plus vers la classe
        console.log('Que contient this.constructor dans un contexte d\'instance ?', this.constructor);

        console.log('Que contient this ici ?', this);

        //en statique, on avait this.tableName
        //en instance, le this static est égal à this.constructor
        const nomTable = `"${this.constructor.tableName}"`;

        // on déclare 3 tableaux ppur stocker :
        //- les noms des champs
        //-les valeurs des champs
        //- la position des champs dans la requête
        const fieldNames = [];
        const fieldValues = [];
        const fieldIndex = [];

        let index = 1;
        
        for (const propName in this) {

            fieldNames.push(`"${propName}"`);
            fieldValues.push(this[propName]);

            const indexValue = '$' + index;
            fieldIndex.push(indexValue);
            index++;

//              version très très raccourcie
//            fieldIndex.push(`$${index++}`);
        }

        console.log('fieldNames', fieldNames);
        console.log('fieldValues', fieldValues);
        console.log('fieldIndex', fieldIndex);

        const preparedQuery = {
            text: `INSERT INTO ${nomTable} (${fieldNames.join(', ')}) VALUES(${fieldIndex.join(', ')}) RETURNING id`,
            values: fieldValues
        }

        console.log('Query SQL :', preparedQuery.text);

        db.query(preparedQuery, (error, result) => {
            if (error) {
                callback(error);
            } else {
                this.id = result.rows[0].id;
                callback(null, this);
            }
        })
    }

    update(callback) {
        const nomTable = `"${this.constructor.tableName}"`;

        let index = 1;
        const fieldValues = [];
        const fieldUpdates = [];

        for (const propName in this) {
            fieldValues.push(this[propName]);

            fieldUpdates.push(`"${propName}"=$${index}`);
            index++;

        }
        fieldValues.push(this.id);

        console.log('fieldValues', fieldValues);
        console.log('fieldUpdates', fieldUpdates);

        const preparedQuery = {
            text: `UPDATE ${nomTable} SET ${fieldUpdates.join(', ')} WHERE id=$${index}`,
            values: fieldValues
        };

        console.log(preparedQuery.text);
        db.query(preparedQuery, (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null, this);
            }
        });
    }

    delete(callback) {
        db.query(`DELETE FROM "${this.constructor.tableName}" WHERE id=$1`, [this.id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                callback(null, true);
            }
        })
    }

    static findBy(params, callback) {

        const criteres = [];
        const values = [];
        let index = 1;

        for (const param in params) {

            //nom_param=$x

            /*
                version un chouille plus longue

                const position = '$' + index;
                const critere = param + '=' + position;
                criteres.push(critere);
                index++;

            */

            // criteres.push(`${param} ILIKE $${index++}`);
            // values.push(`%${params[param]}%`);

            //tuyau de magic Jean : on,peut utiliser la concaténation SQL pour s'en tirer
            criteres.push(`${param} ILIKE '%' || $${index++} || '%'`);
            values.push(params[param]);

        }

        console.log('criteres', criteres);
        console.log('values', values);

        const preparedQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE ${criteres.join(' AND ')}`,
            values
        }
        console.log(preparedQuery.text);
        db.query(preparedQuery, (error, result) => {
            if (error) {
                callback(error);
            } else {
                const instances = [];
                for (const row of result.rows) {
                                    //new User(row)
                                    //new Level(row)
                                    // ...
                    instances.push(new this(row));
                }
                callback(null, instances);
            }
        });
    }

    save(callback) {
        //pour déterminer si une instance a déjà été enregistrée en BDD, on peut se contenter de vérifier si notre instance a une propriété id !== de undefined

        //En effet, cet id nous est fourni par postgres au moment de l'insertion, s'il n'est pas présent c'est donc que l'insertion n'a pas encore eu lieu
        console.log('Est-ce qu\'on a un id ?', this.id);
        if (this.id) {
            console.log('id présent, on update');
            this.update(callback);
        } else {
            console.log('id non renseigné, on insert');
            this.insert(callback);
        }
    }
}

module.exports = CoreModel;

//CoreModel.findAll
 //SELECT * FROM null

// User.findAll
// //SELECT * FROM "user"

