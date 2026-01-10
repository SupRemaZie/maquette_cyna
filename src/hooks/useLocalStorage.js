import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer le localStorage
 * Responsabilité unique : Gérer la synchronisation entre state et localStorage
 * Respecte le principe SRP et DIP (abstraction de localStorage)
 */
export const useLocalStorage = (key, initialValue) => {
  // État initial : lire depuis localStorage ou utiliser la valeur initiale
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour à la fois le state et localStorage
  const setValue = (value) => {
    try {
      // Permettre à value d'être une fonction pour avoir la même API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};
