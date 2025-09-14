"use client";

import { AboutHero } from "./AboutHero";
import { TeamSection } from "./TeamSection";
import { ValuesSection } from "./ValuesSection";
import { HistorySection } from "./HistorySection";
import { StatsSection } from "../homepage/StatsSection";
import { CTASection } from "../homepage/CTASection";

export function WebAgencyAbout() {
  const handleContact = () => {
    window.open('mailto:contact@webagency.fr', '_self');
  };

  const handleCall = () => {
    window.open('tel:+33123456789', '_self');
  };

  // Équipe agence web
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Creative Director",
      description: "Visionnaire créative avec 12 ans d'expérience dans le design digital et la stratégie UX. Passionnée par l'innovation et l'excellence.",
      imageSrc: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      skills: ["UX Strategy", "Design Thinking", "Leadership"],
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        email: "sarah@webagency.fr"
      }
    },
    {
      name: "Alex Rodriguez",
      role: "Lead Developer",
      description: "Architecte technique spécialisé en React, Node.js et cloud computing. Expert en performance et scalabilité des applications.",
      imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      skills: ["React", "TypeScript", "AWS", "Node.js"],
      socialLinks: {
        linkedin: "https://linkedin.com",
        email: "alex@webagency.fr"
      }
    },
    {
      name: "Emma Thompson",
      role: "UI/UX Designer",
      description: "Designer talentueuse qui transforme les idées complexes en interfaces intuitives et esthétiquement parfaites.",
      imageSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      skills: ["Figma", "Prototyping", "User Research"],
      socialLinks: {
        linkedin: "https://linkedin.com",
        email: "emma@webagency.fr"
      }
    },
    {
      name: "Marcus Kim",
      role: "DevOps Engineer",
      description: "Spécialiste en infrastructure cloud et automatisation. Garant de la performance et de la sécurité de nos déploiements.",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      skills: ["Docker", "Kubernetes", "CI/CD", "Monitoring"],
      socialLinks: {
        linkedin: "https://linkedin.com",
        email: "marcus@webagency.fr"
      }
    }
  ];

  // Valeurs agence web
  const companyValues = [
    {
      title: "Innovation Constante",
      description: "Nous explorons continuellement les dernières technologies pour offrir des solutions avant-gardistes.",
      icon: "Rocket",
      color: "text-purple-500"
    },
    {
      title: "Design Centré Utilisateur",
      description: "Chaque décision de design est prise en pensant à l'expérience optimale de l'utilisateur final.",
      icon: "Heart",
      color: "text-red-500"
    },
    {
      title: "Performance Maximale",
      description: "Nos applications sont optimisées pour des performances exceptionnelles sur tous les appareils.",
      icon: "Zap",
      color: "text-yellow-500"
    },
    {
      title: "Collaboration Agile",
      description: "Méthodologies agiles et communication transparente pour une livraison efficace et de qualité.",
      icon: "Users",
      color: "text-blue-500"
    }
  ];

  // Histoire de l'agence
  const milestones = [
    {
      year: "2018",
      title: "Naissance de l'agence",
      description: "Création de l'agence par Sarah et Alex, avec une vision claire : démocratiser l'excellence web.",
      imageSrc: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
      highlight: false
    },
    {
      year: "2019",
      title: "Premiers grands projets",
      description: "Partenariats avec des startups innovantes et développement de notre première plateforme e-commerce.",
      imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      highlight: false
    },
    {
      year: "2021",
      title: "Expansion internationale",
      description: "Ouverture vers les marchés européens et américains avec des projets multi-linguistiques complexes.",
      imageSrc: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      highlight: false
    },
    {
      year: "2022",
      title: "Prix Innovation Web",
      description: "Récompensés au Web Excellence Awards pour notre approche innovante du développement progressif.",
      imageSrc: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
      highlight: true
    },
    {
      year: "2024",
      title: "Leader du marché",
      description: "Référence incontournable pour les applications web complexes avec plus de 200 projets réalisés.",
      imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
      highlight: true
    }
  ];

  // Statistiques spécifiques agence web
  const statsData = [
    {
      value: "200+",
      label: "Applications livrées",
      description: "Solutions web et mobile de haute qualité",
      icon: "Code2",
      color: "text-purple-500"
    },
    {
      value: "98%",
      label: "Satisfaction client",
      description: "Taux de recommandation exceptionnel",
      icon: "Star",
      color: "text-yellow-500"
    },
    {
      value: "6ans",
      label: "D'expertise",
      description: "Au service de l'innovation digitale",
      icon: "Calendar",
      color: "text-blue-500"
    },
    {
      value: "15M€",
      label: "ROI généré",
      description: "Valeur créée pour nos clients",
      icon: "TrendingUp",
      color: "text-green-500"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AboutHero
        title="L'agence qui transforme vos idées en succès digital"
        subtitle="Experts passionnés du développement web et mobile"
        description="Depuis 6 ans, nous créons des expériences digitales exceptionnelles pour des entreprises visionnaires. Notre équipe multidisciplinaire combine créativité, expertise technique et vision stratégique."
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop"
        imageAlt="Équipe créative en brainstorming"
        imagePosition="right"
        icon="Code2"
      />

      {/* Statistiques */}
      <StatsSection
        title="Notre impact digital"
        subtitle="Des chiffres qui témoignent de notre expertise et de la confiance de nos clients"
        stats={statsData}
        variant="cards"
        className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20"
      />

      {/* Valeurs */}
      <ValuesSection
        title="Notre philosophie"
        subtitle="Les piliers qui définissent notre approche unique du développement web"
        values={companyValues}
        layout="cards"
      />

      {/* Histoire */}
      <HistorySection
        title="Notre évolution"
        subtitle="De startup ambitieuse à agence leader, découvrez notre parcours d'innovation continue"
        milestones={milestones}
        layout="timeline"
        className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20"
      />

      {/* Équipe */}
      <TeamSection
        title="L'équipe d'experts"
        subtitle="Des talents passionnés qui donnent vie à vos projets les plus ambitieux"
        members={teamMembers}
        layout="grid"
      />

      {/* Call to Action */}
      <CTASection
        title="Transformons ensemble votre vision digitale"
        subtitle="Discutons de votre projet et découvrez comment nous pouvons accélérer votre croissance digitale"
        primaryCTA="Démarrer un projet"
        secondaryCTA="Rencontrer l'équipe"
        phone="+33 1 23 45 67 89"
        email="hello@webagency.fr"
        onPrimaryClick={handleContact}
        onSecondaryClick={handleCall}
        className="bg-gradient-to-br from-purple-600 to-blue-600"
      />
    </main>
  );
}