// Données mockées pour le back-office

// Produits
export const mockProducts = [
  {
    id: 1,
    name: 'CYNA EDR Enterprise',
    category: 'EDR',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
    shortDescription: 'Solution EDR complète pour entreprises',
    fullDescription: 'CYNA EDR Enterprise offre une protection avancée contre les menaces avec détection en temps réel, analyse comportementale et réponse automatisée.',
    features: [
      'Détection en temps réel',
      'Analyse comportementale',
      'Réponse automatisée',
      'Tableau de bord centralisé',
      'Support 24/7'
    ],
    priceMonthly: 149,
    priceYearly: 1490,
    available: true,
    priority: 100,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: 2,
    name: 'CYNA XDR Pro',
    category: 'XDR',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    shortDescription: 'Plateforme XDR nouvelle génération',
    fullDescription: 'CYNA XDR Pro intègre la détection et la réponse étendues sur tous vos environnements : endpoints, réseau, cloud et email.',
    features: [
      'Intégration multi-environnement',
      'Corrélation avancée',
      'Threat hunting',
      'API complète',
      'Formation incluse'
    ],
    priceMonthly: 249,
    priceYearly: 2490,
    available: true,
    priority: 90,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T16:00:00Z',
  },
  {
    id: 3,
    name: 'CYNA SOC Managed',
    category: 'SOC',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
    shortDescription: 'SOC managé 24/7',
    fullDescription: 'Notre équipe d\'experts surveille votre infrastructure 24/7 et répond aux incidents de sécurité.',
    features: [
      'Surveillance 24/7',
      'Équipe d\'experts certifiés',
      'Réponse aux incidents',
      'Rapports mensuels',
      'Conformité RGPD'
    ],
    priceMonthly: 1999,
    priceYearly: 19990,
    available: true,
    priority: 80,
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
  },
  {
    id: 4,
    name: 'CYNA Threat Intelligence',
    category: 'Threat Intelligence',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    shortDescription: 'Intelligence sur les menaces en temps réel',
    fullDescription: 'Accédez à une base de données complète de menaces avec feeds en temps réel et analyses contextuelles.',
    features: [
      'Feeds en temps réel',
      'Analyse contextuelle',
      'Indicateurs de compromission',
      'Intégration API',
      'Alertes personnalisées'
    ],
    priceMonthly: 99,
    priceYearly: 990,
    available: true,
    priority: 70,
    createdAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-19T15:00:00Z',
  },
  {
    id: 5,
    name: 'CYNA SIEM Advanced',
    category: 'SIEM',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
    shortDescription: 'SIEM nouvelle génération',
    fullDescription: 'Plateforme SIEM complète avec corrélation d\'événements, machine learning et automatisation.',
    features: [
      'Collecte centralisée',
      'Corrélation intelligente',
      'Machine learning',
      'Automatisation',
      'Conformité intégrée'
    ],
    priceMonthly: 299,
    priceYearly: 2990,
    available: true,
    priority: 85,
    createdAt: '2024-01-08T09:30:00Z',
    updatedAt: '2024-01-21T13:00:00Z',
  },
  {
    id: 6,
    name: 'CYNA EDR Starter',
    category: 'EDR',
    images: ['/api/placeholder/400/300'],
    shortDescription: 'EDR pour petites entreprises',
    fullDescription: 'Solution EDR abordable pour les petites et moyennes entreprises avec fonctionnalités essentielles.',
    features: [
      'Protection endpoints',
      'Détection basique',
      'Tableau de bord simple',
      'Support email',
      'Mise à jour automatique'
    ],
    priceMonthly: 49,
    priceYearly: 490,
    available: true,
    priority: 60,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 7,
    name: 'CYNA XDR Basic',
    category: 'XDR',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    shortDescription: 'XDR pour débuter',
    fullDescription: 'Version allégée de notre plateforme XDR pour les entreprises qui débutent en sécurité.',
    features: [
      'Détection multi-environnement',
      'Tableau de bord',
      'Alertes basiques',
      'Documentation',
      'Support communautaire'
    ],
    priceMonthly: 129,
    priceYearly: 1290,
    available: true,
    priority: 50,
    createdAt: '2024-01-18T14:00:00Z',
    updatedAt: '2024-01-18T14:00:00Z',
  },
  {
    id: 8,
    name: 'CYNA SOC Lite',
    category: 'SOC',
    images: ['/api/placeholder/400/300'],
    shortDescription: 'SOC managé allégé',
    fullDescription: 'Service SOC managé pour les entreprises avec besoins modérés en surveillance.',
    features: [
      'Surveillance 8h/5j',
      'Détection d\'incidents',
      'Rapports hebdomadaires',
      'Support prioritaire',
      'Conformité basique'
    ],
    priceMonthly: 999,
    priceYearly: 9990,
    available: true,
    priority: 65,
    createdAt: '2024-01-14T12:00:00Z',
    updatedAt: '2024-01-14T12:00:00Z',
  },
];

