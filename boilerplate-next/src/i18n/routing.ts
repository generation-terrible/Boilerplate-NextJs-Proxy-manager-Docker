// import { Pathnames, LocalePrefix } from "next-intl/routing"; // Supprimé car non utilisé

export const locales = ["en", "fr"];

export const defaultLocale = "fr"; // Choisissons le français par défaut
export const localePrefix = "always"; // Changer pour "always"

// Pour afficher les noms des langues dans le sélecteur
export const localeNames = {
  en: "English",
  fr: "Français",
};

// Pour afficher les drapeaux
export const localeFlags = {
  en: "🇬🇧", // Ou 🇺🇸 si vous préférez
  fr: "🇫🇷",
};

// Fonction type guard pour vérifier si une chaîne est une AppLocale valide
export function isValidLocale(locale) {
  // Check if the locale is one of the keys in our locales array
  return locales.includes(locale);
}

// Optionnel: si vous voulez des chemins différents par langue (par exemple /about vs /a-propos)
// export const pathnames = {
//   '/': '/',
//   '/about': {
//     en: '/about',
//     fr: '/a-propos'
//   }
// };
