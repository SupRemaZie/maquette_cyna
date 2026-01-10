import React from 'react';
import { Badge as ShadcnBadge } from '../ui/badge';
import { cn } from '../../lib/utils';

/**
 * Composant Badge amélioré utilisant shadcn/ui
 * Wrapper pour maintenir la compatibilité avec l'API existante
 */
const Badge = ({ 
  children, 
  variant = 'default', 
  className = '',
  ...props 
}) => {
  return (
    <ShadcnBadge 
      variant={variant}
      className={cn(className)}
      {...props}
    >
      {children}
    </ShadcnBadge>
  );
};

export default Badge;
