"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Globe, Menu as MenuIcon, Sun, Moon, Monitor, Palette, User, LogIn, LogOut } from "lucide-react";
import {
  locales,
  localeNames,
  defaultLocale,
  localeFlags,
} from "@/i18n/routing";
import { useThemeStore } from "@/stores/theme.store";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const t = useTranslations("Navbar");
  const tTheme = useTranslations("ThemeSwitcher");
  const { data: session, status } = useSession();
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();

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

  const themeOptions = [
    { value: "light", label: tTheme("light"), icon: Sun },
    { value: "dark", label: tTheme("dark"), icon: Moon },
    { value: "system", label: tTheme("system"), icon: Monitor },
    { value: "orange", label: tTheme("orange"), icon: Palette },
    { value: "blue", label: tTheme("blue"), icon: Palette },
  ];

  const getCurrentThemeIcon = () => {
    const currentOption = themeOptions.find(option => option.value === theme);
    return currentOption ? currentOption.icon : Monitor;
  };

  const CurrentThemeIcon = getCurrentThemeIcon();

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
          {/* Authentication Section */}
          {status === "loading" ? (
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center justify-center w-10 h-10 border border-border rounded-md hover:bg-accent transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Menu utilisateur</span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-56 bg-background border border-border rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium">{session.user?.name || session.user?.email}</p>
                    <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block w-full px-4 py-2 text-left hover:bg-accent transition-colors text-sm"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </span>
                  </Link>
                  {session.user?.isAdmin && (
                    <Link
                      href="/admin"
                      className="block w-full px-4 py-2 text-left hover:bg-accent transition-colors text-sm"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Administration
                      </span>
                    </Link>
                  )}
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      signOut();
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-accent transition-colors text-sm text-destructive"
                  >
                    <span className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      Se déconnecter
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signIn()}
                className="hidden sm:flex items-center"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Connexion
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signIn()}
                className="sm:hidden"
              >
                <LogIn className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="flex items-center justify-center w-10 h-10 border border-border rounded-md hover:bg-accent transition-colors"
            >
              <CurrentThemeIcon className="h-5 w-5" />
              <span className="sr-only">{tTheme("label")}</span>
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                {themeOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTheme(option.value);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-accent transition-colors flex items-center ${
                        theme === option.value ? 'bg-accent' : ''
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center justify-center w-10 h-10 border border-border rounded-md hover:bg-accent transition-colors"
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
                    className="w-full px-4 py-2 text-left hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
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
              className="flex items-center justify-center w-10 h-10 border border-border rounded-md hover:bg-accent transition-colors"
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
