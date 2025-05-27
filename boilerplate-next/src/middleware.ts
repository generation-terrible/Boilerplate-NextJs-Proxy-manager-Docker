import { auth } from "@/auth";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, localePrefix } from "./i18n/routing";
import { Session } from "next-auth";

const publicPagePatterns = ["/login"];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

interface AuthenticatedRequest extends NextRequest {
  auth?: Session | null;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPagePatterns.join("|")})/?$`,
    "i"
  );

  const isPublicPageRequest = publicPathnameRegex.test(pathname);
  const isApiAuthRoute = pathname.startsWith("/api/auth");

  if (isPublicPageRequest || isApiAuthRoute) {
    return intlMiddleware(request);
  }

  return auth((req: AuthenticatedRequest) => {
    return intlMiddleware(req as NextRequest);
  })(request, {} as any) as any;
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|api/).*)", "/"],
};
