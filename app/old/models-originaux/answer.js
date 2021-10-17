const CoreModel = require('./coreModel');

class Answer extends CoreModel {

    description;
    //pour rester cohérent avec les noms des champs en BDD, je choisis de laisser ma propriété en snake_case
    question_id;

    constructor(obj) {
        super(obj);
        this.description = obj.description;
        this.question_id = obj.question_id;
    }

    getLog() {
        return `Réponse d'id ${this.id} : ${this.description}`
    }
}

module.exports = Answer;