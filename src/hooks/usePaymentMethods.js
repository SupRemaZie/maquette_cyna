import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';

/**
 * Hook personnalisé pour gérer les méthodes de paiement
 * Responsabilité unique : Gérer l'état et les opérations des méthodes de paiement
 * Respecte le principe SRP
 */
export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState(() => {
    return storageService.get('payment_methods', []);
  });

  // Synchroniser avec localStorage
  useEffect(() => {
    storageService.set('payment_methods', paymentMethods);
  }, [paymentMethods]);

  const addPaymentMethod = useCallback((methodData) => {
    // Masquer les 12 premiers chiffres pour la sécurité
    const maskedNumber = '**** **** **** ' + methodData.cardNumber.slice(-4);
    
    const newMethod = {
      id: `card-${Date.now()}`,
      cardName: methodData.cardName,
      cardNumber: maskedNumber,
      cardExpiry: methodData.cardExpiry,
      isDefault: methodData.isDefault || paymentMethods.length === 0,
      addedDate: new Date().toISOString(),
    };

    // Si c'est la carte par défaut, retirer le statut par défaut des autres
    if (newMethod.isDefault) {
      setPaymentMethods(prev => 
        prev.map(m => ({ ...m, isDefault: false })).concat(newMethod)
      );
    } else {
      setPaymentMethods(prev => [...prev, newMethod]);
    }

    return newMethod;
  }, [paymentMethods.length]);

  const removePaymentMethod = useCallback((methodId) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== methodId));
  }, []);

  const setDefaultPaymentMethod = useCallback((methodId) => {
    setPaymentMethods(prev => 
      prev.map(m => ({
        ...m,
        isDefault: m.id === methodId,
      }))
    );
  }, []);

  return {
    paymentMethods,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
  };
};
