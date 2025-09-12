"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";

// Google SVG Icon Component
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// RegisterForm component avec translations en props
export function RegisterForm({ translations }) {
  // Destructure translations as t for convenience
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptCgu: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    
    try {
      // Pour Google OAuth, on doit utiliser redirect: true car c'est un flux externe
      await signIn("google", { 
        callbackUrl: "/dashboard",
        redirect: true
      });
    } catch (err) {
      console.error("Google sign in error:", err);
      setError("Erreur lors de l'inscription avec Google");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.acceptCgu
    ) {
      setError(translations.allFieldsRequiredError);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError(translations.passwordsDoNotMatchError);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          acceptCgu: form.acceptCgu,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || translations.registrationErrorDefault);
      } else {
        setSuccess(translations.registrationSuccessMessage);
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      setError(translations.networkError || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-card shadow-lg rounded-lg p-8 w-full max-w-md space-y-6 border border-border"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          {translations.formTitle}
        </h2>
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center">{success}</div>
        )}

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
        >
          <GoogleIcon />
          <span>S'inscrire avec Google</span>
        </button>

        {/* Separator */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative bg-card px-4 text-sm text-gray-500">
            ou
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="name">
            {translations.nameLabel}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-background border-input focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder={translations.namePlaceholder}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor="email">
            {translations.emailLabel}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-background border-input focus:outline-none focus:ring-2 focus:ring-primary"
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder={translations.emailPlaceholder}
          />
        </div>
        <div className="space-y-2 relative">
          <label className="block text-sm font-medium" htmlFor="password">
            {translations.passwordLabel}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-background border-input focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder={translations.passwordPlaceholder}
          />
          <button
            type="button"
            className="absolute right-2 top-8 text-xs text-muted-foreground"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword
              ? translations.hidePasswordText
              : translations.showPasswordText}
          </button>
        </div>
        <div className="space-y-2">
          <label
            className="block text-sm font-medium"
            htmlFor="confirmPassword"
          >
            {translations.confirmPasswordLabel}
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md bg-background border-input focus:outline-none focus:ring-2 focus:ring-primary"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder={translations.passwordPlaceholder}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="acceptCgu"
            name="acceptCgu"
            checked={form.acceptCgu}
            onChange={handleChange}
            className="accent-primary"
            required
          />
          <label htmlFor="acceptCgu" className="text-sm">
            {translations.acceptTermsPrefix}{" "}
            <Link href="/cgu" className="underline text-primary">
              {translations.termsAndConditionsLinkText}
            </Link>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? translations.submitButtonLoadingText
            : translations.submitButtonText}
        </button>
        <div className="text-center text-sm mt-2">
          {translations.alreadyHaveAccountText}{" "}
          <Link href="/login" className="underline text-primary">
            {translations.loginLinkText}
          </Link>
        </div>
      </form>
    </div>
  );
}
