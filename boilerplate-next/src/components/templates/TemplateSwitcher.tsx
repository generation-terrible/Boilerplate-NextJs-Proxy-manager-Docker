"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BusinessType, businessTemplates } from "@/lib/templates";
import { Code2, Zap, Sparkles, Building } from "lucide-react";

interface TemplateSwitcherProps {
  currentTemplate: BusinessType;
  onTemplateChange: (template: BusinessType) => void;
}

const templateIcons = {
  'web-agency': Code2,
  'electrician': Zap,
  'cleaning': Sparkles,
  'default': Building,
};

export function TemplateSwitcher({ currentTemplate, onTemplateChange }: TemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
      >
        <span className="hidden sm:inline">🎨 Templates ({Object.keys(businessTemplates).length})</span>
        <span className="sm:hidden">🎨</span>
      </Button>

      {/* Template Selection Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-96 max-w-96 max-h-[70vh] sm:max-h-96 overflow-y-auto bg-background border rounded-lg shadow-xl p-4 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm sm:text-base">Choisir un template</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              ✕
            </Button>
          </div>

          <div className="grid gap-3">
            {Object.entries(businessTemplates).map(([key, template]) => {
              const IconComponent = templateIcons[key as BusinessType];
              const isActive = currentTemplate === key;

              return (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isActive ? 'ring-2 ring-primary border-primary/50' : ''
                  }`}
                  onClick={() => {
                    onTemplateChange(key as BusinessType);
                    setIsOpen(false);
                  }}
                >
                  <CardHeader className="pb-2 p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <CardTitle className="text-sm sm:text-base">{template.name}</CardTitle>
                      </div>
                      {isActive && <Badge variant="default" className="text-xs">Actuel</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 p-3 sm:p-4 pt-0">
                    <CardDescription className="text-xs sm:text-sm line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              🚀 Templates pour sites vitrine professionnels
            </p>
          </div>
        </div>
      )}
    </div>
  );
}