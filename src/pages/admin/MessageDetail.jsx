import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockMessages } from '../../data/adminMockData';
import { ArrowLeft, Mail, Archive, Check } from 'lucide-react';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

const MessageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages] = useState(mockMessages);
  const [message, setMessage] = useState(messages.find(m => m.id === parseInt(id)));
  
  if (!message) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Message non trouvé</p>
        <Link to="/admin/messages" className="text-primary hover:text-primary-600 mt-4 inline-block">
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
  
  const { success, info } = useToast();
  
  const handleMarkAsRead = () => {
    setMessage(prev => ({ ...prev, status: 'Lu' }));
    success('Message marqué comme lu');
  };
  
  const handleMarkAsReplied = () => {
    setMessage(prev => ({ ...prev, status: 'Répondu' }));
    success('Message marqué comme répondu');
  };
  
  const handleArchive = () => {
    setMessage(prev => ({ ...prev, status: 'Archivé' }));
    info('Message archivé');
  };
  
  const handleReply = () => {
    window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`;
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/messages"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{message.subject}</h2>
            <p className="text-sm text-muted-foreground">
              Reçu le {formatDate(message.date)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {message.status === 'Non lu' && (
            <button
              onClick={handleMarkAsRead}
              className="flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
            >
              <Check className="h-4 w-4" />
              Marquer comme lu
            </button>
          )}
          {message.status !== 'Répondu' && (
            <button
              onClick={handleMarkAsReplied}
              className="flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
            >
              <Check className="h-4 w-4" />
              Marquer comme répondu
            </button>
          )}
          <button
            onClick={handleReply}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Répondre
          </button>
          {message.status !== 'Archivé' && (
            <button
              onClick={handleArchive}
              className="flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
            >
              <Archive className="h-4 w-4" />
              Archiver
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <div className="mb-4">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                message.status === 'Non lu' ? 'bg-yellow-100 text-yellow-800' :
                message.status === 'Répondu' ? 'bg-accent/20 text-accent' :
                message.status === 'Archivé' ? 'bg-muted text-muted-foreground' :
                'bg-primary/20 text-primary'
              }`}>
                {message.status}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">De</label>
                <p className="text-foreground">{message.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Sujet</label>
                <p className="text-foreground">{message.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <div className="mt-2 p-4 bg-muted rounded-lg whitespace-pre-line text-foreground">
                  {message.message}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Informations */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informations</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date de réception</label>
                <p className="text-foreground">{formatDate(message.date)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email expéditeur</label>
                <p className="text-foreground break-all">{message.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Statut</label>
                <div className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    message.status === 'Non lu' ? 'bg-yellow-100 text-yellow-800' :
                    message.status === 'Répondu' ? 'bg-accent/20 text-accent' :
                    message.status === 'Archivé' ? 'bg-muted text-muted-foreground' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {message.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;

