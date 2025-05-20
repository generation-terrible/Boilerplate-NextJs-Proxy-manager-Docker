import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Créer l'objet handlers à exporter
export const {
  handlers: { GET, POST },
} = NextAuth(authConfig);
