"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import toast from "react-hot-toast";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  services?: string[];
  showUrgentOption?: boolean;
  urgentLabel?: string;
  showBudgetRange?: boolean;
  customFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
    options?: string[];
    required?: boolean;
  }>;
  className?: string;
}

export function ContactForm({
  title = "Demande de devis",
  subtitle = "Parlez-nous de votre projet",
  services = [],
  showUrgentOption = false,
  urgentLabel = "Urgence",
  showBudgetRange = false,
  customFields = [],
  className = ""
}: ContactFormProps) {
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Demande envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.");
    setFormData({});
    setIsSubmitting(false);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">{title}</CardTitle>
              {subtitle && (
                <p className="text-muted-foreground">{subtitle}</p>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nom complet *
                    </label>
                    <Input 
                      required
                      value={formData.name || ''}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Votre nom et prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input 
                      type="email"
                      required
                      value={formData.email || ''}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="nom@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Téléphone
                    </label>
                    <Input 
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Entreprise
                    </label>
                    <Input 
                      value={formData.company || ''}
                      onChange={(e) => handleChange('company', e.target.value)}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                {services.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Service demandé
                    </label>
                    <select 
                      onChange={(e) => handleChange('service', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Choisir un service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Budget Range */}
                {showBudgetRange && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Budget approximatif
                    </label>
                    <select 
                      onChange={(e) => handleChange('budget', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Sélectionner une fourchette</option>
                      <option value="<500">Moins de 500€</option>
                      <option value="500-1000">500€ - 1 000€</option>
                      <option value="1000-2500">1 000€ - 2 500€</option>
                      <option value="2500-5000">2 500€ - 5 000€</option>
                      <option value=">5000">Plus de 5 000€</option>
                    </select>
                  </div>
                )}

                {/* Custom Fields */}
                {customFields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium mb-2">
                      {field.label} {field.required && '*'}
                    </label>
                    {field.type === 'select' && field.options ? (
                      <select 
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">{`Choisir ${field.label.toLowerCase()}`}</option>
                        {field.options.map((option, optIndex) => (
                          <option key={optIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <Textarea
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={`Décrivez ${field.label.toLowerCase()}`}
                        rows={3}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.label}
                      />
                    )}
                  </div>
                ))}

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    required
                    value={formData.message || ''}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Décrivez votre besoin en détail..."
                    rows={4}
                  />
                </div>

                {/* Urgent Option */}
                {showUrgentOption && (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="urgent"
                      checked={formData.urgent || false}
                      onChange={(e) => handleChange('urgent', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="urgent" className="text-sm font-medium">
                      {urgentLabel}
                    </label>
                    {formData.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        URGENCE
                      </Badge>
                    )}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer la demande
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Nos coordonnées</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Téléphone</h4>
                    <p className="text-muted-foreground">01 23 45 67 89</p>
                    <p className="text-sm text-muted-foreground">Lun-Ven 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-muted-foreground">contact@monappli.fr</p>
                    <p className="text-sm text-muted-foreground">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Adresse</h4>
                    <p className="text-muted-foreground">123 Rue de la Tech</p>
                    <p className="text-muted-foreground">75001 Paris, France</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-muted/20">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Temps de réponse</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Email</span>
                    <span className="text-green-600 font-medium">&lt; 24h</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Téléphone</span>
                    <span className="text-blue-600 font-medium">Immédiat</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Devis</span>
                    <span className="text-purple-600 font-medium">48h</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}