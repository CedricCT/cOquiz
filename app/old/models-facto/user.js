const CoreModel = require('./coreModel');
const db = require('../database');

class User extends CoreModel {

    static tableName = 'user';

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