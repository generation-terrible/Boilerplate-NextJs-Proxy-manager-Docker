import { getRequestConfig } from "next-intl/server";
import {
  isValidLocale,
  defaultLocale,
  locales as validLocalesArray,
} from "./routing"; // Importer aussi defaultLocale et locales
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale: receivedLocale }) => {
  let localeToUse;
  if (typeof receivedLocale === "string" && isValidLocale(receivedLocale)) {
    localeToUse = receivedLocale;
  } else {
    localeToUse = defaultLocale;
  }

  if (!validLocalesArray.includes(localeToUse as any)) {
    notFound();
  }

  try {
    const messages = (await import(`../../messages/${localeToUse}.json`))
      .default;
    return {
      locale: localeToUse,
      messages: messages,
    };
  } catch (error) {
    notFound();
  }
});
