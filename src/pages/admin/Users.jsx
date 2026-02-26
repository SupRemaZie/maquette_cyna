import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockUsers } from '../../data/adminMockData';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Switch } from '../../components/ui/switch';
import { useToast } from '../../context/ToastContext';

const Users = () => {
  const [users, setUsers] = useState(() =>
    mockUsers.map(u => ({ ...u, suspended: false }))
  );
  const { success } = useToast();

  const handleToggleSuspend = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    const next = !user.suspended;
    success(`Compte ${next ? 'suspendu' : 'réactivé'} : ${user.firstName} ${user.lastName}`);
    setUsers(prev => prev.map(u => {
      if (u.id !== userId) return u;
      if (next) {
        return { ...u, suspended: true, statusBeforeSuspension: u.status, status: 'Bloqué' };
      } else {
        const restored = u.statusBeforeSuspension ?? 'Actif';
        return { ...u, suspended: false, statusBeforeSuspension: undefined, status: restored };
      }
    }));
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('totalSpent');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'totalSpent') return b.totalSpent - a.totalSpent;
      if (sortBy === 'orderCount') return b.orderCount - a.orderCount;
      return 0;
    });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
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
          <h2 className="text-2xl font-bold text-foreground">Gestion des Utilisateurs</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredUsers.length} utilisateur(s) trouvé(s)
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom ou email..."
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={handleFilterChange(setStatusFilter)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="Actif">Actif</option>
            <option value="En attente">En attente</option>
            <option value="Suspendu">Suspendu</option>
          </select>
          <select
            value={sortBy}
            onChange={handleFilterChange(setSortBy)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          >
            <option value="totalSpent">Trier : Plus gros clients</option>
            <option value="orderCount">Trier : Plus de commandes</option>
          </select>
        </div>
      </div>
      
      {/* Mobile : cards */}
      <div className="md:hidden space-y-4">
        {paginatedUsers.map((user, index) => (
          <div key={user.id} className="bg-white rounded-xl shadow-sm border border-border p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {index < 3 && (
                      <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        index === 0 ? 'bg-yellow-400 text-yellow-900' :
                        index === 1 ? 'bg-gray-300 text-gray-700' :
                        'bg-orange-300 text-orange-900'
                      }`}>
                        {index + 1}
                      </span>
                    )}
                    <span className="font-semibold text-base text-foreground truncate">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">{user.email}</div>
                </div>
                <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                  user.status === 'Actif' ? 'bg-accent/20 text-accent' :
                  user.status === 'Suspendu' ? 'bg-destructive/20 text-destructive' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {user.status}
                </span>
              </div>
              <div className="flex items-center justify-between bg-muted/50 rounded-xl px-4 py-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total dépensé</p>
                  <p className="text-lg font-bold text-foreground">{formatCurrency(user.totalSpent)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Commandes</p>
                  <p className="text-lg font-bold text-foreground">{user.orderCount}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-border">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={user.suspended}
                    onCheckedChange={() => handleToggleSuspend(user.id)}
                    disabled={user.status === 'En attente'}
                  />
                  <span className={`text-xs ${user.status === 'En attente' ? 'text-muted-foreground/40' : 'text-muted-foreground'}`}>
                    Suspendre
                  </span>
                </div>
                <Link
                  to={`/admin/users/${user.id}`}
                  className="text-sm font-medium text-primary hover:text-primary/80 py-2.5 px-4 border border-primary/30 rounded-lg min-h-[44px] flex items-center justify-center"
                >
                  Voir profil
                </Link>
              </div>
          </div>
        ))}
      </div>

      {/* Desktop : table */}
      <div className="hidden md:block bg-white rounded-lg shadow-md border border-border overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date d'inscription</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Commandes</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Total dépensé</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Suspendu</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm text-foreground">{user.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {new Date(user.registrationDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'Actif' ? 'bg-accent/20 text-accent' :
                      user.status === 'Bloqué' ? 'bg-destructive/20 text-destructive' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{user.orderCount}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">
                    {formatCurrency(user.totalSpent)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={user.suspended}
                        onCheckedChange={() => handleToggleSuspend(user.id)}
                        disabled={user.status === 'En attente'}
                      />
                      <span className={`text-xs font-medium ${
                        user.status === 'Bloqué' && !user.suspended
                          ? 'text-muted-foreground/40'
                          : user.suspended ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {user.status === 'En attente' ? '—' : user.suspended ? 'Oui' : 'Non'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="text-primary hover:text-primary-600 text-sm"
                    >
                      Voir profil
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
            {Math.min((currentPage - 1) * pageSize + 1, filteredUsers.length)}–{Math.min(currentPage * pageSize, filteredUsers.length)} sur {filteredUsers.length}
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

export default Users;

