import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Navbar } from "./Navbar";

// Mock pour next-intl
vi.mock("next-intl", () => ({
  useTranslations: vi.fn((namespace) => {
    // Retourne une fonction de traduction basique pour nos tests
    // Vous pouvez l'étendre si vous avez besoin de plus de clés
    const translations: Record<string, Record<string, string>> = {
      Navbar: {
        siteTitle: "Test Site Title",
        home: "Home",
        features: "Features",
        pricing: "Pricing",
        about: "About",
        changeLanguage: "Change Language",
        openMenu: "Open Menu",
      },
    };
    return (key: string) => translations[namespace]?.[key] || key;
  }),
  useLocale: vi.fn(() => "en"), // Simule la locale actuelle
}));

// Mock pour next/navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(), // Simule la fonction push du router
    replace: vi.fn(),
    refresh: vi.fn(),
    // Ajoutez d'autres méthodes du router si nécessaire pour vos tests
  })),
  usePathname: vi.fn(() => "/"), // Simule le chemin actuel
}));

describe("Navbar Component", () => {
  it("should render the site title", () => {
    render(<Navbar />);

    const siteTitleElement = screen.getByText("Test Site Title");

    expect(siteTitleElement).toBeInTheDocument();
  });

  it("should use mocked translations for site title", () => {
    render(<Navbar />);
    expect(screen.getByText("Test Site Title")).toBeInTheDocument();
  });
});
