// Configuration des templates business
export type BusinessType = 'web-agency' | 'electrician' | 'cleaning' | 'default';

export interface TemplateConfig {
  id: BusinessType;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary?: string;
  };
  services: {
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  testimonial?: {
    text: string;
    author: string;
    company: string;
  };
}

export const businessTemplates: Record<BusinessType, TemplateConfig> = {
  'web-agency': {
    id: 'web-agency',
    name: 'Agence Web',
    description: 'Template pour agences digitales et développeurs',
    colors: {
      primary: 'hsl(262, 83%, 58%)', // Purple moderne
      secondary: 'hsl(210, 40%, 12%)', // Bleu foncé
      accent: 'hsl(47, 100%, 58%)', // Jaune vibrant
    },
    hero: {
      title: 'Créons ensemble votre présence digitale',
      subtitle: 'Agence web spécialisée dans le développement d\'applications modernes et performantes. De l\'idée au déploiement, nous donnons vie à vos projets.',
      ctaPrimary: 'Démarrer un projet',
      ctaSecondary: 'Voir nos réalisations',
    },
    services: {
      title: 'Nos expertises',
      items: [
        {
          icon: 'Code',
          title: 'Développement Web',
          description: 'Applications web modernes avec React, Next.js et TypeScript',
        },
        {
          icon: 'Smartphone',
          title: 'Applications Mobile',
          description: 'Apps natives et hybrides pour iOS et Android',
        },
        {
          icon: 'Palette',
          title: 'Design UX/UI',
          description: 'Interfaces intuitives et expériences utilisateur optimisées',
        },
        {
          icon: 'Rocket',
          title: 'Déploiement & SEO',
          description: 'Mise en ligne optimisée et référencement naturel',
        },
      ],
    },
    testimonial: {
      text: 'Une équipe exceptionnelle qui a su transformer notre vision en une plateforme digitale performante. Résultat au-delà de nos attentes !',
      author: 'Marie Dupont',
      company: 'CEO, TechStart',
    },
  },
  
  'electrician': {
    id: 'electrician',
    name: 'Électricien',
    description: 'Template pour artisans électriciens',
    colors: {
      primary: 'hsl(43, 100%, 50%)', // Jaune électrique
      secondary: 'hsl(220, 26%, 14%)', // Bleu foncé professionnel
      accent: 'hsl(120, 100%, 35%)', // Vert sécurité
    },
    hero: {
      title: 'Votre électricien de confiance',
      subtitle: 'Installations, dépannages et rénovations électriques. Intervention rapide 7j/7 pour particuliers et professionnels dans toute la région.',
      ctaPrimary: 'Demander un devis',
      ctaSecondary: 'Appel d\'urgence',
    },
    services: {
      title: 'Nos services',
      items: [
        {
          icon: 'Zap',
          title: 'Installation électrique',
          description: 'Mise aux normes, tableaux électriques, prises et éclairages',
        },
        {
          icon: 'Home',
          title: 'Rénovation',
          description: 'Modernisation complète de vos installations électriques',
        },
        {
          icon: 'AlertTriangle',
          title: 'Dépannage urgent',
          description: 'Intervention 24h/24 pour tous vos problèmes électriques',
        },
        {
          icon: 'Shield',
          title: 'Mise en conformité',
          description: 'Diagnostic et mise aux normes NF C 15-100',
        },
      ],
    },
    testimonial: {
      text: 'Très professionnel, ponctuel et de bon conseil. L\'installation a été réalisée dans les temps et le prix respecté. Je recommande vivement !',
      author: 'Jean-Paul Martin',
      company: 'Client particulier',
    },
  },

  'cleaning': {
    id: 'cleaning',
    name: 'Entreprise de Nettoyage',
    description: 'Template pour services de nettoyage',
    colors: {
      primary: 'hsl(195, 100%, 45%)', // Bleu propre
      secondary: 'hsl(160, 84%, 35%)', // Vert naturel
      accent: 'hsl(45, 100%, 55%)', // Jaune citron
    },
    hero: {
      title: 'Nettoyage professionnel sur mesure',
      subtitle: 'Services de nettoyage pour bureaux, commerces et particuliers. Équipe qualifiée, produits écologiques et tarifs transparents.',
      ctaPrimary: 'Obtenir un devis gratuit',
      ctaSecondary: 'Nos tarifs',
    },
    services: {
      title: 'Nos prestations',
      items: [
        {
          icon: 'Building',
          title: 'Nettoyage de bureaux',
          description: 'Entretien régulier d\'espaces professionnels et commerciaux',
        },
        {
          icon: 'Home',
          title: 'Ménage à domicile',
          description: 'Services personnalisés pour particuliers et résidences',
        },
        {
          icon: 'Sparkles',
          title: 'Nettoyage après travaux',
          description: 'Remise en état complète après rénovations ou constructions',
        },
        {
          icon: 'Leaf',
          title: 'Produits écologiques',
          description: 'Solutions respectueuses de l\'environnement et de la santé',
        },
      ],
    },
    testimonial: {
      text: 'Service impeccable depuis 2 ans. Équipe ponctuelle, soigneuse et très professionnelle. Nos bureaux sont toujours parfaitement entretenus.',
      author: 'Sylvie Moreau',
      company: 'Responsable Facilities, InnoTech',
    },
  },

  'default': {
    id: 'default',
    name: 'Template par défaut',
    description: 'Template générique personnalisable',
    colors: {
      primary: 'hsl(222, 84%, 55%)',
      secondary: 'hsl(210, 40%, 12%)',
      accent: 'hsl(47, 100%, 58%)',
    },
    hero: {
      title: 'Bienvenue sur notre site',
      subtitle: 'Découvrez nos services et solutions adaptés à vos besoins.',
      ctaPrimary: 'Nous contacter',
      ctaSecondary: 'En savoir plus',
    },
    services: {
      title: 'Nos services',
      items: [
        {
          icon: 'Star',
          title: 'Service 1',
          description: 'Description du premier service proposé',
        },
        {
          icon: 'Target',
          title: 'Service 2', 
          description: 'Description du second service proposé',
        },
        {
          icon: 'Award',
          title: 'Service 3',
          description: 'Description du troisième service proposé',
        },
      ],
    },
  },
};

export function getBusinessTemplate(type: BusinessType): TemplateConfig {
  return businessTemplates[type] || businessTemplates.default;
}