import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Theme = "system" | "light" | "dark" | "orange" | "blue";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system", // Thème initial par défaut
      setTheme: (newTheme) => set({ theme: newTheme }),
    }),
    {
      name: "app-theme", // Nom de la clé dans localStorage
      storage: createJSONStorage(() => localStorage), // Utiliser localStorage
    }
  )
);
