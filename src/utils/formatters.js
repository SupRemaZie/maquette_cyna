/**
 * Utilitaires de formatage
 * Responsabilité unique : Fournir des fonctions de formatage réutilisables
 * Respecte le principe SRP
 */

/**
 * Formate un montant en devise EUR
 */
export const formatCurrency = (amount, currency = 'EUR', locale = 'fr-FR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Formate une date selon la locale
 */
export const formatDate = (date, locale = 'fr-FR', options = {}) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString(locale, options);
};

/**
 * Formate un numéro de carte bancaire (masque les chiffres)
 */
export const maskCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '').replace(/\D/g, '');
  if (cleaned.length < 4) return cardNumber;
  return '**** **** **** ' + cleaned.slice(-4);
};

/**
 * Formate un numéro de carte avec des espaces tous les 4 chiffres
 */
export const formatCardNumber = (value) => {
  const cleaned = value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
  return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
};

/**
 * Formate un CVV (limite à 3 chiffres)
 */
export const formatCvv = (value) => {
  return value.replace(/\D/g, '').slice(0, 3);
};
