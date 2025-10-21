import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  // Suppression des utilisateurs existants pour éviter les doublons lors du reseeding
  await prisma.user.deleteMany({});
  console.log("Deleted existing users.");

  // Création de quelques utilisateurs
  const usersData = [
    {
      email: "admin@example.com",
      name: "Admin User",
      password: "password123",
      isAdmin: true,
    },
    {
      email: "user1@example.com",
      name: "Test User One",
      password: "password123",
      isAdmin: false,
    },
    {
      email: "user2@example.com",
      name: "Test User Two",
      password: "password123",
      isAdmin: false,
    },
    {
      email: "user3@example.com",
      name: "Test User Three",
      password: "password123",
      isAdmin: false,
    },
    {
      email: "user4@example.com",
      name: "Test User Four",
      password: "password123",
      isAdmin: false,
    },
  ];

  for (const u of usersData) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.create({
      data: {
        email: u.email,
        name: u.name,
        passwordHash,
        isAdmin: u.isAdmin,
        emailVerified: new Date(), // On les marque comme vérifiés pour le dev
      },
    });
    console.log(`Created user with id: ${user.id} and email: ${user.email}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
