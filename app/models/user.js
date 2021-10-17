const sequelize = require('../database');

const {Model, DataTypes} = require('sequelize');

class User extends Model {

    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }

    debug() {
        return `User with id ${this.id} : ${this.fullname}`;
    }
}

User.init({
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
}, {
    sequelize,
    tableName: 'user'
})


module.exports = User;