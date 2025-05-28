import { getTranslations } from "next-intl/server";
import { RegisterForm } from "@/components/forms/RegisterForm";

// Définir un type pour les props de la page en accord avec Next.js
type LocalePageProps = {
  params: {
    locale: string;
    // autres éventuels paramètres de route
  };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Si vous utilisez searchParams
};

export async function generateMetadata({ params }: LocalePageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "RegisterPage",
  });
  return {
    title: t("formTitle"), // Exemple, ajustez selon vos clés
    // description: t("registerPageDescription"), // Si vous avez une description spécifique
  };
}

export default async function RegisterPage({ params }: LocalePageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "RegisterPage",
  });

  const allTranslations = {
    formTitle: t("formTitle"),
    nameLabel: t("nameLabel"),
    namePlaceholder: t("namePlaceholder"),
    emailLabel: t("emailLabel"),
    emailPlaceholder: t("emailPlaceholder"),
    passwordLabel: t("passwordLabel"),
    passwordPlaceholder: t("passwordPlaceholder"),
    confirmPasswordLabel: t("confirmPasswordLabel"),
    showPasswordText: t("showPassword"),
    hidePasswordText: t("hidePassword"),
    acceptTermsPrefix: t("acceptTermsPrefix"),
    termsAndConditionsLinkText: t("termsAndConditions"),
    submitButtonText: t("submitButton"),
    submitButtonLoadingText: t("submitButtonLoading"),
    alreadyHaveAccountText: t("alreadyHaveAccount"),
    loginLinkText: t("loginLink"),
    allFieldsRequiredError: t("allFieldsRequired"),
    passwordsDoNotMatchError: t("passwordsDoNotMatch"),
    registrationErrorDefault: t("registrationError"),
    registrationSuccessMessage: t("registrationSuccess"),
    networkErrorTemplate: (error: string) => t("networkError", { error }),
  };

  return <RegisterForm translations={allTranslations} />;
}
