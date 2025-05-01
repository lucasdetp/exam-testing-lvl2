# Questionnaire 

### Objectif des tests unitaires
Quel est l'objectif principal des tests unitaires ?
   - B) Vérifier le comportement d'une unité de code isolée

### Utilisation de Gherkin
Gherkin est principalement utilisé pour :
   - B) Décrire le comportement attendu dans un format compréhensible par tous

### Principe d'isolation
Expliquez en quoi consiste le principe d'isolation dans les tests unitaires et pourquoi il est important.
Le principe d’isolation en tests unitaires consiste à tester une unité de code (comme une fonction ou une méthode) indépendamment de ses dépendances externes (base de données, API, fichiers, etc.).
Cela se fait généralement à l’aide de mocks, stubs ou fakes qui simulent le comportement des dépendances.
Il est important car il permet de rendre les tests plus rapides, stables et faciles à diagnostiquer.

### Origine du BDD
Le BDD est une extension du :
   - B) Test Driven Development

### Fonction des tests d'intégration
Les tests d'intégration vérifient principalement :
   - B) L'interaction entre différents composants ou modules

### Structure Gherkin
Expliquez la structure d'un scénario Gherkin et donnez un exemple concret.
La structure d’un scénario Gherkin repose sur une syntaxe simple en langage naturel, compréhensible par les parties techniques et non techniques.
Elle suit un modèle Given / When / Then parfois enrichi avec And ou But pour plus de clarté.

    Fonctionnalité: Authentification utilisateur
    En tant qu'utilisateur enregistré
    Je veux pouvoir me connecter
    Afin d'accéder à mon espace personnel

    Scénario: Connexion avec identifiants valides
        Étant donné que l'utilisateur "alice@gmail.com" a un compte avec le mot de passe "testtest"
        Quand elle saisit "alice@example.com" et "Motdepasse123" sur la page de connexion
        Alors elle est redirigé vers le tableau de bord
        Et un message de bienvenue s'affiche


### Mocks en tests unitaires
Dans le contexte des tests unitaires, que sont les "mocks" ?
   - B) Des objets qui simulent le comportement de dépendances réelles

### Objectif des tests end-to-end
Les tests end-to-end visent à :
   - B) Tester l'application de bout en bout du point de vue de l'utilisateur

### Cycle TDD
Expliquez en détail le cycle Red-Green-Refactor du TDD et ce qui se passe à chaque étape.
Réponse : 
    Red: un code qui échoue 
    Green: un code qui passe, écrire le minimum de code pour que le test passe
    Refactor: un code propre. réorganiser, modifier, nettoyer le code sans modifier son comportement

### Caractéristiques d'un bon test unitaire
Quelle est la caractéristique idéale d'un bon test unitaire ?
    - B) Il doit être rapide à exécuter, isolé et répétable

### Mots-clés de Gherkin
Quels sont les mots-clés principaux de Gherkin ?
    - C) Feature, Scenario, Given, When, Then

### Tests unitaires vs tests d'intégration
Quelles sont les principales différences entre les tests unitaires et les tests d'intégration ?
un test unitaire permet de tester une seule focntion a la fois, est rapide, ne dépend pas d'autre fichier ou bdd ou api
un test d'intégration permet de tester plusieurs modules ensemble (ex une route api qui lit dans une bdd et return un réponse)


### Nom du cycle TDD
Le cycle TDD classique est connu sous le nom de :
    - B) Red-Green-Refactor

### Focus des tests fonctionnels
Les tests fonctionnels se concentrent sur :
    - C) Le comportement du système par rapport aux spécifications

### BDD et communication d'équipe
Comment le BDD peut-il améliorer la communication entre les équipes techniques et les équipes métier ?
le Behavior Driven Development permet d'utiliser un langage commun, d'écrire ensemble les scénario de test en ce basant sur des besoin réel et de clarifier les attentes avant de commencer le dev

### Avantage principal du TDD
Quel est l'avantage principal du TDD ?
    - C) Il favorise un design modulaire et des interfaces claires

### Avantages et défis des tests end-to-end
Quels sont les avantages et les défis spécifiques liés aux tests end-to-end par rapport aux autres types de tests ?
Les tests end-to-end testent l’application comme si c’était un vrai utilisateur.
Ils permettent de vérifier que tout fonctionne bien ensemble, du début à la fin (ex se connecter, acheter un produit).
avantage : ils montrent des bugs réels dans le parcours utilisateur.
défi : ils sont souvent plus lents, plus fragiles, et plus difficiles à maintenir que les tests unitaires ou d’intégration.

### Format des scénarios BDD
Quel est le format typique d'un scénario BDD ?
    - B) Étant donné-Quand-Alors

### Avantages et limites des tests unitaires
Décrivez les avantages et les limites des tests unitaires dans un projet de développement logiciel.
ils sont rapide, facile a exécuter souvent, permettent de détecter des erreurs rapidement
ils ne vérifient pas si les composants marchent bien ensemble, ils ne remplacent pas les test end to end ou les test d'intégration, peu utile si mal écrit ou mal isolé$

