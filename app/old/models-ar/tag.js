const CoreModel = require('./coreModel');

class Tag extends CoreModel {

    name;

    //on veut mapper les champs de la BDD dans des propriétés de la class
    constructor(obj) {
        super(obj);
        this.name = obj.name;
    }
}

module.exports = Tag;