"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

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
