"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage"); // Créez des traductions pour ErrorPage

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-2xl font-semibold text-destructive mb-4">
        {t("title")}
      </h2>
      <p className="text-muted-foreground mb-6">{t("message")}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
      >
        {t("retryButton")}
      </button>
    </div>
  );
}
