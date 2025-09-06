import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { locales, defaultLocale } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const validLocalesArray = locales; // locales est déjà un tableau

  let localeToUse = locale;

  if (!localeToUse) {
    localeToUse = defaultLocale;
  }

  if (!validLocalesArray.includes(localeToUse)) {
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
