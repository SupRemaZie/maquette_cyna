import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockOrders } from '../../data/adminMockData';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Orders = () => {
  const [orders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { info } = useToast();

  const handleExportCSV = () => {
    info('Export CSV démarré');
  };

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'total_desc')  return b.total - a.total;
      if (sortBy === 'total_asc')   return a.total - b.total;
      if (sortBy === 'date_asc')    return new Date(a.date) - new Date(b.date);
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
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Commandes</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredOrders.length} commande(s) trouvée(s)
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="N°, email ou nom client..."
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={handleFilterChange(setStatusFilter)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Confirmée">Confirmée</option>
            <option value="Active">Active</option>
            <option value="Terminée">Terminée</option>
            <option value="Annulée">Annulée</option>
          </select>
          <select
            value={sortBy}
            onChange={handleFilterChange(setSortBy)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          >
            <option value="date_desc">Trier : Plus récentes</option>
            <option value="date_asc">Trier : Plus anciennes</option>
            <option value="total_desc">Trier : Montant décroissant</option>
            <option value="total_asc">Trier : Montant croissant</option>
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
      
      <div className="md:hidden space-y-3">
        {/* Mobile : cards */}
        {paginatedOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-foreground">{order.orderNumber}</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  order.status === 'Active' ? 'bg-accent/20 text-accent' :
                  order.status === 'Confirmée' ? 'bg-primary/20 text-primary' :
                  order.status === 'Terminée' ? 'bg-muted text-muted-foreground' :
                  order.status === 'Annulée' ? 'bg-destructive/20 text-destructive' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-foreground">
                {order.customer.firstName} {order.customer.lastName}
                <span className="text-muted-foreground text-xs block">{order.customer.email}</span>
              </div>
              <div className="text-xs text-muted-foreground line-clamp-1">
                {order.items.map(item => item.productName).join(', ')}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString('fr-FR')}</span>
                <span className="font-semibold text-sm text-foreground">{formatCurrency(order.total)}</span>
              </div>
              <Link
                to={`/admin/orders/${order.id}`}
                className="block text-center text-sm text-primary hover:text-primary/80 py-1.5 border border-primary/30 rounded-md"
              >
                Voir détails
              </Link>
          </div>
        ))}
      </div>

      {/* Desktop : table */}
      <div className="hidden md:block bg-white rounded-lg shadow-md border border-border overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">N° Commande</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Client</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Services</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Montant</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{order.orderNumber}</td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {new Date(order.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    <div>{order.customer.firstName} {order.customer.lastName}</div>
                    <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {order.items.map(item => item.productName).join(', ')}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Active' ? 'bg-accent/20 text-accent' :
                      order.status === 'Confirmée' ? 'bg-primary/20 text-primary' :
                      order.status === 'Terminée' ? 'bg-muted text-muted-foreground' :
                      order.status === 'Annulée' ? 'bg-destructive/20 text-destructive' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="text-primary hover:text-primary-600 text-sm"
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
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-input bg-background rounded text-sm disabled:opacity-40 hover:bg-accent transition-colors"
            aria-label="Première page"
          >«</button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-input bg-background rounded disabled:opacity-40 hover:bg-accent transition-colors"
            aria-label="Page précédente"
          ><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-sm text-muted-foreground px-2 min-w-[80px] text-center">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-input bg-background rounded disabled:opacity-40 hover:bg-accent transition-colors"
            aria-label="Page suivante"
          ><ChevronRight className="h-4 w-4" /></button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-input bg-background rounded text-sm disabled:opacity-40 hover:bg-accent transition-colors"
            aria-label="Dernière page"
          >»</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;

