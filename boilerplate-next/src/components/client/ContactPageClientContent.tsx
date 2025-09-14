"use client";

import { useState, useEffect } from "react";
import { WebAgencyContact } from "../templates/contact/WebAgencyContact";
import { ElectricianContact } from "../templates/contact/ElectricianContact";
import { CleaningContact } from "../templates/contact/CleaningContact";
import { DefaultContact } from "../templates/contact/DefaultContact";
import { TemplateSwitcher } from "../templates/TemplateSwitcher";
import { BusinessType } from "@/lib/templates";

const contactTemplateComponents = {
  'web-agency': WebAgencyContact,
  'electrician': ElectricianContact,
  'cleaning': CleaningContact,
  'default': DefaultContact,
};

export function ContactPageClientContent() {
  const [currentTemplate, setCurrentTemplate] = useState<BusinessType>('default');

  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate') as BusinessType;
    if (savedTemplate && contactTemplateComponents[savedTemplate]) {
      setCurrentTemplate(savedTemplate);
    }
  }, []);

  const handleTemplateChange = (template: BusinessType) => {
    setCurrentTemplate(template);
    localStorage.setItem('selectedTemplate', template);
  };

  const TemplateComponent = contactTemplateComponents[currentTemplate];

  return (
    <>
      <TemplateComponent />
      <TemplateSwitcher 
        currentTemplate={currentTemplate}
        onTemplateChange={handleTemplateChange}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      />
    </>
  );
}