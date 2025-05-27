"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface NextAuthProviderProps {
  children: React.ReactNode;
  // Vous pouvez passer la session initiale ici si vous la récupérez côté serveur dans le layout,
  // mais pour une utilisation simple, SessionProvider la récupérera automatiquement.
  // session?: any;
}

export default function NextAuthProvider({ children }: NextAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
