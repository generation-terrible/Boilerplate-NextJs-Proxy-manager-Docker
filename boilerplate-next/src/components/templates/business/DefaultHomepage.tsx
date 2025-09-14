"use client";

import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, ArrowRight } from "lucide-react";

export function DefaultHomepage() {
  const handleShowSuccessToast = () => {
    toast.success("Toast de succès !");
  };

  const handleShowErrorToast = () => {
    toast.error("Toast d'erreur !");
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
        <div className="w-full max-w-4xl text-center space-y-12">
          
          {/* Hero section */}
          <div className="space-y-8">
            {/* Icon decoration */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-150"></div>
                <div className="relative bg-primary/10 rounded-full p-6 backdrop-blur-sm border border-primary/20">
                  <Sparkles className="w-12 h-12 text-primary animate-pulse" />
                </div>
              </div>
            </div>

            {/* Title with gradient */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  Bienvenue !
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ceci est votre Boilerplate Next.js. Prêt à construire quelque chose d'incroyable !
              </p>
            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <div className="flex items-center space-x-2 bg-muted/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Production Ready</span>
              </div>
              <div className="flex items-center space-x-2 bg-muted/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Modern Stack</span>
              </div>
              <div className="flex items-center space-x-2 bg-muted/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
                <ArrowRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">TypeScript Ready</span>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
              <Button 
                onClick={handleShowSuccessToast}
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Afficher Toast Succès
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
              
              <Button 
                onClick={handleShowErrorToast} 
                variant="outline"
                size="lg"
                className="group hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Afficher Toast Erreur
                </span>
              </Button>
            </div>

            {/* Additional info */}
            <div className="text-sm text-muted-foreground">
              <p>✨ Built with Next.js 15 • TypeScript • Tailwind CSS • Prisma</p>
            </div>

            {/* Template selector info */}
            <div className="mt-12 p-6 bg-muted/20 rounded-lg border border-border/50">
              <h3 className="text-lg font-semibold mb-3">🎨 Templates Business Disponibles</h3>
              <p className="text-muted-foreground mb-4">
                Utilisez le bouton "Templates" en bas à droite pour découvrir nos templates 
                optimisés pour différents types de business.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Agence Web
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Électricien
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Nettoyage
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}