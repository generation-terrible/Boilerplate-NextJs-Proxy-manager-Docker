"use client";

import { useThemeStore, Theme } from "@/stores/theme.store";
import { Button } from "@/components/ui/button"; // En supposant que vous avez un composant Button de Shadcn/ui
import { Monitor, Sun, Moon, Palette } from "lucide-react"; // Pour les icônes

interface ThemeOption {
  value: Theme;
  label: string;
  icon?: React.ReactNode;
}

const themeOptions: ThemeOption[] = [
  { value: "light", label: "Clair", icon: <Sun className="w-4 h-4" /> },
  { value: "dark", label: "Sombre", icon: <Moon className="w-4 h-4" /> },
  { value: "system", label: "Système", icon: <Monitor className="w-4 h-4" /> },
  { value: "orange", label: "Orange", icon: <Palette className="w-4 h-4" /> }, // Icône générique pour les thèmes customs
  { value: "blue", label: "Bleu", icon: <Palette className="w-4 h-4" /> },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 border rounded-md">
      <span className="mr-2 font-semibold">Thème:</span>
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
