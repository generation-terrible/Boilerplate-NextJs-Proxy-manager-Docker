"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("LoginPage"); // Créez des traductions pour LoginPage dans vos fichiers JSON
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/"; // Rediriger vers la racine par défaut

  useEffect(() => {
    // Si l'utilisateur est déjà connecté et essaie d'accéder à /login,
    // redirigez-le vers la callbackUrl ou la page d'accueil.
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError(t("emailAndPasswordRequired"));
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false, // Important pour gérer la réponse ici
        email,
        password,
      });

      if (result?.error) {
        setError(t("invalidCredentials")); // Utilisez une clé de traduction plus générique
        // result.error peut contenir des détails techniques non traduisibles
        // ou spécifiques au provider (ex: "CredentialsSignin")
        console.error("Sign in error:", result.error);
      } else if (result?.ok) {
        // La connexion a réussi, la session sera mise à jour par useSession
        // La redirection est gérée par le useEffect ci-dessus ou ci-dessous
        router.push(callbackUrl);
      } else {
        // Cas inattendu
        setError(t("loginFailedUnexpectedly"));
      }
    } catch (err) {
      console.error("Login submission error:", err);
      setError(t("networkOrServerError"));
    } finally {
      setLoading(false);
    }
  };

  // Si la session est en cours de chargement, ou si l'utilisateur est déjà authentifié (et la redirection est en cours)
  // afficher un message de chargement ou rien pour éviter un flash de contenu.
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{t("loadingSession")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-card shadow-lg rounded-lg p-8 w-full max-w-md space-y-6 border border-border"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          {t("formTitle")}
        </h2>
        {error && (
          <div className="text-red-600 text-sm text-center p-2 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="email">
            {t("emailLabel")}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-background border-input focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t("emailPlaceholder")}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="password">
            {t("passwordLabel")}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-background border-input focus:outline-none focus:ring-2 focus:ring-primary"
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={t("passwordPlaceholder")}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? t("submitButtonLoading") : t("submitButton")}
        </button>
        <div className="text-center text-sm mt-2">
          {t("noAccountYet")}{" "}
          {/* Adaptez le lien d'inscription si nécessaire */}
          <a href="./register" className="underline text-primary">
            {t("registerLink")}
          </a>
        </div>
      </form>
    </div>
  );
}
