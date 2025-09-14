import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    template: "%s | SaaS Boilerplate",
    default: "SaaS Boilerplate - Next.js 15 with Authentication",
  },
  description: "Production-ready SaaS boilerplate with Next.js 15, TypeScript, Authentication, and more",
};

// Permet à Next.js de connaître les locales supportées pour la génération statique
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params: paramsPromise,
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
                position="top-center"
                toastOptions={{
                  className: "!bg-background !text-foreground !border-border",
                  duration: 4000,
                  style: {
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    backdropFilter: "blur(8px)",
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "12px 16px",
                    minWidth: "300px",
                    maxWidth: "500px",
                  },
                  success: {
                    duration: 3000,
                    style: {
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      border: "1px solid hsl(var(--primary))",
                      borderLeftWidth: "4px",
                      borderLeftColor: "hsl(var(--primary))",
                    },
                    iconTheme: {
                      primary: "hsl(var(--primary))",
                      secondary: "hsl(var(--primary-foreground))",
                    },
                  },
                  error: {
                    duration: 5000,
                    style: {
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      border: "1px solid hsl(var(--destructive))",
                      borderLeftWidth: "4px",
                      borderLeftColor: "hsl(var(--destructive))",
                    },
                    iconTheme: {
                      primary: "hsl(var(--destructive))",
                      secondary: "hsl(var(--destructive-foreground))",
                    },
                  },
                  loading: {
                    style: {
                      background: "hsl(var(--background))",
                      color: "hsl(var(--foreground))",
                      border: "1px solid hsl(var(--muted-foreground))",
                      borderLeftWidth: "4px",
                      borderLeftColor: "hsl(var(--muted-foreground))",
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
