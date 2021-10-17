# MCD ou Modèle Conceptuel de Données

Etape indispensable pour créer la BDD et le code qui en découle de façon sereine

En effet, on s'appuiera continuellement sur ce document pour garder sous les yeux la structure de notre base de données

On s'en servira également comme pense-bète au moment de l'implementation pour éviter d'avoir à consulter la BDD en ligne de commande toutes les 2 minutes

Le MCD doit représenter le système d'information qu'on souhaiote réaliser. Ce système ne débouchera pas forcément sur une BDD. On ne fera donc pas apparaitre dedans les détails d'implémentation d'une BDD

## Entités de l'application

On va identifer, à travers le cahier des charges et les use cases définis préalablement les éléments qui auront un rôle dans notre système

Dans ces entités, on va lister les attributs spécifiques à cette entité

On déterminera également un discriminant pour chaque entité (si ça fait du sens) : un attribut permettant d'identifier sans risque d'erreur UNE instance de cette entité


## Les associations entre ces entités

On indiquera également sur ce schéma de quelle façon les différentes entites vont être reliées entre elles dans le système d'information

Pour chaque association, on va déterminer les cardinalités : on va indiquer pour une entité, combien on pourra avoir d'instance(s) de l'autre entité au minimum et au maximum

