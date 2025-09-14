"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  phone?: string;
  email?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export function CTASection({
  title = "Prêt à commencer votre projet ?",
  subtitle = "Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.",
  primaryCTA = "Demander un devis gratuit",
  secondaryCTA = "Nous appeler",
  phone,
  email,
  onPrimaryClick,
  onSecondaryClick,
  className = "",
}: CTASectionProps) {
  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-xl">
          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 text-center text-primary-foreground">
            
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              {title}
            </h2>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                variant="secondary"
                onClick={onPrimaryClick}
                className="group bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
              >
                <span className="flex items-center gap-2">
                  {primaryCTA}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>

              {secondaryCTA && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onSecondaryClick}
                  className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/40 transition-all duration-300 min-w-[200px]"
                >
                  {secondaryCTA}
                </Button>
              )}
            </div>

            {/* Contact Info */}
            {(phone || email) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm opacity-80">
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                  >
                    <Phone className="w-4 h-4" />
                    {phone}
                  </a>
                )}
                {phone && email && (
                  <span className="hidden sm:inline">•</span>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 hover:opacity-100 transition-opacity"
                  >
                    <Mail className="w-4 h-4" />
                    {email}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-24 -translate-x-24"></div>
        </div>
      </div>
    </section>
  );
}