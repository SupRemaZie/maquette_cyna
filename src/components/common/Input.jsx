import React from 'react';
import { Input as ShadcnInput } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '../../lib/utils';

/**
 * Composant Input amélioré utilisant shadcn/ui
 * Respecte les principes SOLID et utilise les composants shadcn/ui
 */
const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder,
  error,
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={name} className="mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <ShadcnInput
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
