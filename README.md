# CYNA - Maquette Front-End SaaS Platform

Maquette visuelle interactive pour présenter au client une plateforme e-commerce SaaS de solutions de sécurité (SOC, EDR, XDR).

## 🚀 Technologies utilisées

- **React 18** avec hooks
- **React Router** pour la navigation
- **Tailwind CSS** pour le styling responsive
- **shadcn/ui** pour les composants UI modernes
- **Lucide React** pour les icônes
- **Vite** comme build tool

## 📋 Fonctionnalités

### Pages principales
- ✅ Page d'accueil avec carrousel et catégories
- ✅ Page catalogue/catégorie avec filtres
- ✅ Page produit détaillée avec carrousel d'images
- ✅ Page de recherche avec filtres avancés
- ✅ Page panier avec gestion des quantités
- ✅ Processus de checkout en 4 étapes
- ✅ Pages d'authentification (Login/Register)
- ✅ Espace utilisateur avec onglets
- ✅ Page contact avec chatbot
- ✅ Pages statiques (CGU, Mentions légales, À propos)

### Fonctionnalités
- 🛒 Gestion du panier (ajout, modification, suppression)
- 🔐 Authentification simulée (localStorage)
- 📱 Design responsive mobile-first
- 🎨 Design system moderne avec shadcn/ui
- 📊 Sidebar de navigation moderne (fixe sur desktop, drawer sur mobile)
- 🔍 Recherche et filtres de produits
- 💬 Chatbot interactif sur la page contact
- 🎯 UI moderne avec variables CSS et thème cohérent

## 🛠️ Installation

### Prérequis
- Node.js 16+ et npm

### Étapes d'installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Lancer le serveur de développement**
```bash
npm run dev
```

3. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

## 📦 Build de production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## 📁 Structure du projet

```
src/
├── components/
│   ├── common/          # Composants réutilisables (Button, Input, Card, Badge, Modal)
│   ├── ui/               # Composants shadcn/ui (Button, Card, Sidebar)
│   ├── layout/           # Header, Footer
│   └── product/          # ProductCard
├── lib/
│   └── utils.js          # Utilitaires (cn function pour Tailwind)
├── pages/
│   ├── Auth/            # Login, Register
│   ├── Account.jsx      # Espace utilisateur
│   ├── Cart.jsx         # Panier
│   ├── Category.jsx     # Page catégorie
│   ├── Checkout.jsx     # Processus de commande
│   ├── Contact.jsx      # Contact avec chatbot
│   ├── Home.jsx         # Page d'accueil
│   ├── Product.jsx      # Page produit
│   ├── Search.jsx       # Recherche
│   ├── CGU.jsx          # Conditions générales
│   ├── MentionsLegales.jsx
│   └── About.jsx
├── context/
│   └── CartContext.jsx   # Context pour panier et auth
├── data/
│   └── mockData.js      # Données fictives (produits, catégories)
├── App.jsx              # Routes principales
├── main.jsx             # Point d'entrée
└── index.css            # Styles Tailwind
```

## 🎨 Design System

### Couleurs
- **Primary**: Bleu (#0073e6) - Couleur principale
- **Accent**: Vert (#00802f) - Actions et badges
- **Gray**: Nuances de gris pour textes et backgrounds

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 📝 Données mockées

Le projet utilise des données fictives stockées dans `src/data/mockData.js` :
- 10 produits SaaS (EDR, XDR, SOC, SIEM, Threat Intelligence, Compliance)
- 6 catégories
- 3 slides pour le carrousel

## 🔐 Authentification

L'authentification est simulée via localStorage. Aucune vraie API n'est utilisée.

## 🛒 Panier

Le panier est géré via React Context et persisté dans localStorage.

## 📱 Responsive

Le design est mobile-first avec :
- Menu burger sur mobile
- Grilles adaptatives (1 col mobile, 2-3 cols tablet, 3-4 cols desktop)
- Navigation optimisée pour mobile

## 🚧 Limitations

- Pas de backend ni d'API réelle
- Authentification simulée (localStorage)
- Pas de vraie passerelle de paiement
- Données statiques (pas de base de données)

## 📄 Licence

Ce projet est une maquette de démonstration pour présentation client.

## 👤 Contact

Pour toute question, contactez l'équipe de développement.
