import React, { useState } from 'react';
import { mockSettings } from '../../data/adminMockData';
import { Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(mockSettings);
  const { success } = useToast();
  
  const handleSave = () => {
    success('Paramètres enregistrés avec succès !');
  };
  
  const tabs = [
    { id: 'general', label: 'Général' },
    { id: 'payment', label: 'Paiement' },
    { id: 'email', label: 'Email' },
    { id: 'security', label: 'Sécurité' },
  ];
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Paramètres</h2>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-border">
        <div className="flex gap-2 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Contenu des onglets */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nom du site</label>
              <input
                type="text"
                value={settings.general.siteName}
                className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email de contact</label>
              <input
                type="email"
                value={settings.general.contactEmail}
                className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Téléphone</label>
              <input
                type="tel"
                value={settings.general.phone}
                className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Adresse</label>
              <textarea
                value={settings.general.address}
                rows={3}
                className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}
        
        {activeTab === 'payment' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Stripe</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Clé publique</label>
                  <input
                    type="text"
                    value={settings.payment.stripe.publicKey}
                    className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Clé secrète</label>
                  <input
                    type="password"
                    value={settings.payment.stripe.secretKey}
                    className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring font-mono text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Taux de TVA (%)</label>
              <input
                type="number"
                value={settings.payment.taxRate}
                className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}
        
        {activeTab === 'email' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Confirmation de commande</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Sujet"
                  value={settings.email.orderConfirmation.subject}
                  className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <textarea
                  placeholder="Corps de l'email"
                  value={settings.email.orderConfirmation.body}
                  rows={6}
                  className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Authentification 2FA</h3>
                <p className="text-sm text-muted-foreground">Activer l'authentification à deux facteurs pour les administrateurs</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorEnabled}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Historique des connexions</h3>
              <div className="space-y-2">
                {settings.security.loginHistory.map((login) => (
                  <div key={login.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{login.location}</p>
                        <p className="text-xs text-muted-foreground">{login.ip}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        login.success ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive'
                      }`}>
                        {login.success ? 'Réussi' : 'Échoué'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(login.date).toLocaleString('fr-FR')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Save className="h-4 w-4" />
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

