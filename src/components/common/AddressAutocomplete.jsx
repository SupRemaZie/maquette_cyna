import React, { useState, useEffect, useRef } from 'react';

const AddressAutocomplete = ({ 
  value, 
  onChange, 
  onAddressSelect,
  label,
  required,
  className,
  error,
  placeholder = "Commencez à taper votre adresse..."
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchAddress = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      // Utilisation de l'API Adresse de data.gouv.fr (gratuite et française)
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      
      if (data.features) {
        setSuggestions(data.features);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche d\'adresse:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    searchAddress(newValue);
  };

  const handleSelectSuggestion = (suggestion) => {
    const address = suggestion.properties.label;
    const { city, postcode, street, housenumber } = suggestion.properties;
    
    onChange(address);
    setShowSuggestions(false);
    
    // Extraire les informations de l'adresse
    if (onAddressSelect) {
      onAddressSelect({
        address: address,
        street: street || '',
        housenumber: housenumber || '',
        city: city || '',
        postalCode: postcode || '',
      });
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className={`
            w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
            ${error ? 'border-destructive' : 'border-input bg-background'}
          `.trim().replace(/\s+/g, ' ')}
          required={required}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">
                {suggestion.properties.label}
              </div>
              {suggestion.properties.context && (
                <div className="text-sm text-gray-500 mt-1">
                  {suggestion.properties.context}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default AddressAutocomplete;
