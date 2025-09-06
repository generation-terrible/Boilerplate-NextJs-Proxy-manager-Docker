import { getTranslations } from "next-intl/server";
import { RegisterForm } from "@/components/forms/RegisterForm";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: "RegisterPage",
  });
  return {
    title: t("formTitle"), // Exemple, ajustez selon vos clés
    // description: t("registerPageDescription"), // Si vous avez une description spécifique
  };
}

export default async function RegisterPage({ params }) {
  const resolvedParams = await params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
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
    networkError: t("networkError"),
  };

  return <RegisterForm translations={allTranslations} />;
}
