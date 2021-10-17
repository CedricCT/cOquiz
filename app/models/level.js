
const sequelize = require('../database');

//on ajoute au modèle les classes du package sequelize dont on aura besoin
const {Model, DataTypes} = require('sequelize');

class Level extends Model {
    debug() {
        return `Level d'id ${this.id} : ${this.name}`;
    }
}

//on utilise ici une méthode statique init, héritée de Model
//avec cette méthode, on fait le lien entre la version JS du modèle et la table en BDD
//cette méthode nous sert à configurer les propriétés autres que id du modèle ainsi que la table correspondante en BDD
Level.init({
    //1er argument: un object qui décrit les propriétés de notre modèle
    //pas besoin de définir id, il est automatiquement pris en compte par sequelize
    name: DataTypes.STRING

}, {
    //2ème argument : un object avec les infos de connexion
    //instance du client sequelize en utilisant la notation ES6
    sequelize,
    //on indique le nom de la table dans la BDD
    tableName: 'level'
})

module.exports = Level;