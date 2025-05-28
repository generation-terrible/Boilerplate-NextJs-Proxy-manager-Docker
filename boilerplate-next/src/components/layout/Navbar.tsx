"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, Menu as MenuIcon } from "lucide-react";
import {
  locales,
  localeNames,
  defaultLocale,
  localeFlags,
} from "@/i18n/routing";

const Sheet = dynamic(() =>
  import("@/components/ui/sheet").then((mod) => mod.Sheet)
);
const SheetContent = dynamic(() =>
  import("@/components/ui/sheet").then((mod) => mod.SheetContent)
);
const SheetHeader = dynamic(() =>
  import("@/components/ui/sheet").then((mod) => mod.SheetHeader)
);
const SheetTitle = dynamic(() =>
  import("@/components/ui/sheet").then((mod) => mod.SheetTitle)
);
const SheetTrigger = dynamic(() =>
  import("@/components/ui/sheet").then((mod) => mod.SheetTrigger)
);
const SheetClose = dynamic(() =>
  import("@/components/ui/sheet").then((mod) => mod.SheetClose)
);

export function Navbar() {
  const t = useTranslations("Navbar");
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
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

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2 md:space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">{t("changeLanguage")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {locales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  disabled={currentLocale === loc}
                >
                  <span className="mr-2">{localeFlags[loc]}</span>
                  {localeNames[loc] || loc.toUpperCase()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="md:hidden">
            {Sheet &&
              SheetTrigger &&
              SheetContent &&
              SheetHeader &&
              SheetTitle &&
              SheetClose && (
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MenuIcon className="h-6 w-6" />
                      <span className="sr-only">{t("openMenu")}</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[280px] sm:w-[320px] pt-8"
                  >
                    <SheetHeader className="mb-4">
                      <SheetTitle className="text-center text-xl">
                        {t("openMenu")}
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-3">
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className="text-lg hover:text-primary transition-colors py-2 px-4 rounded-md text-center"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
}
