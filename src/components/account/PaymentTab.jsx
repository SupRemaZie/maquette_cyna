import React, { useState } from 'react';
import { CreditCard, Trash2, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import Input from '../common/Input';
import { Badge } from '../ui/badge';
import Checkbox from '../common/Checkbox';
import EmptyState from '../common/EmptyState';
import { CardExpiryPicker } from '../ui/date-picker';
import { usePaymentMethods } from '../../hooks/usePaymentMethods';
import { formatCardNumber, formatCvv } from '../../utils/formatters';

/**
 * Composant PaymentTab
 * Responsabilité unique : Gérer l'affichage et la gestion des méthodes de paiement
 * Respecte le principe SRP
 */
const PaymentTab = () => {
  const {
    paymentMethods,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
  } = usePaymentMethods();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    isDefault: paymentMethods.length === 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!newPaymentMethod.cardName || !newPaymentMethod.cardNumber || !newPaymentMethod.cardExpiry) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    addPaymentMethod(newPaymentMethod);
    
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
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setNewPaymentMethod({
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      isDefault: false,
    });
  };

  const handleDelete = (methodId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      removePaymentMethod(methodId);
      alert('Carte supprimée');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Méthodes de paiement
        </h2>
        {!showAddForm && paymentMethods.length > 0 && (
          <Button
            variant="default"
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
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
            Ajouter une carte bancaire
          </h3>
          <form onSubmit={handleSubmit}>
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
                const formatted = formatCardNumber(e.target.value);
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
                  const formatted = formatCvv(e.target.value);
                  setNewPaymentMethod(prev => ({ ...prev, cardCvv: formatted }));
                }}
                placeholder="123"
                required
              />
            </div>
            <div className="mb-4">
              <Checkbox
                id="isDefault"
                label="Définir comme carte par défaut"
                checked={newPaymentMethod.isDefault}
                onCheckedChange={(checked) => setNewPaymentMethod(prev => ({ ...prev, isDefault: checked }))}
              />
            </div>
              <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Annuler
              </Button>
              <Button type="submit" variant="default" className="flex-1 w-full sm:w-auto">
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
                      <Badge variant="default">Par défaut</Badge>
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
                      setDefaultPaymentMethod(method.id);
                      alert('Carte définie comme carte par défaut');
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    Définir par défaut
                  </Button>
                )}
                <button
                  onClick={() => handleDelete(method.id)}
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
          <EmptyState
            icon={CreditCard}
            description="Aucune méthode de paiement enregistrée."
            action={
              <Button
                variant="default"
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                Ajouter une carte
              </Button>
            }
          />
        )
      )}
    </div>
  );
};

export default PaymentTab;
