import { getTranslations } from "next-intl/server";
import { HomePageClientContent } from "@/components/client/HomePageClientContent";

// Générer les métadonnées dynamiquement et localisées (reste côté serveur)
export async function generateMetadata({ params: paramsPromise }) {
  const awaitedParams = await paramsPromise;
  const locale = awaitedParams.locale;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return {
    title: `${t("welcome")} | Mon Super Boilerplate`,
    description: t("boilerplateDescription"),
  };
}

// La page est maintenant un Server Component
export default async function Home({ params: paramsPromise }) {
  const awaitedParams = await paramsPromise;
  const locale = awaitedParams.locale;

  // Récupérer les traductions côté serveur
  const tHomePage = await getTranslations({ locale, namespace: "HomePage" });
  const tToasts = await getTranslations({ locale, namespace: "Toasts" });

  const allTranslations = {
    welcomeText: tHomePage("welcome"),
    descriptionText: tHomePage("boilerplateDescription"),
    successToastMessage: tToasts("successMessageDefault"),
    errorToastMessage: tToasts("errorMessageDefault"),
    showSuccessButtonText: tHomePage("showSuccessToastButton"),
    showErrorButtonText: tHomePage("showErrorToastButton"),
  };

  return <HomePageClientContent translations={allTranslations} />;
}
