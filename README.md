
# oQuiz - Challenge jour 4 : Active Record factorisé

Les méthodes Active Record sont maintenant factorisé directement dans CoreModel !!

Commencer par vérifier que tout fonctionne en écrivant quelques tests dans `test.js`, par exemple : 
- Trouver tous les User.
- Trouver la question dont l'id est 3.
- Créer un Level avec le nom "très difficile" et l'insérer en BDD.
- ...

Ensuite, rajouter 2 méthodes dans CoreModel : 
- `findBy(params, callback)` qui trouve les modèles correspondants à tous les paramètres passées dans le premier argument.
<details>
<summary>Un exemple</summary>

```js
Level.findBy({name:"difficile"}, callback); // trouve le(s) level(s) dont le nom est "difficile"
User.findBy({email: "michel@oclock.io"}, callback); // trouve le(s) user(s) dont l'email est "michel@oclock.io"
Tag.findBy({
  name: "Histoire"
}, callback); // trouve le(s) tag(s) dont le name est "Histoire".

```
</details>

- `save(callback)` : cette méthode appelle soit `insert` soit `update`, selon que l'instance existe déjà dans la BDD ou pas.

## C'est pas encore clair tout ça, j'ai besoin de pratiquer ...

Pour toi qui as du mal à manipuler tous ces concepts poilus (class, instance, this et héritage), je te propose d'essayer de faire une machine à Pizza (Tu peux t'inspirer de notre machine à glace pour la syntaxe ...)

Il s'agit ici de créer une class Pizza qui va nous produire des pizzas à la chaine  
Chaque pizza fabriquée devra contenir :
- la taille de la pizza
- l'épaisseur de la pâte
- la liste des ingrédients

<details>
  <summary>Hein ?</summary>
  On doit pouvoir créer nos pizzas comme ça :

```js
const pizza = new Pizza('grande', 'épaisse', ['jambon', 'fromage', 'champignon']);
```

</details>

On souhaite aussi pouvoir afficher une description de la pizza. La phrase en console devra ressembler à :

`Ma pizza est grande, elle a un pâte épaisse, elle contient les ingrédients suivants : jambon, fromage, champignon`

A toi de rajouter la méthode qui va bien dans la classe :-)

<details>
  <summary>Trop facile, t'as pas autre chose ?</summary>
  Mettre en place les getters et les setters pour la taille et l'épaisseur.  
  Attention, dans les setters on va vérifier que la nouvelle valeur est une string !

  On peut aussi implémenter une méthode qui va ajouter un ingrédient à la pizza ...

  A toi de jouer !
</details>

---
# oQuiz - Challenge jour 3 : Active Record

Les méthodes Active Record du modèle `Level` ont été codées (ou presque).

On a pu vérifier que ces méthodes fonctionnent en jouant dans `test-ar.js`.

Essayez de coder la méthode manquante sur le modèle Level (`delete`)  

En s'inspirant (très largement) de ce code existant, on passe à la suite, à savoir coder les méthodes Active Record du modèle `User` : 
- `findAll(callback)`, qui trouve tous les Users dans la base de données.
- `findById(id, callback)`, qui trouve un User en fonction de son ID.
- `insert(callback)`, qui insert l'instance courante dans la base de données.
- `update(callback)`, qui met à jour l'instance courante dans la base de données.
- `delete(callback)`, qui supprime l'instance courante de la base de données.

