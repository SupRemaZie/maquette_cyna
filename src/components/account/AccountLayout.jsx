import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { User, Package, CreditCard } from 'lucide-react';
import addToCartIcon from '../../../add-to-cart.png';

const AccountLayout = ({
  activeTab,
  onTabChange,
  onLogout,
  children
}) => {
  const tabs = [
    { id: 'profile',       label: 'Mes informations',      icon: User },
    { id: 'subscriptions', label: 'Mes abonnements',        icon: null, img: addToCartIcon },
    { id: 'orders',        label: 'Mes abonnements',         icon: Package },
    { id: 'payment',       label: 'Méthodes de paiement',   icon: CreditCard },
  ];

  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Mon compte
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation par onglets */}
          <div className="lg:col-span-1">
            {/* Mobile : barre d'icônes sur une ligne */}
            <div className="lg:hidden mb-6">
              <div className="bg-white rounded-xl shadow-md px-2 py-3 flex items-center justify-between gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <div key={tab.id} className="relative flex-1 group flex justify-center">
                      <button
                        onClick={() => onTabChange(tab.id)}
                        title={tab.label}
                        aria-label={tab.label}
                        className={cn(
                          "flex items-center justify-center w-12 h-12 rounded-xl transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {tab.img ? (
                          <img
                            src={tab.img}
                            alt={tab.label}
                            className="h-5 w-5 object-contain"
                            style={{ filter: isActive ? 'brightness(0) invert(1)' : 'brightness(0) opacity(0.5)' }}
                          />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </button>
                      {/* Tooltip */}
                      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                        {tab.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Desktop : sidebar verticale avec icônes + libellés */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-md p-4">
                <Tabs value={activeTab} onValueChange={onTabChange} orientation="vertical">
                  <TabsList className="flex-col h-auto w-full">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <TabsTrigger
                          key={tab.id}
                          value={tab.id}
                          className="w-full justify-start gap-2"
                        >
                          {tab.img ? (
                            <img
                              src={tab.img}
                              alt=""
                              className="h-4 w-4 object-contain flex-shrink-0"
                              style={{ filter: activeTab === tab.id ? 'brightness(0) invert(1)' : 'brightness(0) opacity(0.5)' }}
                            />
                          ) : (
                            <Icon className="h-4 w-4 flex-shrink-0" />
                          )}
                          {tab.label}
                        </TabsTrigger>
                      );
                    })}
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
