"use client";

import { ContactHero } from "./ContactHero";
import { ContactForm } from "./ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, Sparkles, Home, Building, Factory, Clock, Phone, Star, Shield } from "lucide-react";

export function CleaningContact() {
  const cleaningServices = [
    "Ménage résidentiel",
    "Nettoyage bureaux",
    "Nettoyage après travaux",
    "Nettoyage industriel",
    "Nettoyage vitres",
    "Nettoyage moquettes/tapis",
    "Désinfection/assainissement",
    "Nettoyage fin de bail",
    "Entretien régulier",
    "Autre service"
  ];

  const customFields = [
    {
      name: "service_type",
      label: "Type de service",
      type: "select" as const,
      options: ["Ponctuel", "Régulier (hebdomadaire)", "Régulier (bi-mensuel)", "Régulier (mensuel)"],
      required: true
    },
    {
      name: "space_type",
      label: "Type d'espace",
      type: "select" as const,
      options: ["Appartement", "Maison", "Bureau", "Magasin", "Restaurant", "Industrie", "Autre"],
      required: true
    },
    {
      name: "space_size",
      label: "Surface à nettoyer",
      type: "select" as const,
      options: ["Moins de 50m²", "50-100m²", "100-200m²", "200-500m²", "Plus de 500m²"],
      required: false
    },
    {
      name: "eco_products",
      label: "Préférence produits",
      type: "select" as const,
      options: ["Produits écologiques uniquement", "Produits standards acceptés", "Pas de préférence"],
      required: false
    }
  ];

  const handleQuoteCall = () => {
    window.open('tel:+33123456789', '_self');
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ContactHero
        title="Nettoyage professionnel et écologique"
        subtitle="Pour des espaces propres et sains, respectueux de l'environnement"
        description="Spécialistes du nettoyage écologique depuis 2015. Nous utilisons exclusivement des produits naturels certifiés, sans danger pour votre santé et celle de la planète."
        imageSrc="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=600&fit=crop"
        imageAlt="Nettoyage professionnel écologique"
        imagePosition="background"
        icon="Leaf"
      />

      {/* Engagement écologique */}
      <section className="py-12 bg-green-50/50 dark:bg-green-950/10 border-y border-green-200 dark:border-green-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Leaf className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
              100% Écologique • 0% Toxique
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tous nos produits sont certifiés Ecocert et biodégradables. 
              Nettoyage efficace sans compromettre votre santé ni l'environnement.
            </p>
          </div>
        </div>
      </section>

      {/* Services cards */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Nos services écologiques</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300 border-blue-100">
              <CardHeader>
                <Home className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Particuliers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Ménage à domicile avec produits sans danger pour enfants et animaux
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="outline" className="text-green-600">25€/h</Badge>
                  <Badge variant="outline" className="text-blue-600">CESU</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-green-200">
              <CardHeader>
                <Building className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Entreprises</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Bureaux et locaux commerciaux, sans perturbation de votre activité
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="secondary">Sur devis</Badge>
                  <Badge variant="outline" className="text-green-600">Certifié Ecocert</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-purple-100">
              <CardHeader>
                <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Remise en État</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Après travaux, fin de bail, nettoyage intensif écologique
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="outline">40€/h</Badge>
                  <Badge variant="outline" className="text-purple-600">Spécialisé</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm
        title="Demande de devis écologique"
        subtitle="Parlez-nous de vos besoins, nous vous proposerons une solution sur mesure"
        services={cleaningServices}
        showBudgetRange={false}
        customFields={customFields}
      />

      {/* Avantages écologiques */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Pourquoi choisir le nettoyage écologique ?
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Santé préservée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Aucun produit toxique, idéal pour enfants, femmes enceintes et personnes sensibles
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Leaf className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Planète protégée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Produits biodégradables, emballages recyclables, -70% d'empreinte carbone
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Efficacité garantie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Résultats identiques aux produits chimiques, avec une approche respectueuse
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Qualité certifiée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Produits certifiés Ecocert, Ecolabel Européen, équipe formée et assurée
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Horaires et zones */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  Nos horaires flexibles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Particuliers</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Lun-Ven : 8h-18h</li>
                    <li>• Samedi : 8h-16h</li>
                    <li>• Dimanche : sur demande</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Professionnels</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 7j/7 : 6h-22h</li>
                    <li>• Intervention hors horaires possible</li>
                    <li>• Week-ends disponibles</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfaction client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">98%</div>
                  <p className="text-muted-foreground">de clients satisfaits</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-500">1500+</div>
                    <p className="text-xs text-muted-foreground">Clients fidèles</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">9ans</div>
                    <p className="text-xs text-muted-foreground">D'expérience</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-500">0</div>
                    <p className="text-xs text-muted-foreground">Produit toxique</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Note moyenne sur Google Reviews
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-green-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            Pour un environnement plus sain
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Devis écologique gratuit • Produits 100% naturels • Équipe certifiée • Satisfaction garantie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={handleQuoteCall}
              size="lg"
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-green-600"
            >
              <Phone className="w-5 h-5 mr-2" />
              Devis gratuit maintenant
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="outline" className="border-white/20 text-white bg-white/10">
              🌱 100% Écologique
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white bg-white/10">
              🏆 98% Satisfaction
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white bg-white/10">
              💚 Sans danger
            </Badge>
          </div>
        </div>
      </section>
    </main>
  );
}