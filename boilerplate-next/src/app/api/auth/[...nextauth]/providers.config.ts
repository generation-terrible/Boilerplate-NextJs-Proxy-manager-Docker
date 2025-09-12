import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
// Utilisation d'un import compatible avec Edge Runtime
const bcryptjs = require('bcryptjs');

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

export const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code"
    }
  }
});

export const customProviders = [
  credentialsProvider,
  googleProvider
];
