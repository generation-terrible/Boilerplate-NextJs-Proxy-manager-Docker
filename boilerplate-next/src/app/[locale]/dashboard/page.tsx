"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server"; // Importer pour Server Components si nécessaire, mais ici c'est un Client Component

// Note: Si cette page était un Server Component, vous auriez besoin de `getTranslations`
// et potentiellement de `setRequestLocale` si vous passez la locale via params.
// Pour un Client Component, `useTranslations` et `useSession` suffisent.

export default function DashboardPage() {
  const t = useTranslations("DashboardPage"); // Créez des traductions pour DashboardPage
  const { data: session, status } = useSession();

  // setRequestLocale n'est pas nécessaire ici car c'est un client component
  // et la locale est gérée par NextIntlClientProvider dans le layout.

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{t("loadingSession")}</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    // Normalement, le middleware devrait déjà avoir redirigé.
    // Ceci est une sécurité supplémentaire ou pour des cas où le middleware ne s'appliquerait pas.
    // Dans une application réelle, vous pourriez rediriger ici ou afficher un message d'accès refusé.
    // Pour ce test, le middleware est censé gérer la redirection.
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{t("accessDenied")}</p>
      </div>
    );
  }

  // status === "authenticated"
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">{t("title")}</h1>
      </header>
      <main>
        <p className="text-lg mb-4">
          {t("welcomeMessage", { userName: session?.user?.name || t("guest") })}
        </p>

        {session?.user?.email && (
          <p className="mb-2">
            <span className="font-semibold">{t("emailLabel")}:</span>{" "}
            {session.user.email}
          </p>
        )}

        {typeof session?.user?.isAdmin === "boolean" && (
          <p className="mb-2">
            <span className="font-semibold">{t("roleLabel")}:</span>
            {session.user.isAdmin ? t("adminRole") : t("userRole")}
          </p>
        )}

        <div className="mt-6 p-4 border border-border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-2 text-accent-foreground">
            {t("sessionInfoTitle")}
          </h2>
          <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
}