// Catégories
export const mockCategories = [
  {
    id: 1,
    name: 'EDR',
    description: 'Endpoint Detection and Response - Protection avancée des endpoints',
    image: '/api/placeholder/200/150',
    productCount: 2,
    displayOrder: 1,
  },
  {
    id: 2,
    name: 'XDR',
    description: 'Extended Detection and Response - Détection étendue multi-environnement',
    image: '/api/placeholder/200/150',
    productCount: 2,
    displayOrder: 2,
  },
  {
    id: 3,
    name: 'SOC',
    description: 'Security Operations Center - Surveillance et gestion des incidents',
    image: '/api/placeholder/200/150',
    productCount: 2,
    displayOrder: 3,
  },
  {
    id: 4,
    name: 'Threat Intelligence',
    description: 'Intelligence sur les menaces cybernétiques',
    image: '/api/placeholder/200/150',
    productCount: 1,
    displayOrder: 4,
  },
  {
    id: 5,
    name: 'SIEM',
    description: 'Security Information and Event Management',
    image: '/api/placeholder/200/150',
    productCount: 1,
    displayOrder: 5,
  },
];

// Commandes
const generateOrders = () => {
  const orders = [];
  const statuses = ['En attente', 'Confirmée', 'Active', 'Terminée', 'Annulée'];
  const products = mockProducts;
  
  for (let i = 1; i <= 50; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const subscriptionType = Math.random() > 0.5 ? 'monthly' : 'yearly';
    const price = subscriptionType === 'monthly' ? product.priceMonthly : product.priceYearly;
    const total = price * 1.20; // TVA 20%
    
    orders.push({
      id: i,
      orderNumber: `CMD-${String(i).padStart(6, '0')}`,
      date: date.toISOString(),
      customer: {
        id: Math.floor(Math.random() * 20) + 1,
        firstName: ['Jean', 'Marie', 'Pierre', 'Sophie', 'Luc', 'Emma', 'Thomas', 'Julie'][Math.floor(Math.random() * 8)],
        lastName: ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Moreau', 'Laurent', 'Simon', 'Michel'][Math.floor(Math.random() * 8)],
        email: `client${i}@example.com`,
        phone: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 100000000).toString().padStart(9, '0')}`,
        address: {
          street: `${Math.floor(Math.random() * 200) + 1} Rue de la Sécurité`,
          city: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'][Math.floor(Math.random() * 5)],
          postalCode: String(Math.floor(Math.random() * 90000) + 10000),
          country: 'France',
        },
      },
      items: [{
        productId: product.id,
        productName: product.name,
        category: product.category,
        subscriptionType,
        quantity: 1,
        unitPrice: price,
        subtotal: price,
      }],
      subtotal: price,
      tax: price * 0.20,
      total,
      status,
      statusHistory: [
        { status: 'En attente', date: date.toISOString(), user: 'Système' },
        ...(status !== 'En attente' ? [{ status, date: new Date(date.getTime() + 3600000).toISOString(), user: 'Admin' }] : []),
      ],
      payment: {
        method: 'Carte bancaire',
        cardLast4: String(Math.floor(Math.random() * 9000) + 1000),
        paymentDate: status !== 'En attente' ? new Date(date.getTime() + 3600000).toISOString() : null,
        paymentStatus: status === 'En attente' ? 'En attente' : 'Payé',
      },
    });
  }
  
  return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const mockOrders = generateOrders();

// Utilisateurs
const generateUsers = () => {
  const users = [];
  const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Luc', 'Emma', 'Thomas', 'Julie', 'Antoine', 'Camille', 'Nicolas', 'Laura', 'David', 'Sarah', 'Julien', 'Claire', 'Maxime', 'Elise', 'Alexandre', 'Marine'];
  const lastNames = ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Moreau', 'Laurent', 'Simon', 'Michel', 'Garcia', 'Petit', 'Robert', 'Richard', 'Durand', 'Leroy', 'Moreau', 'Fournier', 'Girard', 'Bonnet', 'Roux', 'Vincent'];
  
  for (let i = 1; i <= 30; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const registrationDate = new Date();
    registrationDate.setDate(registrationDate.getDate() - Math.floor(Math.random() * 365));
    const statuses = ['Actif', 'Inactif', 'Email non confirmé', 'Bloqué'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const userOrders = mockOrders.filter(o => o.customer.id === i);
    const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
    
    users.push({
      id: i,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 100000000).toString().padStart(9, '0')}`,
      registrationDate: registrationDate.toISOString(),
      status,
      orderCount: userOrders.length,
      totalSpent,
      addresses: [{
        id: 1,
        street: `${Math.floor(Math.random() * 200) + 1} Rue de la Sécurité`,
        city: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'][Math.floor(Math.random() * 5)],
        postalCode: String(Math.floor(Math.random() * 90000) + 10000),
        country: 'France',
        isDefault: true,
      }],
      subscriptions: userOrders.filter(o => o.status === 'Active').map(o => ({
        id: o.id,
        productName: o.items[0].productName,
        startDate: o.date,
        nextBilling: new Date(new Date(o.date).setMonth(new Date(o.date).getMonth() + (o.items[0].subscriptionType === 'monthly' ? 1 : 12))).toISOString(),
        price: o.items[0].unitPrice,
        type: o.items[0].subscriptionType,
      })),
    });
  }
  
  return users;
};

