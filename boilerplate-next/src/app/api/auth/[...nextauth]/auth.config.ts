import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { customProviders } from "./providers.config";

// Configuration de base pour NextAuth.js v5
export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: customProviders,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean | undefined;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
