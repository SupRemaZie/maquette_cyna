import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockOrders } from '../../data/adminMockData';
import { Search, Download, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const STATUS_CONFIG = {
  'En attente': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  'Active':     { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  'Suspendue':  { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Terminée':   { bg: 'bg-muted', text: 'text-muted-foreground', dot: 'bg-gray-400' },
  'Annulée':    { bg: 'bg-destructive/10', text: 'text-destructive', dot: 'bg-destructive' },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['En attente'];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {status}
    </span>
  );
};

const Orders = () => {
  const [orders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { success } = useToast();

  const handleExportCSV = () => {
    const headers = ['N° Commande', 'Date', 'Client', 'Email', 'N° Abonnement', 'Service', 'Catégorie', 'Type', 'Prix (€)', 'Statut abonnement', 'Montant total (€)', 'Paiement'];
    const rows = filteredOrders.flatMap(order =>
      order.subscriptions.map(sub => [
        order.orderNumber,
        new Date(order.date).toLocaleDateString('fr-FR'),
        `${order.customer.firstName} ${order.customer.lastName}`,
        order.customer.email,
        sub.subscriptionNumber,
        sub.productName,
        sub.category,
        sub.subscriptionType === 'monthly' ? 'Mensuel' : 'Annuel',
        sub.unitPrice.toFixed(2).replace('.', ','),
        sub.status,
        order.total.toFixed(2).replace('.', ','),
        order.payment.paymentStatus,
      ])
    );

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abonnements-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    success(`${filteredOrders.length} commande(s) exportée(s)`);
  };

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.subscriptions.some(s => s.productName.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus =
        statusFilter === 'all' ||
        order.subscriptions.some(s => s.status === statusFilter);
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'total_desc') return b.total - a.total;
      if (sortBy === 'total_asc')  return a.total - b.total;
      if (sortBy === 'date_asc')   return new Date(a.date) - new Date(b.date);
      return new Date(b.date) - new Date(a.date);
    });

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

  // Compteurs globaux
  const totalSubscriptions = orders.reduce((sum, o) => sum + o.subscriptions.length, 0);
  const activeSubscriptions = orders.reduce(
    (sum, o) => sum + o.subscriptions.filter(s => s.status === 'Active').length, 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Abonnements</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredOrders.length} commande(s) · {totalSubscriptions} abonnement(s) au total · {activeSubscriptions} actif(s)
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="N° commande, client, service..."
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={handleFilterChange(setStatusFilter)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          >
            <option value="all">Tous les statuts d'abonnement</option>
            <option value="En attente">En attente</option>
            <option value="Active">Active</option>
            <option value="Suspendue">Suspendue</option>
            <option value="Terminée">Terminée</option>
            <option value="Annulée">Annulée</option>
          </select>
          <select
            value={sortBy}
            onChange={handleFilterChange(setSortBy)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          >
            <option value="date_desc">Plus récentes</option>
            <option value="date_asc">Plus anciennes</option>
            <option value="total_desc">Montant décroissant</option>
            <option value="total_asc">Montant croissant</option>
          </select>
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            <Download className="h-4 w-4" />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* Mobile : cards */}
      <div className="md:hidden space-y-4">
        {paginatedOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <ShoppingCart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Aucune commande trouvée</p>
          </div>
        ) : paginatedOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
              <span className="font-semibold text-sm text-foreground">{order.orderNumber}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {new Date(order.date).toLocaleDateString('fr-FR')}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  order.payment.paymentStatus === 'Payé' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.payment.paymentStatus}
                </span>
              </div>
            </div>
            {/* Client */}
            <div className="px-4 py-2 border-b border-border/50">
              <p className="text-sm font-medium text-foreground">
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{order.customer.email}</p>
            </div>
            {/* Abonnements */}
            <div className="px-4 py-2 space-y-2">
              {order.subscriptions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <StatusBadge status={sub.status} />
                    <span className="text-sm text-foreground truncate">{sub.productName}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                    {formatCurrency(sub.unitPrice)}/{sub.subscriptionType === 'monthly' ? 'mois' : 'an'}
                  </span>
                </div>
              ))}
            </div>
            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
              <span className="font-bold text-foreground">{formatCurrency(order.total)}</span>
              <Link
                to={`/admin/orders/${order.id}`}
                className="text-sm font-medium text-primary hover:text-primary/80 px-3 py-1.5 border border-primary/30 rounded-lg"
              >
                Voir détails
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop : table */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">N° Commande</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Client</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Abonnements</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Montant TTC</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Paiement</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                  <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  Aucune commande trouvée
                </td>
              </tr>
            ) : paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4 text-sm font-medium text-foreground whitespace-nowrap">
                  {order.orderNumber}
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">
                  {new Date(order.date).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-foreground">
                    {order.customer.firstName} {order.customer.lastName}
                  </div>
                  <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                </td>
                {/* Colonne clé : chaque abonnement sur sa propre ligne avec son statut */}
                <td className="px-4 py-4">
                  <div className="space-y-1.5">
                    {order.subscriptions.map((sub) => (
                      <div key={sub.id} className="flex items-center gap-2">
                        <StatusBadge status={sub.status} />
                        <span className="text-sm text-foreground">{sub.productName}</span>
                        <span className="text-xs text-muted-foreground">
                          · {sub.subscriptionType === 'monthly' ? 'Mensuel' : 'Annuel'}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-foreground whitespace-nowrap">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.payment.paymentStatus === 'Payé'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.payment.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Voir détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-lg shadow-sm border border-border px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Afficher :</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              className="px-2 py-1.5 border border-input bg-background rounded text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <span className="text-sm text-muted-foreground">
            {Math.min((currentPage - 1) * pageSize + 1, filteredOrders.length)}–{Math.min(currentPage * pageSize, filteredOrders.length)} sur {filteredOrders.length}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center border border-input bg-background rounded text-sm disabled:opacity-40 hover:bg-accent transition-colors">«</button>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center border border-input bg-background rounded disabled:opacity-40 hover:bg-accent transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-muted-foreground px-2 min-w-[80px] text-center">
            {currentPage} / {totalPages || 1}
          </span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center border border-input bg-background rounded disabled:opacity-40 hover:bg-accent transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || totalPages === 0}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center border border-input bg-background rounded text-sm disabled:opacity-40 hover:bg-accent transition-colors">»</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
