import NextAuth from "next-auth";
import { authConfig } from "./app/api/auth/[...nextauth]/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
