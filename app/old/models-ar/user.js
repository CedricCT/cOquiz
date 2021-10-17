const CoreModel = require('./coreModel');
const db = require('../database');

class User extends CoreModel {

    email;
    password;
    lastname;
    firstname;

    constructor(obj) {
        super(obj);
        this.email = obj.email;
        this.password = obj.password;
        this.lastname = obj.lastname;
        this.firstname = obj.firstname;
    }

    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }

    debug() {
        return `User with id ${this.id} : ${this.fullname}`;
    }

    //récupérer tous les users : static
    static findAll(callback) {
        //gaffe au mot user, on va souvent avoirn une table user dans nos projets, il FAUT échapper ce nom car il a une signification pour postgres
        //en l'échappant, on indique au SGBD qu'on parle bien de la table user
        db.query('SELECT * FROM "user"', (error, result) => {
            if (error) {
                callback(error);
            } else {
                //ici on est sûr d'avoir des infos dans result
                //au lieu de retourner directement le tableau de rows (meuble en kit), on va plutôt fabriquer des instances de Level (meuble monté) avant de revoyer les infos au contrôleur
                
                
                const users = [];
                for (const row of result.rows) {
                    //le constructeur de User saura mapper les propriétés des objects venant de la BDD dans ses propriétés d'instance
                    users.push(new User(row));
                }
                //on a le tableau users qui contient des instances de User, les data sont prêtes à l'emploi, on les envoie au contrôleur
                callback(null, users);
            }
        });
    }


    //récupérer un user : static
    static findOne(userId, callback) {
        db.query('SELECT * FROM "user" WHERE id=$1', [userId], (error, result) => {
            if (error) {
                callback(error);
            } else {

                if (result.rows.length === 0) {
                    callback(`User with id ${userId} not found`);
                } else {
                    //pour générer notre instance, on extrait le seul enregistrement renvoyé par la bdd du tableau de rows
                    const user = new User(result.rows[0]);
                    callback(null, user);
                }
            }
        })
    }

    //insérer un nouveau user
    insert(callback) {
        //dans la requête on utilise RETURNING pour récupérer le nouvel id qui sera généré par postgres à l'insertion en BDD
        //on l'utilisera pour mettre à jour l'instance côté JS afin que l'instance et son enregistrement en BDD soient le miroir l'un de l'autre
        const preparedQuery = {
            text: 'INSERT INTO "user" (email, password, firstname, lastname) VALUES($1, $2, $3, $4) RETURNING id',
            values: [this.email, this.password, this.firstname, this.lastname]
        };

        db.query(preparedQuery, (error, result) => {
            if (error) {
                callback(error);
            } else {
                if (result.rows.length === 0) {
                    //l'insertion n'a pas fonctionné comme il faut, on n'a pas reçu de nouvel id de la part de postgres
                    callback('Erreur lors de l\'insertion ...');
                } else {
                    console.log('Reçu de la BDD', result.rows[0]);
                    this.id = result.rows[0].id;
                    //on renvoie l'instance mise à jour avec l'info de l'id au contrôleur
                    callback(null, this);
                }

            }
        });
    }

    //mettre à jour un user
    update(callback) {
        const preparedQuery = {
            text: 'UPDATE "user" SET email=$1, password=$2, firstname=$3, lastname=$4 WHERE id=$5',
            values: [this.email, this.password, this.firstname, this.lastname, this.id]
        };

        db.query(preparedQuery, (error, result) => {
            if (error) {
                callback(error);
            } else {
                //result.rowCount va contenir le nombre de lignes modifiées par la requête update
                //si rowCount vaut 0, aucune ligne n'a été modifiée, c'est étonnant, faut prévenir le contrôleur
                if (result.rowCount === 0) {
                    //la mise à jour n'a pas fonctionné comme il faut, on n'a pas reçu de nouvel id de la part de postgres
                    callback('Erreur lors de l\'update, aucun enregistrement mis à jour ...');
                } else {
                    callback(null, this);
                }

            }
        });
    }


    //supprimer un user
    delete(callback) {
        db.query('DELETE FROM "user" WHERE id=$1', [this.id], (error, result) => {
            if (error) {
                callback(error);
            } else {
                //lors d'un delete, result.rowCount contient le nombre de lignes en BDD affectées par la requête
                //en checkant la valeur de rowCount, on peut vérifier qu'au moins une ligne a été supprimée
                if (result.rowCount === 0) {
                    //aucune ligne supprimée ... ça sent le pépin
                    callback('Une erreur s\'est produite, aucun enregistrement supprimé');
                } else {
                    //rowCount est différent de 0, on a réussi à supprimer au moins un enregistrement dans la BDD
                    //ça n'aurait pas de sens de renvoyer l'instance courante au contrôleur puisque qu'on vient de la supprimer. ON lui renvoie donc un boolean pour lui indiquer simplement que tout s'est bien passé
                    callback(null, true);
                }
            }
        })
    }


}

module.exports = User;