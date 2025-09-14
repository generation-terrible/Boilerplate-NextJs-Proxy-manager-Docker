"use client";

import { ContactHero } from "./ContactHero";
import { ContactForm } from "./ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Code2, Smartphone, Palette, Cloud, Zap, Users, Trophy, MessageCircle } from "lucide-react";

export function WebAgencyContact() {
  const webServices = [
    "Site web vitrine",
    "Application web (SaaS)",
    "E-commerce sur mesure",
    "Application mobile",
    "Refonte/Migration",
    "API & Intégrations",
    "Audit technique",
    "Formation équipe",
    "Autre projet digital"
  ];

  const customFields = [
    {
      name: "projectType",
      label: "Type de projet",
      type: "select" as const,
      options: ["Nouveau projet", "Refonte existante", "Évolution/Ajout", "Migration", "Audit/Conseil"],
      required: true
    },
    {
      name: "timeline",
      label: "Timeline souhaitée",
      type: "select" as const,
      options: ["Urgent (< 1 mois)", "Normal (1-3 mois)", "Flexible (3-6 mois)", "Long terme (> 6 mois)"],
      required: false
    },
    {
      name: "technologies",
      label: "Technologies préférées",
      type: "text" as const,
      required: false
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ContactHero
        title="Concrétisons votre projet digital"
        subtitle="De l'idée au déploiement, nous transformons votre vision en réalité"
        description="Notre équipe d'experts accompagne startups et entreprises dans leur transformation digitale. Discutons de votre projet et découvrons ensemble comment nous pouvons accélérer votre croissance."
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop"
        imageAlt="Équipe créative en brainstorming digital"
        imagePosition="right"
        icon="Code2"
        className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20"
      />

      {/* Services Cards Preview */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Nos expertises digitales</h2>
            <p className="text-muted-foreground">Solutions sur mesure pour tous vos besoins digitaux</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: Code2, label: "Web App", color: "text-purple-500" },
              { icon: Smartphone, label: "Mobile", color: "text-blue-500" },
              { icon: Palette, label: "UI/UX", color: "text-pink-500" },
              { icon: Cloud, label: "Cloud", color: "text-cyan-500" },
              { icon: Zap, label: "Performance", color: "text-yellow-500" },
              { icon: Trophy, label: "SEO", color: "text-green-500" }
            ].map((service, index) => (
              <div key={index} className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <service.icon className={`w-8 h-8 mx-auto mb-2 ${service.color}`} />
                <span className="text-sm font-medium">{service.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm
        title="Briefez votre projet"
        subtitle="Plus vous nous en dites, mieux nous pourrons vous accompagner"
        services={webServices}
        showBudgetRange={true}
        customFields={customFields}
      />

      {/* Process Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Notre processus de développement
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Analyse de vos besoins, audit technique et définition de la stratégie",
                icon: MessageCircle,
                color: "text-purple-500"
              },
              {
                step: "02", 
                title: "Design",
                description: "Création des maquettes UX/UI et validation du parcours utilisateur",
                icon: Palette,
                color: "text-blue-500"
              },
              {
                step: "03",
                title: "Développement",
                description: "Codage avec méthologies agiles et tests continus",
                icon: Code2,
                color: "text-green-500"
              },
              {
                step: "04",
                title: "Déploiement",
                description: "Mise en ligne, formation et support post-lancement",
                icon: Rocket,
                color: "text-orange-500"
              }
            ].map((phase, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4`}>
                      <phase.icon className={`w-6 h-6 ${phase.color}`} />
                    </div>
                    <Badge variant="outline" className="mb-2">{phase.step}</Badge>
                    <CardTitle className="text-lg">{phase.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {phase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Stack technique moderne
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous utilisons les dernières technologies pour garantir performance, sécurité et évolutivité
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-500" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-500" />
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "PostgreSQL", "Prisma", "Stripe", "Auth.js"].map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-500" />
                  DevOps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "AWS", "Vercel", "CI/CD", "Monitoring"].map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            Prêt à lancer votre projet ?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Discutons de votre vision et transformons-la en solution digitale performante
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="border-white/20 text-white bg-white/10">
              📞 Réponse sous 2h
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white bg-white/10">
              💡 Devis gratuit
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white bg-white/10">
              🚀 Démarrage rapide
            </Badge>
          </div>
        </div>
      </section>
    </main>
  );
}