"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import Image from "next/image";

interface Stat {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  imageSrc?: string;
  color?: string;
}

interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  stats: Stat[];
  variant?: 'default' | 'cards' | 'minimal';
  className?: string;
}

export function StatsSection({ 
  title, 
  subtitle, 
  stats, 
  variant = 'cards',
  className = "" 
}: StatsSectionProps) {

  const renderStat = (stat: Stat, index: number) => {
    const IconComponent = stat.icon ? (Icons as any)[stat.icon] as LucideIcon : null;
    const colorClass = stat.color || 'text-primary';

    const StatContent = () => (
      <>
        {/* Icon or Image */}
        <div className="flex justify-center mb-4">
          {stat.imageSrc ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={stat.imageSrc}
                alt={stat.label}
                fill
                className="object-cover"
              />
            </div>
          ) : IconComponent ? (
            <div className={`p-4 rounded-full bg-primary/10 ${colorClass}`}>
              <IconComponent className="w-8 h-8" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className={`text-3xl font-bold ${colorClass}`}>
                {stat.value.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className={`text-3xl sm:text-4xl font-bold ${colorClass} mb-2`}>
          {stat.value}
        </div>

        {/* Label */}
        <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>

        {/* Description */}
        {stat.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {stat.description}
          </p>
        )}
      </>
    );

    if (variant === 'cards') {
      return (
        <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
          <CardContent className="pt-8 pb-6">
            <StatContent />
          </CardContent>
        </Card>
      );
    }

    if (variant === 'minimal') {
      return (
        <div key={index} className="text-center">
          <div className={`text-4xl sm:text-5xl font-bold ${colorClass} mb-2`}>
            {stat.value}
          </div>
          <div className="text-muted-foreground">{stat.label}</div>
        </div>
      );
    }

    // Default variant
    return (
      <div key={index} className="text-center">
        <StatContent />
      </div>
    );
  };

  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
          </div>
        )}

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(stats.length, 2)} lg:grid-cols-${Math.min(stats.length, 4)} gap-6 lg:gap-8`}>
          {stats.map((stat, index) => renderStat(stat, index))}
        </div>
      </div>
    </section>
  );
}