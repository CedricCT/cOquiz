// {
//     id: 1,
//     name: 'difficile'
// }

const db = require('../database');

const CoreModel = require('./coreModel');

class Level extends CoreModel {

    static tableName = 'level';

    name;

    //on veut mapper les champs de la BDD dans des propriétés de la class
    constructor(obj) {
        super(obj);
        this.name = obj.name;
    }

    debug() {
        return `Level d'id ${this.id} : ${this.name}`;
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