En bonus, commencer à réfléchir pour factoriser tout ce code (c'est-à-dire coder toutes les méthodes Active Record dans CoreModel !)

---



# oQuiz - Challenge jour 2 : Le début du commencement

Pour commencer, il faut mettre en place la base de données !

Les choses à faire, dans l'ordre :

- Créer un utilisateur PostgreSQL, nommé "oquiz", avec un mot de passe et les droits nécessaires.
- Créer une base de données nommée "oquiz", dont le propriétaire est l'utilisateur "oquiz".
- Créer les tables grâce au fichier "import_tables.sql".
- Importer les données grâce au fichier "import_data.sql".

<details>
<summary>Je me rappelle plus trop des commandes...</summary>

### Créer un utilisateur PostgreSQL, nommé "oquizz", avec un mot de passe et les droits nécessaires.

- d'abord se connecter à PostgreSQL en tant que "postgres": `sudo -i -u postgres`, puis `psql`
- Ou directement si cela est déjà configurer dans le `pg_hba.conf` vous pouvez directement untiliser la commande `psql -U postgres`
- puis créer l'utilisateur : `CREATE ROLE oquiz WITH LOGIN PASSWORD 'oquiz';`

### Créer une base de données nommée "oquizz", dont le propriétaire est l'utilisateur "oquiz".

- puis créer l'utilisateur : `CREATE DATABASE oquiz OWNER oquiz;`

### Créer les tables grâce au fichier "import_tables.sql".

- `psql -U oquiz -f data/import_tables.sql`

### Importer les données grâce au fichier "import_data.sql".

- `psql -U oquiz -f data/import_data.sql`

</details>

On pourra ensuite se connecter à la BDD dans le code via l'url : `postgres://oquiz:oquiz@localhost/oquiz`

## Du code classe !

Créer un dossier `app`, puis un sous-dossier `app/models`.

Dans ce dossier, on va coder des classes à partir du MCD du projet :

- une classe par entité: `Answer`, `Level`, `Question`, `Quiz`, `Tag`, et `User`
- une seule classe par fichier ! Le fichier porte le même nom que la classe, en minuscule.

Dans chaque classe :

- déclarer une propriété pour chaque champ de la table correspondante.
- coder un `constructor` qui prend en paramètre un objet. Cet objet contient toutes les valeurs à recopier dans l'instance.
- ne pas oublier d'exporter la classe !

<details>
<summary>Heuuu oui... t'as un exemple ?</summary>

Le but, c'est d'arriver à faire ça :

```JS

const monTag = new Tag({
  name: "un super tag",
});
```

On devrait donc avoir un truc dans ce genre :

```JS
class Tag {
  constructor(obj) {
    this.name = obj.name;
  }
};
```

</details>

## Do not repeat yourself

La propriété `id` est présente dans toutes les classes.

On va donc... les factoriser ! Et pour ce faire, on va utiliser l'héritage !

On va donc coder une class `CoreModel`, dans le même dossier que les autres, et toutes les classes vont _hériter_ de celle-ci :

- Penser à exporter `CoreModel`.
- Penser à require `CoreModel` dans les autres fichiers.
- Penser à appeler le "constructeur parent" dans les constructeur des classes.

## Get/Set

Dans chaque classe, à commencer par `CoreModel`, coder un "getter" et un "setter" par propriété en y ajouter les instruction voulues.

<details>
<summary>Un exemple </summary>

```JS
class CoreModel {
  id;

  get id() {
    return this.id;
  };

  set id(value) {
    this.id = value;
  };
};
```

</details>

## Bonus : ne pas autoriser de valeurs absurdes

Dans les "setters", rajouter des tests pour vérifier que la donnée passée en argument est au moins du bon type.

<details>
<summary>Un exemple</summary>

```js
class CoreModel {
  id;

  set id(value) {
    if(isNaN(parseInt(value, 10))) {
      throw Error("CoreModel.id must be a integer !");
      // on "lève" une erreur => ça arrête tout !
    }
    this.id = value;
  }
};
```

</details>


# oQuiz, challenge jour 1

En utilisant l'analyse préliminaire de la BDD, le [MCD](https://kourou.oclock.io/ressources/fiche-recap/mcd-modele-conceptuel-de-donnees/), et la [fiche récap MLD](https://kourou.oclock.io/ressources/fiche-recap/mld/), écrire le MLD de l'application !

## Bonus

Écrire le fichier SQL pour créer les tables listées dans le MLD.
