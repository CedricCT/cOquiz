// {
//     id: 1,
//     name: 'difficile'
// }

const db = require('../database');

const CoreModel = require('./coreModel');

class Level extends CoreModel {

    #name;

    //on veut mapper les champs de la BDD dans des propriétés de la class
    constructor(obj) {
        super(obj);
        this.#name = obj.name;
    }

    get name() {
        return this.#name;
    }

    set name(newValue) {
        this.#name = newValue;
    }

    debug() {
        return `Level d'id ${this.id} : ${this.#name}`;
    }

    //afin de créer des instances depuis le sinfos de la BDD, on a besoin de déclarer la méthode statique afin de pouvoir l'utiliser à partir du nom de la class (Level.findAll) et non à partir d'une instance qui n'existerait pas encore

    // d'une façon générale, dès qu'on fera un SELECT sur la base de données, on sera dans le sens BDD => JS, les méthodes seront statiques

    static findAll(callback) {
        db.query('SELECT * FROM level', (error, result) => {
            if (error) {
                callback(error);
            } else {
                //ici on est sûr d'avoir des infos dans result
                //au lieu de retourner directement le tableau de rows (meuble en kit), on va plutôt fabriquer des instances de Level (meuble monté) avant de revoyer les infos au contrôleur
                
                
                const levels = [];
                for (const row of result.rows) {
                    //le constructeur de Level saura mapper les propriétés des objects venant de la BDD dans ses propriétés d'instance
                    const level = new Level(row);
                    levels.push(level);
                }
                //on a le tableau levels qui contient des instances de Level, les data sont prêtes à l'emploi, on les envoie au contrôleur
                callback(null, levels);
            }
        });
    }

    static findOne(levelId, callback) {
        db.query('SELECT * FROM level WHERE id=$1', [levelId], (error, result) => {
            if (error) {
                callback(error);
            } else {

                if (result.rows.length === 0) {
                    callback(`Level with id ${levelId} not found`);
                } else {
                    //pour générer notre instance, on extrait le seul enregistrement renvoyé par la bdd du tableau de rows
                    const level = new Level(result.rows[0]);
                    callback(null, level);
                }
            }
        })
    }

    //pour insérer un nouvel enregistrement en BDD, on va partir des infos stockées dans une instance de Level pour fabriquer notre requête INSERT INTO ...
    //on est cette fois-ci dans le sens JS => BDD, la méthode dans level sera une méthode d'instance
    insert(callback) {
        //dans la requête on utilise RETURNING pour récupérer le nouvel id qui sera généré par postgres à l'insertion en BDD
        //on l'utilisera pour mettre à jour l'instance côté JS afin que l'instance et son enregistrement en BDD soient le miroir l'un de l'autre
        const preparedQuery = {
            text: 'INSERT INTO level (name) VALUES($1) RETURNING id',
            values: [this.name]
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

    update(callback) {
        const preparedQuery = {
            text: 'UPDATE level SET name=$1 WHERE id=$2',
            values: [this.name, this.id]
        };

        db.query(preparedQuery, (error, result) => {
            if (error) {
                callback(error);
            } else {
                //ssresult.rowCount va contenir le nombre de lignes modifiées par la requête update
                //si rowCount vaut 0, aucune ligne n'a été modifiée, c'est étonnant, faut prévenir le contrôleur
                if (result.rowCount === 0) {
                    //l'insertion n'a pas fonctionné comme il faut, on n'a pas reçu de nouvel id de la part de postgres
                    callback('Erreur lors de l\'update, aucun enregistrement mis à jour ...');
                } else {
                    callback(null, this);
                }

            }
        });
    }

    delete(callback) {
        db.query('DELETE FROM level WHERE id=$1', [this.id], (error, result) => {
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

module.exports = Level;