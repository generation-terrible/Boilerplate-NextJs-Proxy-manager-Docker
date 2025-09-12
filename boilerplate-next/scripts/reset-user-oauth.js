import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function resetUserOAuth() {
  try {
    console.log("🔍 Recherche des utilisateurs sans compte OAuth...");

    // Trouver tous les utilisateurs
    const users = await prisma.user.findMany({
      include: {
        accounts: true,
      },
    });

    console.log(`📊 ${users.length} utilisateur(s) trouvé(s)`);

    for (const user of users) {
      const hasOAuthAccount = user.accounts.some(
        (account) =>
          account.provider === "google" || account.provider === "github"
      );

      if (!hasOAuthAccount) {
        console.log(
          `👤 Utilisateur sans OAuth: ${user.email} (ID: ${user.id})`
        );
        console.log(
          "   - Comptes liés:",
          user.accounts.map((a) => a.provider).join(", ") || "Aucun"
        );

        // Optionnel: supprimer l'utilisateur pour permettre la reconnexion OAuth
        // Décommentez les lignes suivantes si vous voulez supprimer l'utilisateur
        /*
        await prisma.user.delete({
          where: { id: user.id }
        });
        console.log(`   ✅ Utilisateur ${user.email} supprimé`);
        */
      }
    }

    console.log("✅ Vérification terminée");
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetUserOAuth();
