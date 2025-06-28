// @ts-check

import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    // Configuration globale, s'applique à tous les fichiers
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "public/**",
      "playwright-report/**",
      "test-results/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
  eslint.configs.recommended, // Règles recommandées par ESLint
  nextPlugin.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  {
    // Configuration spécifique pour vos fichiers et règles personnalisées
    files: ["src/**/*.{js,jsx}", "tests/**/*.js"],
    rules: {
      // Vos règles personnalisées ici :
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
    languageOptions: {
      globals: {
        // Définir les globales si nécessaire
      },
    },
    settings: {
      react: {
        version: "detect", // Détecte automatiquement la version de React
      },
    },
  },
];
