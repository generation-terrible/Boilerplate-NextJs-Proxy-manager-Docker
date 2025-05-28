import { auth } from "@/auth";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, localePrefix } from "./i18n/routing";
import { Session } from "next-auth";

// Pages d'authentification (où un utilisateur authentifié ne devrait pas aller)
const authPagePatterns = ["/login", "/register"];
// Pages publiques (accessibles sans authentification)
// Pour l'instant, nous considérons les pages d'authentification comme publiques
// car le middleware auth gérera la redirection si l'utilisateur est déjà connecté.
// Si vous avez d'autres pages purement publiques (ex: /about), ajoutez-les ici.
const publicPagePatterns: string[] = [];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

interface AuthenticatedRequest extends NextRequest {
  auth?: Session | null;
}

export default auth((req: AuthenticatedRequest) => {
  const { nextUrl } = req;
  const session = req.auth; // La session est disponible ici grâce au middleware `auth`
  const isLoggedIn = !!session;

  const locale =
    locales.find((l) => nextUrl.pathname.startsWith(`/${l}`)) || defaultLocale;
  const pathnameWithoutLocale =
    nextUrl.pathname.replace(`/${locale}`, "") || "/";

  const isAuthPage = authPagePatterns.some((pattern) =>
    pathnameWithoutLocale.startsWith(pattern)
  );
  const isPublicPage = publicPagePatterns.some((pattern) =>
    pathnameWithoutLocale.startsWith(pattern)
  );
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth"); // Pas de préfixe de locale pour les routes API

  // Si l'utilisateur est connecté et essaie d'accéder à une page d'authentification
  if (isLoggedIn && isAuthPage) {
    // Rediriger vers le dashboard avec la locale actuelle
    const dashboardUrl = new URL(`/${locale}/dashboard`, nextUrl.origin);
    return NextResponse.redirect(dashboardUrl);
  }

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page non publique et non API auth
  if (!isLoggedIn && !isPublicPage && !isAuthPage && !isApiAuthRoute) {
    // Rediriger vers la page de connexion avec la locale actuelle et callbackUrl
    const loginUrl = new URL(`/${locale}/login`, nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // Pour toutes les autres requêtes (utilisateurs connectés sur des pages protégées,
  // utilisateurs non connectés sur des pages publiques/auth, routes API),
  // on applique simplement le middleware d'internationalisation.
  return intlMiddleware(req as NextRequest);
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|api/).*)", "/"],
};
