const { PrismaClient } = require("@prisma/client");
const process = require("process");

const prisma = new PrismaClient();

const genres = ["Action", "Aventure", "RPG", "Simulation", "Sport", "MMORPG"];// List of genres to seed into the database
const editors = ["Ubisoft", "Electronic Arts", "Activision", "Level-5", "Square Enix"];// List of editors to seed into the database
const games = [{title: "Kingdom Hearts", description: "A collaboration between Disney and Square Enix", releaseDate: "2002-03-28", genre: "RPG", editor: "Square Enix"},
                {title: "Inazuma Eleven : Victory Road", releaseDate: "2025-11-13", genre: "Sport", editor: "Level-5"}];// List of games to seed into the database

async function main() {
    for (const genreName of genres) {//Add each genre to the database
        await prisma.genre.upsert({// Upsert to avoid duplicates, Upsert = Update + Insert
            where: { name: genreName },
            update: {},
            create: { name: genreName },
        });
    }

    for (const editorName of editors) {// Add each editor to the database
        await prisma.editor.upsert({
            where: { name: editorName },
            update: {},
            create: { name: editorName },
        });
    }

    for (const gameData of games) {// Add each game to the database
        const genre = await prisma.genre.findUnique({ where: { name: gameData.genre } });
        const editor = await prisma.editor.findUnique({ where: { name: gameData.editor } });

        await prisma.game.upsert({
            where: { title: gameData.title },
            update: {},
            create: {
                title: gameData.title,
                description: gameData.description,
                releaseDate: new Date(gameData.releaseDate),
                genreId: genre.id,
                editorId: editor.id,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);// Exit the process with a failure code
    });