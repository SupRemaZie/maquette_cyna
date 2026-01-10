import React from 'react';
import Input from '../common/Input';
import { Button } from '../ui/button';
import AddressAutocomplete from '../common/AddressAutocomplete';
import Section from '../common/Section';
import { useUserProfile } from '../../hooks/useUserProfile';

/**
 * Composant ProfileTab
 * Responsabilité unique : Gérer l'affichage et la modification du profil utilisateur
 * Respecte le principe SRP
 */
const ProfileTab = () => {
  const {
    formData,
    updateField,
    saveProfile,
    handleAddressSelect,
  } = useUserProfile();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile();
    alert('Informations mises à jour avec succès !');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Mes informations
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Prénom"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
          />
          <Input
            label="Nom"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
          />
        </div>
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="mb-4"
        />
        <Input
          label="Téléphone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className="mb-4"
        />
        <Input
          label="Entreprise"
          type="text"
          name="company"
          value={formData.company}
          onChange={(e) => updateField('company', e.target.value)}
          className="mb-4"
        />
        
        <Section title="Adresse de facturation" showBorder>
          <AddressAutocomplete
            label="Adresse"
            value={formData.address}
            onChange={(value) => updateField('address', value)}
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
              onChange={(e) => updateField('postalCode', e.target.value)}
            />
            <Input
              label="Ville"
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => updateField('city', e.target.value)}
            />
            <Input
              label="Pays"
              type="text"
              name="country"
              value={formData.country}
              onChange={(e) => updateField('country', e.target.value)}
            />
          </div>
        </Section>
        
        <Button type="submit" variant="default">
          Enregistrer les modifications
        </Button>
      </form>
    </div>
  );
};

export default ProfileTab;
