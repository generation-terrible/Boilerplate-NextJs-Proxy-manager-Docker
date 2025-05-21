import { Metadata } from "next";
import { CreateTaskForm } from "@/components/forms/CreateTaskForm";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export const metadata: Metadata = {
  title: "Mon Super Boilerplate | Créer Tâche",
  description:
    "Une description de mon application et un formulaire pour créer une tâche.",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <div className="w-full max-w-xl space-y-8">
        <ThemeSwitcher />
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Bienvenue !
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Ceci est votre Boilerplate Next.js. Voici un exemple de formulaire
            pour créer une tâche.
          </p>
        </div>

        <CreateTaskForm />
      </div>
    </main>
  );
}
