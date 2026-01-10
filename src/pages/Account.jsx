import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AccountLayout from '../components/account/AccountLayout';
import ProfileTab from '../components/account/ProfileTab';
import SubscriptionsTab from '../components/account/SubscriptionsTab';
import OrdersTab from '../components/account/OrdersTab';
import PaymentTab from '../components/account/PaymentTab';

/**
 * Composant Account refactorisé
 * Responsabilité unique : Orchestrer l'affichage des différents onglets du compte
 * Respecte les principes SOLID :
 * - SRP : Chaque sous-composant a une responsabilité unique
 * - OCP : Ouvert à l'extension (nouveaux onglets) mais fermé à la modification
 * - DIP : Dépend d'abstractions (hooks, services) plutôt que d'implémentations concrètes
 */
const Account = () => {
  const { isAuthenticated, logout } = useCart();
  const [activeTab, setActiveTab] = useState('profile');

  // Données mockées - à remplacer par des appels API réels
  const mockSubscriptions = [
    {
      id: 1,
      productName: 'CYNA EDR Enterprise',
      status: 'active',
      startDate: '2024-01-15',
      nextBilling: '2024-02-15',
      price: 149,
      type: 'monthly',
    },
  ];

  const mockOrders = [
    {
      id: 1,
      date: '2024-01-15',
      total: 149,
      status: 'completed',
      items: ['CYNA EDR Enterprise'],
    },
  ];

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'subscriptions':
        return <SubscriptionsTab subscriptions={mockSubscriptions} />;
      case 'orders':
        return <OrdersTab orders={mockOrders} />;
      case 'payment':
        return <PaymentTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <AccountLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={logout}
    >
      {renderTabContent()}
    </AccountLayout>
  );
};

export default Account;
