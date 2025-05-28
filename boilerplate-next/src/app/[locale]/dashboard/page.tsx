import { getTranslations } from "next-intl/server";
import { auth } from "@/auth"; // Importer auth depuis votre configuration
import { DashboardClientContent } from "@/components/client/DashboardClientContent";
import { redirect } from "next/navigation"; // Pour la redirection si non authentifié
import type { Session } from "next-auth"; // Importer le type Session

type LocalePageProps = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params }: LocalePageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "DashboardPage",
  });
  // nous n'avons pas encore la session ici de manière simple. Gardons un titre générique.
  return {
    title: t("title"),
  };
}

export default async function DashboardPage({ params }: LocalePageProps) {
  const session = await auth(); // Utiliser auth() pour récupérer la session
  const locale = params.locale;

  // Si aucune session, rediriger vers login (le middleware devrait déjà le faire, mais c'est une double sécurité)
  if (!session) {
    redirect(`/${locale}/login?callbackUrl=/${locale}/dashboard`);
  }

  const t = await getTranslations({ locale, namespace: "DashboardPage" });

  // Les traductions qui n'ont PAS besoin d'interpolation dynamique côté CLIENT
  // ou qui sont simples peuvent être passées.
  // welcomeMessage sera géré par le client avec useTranslations.
  const translationsForClient = {
    title: t("title"), // Peut toujours être utile pour le client, même si title vient aussi de metadata
    loadingSession: t("loadingSession"),
    accessDenied: t("accessDenied"),
    guest: t("guest"),
    emailLabel: t("emailLabel"),
    roleLabel: t("roleLabel"),
    adminRole: t("adminRole"),
    userRole: t("userRole"),
    sessionInfoTitle: t("sessionInfoTitle"),
  };

  return (
    <DashboardClientContent
      translations={translationsForClient} // Ne contient plus welcomeMessage(Template)
      initialSession={session as Session} // Passer la session (typée) au composant client
    />
  );
}
