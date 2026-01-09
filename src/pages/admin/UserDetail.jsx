import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockUsers, mockOrders } from '../../data/adminMockData';
import { ArrowLeft, Edit, Lock, Unlock, Mail } from 'lucide-react';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users] = useState(mockUsers);
  const [orders] = useState(mockOrders);
  
  const user = users.find(u => u.id === parseInt(id));
  const userOrders = orders.filter(o => o.customer.id === parseInt(id));
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Utilisateur non trouvé</p>
        <Link to="/admin/users" className="text-primary hover:text-primary-600 mt-4 inline-block">
          Retour à la liste
        </Link>
      </div>
    );
  }
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const { success, info } = useToast();
  
  const handleBlockToggle = () => {
    success(user.status === 'Bloqué' ? 'Compte débloqué avec succès !' : 'Compte bloqué avec succès !');
  };
  
  const handleResetPassword = () => {
    info(`Email de réinitialisation envoyé à ${user.email}`);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/users"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleBlockToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              user.status === 'Bloqué'
                ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
            }`}
          >
            {user.status === 'Bloqué' ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            {user.status === 'Bloqué' ? 'Débloquer' : 'Bloquer'}
          </button>
          <button
            onClick={handleResetPassword}
            className="flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
          >
            <Mail className="h-4 w-4" />
            Réinitialiser mot de passe
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations personnelles */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informations personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Prénom</label>
                <p className="text-foreground mt-1">{user.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nom</label>
                <p className="text-foreground mt-1">{user.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                <p className="text-foreground mt-1">{user.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date d'inscription</label>
                <p className="text-foreground mt-1">{formatDate(user.registrationDate)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Statut du compte</label>
                <div className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === 'Actif' ? 'bg-accent/20 text-accent' :
                    user.status === 'Bloqué' ? 'bg-destructive/20 text-destructive' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Statistiques */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Statistiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Nombre de commandes</p>
                <p className="text-2xl font-bold text-foreground mt-1">{user.orderCount}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total dépensé</p>
                <p className="text-2xl font-bold text-foreground mt-1">{formatCurrency(user.totalSpent)}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Dernier achat</p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {userOrders.length > 0
                    ? formatDate(userOrders[0].date)
                    : 'Aucun achat'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Abonnements actifs */}
          {user.subscriptions.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Abonnements actifs</h3>
              <div className="space-y-3">
                {user.subscriptions.map((sub) => (
                  <div key={sub.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{sub.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(sub.price)} / {sub.type === 'monthly' ? 'mois' : 'an'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Début</p>
                        <p className="text-sm text-foreground">{formatDate(sub.startDate)}</p>
                        <p className="text-sm text-muted-foreground mt-1">Prochain paiement</p>
                        <p className="text-sm text-foreground">{formatDate(sub.nextBilling)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Historique des commandes */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Historique des commandes</h3>
              <Link
                to="/admin/orders"
                className="text-sm text-primary hover:text-primary-600"
              >
                Voir toutes les commandes
              </Link>
            </div>
            {userOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-sm font-semibold text-foreground">N° Commande</th>
                      <th className="text-left py-2 text-sm font-semibold text-foreground">Date</th>
                      <th className="text-left py-2 text-sm font-semibold text-foreground">Montant</th>
                      <th className="text-left py-2 text-sm font-semibold text-foreground">Statut</th>
                      <th className="text-left py-2 text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.slice(0, 10).map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-2 text-sm text-foreground">{order.orderNumber}</td>
                        <td className="py-2 text-sm text-foreground">{formatDate(order.date)}</td>
                        <td className="py-2 text-sm font-semibold text-foreground">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="py-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'Active' ? 'bg-accent/20 text-accent' :
                            order.status === 'Confirmée' ? 'bg-primary/20 text-primary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-2">
                          <Link
                            to={`/admin/orders/${order.id}`}
                            className="text-sm text-primary hover:text-primary-600"
                          >
                            Voir détails
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">Aucune commande</p>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Adresses */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Adresses enregistrées</h3>
            <div className="space-y-3">
              {user.addresses.map((address) => (
                <div key={address.id} className="p-3 border rounded-lg">
                  <p className="text-sm text-foreground">{address.street}</p>
                  <p className="text-sm text-foreground">
                    {address.postalCode} {address.city}
                  </p>
                  <p className="text-sm text-foreground">{address.country}</p>
                  {address.isDefault && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary mt-2">
                      Par défaut
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

