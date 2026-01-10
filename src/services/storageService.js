/**
 * Service de gestion du stockage local
 * Responsabilité unique : Gérer toutes les opérations de localStorage
 * Respecte le principe SRP et DIP (abstraction du stockage)
 */
class StorageService {
  constructor() {
    this.prefix = 'cyna_';
  }

  /**
   * Génère une clé avec le préfixe
   */
  getKey(key) {
    return `${this.prefix}${key}`;
  }

  /**
   * Récupère une valeur depuis localStorage
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.getKey(key));
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  /**
   * Sauvegarde une valeur dans localStorage
   */
  set(key, value) {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Supprime une valeur de localStorage
   */
  remove(key) {
    try {
      localStorage.removeItem(this.getKey(key));
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Vérifie si une clé existe
   */
  has(key) {
    return localStorage.getItem(this.getKey(key)) !== null;
  }
}

// Export d'une instance singleton
export const storageService = new StorageService();
export default storageService;
