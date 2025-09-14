"use client";

import { ContactHero } from "./ContactHero";
import { ContactForm } from "./ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Zap, Shield, Clock, MapPin, Phone, Wrench, Home, Building, Factory } from "lucide-react";

export function ElectricianContact() {
  const electricalServices = [
    "Dépannage électrique",
    "Installation électrique complète",
    "Mise aux normes (NF C 15-100)",
    "Tableau électrique",
    "Éclairage LED",
    "Prises et interrupteurs",
    "Chauffage électrique",
    "Domotique",
    "Diagnostic électrique",
    "Autre intervention"
  ];

  const customFields = [
    {
      name: "property_type",
      label: "Type de bien",
      type: "select" as const,
      options: ["Appartement", "Maison individuelle", "Bureau/Local", "Magasin", "Usine/Entrepôt"],
      required: true
    },
    {
      name: "surface",
      label: "Surface approximative",
      type: "select" as const,
      options: ["Moins de 50m²", "50-100m²", "100-200m²", "200-500m²", "Plus de 500m²"],
      required: false
    },
    {
      name: "urgency",
      label: "Niveau d'urgence",
      type: "select" as const,
      options: ["Pas urgent", "Dans la semaine", "Dans 2-3 jours", "Urgence 24h"],
      required: true
    }
  ];

  const handleEmergencyCall = () => {
    window.open('tel:+33123456789', '_self');
  };

  return (
    <main className="min-h-screen">
      {/* Emergency Banner */}
      <section className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" />
              <span className="font-semibold">Urgence électrique ? Panne de courant ?</span>
            </div>
            <Button 
              onClick={handleEmergencyCall}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-600"
            >
              <Phone className="w-4 h-4 mr-2" />
              Appeler 01 23 45 67 89
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <ContactHero
        title="Votre électricien qualifié à votre service"
        subtitle="Intervention rapide • Devis gratuit • Travaux garantis"
        description="Électricien certifié RGE avec plus de 15 ans d'expérience. Nous intervenons pour tous vos travaux électriques, du simple dépannage à l'installation complète, en respectant les normes NF C 15-100."
        imageSrc="https://images.unsplash.com/photo-1609358905581-e5381612486e?w=600&h=600&fit=crop"
        imageAlt="Électricien professionnel au travail"
        imagePosition="left"
        icon="Zap"
        className="bg-yellow-50/50 dark:bg-yellow-950/10"
      />

      {/* Services rapides */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Nos interventions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Home className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Particuliers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Dépannage, installation, mise aux normes pour votre domicile
                </p>
                <Badge variant="outline">25€/h</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 border-yellow-200">
              <CardHeader>
                <Building className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Professionnels</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Bureaux, commerces, interventions hors horaires
                </p>
                <Badge variant="secondary">Sur devis</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Factory className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Industriel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Installations industrielles, maintenance préventive
                </p>
                <Badge variant="outline">Sur mesure</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm
        title="Demande d'intervention"
        subtitle="Décrivez votre besoin, nous vous recontactons rapidement"
        services={electricalServices}
        showUrgentOption={true}
        urgentLabel="Intervention d'urgence (supplément 30%)"
        customFields={customFields}
      />

      {/* Zone d'intervention */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <MapPin className="w-8 h-8 text-yellow-500 inline mr-3" />
                Zone d'intervention
              </h2>
              <p className="text-muted-foreground mb-6">
                Nous intervenons dans un rayon de 30 km autour de Paris. 
                Votre ville n'apparaît pas ? Contactez-nous, nous étudierons votre demande.
              </p>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  "Paris (75)", "Boulogne (92)", "Versailles (78)", "Saint-Denis (93)",
                  "Créteil (94)", "Nanterre (92)", "Vincennes (94)", "Levallois (92)",
                  "Neuilly (92)", "Montreuil (93)", "Issy-les-Mx (92)", "Courbevoie (92)"
                ].map((city, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    {city}
                  </div>
                ))}
              </div>
            </div>

            <Card className="lg:max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  Délais d'intervention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Urgences</span>
                  <Badge variant="destructive">1-2h</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Dépannages</span>
                  <Badge variant="secondary">24-48h</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Installations</span>
                  <Badge variant="outline">Sur RDV</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Devis gratuit</span>
                  <Badge variant="outline">Immédiat</Badge>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">Disponibilités :</p>
                  <ul className="text-sm space-y-1">
                    <li>• Lun-Ven : 8h-18h</li>
                    <li>• Samedi : 8h-16h</li>
                    <li>• <span className="text-red-600 font-medium">Urgences 24h/24</span></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Vos garanties de qualité
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Shield className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-lg">Assurance Décennale</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Tous nos travaux sont couverts par notre assurance professionnelle
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-500 font-bold">RGE</span>
                </div>
                <CardTitle className="text-lg">Certification RGE</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Reconnu Garant de l'Environnement pour vos aides
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-500 font-bold text-lg">2</span>
                </div>
                <CardTitle className="text-lg">Garantie 2 ans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Garantie sur tous nos travaux d'installation
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-500 font-bold">NF</span>
                </div>
                <CardTitle className="text-lg">Normes NF C 15-100</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Respect strict des normes électriques
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Zap className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            Besoin d'un électricien maintenant ?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Intervention rapide • Devis gratuit • Travail garanti • Urgences 24h/24
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={handleEmergencyCall}
              size="lg"
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-yellow-600"
            >
              <Phone className="w-5 h-5 mr-2" />
              Appeler maintenant
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge variant="outline" className="border-white/20 text-white bg-white/10">
              ⚡ Urgences 24h/24
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white bg-white/10">
              🛡️ Assuré & Certifié
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white bg-white/10">
              ✅ Devis gratuit
            </Badge>
          </div>
        </div>
      </section>
    </main>
  );
}