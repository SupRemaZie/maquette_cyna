import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockChatbotConversations } from '../../data/adminMockData';
import { Search, MessageSquare } from 'lucide-react';

const Chatbot = () => {
  const [conversations] = useState(mockChatbotConversations);
  const [searchQuery, setSearchQuery] = useState('');
  const [escalatedFilter, setEscalatedFilter] = useState('all');
  
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = (conv.user?.name || 'Anonyme').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.firstMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEscalated = escalatedFilter === 'all' ||
                            (escalatedFilter === 'yes' && conv.escalated) ||
                            (escalatedFilter === 'no' && !conv.escalated);
    return matchesSearch && matchesEscalated;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Conversations Chatbot</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredConversations.length} conversation(s) trouvée(s)
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
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          <select
            value={escalatedFilter}
            onChange={(e) => setEscalatedFilter(e.target.value)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          >
            <option value="all">Toutes les conversations</option>
            <option value="yes">Escaladées</option>
            <option value="no">Non escaladées</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Utilisateur</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Premier message</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Messages</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Escaladé</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredConversations.map((conv) => (
                <tr key={conv.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm text-foreground">
                    {new Date(conv.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {conv.user ? `${conv.user.name} (${conv.user.email})` : 'Anonyme'}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {conv.firstMessage.substring(0, 60)}...
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{conv.messageCount}</td>
                  <td className="px-4 py-3">
                    {conv.escalated ? (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-destructive/20 text-destructive">
                        Oui
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                        Non
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/chatbot/${conv.id}`}
                      className="text-primary hover:text-primary-600 text-sm flex items-center gap-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Voir conversation
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

export default Chatbot;

