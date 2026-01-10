import React from 'react';
import Input from './Input';
import { cn } from '../../lib/utils';

/**
 * Composant FormField réutilisable
 * Responsabilité unique : Encapsuler un champ de formulaire avec label et gestion d'erreur
 */
const FormField = ({ 
  label, 
  name, 
  error, 
  required = false,
  children,
  className = '',
  ...props 
}) => {
  // Si children est fourni, on l'utilise (pour permettre des inputs personnalisés)
  // Sinon, on utilise Input par défaut
  const inputComponent = children || (
    <Input
      label={label}
      name={name}
      error={error}
      required={required}
      {...props}
    />
  );

  return (
    <div className={cn('w-full', className)}>
      {inputComponent}
    </div>
  );
};

export default FormField;
