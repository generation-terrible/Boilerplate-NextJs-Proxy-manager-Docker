"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import Image from "next/image";

interface ImageHeroProps {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  icon?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right' | 'background';
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function ImageHero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  icon = "Sparkles",
  imageSrc,
  imageAlt = "Hero image",
  imagePosition = 'right',
  onPrimaryClick,
  onSecondaryClick,
}: ImageHeroProps) {
  const IconComponent = (Icons as any)[icon] as LucideIcon || Icons.Sparkles;

  if (imagePosition === 'background') {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        {imageSrc && (
          <div className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8 text-white">
            
            {/* Icon decoration */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150"></div>
                <div className="relative bg-white/10 rounded-full p-6 backdrop-blur-sm border border-white/20">
                  <IconComponent className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg"
                onClick={onPrimaryClick}
                className="group relative overflow-hidden bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
              >
                <span className="relative z-10">{ctaPrimary}</span>
              </Button>
              
              {ctaSecondary && (
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={onSecondaryClick}
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 min-w-[200px]"
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

  // Left/Right layout
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''
        }`}>
          
          {/* Content */}
          <div className={`space-y-8 ${imagePosition === 'left' ? 'lg:col-start-2' : ''}`}>
            {/* Icon decoration */}
            <div className="flex justify-start mb-8">
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
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start pt-8">
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

          {/* Image */}
          {imageSrc && (
            <div className={`relative ${imagePosition === 'left' ? 'lg:col-start-1' : ''}`}>
              <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}