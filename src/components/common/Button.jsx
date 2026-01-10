import React from 'react';
import { Button as ShadcnButton } from '../ui/button';
import { cn } from '../../lib/utils';

/**
 * Composant Button amélioré utilisant shadcn/ui
 * Wrapper pour maintenir la compatibilité avec l'API existante
 */
const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  // Mapping des variants pour compatibilité
  const variantMap = {
    primary: 'default',
    secondary: 'secondary',
    accent: 'accent',
    outline: 'outline',
    danger: 'destructive',
  };

  const mappedVariant = variantMap[variant] || variant;

  return (
    <ShadcnButton
      type={type}
      variant={mappedVariant}
      size={size}
      className={cn(fullWidth && 'w-full', className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};

export default Button;
