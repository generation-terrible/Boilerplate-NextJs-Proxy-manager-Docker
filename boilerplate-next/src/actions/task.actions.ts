"use server"; // Nécessaire pour définir des Server Actions

// import { z } from "zod"; // Supprimé car non utilisé
import { CreateTaskSchema } from "@/lib/schemas";
import prisma from "@/lib/prisma"; // Décommenté et corrigé le chemin

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function createTaskAction(
  prevState: FormState, // Pour une amélioration progressive, bien que non utilisé dans cet exemple simple au début
  formData: FormData
): Promise<FormState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = CreateTaskSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.error(
      "Validation Zod échouée:",
      validatedFields.error.flatten().fieldErrors
    );
    // Aplatir les erreurs pour un format plus simple à consommer côté client
    // const fieldErrors = validatedFields.error.flatten().fieldErrors; // Supprimé car non utilisé
    return {
      message: "Erreur de validation. Veuillez corriger les champs.",
      fields: rawData as Record<string, string>, // Renvoyer les données brutes
      issues: validatedFields.error.issues.map((issue) => issue.message), // Messages d'erreur Zod
    };
  }

  try {
    const { title, description } = validatedFields.data;
    await prisma.task.create({
      data: {
        title,
        description,
        // Assurez-vous que votre modèle Prisma Task a ces champs.
        // Si vous avez un champ comme `userId`, vous devrez le gérer ici,
        // potentiellement en récupérant la session utilisateur.
      },
    });
    return { message: `Tâche "${title}" créée avec succès !` };
  } catch (e) {
    console.error("Erreur lors de la création de la tâche en BDD:", e);
    // Il est préférable de ne pas exposer les détails de l'erreur au client en production.
    return {
      message:
        "Erreur serveur lors de la création de la tâche. Veuillez réessayer.",
    };
  }
}
