import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/forms/LoginForm";
import { Suspense } from "react"; // Pour Suspense autour de LoginForm si nécessaire avec useSearchParams

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: "LoginPage",
  });
  return {
    title: t("formTitle"),
  };
}

// Enveloppons le contenu principal dans une fonction pour utiliser Suspense
// car LoginForm utilise useSearchParams, ce qui opte la page pour un rendu dynamique côté client
// au lieu d'un rendu statique, sauf si enveloppé dans Suspense.
// Cependant, LoginForm étant déjà "use client", Suspense ici est surtout pour la bonne pratique
// si d'autres composants serveurs sur cette page dépendaient de searchParams.
function LoginPageContent({ translations: pageTranslations }) {
  return <LoginForm translations={pageTranslations} />;
}

export default async function LoginPage({ params, searchParams }) {
  const resolvedParams = await params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: "LoginPage",
  });

  const allTranslations = {
    formTitle: t("formTitle"),
    emailLabel: t("emailLabel"),
    emailPlaceholder: t("emailPlaceholder"),
    passwordLabel: t("passwordLabel"),
    passwordPlaceholder: t("passwordPlaceholder"),
    submitButtonText: t("submitButton"),
    submitButtonLoadingText: t("submitButtonLoading"),
    emailAndPasswordRequiredError: t("emailAndPasswordRequired"),
    invalidCredentialsError: t("invalidCredentials"),
    loginFailedUnexpectedlyError: t("loginFailedUnexpectedly"),
    networkOrServerError: t("networkOrServerError"),
    noAccountYetText: t("noAccountYet"),
    registerLinkText: t("registerLink"),
    loadingSessionText: t("loadingSession"),
  };

  // searchParams sont passés au composant client via son propre hook useSearchParams.
  // Il n'est pas nécessaire de les passer explicitement en props ici car LoginForm est un Client Component
  // et peut appeler useSearchParams directement.
  // L'important est que la page elle-même soit capable de recevoir searchParams si elle en avait besoin côté serveur.

  return (
    <Suspense fallback={<div>{t("loadingSession")}</div>}>
      <LoginPageContent translations={allTranslations} />
    </Suspense>
  );
}
