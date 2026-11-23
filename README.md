<div align="center">

# 🎮 Vapeur

*Une application web de gestion de ludothèque vidéo-ludique (CRUD).*  
*A web application to manage a video game collection (CRUD).*

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Handlebars](https://img.shields.io/badge/Handlebars-000000?style=for-the-badge&logo=handlebars.js&logoColor=orange)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

[🌐 Version Française](#-version-française) • [🇬🇧 English Version](#-english-version)

</div>

---

## 🇫🇷 Version Française

### 📌 À propos
**Vapeur** est une application web full-stack permettant de gérer une collection de jeux vidéo. Développée dans un cadre pédagogique, elle offre un système complet d'administration (CRUD) pour les jeux, les éditeurs et la consultation par genres.

> 🎓 **Projet académique** — Respect des spécifications d'un cahier des charges d'architecture web (MVC, ORM, templating côté serveur).

---

### ✨ Fonctionnalités clés

- 🕹️ **Jeux Vidéo** :
  - Mise en avant dynamique sur la page d'accueil.
  - Consultation globale et fiches détaillées (description, date, genre, éditeur).
  - Gestion complète : Création, Édition, Suppression (CRUD).
- 🏷️ **Genres** :
  - Génération automatique des genres par défaut au démarrage (*Action, Aventure, RPG, Simulation, Sport, MMORPG*).
  - Filtrage des jeux par genre.
- 🏢 **Éditeurs** :
  - Création, modification, suppression et affichage des jeux associés par éditeur.
- ⚡ **Navigation & UX** :
  - Tri alphabétique automatique sur toutes les listes.
  - Maillage de liens intuitif entre jeux, genres et éditeurs.

---

### 🛠️ Stack Technique

- **Backend** : Node.js & Express.js
- **Base de données** : SQLite
- **ORM** : Prisma (avec migrations automatisées)
- **Moteur de templates** : Handlebars (`hbs`)

---

### 🚀 Installation & Lancement

#### 1. Prérequis
- [Node.js](https://nodejs.org/) (`v18` ou supérieure)
- `npm`

#### 2. Cloner le projet
```bash
git clone https://github.com/lucbr1/Vapeur.git
cd Vapeur
```

#### 3. Configuration de l'environnement
Créez un fichier `.env` à la racine du projet avec la variable suivante :
```env
DATABASE_URL="file:./dev.db"
```

#### 4. Dépendances & Base de données
```bash
# Installation des packages
npm install

# Application des migrations Prisma
npx prisma migrate deploy

# Génération du client Prisma
npx prisma generate
```

#### 5. Lancer l'application
```bash
npm run start
```
📍 L'application sera accessible sur **`http://localhost:3080`**

---

<details>
<summary>📂 <b>Cliquez ici pour voir la structure du projet</b></summary>

```text
├── prisma/
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── public/
│   ├── global.css
│   └── logo.png
├── views/
│   ├── editors/      # Vues CRUD pour les éditeurs
│   ├── errors/       # Pages d'erreur (400, 404, 500)
│   ├── games/        # Vues CRUD pour les jeux
│   ├── genres/       # Vues pour les genres
│   ├── partials/     # Composants réutilisables
│   ├── index.hbs
│   └── layout.hbs
├── index.js          # Point d'entrée du serveur
└── package.json
```
</details>

---

### 👥 Auteurs
- **Mathis GILGENKRANTZ**
- **Jordan PASQUALINI**
- **Lucas BRUN** ([@lucbr1](https://github.com/lucbr1))

---

<br/>

## 🇬🇧 English Version

### 📌 About
**Vapeur** is a full-stack web application designed to manage a video game library. Built as an academic project, it provides a full CRUD system for video games, publishers, and genre classification.

---

### ✨ Key Features

- 🕹️ **Video Games**:
  - Highlighted games showcase on the home page.
  - Complete games directory with detailed view (description, release date, genre, publisher).
  - Full CRUD operations (Create, Read, Update, Delete).
- 🏷️ **Genres**:
  - Auto-generated default genres at startup (*Action, Adventure, RPG, Simulation, Sports, MMORPG*).
  - Filter games by genre.
- 🏢 **Publishers**:
  - Create, update, delete publishers and view associated games.
- ⚡ **Navigation & UX**:
  - Automatic alphabetical sorting for all lists.
  - Seamless inter-linking between games, publishers, and genres.

---

### 🛠️ Tech Stack

- **Backend**: Node.js & Express.js
- **Database**: SQLite
- **ORM**: Prisma (with automated migrations)
- **Templating**: Handlebars (`hbs`)

---

### 🚀 Quickstart

```bash
# 1. Clone the repository
git clone https://github.com/lucbr1/Vapeur.git
cd Vapeur

# 2. Setup environment (.env file in root)
echo 'DATABASE_URL="file:./dev.db"' > .env

# 3. Install dependencies
npm install

# 4. Run database migrations & generate Prisma client
npx prisma migrate deploy
npx prisma generate

# 5. Start the server
npm run start
```
📍 Open **`http://localhost:3080`** in your browser.

---

### 👥 Authors
- **Mathis GILGENKRANTZ** ([@Mothisma](https://github.com/Mothisma))
- **Jordan PASQUALINI** ([@jijoxP](https://github.com/jijoxP))
- **Lucas BRUN** ([@lucbr1](https://github.com/lucbr1))

---
*Academic Project.*
