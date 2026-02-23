import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockMessages } from '../../data/adminMockData';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const Messages = () => {
  const [messages] = useState(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMessages.length / pageSize);
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Messages de Contact</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredMessages.length} message(s) trouvé(s)
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par email ou sujet..."
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={handleFilterChange(setStatusFilter)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="Non lu">Non lu</option>
            <option value="Lu">Lu</option>
            <option value="Répondu">Répondu</option>
            <option value="Archivé">Archivé</option>
          </select>
        </div>
      </div>
      
      {/* Mobile : cards */}
      <div className="md:hidden space-y-3">
        {paginatedMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow-sm border border-border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-foreground">{message.subject}</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  message.status === 'Non lu' ? 'bg-yellow-100 text-yellow-800' :
                  message.status === 'Répondu' ? 'bg-accent/20 text-accent' :
                  message.status === 'Archivé' ? 'bg-muted text-muted-foreground' :
                  'bg-primary/20 text-primary'
                }`}>
                  {message.status}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">{message.email}</div>
              <Link
                to={`/admin/messages/${message.id}`}
                className="block text-center text-sm text-primary hover:text-primary/80 py-1.5 border border-primary/30 rounded-md"
              >
                Voir message
              </Link>
          </div>
        ))}
      </div>

      {/* Desktop : table */}
      <div className="hidden md:block bg-white rounded-lg shadow-md border border-border overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Sujet</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Aperçu</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMessages.map((message) => (
                <tr key={message.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm text-foreground">
                    {new Date(message.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{message.email}</td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{message.subject}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {message.message.substring(0, 50)}...
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      message.status === 'Non lu' ? 'bg-yellow-100 text-yellow-800' :
                      message.status === 'Répondu' ? 'bg-accent/20 text-accent' :
                      message.status === 'Archivé' ? 'bg-muted text-muted-foreground' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/messages/${message.id}`}
                      className="text-primary hover:text-primary-600 text-sm"
                    >
                      Voir message
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
            {Math.min((currentPage - 1) * pageSize + 1, filteredMessages.length)}–{Math.min(currentPage * pageSize, filteredMessages.length)} sur {filteredMessages.length}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-input bg-background rounded text-sm disabled:opacity-40 hover:bg-accent transition-colors"
            aria-label="Première page">«</button>
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-input bg-background rounded disabled:opacity-40 hover:bg-accent transition-colors"
            aria-label="Page précédente"><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-sm text-muted-foreground px-2 min-w-[80px] text-center">
            {currentPage} / {totalPages || 1}
          </span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-input bg-background rounded disabled:opacity-40 hover:bg-accent transition-colors"
            aria-label="Page suivante"><ChevronRight className="h-4 w-4" /></button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || totalPages === 0}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-input bg-background rounded text-sm disabled:opacity-40 hover:bg-accent transition-colors"
            aria-label="Dernière page">»</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;

