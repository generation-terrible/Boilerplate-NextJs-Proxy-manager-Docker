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

const inter = Inter({ subsets: ["latin"] });

// Permet à Next.js de connaître les locales supportées pour la génération statique
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Définir un type pour les props du layout en accord avec Next.js 15
type LayoutParams = Promise<{
  locale: string;
  [key: string]: string | string[] | undefined;
}>;

type RootLayoutProps = {
  children: React.ReactNode;
  params: LayoutParams;
};

export default async function RootLayout({
  children,
  params: paramsPromise, // params est maintenant une promesse
}: RootLayoutProps) {
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
  } catch (error) {
    notFound(); // Appeler notFound si le chargement direct échoue
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider>
              <Navbar />
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
