// {
//     id: 1,
//     name: 'difficile'
// }

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

    debug() {
        return `Level d'id ${this.id} : ${this.#name}`;
    }
}

module.exports = Level;