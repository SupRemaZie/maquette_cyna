import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockOrders } from '../../data/adminMockData';
import { ArrowLeft, Download, Mail, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const STATUS_CONFIG = {
  'En attente': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500', border: 'border-yellow-200' },
  'Active':     { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  'Suspendue':  { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500', border: 'border-orange-200' },
  'Terminée':   { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-gray-400', border: 'border-gray-200' },
  'Annulée':    { bg: 'bg-destructive/10', text: 'text-destructive', dot: 'bg-destructive', border: 'border-destructive/20' },
};

const SUBSCRIPTION_STATUSES = ['En attente', 'Active', 'Suspendue', 'Terminée', 'Annulée'];

const StatusBadge = ({ status, size = 'md' }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['En attente'];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${cfg.bg} ${cfg.text} ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}>
      <span className={`rounded-full flex-shrink-0 ${cfg.dot} ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
      {status}
    </span>
  );
};

const CategoryBadge = ({ category }) => {
  const colors = {
    'EDR': 'bg-blue-100 text-blue-700',
    'XDR': 'bg-purple-100 text-purple-700',
    'SOC': 'bg-indigo-100 text-indigo-700',
    'Threat Intelligence': 'bg-red-100 text-red-700',
    'SIEM': 'bg-cyan-100 text-cyan-700',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${colors[category] || 'bg-muted text-muted-foreground'}`}>
      {category}
    </span>
  );
};

const OrderDetail = () => {
  const { id } = useParams();
  const [orders] = useState(mockOrders);
  // statusModal: null | subscription id being edited
  const [statusModal, setStatusModal] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  // Track expanded history per subscription
  const [expandedHistory, setExpandedHistory] = useState({});
  const { success } = useToast();

  const order = orders.find(o => o.id === parseInt(id));

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Commande non trouvée</p>
        <Link to="/admin/orders" className="text-primary hover:text-primary/80 mt-4 inline-block">
          Retour à la liste
        </Link>
      </div>
    );
  }

  const formatCurrency = (value) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  const handleOpenStatusModal = (sub) => {
    setSelectedStatus(sub.status);
    setStatusModal(sub.id);
  };

  const handleStatusChange = () => {
    if (!selectedStatus) return;
    const sub = order.subscriptions.find(s => s.id === statusModal);
    success(`Statut de "${sub.productName}" modifié en "${selectedStatus}"`);
    setStatusModal(null);
  };

  const toggleHistory = (subId) => {
    setExpandedHistory(prev => ({ ...prev, [subId]: !prev[subId] }));
  };

  const handleDownloadInvoice = () => success('Téléchargement de la facture démarré');
  const handleSendEmail = () => {
    window.location.href = `mailto:${order.customer.email}?subject=Commande ${order.orderNumber}`;
  };

  const editingSubscription = order.subscriptions.find(s => s.id === statusModal);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin/orders" className="p-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Commande {order.orderNumber}
            </h2>
            <p className="text-sm text-muted-foreground">
              {formatDateTime(order.date)} · {order.subscriptions.length} abonnement(s)
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 ml-10 sm:ml-0">
          <button onClick={handleDownloadInvoice}
            className="flex items-center gap-2 px-3 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors text-sm">
            <Download className="h-4 w-4" />
            <span>Facture</span>
          </button>
          <button onClick={handleSendEmail}
            className="flex items-center gap-2 px-3 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors text-sm">
            <Mail className="h-4 w-4" />
            <span>Email client</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale : abonnements */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            Abonnements de cette commande
          </h3>

          {order.subscriptions.map((sub) => {
            const cfg = STATUS_CONFIG[sub.status] || STATUS_CONFIG['En attente'];
            const historyOpen = expandedHistory[sub.id];
            return (
              <div key={sub.id} className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden ${cfg.border}`}>
                {/* Card header : service + statut */}
                <div className={`flex items-start justify-between gap-3 px-5 py-4 ${cfg.bg} border-b ${cfg.border}`}>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{sub.productName}</span>
                      <CategoryBadge category={sub.category} />
                    </div>
                    <p className="text-xs text-muted-foreground">{sub.subscriptionNumber}</p>
                  </div>
                  <StatusBadge status={sub.status} />
                </div>

                {/* Card body : détails */}
                <div className="px-5 py-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Type</p>
                      <p className="text-sm font-medium text-foreground">
                        {sub.subscriptionType === 'monthly' ? 'Mensuel' : 'Annuel'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Prix</p>
                      <p className="text-sm font-medium text-foreground">
                        {formatCurrency(sub.unitPrice)}
                        <span className="text-xs text-muted-foreground font-normal">
                          /{sub.subscriptionType === 'monthly' ? 'mois' : 'an'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Début</p>
                      <p className="text-sm font-medium text-foreground">{formatDate(sub.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Prochain renouvellement</p>
                      <p className="text-sm font-medium text-foreground">
                        {sub.nextBilling ? formatDate(sub.nextBilling) : '—'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card footer : actions + historique */}
                <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between gap-3 flex-wrap">
                  <button
                    onClick={() => handleOpenStatusModal(sub)}
                    className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Changer le statut
                  </button>
                  <button
                    onClick={() => toggleHistory(sub.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Historique ({sub.statusHistory.length})
                    {historyOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {/* Historique (collapsible) */}
                {historyOpen && (
                  <div className="px-5 py-3 border-t border-border bg-muted/10 space-y-1.5">
                    {sub.statusHistory.map((h, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={h.status} size="sm" />
                          <span className="text-muted-foreground">par {h.user}</span>
                        </div>
                        <span className="text-muted-foreground">{formatDateTime(h.date)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Informations client */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">Client</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Nom</p>
                <p className="text-sm text-foreground font-medium">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                <p className="text-sm text-foreground">{order.customer.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Téléphone</p>
                <p className="text-sm text-foreground">{order.customer.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Adresse de facturation</p>
                <p className="text-sm text-foreground leading-relaxed">
                  {order.customer.address.street}<br />
                  {order.customer.address.postalCode} {order.customer.address.city}<br />
                  {order.customer.address.country}
                </p>
              </div>
            </div>
          </div>

          {/* Résumé financier */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">Résumé financier</h3>
            <div className="space-y-2">
              {order.subscriptions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground truncate mr-2">{sub.productName}</span>
                  <span className="text-foreground flex-shrink-0">{formatCurrency(sub.unitPrice)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-2 space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total HT</span>
                  <span className="text-foreground">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">TVA (20%)</span>
                  <span className="text-foreground">{formatCurrency(order.tax)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
                  <span className="font-semibold text-foreground">Total TTC</span>
                  <span className="text-lg font-bold text-foreground">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Paiement */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-border">
            <h3 className="text-base font-semibold text-foreground mb-4">Paiement</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Mode</p>
                <p className="text-sm text-foreground">{order.payment.method}</p>
                <p className="text-xs text-muted-foreground">Carte ···· {order.payment.cardLast4}</p>
              </div>
              {order.payment.paymentDate && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Date de paiement</p>
                  <p className="text-sm text-foreground">{formatDateTime(order.payment.paymentDate)}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Statut</p>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${
                  order.payment.paymentStatus === 'Payé'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${order.payment.paymentStatus === 'Payé' ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
                  {order.payment.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal : changement de statut d'un abonnement */}
      {statusModal !== null && editingSubscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-foreground mb-1">Changer le statut</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Abonnement : <span className="font-medium text-foreground">{editingSubscription.productName}</span>
            </p>
            <div className="space-y-2 mb-6">
              {SUBSCRIPTION_STATUSES.map((status) => {
                const cfg = STATUS_CONFIG[status];
                return (
                  <label
                    key={status}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors ${
                      selectedStatus === status
                        ? `${cfg.bg} ${cfg.border} border-2`
                        : 'border-transparent hover:bg-muted/50 border'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="sr-only"
                    />
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <span className={`text-sm font-medium ${selectedStatus === status ? cfg.text : 'text-foreground'}`}>
                      {status}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setStatusModal(null)}
                className="px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors text-sm"
              >
                Annuler
              </button>
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
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
