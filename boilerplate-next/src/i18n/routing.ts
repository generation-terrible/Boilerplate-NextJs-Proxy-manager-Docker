// import { Pathnames, LocalePrefix } from "next-intl/routing"; // Supprimé car non utilisé

export const locales = ["en", "fr"] as const;
export type AppLocale = (typeof locales)[number]; // Crée le type union "en" | "fr"

export const defaultLocale = "fr" as const; // Choisissons le français par défaut
export const localePrefix = "always"; // Type simplifié

// Fonction type guard pour vérifier si une chaîne est une AppLocale valide
export function isValidLocale(locale: string): locale is AppLocale {
  // Check if the locale is one of the keys in our locales array
  return (locales as readonly string[]).includes(locale);
}

// Optionnel: si vous voulez des chemins différents par langue (par exemple /about vs /a-propos)
// export const pathnames: Pathnames<typeof locales> = {
//   '/': '/',
//   '/about': {
//     en: '/about',
//     fr: '/a-propos'
//   }
// };
