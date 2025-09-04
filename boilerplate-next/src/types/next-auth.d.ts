import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique identifier from the database. */
      id: string;
      /** Whether the user is an administrator. */
      isAdmin?: boolean;
    } & DefaultSession["user"]; // Keep the default user properties
  }

  // Étendre le type User pour qu'il corresponde à notre modèle Prisma User
  // et soit utilisé par l'AdapterUser implicitement.
  interface User extends DefaultUser {
    isAdmin?: boolean;
    // Ajoutez ici d'autres champs de votre modèle Prisma User que vous voulez voir
    // sur l'objet `user` dans les callbacks comme `signIn`, `jwt`, ou `session` (quand strategy="database").
    // Par exemple, si votre modèle Prisma User a un champ `role: String?`:
    // role?: string | null;
  }
}

// Étendre le type JWT
declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id?: string;
    isAdmin?: boolean;
    // accessToken?: string; // Décommentez si vous ajoutez accessToken dans le callback jwt
  }
}

// Il est aussi possible d'importer directement votre type User généré par Prisma
// et de l'utiliser dans les callbacks si nécessaire, mais étendre `next-auth.User`
