"use client";

import { AboutHero } from "./AboutHero";
import { TeamSection } from "./TeamSection";
import { ValuesSection } from "./ValuesSection";
import { HistorySection } from "./HistorySection";
import { StatsSection } from "../homepage/StatsSection";
import { CTASection } from "../homepage/CTASection";

export function DefaultAbout() {
  const handleContact = () => {
    window.open('mailto:contact@monappli.fr', '_self');
  };

  const handleCall = () => {
    window.open('tel:+33123456789', '_self');
  };

  // Équipe par défaut
  const teamMembers = [
    {
      name: "Jean Martin",
      role: "CEO & Fondateur",
      description: "Entrepreneur passionné avec 15 ans d'expérience dans le développement de solutions digitales innovantes.",
      skills: ["Leadership", "Stratégie", "Innovation"],
      socialLinks: {
        linkedin: "https://linkedin.com",
        email: "jean@monappli.fr"
      }
    },
    {
      name: "Marie Dubois",
      role: "CTO",
      description: "Experte technique spécialisée dans l'architecture de systèmes scalables et les technologies modernes.",
      skills: ["Architecture", "DevOps", "Management"],
      socialLinks: {
        linkedin: "https://linkedin.com",
        email: "marie@monappli.fr"
      }
    },
    {
      name: "Pierre Durand",
      role: "Lead Developer",
      description: "Développeur senior passionné par les technologies web et l'expérience utilisateur optimale.",
      skills: ["React", "Node.js", "TypeScript"],
      socialLinks: {
        linkedin: "https://linkedin.com",
        email: "pierre@monappli.fr"
      }
    }
  ];

  // Valeurs de l'entreprise
  const companyValues = [
    {
      title: "Excellence",
      description: "Nous nous efforçons de livrer des solutions de la plus haute qualité à nos clients.",
      icon: "Award",
      color: "text-yellow-500"
    },
    {
      title: "Innovation",
      description: "Nous restons à la pointe de la technologie pour offrir des solutions modernes et efficaces.",
      icon: "Lightbulb",
      color: "text-blue-500"
    },
    {
      title: "Transparence",
      description: "Communication claire et honnête avec nos clients et partenaires à chaque étape.",
      icon: "Eye",
      color: "text-green-500"
    },
    {
      title: "Collaboration",
      description: "Le travail d'équipe et la collaboration sont au cœur de notre approche de développement.",
      icon: "Users",
      color: "text-purple-500"
    }
  ];

  // Histoire de l'entreprise
  const milestones = [
    {
      year: "2020",
      title: "Création de l'entreprise",
      description: "Lancement de notre startup avec une vision claire : simplifier le développement web pour les entreprises.",
      highlight: false
    },
    {
      year: "2021",
      title: "Premiers clients",
      description: "Acquisition de nos premiers clients et développement de notre expertise en solutions web sur mesure.",
      highlight: false
    },
    {
      year: "2022",
      title: "Expansion de l'équipe",
      description: "Croissance rapide de l'équipe pour répondre à la demande croissante de nos services.",
      highlight: false
    },
    {
      year: "2023",
      title: "Reconnaissance",
      description: "Récompensés comme 'Startup Tech de l'année' pour notre approche innovante et nos résultats exceptionnels.",
      highlight: true
    },
    {
      year: "2024",
      title: "Nouveaux horizons",
      description: "Lancement de notre plateforme SaaS et expansion vers de nouveaux marchés internationaux.",
      highlight: true
    }
  ];

  // Statistiques de l'entreprise
  const statsData = [
    {
      value: "100+",
      label: "Projets réalisés",
      description: "Solutions développées avec succès",
      icon: "Briefcase",
      color: "text-blue-500"
    },
    {
      value: "50+",
      label: "Clients satisfaits",
      description: "Entreprises qui nous font confiance",
      icon: "Users",
      color: "text-green-500"
    },
    {
      value: "4",
      label: "Années d'expérience",
      description: "D'expertise dans le domaine",
      icon: "Calendar",
      color: "text-purple-500"
    },
    {
      value: "24h/7",
      label: "Support",
      description: "Assistance technique disponible",
      icon: "Clock",
      color: "text-orange-500"
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AboutHero
        title="À propos de nous"
        subtitle="Votre partenaire de confiance pour vos projets digitaux"
        description="Nous sommes une équipe passionnée de développeurs et designers, dédiée à créer des solutions web innovantes qui propulsent votre business vers le succès."
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop"
        imageAlt="Équipe collaborative travaillant ensemble"
        imagePosition="right"
        icon="Users"
      />

      {/* Statistiques */}
      <StatsSection
        title="Notre impact en chiffres"
        subtitle="Des résultats qui parlent de notre engagement et de notre expertise"
        stats={statsData}
        variant="cards"
        className="bg-muted/20"
      />

      {/* Valeurs */}
      <ValuesSection
        title="Nos valeurs"
        subtitle="Les principes qui guident notre travail quotidien et notre relation avec nos clients"
        values={companyValues}
        layout="cards"
      />

      {/* Histoire */}
      <HistorySection
        title="Notre parcours"
        subtitle="Découvrez les étapes clés de notre évolution depuis notre création"
        milestones={milestones}
        layout="timeline"
        className="bg-muted/20"
      />

      {/* Équipe */}
      <TeamSection
        title="Notre équipe"
        subtitle="Rencontrez les talents qui donnent vie à vos projets"
        members={teamMembers}
        layout="grid"
      />

      {/* Call to Action */}
      <CTASection
        title="Prêt à démarrer votre projet ?"
        subtitle="Contactez-nous dès maintenant pour discuter de vos besoins et recevoir un devis personnalisé"
        primaryCTA="Nous contacter"
        secondaryCTA="Planifier un appel"
        phone="+33 1 23 45 67 89"
        email="contact@monappli.fr"
        onPrimaryClick={handleContact}
        onSecondaryClick={handleCall}
      />
    </main>
  );
}