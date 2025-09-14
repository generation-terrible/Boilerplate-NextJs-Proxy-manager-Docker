"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  text: string;
  author: string;
  company: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialsSection({ testimonial, className = "" }: TestimonialsSectionProps) {
  const rating = testimonial.rating || 5;

  return (
    <section className={`py-16 sm:py-24 bg-muted/30 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ce que disent nos clients
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-none shadow-lg">
            <CardContent className="p-8 sm:p-12">
              
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <Quote className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg sm:text-xl text-center leading-relaxed mb-8 italic text-muted-foreground">
                "{testimonial.text}"
              </blockquote>

              {/* Rating Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {/* Author Info */}
              <div className="text-center">
                <p className="font-semibold text-lg text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-muted-foreground">
                  {testimonial.company}
                </p>
              </div>

              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl translate-y-12 -translate-x-12"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}