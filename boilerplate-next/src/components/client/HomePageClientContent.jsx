"use client";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function HomePageClientContent({ translations: t }) {
  const handleShowSuccessToast = () => {
    toast.success(t.successToastMessage);
  };

  const handleShowErrorToast = () => {
    toast.error(t.errorToastMessage);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-xl space-y-8">
        <ThemeSwitcher />
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {t.welcomeText}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {t.descriptionText}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button onClick={handleShowSuccessToast}>
            {t.showSuccessButtonText}
          </Button>
          <Button onClick={handleShowErrorToast} variant="destructive">
            {t.showErrorButtonText}
          </Button>
        </div>
      </div>
    </main>
  );
}
