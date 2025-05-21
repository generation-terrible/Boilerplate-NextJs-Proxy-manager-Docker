"use client";

import { useEffect } from "react";
import { useThemeStore, Theme } from "@/stores/theme.store";

// Ce mapping aide à traduire notre état de thème en classes CSS réelles.
const themeClassMap: Record<Exclude<Theme, "system">, string> = {
  light: "light", // ou vide si light est l'absence de .dark et de .theme-*
  dark: "dark",
  orange: "theme-orange",
  blue: "theme-blue",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    // Supprimer les anciennes classes de thème (sauf 'light' qui peut être l'absence de classe)
    Object.values(themeClassMap).forEach((cls) => {
      if (cls !== "light") root.classList.remove(cls);
    });
    root.classList.remove("light"); // Assurer la suppression de light aussi

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      const systemThemeClass = themeClassMap[systemTheme];
      if (systemThemeClass && systemThemeClass !== "light") {
        root.classList.add(systemThemeClass);
      }
      // Si systemTheme est 'light', aucune classe spécifique n'est nécessaire par défaut,
      // ou on ajoute explicitement 'light' si le CSS l'attend.
      // Pour être sûr, si votre CSS pour :root est le thème clair, c'est bon.
      // Si vous avez une classe .light explicite pour le thème clair :
      // else if (systemThemeClass === 'light') {
      //   root.classList.add('light');
      // }
    } else {
      const currentThemeClass = themeClassMap[theme];
      if (currentThemeClass && currentThemeClass !== "light") {
        root.classList.add(currentThemeClass);
      }
      // Si le thème sélectionné est 'light' et que vous avez une classe .light :
      // else if (currentThemeClass === 'light') {
      //   root.classList.add('light');
      // }
    }
  }, [theme]);

  return <>{children}</>;
}
