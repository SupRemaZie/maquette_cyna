import React from 'react';
import { Card as ShadcnCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { cn } from '../../lib/utils';

/**
 * Composant Card amélioré utilisant shadcn/ui
 * Wrapper pour maintenir la compatibilité avec l'API existante
 */
const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick,
  as: Component = ShadcnCard,
  ...props 
}) => {
  const hoverClasses = hover 
    ? 'transition-transform duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer' 
    : '';
  
  return (
    <Component 
      className={cn(hoverClasses, className)} 
      onClick={onClick} 
      {...props}
    >
      {children}
    </Component>
  );
};

// Export des sous-composants shadcn/ui pour utilisation avancée
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
