//on sépare les préoccupations : SoC, Separation of Concerns
//ce module va uniquement gérer la connexion à la base oquiz

//on commence par importer la class Client du module pg
const {Client} = require('pg');

//on crée une instance en utilisant la variable d'enronnement PG_URL
//cette instance est notre moyen de transport entre JS et la BDD
const client = new Client(process.env.PG_URL);

//si vous préférez détailler toutes les variables d'environnement dans votre .env, vous devrez instancier le client sans argument
// const client = new Client();

//on connecte le client pour le rendre prêt à l'emploi
client.connect();
console.log(`Connection to DB ${process.env.PG_URL} successfull`);

//on place le client connecté dans l'export pour le rendre disponible dans le reste de l'appli
module.exports = client;