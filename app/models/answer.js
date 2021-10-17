const sequelize = require('../database');

const {Model, DataTypes} = require('sequelize');

class Answer extends Model {
    getLog() {
        return `Réponse d'id ${this.id} : ${this.description}`
    }
}

Answer.init({
    description: DataTypes.STRING
}, {
    sequelize,
    tableName: 'answer'
})

module.exports = Answer;