const { PrismaClient } = require("@prisma/client");
const process = require("process");

const prisma = new PrismaClient();

const genres = ["Action", "Aventure", "RPG", "Simulation", "Sport", "MMORPG"];// List of genres to seed into the database

async function main() {
    for (const genreName of genres) {
        await prisma.genre.upsert({// Upsert to avoid duplicates, Upsert = Update + Insert
            where: { name: genreName },
            update: {},
            create: { name: genreName },
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