"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskSchema, type CreateTaskFormValues } from "@/lib/schemas";
import { createTaskAction, type FormState } from "@/actions/task.actions"; // Modifié
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

export function CreateTaskForm() {
  const t = useTranslations("CreateTaskForm");
  const [formState, setFormState] = useState<FormState | null>(null);
  const [isPending, startTransition] = useTransition(); // Pour gérer l'état de chargement de la Server Action

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Pour vider le formulaire après succès
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      // Valeurs par défaut optionnelles
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateTaskFormValues) => {
    // Créer un objet FormData à partir des données du formulaire
    const formData = new FormData();
    (Object.keys(data) as Array<keyof CreateTaskFormValues>).forEach((key) => {
      const value = data[key];
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    startTransition(async () => {
      const initialState: FormState = { message: "", issues: [], fields: {} };
      const result = await createTaskAction(initialState, formData);
      setFormState(result);

      if (result && !result.issues && !result.fields) {
        // Si succès (pas d'issues ou de fields retournés)
        reset(); // Vider le formulaire
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded-md shadow-sm max-w-md mx-auto"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          {t("titleLabel")}
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          {t("descriptionLabel")}
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {formState?.message && (
        <p
          className={`text-sm ${
            formState.issues || formState.fields
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {formState.message}
        </p>
      )}
      {formState?.issues && (
        <ul className="list-disc list-inside text-sm text-red-600">
          {formState.issues.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isPending ? t("submitButtonLoading") : t("submitButton")}
      </button>
    </form>
  );
}
