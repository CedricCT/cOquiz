const CoreModel = require('./coreModel');

class Question extends CoreModel {

    static tableName = 'question';
    question;
    anecdote;
    wiki;
    level_id;
    answer_id;
    quiz_id;

    constructor(obj) {
        super(obj);
        this.question = obj.question;
        this.anecdote = obj.anecdote;
        this.wiki = obj.wiki;
        this.level_id = obj.level_id;
        this.answer_id = obj.answer_id;
        this.quiz_id = obj.quiz_id;

        //version rapide
        //super(obj);
        // for (const propName in obj) {
        //    if (propName !== 'id') {
        //      this[propName] = obj[propName];
        //    }
        // }
    }
}

module.exports = Question;