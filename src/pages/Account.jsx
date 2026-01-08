import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Account = () => {
  const { isAuthenticated, user, logout } = useCart();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    company: '',
  });
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const tabs = [
    { id: 'profile', label: 'Mes informations' },
    { id: 'subscriptions', label: 'Mes abonnements' },
    { id: 'orders', label: 'Mes commandes' },
    { id: 'addresses', label: 'Carnet d\'adresses' },
    { id: 'payment', label: 'Méthodes de paiement' },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler la sauvegarde
    alert('Informations mises à jour avec succès !');
  };
  
  const mockSubscriptions = [
    {
      id: 1,
      productName: 'CYNA EDR Enterprise',
      status: 'active',
      startDate: '2024-01-15',
      nextBilling: '2024-02-15',
      price: 149,
      type: 'monthly',
    },
  ];
  
  const mockOrders = [
    {
      id: 1,
      date: '2024-01-15',
      total: 149,
      status: 'completed',
      items: ['CYNA EDR Enterprise'],
    },
  ];
  
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 md:mb-8">Mon compte</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation par onglets */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4"
                >
                  Se déconnecter
                </button>
              </nav>
            </div>
          </div>
          
          {/* Contenu */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes informations</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Prénom"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                    <Input
                      label="Nom"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mb-4"
                  />
                  <Input
                    label="Téléphone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="mb-4"
                  />
                  <Input
                    label="Entreprise"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="mb-6"
                  />
                  <Button type="submit" variant="primary">
                    Enregistrer les modifications
                  </Button>
                </form>
              </div>
            )}
            
            {activeTab === 'subscriptions' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes abonnements</h2>
                {mockSubscriptions.length > 0 ? (
                  <div className="space-y-4">
                    {mockSubscriptions.map((sub) => (
                      <div key={sub.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{sub.productName}</h3>
                            <Badge variant={sub.status === 'active' ? 'success' : 'default'} className="mt-1">
                              {sub.status === 'active' ? 'Actif' : 'Inactif'}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(sub.price)}
                              /{sub.type === 'monthly' ? 'mois' : 'an'}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          <p>Début: {new Date(sub.startDate).toLocaleDateString('fr-FR')}</p>
                          <p>Prochain paiement: {new Date(sub.nextBilling).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Aucun abonnement actif.</p>
                )}
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes commandes</h2>
                {mockOrders.length > 0 ? (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">Commande #{order.id}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(order.date).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <Badge variant="success">Terminée</Badge>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-1">Articles:</p>
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {order.items.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                          <p className="text-lg font-semibold text-gray-900 mt-2">
                            Total: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(order.total)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Aucune commande.</p>
                )}
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Carnet d'adresses</h2>
                <p className="text-gray-600">Aucune adresse enregistrée.</p>
              </div>
            )}
            
            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Méthodes de paiement</h2>
                <p className="text-gray-600">Aucune méthode de paiement enregistrée.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
