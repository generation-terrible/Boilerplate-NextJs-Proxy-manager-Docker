"use client";

import { ImageHero } from "../homepage/ImageHero";
import { ServicesSection } from "../homepage/ServicesSection";
import { GallerySection } from "../homepage/GallerySection";
import { TestimonialsSection } from "../homepage/TestimonialsSection";
import { CTASection } from "../homepage/CTASection";
import { getBusinessTemplate } from "@/lib/templates";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Leaf, Clock, Users, Star, Award } from "lucide-react";
import toast from "react-hot-toast";

export function CleaningHomepage() {
  const template = getBusinessTemplate('cleaning');

  const handleQuote = () => {
    toast.success("Formulaire de devis à implémenter !");
  };

  const handlePricing = () => {
    toast.success("Redirection vers la page tarifs !");
  };

  const handleCall = () => {
    window.open('tel:+33123456789', '_self');
  };

  // Images avant/après nettoyage
  const beforeAfterGallery = [
    {
      src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=400&fit=crop",
      alt: "Bureau propre",
      title: "Bureaux professionnels",
      description: "Nettoyage quotidien d'espaces de travail"
    },
    {
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=400&fit=crop",
      alt: "Maison familiale",
      title: "Ménage résidentiel", 
      description: "Entretien hebdomadaire de domicile"
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
      alt: "Après travaux",
      title: "Remise en état",
      description: "Nettoyage post-rénovation"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section avec image de fond */}
      <ImageHero
        title={template.hero.title}
        subtitle={template.hero.subtitle}
        ctaPrimary={template.hero.ctaPrimary}
        ctaSecondary={template.hero.ctaSecondary}
        icon="Sparkles"
        imageSrc="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=800&fit=crop"
        imageAlt="Environnement de travail propre et moderne"
        imagePosition="background"
        onPrimaryClick={handleQuote}
        onSecondaryClick={handlePricing}
      />

      {/* Services Section */}
      <ServicesSection
        title={template.services.title}
        services={template.services.items}
        className="bg-muted/20"
      />

      {/* Tarifs transparents - Spécifique aux services de nettoyage */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Tarifs transparents et compétitifs
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Pas de surprise, nos prix sont clairs et adaptés à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Tarif Particulier */}
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Particuliers</CardTitle>
                <CardDescription>Ménage à domicile</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary">25€<span className="text-base text-muted-foreground">/h</span></div>
                <ul className="space-y-2 text-sm">
                  {[
                    "Ménage complet",
                    "Produits fournis", 
                    "Assurance incluse",
                    "Paiement CESU accepté"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" onClick={handleQuote}>
                  Demander un devis
                </Button>
              </CardContent>
            </Card>

            {/* Tarif Bureaux */}
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow border-primary/20">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg">
                POPULAIRE
              </div>
              <CardHeader className="text-center pb-4">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Bureaux</CardTitle>
                <CardDescription>Espaces professionnels</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary">Sur devis</div>
                <ul className="space-y-2 text-sm">
                  {[
                    "Contrat sur mesure",
                    "Équipe dédiée",
                    "Produits professionnels",
                    "Intervention hors horaires"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" onClick={handleQuote}>
                  Obtenir un devis
                </Button>
              </CardContent>
            </Card>

            {/* Tarif Après Travaux */}
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Après travaux</CardTitle>
                <CardDescription>Remise en état</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary">40€<span className="text-base text-muted-foreground">/h</span></div>
                <ul className="space-y-2 text-sm">
                  {[
                    "Nettoyage intensif",
                    "Matériel spécialisé",
                    "Évacuation gravats",
                    "Remise à neuf complète"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" onClick={handleQuote}>
                  Demander un devis
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              * Tarifs indicatifs, devis personnalisé selon surface et fréquence
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline">Devis gratuit</Badge>
              <Badge variant="outline">Satisfaction garantie</Badge>
              <Badge variant="outline">Paiement sécurisé</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement écologique - Spécifique au nettoyage */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Leaf className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Engagement écologique
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">
                Nettoyage respectueux de l'environnement
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Nous avons fait le choix d'utiliser exclusivement des produits 
                écologiques certifiés, sans danger pour votre santé et celle de 
                vos collaborateurs ou de votre famille.
              </p>
              <ul className="space-y-3">
                {[
                  "Produits 100% biodégradables",
                  "Labels Ecocert et Ecolabel Européen",
                  "Microfibre réutilisable",
                  "Réduction des emballages plastiques"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-500 mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">Produits écologiques</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-500 mb-2">-70%</div>
                  <p className="text-sm text-muted-foreground">Empreinte carbone</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-500 mb-2">0</div>
                  <p className="text-sm text-muted-foreground">Produit toxique</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Leaf className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Certifié bio</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Disponibilités */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Horaires flexibles
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Particuliers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-semibold">8h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-semibold">8h - 16h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="text-muted-foreground">Sur demande</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Professionnels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>7j/7</span>
                    <span className="font-semibold">6h - 22h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Week-ends</span>
                    <span className="font-semibold">Disponible</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intervention urgente</span>
                    <span className="text-green-500">24h/48h</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie avant/après */}
      <GallerySection
        title="Nos réalisations avant/après"
        subtitle="Découvrez la qualité de notre travail à travers quelques exemples de transformations"
        items={beforeAfterGallery}
        columns={3}
      />

      {/* Testimonials */}
      {template.testimonial && (
        <TestimonialsSection testimonial={template.testimonial} />
      )}

      {/* Call to Action */}
      <CTASection
        title="Confiez-nous l'entretien de vos espaces"
        subtitle="Devis personnalisé gratuit • Intervention rapide • Équipe professionnelle certifiée"
        primaryCTA="Obtenir mon devis gratuit"
        secondaryCTA="Nous contacter"
        phone="01 23 45 67 89"
        email="contact@cleaner-pro.fr"
        onPrimaryClick={handleQuote}
        onSecondaryClick={handleCall}
      />
    </main>
  );
}