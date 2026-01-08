import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { CardExpiryPicker } from '../components/ui/date-picker';
import AddressAutocomplete from '../components/common/AddressAutocomplete';
import { CreditCard, Trash2, Plus } from 'lucide-react';

const Account = () => {
  const { isAuthenticated, user, logout } = useCart();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('cyna_user_address');
    const savedData = saved ? JSON.parse(saved) : {};
    return {
      firstName: user?.firstName || savedData.firstName || '',
      lastName: user?.lastName || savedData.lastName || '',
      email: user?.email || savedData.email || '',
      phone: savedData.phone || '',
      company: savedData.company || '',
      address: savedData.address || '',
      street: savedData.street || '',
      city: savedData.city || '',
      postalCode: savedData.postalCode || '',
      country: savedData.country || 'France',
    };
  });
  
  // États pour les moyens de paiement
  const [paymentMethods, setPaymentMethods] = useState(() => {
    const saved = localStorage.getItem('cyna_payment_methods');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    isDefault: paymentMethods.length === 0,
  });
  
  // Sauvegarder les moyens de paiement dans localStorage
  useEffect(() => {
    localStorage.setItem('cyna_payment_methods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const tabs = [
    { id: 'profile', label: 'Mes informations' },
    { id: 'subscriptions', label: 'Mes abonnements' },
    { id: 'orders', label: 'Mes commandes' },
    { id: 'payment', label: 'Méthodes de paiement' },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Sauvegarder l'adresse dans localStorage
    localStorage.setItem('cyna_user_address', JSON.stringify(formData));
    // Simuler la sauvegarde
    alert('Informations mises à jour avec succès !');
  };
  
  const handleAddressSelect = (addressData) => {
    setFormData(prev => ({
      ...prev,
      address: addressData.address,
      street: addressData.street,
      city: addressData.city,
      postalCode: addressData.postalCode,
    }));
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
            {/* Mobile: onglets horizontaux */}
            <div className="lg:hidden mb-6">
              <div className="bg-white rounded-lg shadow-md p-2">
                <nav className="flex space-x-2 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
                <button
                  onClick={logout}
                  className="w-full mt-4 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
            {/* Desktop: sidebar verticale */}
            <div className="hidden lg:block">
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
          </div>
          
          {/* Contenu */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Mes informations</h2>
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
                    className="mb-4"
                  />
                  
                  {/* Section Adresse de facturation */}
                  <div className="mb-6 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse de facturation</h3>
                    
                    <AddressAutocomplete
                      label="Adresse"
                      value={formData.address}
                      onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                      onAddressSelect={handleAddressSelect}
                      placeholder="Commencez à taper votre adresse (ex: 123 rue de la République, Paris)"
                      className="mb-4"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <Input
                        label="Code postal"
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                      />
                      <Input
                        label="Ville"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      />
                      <Input
                        label="Pays"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" variant="primary">
                    Enregistrer les modifications
                  </Button>
                </form>
              </div>
            )}
            
            {activeTab === 'subscriptions' && (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Mes abonnements</h2>
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
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Mes commandes</h2>
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
          
            
            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Méthodes de paiement</h2>
                  {!showAddForm && paymentMethods.length > 0 && (
                    <Button
                      variant="primary"
                      onClick={() => setShowAddForm(true)}
                      className="flex items-center gap-2 w-full sm:w-auto"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter une carte
                    </Button>
                  )}
                </div>
                
                {/* Formulaire d'ajout */}
                {showAddForm && (
                  <div className="mb-6 p-4 md:p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Ajouter une carte bancaire</h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        // Validation
                        if (!newPaymentMethod.cardName || !newPaymentMethod.cardNumber || !newPaymentMethod.cardExpiry) {
                          alert('Veuillez remplir tous les champs obligatoires');
                          return;
                        }
                        
                        // Masquer les 12 premiers chiffres pour la sécurité
                        const maskedNumber = '**** **** **** ' + newPaymentMethod.cardNumber.slice(-4);
                        
                        // Ajouter le moyen de paiement
                        const newMethod = {
                          id: `card-${Date.now()}`,
                          cardName: newPaymentMethod.cardName,
                          cardNumber: maskedNumber,
                          cardExpiry: newPaymentMethod.cardExpiry,
                          isDefault: newPaymentMethod.isDefault || paymentMethods.length === 0,
                          addedDate: new Date().toISOString(),
                        };
                        
                        // Si c'est la carte par défaut, retirer le statut par défaut des autres
                        if (newMethod.isDefault) {
                          const updatedMethods = paymentMethods.map(m => ({ ...m, isDefault: false }));
                          setPaymentMethods([...updatedMethods, newMethod]);
                        } else {
                          setPaymentMethods([...paymentMethods, newMethod]);
                        }
                        
                        // Réinitialiser le formulaire
                        setNewPaymentMethod({
                          cardName: '',
                          cardNumber: '',
                          cardExpiry: '',
                          cardCvv: '',
                          isDefault: false,
                        });
                        setShowAddForm(false);
                        alert('Carte ajoutée avec succès !');
                      }}
                    >
                      <Input
                        label="Nom sur la carte"
                        type="text"
                        name="cardName"
                        value={newPaymentMethod.cardName}
                        onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, cardName: e.target.value }))}
                        required
                        className="mb-4"
                      />
                      <Input
                        label="Numéro de carte"
                        type="text"
                        name="cardNumber"
                        value={newPaymentMethod.cardNumber}
                        onChange={(e) => {
                          // Formater le numéro de carte (espaces tous les 4 chiffres)
                          const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
                          const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                          setNewPaymentMethod(prev => ({ ...prev, cardNumber: formatted }));
                        }}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="mb-4"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <CardExpiryPicker
                          label="Date d'expiration"
                          value={newPaymentMethod.cardExpiry}
                          onChange={(value) => setNewPaymentMethod(prev => ({ ...prev, cardExpiry: value }))}
                          required
                        />
                        <Input
                          label="CVV"
                          type="text"
                          name="cardCvv"
                          value={newPaymentMethod.cardCvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                            setNewPaymentMethod(prev => ({ ...prev, cardCvv: value }));
                          }}
                          placeholder="123"
                          required
                        />
                      </div>
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={newPaymentMethod.isDefault}
                          onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, isDefault: e.target.checked }))}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                          Définir comme carte par défaut
                        </label>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setShowAddForm(false);
                            setNewPaymentMethod({
                              cardName: '',
                              cardNumber: '',
                              cardExpiry: '',
                              cardCvv: '',
                              isDefault: false,
                            });
                          }}
                          className="w-full sm:w-auto"
                        >
                          Annuler
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1 w-full sm:w-auto">
                          Ajouter la carte
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Liste des moyens de paiement */}
                {paymentMethods.length > 0 ? (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CreditCard className="h-6 w-6 text-primary-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-semibold text-gray-900 break-all">{method.cardNumber}</p>
                              {method.isDefault && (
                                <Badge variant="primary">Par défaut</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1 break-words">
                              {method.cardName} • Expire le {method.cardExpiry}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          {!method.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updated = paymentMethods.map(m => ({
                                  ...m,
                                  isDefault: m.id === method.id,
                                }));
                                setPaymentMethods(updated);
                                alert('Carte définie comme carte par défaut');
                              }}
                              className="flex-1 sm:flex-none"
                            >
                              Définir par défaut
                            </Button>
                          )}
                          <button
                            onClick={() => {
                              if (window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
                                setPaymentMethods(paymentMethods.filter(m => m.id !== method.id));
                                alert('Carte supprimée');
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                            aria-label="Supprimer"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !showAddForm && (
                    <div className="text-center py-12">
                      <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Aucune méthode de paiement enregistrée.</p>
                      <Button
                        variant="primary"
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-2 mx-auto"
                      >
                        <Plus className="h-4 w-4" />
                        Ajouter une carte
                      </Button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
