import React from 'react';
import { Checkbox as ShadcnCheckbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { cn } from '../../lib/utils';

/**
 * Composant Checkbox amélioré utilisant shadcn/ui
 * Wrapper pour maintenir la compatibilité avec l'API existante
 */
const Checkbox = ({ 
  id,
  label, 
  checked, 
  onCheckedChange,
  onChange, // Support de l'ancienne API
  disabled = false,
  className = '',
  labelClassName = '',
  ...props 
}) => {
  // Support de l'ancienne API onChange
  const handleChange = (checked) => {
    if (onCheckedChange) {
      onCheckedChange(checked);
    } else if (onChange) {
      // Simuler l'événement onChange pour compatibilité
      onChange({ target: { checked } });
    }
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <ShadcnCheckbox
        id={id}
        checked={checked}
        onCheckedChange={handleChange}
        disabled={disabled}
        {...props}
      />
      {label && (
        <Label 
          htmlFor={id} 
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            disabled && 'opacity-50',
            labelClassName
          )}
        >
          {label}
        </Label>
      )}
    </div>
  );
};

export default Checkbox;
