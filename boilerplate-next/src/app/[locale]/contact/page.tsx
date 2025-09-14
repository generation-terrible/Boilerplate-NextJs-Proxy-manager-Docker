import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactPageClientContent } from "@/components/client/ContactPageClientContent";

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  
  return {
    title: t("contact.title"),
    description: t("contact.description"),
  };
}

export default function ContactPage() {
  return <ContactPageClientContent />;
}