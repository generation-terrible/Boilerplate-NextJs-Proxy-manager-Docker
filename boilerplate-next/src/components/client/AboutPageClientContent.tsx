"use client";

import { useState, useEffect } from "react";
import { WebAgencyAbout } from "../templates/about/WebAgencyAbout";
import { ElectricianAbout } from "../templates/about/ElectricianAbout";
import { CleaningAbout } from "../templates/about/CleaningAbout";
import { DefaultAbout } from "../templates/about/DefaultAbout";
import { TemplateSwitcher } from "../templates/TemplateSwitcher";
import { BusinessType } from "@/lib/templates";

const aboutTemplateComponents = {
  'web-agency': WebAgencyAbout,
  'electrician': ElectricianAbout,
  'cleaning': CleaningAbout,
  'default': DefaultAbout,
};

export function AboutPageClientContent() {
  const [currentTemplate, setCurrentTemplate] = useState<BusinessType>('default');

  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate') as BusinessType;
    if (savedTemplate && aboutTemplateComponents[savedTemplate]) {
      setCurrentTemplate(savedTemplate);
    }
  }, []);

  const handleTemplateChange = (template: BusinessType) => {
    setCurrentTemplate(template);
    localStorage.setItem('selectedTemplate', template);
  };

  const TemplateComponent = aboutTemplateComponents[currentTemplate];

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