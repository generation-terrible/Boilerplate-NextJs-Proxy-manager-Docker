"use client";

import { useSession } from "next-auth/react"; // Reste ici pour le status, mais les données de session initiales peuvent venir des props
import { useTranslations } from "next-intl"; // Importer useTranslations

export function DashboardClientContent({
  translations: passedT, // Renommer pour éviter confusion avec le t de useTranslations
  initialSession,
}) {
  const t = useTranslations("DashboardPage"); // Hook pour les traductions dynamiques
  // Utiliser useSession pour le statut et les mises à jour, mais initialSession pour le premier rendu
  const { data: sessionFromHook, status } = useSession();

  // Donner la priorité à initialSession pour éviter un flash, puis utiliser la session du hook
  const session =
    status === "loading" && !initialSession
      ? null
      : initialSession || sessionFromHook;

  if (status === "loading" && !initialSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{passedT.loadingSession}</p>
      </div>
    );
  }

  // La redirection pour "unauthenticated" est principalement gérée par le middleware.
  // Si on arrive ici non authentifié (et initialSession est null), c'est un cas limite.
  if (!session) {
    // Vérifie si la session (après logique de priorité) est absente
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{passedT.accessDenied}</p>
      </div>
    );
  }

  // Formatter le message de bienvenue côté client en utilisant le hook t()
  const welcomeMessage = t("welcomeMessage", {
    userName: session.user?.name || passedT.guest,
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">{passedT.title}</h1>
      </header>
      <main>
        <p className="text-lg mb-4">{welcomeMessage}</p>

        {session.user?.email && (
          <p className="mb-2">
            <span className="font-semibold">{passedT.emailLabel}:</span>{" "}
            {session.user.email}
          </p>
        )}

        {/* Vérification de isAdmin */}
        {typeof session.user?.isAdmin === "boolean" && (
          <p className="mb-2">
            <span className="font-semibold">{passedT.roleLabel}:</span>
            {session.user.isAdmin ? passedT.adminRole : passedT.userRole}
          </p>
        )}

        <div className="mt-6 p-4 border border-border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-2 text-accent-foreground">
            {passedT.sessionInfoTitle}
          </h2>
          <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
}
