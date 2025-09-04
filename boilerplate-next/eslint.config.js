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
  eslint.configs.recommended,
  {
    files: ["src/**/*.{js,jsx}", "tests/**/*.js"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "no-undef": "off", // Désactiver car pose problème avec JSX et globals
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        React: "readonly",
        console: "readonly",
        process: "readonly",
        localStorage: "readonly",
        FormData: "readonly",
        URL: "readonly",
        fetch: "readonly"
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