export const mockUsers = generateUsers();

// Messages de contact
const generateMessages = () => {
  const messages = [];
  const subjects = [
    'Demande d\'information sur CYNA EDR',
    'Problème avec mon abonnement',
    'Question sur la facturation',
    'Demande de devis entreprise',
    'Support technique urgent',
    'Question sur la conformité RGPD',
    'Demande de formation',
    'Problème de connexion',
  ];
  const statuses = ['Non lu', 'Lu', 'Répondu', 'Archivé'];
  
  for (let i = 1; i <= 25; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    
    messages.push({
      id: i,
      date: date.toISOString(),
      email: `contact${i}@example.com`,
      subject,
      message: `Bonjour,\n\n${subject.toLowerCase()}\n\nJe souhaiterais obtenir plus d'informations à ce sujet.\n\nCordialement,\nClient ${i}`,
      status,
    });
  }
  
  return messages.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const mockMessages = generateMessages();

// Conversations chatbot
const generateChatbotConversations = () => {
  const conversations = [];
  
  for (let i = 1; i <= 15; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 15));
    const escalated = Math.random() > 0.7;
    const user = Math.random() > 0.5 ? mockUsers[Math.floor(Math.random() * mockUsers.length)] : null;
    
    const messages = [
      {
        id: 1,
        type: 'user',
        content: 'Bonjour, j\'ai une question sur vos produits',
        timestamp: date.toISOString(),
      },
      {
        id: 2,
        type: 'bot',
        content: 'Bonjour ! Je serais ravi de vous aider. Quelle est votre question ?',
        timestamp: new Date(date.getTime() + 5000).toISOString(),
      },
      {
        id: 3,
        type: 'user',
        content: 'Quelle est la différence entre EDR et XDR ?',
        timestamp: new Date(date.getTime() + 10000).toISOString(),
      },
      {
        id: 4,
        type: 'bot',
        content: 'L\'EDR se concentre sur la protection des endpoints, tandis que l\'XDR étend cette protection à tous les environnements (réseau, cloud, email).',
        timestamp: new Date(date.getTime() + 15000).toISOString(),
      },
      ...(escalated ? [{
        id: 5,
        type: 'user',
        content: 'Je souhaite parler à un conseiller',
        timestamp: new Date(date.getTime() + 20000).toISOString(),
      }] : []),
    ];
    
    conversations.push({
      id: i,
      date: date.toISOString(),
      user: user ? { id: user.id, name: `${user.firstName} ${user.lastName}`, email: user.email } : null,
      firstMessage: messages[0].content,
      messageCount: messages.length,
      escalated,
      messages,
      internalNote: escalated ? 'Client demande un devis personnalisé' : null,
    });
  }
  
  return conversations.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const mockChatbotConversations = generateChatbotConversations();

