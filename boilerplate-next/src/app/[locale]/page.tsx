// import { Metadata } from "next"; // Retiré, generateMetadata est utilisé
import { CreateTaskForm } from "@/components/forms/CreateTaskForm";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { getTranslations } from "next-intl/server";

// Définir un type pour les props de la page et de generateMetadata en accord avec Next.js 15
type PageParams = Promise<{
  locale: string;
  [key: string]: string | string[] | undefined;
}>;

type LocalePageProps = {
  params: PageParams;
  // searchParams?: { [key: string]: string | string[] | undefined }; // Si vous utilisez searchParams
};

// Générer les métadonnées dynamiquement et localisées
export async function generateMetadata({
  params: paramsPromise,
}: LocalePageProps) {
  const awaitedParams = await paramsPromise;
  const locale = awaitedParams.locale;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return {
    title: `${t("createTaskTitle")} | Mon Super Boilerplate`,
    description: t("boilerplateDescription"),
  };
}

export default async function Home({ params: paramsPromise }: LocalePageProps) {
  const awaitedParams = await paramsPromise;
  const locale = awaitedParams.locale;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-xl space-y-8">
        <ThemeSwitcher />
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {t("welcome")}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t("boilerplateDescription")}
          </p>
        </div>
        <CreateTaskForm />
      </div>
    </main>
  );
}
