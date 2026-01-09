import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockMessages } from '../../data/adminMockData';
import { Search } from 'lucide-react';

const Messages = () => {
  const [messages] = useState(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
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
            onChange={(e) => setStatusFilter(e.target.value)}
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
      
      <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
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
              {filteredMessages.map((message) => (
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
      </div>
    </div>
  );
};

export default Messages;

