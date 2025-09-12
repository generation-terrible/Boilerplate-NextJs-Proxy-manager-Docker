"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

const errorMessages = {
  Configuration: "Il y a un problème avec la configuration du serveur.",
  AccessDenied: "Vous n'avez pas l'autorisation de vous connecter.",
  Verification: "Le token de vérification a expiré ou a déjà été utilisé.",
  OAuthAccountNotLinked:
    "Ce compte est déjà lié à un autre compte. Veuillez vous connecter avec votre email et mot de passe.",
  OAuthCallback:
    "Erreur lors de la vérification du compte. Veuillez réessayer.",
  OAuthCreateAccount: "Impossible de créer le compte. Veuillez réessayer.",
  EmailCreateAccount: "Impossible de créer le compte avec cet email.",
  Callback: "Erreur lors de la redirection. Veuillez réessayer.",
  OAuthSignin: "Erreur lors de la connexion. Veuillez réessayer.",
  EmailSignin: "Erreur lors de l'envoi de l'email de connexion.",
  CredentialsSignin: "Email ou mot de passe incorrect.",
  SessionRequired: "Vous devez être connecté pour accéder à cette page.",
  Default: "Une erreur inattendue s'est produite. Veuillez réessayer.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorMessage =
    errorMessages[error as keyof typeof errorMessages] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Erreur de connexion
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{errorMessage}</p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la connexion
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/register">Créer un compte</Link>
          </Button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              Code d'erreur: {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
