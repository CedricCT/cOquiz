-- --------------------------------------------
-- Création des tables pour l'application oQuiz
-- --------------------------------------------

--A partir du MLD, on va "déduire" la structure de nos futures tables
-- quelques conventions de nommage :
-- on va nommer les tables au singulier, en anglais, en minuscule et en snake_case
-- si on tient absolument à avoir une majuscule dans un nom de table ou un nom de champ, on devra impérativement l'échapper avec des double quotes sinon postgres repassera tout en minuscule sans nous demander notre avis

-- On va sécuriser notre script en effectuant une transaction

-- BEGIN;
-- nos requêtes de création de tables
-- COMMIT;

-- Les requêtes vont être "prédigérées" par postgres avant d'être véritablement envoyées au serveur
-- ainsi, en cas d'erreur de syntaxe dans une des requête, la transaction entière va être annulée
-- pas de risque que le fichier soit partiellement exécuté, c'est tout ou rien

-- début de transaction
BEGIN;

-- avant de créer les tables, par sécurité et pour repartir d'une base toute propre, on tente de les supprimer

DROP TABLE IF EXISTS "level", "user", quiz, tag, question, answer, quiz_has_tag;

-- on est sûr que la base est vide, on peut (re)commencer la création des tables

-- pour tous nos champs id, nos clés primaires, on va utiliser le type SERIAL
-- ce type est un pseudo-type, c'est en fait un INTEGER NOT NULL UNIQUE relié à une table interne qui permet de l'incrémenter à chaque nouvel enregistrement
-- la "vraie" syntaxe serait :
-- id INTEGER NOT NULL DEFAULT nextval("<table>_id_seq"::regclass)

-- --------------------------------------------
-- table level
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS "level" (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);


-- --------------------------------------------
-- table tag
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS tag (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);


-- --------------------------------------------
-- table user
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    last_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    email NOT NULL UNIQUE TEXT,
    "password" TEXT NOT NULL
);

-- --------------------------------------------
-- table quiz
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS quiz (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    -- on définit la clé étrangère directement à la création de la table
    -- on peut ici référencer un chmp de la table "user" parce qu'elle a déjà été définie au dessus
    -- pour créer cette référence, on va ajouter à la déclaration du champ le mot-clé REFERENCES suis du nom de la table et entre parenthèses, du nom du champ de cette table
    -- par convention, ce champ sera nommé <table>_<champ>
    user_id INTEGER NOT NULL REFERENCES "user"(id)     
);

-- --------------------------------------------
-- table question
-- --------------------------------------------
-- on ne peut pas créer directement ici la référence vers la bonne réponse : la table answer n'est pas encore créée à ce niveau du script
-- on pourra rajouter cette info de clé étrangère dans un 2ème temps, après la création de la table answer

CREATE TABLE IF NOT EXISTS question (
    id SERIAL PRIMARY KEY,
    "description" TEXT NOT NULL UNIQUE,
    anecdote TEXT,
    wiki TEXT,
    level_id INTEGER NOT NULL REFERENCES "level"(id),
    quiz_id INTEGER NOT NULL REFERENCES quiz(id),
    answer_id INTEGER NOT NULL
);

-- --------------------------------------------
-- table answer
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS answer (
    id SERIAL PRIMARY KEY,
    "description" TEXT NOT NULL,
    question_id INTEGER NOT NULL REFERENCES question(id)
);

-- les tables question et answer sont crées toutes les 2 à ce niveau du script, on peut maintenant ajouter l'info de clé étrangère manquante dans la table question

ALTER TABLE question
    ADD FOREIGN KEY (answer_id) REFERENCES answer(id);


-- --------------------------------------------
-- table quiz_has_tag
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS quiz_has_tag (
    quiz_id INTEGER NOT NULL REFERENCES quiz(id),
    tag_id INTEGER NOT NULL REFERENCES tag(id),
    -- on ne peut pas utiliser les mots-clé PRIMARY KEY sur plusieurs déclarations de champ
    -- pour indiquer une clé primaire sur plusieurs champs, on la définit après coup, une fois que les champs sont déclarés
    PRIMARY KEY (quiz_id, tag_id)
);


-- aucune erreur, envoi de la transaction sur le serveur
COMMIT;