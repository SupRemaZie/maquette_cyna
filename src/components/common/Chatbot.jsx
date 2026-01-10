import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Chatbot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Bonjour ! Je suis l\'assistant virtuel CYNA. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { isAuthenticated, user } = useCart();
  
  // Ne pas afficher le chatbot sur les pages d'authentification et dans le back-office
  const hiddenRoutes = ['/login', '/register', '/forgot-password'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldHide = hiddenRoutes.includes(location.pathname) || isAdminRoute;
  
  if (shouldHide) {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Réponses automatiques du bot
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    
    // Salutations
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return 'Bonjour ! Je suis là pour vous aider. Avez-vous des questions sur nos services de sécurité SaaS ?';
    }
    
    // Questions sur EDR
    if (message.includes('edr') || message.includes('endpoint')) {
      return 'L\'EDR (Endpoint Detection and Response) est une solution de sécurité qui protège vos endpoints en temps réel. Nos solutions EDR offrent une détection avancée des menaces, une analyse comportementale et une réponse automatisée. Souhaitez-vous plus d\'informations sur nos produits EDR ?';
    }
    
    // Questions sur XDR
    if (message.includes('xdr')) {
      return 'L\'XDR (Extended Detection and Response) étend la protection à tous vos environnements : endpoints, réseau, cloud et email. C\'est une approche unifiée de la sécurité. Voulez-vous découvrir nos solutions XDR ?';
    }
    
    // Questions sur SOC
    if (message.includes('soc')) {
      return 'Notre SOC (Security Operations Center) managé offre une surveillance 24/7 de votre infrastructure par une équipe d\'experts certifiés. Nous détectons et répondons aux incidents de sécurité pour vous. Souhaitez-vous un devis pour notre service SOC ?';
    }
    
    // Questions sur les prix
    if (message.includes('prix') || message.includes('tarif') || message.includes('coût') || message.includes('combien')) {
      return 'Nos prix varient selon le service choisi. Par exemple, notre EDR Enterprise est à partir de 149€/mois. Pour obtenir un devis personnalisé, je peux vous mettre en contact avec un conseiller. Souhaitez-vous que je fasse cette demande ?';
    }
    
    // Questions sur le support
    if (message.includes('support') || message.includes('aide') || message.includes('problème')) {
      return 'Notre équipe de support est disponible 24/7. Vous pouvez nous contacter par email à contact@cyna-it.fr ou par téléphone au +33 1 23 45 67 89. Je peux également vous mettre en contact avec un conseiller si vous le souhaitez.';
    }
    
    // Demande de contact humain
    if (message.includes('conseiller') || message.includes('humain') || message.includes('parler') || message.includes('appeler')) {
      return 'Bien sûr ! Je vais demander à un conseiller de vous contacter. Un membre de notre équipe vous répondra dans les plus brefs délais. En attendant, avez-vous d\'autres questions ?';
    }
    
    // Questions générales
    if (message.includes('service') || message.includes('produit') || message.includes('solution')) {
      return 'Nous proposons une gamme complète de services de sécurité SaaS : EDR, XDR, SOC managé, Threat Intelligence et SIEM. Chaque solution est adaptée à différents besoins. Quel type de protection recherchez-vous ?';
    }
    
    // Réponse par défaut
    return 'Merci pour votre message. Je peux vous aider avec des questions sur nos services EDR, XDR, SOC, nos tarifs, ou vous mettre en contact avec un conseiller. Que souhaitez-vous savoir ?';
  };

  const handleSend = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler le délai de réponse du bot
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: getBotResponse(inputValue),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Si l'utilisateur demande un conseiller, marquer comme escaladé
      if (inputValue.toLowerCase().includes('conseiller') || 
          inputValue.toLowerCase().includes('humain') ||
          inputValue.toLowerCase().includes('parler')) {
        // Sauvegarder la conversation escaladée (simulation)
        const conversation = {
          id: Date.now(),
          date: new Date().toISOString(),
          user: isAuthenticated ? {
            id: user?.id,
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.email,
          } : null,
          messages: [...messages, userMessage, botResponse],
          escalated: true,
        };
        // En production, on enverrait cela au backend
        console.log('Conversation escaladée:', conversation);
      }
    }, 1000 + Math.random() * 1000); // Délai entre 1 et 2 secondes
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center z-50"
        aria-label="Ouvrir le chat"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl border border-border z-50 flex flex-col transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <div>
            <h3 className="font-semibold">Assistant CYNA</h3>
            <p className="text-xs opacity-90">En ligne</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
            aria-label={isMinimized ? 'Agrandir' : 'Réduire'}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white text-foreground border border-border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === 'user'
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-white border border-border rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                autoFocus
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Envoyer"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Besoin d'un conseiller ? Tapez "conseiller" ou "parler à un humain"
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbot;

