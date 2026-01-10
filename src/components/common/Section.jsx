import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Composant Section réutilisable
 * Responsabilité unique : Encapsuler une section de contenu avec titre et bordure optionnelle
 */
const Section = ({ 
  title, 
  children, 
  className = '',
  titleClassName = '',
  showBorder = false 
}) => {
  return (
    <div className={cn(
      'mb-6',
      showBorder && 'pt-4 border-t border-gray-200',
      className
    )}>
      {title && (
        <h3 className={cn('text-lg font-semibold text-gray-900 mb-4', titleClassName)}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Section;
