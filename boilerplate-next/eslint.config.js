// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
// import reactPlugin from 'eslint-plugin-react'; // Souvent inclus via Next.js ou géré par des configs spécifiques
// import reactHooksPlugin from 'eslint-plugin-react-hooks'; // Idem
// import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'; // Idem

export default tseslint.config(
  {
    // Configuration globale, s'applique à tous les fichiers
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "public/**", // Si vous avez des fichiers générés ou statiques ici que vous ne voulez pas linter
      "playwright-report/**",
      "test-results/**",
      "*.config.js", // Exclut les fichiers de configuration JS à la racine (comme celui-ci, tailwind, postcss)
      "*.config.mjs",
      "*.config.ts", // Exclut les fichiers de config ts (playwright, vitest)
    ],
  },
  eslint.configs.recommended, // Règles recommandées par ESLint
  ...tseslint.configs.recommended, // Règles recommandées par typescript-eslint
  // Intégration des configurations de Next.js directement
  // @ts-expect-error Certaines configurations de plugins peuvent ne pas avoir de types parfaits pour tseslint
  nextPlugin.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  {
    // Configuration spécifique pour vos fichiers et règles personnalisées
    files: ["src/**/*.{ts,tsx}", "tests/**/*.ts"],
    // Les plugins sont généralement déclarés au niveau supérieur ou dans les configurations étendues.
    // Si nextPlugin.configs.recommended ne les inclut pas, vous pouvez les ajouter ici.
    // plugins: {
    //   '@next/next': nextPlugin,
    // },
    rules: {
      // Vos règles personnalisées ici :
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      // Assurez-vous que les règles de Next.js que vous voulez surcharger sont bien prises en compte.
      // Par exemple, si vous voulez modifier une règle de nextPlugin.configs.recommended,
      // vous la redéfinissez ici.
      // '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }],
    },
    languageOptions: {
      parserOptions: {
        project: true, // Important pour les règles qui nécessitent des informations de type
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        // Définir les globales si nécessaire, par exemple pour browser, node, etc.
        // browser: true,
        // node: true,
        // es2021: true,
      },
    },
    settings: {
      react: {
        version: "detect", // Détecte automatiquement la version de React
      },
    },
  }
);
