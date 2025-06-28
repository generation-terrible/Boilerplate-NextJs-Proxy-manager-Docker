// import type { Metadata } from "next"; // Supprimé car non utilisé
import { Inter } from "next/font/google";
import "./global.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
// getMessages n'est plus utilisé ici, mais setRequestLocale l'est toujours pour les enfants
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, isValidLocale } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// Permet à Next.js de connaître les locales supportées pour la génération statique
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: paramsPromise, // params est maintenant une promesse
}) {
  const awaitedParams = await paramsPromise;
  const locale = awaitedParams.locale;

  if (!isValidLocale(locale)) {
    notFound();
  }

  // Permettre le rendu statique et fournir la locale aux Server Components enfants
  // (ex: getTranslations dans page.tsx)
  setRequestLocale(locale);

  // Charger les messages directement pour NextIntlClientProvider
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (e) {
    // Amélioration de la gestion des erreurs typées
    if (e instanceof Error) {
      console.error(`Failed to load messages for locale ${locale}:`, e.message);
    } else {
      console.error(
        `An unknown error occurred while loading messages for locale ${locale}`
      );
    }
    notFound(); // Appeler notFound si le chargement direct échoue
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  className: "",
                  duration: 5000,
                  style: {
                    background: "var(--background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: "green",
                      secondary: "white",
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: "red",
                      secondary: "white",
                    },
                  },
                }}
              />
              <Navbar />
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
