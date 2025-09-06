import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: {
      label: "Email",
      type: "email",
      placeholder: "nom@example.com",
    },
    password: { label: "Mot de passe", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      console.log("Email ou mot de passe manquant");
      return null;
    }

    const email = credentials.email;
    const password = credentials.password;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      console.log("Aucun utilisateur trouvé avec cet email:", email);
      return null;
    }

    if (!user.passwordHash) {
      console.log(
        "L'utilisateur n'a pas de mot de passe configuré (peut-être un compte OAuth ?)"
      );
      return null;
    }

    const isPasswordValid = await bcryptjs.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      console.log("Mot de passe incorrect");
      return null;
    }

    const { passwordHash, ...userWithoutPasswordHash } = user;
    console.log(
      "Authentification réussie pour:",
      userWithoutPasswordHash.email
    );
    return userWithoutPasswordHash;
  },
});

// Si vous avez d'autres providers (Google, GitHub, etc.), ajoutez-les ici
// export const otherProviders = [Google, GitHub];

export const customProviders = [credentialsProvider];
