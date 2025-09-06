"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Globe, Menu as MenuIcon } from "lucide-react";
import {
  locales,
  localeNames,
  defaultLocale,
  localeFlags,
} from "@/i18n/routing";

export function Navbar() {
  const t = useTranslations("Navbar");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const handleLocaleChange = (newLocale) => {
    let newPathWithoutLocale = pathname;
    if (newPathWithoutLocale.startsWith(`/${currentLocale}`)) {
      newPathWithoutLocale =
        newPathWithoutLocale.substring(`/${currentLocale}`.length) || "/";
    }
    const finalPushPath = `/${newLocale}${
      newPathWithoutLocale === "/" ? "" : newPathWithoutLocale
    }`;
    router.push(finalPushPath);
    setIsMobileMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/features", label: t("features") },
    { href: "/pricing", label: t("pricing") },
    { href: "/about", label: t("about") },
  ];

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-xl text-primary">
          {t("siteTitle")}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center justify-center w-10 h-10 border border-border rounded-md hover:bg-accent"
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">{t("changeLanguage")}</span>
            </button>

            {isLanguageMenuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    disabled={currentLocale === loc}
                    className="w-full px-4 py-2 text-left hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <span className="mr-2">{localeFlags[loc]}</span>
                    {localeNames[loc] || loc.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 border border-border rounded-md hover:bg-accent"
            >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">{t("openMenu")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-lg hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
