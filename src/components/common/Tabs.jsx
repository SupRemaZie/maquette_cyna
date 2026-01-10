import React from 'react';
import { Tabs as ShadcnTabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { cn } from '../../lib/utils';

/**
 * Composant Tabs amélioré utilisant shadcn/ui
 * Wrapper pour maintenir la compatibilité avec l'API existante
 */
const Tabs = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  orientation = 'horizontal',
  variant = 'default',
  className = '',
  children,
  ...props 
}) => {
  // Si children est fourni, utiliser l'API shadcn/ui complète
  if (children) {
    return (
      <ShadcnTabs value={activeTab} onValueChange={onTabChange} orientation={orientation} {...props}>
        {children}
      </ShadcnTabs>
    );
  }

  // API simplifiée pour compatibilité
  return (
    <ShadcnTabs value={activeTab} onValueChange={onTabChange} orientation={orientation} className={className} {...props}>
      <TabsList className={cn(
        orientation === 'vertical' && 'flex-col h-auto w-full',
        className
      )}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={cn(
              orientation === 'vertical' && 'w-full justify-start'
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </ShadcnTabs>
  );
};

// Export des sous-composants pour utilisation avancée
Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;
export { TabsList, TabsTrigger, TabsContent };
