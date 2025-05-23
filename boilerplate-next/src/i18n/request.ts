import { getRequestConfig } from "next-intl/server";
import {
  isValidLocale,
  defaultLocale,
  locales as validLocalesArray,
} from "./routing"; // Importer aussi defaultLocale et locales
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale: receivedLocale }) => {
  // console.log(`[getRequestConfig] Received locale: ${receivedLocale}, Type: ${typeof receivedLocale}`); // Log 1 Supprimé

  let localeToUse;
  if (typeof receivedLocale === "string" && isValidLocale(receivedLocale)) {
    localeToUse = receivedLocale;
    // console.log(`[getRequestConfig] Using receivedLocale: ${localeToUse}`); // Log 2 Supprimé
  } else {
    localeToUse = defaultLocale;
    // console.log(`[getRequestConfig] receivedLocale '${receivedLocale}' is invalid or not a string. Falling back to defaultLocale: ${localeToUse}`); // Log 3 Supprimé
  }

  if (!validLocalesArray.includes(localeToUse as any)) {
    // console.log(`[getRequestConfig] localeToUse '${localeToUse}' is not in validLocalesArray. Calling notFound().`); // Log 4 Supprimé
    notFound();
  }

  // console.log(`[getRequestConfig] Attempting to load messages for locale: ${localeToUse}`); // Log 5 Supprimé
  try {
    const messages = (await import(`../../messages/${localeToUse}.json`))
      .default;
    // console.log(`[getRequestConfig] Successfully loaded messages for ${localeToUse}. Keys:`, Object.keys(messages.CreateTaskForm || {})); // Log 6 Supprimé
    return {
      locale: localeToUse,
      messages: messages,
    };
  } catch (error) {
    // console.error(`[getRequestConfig] Failed to load messages for ${localeToUse}:`, error); // Log 7 Supprimé (ou peut être conservé/affiné)
    notFound();
  }
});
