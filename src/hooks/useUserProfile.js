import { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { storageService } from '../services/storageService';

/**
 * Hook personnalisé pour gérer le profil utilisateur
 * Responsabilité unique : Gérer l'état et les opérations du profil utilisateur
 * Respecte le principe SRP
 */
export const useUserProfile = () => {
  const { user } = useCart();
  const [formData, setFormData] = useState(() => {
    const saved = storageService.get('user_address', {});
    return {
      firstName: user?.firstName || saved.firstName || '',
      lastName: user?.lastName || saved.lastName || '',
      email: user?.email || saved.email || '',
      phone: saved.phone || '',
      company: saved.company || '',
      address: saved.address || '',
      street: saved.street || '',
      city: saved.city || '',
      postalCode: saved.postalCode || '',
      country: saved.country || 'France',
    };
  });

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateFields = useCallback((fields) => {
    setFormData(prev => ({ ...prev, ...fields }));
  }, []);

  const saveProfile = useCallback(() => {
    storageService.set('user_address', formData);
    return true;
  }, [formData]);

  const handleAddressSelect = useCallback((addressData) => {
    setFormData(prev => ({
      ...prev,
      address: addressData.address,
      street: addressData.street,
      city: addressData.city,
      postalCode: addressData.postalCode,
    }));
  }, []);

  return {
    formData,
    updateField,
    updateFields,
    saveProfile,
    handleAddressSelect,
  };
};