// Statistiques pour le dashboard
export const generateDashboardStats = () => {
  const now = new Date();
  const last7Days = [];
  const last5Weeks = [];
  
  // Générer données 7 derniers jours
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dayOrders = mockOrders.filter(o => {
      const orderDate = new Date(o.date);
      return orderDate.toDateString() === date.toDateString();
    });
    
    const edrOrders = dayOrders.filter(o => o.items[0].category === 'EDR');
    const xdrOrders = dayOrders.filter(o => o.items[0].category === 'XDR');
    const socOrders = dayOrders.filter(o => o.items[0].category === 'SOC');
    
    last7Days.push({
      date: date.toISOString().split('T')[0],
      totalSales: dayOrders.reduce((sum, o) => sum + o.total, 0),
      orderCount: dayOrders.length,
      averageCart: dayOrders.length > 0 ? dayOrders.reduce((sum, o) => sum + o.total, 0) / dayOrders.length : 0,
      averageCartByCategory: {
        EDR: edrOrders.length > 0 ? edrOrders.reduce((sum, o) => sum + o.total, 0) / edrOrders.length : 0,
        XDR: xdrOrders.length > 0 ? xdrOrders.reduce((sum, o) => sum + o.total, 0) / xdrOrders.length : 0,
        SOC: socOrders.length > 0 ? socOrders.reduce((sum, o) => sum + o.total, 0) / socOrders.length : 0,
      },
      salesByCategory: {
        EDR: edrOrders.reduce((sum, o) => sum + o.total, 0),
        XDR: xdrOrders.reduce((sum, o) => sum + o.total, 0),
        SOC: socOrders.reduce((sum, o) => sum + o.total, 0),
        'Threat Intelligence': 0,
        SIEM: 0,
      },
    });
  }
  
  // Générer données 5 dernières semaines
  for (let i = 4; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - (i * 7) - 6);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const weekOrders = mockOrders.filter(o => {
      const orderDate = new Date(o.date);
      return orderDate >= weekStart && orderDate <= weekEnd;
    });
    
    const edrOrders = weekOrders.filter(o => o.items[0].category === 'EDR');
    const xdrOrders = weekOrders.filter(o => o.items[0].category === 'XDR');
    const socOrders = weekOrders.filter(o => o.items[0].category === 'SOC');
    
    last5Weeks.push({
      week: `Semaine ${5 - i}`,
      weekStart: weekStart.toISOString().split('T')[0],
      weekEnd: weekEnd.toISOString().split('T')[0],
      totalSales: weekOrders.reduce((sum, o) => sum + o.total, 0),
      orderCount: weekOrders.length,
      averageCart: weekOrders.length > 0 ? weekOrders.reduce((sum, o) => sum + o.total, 0) / weekOrders.length : 0,
      averageCartByCategory: {
        EDR: edrOrders.length > 0 ? edrOrders.reduce((sum, o) => sum + o.total, 0) / edrOrders.length : 0,
        XDR: xdrOrders.length > 0 ? xdrOrders.reduce((sum, o) => sum + o.total, 0) / xdrOrders.length : 0,
        SOC: socOrders.length > 0 ? socOrders.reduce((sum, o) => sum + o.total, 0) / socOrders.length : 0,
      },
      salesByCategory: {
        EDR: edrOrders.reduce((sum, o) => sum + o.total, 0),
        XDR: xdrOrders.reduce((sum, o) => sum + o.total, 0),
        SOC: socOrders.reduce((sum, o) => sum + o.total, 0),
        'Threat Intelligence': 0,
        SIEM: 0,
      },
    });
  }
  
  // Calculer les KPIs
  const last7DaysOrders = mockOrders.filter(o => {
    const orderDate = new Date(o.date);
    const daysAgo = (now - orderDate) / (1000 * 60 * 60 * 24);
    return daysAgo <= 7;
  });
  
  const previous7DaysOrders = mockOrders.filter(o => {
    const orderDate = new Date(o.date);
    const daysAgo = (now - orderDate) / (1000 * 60 * 60 * 24);
    return daysAgo > 7 && daysAgo <= 14;
  });
  
  const totalSales7Days = last7DaysOrders.reduce((sum, o) => sum + o.total, 0);
  const totalSalesPrevious7Days = previous7DaysOrders.reduce((sum, o) => sum + o.total, 0);
  const salesEvolution = totalSalesPrevious7Days > 0 
    ? ((totalSales7Days - totalSalesPrevious7Days) / totalSalesPrevious7Days * 100).toFixed(1)
    : '0';
  
  const orderCount7Days = last7DaysOrders.length;
  const orderCountPrevious7Days = previous7DaysOrders.length;
  const orderCountEvolution = orderCountPrevious7Days > 0
    ? ((orderCount7Days - orderCountPrevious7Days) / orderCountPrevious7Days * 100).toFixed(1)
    : '0';
  
  const averageCart7Days = orderCount7Days > 0 ? totalSales7Days / orderCount7Days : 0;
  const averageCartPrevious7Days = orderCountPrevious7Days > 0 ? totalSalesPrevious7Days / orderCountPrevious7Days : 0;
  const averageCartEvolution = averageCartPrevious7Days > 0
    ? ((averageCart7Days - averageCartPrevious7Days) / averageCartPrevious7Days * 100).toFixed(1)
    : '0';
  
  const newUsers7Days = mockUsers.filter(u => {
    const regDate = new Date(u.registrationDate);
    const daysAgo = (now - regDate) / (1000 * 60 * 60 * 24);
    return daysAgo <= 7;
  }).length;
  
  const newUsersPrevious7Days = mockUsers.filter(u => {
    const regDate = new Date(u.registrationDate);
    const daysAgo = (now - regDate) / (1000 * 60 * 60 * 24);
    return daysAgo > 7 && daysAgo <= 14;
  }).length;
  
  const newUsersEvolution = newUsersPrevious7Days > 0
    ? ((newUsers7Days - newUsersPrevious7Days) / newUsersPrevious7Days * 100).toFixed(1)
    : '0';
  
  return {
    kpis: {
      totalSales: {
        value: totalSales7Days,
        evolution: parseFloat(salesEvolution),
        period: '7 derniers jours',
      },
      orderCount: {
        value: orderCount7Days,
        evolution: parseFloat(orderCountEvolution),
        period: '7 derniers jours',
      },
      averageCart: {
        value: averageCart7Days,
        evolution: parseFloat(averageCartEvolution),
        period: '7 derniers jours',
      },
      newUsers: {
        value: newUsers7Days,
        evolution: parseFloat(newUsersEvolution),
        period: '7 derniers jours',
      },
    },
    last7Days,
    last5Weeks,
  };
};

