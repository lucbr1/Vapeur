const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const hbs = require("hbs");

const path = require("path");
const app = express();
const prisma = new PrismaClient();
const PORT = 3008;



// Configuration de Handlebars pour Express
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)

// On définit un middleware pour parser les données des requêtes entrantes.
// Cela permet de récupérer les données envoyées via des formulaires et les rendre disponibles dans req.body.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); // On sert les fichiers statiques (CSS, JS, images...) depuis le dossier "public"

// Route pour la page d'accueil
app.get("/", async (req, res) => {
    const highlightedGames = await prisma.Game.findMany({
        where: { highlighted: true },
        include: {
            genre: true,
            editor: true,
        },
        orderBy: { releaseDate: "desc" },
    });

    res.render("index", { highlightedGames });
});

//récupérer la liste des jeux
app.get("/games", async (req, res) => {
    const games = await prisma.Game.findMany({
        include: {
            genre: true,
            editor: true,
        },
    });
    res.render("games/index", {
        games,
    });
});

//Page de création de jeu
app.get("/games/create", async (req, res) => {
    const [genres, editors] = await Promise.all([
        prisma.Genre.findMany({ orderBy: { name: "asc" } }),
        prisma.Editor.findMany({ orderBy: { name: "asc" } }),
    ]);

    res.render("games/create", { genres, editors });

});

// création d'un nouveau jeu
app.post("/games", async (req, res) => {
    const {
        title,
        description,
        releaseDate,
        highlighted,
        genreId,
        editorId,
    } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).send("Title is required");
    }

    const releaseDateValue = releaseDate ? new Date(releaseDate) : null;
    const genreIdInt = genreId ? parseInt(genreId, 10) : null;
    const editorIdInt = editorId ? parseInt(editorId, 10) : null;

    const newGame = await prisma.Game.create({
        data: {
            title: title.trim(),
            description,
            releaseDate: releaseDateValue,
            highlighted: highlighted === "on",
            genreId: genreIdInt,
            editorId: editorIdInt,
        },
    });

    return res.redirect(`/games/${newGame.id}`);
});

//Détails d'un jeu
app.get("/games/:id", async (req, res) => {
    const gameId = parseInt(req.params.id);
    const game = await prisma.Game.findUnique({
        where: { id: gameId },
        include: {
            genre: true,
            editor: true,
        },
    });

    if (!game) {
        return res.status(404).send("Game not found");
    }

    const formattedReleaseDate = game.releaseDate
        ? new Date(game.releaseDate).toLocaleDateString("fr-FR")
        : "";

    res.render("games/details", {
        game,
        formattedReleaseDate,
    });
});

//modification d'un jeu
app.get("/games/:id/edit", async (req, res) => {
    const gameId = parseInt(req.params.id, 10);

    const [game, genres, editors] = await Promise.all([
        prisma.Game.findUnique({
            where: { id: gameId },
        }),
        prisma.Genre.findMany({ orderBy: { name: "asc" } }),
        prisma.Editor.findMany({ orderBy: { name: "asc" } }),
    ]);

    if (!game) {
        return res.status(404).send("Game not found");
    }

    const releaseDateValue = game.releaseDate
        ? new Date(game.releaseDate).toISOString().slice(0, 16)
        : "";

    const genreOptions = genres.map((genre) => ({
        ...genre,
        selected: genre.id === game.genreId,
    }));

    const editorOptions = editors.map((editor) => ({
        ...editor,
        selected: editor.id === game.editorId,
    }));

    res.render("games/edit", {
        game,
        genres: genreOptions,
        editors: editorOptions,
        releaseDateValue,
    });
});

app.post("/games/:id", async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const {
        title,
        description,
        releaseDate,
        highlighted,
        genreId,
        editorId,
    } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).send("Title is required");
    }

    const releaseDateValue = releaseDate ? new Date(releaseDate) : null;
    const genreIdInt = genreId ? parseInt(genreId, 10) : null;
    const editorIdInt = editorId ? parseInt(editorId, 10) : null;

    await prisma.Game.update({
        where: { id: gameId },
        data: {
            title: title.trim(),
            description,
            releaseDate: releaseDateValue,
            highlighted: highlighted === "on",
            genreId: genreIdInt,
            editorId: editorIdInt,
        },
    });

    res.redirect(`/games/${gameId}`);
});

//suppression d'un jeu
app.post("/games/:id/delete", async (req, res) => {
    const gameId = parseInt(req.params.id, 10);

    await prisma.Game.delete({
        where: { id: gameId },
    });

    res.redirect("/games");
});

// Routes pour les genres
app.get("/genres", async (req, res) => {
    const genres = await prisma.genre.findMany({orderBy: { name: 'asc' }}); //on récupère tous les genres
    res.render("genres/index", { genres });
});

app.get("/genres/:id", async (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = await prisma.genre.findUnique({//on récupère le genre avec les jeux associés
        where: { id: genreId },
        include: { games: { orderBy: { title: 'asc' } } },
    });
    res.render("genres/details", { genre });
});

//Gestion des erreurs 404 et 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.use((req, res, next) => {
    res.status(404).send("Page not found");
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});