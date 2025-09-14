"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface GalleryItem {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface GallerySectionProps {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function GallerySection({ 
  title, 
  subtitle, 
  items, 
  columns = 3,
  className = "" 
}: GallerySectionProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', 
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
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

        {/* Gallery Grid */}
        <div className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}>
          {items.map((item, index) => (
            <Card 
              key={index}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay content */}
                {(item.title || item.description) && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {item.title && (
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    )}
                    {item.description && (
                      <p className="text-sm text-white/80">{item.description}</p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Card content for items without overlay */}
              {!item.title && !item.description && (
                <CardContent className="p-4">
                  <div className="h-2"></div> {/* Spacer for consistency */}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}