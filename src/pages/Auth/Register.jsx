import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptCGU: false,
    acceptPrivacy: false,
  });
  const [error, setError] = useState('');
  const { login } = useCart();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    // Vérifier que les CGU et la politique de confidentialité sont acceptées
    if (!formData.acceptCGU || !formData.acceptPrivacy) {
      setError('Veuillez accepter les CGU et la politique de confidentialité pour continuer');
      return;
    }
    
    // Sauvegarder le consentement avec timestamp pour preuve
    const consent = {
      cgu: formData.acceptCGU,
      privacy: formData.acceptPrivacy,
      timestamp: new Date().toISOString(),
      userEmail: formData.email,
      registrationId: `REG-${Date.now()}`,
    };
    
    // Sauvegarder dans localStorage pour preuve (auditable)
    const consents = JSON.parse(localStorage.getItem('cyna_consents') || '[]');
    consents.push(consent);
    localStorage.setItem('cyna_consents', JSON.stringify(consents));
    
    // Simuler l'inscription
    const userData = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
    };
    
    login(userData);
    navigate('/');
  };
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-background">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Inscription</h1>
          <p className="text-gray-600 text-center mb-6">
            Créez votre compte CYNA
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Prénom"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                label="Nom"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mb-4"
            />
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mb-4"
            />
            <Input
              label="Confirmer le mot de passe"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mb-6"
            />
            
            {/* Cases à cocher pour CGU et Politique de confidentialité */}
            <div className="mb-6 space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptCGU"
                  name="acceptCGU"
                  checked={formData.acceptCGU}
                  onChange={(e) => setFormData(prev => ({ ...prev, acceptCGU: e.target.checked }))}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="acceptCGU" className="ml-3 text-sm text-gray-700">
                  J'accepte les{' '}
                  <Link 
                    to="/cgu" 
                    target="_blank"
                    className="text-primary-600 hover:text-primary-700 underline font-medium"
                  >
                    Conditions Générales d'Utilisation
                  </Link>
                  <span className="text-red-500 ml-1">*</span>
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptPrivacy"
                  name="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onChange={(e) => setFormData(prev => ({ ...prev, acceptPrivacy: e.target.checked }))}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="acceptPrivacy" className="ml-3 text-sm text-gray-700">
                  J'accepte la{' '}
                  <Link 
                    to="/politique-confidentialite" 
                    target="_blank"
                    className="text-primary-600 hover:text-primary-700 underline font-medium"
                  >
                    Politique de Confidentialité et de Traitement des Données
                  </Link>
                  <span className="text-red-500 ml-1">*</span>
                </label>
              </div>
              
              <p className="text-xs text-gray-500 ml-7">
                Vous pouvez consulter les documents complets en cliquant sur les liens ci-dessus avant de valider.
              </p>
            </div>
            
            <Button type="submit" variant="primary" fullWidth size="lg">
              S'inscrire
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
