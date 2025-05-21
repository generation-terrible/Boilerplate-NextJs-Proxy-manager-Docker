import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Le titre doit contenir au moins 3 caractères." })
    .max(100, { message: "Le titre ne peut pas dépasser 100 caractères." }),
  description: z.string().optional(), // La description est optionnelle
});

export type CreateTaskFormValues = z.infer<typeof CreateTaskSchema>;
