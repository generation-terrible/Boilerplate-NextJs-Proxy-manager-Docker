// import type { Metadata } from "next"; // Supprimé car non utilisé
import { Inter } from "next/font/google";
import "./global.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, isValidLocale } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"] });

// Optionnel: pour générer des métadonnées localisées
// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
//   const messages = (await import(`../../../messages/${locale}.json`)).default;
//   // Exemple: supposer que vous avez une clé "siteTitle" dans vos messages
//   const t = (key: string) => messages.Metadata?.[key] || key;
//   return {
//     title: t('siteTitle'),
//   };
// }

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
  setRequestLocale(locale);

  // Charger les messages pour la locale actuelle
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    notFound(); // Appeler notFound si getMessages échoue
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
