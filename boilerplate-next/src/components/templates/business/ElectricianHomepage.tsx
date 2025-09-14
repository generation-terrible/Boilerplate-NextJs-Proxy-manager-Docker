"use client";

import { ImageHero } from "../homepage/ImageHero";
import { ServicesSection } from "../homepage/ServicesSection";
import { GallerySection } from "../homepage/GallerySection";
import { TestimonialsSection } from "../homepage/TestimonialsSection";
import { CTASection } from "../homepage/CTASection";
import { getBusinessTemplate } from "@/lib/templates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, Shield } from "lucide-react";
import toast from "react-hot-toast";

export function ElectricianHomepage() {
  const template = getBusinessTemplate('electrician');

  const handleQuote = () => {
    toast.success("Formulaire de devis à implémenter !");
  };

  const handleEmergency = () => {
    // En production, ouvrir directement l'appel
    window.open('tel:+33123456789', '_self');
  };

  const handleCall = () => {
    window.open('tel:+33123456789', '_self');
  };

  // Galerie des réalisations
  const workGallery = [
    {
      src: "https://images.unsplash.com/photo-1621905252472-e8be73bb8914?w=500&h=400&fit=crop",
      alt: "Installation électrique moderne",
      title: "Installation complète",
      description: "Rénovation électrique maison 150m²"
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
      alt: "Tableau électrique",
      title: "Mise aux normes",
      description: "Tableau électrique conforme NF C 15-100"
    },
    {
      src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&h=400&fit=crop",
      alt: "Éclairage LED",
      title: "Éclairage LED",
      description: "Installation éclairage basse consommation"
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
      alt: "Prise électrique",
      title: "Ajout de prises",
      description: "Installation prises supplémentaires"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section avec image */}
      <ImageHero
        title={template.hero.title}
        subtitle={template.hero.subtitle}
        ctaPrimary={template.hero.ctaPrimary}
        ctaSecondary={template.hero.ctaSecondary}
        icon="Zap"
        imageSrc="https://images.unsplash.com/photo-1609358905581-e5381612486e?w=600&h=600&fit=crop"
        imageAlt="Électricien professionnel au travail"
        imagePosition="left"
        onPrimaryClick={handleQuote}
        onSecondaryClick={handleEmergency}
      />

      {/* Urgences Section - Spécifique aux électriciens */}
      <section className="py-12 bg-destructive/5 border-y border-destructive/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-destructive mb-2">
                Urgence électrique ?
              </h3>
              <p className="text-muted-foreground">
                Intervention 24h/24 et 7j/7 dans toute la région
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-background px-4 py-3 rounded-lg border">
                <Phone className="w-5 h-5 text-destructive" />
                <span className="font-semibold">01 23 45 67 89</span>
              </div>
              <Badge variant="destructive" className="text-center py-2">
                DISPONIBLE 24H/24
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection
        title={template.services.title}
        services={template.services.items}
        className="bg-muted/20"
      />

      {/* Zone d'intervention - Spécifique aux artisans locaux */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Zone d'intervention
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Nous intervenons dans un rayon de 30km</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  "Paris", "Boulogne-Billancourt", "Versailles", "Saint-Denis",
                  "Créteil", "Nanterre", "Vincennes", "Levallois-Perret"
                ].map((city, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {city}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-6">
                Votre ville n'apparaît pas dans la liste ? Contactez-nous pour vérifier 
                si nous intervenons dans votre secteur.
              </p>
            </div>

            <Card className="lg:max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Délais d'intervention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Urgences</span>
                  <Badge variant="destructive">1-2h</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Dépannages</span>
                  <Badge variant="secondary">24-48h</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Installations</span>
                  <Badge variant="outline">Sur RDV</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Devis</span>
                  <Badge variant="outline">Gratuit</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Garanties et certifications */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Vos garanties
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Assurance décennale</h3>
                <p className="text-sm text-muted-foreground">
                  Tous nos travaux sont couverts par notre assurance
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">RGE</span>
                </div>
                <h3 className="font-semibold mb-2">Certification RGE</h3>
                <p className="text-sm text-muted-foreground">
                  Reconnu Garant de l'Environnement
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Garantie 2 ans</h3>
                <p className="text-sm text-muted-foreground">
                  Sur tous nos travaux d'installation
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold">NF</span>
                </div>
                <h3 className="font-semibold mb-2">Normes NF C 15-100</h3>
                <p className="text-sm text-muted-foreground">
                  Respect des normes électriques en vigueur
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Galerie des réalisations */}
      <GallerySection
        title="Nos dernières interventions"
        subtitle="Découvrez la qualité de notre travail à travers nos réalisations récentes"
        items={workGallery}
        columns={4}
        className="bg-muted/20"
      />

      {/* Testimonials */}
      {template.testimonial && (
        <TestimonialsSection testimonial={template.testimonial} />
      )}

      {/* Call to Action */}
      <CTASection
        title="Besoin d'un électricien qualifié ?"
        subtitle="Devis gratuit sous 24h • Intervention rapide • Travail soigné garanti"
        primaryCTA="Demander un devis"
        secondaryCTA="Appeler maintenant"
        phone="01 23 45 67 89"
        email="contact@electro-pro.fr"
        onPrimaryClick={handleQuote}
        onSecondaryClick={handleCall}
      />
    </main>
  );
}