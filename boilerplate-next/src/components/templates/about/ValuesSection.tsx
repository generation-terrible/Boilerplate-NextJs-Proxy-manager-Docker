"use client";

import { Card, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Value {
  title: string;
  description: string;
  icon?: string;
  color?: string;
}

interface ValuesSectionProps {
  title: string;
  subtitle?: string;
  values: Value[];
  layout?: 'cards' | 'timeline' | 'minimal';
  className?: string;
}

export function ValuesSection({
  title,
  subtitle,
  values,
  layout = 'cards',
  className = ""
}: ValuesSectionProps) {
  
  const renderValue = (value: Value, index: number) => {
    const IconComponent = value.icon ? (Icons as any)[value.icon] as LucideIcon : null;
    const colorClass = value.color || 'text-primary';

    if (layout === 'cards') {
      return (
        <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardContent className="pt-8 pb-6 text-center">
            {IconComponent && (
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full bg-primary/10 ${colorClass}`}>
                  <IconComponent className="w-8 h-8" />
                </div>
              </div>
            )}
            <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {value.description}
            </p>
          </CardContent>
        </Card>
      );
    }

    if (layout === 'timeline') {
      return (
        <div key={index} className="flex gap-6 group">
          <div className="flex flex-col items-center">
            <div className={`p-3 rounded-full bg-primary/10 ${colorClass} group-hover:scale-110 transition-transform`}>
              {IconComponent ? (
                <IconComponent className="w-6 h-6" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary"></div>
              )}
            </div>
            {index < values.length - 1 && (
              <div className="w-px h-16 bg-border mt-4"></div>
            )}
          </div>
          <div className="flex-1 pb-8">
            <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
            <p className="text-muted-foreground">{value.description}</p>
          </div>
        </div>
      );
    }

    // Minimal layout
    return (
      <div key={index} className="text-center">
        {IconComponent && (
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full bg-primary/10 ${colorClass}`}>
              <IconComponent className="w-6 h-6" />
            </div>
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
        <p className="text-muted-foreground text-sm">{value.description}</p>
      </div>
    );
  };

  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
        </div>

        {/* Values Content */}
        {layout === 'timeline' ? (
          <div className="max-w-2xl mx-auto">
            {values.map((value, index) => renderValue(value, index))}
          </div>
        ) : (
          <div className={`grid gap-6 lg:gap-8 ${
            layout === 'cards' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {values.map((value, index) => renderValue(value, index))}
          </div>
        )}
      </div>
    </section>
  );
}