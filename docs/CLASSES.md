# Déclarer une classe

On utilise le mot-clé **class** suivi du nom de la classe et d'une paire d'accolades.

Par convention, le nom de la classe commence par une majuscule.

```javascript
class MyClass {
    ...
};
```


# Instancier une classe

Pour créer une instance, un object à partir d'une classe, on utilise le mot-clé **new** quivi du nom de la classe et d'une paire de parenthèses.

```javascript
const myInstance = new MyClass();
```


# Propriétés dans une classe

Pour ajouter une propriété, pas besoin de var, let ou const.

On indique juste le nom de la propriété suivi, éventuellement de **=** et d'une valeur par défaut.

```javascript
class MyClass {
    prop1;
    prop2 = 'aValue';
};
```


# Méthodes dans une classe

On ajoute une méthode à une classe en indiquant son som suivi d'une paire de parenthèses

```javascript
class MyClass {

    myMethod() {
        console.log('Je suis dans myMethod');
    }
};
```


# Constructor

Chaque class dispose d'une méthode qui permet de la configurer à la création : constructor.

C'est cette méthode qui est appelée quand on instancie une classe.

Pour référencer les propriétés d'une classe dans ses méthodes, on utilise le mot-clé **this**.

```javascript
class MyClass {

    prop1;
    prop2;
    
    constructor(param1, param2) {
        this.prop1 = param1;
        this.prop2 = param2;
    }
};
```


# Getter/Setter

On peut protéger l'accès et l'intégrité d'une propriété en utilisant un getter pour lire la valeur et un setter pour la mettre à jour.

On fait précéder le nom de la propriété par **_**  afin de la rendre plus 'difficile' d'accès.

Le getter et le setter s'utilisent comme s'ils étaient des propriétés mais ce sont en réalité des fonctions.

Dans le setter, on pourra ajouter des tests pour vérifier l'intégrité de la valeur fournie avant de mettre à jour la propriété.

```javascript
class MyClass {

    _prop1;

    get prop1() {
        return _prop1;
    }

    set prop1(value) {
        //tests d'intégrité
        if (typeof value !== 'string')
            throw new Error('La valeur de prop1 doit être de type string');
        _prop1 = value;
    }
};

const myInstance = new MyClass();
myInstance.prop1 = 'test';
console.log(myInstance.prop1);

```


# Héritage

On peut créer un arbre généalogique de classes, chaque enfant héritera des propriétés et méthodes de son parent.

On étend les capacités d'une classe mère à une classe fille avec le mot-clé **extends**.

Dans la classe fille, on a une référence à la classe mère contenue dans le mot-clé **super**.

La classe fille va pouvoir surcharger les méthodes de la classe mère pour se donner un comportement spécifique.

```javascript
class MotherClass {
    toString() {
        return 'test de log';
    }
}

class DaughterClass extends MotherClass {
    toString() {
        return 'Depuis la classe fille : ' + super.toString();
    }
}
```


# Propriété statique

On peut ajouter une propriété partagée par toutes les instances d'une classe en la précédant du mot-clé **static** à la déclaration.

Cette propriété sera rattachée à la classe et non aux instances.

Pour y accéder, on utilisera la notation <nom_de_class>.<nom_de_prop>.

```javascript
class MyClass {
    static sharedProp = 0;

    constructor() {
        MyClass.sharedProp++;
    }
};

const myInstance = new MyClass(); //MyClass.sharedProp vaut 1
const myInstance2 = new MyClass(); //MyClass.sharedProp vaut 2

```


# Vérifier qu'un object est d'une certaine classe

Pour tester si un object est d'une certaine classe, on utilise l'opérateur **instanceof**.

Cet opérateur est capable de remonter l'arbre généalogique et renverra true si on teste qu'une classe fille est une instance de sa classe mère

```javascript
class MotherClass {
    ...
};

class DaughterClass extends MotherClass {
    ...
};

const daughter = new DaughterClass();
console.log(daughter instanceof DaughterClass) //affichera true
console.log(daughter instanceof MotherClass) //affichera true
```
