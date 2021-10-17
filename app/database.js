//dans ce module, on a juste besoin de la class Sequelize incluse dans le package sequelize, on n'a pas besoin de toutes les autres fonctionnalités du package
//pour simplifier l'écriture du code, on extrait uniquement le (ou les) élément(s) dont on a besoin en utilisant le destructuring
const { Sequelize } = require('sequelize');

//sous le capot, sequelize va utiliser le package pg qu'on connait
//c'est pour ça qu'il FAUT l'avoir installé dans le projet
//(npm install pg)
//mais, nouverauté, on n'a plus besoin de le require nous-même

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        //on ajoute cette propriété pour désactiver l'ajout automatique des champs :
        //- createdAt
        //- updatedAt
        timestamps: false,
        //permet les noms en snake_case
        underscored: true
    }
});

//notre client est prêt, on l'exporte pour pouvoir l'utiliser dans le reste de l'appli
module.exports = sequelize;