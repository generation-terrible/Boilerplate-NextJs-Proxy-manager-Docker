"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface Milestone {
  year: string;
  title: string;
  description: string;
  imageSrc?: string;
  highlight?: boolean;
}

interface HistorySectionProps {
  title: string;
  subtitle?: string;
  milestones: Milestone[];
  layout?: 'timeline' | 'cards';
  className?: string;
}

export function HistorySection({
  title,
  subtitle,
  milestones,
  layout = 'timeline',
  className = ""
}: HistorySectionProps) {

  if (layout === 'cards') {
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

          {/* Milestones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className={`overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                milestone.highlight ? 'ring-2 ring-primary/20' : ''
              }`}>
                {milestone.imageSrc && (
                  <div className="relative h-48">
                    <Image
                      src={milestone.imageSrc}
                      alt={milestone.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className={`text-2xl font-bold mb-2 ${
                    milestone.highlight ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Timeline layout
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

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative flex items-center group">
              
              {/* Timeline Line */}
              <div className="absolute left-8 top-20 bottom-0 w-px bg-border group-last:hidden"></div>
              
              {/* Timeline Dot */}
              <div className={`relative z-10 w-16 h-16 rounded-full border-4 border-background flex items-center justify-center ${
                milestone.highlight 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <span className="font-bold text-sm">{milestone.year.slice(-2)}</span>
              </div>

              {/* Content */}
              <div className="flex-1 ml-8 pb-12">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className={`text-sm font-medium mb-1 ${
                      milestone.highlight ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                  
                  {milestone.imageSrc && (
                    <div className="w-full lg:w-64 h-48 relative rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={milestone.imageSrc}
                        alt={milestone.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}