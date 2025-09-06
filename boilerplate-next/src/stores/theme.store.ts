import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useThemeStore = create(
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
