import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockChatbotConversations } from '../../data/adminMockData';
import { ArrowLeft, User, Bot, Send, UserCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAdmin } from '../../context/AdminContext';

const ChatbotDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState(mockChatbotConversations);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { success } = useToast();
  const { admin } = useAdmin();
  
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
  
  const handleSendReply = async (e) => {
    e.preventDefault();
    
    if (!replyText.trim()) return;
    
    setIsSending(true);
    
    // Simuler l'envoi de la réponse
    setTimeout(() => {
      const newMessage = {
        id: conversation.messages.length + 1,
        type: 'admin',
        content: replyText,
        timestamp: new Date().toISOString(),
        adminName: admin?.name || 'Admin',
      };
      
      // Mettre à jour la conversation
      setConversations(prev => prev.map(conv => 
        conv.id === parseInt(id)
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      ));
      
      setReplyText('');
      setIsSending(false);
      success('Réponse envoyée avec succès !');
    }, 500);
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
                msg.type === 'user' ? 'justify-end' : 
                msg.type === 'admin' ? 'justify-start' : 'justify-start'
              }`}
            >
              {(msg.type === 'bot' || msg.type === 'admin') && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === 'admin' ? 'bg-accent' : 'bg-primary'
                }`}>
                  {msg.type === 'admin' ? (
                    <UserCheck className="h-4 w-4 text-accent-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
              )}
              <div
                className={`max-w-2xl rounded-lg p-4 ${
                  msg.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : msg.type === 'admin'
                    ? 'bg-accent/20 text-foreground border border-accent'
                    : 'bg-muted text-foreground'
                }`}
              >
                {msg.type === 'admin' && (
                  <p className="text-xs font-semibold text-accent mb-1">
                    {msg.adminName || 'Admin'}
                  </p>
                )}
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
        
        {/* Formulaire de réponse */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center gap-2 mb-3">
            <h4 className="text-sm font-semibold text-foreground">Répondre à l'utilisateur</h4>
            {conversation.escalated && (
              <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-accent/20 text-accent">
                Escaladé
              </span>
            )}
          </div>
          <form onSubmit={handleSendReply} className="space-y-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Tapez votre réponse à l'utilisateur..."
              rows={4}
              className="w-full px-4 py-3 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
              disabled={isSending}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Cette réponse sera visible par l'utilisateur dans le chatbot
              </p>
              <button
                type="submit"
                disabled={!replyText.trim() || isSending}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                {isSending ? 'Envoi...' : 'Envoyer la réponse'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotDetail;

