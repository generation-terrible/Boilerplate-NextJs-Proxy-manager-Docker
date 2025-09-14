"use client";

import { ImageHero } from "../homepage/ImageHero";
import { ServicesSection } from "../homepage/ServicesSection";
import { StatsSection } from "../homepage/StatsSection";
import { GallerySection } from "../homepage/GallerySection";
import { TestimonialsSection } from "../homepage/TestimonialsSection";
import { CTASection } from "../homepage/CTASection";
import { getBusinessTemplate } from "@/lib/templates";
import toast from "react-hot-toast";

export function WebAgencyHomepage() {
  const template = getBusinessTemplate('web-agency');

  const handleContact = () => {
    toast.success("Fonctionnalité contact à implémenter !");
  };

  const handlePortfolio = () => {
    toast.success("Redirection vers le portfolio !");
  };

  const handleQuote = () => {
    toast.success("Formulaire de devis à implémenter !");
  };

  const handleCall = () => {
    // En production, utiliser le vrai numéro
    window.open('tel:+33123456789', '_self');
  };

  // Données des projets (à remplacer par de vraies images)
  const portfolioItems = [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop",
      alt: "Dashboard Analytics",
      title: "Dashboard Analytics",
      description: "Interface moderne pour startup fintech"
    },
    {
      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=400&fit=crop",
      alt: "Application Mobile",
      title: "App Mobile E-commerce", 
      description: "Application React Native pour marketplace"
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
      alt: "Site Web Corporate",
      title: "Site Corporate",
      description: "Refonte complète avec CMS personnalisé"
    }
  ];

  const statsData = [
    {
      value: "5+",
      label: "Années d'expérience",
      description: "Une expertise approfondie dans les technologies web modernes",
      icon: "Calendar",
      color: "text-purple-500"
    },
    {
      value: "50+",
      label: "Projets réalisés", 
      description: "Des solutions sur mesure pour tous types d'entreprises",
      icon: "Briefcase",
      color: "text-blue-500"
    },
    {
      value: "24h",
      label: "Support réactif",
      description: "Une assistance technique rapide et personnalisée",
      icon: "Clock",
      color: "text-green-500"
    },
    {
      value: "100%",
      label: "Clients satisfaits",
      description: "Un taux de satisfaction exceptionnel",
      icon: "Heart", 
      color: "text-red-500"
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
        icon="Code2"
        imageSrc="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop"
        imageAlt="Développement web moderne"
        imagePosition="right"
        onPrimaryClick={handleContact}
        onSecondaryClick={handlePortfolio}
      />

      {/* Services Section */}
      <ServicesSection
        title={template.services.title}
        services={template.services.items}
        className="bg-muted/20"
      />

      {/* Stats Section avec icônes */}
      <StatsSection
        title="Pourquoi nous choisir ?"
        subtitle="Des chiffres qui parlent de notre expertise et de notre engagement"
        stats={statsData}
        variant="cards"
        className="bg-muted/20"
      />

      {/* Portfolio Section */}
      <GallerySection
        title="Nos dernières réalisations"
        subtitle="Découvrez quelques projets qui illustrent notre savoir-faire"
        items={portfolioItems}
        columns={3}
      />

      {/* Technologies Section - Spécifique aux agences */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Technologies que nous maîtrisons
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-70">
            {[
              "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="p-4 rounded-lg bg-background border hover:shadow-md transition-shadow">
                  <span className="font-semibold text-sm">{tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {template.testimonial && (
        <TestimonialsSection testimonial={template.testimonial} />
      )}

      {/* Call to Action */}
      <CTASection
        title="Transformons votre idée en réalité digitale"
        subtitle="Discutons de votre projet et recevez un devis personnalisé sous 24h. Consultation gratuite et sans engagement."
        primaryCTA="Démarrer mon projet"
        secondaryCTA="Planifier un appel"
        phone="+33 1 23 45 67 89"
        email="contact@agence.fr"
        onPrimaryClick={handleQuote}
        onSecondaryClick={handleCall}
      />
    </main>
  );
}