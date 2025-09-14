"use client";

import { AboutHero } from "./AboutHero";
import { TeamSection } from "./TeamSection";
import { ValuesSection } from "./ValuesSection";
import { HistorySection } from "./HistorySection";
import { StatsSection } from "../homepage/StatsSection";
import { CTASection } from "../homepage/CTASection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Clock, Users } from "lucide-react";

export function ElectricianAbout() {
  const handleContact = () => {
    window.open('mailto:contact@electro-pro.fr', '_self');
  };

  const handleCall = () => {
    window.open('tel:+33123456789', '_self');
  };

  // Équipe électricien
  const teamMembers = [
    {
      name: "Michel Dupont",
      role: "Électricien Chef d'Équipe",
      description: "20 ans d'expérience en installations électriques. Spécialisé dans les normes NF C 15-100 et les systèmes domotiques modernes.",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      skills: ["Installations", "Dépannages", "Domotique"],
      socialLinks: {
        email: "michel@electro-pro.fr"
      }
    },
    {
      name: "Thomas Martin",
      role: "Électricien Spécialisé",
      description: "Expert en éclairage LED et solutions éco-énergétiques. Formé aux dernières technologies de maison connectée.",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      skills: ["LED", "Économies d'énergie", "Maintenance"],
      socialLinks: {
        email: "thomas@electro-pro.fr"
      }
    },
    {
      name: "Julien Moreau",
      role: "Électricien Industriel",
      description: "Spécialiste des installations électriques industrielles et de la mise aux normes des tableaux électriques.",
      imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      skills: ["Industriel", "Normes", "Sécurité"],
      socialLinks: {
        email: "julien@electro-pro.fr"
      }
    }
  ];

  // Valeurs électricien
  const companyValues = [
    {
      title: "Sécurité Avant Tout",
      description: "Respect strict des normes de sécurité électrique pour protéger votre famille et vos biens.",
      icon: "Shield",
      color: "text-red-500"
    },
    {
      title: "Intervention Rapide",
      description: "Disponibilité 24h/24 pour vos urgences électriques avec intervention sous 2h.",
      icon: "Clock",
      color: "text-orange-500"
    },
    {
      title: "Expertise Certifiée",
      description: "Électriciens qualifiés et certifiés RGE, à jour des dernières réglementations.",
      icon: "Award",
      color: "text-yellow-500"
    },
    {
      title: "Service Personnalisé",
      description: "Conseil adapté à vos besoins avec devis gratuit et explications transparentes.",
      icon: "Users",
      color: "text-blue-500"
    }
  ];

  // Histoire de l'entreprise électricienne
  const milestones = [
    {
      year: "2010",
      title: "Création de l'entreprise",
      description: "Michel Dupont lance son entreprise d'électricité avec une vision : allier tradition artisanale et innovation technologique.",
      imageSrc: "https://images.unsplash.com/photo-1621905252472-e8be73bb8914?w=400&h=300&fit=crop",
      highlight: false
    },
    {
      year: "2013",
      title: "Certification RGE",
      description: "Obtention de la certification RGE (Reconnu Garant de l'Environnement) pour les installations éco-énergétiques.",
      imageSrc: "https://images.unsplash.com/photo-1609358905581-e5381612486e?w=400&h=300&fit=crop",
      highlight: false
    },
    {
      year: "2016",
      title: "Expansion de l'équipe",
      description: "Recrutement de spécialistes et diversification vers la domotique et les solutions connectées.",
      imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      highlight: false
    },
    {
      year: "2019",
      title: "Spécialisation LED",
      description: "Devient référence locale pour l'éclairage LED et les économies d'énergie avec 500+ installations.",
      imageSrc: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
      highlight: true
    },
    {
      year: "2024",
      title: "Leader régional",
      description: "Plus de 2000 interventions réussies et reconnaissance comme artisan de confiance de la région.",
      imageSrc: "https://images.unsplash.com/photo-1621905252472-e8be73bb8914?w=400&h=300&fit=crop",
      highlight: true
    }
  ];

  // Statistiques électricien
  const statsData = [
    {
      value: "2000+",
      label: "Interventions réalisées",
      description: "Dépannages et installations réussis",
      icon: "Zap",
      color: "text-yellow-500"
    },
    {
      value: "100%",
      label: "Aux normes",
      description: "Respect des normes NF C 15-100",
      icon: "Shield",
      color: "text-green-500"
    },
    {
      value: "2h",
      label: "Délai d'urgence",
      description: "Intervention rapide 24h/24",
      icon: "Clock",
      color: "text-red-500"
    },
    {
      value: "14ans",
      label: "D'expérience",
      description: "Au service de votre sécurité",
      icon: "Award",
      color: "text-blue-500"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AboutHero
        title="Votre électricien de confiance depuis 14 ans"
        subtitle="Expertise, sécurité et innovation électrique"
        description="Entreprise familiale spécialisée dans les installations électriques, le dépannage d'urgence et les solutions éco-énergétiques. Nous mettons notre savoir-faire au service de votre sécurité et de votre confort."
        imageSrc="https://images.unsplash.com/photo-1609358905581-e5381612486e?w=600&h=600&fit=crop"
        imageAlt="Électricien professionnel au travail"
        imagePosition="left"
        icon="Zap"
      />

      {/* Section Urgences */}
      <section className="py-12 bg-red-50 dark:bg-red-950/20 border-y border-red-200 dark:border-red-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              🚨 Urgences Électriques 24h/24
            </h2>
            <p className="text-lg mb-6">
              Panne de courant, disjoncteur qui saute, odeur de brûlé ? Appelez-nous !
            </p>
            <div className="flex justify-center">
              <Badge variant="destructive" className="text-lg py-2 px-6">
                📞 01 23 45 67 89 - DISPONIBLE 24H/24
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <StatsSection
        title="Notre expertise en chiffres"
        subtitle="Des années d'expérience au service de votre sécurité électrique"
        stats={statsData}
        variant="cards"
        className="bg-yellow-50/50 dark:bg-yellow-950/10"
      />

      {/* Valeurs */}
      <ValuesSection
        title="Nos engagements"
        subtitle="Les principes qui guident notre travail quotidien pour votre sécurité"
        values={companyValues}
        layout="cards"
      />

      {/* Certifications */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Nos certifications et garanties
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Shield className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>RGE Qualifié</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reconnu Garant de l'Environnement pour les économies d'énergie
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Assurance Décennale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tous nos travaux sont couverts par notre assurance
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-500 font-bold text-lg">NF</span>
                </div>
                <CardTitle>Normes NF C 15-100</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Respect strict des normes électriques en vigueur
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-500 font-bold">2</span>
                </div>
                <CardTitle>Garantie 2 ans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Garantie sur tous nos travaux d'installation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <HistorySection
        title="Notre parcours"
        subtitle="14 ans d'évolution au service de votre sécurité électrique"
        milestones={milestones}
        layout="timeline"
      />

      {/* Équipe */}
      <TeamSection
        title="Notre équipe d'experts"
        subtitle="Des électriciens qualifiés et passionnés par leur métier"
        members={teamMembers}
        layout="grid"
        className="bg-muted/20"
      />

      {/* Call to Action */}
      <CTASection
        title="Besoin d'un électricien qualifié ?"
        subtitle="Devis gratuit • Intervention rapide • Travail garanti • Urgences 24h/24"
        primaryCTA="Demander un devis"
        secondaryCTA="Appel d'urgence"
        phone="01 23 45 67 89"
        email="contact@electro-pro.fr"
        onPrimaryClick={handleContact}
        onSecondaryClick={handleCall}
        className="bg-gradient-to-br from-yellow-500 to-orange-500"
      />
    </main>
  );
}