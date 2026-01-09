import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockChatbotConversations } from '../../data/adminMockData';
import { ArrowLeft, User, Bot } from 'lucide-react';

const ChatbotDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conversations] = useState(mockChatbotConversations);
  
  const conversation = conversations.find(c => c.id === parseInt(id));
  
  if (!conversation) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Conversation non trouvée</p>
        <Link to="/admin/chatbot" className="text-primary hover:text-primary-600 mt-4 inline-block">
          Retour à la liste
        </Link>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/chatbot"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Conversation</h2>
            <p className="text-sm text-muted-foreground">
              {conversation.user ? `${conversation.user.name}` : 'Anonyme'} - {formatDate(conversation.date)}
            </p>
          </div>
        </div>
        {conversation.escalated && (
          <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-destructive/20 text-destructive">
            Escaladé vers humain
          </span>
        )}
      </div>
      
      {/* Informations */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Utilisateur</label>
            <p className="text-foreground">
              {conversation.user ? (
                <>
                  {conversation.user.name}<br />
                  <span className="text-sm text-muted-foreground">{conversation.user.email}</span>
                </>
              ) : (
                'Anonyme'
              )}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Date</label>
            <p className="text-foreground">{formatDate(conversation.date)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Nombre de messages</label>
            <p className="text-foreground">{conversation.messageCount}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Escaladé</label>
            <p className="text-foreground">
              {conversation.escalated ? 'Oui' : 'Non'}
            </p>
          </div>
        </div>
        
        {conversation.internalNote && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <label className="text-sm font-medium text-foreground">Note interne</label>
            <p className="text-sm text-foreground mt-1">{conversation.internalNote}</p>
          </div>
        )}
      </div>
      
      {/* Messages */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Messages</h3>
        <div className="space-y-4">
          {conversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${
                msg.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.type === 'bot' && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-2xl rounded-lg p-4 ${
                  msg.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-2 ${
                  msg.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
              {msg.type === 'user' && (
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatbotDetail;

