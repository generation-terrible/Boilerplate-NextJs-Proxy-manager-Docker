"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  icon?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function HeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  icon = "Sparkles",
  onPrimaryClick,
  onSecondaryClick,
}: HeroSectionProps) {
  // Récupération dynamique de l'icône
  const IconComponent = (Icons as any)[icon] as LucideIcon || Icons.Sparkles;

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Icon decoration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-150"></div>
              <div className="relative bg-primary/10 rounded-full p-6 backdrop-blur-sm border border-primary/20">
                <IconComponent className="w-12 h-12 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg"
              onClick={onPrimaryClick}
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
            >
              <span className="relative z-10">{ctaPrimary}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
            
            {ctaSecondary && (
              <Button 
                variant="outline"
                size="lg"
                onClick={onSecondaryClick}
                className="hover:bg-accent hover:text-accent-foreground transition-all duration-300 min-w-[200px]"
              >
                {ctaSecondary}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}