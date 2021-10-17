const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');

//mise en place des relations

/* on va avoir 
3 cas de cardinalités max :

max à 1,1
on utilise la méthode belongsTo sur la table qui détient la clé étangère
pas de contrepartie sur l'autre table dans ce cas

max 1,n
Pour la table qui détient le n, on utilise la méthode hasMany
Pour la table qui détient le 1, on utilise la méthode belongsTo

max à n,n
On passe par une table intermédiaire pour stocker les relations entre les entités
on va utiliser la méthode belongsToMany sur les 2 modèles en indiquant le nom de la table  intermédiaire et les clés étrangères dans cette table de liaison


*/


//un utilisateur peut être l'auteur de plein de quiz (n) => hasMany
//1er argument : le modèle qu'on veut lier
//2ème argument : object de configuration

User.hasMany(Quiz, {
    //la clé étrangère qu'on doit retrouver dans quiz
    foreignKey: 'user_id',
    //le nom qu'on souhaite donner aux quizzes dans l'instance de user si on fait un join
    as: 'quizzes'
});

//un quiz n'a qu'un seul auteur (1) => methode belongsTo
Quiz.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'author'
});

//entre Quiz et Question

Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    as: 'questions'
});


Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    as: 'quiz'
});

//entre Question et Level
Question.belongsTo(Level, {
    foreignKey: 'level_id',
    as: 'level'
});

Level.hasMany(Question, {
    foreignKey: 'level_id',
    as: 'questions'
});

//entre Question et Answer (réponses possibles)
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers'
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
});

//association bonne réponse
Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'good_answer'
});


//un qui peut avoir plusieurs thèmes
Quiz.belongsToMany(Tag, {
    //le nom du champ de Quiz dans la table intermédiaire
    foreignKey: 'quiz_id',
    //le nom du champ de Tag dans la table intermédiaire
    otherKey: 'tag_id',
    //le nom de la propriété dans Quiz si on fait un JOIN
    as: 'tags',
    //le nom de la table intermédiaire
    through: 'quiz_has_tag'
});

Tag.belongsToMany(Quiz, {
    foreignKey: 'tag_id',
    otherKey: 'quiz_id',
    as: 'quizzes',
    through: 'quiz_has_tag'
});

module.exports = {
    Answer,
    Level,
    Question,
    Quiz,
    Tag,
    User
}