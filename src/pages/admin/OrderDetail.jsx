import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockOrders } from '../../data/adminMockData';
import { ArrowLeft, Download, Mail, Edit } from 'lucide-react';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orders] = useState(mockOrders);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const { success } = useToast();
  
  const order = orders.find(o => o.id === parseInt(id));
  
  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Commande non trouvée</p>
        <Link to="/admin/orders" className="text-primary hover:text-primary-600 mt-4 inline-block">
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
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const handleDownloadInvoice = () => {
    // Simuler le téléchargement
    success('Téléchargement de la facture démarré');
  };
  
  const handleSendEmail = () => {
    window.location.href = `mailto:${order.customer.email}?subject=Commande ${order.orderNumber}`;
  };
  
  const handleStatusChange = () => {
    if (!selectedStatus) {
      return;
    }
    success(`Statut de la commande modifié en "${selectedStatus}"`);
    setStatusModal(false);
  };
  
  React.useEffect(() => {
    if (order) {
      setSelectedStatus(order.status);
    }
  }, [order]);
  
  const statuses = ['En attente', 'Confirmée', 'Active', 'Terminée', 'Annulée'];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/orders"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Commande {order.orderNumber}</h2>
            <p className="text-sm text-muted-foreground">
              {formatDate(order.date)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Edit className="h-4 w-4" />
            Changer statut
          </button>
          <button
            onClick={handleDownloadInvoice}
            className="flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
          >
            <Download className="h-4 w-4" />
            Télécharger facture
          </button>
          <button
            onClick={handleSendEmail}
            className="flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
          >
            <Mail className="h-4 w-4" />
            Envoyer email
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statut */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Statut de la commande</h3>
            <div className="space-y-4">
              <div>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  order.status === 'Active' ? 'bg-accent/20 text-accent' :
                  order.status === 'Confirmée' ? 'bg-primary/20 text-primary' :
                  order.status === 'Terminée' ? 'bg-muted text-muted-foreground' :
                  order.status === 'Annulée' ? 'bg-destructive/20 text-destructive' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Historique des changements</h4>
                <div className="space-y-2">
                  {order.statusHistory.map((history, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{history.status}</span>
                      <span className="text-muted-foreground">
                        {formatDate(history.date)} - {history.user}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Services commandés */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Services commandés</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.subscriptionType === 'monthly' ? 'Abonnement mensuel' : 'Abonnement annuel'}
                    </p>
                    <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      {formatCurrency(item.subtotal)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.unitPrice)} / {item.subscriptionType === 'monthly' ? 'mois' : 'an'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Informations client */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informations client</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nom complet</label>
                <p className="text-foreground">{order.customer.firstName} {order.customer.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground">{order.customer.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                <p className="text-foreground">{order.customer.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Adresse de facturation</label>
                <p className="text-foreground text-sm">
                  {order.customer.address.street}<br />
                  {order.customer.address.postalCode} {order.customer.address.city}<br />
                  {order.customer.address.country}
                </p>
              </div>
            </div>
          </div>
          
          {/* Résumé financier */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Résumé financier</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="text-foreground">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">TVA (20%)</span>
                <span className="text-foreground">{formatCurrency(order.tax)}</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Total TTC</span>
                  <span className="text-xl font-bold text-foreground">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Informations de paiement */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informations de paiement</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Mode de paiement</label>
                <p className="text-foreground">{order.payment.method}</p>
                <p className="text-sm text-muted-foreground">
                  Carte se terminant par {order.payment.cardLast4}
                </p>
              </div>
              {order.payment.paymentDate && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date de paiement</label>
                  <p className="text-foreground">{formatDate(order.payment.paymentDate)}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Statut du paiement</label>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  order.payment.paymentStatus === 'Payé' ? 'bg-accent/20 text-accent' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.payment.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal changement de statut */}
      {statusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Changer le statut</h3>
            <div className="space-y-2 mb-6">
              {statuses.map((status) => (
                <label key={status} className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="text-primary"
                  />
                  <span className="text-foreground">{status}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setStatusModal(false)}
                className="px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;

