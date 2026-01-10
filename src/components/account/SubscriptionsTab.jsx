import React from 'react';
import { Badge } from '../ui/badge';
import EmptyState from '../common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * Composant SubscriptionsTab
 * Responsabilité unique : Afficher les abonnements de l'utilisateur
 * Respecte le principe SRP
 */
const SubscriptionsTab = ({ subscriptions = [] }) => {
  if (subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Mes abonnements
        </h2>
        <EmptyState description="Aucun abonnement actif." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Mes abonnements
      </h2>
      <div className="space-y-4">
        {subscriptions.map((sub) => (
          <div key={sub.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{sub.productName}</h3>
                <Badge 
                  variant={sub.status === 'active' ? 'success' : 'default'} 
                  className="mt-1"
                >
                  {sub.status === 'active' ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {formatCurrency(sub.price)}
                  /{sub.type === 'monthly' ? 'mois' : 'an'}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <p>Début: {formatDate(sub.startDate)}</p>
              <p>Prochain paiement: {formatDate(sub.nextBilling)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsTab;
