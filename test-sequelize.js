require('dotenv').config();

const {Level, User, Quiz, Question} = require('./app/models/');

//on va trouver des équivalents à toutes les méthodes qu'on a définies dans le CoreModel

//on utilise toujours les callbacks pour gérer les résultats ou les erreurs
//pour les résultats : on met le code de la fonction dans .then
//pour les erreurs, on met le code de la fonction dans .catch


//findAll
// Level.findAll().then(levels => {
//     console.log('On a eu des résultats !');
//     for (const level of levels) {
//         console.log(level.debug());
//     }
// }).catch(error => {
//     console.log('On a eu un pépin', error);
// });

// //findOne version CoreModel devient findByPk (pk = primary key) dans sequelize
// Level.findByPk(5).then(level => {
//     console.log(level.debug());
// }).catch(error => {
//     console.log('On a eu un pépin', error);
// });

//les méthodes insert et update qu'on a cumulée dans une méthode save du CoreMdel sont retrouvées dans la méthode save des modèles sequelize
// const level = new Level({
//     name: 'encore plus dur que très dur'
// });
// level.save().then(newLevel => {
//     console.log(newLevel);
//     console.log(newLevel.debug());
// })

// Level.findByPk(6).then(level => {
//     level.name = 'pas si du que ça finalement';
//     level.save().then(updatedLevel => {
//         console.log(updatedLevel.debug());
//     })
// });

//delete dans le CoreModel devient destroy dans sequelize

// Level.findByPk(6).then(level => {
//     level.destroy().then(iDontKnow => {
//         //on récupère un tableau vide, pas franchement utile ici
//         console.log(iDontKnow);
//     })
// });

// new User({
//     lastname: 'Charpin',
//     firstname: 'Nico',
//     email: 'q@s.fr',
//     password: '123456'
// }).save().then(user => {
//     console.log(user.debug())
// }).catch(error => {
//     console.log(error);
// });


// User.findByPk(1, {
//     //en ajoutant include, on indique à Sequelize de faire un JOIN ON en utilisant l'association quizzes définie dans models/index.js
//     //sequelize ajoute une propriété quizzes à notre instance de User
//     //cette proriété va contenir un tableau de tous les quizzes écrits par cet utilisateur
//     //include accepte une string, un object, un tableau
//     include: 'quizzes'
// }).then(user => {
//     console.log(user);
// });

Quiz.findByPk(5, {
    include: 'author'
}).then(quiz => {
    console.log(`Quiz ${quiz.id} est écrit par ${quiz.author.fullname}`)
});


//on veut le quie d'id 15 avec
// - son auteur
//- ses tags
//- ses questions

// Quiz.findByPk(15, {
//     include: ['author', 'tags', 'questions']
// }).then(quiz => {
//     console.log('Auteur du quiz :', quiz.author.fullname);
//     console.log('Nb de thèmes du quiz :', quiz.tags.length);
//     console.log('Nb de questions du quiz :', quiz.questions.length);
//     //on affiche toutes les questions du quiz
//     for (const question of quiz.questions) {
//         console.log('Id de la question : ', question.id);
//     }
// })


// const controller = {
//     quizAndInfos: (request, response) => {
//         Quiz.findByPk(12, {
//             include: 'author'
//         }).then(quiz => {
//             response.render('quiz', {quiz})
//         })
//     }
// }


//niveau débutant, les questions de ce niveau, pour chaque question, le quiz associé et pour chaque quiz son auteur

// Level.findByPk(1, {
//     include: {
//         association: 'questions',
//         include: {
//             association: 'quiz',
//             include: ['author', 'tags']
//         }
//     }
// }).then(level => {
//     console.log('Niveau ', level.name);
//     console.log('Nb de questions de ce niveau: ', level.questions.length);
//     //on étudie ce qu'on a dans la 1ère question du tableau
//     const question = level.questions[0];
//     console.log('Quiz de la 1ère question: ', question.quiz.title);
//     console.log('Auteur de ce quiz: ', question.quiz.author.fullname)

// })

//exemple avec findOne
// Level.findOne({
//     where: {
//         name: 'Débutant'
//     }
// })

Question.findByPk(7, {
    include: {
        association: 'quiz',
        include: ['author', 'tags']
    }
}).then(question => {
    console.log('texte de la question', question.question);
    console.log('Quiz de la question', question.quiz.title);
    console.log('Auteur du quiz de la question', question.quiz.author.fullname);
    console.log('Nb de thèmes de quiz de la question', question.quiz.tags.length);
});
