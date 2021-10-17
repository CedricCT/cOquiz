class CoreModel {

    //on protège l'accès à la propriété en précédant son d'un #
    //on dit que cette propriété est privée, uniquement accessible dans le code de la classe
    #id;

    constructor(obj) {
        this.#id = obj.id;
    }

    // getId() {
    //     return this.#id
    // }

    //setId(newValue) {
        //verifs de l'intégrité
        //et pour finir, quand on a décidé que la value était cohérent
        //this.#id = newValue;
    //}

    //on déclare ici une fonction bizarre (avec un espace au milieu du nom) et le plus curieux dans l'histoire, c'est qu'on va l'utiliser comme si c'était une propriété
    // console.log(levelInstance.id)

    //un getter permet de lire la valeur d'une propriété cachée
    get id() {
        return this.#id;        
    }


    //un setter permet de mettre à jour la valeur d'une prorpiété cachée
    //en général, on profite de ce setter pour mettre en place une validation de l'intégrité de la data

    set id(newValue) {
        if (typeof newValue !== 'number') {
            console.error('id doit être un nombre');
        } else if (newValue < 0) {
            console.error('id doit être un entier positif');
        } else {
            this.#id = newValue;
        }
    }
}

module.exports = CoreModel;