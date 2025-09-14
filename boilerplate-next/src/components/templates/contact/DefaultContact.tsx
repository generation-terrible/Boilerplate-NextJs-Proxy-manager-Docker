"use client";

import { ContactHero } from "./ContactHero";
import { ContactForm } from "./ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Phone, Mail, MessageSquare, Headphones } from "lucide-react";

export function DefaultContact() {
  const defaultServices = [
    "Développement web",
    "Application mobile",
    "Conseil technique",
    "Maintenance",
    "Formation",
    "Autre"
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ContactHero
        title="Contactez-nous"
        subtitle="Discutons de votre projet ensemble"
        description="Notre équipe d'experts est là pour vous accompagner dans la réalisation de vos projets digitaux. N'hésitez pas à nous contacter pour un devis gratuit ou tout simplement pour échanger sur vos besoins."
        imageSrc="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=600&fit=crop"
        imageAlt="Équipe en discussion autour d'un projet"
        imagePosition="right"
        icon="MessageSquare"
      />

      {/* Contact Form */}
      <ContactForm
        services={defaultServices}
        showBudgetRange={true}
        customFields={[
          {
            name: "deadline",
            label: "Délai souhaité",
            type: "select",
            options: ["Pas de contrainte", "1 mois", "2-3 mois", "6 mois", "Plus de 6 mois"],
            required: false
          }
        ]}
        className="bg-muted/20"
      />

      {/* Additional Info Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Pourquoi nous choisir ?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Headphones className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Support Personnalisé</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Un interlocuteur dédié pour votre projet du début à la fin
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Livraison Rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Respect des délais avec une méthodologie éprouvée
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Communication Transparente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Points réguliers et feedback constant tout au long du projet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Questions fréquentes
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comment se déroule un projet ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Après votre prise de contact, nous organisons un échange pour comprendre vos besoins. 
                  Nous vous proposons ensuite un devis détaillé et un planning. Une fois validé, 
                  nous démarrons le développement avec des points réguliers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quel est le délai pour recevoir un devis ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous nous engageons à vous fournir un devis détaillé sous 48h maximum après 
                  réception de votre demande. Pour les projets complexes, nous pouvons organiser 
                  un échange téléphonique préalable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Proposez-vous une maintenance après livraison ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, nous proposons des contrats de maintenance adaptés à vos besoins. 
                  Cela inclut les mises à jour de sécurité, les corrections de bugs et 
                  l'évolution de votre solution selon vos nouveaux besoins.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Travaillez-vous avec des clients internationaux ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolument ! Nous avons l'habitude de travailler avec des clients français et 
                  internationaux. Nous adaptons nos horaires de communication et proposons 
                  nos services en français et en anglais.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}