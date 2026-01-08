import React, { useState } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotMessages, setChatbotMessages] = useState([]);
  const [chatbotInput, setChatbotInput] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
    setFormData({ email: '', subject: '', message: '' });
  };
  
  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const chatbotResponses = {
    'bonjour': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
    'salut': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
    'prix': 'Nos prix varient selon les solutions. Nos produits EDR commencent à 79€/mois, XDR à 179€/mois, et SOC à 299€/mois. Souhaitez-vous plus de détails sur une solution spécifique ?',
    'tarif': 'Nos prix varient selon les solutions. Nos produits EDR commencent à 79€/mois, XDR à 179€/mois, et SOC à 299€/mois. Souhaitez-vous plus de détails sur une solution spécifique ?',
    'edr': 'CYNA EDR est notre solution de détection et réponse pour terminaux. Elle offre une protection avancée avec analyse comportementale en temps réel. Voulez-vous en savoir plus ?',
    'xdr': 'CYNA XDR étend la protection au-delà des terminaux pour couvrir endpoints, réseau, cloud et email. C\'est notre solution la plus complète. Souhaitez-vous une démonstration ?',
    'soc': 'CYNA SOC Managed est notre centre d\'opérations de sécurité managé 24/7. Nos experts certifiés surveillent votre infrastructure en continu. Intéressé par une consultation ?',
    'aide': 'Je peux vous aider avec des questions sur nos produits, nos prix, ou nos services. Que souhaitez-vous savoir ?',
    'help': 'Je peux vous aider avec des questions sur nos produits, nos prix, ou nos services. Que souhaitez-vous savoir ?',
    'contact': 'Vous pouvez nous contacter par email à contact@cyna.fr ou par téléphone au +33 1 23 45 67 89. Nos horaires sont du lundi au vendredi, 9h-18h.',
    'default': 'Merci pour votre message. Pour des questions plus spécifiques, n\'hésitez pas à nous contacter par email à contact@cyna.fr ou remplir le formulaire de contact.',
  };
  
  const handleChatbotSend = () => {
    if (!chatbotInput.trim()) return;
    
    const userMessage = chatbotInput.toLowerCase();
    let response = chatbotResponses.default;
    
    for (const [key, value] of Object.entries(chatbotResponses)) {
      if (userMessage.includes(key)) {
        response = value;
        break;
      }
    }
    
    setChatbotMessages(prev => [
      ...prev,
      { type: 'user', text: chatbotInput },
      { type: 'bot', text: response },
    ]);
    setChatbotInput('');
  };
  
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 md:mb-8">Contact</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mb-4"
              />
              <Input
                label="Sujet"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="mb-4"
              />
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <Button type="submit" variant="primary" fullWidth>
                Envoyer le message
              </Button>
            </form>
          </div>
          
          {/* Informations de contact */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:contact@cyna.fr" className="text-primary-600 hover:text-primary-700">
                    contact@cyna.fr
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                  <a href="tel:+33123456789" className="text-primary-600 hover:text-primary-700">
                    +33 1 23 45 67 89
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                  <p className="text-gray-600">
                    123 Rue de la Sécurité<br />
                    75001 Paris, France
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Horaires</h3>
                  <p className="text-gray-600">
                    Lundi - Vendredi: 9h - 18h<br />
                    Samedi - Dimanche: Fermé
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              variant="accent"
              fullWidth
              size="lg"
              onClick={() => setIsChatbotOpen(true)}
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
      
      {/* Chatbot Modal */}
      <Modal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        title="Chatbot CYNA"
        size="md"
      >
        <div className="h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {chatbotMessages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p>Bonjour ! Je suis le chatbot CYNA. Comment puis-je vous aider ?</p>
                <p className="text-sm mt-2">Essayez de taper "bonjour", "prix", "edr", etc.</p>
              </div>
            )}
            {chatbotMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={chatbotInput}
              onChange={(e) => setChatbotInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatbotSend()}
              placeholder="Tapez votre message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Button onClick={handleChatbotSend} variant="primary">
              Envoyer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
