import { handlers } from "@/auth"; // Importer depuis src/auth.ts

export const { GET, POST } = handlers;

// Forcer l'exécution de ces routes API dans l'environnement Node.js
export const runtime = "nodejs";
