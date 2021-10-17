# Règles d'intégration des associations dans le MLD

On va étudier les cardinalités max entre 2 entités  
On peut avoir 3 cas différents :

- max 1,1 : on place une clé étrangère dans l'une des entités, là où ça parait le plus logique
- max 1,n : on place une clé étrangère sur l'entité qui a 1 en max
- max n,n : on va devoir ajouter une table supplémentaire pour faire la liaison entre les 2 entités


utilisateur (id SERIAL, nom TEXT, prenom TEXT, email TEXT UNIQUE, password TEXT)
quiz (id SERIAL, titre TEXT, description TEXT, #utilisateur(id) INT)
theme (id SERIAL, nom TEXT)
question (id SERIAL, description TEXT, anecdote TEXT, wiki TEXT, #quiz(id) INT, #niveau(id) INT, #reponse(id) INT)
niveau (id SERIAL, nom TEXT)
reponse (id SERIAL, description TEXT, #question(id) INT)
quiz_appartient_theme (#quiz(id) INT, #theme(id) INT)