// Contenu de la page d'accueil
export const mockHomeContent = {
  carousel: [
    {
      id: 1,
      image: '/api/placeholder/1920/600',
      title: 'Protégez votre entreprise avec CYNA',
      text: 'Solutions de sécurité SaaS innovantes pour protéger votre infrastructure contre les cybermenaces.',
      link: '/catalogue',
      ctaText: 'Découvrir nos solutions',
      order: 1,
    },
    {
      id: 2,
      image: '/api/placeholder/1920/600',
      title: 'EDR, XDR, SOC : Tout ce dont vous avez besoin',
      text: 'Une gamme complète de services de sécurité pour répondre à tous vos besoins.',
      link: '/catalogue',
      ctaText: 'Voir le catalogue',
      order: 2,
    },
    {
      id: 3,
      image: '/api/placeholder/1920/600',
      title: 'Support 24/7 et expertise certifiée',
      text: 'Notre équipe d\'experts est disponible pour vous accompagner à tout moment.',
      link: '/contact',
      ctaText: 'Nous contacter',
      order: 3,
    },
  ],
  staticText: '<h2>Bienvenue sur CYNA</h2><p>CYNA est votre partenaire de confiance pour la sécurité informatique. Nous proposons des solutions SaaS innovantes pour protéger votre entreprise.</p>',
  featuredProducts: [1, 2, 3, 4, 5, 6], // IDs des produits
};

// Paramètres
export const mockSettings = {
  general: {
    siteName: 'CYNA',
    contactEmail: 'contact@cyna-it.fr',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Sécurité\n75001 Paris, France',
    socialMedia: {
      facebook: 'https://facebook.com/cyna',
      twitter: 'https://twitter.com/cyna',
      linkedin: 'https://linkedin.com/company/cyna',
    },
  },
  payment: {
    stripe: {
      publicKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxx',
      secretKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxx',
      enabled: true,
    },
    paypal: {
      clientId: 'xxxxxxxxxxxxxxxxxxxxx',
      secret: 'xxxxxxxxxxxxxxxxxxxxx',
      enabled: false,
    },
    taxRate: 20,
  },
  email: {
    orderConfirmation: {
      subject: 'Confirmation de votre commande CYNA',
      body: 'Bonjour {{firstName}},\n\nMerci pour votre commande. Votre abonnement est maintenant actif.\n\nDétails de la commande:\n{{orderDetails}}\n\nCordialement,\nL\'équipe CYNA',
    },
    welcome: {
      subject: 'Bienvenue sur CYNA',
      body: 'Bonjour {{firstName}},\n\nBienvenue sur CYNA ! Nous sommes ravis de vous compter parmi nos clients.\n\nCordialement,\nL\'équipe CYNA',
    },
    passwordReset: {
      subject: 'Réinitialisation de votre mot de passe',
      body: 'Bonjour,\n\nVous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien suivant:\n{{resetLink}}\n\nCordialement,\nL\'équipe CYNA',
    },
  },
  security: {
    twoFactorEnabled: false,
    loginHistory: [
      {
        id: 1,
        date: new Date().toISOString(),
        ip: '192.168.1.1',
        location: 'Paris, France',
        success: true,
      },
    ],
  },
};