### Fonctionnalité de réutilisation dans Gherkin
Quelle est la fonctionnalité de Gherkin qui permet de réutiliser des étapes communes à plusieurs scénarios ?
    - C) Scenario Outline

### Responsabilité des tests fonctionnels
Qui est généralement responsable de l'écriture et de l'exécution des tests fonctionnels ?
    - C) Les développeurs et les testeurs QA

### Moment d'écriture du code en TDD
Dans le TDD, à quel moment écrit-on le code de production ?
    - C) Après avoir exécuté les tests et constaté leur échec

### Outils pour tests end-to-end
Quel outil est couramment utilisé pour les tests end-to-end d'applications web ?
    - C) Playwright

### Différences entre BDD et TDD
En quoi le BDD diffère-t-il du TDD en termes d'approche et d'objectifs ?
Le TDD se concentre sur écrire des tests avant le code pour garantir la qualité du code.
Le BDD se concentre sur écrire des tests comportementaux en langage naturel pour que les parties prenantes comprennent mieux les besoins métier.
Le BDD est donc plus orienté collaboration, tandis que le TDD est plus centré sur le développement technique.

### Défis des tests d'intégration
Quels défis sont fréquemment rencontrés lors de la mise en place de tests d'intégration ?
    - D) Toutes les réponses ci-dessus

### Caractéristiques d'un bon test end-to-end
Quelle est la caractéristique d'un bon test end-to-end ?
    - B) Il doit simuler avec précision le comportement réel des utilisateurs

### Défis de l'adoption du TDD
Quels sont les défis couramment rencontrés lors de l'adoption du TDD dans une équipe, et comment pourriez-vous les surmonter ?

L’apprentissage du processus et l’adaptation à l’écriture des tests en premier,
    - Temps de développement plus long au début,
    - Manque de tests complets si les tests unitaires sont mal conçus.

Solution :
    - Former l’équipe sur le processus,
    - Utiliser des outils de tests automatisés,
    - Commencer petit avec des tests simples.



### Frameworks de tests unitaires
Lequel de ces frameworks n'est PAS utilisé pour les tests unitaires ?
    - C) Selenium

### Rôles dans le processus BDD
Quels rôles sont généralement impliqués dans le processus BDD ?
    - C) Développeurs, testeurs et product owners

### Maintenance des tests end-to-end
Comment géreriez-vous la maintenance des tests end-to-end pour une application qui évolue rapidement ?
    - Mettre en place une stratégie de tests stables
    - Regrouper les tests communs pour éviter la duplication
    - Mettre à jour régulièrement les tests avec les changements de l’interface utilisateur ou des fonctionnalités

### Inconvénients des tests fonctionnels
Quel est le principal inconvénient des tests fonctionnels ?
    - B) Ils sont généralement lents et coûteux à exécuter

### Intégration de Gherkin en agile
Comment intégreriez-vous Gherkin dans un processus de développement agile ? Quels seraient les avantages ?
Gherkin peut être intégré au processus agile en permettant de décrire les fonctionnalités attendues de manière simple et compréhensible par tous. Les tests sont écrits en collaboration avec les parties prenantes et validés en continu tout au long du développement.


### Principes du TDD
Lequel des principes suivants n'est PAS associé au TDD ?
    - D) Écrire tous les tests à la fin du développement

### Différences entre tests fonctionnels et autres tests
En quoi les tests fonctionnels diffèrent-ils des tests unitaires et d'intégration en termes d'approche et d'objectifs ?
Les tests fonctionnels testent le comportement du système du point de vue de l'utilisateur 
les tests unitaires se concentrent sur des fonctions isolés et logiques
les tests d'intégration vérifie l'intéraction entre les composants du système

### Approche combinant TDD, BDD et Gherkin
Quelle approche combine naturellement TDD, BDD et Gherkin ?
    - B) Specification By Example

### Organisation des tests fonctionnels
Décrivez comment vous organiseriez les tests fonctionnels pour une application web de e-commerce.
- inscription / connexion
- la recherche de produit et l'ajout au pannier
- validation du paiement et gestion des commandes 

### Pyramide de tests
Quelle est la pyramide de tests classique, du bas vers le haut ?
    - B) Tests unitaires, Tests d'intégration, Tests fonctionnels, Tests E2E

### Stratégie de test optimale
Comment détermineriez-vous la stratégie de test optimale pour un projet, en considérant les différents types de tests abordés dans ce questionnaire ?
- tests unitaires pour la logique de base 
- compléter avec des tests d'intégration pour vérifié que tous les modules intéragissent bien ensmble 
- tester le parcours utilisaurs avec des tests fonctionnels et end to end 

### Quelle est l'erreur récurente qui peut être faite lors de test end 2 end ? (Je l'ai répété pas mal de fois)
tester trop de chose en meme temps ce qui rend les tests fragiles, lent et compliqué a maintenir dans le temps