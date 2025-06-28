"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm({ translations: t }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError(t.emailAndPasswordRequiredError);
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError(t.invalidCredentialsError);
        } else {
          setError(t.loginFailedUnexpectedlyError + ` (${result.error})`);
        }
        console.error("Sign in error:", result.error);
      } else if (result?.ok) {
        router.push(callbackUrl);
      } else {
        setError(t.loginFailedUnexpectedlyError);
      }
    } catch (err) {
      console.error("Login submission error:", err);
      setError(t.networkOrServerError);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{t.loadingSessionText}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-card shadow-lg rounded-lg p-8 w-full max-w-md space-y-6 border border-border"
      >
        <h2 className="text-2xl font-bold text-center mb-2">{t.formTitle}</h2>
        {error && (
          <div className="text-red-600 text-sm text-center p-2 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="email">
            {t.emailLabel}
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
            placeholder={t.emailPlaceholder}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="password">
            {t.passwordLabel}
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
            placeholder={t.passwordPlaceholder}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? t.submitButtonLoadingText : t.submitButtonText}
        </button>
        <div className="text-center text-sm mt-2">
          {t.noAccountYetText}{" "}
          <a href="./register" className="underline text-primary">
            {t.registerLinkText}
          </a>
        </div>
      </form>
    </div>
  );
}
