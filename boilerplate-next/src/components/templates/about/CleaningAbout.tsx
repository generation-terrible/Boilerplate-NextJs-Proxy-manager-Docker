"use client";

import { AboutHero } from "./AboutHero";
import { TeamSection } from "./TeamSection";
import { ValuesSection } from "./ValuesSection";
import { HistorySection } from "./HistorySection";
import { StatsSection } from "../homepage/StatsSection";
import { CTASection } from "../homepage/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Heart, Shield, Clock } from "lucide-react";

export function CleaningAbout() {
  const handleContact = () => {
    window.open('mailto:contact@cleaner-pro.fr', '_self');
  };

  const handleCall = () => {
    window.open('tel:+33123456789', '_self');
  };

  // Équipe nettoyage
  const teamMembers = [
    {
      name: "Marie Dubois",
      role: "Fondatrice & Responsable Qualité",
      description: "15 ans d'expérience dans le secteur du nettoyage professionnel. Pionnière des méthodes écologiques et des formations qualité.",
      imageSrc: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      skills: ["Management", "Qualité", "Écologie"],
      socialLinks: {
        email: "marie@cleaner-pro.fr"
      }
    },
    {
      name: "Sophie Leroy",
      role: "Responsable Équipes",
      description: "Coordination des équipes de nettoyage et formation aux techniques écologiques. Garante du respect des protocoles de sécurité.",
      imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      skills: ["Coordination", "Formation", "Sécurité"],
      socialLinks: {
        email: "sophie@cleaner-pro.fr"
      }
    },
    {
      name: "Ahmed Benali",
      role: "Spécialiste Nettoyage Industriel",
      description: "Expert en nettoyage post-travaux et remise en état. Spécialisé dans les interventions complexes et les protocoles sanitaires.",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      skills: ["Post-travaux", "Industriel", "Protocoles"],
      socialLinks: {
        email: "ahmed@cleaner-pro.fr"
      }
    }
  ];

  // Valeurs entreprise nettoyage
  const companyValues = [
    {
      title: "Respect de l'Environnement",
      description: "Produits 100% écologiques et biodégradables pour préserver notre planète et votre santé.",
      icon: "Leaf",
      color: "text-green-500"
    },
    {
      title: "Bien-être et Santé",
      description: "Environnements sains sans produits toxiques, pour le confort de votre famille et collaborateurs.",
      icon: "Heart",
      color: "text-red-500"
    },
    {
      title: "Fiabilité et Sécurité",
      description: "Équipes formées, assurées et de confiance. Respect strict des protocoles de sécurité.",
      icon: "Shield",
      color: "text-blue-500"
    },
    {
      title: "Flexibilité Horaire",
      description: "Interventions adaptées à vos contraintes, en dehors de vos heures d'activité si nécessaire.",
      icon: "Clock",
      color: "text-purple-500"
    }
  ];

  // Histoire entreprise nettoyage
  const milestones = [
    {
      year: "2015",
      title: "Création éco-responsable",
      description: "Marie Dubois fonde l'entreprise avec une conviction forte : allier efficacité de nettoyage et respect environnemental.",
      imageSrc: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      highlight: false
    },
    {
      year: "2017",
      title: "Certification Ecocert",
      description: "Obtention des certifications Ecocert et Ecolabel Européen pour tous nos produits et méthodes de nettoyage.",
      imageSrc: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      highlight: false
    },
    {
      year: "2019",
      title: "Expansion services",
      description: "Diversification vers le nettoyage post-travaux et les protocoles sanitaires renforcés pour les entreprises.",
      imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      highlight: false
    },
    {
      year: "2021",
      title: "Prix Développement Durable",
      description: "Récompensés par la CCI pour notre approche innovante du nettoyage écologique et notre impact environnemental positif.",
      imageSrc: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      highlight: true
    },
    {
      year: "2024",
      title: "Leader écologique",
      description: "Référence régionale en nettoyage écologique avec plus de 1500 clients fidèles et zéro produit toxique utilisé.",
      imageSrc: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      highlight: true
    }
  ];

  // Statistiques nettoyage
  const statsData = [
    {
      value: "1500+",
      label: "Clients satisfaits",
      description: "Particuliers et entreprises fidèles",
      icon: "Users",
      color: "text-blue-500"
    },
    {
      value: "100%",
      label: "Produits écologiques",
      description: "Zéro produit chimique toxique",
      icon: "Leaf",
      color: "text-green-500"
    },
    {
      value: "9ans",
      label: "D'expertise écologique",
      description: "Pionniers du nettoyage durable",
      icon: "Award",
      color: "text-purple-500"
    },
    {
      value: "-70%",
      label: "Empreinte carbone",
      description: "Réduction vs méthodes traditionnelles",
      icon: "TrendingDown",
      color: "text-green-500"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AboutHero
        title="Nettoyage professionnel et écologique depuis 2015"
        subtitle="Votre spécialiste du nettoyage respectueux de l'environnement"
        description="Entreprise familiale engagée dans le nettoyage écologique. Nous allions efficacité professionnelle et respect de l'environnement pour créer des espaces sains et propres."
        imageSrc="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=600&fit=crop"
        imageAlt="Équipe de nettoyage écologique"
        imagePosition="background"
        icon="Leaf"
      />

      {/* Engagement écologique */}
      <section className="py-16 sm:py-24 bg-green-50/50 dark:bg-green-950/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Leaf className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Notre engagement environnemental
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-8">
                <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
                <p className="font-semibold mb-2">Produits naturels</p>
                <p className="text-sm text-muted-foreground">Certifiés Ecocert et biodégradables</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-8">
                <div className="text-3xl font-bold text-green-500 mb-2">0</div>
                <p className="font-semibold mb-2">Produit toxique</p>
                <p className="text-sm text-muted-foreground">Aucun danger pour la santé</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-8">
                <div className="text-3xl font-bold text-green-500 mb-2">-80%</div>
                <p className="font-semibold mb-2">Déchets plastiques</p>
                <p className="text-sm text-muted-foreground">Emballages réutilisables</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-8">
                <Leaf className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-semibold mb-2">Certifié bio</p>
                <p className="text-sm text-muted-foreground">Labels Ecolabel Européen</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <StatsSection
        title="Notre impact positif"
        subtitle="Des chiffres qui témoignent de notre engagement écologique et de la satisfaction client"
        stats={statsData}
        variant="cards"
      />

      {/* Valeurs */}
      <ValuesSection
        title="Nos valeurs environnementales"
        subtitle="Les principes qui guident notre approche du nettoyage professionnel durable"
        values={companyValues}
        layout="cards"
        className="bg-muted/20"
      />

      {/* Histoire */}
      <HistorySection
        title="Notre évolution verte"
        subtitle="9 ans d'innovation pour un nettoyage toujours plus respectueux de l'environnement"
        milestones={milestones}
        layout="timeline"
      />

      {/* Services spécialisés */}
      <section className="py-16 sm:py-24 bg-blue-50/50 dark:bg-blue-950/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Nos spécialités écologiques
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ménage Résidentiel</h3>
                <p className="text-muted-foreground mb-4">
                  Entretien écologique de votre domicile avec des produits sans danger pour vos enfants et animaux.
                </p>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  100% Naturel
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Bureaux & Entreprises</h3>
                <p className="text-muted-foreground mb-4">
                  Nettoyage professionnel respectueux de la santé de vos collaborateurs et de l'environnement.
                </p>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  Certifié Ecocert
                </Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Remise en État</h3>
                <p className="text-muted-foreground mb-4">
                  Nettoyage post-travaux avec des méthodes écologiques intensives pour une remise à neuf complète.
                </p>
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  Spécialisé
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <TeamSection
        title="Une équipe engagée"
        subtitle="Des professionnels formés aux techniques écologiques et passionnés par leur impact environnemental"
        members={teamMembers}
        layout="grid"
      />

      {/* Call to Action */}
      <CTASection
        title="Pour un environnement plus sain"
        subtitle="Devis écologique gratuit • Produits 100% naturels • Équipe certifiée • Satisfaction garantie"
        primaryCTA="Devis écologique gratuit"
        secondaryCTA="Découvrir nos méthodes"
        phone="01 23 45 67 89"
        email="contact@cleaner-pro.fr"
        onPrimaryClick={handleContact}
        onSecondaryClick={handleCall}
        className="bg-gradient-to-br from-green-500 to-blue-500"
      />
    </main>
  );
}