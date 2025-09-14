"use client";

import Image from "next/image";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ContactHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right' | 'background';
  icon?: string;
  className?: string;
}

export function ContactHero({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt = "",
  imagePosition = 'right',
  icon,
  className = ""
}: ContactHeroProps) {
  const IconComponent = icon ? (Icons as any)[icon] as LucideIcon : null;

  if (imagePosition === 'background' && imageSrc) {
    return (
      <section className={`relative py-20 sm:py-32 overflow-hidden ${className}`}>
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {IconComponent && (
            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                <IconComponent className="w-12 h-12" />
              </div>
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl font-light mb-8 max-w-3xl mx-auto opacity-90">
            {subtitle}
          </p>
          {description && (
            <p className="text-lg max-w-2xl mx-auto opacity-80">
              {description}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''
        }`}>
          
          {/* Content */}
          <div className={imagePosition === 'left' ? 'lg:col-start-2' : ''}>
            {IconComponent && (
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {subtitle}
            </p>
            {description && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Image */}
          {imageSrc && (
            <div className={imagePosition === 'left' ? 'lg:col-start-1' : ''}>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}