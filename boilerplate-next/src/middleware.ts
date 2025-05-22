import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, localePrefix } from "./i18n/routing"; // Nous créerons ce fichier ensuite

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // Prepend the locale prefix (e.g. `/en`) to pathnames
  localePrefix,
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
