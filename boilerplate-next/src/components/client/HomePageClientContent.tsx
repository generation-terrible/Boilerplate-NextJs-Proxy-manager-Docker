"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BusinessType } from "@/lib/templates";
import { TemplateSwitcher } from "@/components/templates/TemplateSwitcher";

// Import des templates
import { WebAgencyHomepage } from "@/components/templates/business/WebAgencyHomepage";
import { ElectricianHomepage } from "@/components/templates/business/ElectricianHomepage";
import { CleaningHomepage } from "@/components/templates/business/CleaningHomepage";
import { DefaultHomepage } from "@/components/templates/business/DefaultHomepage";

const templateComponents = {
  'web-agency': WebAgencyHomepage,
  'electrician': ElectricianHomepage,
  'cleaning': CleaningHomepage,
  'default': DefaultHomepage,
};

interface HomePageClientContentProps {
  translations: {
    welcomeText: string;
    descriptionText: string;
    successToastMessage: string;
    errorToastMessage: string;
    showSuccessButtonText: string;
    showErrorButtonText: string;
  };
}

export function HomePageClientContent({ translations: t }: HomePageClientContentProps) {
  const [currentTemplate, setCurrentTemplate] = useState<BusinessType>('default');

  // Sauvegarder la préférence de template
  useEffect(() => {
    const saved = localStorage.getItem('homepage-template');
    if (saved && saved in templateComponents) {
      setCurrentTemplate(saved as BusinessType);
    }
  }, []);

  const handleTemplateChange = (template: BusinessType) => {
    setCurrentTemplate(template);
    localStorage.setItem('homepage-template', template);
    toast.success(`Template "${template}" activé !`);
  };

  // Récupérer le composant du template actuel
  const TemplateComponent = templateComponents[currentTemplate];

  return (
    <>
      {/* Render du template sélectionné */}
      <TemplateComponent />
      
      {/* Template Switcher (visible uniquement en dev) */}
      {process.env.NODE_ENV === 'development' && (
        <TemplateSwitcher
          currentTemplate={currentTemplate}
          onTemplateChange={handleTemplateChange}
        />
      )}
    </>
  );
}
