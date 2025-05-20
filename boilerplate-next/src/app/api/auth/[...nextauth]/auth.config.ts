import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

// Configuration de base pour NextAuth.js v5
export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
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

        const email = credentials.email as string;
        const password = credentials.password as string;

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

        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          console.log("Mot de passe incorrect");
          return null;
        }

        // Destructurer et ignorer le hash du mot de passe
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...userWithoutPasswordHash } = user;
        console.log(
          "Authentification réussie pour:",
          userWithoutPasswordHash.email
        );
        return userWithoutPasswordHash;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
