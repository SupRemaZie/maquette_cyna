import React from 'react';
import { Badge } from '../ui/badge';
import EmptyState from '../common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * Composant OrdersTab
 * Responsabilité unique : Afficher les commandes de l'utilisateur
 * Respecte le principe SRP
 */
const OrdersTab = ({ orders = [] }) => {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Mes commandes
        </h2>
        <EmptyState description="Aucune commande." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Mes commandes
      </h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">Commande #{order.id}</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(order.date)}
                </p>
              </div>
              <Badge variant="success">Terminée</Badge>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Articles:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                Total: {formatCurrency(order.total)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;
