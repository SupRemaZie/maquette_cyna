import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Composant EmptyState réutilisable
 * Responsabilité unique : Afficher un état vide avec un message et une action optionnelle
 */
const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = '' 
}) => {
  return (
    <div className={cn('text-center py-12', className)}>
      {Icon && (
        <Icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      )}
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
