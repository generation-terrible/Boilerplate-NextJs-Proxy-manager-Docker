"use client";

import { useThemeStore } from "@/stores/theme.store";
import { Button } from "@/components/ui/button"; // En supposant que vous avez un composant Button de Shadcn/ui
import { Monitor, Sun, Moon, Palette } from "lucide-react"; // Pour les icônes
import { useTranslations } from "next-intl"; // Ajout

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();
  const t = useTranslations("ThemeSwitcher"); // Ajout

  const themeOptions = [
    { value: "light", label: t("light"), icon: <Sun className="w-4 h-4" /> },
    { value: "dark", label: t("dark"), icon: <Moon className="w-4 h-4" /> },
    {
      value: "system",
      label: t("system"),
      icon: <Monitor className="w-4 h-4" />,
    },
    {
      value: "orange",
      label: t("orange"),
      icon: <Palette className="w-4 h-4" />,
    }, // Icône générique pour les thèmes customs
    { value: "blue", label: t("blue"), icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 border rounded-md">
      <span className="mr-2 font-semibold">{t("label")}</span>
      {themeOptions.map((option) => (
        <Button
          key={option.value}
          variant={theme === option.value ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme(option.value)}
          className="flex items-center gap-2"
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </div>
  );
}
