# Vapeur

Vapeur est une application web permettant de gérer une collection de jeux vidéo. Elle offre la possibilité de consulter, créer, modifier et supprimer des jeux et leurs éditeurs associés, ainsi que de consulter leurs genres.

L’application est développée dans le cadre d’un projet pédagogique et respecte un cahier des charges précis, incluant l’utilisation d’Express.js, SQLite, Prisma et Handlebars.

---

## Fonctionnalités

### Jeux vidéo

* Affichage des jeux mis en avant sur la page d’accueil
* Affichage de tous les jeux sur une page dédiée
* Consultation du détail d’un jeu (titre, description, date de sortie, genre, éditeur)
* Création d’un jeu
* Modification d’un jeu
* Suppression d’un jeu
* Possibilité de mettre un jeu en avant sur la page d’accueil

### Genres de jeux

* Genres prédéfinis : Action, Aventure, RPG, Simulation, Sport, MMORPG
* Génération automatique des genres au démarrage de l'application s’ils n’existent pas
* Affichage de la liste des genres
* Affichage des jeux associés à un genre

### Éditeurs

* Création d’un éditeur
* Modification d’un éditeur
* Suppression d’un éditeur
* Affichage de la liste des éditeurs
* Affichage des jeux associés à un éditeur

### Général

* Navigation principale entre les différentes sections
* Toutes les listes sont triées par ordre alphabétique
* Tous les éléments sont cliquables et renvoient vers leurs pages de détail

---

## Technologies utilisées

* **Node.js**
* **Express.js** : framework web
* **SQLite** : base de données
* **Prisma** : ORM et gestion des migrations
* **Handlebars (hbs)** : moteur de templates
* **Git / GitHub** : gestion de versions

---

## Prérequis

* Node.js (version 18 ou supérieure recommandée)
* npm

---

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/lucbr1/Vapeur
```

2. Créer le fichier .env :

```
Vous devez definir le .env dans le dossier global ainsi que le DATABASE_URL dans le fichier .env tel que : DATABASE_URL="votre url"
```

3. Installer les dépendances :

```bash
npm install
```

4. Appliquer les migrations Prisma :

```bash
npx prisma migrate deploy
```

5. Générer le client Prisma :

```bash
npx prisma generate
```

6. Lancer l’application :

```bash
npm run start
```

L’application est ensuite accessible depuis votre navigateur à l’adresse :

```
http://localhost:3080 
```

---

## Base de données

* La base de données utilise **SQLite**
* Le fichier de base de données n’est **pas versionné** (non commité)
* Les migrations Prisma doivent être appliquées avant le premier lancement
* Les genres sont automatiquement créés au démarrage de l'application s’ils n’existent pas encore
* 2 jeux et 2 éditeurs sont également ajoutés pour une utiliasation plus directe et représentative

---

## Structure du projet 

```
├── prisma/
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
│       ├── 20251207181255_initialisation_de_la_base/
│          └── migration.sql
│       ├── 20251208083433_correction_highlighted/
│          └── migration.sql
│       ├── 20251208205419_unique_and_nullable_fields/
│          └── migration.sql
│       └── 20251208210825_title_game_unique/
│          └── migration.sql
├── public/
│   ├── global.css
│   └── logo.png
├── views/
│   ├── editors/
│       ├── create.hbs
│       ├── details.hbs
│       ├── edit.hbs
│       └── index.hbs
│   ├── errors/
│       ├── 400.hbs
│       ├── 404.hbs
│       └── 500.hbs
│   ├── games/
│       ├── create.hbs
│       ├── details.hbs
│       ├── edit.hbs
│       └── index.hbs
│   ├── genres/
│       ├── details.hbs
│       └── index.hbs
│   ├── partials/
│   ├── index.hbs
│   └── layout.hbs
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

---

## Navigation

La navigation principale permet d’accéder :

* à la page d’accueil (jeux mis en avant)
* à la liste des jeux
* à la liste des genres
* à la liste des éditeurs

Chaque élément affiché (jeu, genre, éditeur) est cliquable et mène à une page de détail ou à une liste associée.

---

## Auteur(s)

* Mathis GILGENKRANTZ
* Jordan PASQUALINI
* Lucas BRUN

---

## Licence

Projet réalisé dans un cadre pédagogique.