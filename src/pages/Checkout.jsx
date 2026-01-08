import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { CardExpiryPicker } from '../components/ui/date-picker';

const Checkout = () => {
  const { cart, getCartTotal, clearCart, isAuthenticated } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };
  
  const subtotal = getCartTotal();
  const tax = subtotal * 0.20;
  const total = subtotal + tax;
  
  const steps = [
    { number: 1, title: 'Connexion/Inscription' },
    { number: 2, title: 'Adresse de facturation' },
    { number: 3, title: 'Paiement' },
    { number: 4, title: 'Confirmation' },
  ];
  
  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleStep1Submit = (e) => {
    e.preventDefault();
    // Simuler la connexion/inscription
    if (!isAuthenticated) {
      // Simuler l'inscription
      const userData = {
        email: formData.email,
        firstName: formData.firstName || 'Utilisateur',
        lastName: formData.lastName || 'Test',
      };
      // Dans un vrai app, on appellerait l'API ici
      setCurrentStep(2);
    } else {
      setCurrentStep(2);
    }
  };
  
  const handleStep2Submit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };
  
  const handleStep3Submit = (e) => {
    e.preventDefault();
    // Simuler le paiement
    setCurrentStep(4);
    clearCart();
  };
  
  if (cart.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-screen">
        <div className="container-custom py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Panier vide</h1>
          <p className="text-gray-600 mb-6">Votre panier est vide.</p>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {/* Indicateur de progression */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step.number
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className={`ml-2 hidden md:block ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <form onSubmit={handleStep1Submit} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Connexion / Inscription</h2>
                {!isAuthenticated ? (
                  <>
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mb-4"
                    />
                    <Input
                      label="Mot de passe"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="mb-4"
                    />
                    <Input
                      label="Prénom"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mb-4"
                    />
                    <Input
                      label="Nom"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mb-4"
                    />
                  </>
                ) : (
                  <p className="text-gray-600 mb-4">Vous êtes connecté.</p>
                )}
                <Button type="submit" variant="primary" fullWidth>
                  Continuer
                </Button>
              </form>
            )}
            
            {currentStep === 2 && (
              <form onSubmit={handleStep2Submit} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Adresse de facturation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Prénom"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Nom"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Input
                  label="Entreprise (optionnel)"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="mb-4"
                />
                <Input
                  label="Adresse"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mb-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    label="Code postal"
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Ville"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Pays"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Retour
                  </Button>
                  <Button type="submit" variant="primary" className="flex-1">
                    Continuer
                  </Button>
                </div>
              </form>
            )}
            
            {currentStep === 3 && (
              <form onSubmit={handleStep3Submit} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de paiement</h2>
                <Input
                  label="Numéro de carte"
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="mb-4"
                />
                <Input
                  label="Nom sur la carte"
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                  className="mb-4"
                />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <CardExpiryPicker
                    label="Date d'expiration"
                    value={formData.cardExpiry}
                    onChange={(value) => setFormData(prev => ({ ...prev, cardExpiry: value }))}
                    required
                  />
                  <Input
                    label="CVV"
                    type="text"
                    name="cardCvv"
                    value={formData.cardCvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                    Retour
                  </Button>
                  <Button type="submit" variant="accent" className="flex-1">
                    Confirmer le paiement
                  </Button>
                </div>
              </form>
            )}
            
            {currentStep === 4 && (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Commande confirmée !</h2>
                <p className="text-gray-600 mb-6">
                  Merci pour votre commande. Vous recevrez un email de confirmation sous peu.
                </p>
                <Button onClick={() => navigate('/')} variant="primary">
                  Retour à l'accueil
                </Button>
              </div>
            )}
          </div>
          
          {/* Récapitulatif */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Récapitulatif</h2>
                <div className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.subscriptionType}`} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>TVA (20%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
