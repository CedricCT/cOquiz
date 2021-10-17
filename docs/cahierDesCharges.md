# Cahier des charges

- créer une plateforme de quiz
- un élève doit pouvoir se connecter pour répondre à des quizzes
- Structure d'un quiz : titre, une thématique, sujets liés, auteur
- Question : réponses possibles, contexte (anecdote, infos ...), difficulté/niveau
- Après le quiz : affichage du score, les bonnes réponses
- Pas de stockage des scores !!
- Le client souhaite pouvoir valider la structure de la BDD
- Interface d'administration du site (création des questions, des réponses, des quizzes, des auteurs, ...)


# Nos notes

Chaque élève peut se connecter pour répondre à des quiz

BDD: titre, thématique(cosmologie, informatique, culture G..), sujets(espace, univers...), un auteur par quiz, questions par quiz, réponses possible, contexte(anecdotes, infos), difficulté

Concernant la zone de connexion, on arrive sur l'ensenmble des quiz, 

en sélectionnant un quiz on peut répondre aux questions, on valide et 

après on arrive sur une page de récap => pas besoin de stocker ça.

plateforme de quiz avec :
- structure de BDD
- connexion pour chaque élève

Chaque quiz :
- titre
- thème
- sujets relatifs au thème
- auteur


- question
- niveau de difficultés
- informations annexes

- reponses possibles

Chaque fois qu'on joue :
- on se connecte
- on fait le quiz
- on valide
- on récapitule les scores
- pas besoin de stocker les résultats

BDD :
- structure de la BDD
- s'organisera avec PHP my admin
- pas besoin d'interface pour la BDD
- on devra expliquer la structure de la BDD => MCD


structure de BDD

un quizz, avec espace de connection


élève : se connecter à une interfacef pr rép à des quiz

1 quiz :
- titre
- thématique !!!!!
- sujets !! relatifs au quiz
- auteur (signé)
- questions (explication sur le côté) réponses possibles, contexte, difficulté (débutant, confirmé, expert)

-- valider
=> récap (+ score)
pas besoin de stocker ça ds la plateforme

!! structure de la BDD

zone de connexion

un scoring mais non stocké en BDD

les THEMATIQUE lui tiennent à coeur aussi il l'a bien répété x)

un quizz avec auteur, sujet et thèmmatique, TOUJOURS afficher l'auteur du quiz ... affiner les questions sur des thème en fonctiones des sujets

un. projet avec une structure BDD pour une école. Créer une plateforme de quizz, avec login pour les élèves. Quizz structurer :
-titre / -thèmes / sujet relatif / auteur
Chaque quizz aura des question :
-types de questions / explication sur le côté / contexte / difficulté
Un bouton Validé
pas besoin de stocké les scores en BDD