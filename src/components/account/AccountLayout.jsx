import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

/**
 * Composant AccountLayout amélioré utilisant shadcn/ui
 * Responsabilité unique : Gérer la navigation et la mise en page du compte
 * Respecte le principe SRP et OCP (ouvert à l'extension via children)
 */
const AccountLayout = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  children 
}) => {
  const tabs = [
    { id: 'profile', label: 'Mes informations' },
    { id: 'subscriptions', label: 'Mes abonnements' },
    { id: 'orders', label: 'Mes commandes' },
    { id: 'payment', label: 'Méthodes de paiement' },
  ];

  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Mon compte
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation par onglets */}
          <div className="lg:col-span-1">
            {/* Mobile: onglets horizontaux */}
            <div className="lg:hidden mb-6">
              <div className="bg-white rounded-lg shadow-md p-2">
                <Tabs value={activeTab} onValueChange={onTabChange} orientation="horizontal">
                  <TabsList className="w-full grid grid-cols-2 gap-2">
                    {tabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="w-full mt-4 text-red-600 hover:bg-red-50 border-red-600"
                >
                  Se déconnecter
                </Button>
              </div>
            </div>
            
            {/* Desktop: sidebar verticale */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-md p-4">
                <Tabs value={activeTab} onValueChange={onTabChange} orientation="vertical">
                  <TabsList className="flex-col h-auto w-full">
                    {tabs.map((tab) => (
                      <TabsTrigger 
                        key={tab.id} 
                        value={tab.id}
                        className="w-full justify-start"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="w-full mt-4 text-red-600 hover:bg-red-50 border-red-600"
                >
                  Se déconnecter
                </Button>
              </div>
            </div>
          </div>
          
          {/* Contenu */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
