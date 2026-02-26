# CYNA — Maquette Front-End SaaS Platform

Maquette visuelle interactive pour présenter une plateforme e-commerce SaaS de solutions de cybersécurité (SOC, EDR, XDR, SIEM, Threat Intelligence, Compliance).

> Projet 100 % front-end, sans backend ni API réelle — données mockées + localStorage.

---

## Technologies

| Catégorie | Outil |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router 6 |
| Styling | Tailwind CSS v3 |
| Composants UI | shadcn/ui (Radix UI) |
| Icônes | Lucide React |
| Graphiques | Recharts |
| Utilitaires | clsx, tailwind-merge, date-fns |

---

## Démarrage rapide

### Prérequis

- Node.js 18+

### Installation

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173)

### Build de production

```bash
npm run build     # génère /dist
npm run preview   # prévisualise le build
```

---

## Fonctionnalités

### Vitrine client

| Page | Description |
|---|---|
| **Accueil** | Carrousel hero, catégories en grille, produits mis en avant |
| **Catalogue** | Liste paginée, vues grille/liste, filtres |
| **Catégorie** | Produits filtrés par catégorie |
| **Produit** | Galerie d'images, description, ajout au panier |
| **Recherche** | Recherche full-text avec filtres avancés |
| **Panier** | Ajout/modification/suppression, calcul du total |
| **Checkout** | Parcours 4 étapes (adresse → livraison → paiement → confirmation) |
| **Contact** | Formulaire + chatbot interactif |
| **Pages statiques** | CGU, Mentions légales, Politique de confidentialité, À propos |

### Espace utilisateur (`/account`)

- Profil & informations personnelles
- Historique des commandes
- Abonnements actifs
- Moyens de paiement

### Authentification client

- Connexion / Inscription / Mot de passe oublié
- Session simulée via localStorage

### Back-office admin (`/admin`)

Accès protégé par route — identifiants de démo :

```
Email    : admin@cyna-it.fr
Password : Admin123!
```

| Section | Fonctionnalités |
|---|---|
| **Dashboard** | KPIs, graphiques Recharts (CA, commandes, abonnements) |
| **Produits** | Liste paginée, création/édition/suppression, statut publié/brouillon |
| **Catégories** | Gestion des catégories de produits |
| **Commandes** | Liste avec filtres, détail par commande |
| **Utilisateurs** | Liste clients, détail par profil |
| **Messages** | Messages reçus via le formulaire contact |
| **Chatbot** | Historique des conversations chatbot |
| **Contenus** | Gestion des contenus éditoriaux (carrousel, etc.) |
| **Paramètres** | Configuration de la plateforme |

---

## Structure du projet

```
src/
├── App.jsx                    # Définition des routes
├── main.jsx                   # Point d'entrée
├── index.css                  # Styles globaux Tailwind
│
├── context/
│   ├── CartContext.jsx         # Panier + auth utilisateur
│   ├── AdminContext.jsx        # Auth admin
│   ├── ProductsContext.jsx     # Gestion des produits (partagée)
│   └── ToastContext.jsx        # Notifications toast globales
│
├── data/
│   ├── mockData.js             # Données vitrine (produits, catégories, slides)
│   └── adminMockData.js        # Données back-office (commandes, users, messages…)
│
├── components/
│   ├── common/                 # Composants réutilisables métier
│   │   ├── Chatbot.jsx
│   │   ├── AddressAutocomplete.jsx
│   │   ├── Badge.jsx / Button.jsx / Card.jsx
│   │   ├── Checkbox.jsx / Input.jsx / FormField.jsx
│   │   ├── EmptyState.jsx / Modal.jsx
│   │   ├── Section.jsx / Tabs.jsx
│   │   └── ...
│   ├── layout/                 # Shell de l'application
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── BurgerMenu.jsx
│   ├── account/                # Onglets de l'espace utilisateur
│   │   ├── AccountLayout.jsx
│   │   ├── ProfileTab.jsx
│   │   ├── OrdersTab.jsx
│   │   ├── SubscriptionsTab.jsx
│   │   └── PaymentTab.jsx
│   ├── admin/                  # Shell back-office
│   │   ├── AdminLayout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── product/
│   │   └── ProductCard.jsx
│   └── ui/                     # Composants shadcn/ui (Radix)
│       ├── button.jsx / card.jsx / badge.jsx / input.jsx
│       ├── dialog.jsx / checkbox.jsx / label.jsx / tabs.jsx
│       ├── sidebar.jsx / switch.jsx
│       ├── popover.jsx / calendar.jsx / date-picker.jsx
│       └── ...
│
├── pages/
│   ├── Home.jsx / Catalogue.jsx / Category.jsx
│   ├── Product.jsx / Search.jsx
│   ├── Cart.jsx / Checkout.jsx / Contact.jsx
│   ├── Account.jsx / About.jsx
│   ├── CGU.jsx / MentionsLegales.jsx / PrivacyPolicy.jsx
│   ├── Auth/
│   │   ├── Login.jsx / Register.jsx / ForgotPassword.jsx
│   └── admin/
│       ├── Login.jsx / Dashboard.jsx
│       ├── Products.jsx / ProductDetail.jsx / ProductForm.jsx
│       ├── Categories.jsx
│       ├── Orders.jsx / OrderDetail.jsx
│       ├── Users.jsx / UserDetail.jsx
│       ├── Messages.jsx / MessageDetail.jsx
│       ├── Chatbot.jsx / ChatbotDetail.jsx
│       ├── Content.jsx
│       └── Settings.jsx
│
└── lib/
    └── utils.js                # Fonction cn() pour Tailwind
```

---

## Design System

### Couleurs principales

| Token | Valeur | Usage |
|---|---|---|
| `--primary` | Bleu `#0073e6` | Actions principales, liens |
| `--accent` | Vert `#00802f` | Badges, succès |
| Gris | Palette Tailwind | Textes, fonds |

### Breakpoints

```
mobile   < 640px   (sm)
tablet   640–1024px
desktop  > 1024px
```

### Mobile-first

L'intégralité du projet a été adapté mobile-first :
- Sidebar client et admin : drawer sur mobile, fixe sur desktop
- Tableaux admin transformés en cards empilées sur mobile
- Chatbot : plein écran sur mobile, flottant sur sm+
- Tap targets ≥ 44px sur tous les éléments interactifs

---

## Limitations connues

- Pas de backend : aucune API réelle, tout est mocké
- Les deux sources de données (`mockData.js` / `adminMockData.js`) ne sont pas synchronisées
- Les commandes passées en checkout ne sont pas persistées entre les sessions
- Routes client `/account` et `/checkout` non protégées (auth non vérifiée)
- Pas de vraie passerelle de paiement

---

## Licence

Maquette de démonstration — usage interne, présentation client.
