import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutPageClientContent } from "@/components/client/AboutPageClientContent";

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  
  return {
    title: t("about.title"),
    description: t("about.description"),
  };
}

export default function AboutPage() {
  return <AboutPageClientContent />;
}