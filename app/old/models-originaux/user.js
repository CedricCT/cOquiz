const CoreModel = require('./coreModel');

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

}

module.exports = User;