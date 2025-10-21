"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Globe, Menu as MenuIcon, Sun, Moon, Monitor, Palette, User, LogIn, LogOut, X, ChevronDown } from "lucide-react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useThemeStore();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-menu')) {
        setIsLanguageMenuOpen(false);
        setIsThemeMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    { href: "/contact", label: t("contact") },
  ];

  const themeOptions = [
    { value: "light", label: tTheme("light"), icon: Sun },
    { value: "dark", label: tTheme("dark"), icon: Moon },
    { value: "system", label: tTheme("system"), icon: Monitor },
    { value: "orange", label: tTheme("orange"), icon: Palette },
    { value: "blue", label: tTheme("blue"), icon: Palette },
    { value: "purple", label: tTheme("purple"), icon: Palette },
    { value: "green", label: tTheme("green"), icon: Palette },
  ];

  const getCurrentThemeIcon = () => {
    const currentOption = themeOptions.find(option => option.value === theme);
    return currentOption ? currentOption.icon : Monitor;
  };

  const CurrentThemeIcon = getCurrentThemeIcon();

  return (
    <nav className={`bg-background/80 backdrop-blur-lg border-b sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg border-border/50' : 'border-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-bold text-xl text-primary hover:text-primary/80 transition-colors"
          >
            {t("siteTitle")}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname === `/${currentLocale}${link.href}`;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-foreground/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Authentication Section */}
            {status === "loading" ? (
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            ) : session ? (
              <div className="relative dropdown-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 hidden sm:block ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-background/95 backdrop-blur-lg border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border/50 bg-muted/20">
                      <p className="text-sm font-medium">{session.user?.name || session.user?.email}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center px-4 py-2 text-sm hover:bg-accent/50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3 text-muted-foreground" />
                        Dashboard
                      </Link>
                      {session.user?.isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent/50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="h-4 w-4 mr-3 text-muted-foreground" />
                          Administration
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-border/50 py-2">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          signOut();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => signIn()}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm"
                variant="default"
              >
                <LogIn className="h-4 w-4" />
                <span>Connexion</span>
              </Button>
            )}

            {/* Theme Selector */}
            <div className="relative dropdown-menu">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent transition-colors duration-200"
              >
                <CurrentThemeIcon className="h-5 w-5" />
              </button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background/95 backdrop-blur-lg border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="py-2">
                    {themeOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            setTheme(option.value);
                            setIsThemeMenuOpen(false);
                          }}
                          className={`w-full flex items-center px-4 py-2 text-sm hover:bg-accent/50 transition-colors ${
                            theme === option.value ? 'bg-accent/30 text-primary' : ''
                          }`}
                        >
                          <IconComponent className="h-4 w-4 mr-3 text-muted-foreground" />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative dropdown-menu">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent transition-colors duration-200"
              >
                <Globe className="h-5 w-5" />
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background/95 backdrop-blur-lg border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="py-2">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLocaleChange(loc)}
                        disabled={currentLocale === loc}
                        className={`w-full flex items-center px-4 py-2 text-sm hover:bg-accent/50 transition-colors disabled:opacity-50 ${
                          currentLocale === loc ? 'bg-accent/30 text-primary' : ''
                        }`}
                      >
                        <span className="mr-3 text-lg">{localeFlags[loc]}</span>
                        {localeNames[loc] || loc.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 pb-6' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="pt-4 border-t border-border/50">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname === `/${currentLocale}${link.href}`;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-foreground/70 hover:bg-accent/50 hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              {/* Mobile Auth Button */}
              {!session && (
                <div className="pt-4 border-t border-border/50">
                  <Button
                    onClick={() => {
                      signIn();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Connexion</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
