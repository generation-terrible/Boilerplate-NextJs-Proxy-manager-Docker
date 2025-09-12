import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { customProviders } from "./providers.config";

// Configuration de base pour NextAuth.js v5
export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: customProviders,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user, account, profile }: any) {
      console.log("Account linked:", {
        user: user.id,
        provider: account.provider,
      });
    },
    async signIn({ user, account, profile, isNewUser }: any) {
      console.log("User signed in:", {
        user: user.id,
        provider: account?.provider,
        isNewUser,
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      // Permettre toutes les connexions OAuth
      if (account?.provider === "google") {
        return true;
      }
      return true;
    },
    async jwt({ token, user, account, profile }: any) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      } else if (account?.provider === "google" && profile?.email) {
        // Pour les connexions Google, récupérer les infos utilisateur depuis la DB
        const dbUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.isAdmin = dbUser.isAdmin;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
