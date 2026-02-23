# User Stories - Plateforme CYNA E-commerce SaaS

## 📋 Analyse du contexte

**Contexte du projet :** Plateforme e-commerce SaaS B2B pour solutions de sécurité (EDR, XDR, SOC, SIEM, Threat Intelligence, Compliance)

**État actuel :** Maquette front-end React avec données mockées, authentification simulée, pas de backend réel

**Critiques des spécifications :**

- ✅ Points forts : Structure claire, design moderne, fonctionnalités de base présentes
- ⚠️ Points d'amélioration :
  - Pas de gestion des abonnements récurrents (billing)
  - Pas de gestion multi-tenant (organisations)
  - Pas de gestion des licences/utilisateurs par produit
  - Pas de système de facturation automatique
  - Pas de gestion des rôles et permissions avancées
  - Pas de système de notifications/emails
  - Pas de gestion des contrats/SLA
  - Pas de système de support client intégré

---

## 🎯 User Stories par Épic

### EPIC 0 : Initialisation et Infrastructure du Projet

> **Note :** Ces user stories techniques doivent être réalisées en premier pour établir les fondations du projet.

#### US-TECH-001 : Setup de l'architecture microservices

**En tant que** développeur  
**Je veux** mettre en place l'architecture microservices  
**Afin de** avoir une base solide et scalable pour le projet

**Critères d'acceptation :**

- [ ] Architecture définie et documentée (diagrammes)
- [ ] Séparation Backend (Laravel) et Frontend (Next.js)
- [ ] Communication inter-services configurée (API REST, éventuellement message queue)
- [ ] Structure de dossiers standardisée pour chaque service
- [ ] Configuration des environnements (dev, staging, prod)
- [ ] Documentation de l'architecture dans le README

**Priorité :** Haute (Fondation)  
**Estimation :** 13 points  
**Tags :** `architecture`, `setup`, `microservices`, `infrastructure`

---

#### US-TECH-002 : Setup du backend Laravel

**En tant que** développeur backend  
**Je veux** initialiser le projet Laravel avec les dépendances nécessaires  
**Afin de** commencer le développement de l'API

**Critères d'acceptation :**

- [ ] Installation de Laravel (version 10+)
- [ ] Configuration de la base de données (MySQL/PostgreSQL)
- [ ] Installation des packages essentiels :
  - [ ] Laravel Sanctum (authentification API)
  - [ ] Laravel Passport ou JWT (tokens)
  - [ ] Spatie Laravel Permission (rôles et permissions)
  - [ ] Laravel Horizon (queues Redis)
  - [ ] Laravel Telescope (debugging)
- [ ] Configuration des variables d'environnement (.env)
- [ ] Migration de base de données initiale
- [ ] Seeders pour données de test
- [ ] Tests unitaires de base configurés (PHPUnit)
- [ ] Documentation API initiale (Swagger/OpenAPI)

**Priorité :** Haute (Fondation)  
**Estimation :** 13 points  
**Tags :** `backend`, `laravel`, `setup`, `api`

---

#### US-TECH-003 : Setup du frontend Next.js

**En tant que** développeur frontend  
**Je veux** initialiser le projet Next.js avec la configuration nécessaire  
**Afin de** développer l'interface utilisateur

**Critères d'acceptation :**

- [ ] Installation de Next.js (version 14+ avec App Router)
- [ ] Configuration TypeScript
- [ ] Configuration Tailwind CSS
- [ ] Installation des dépendances essentielles :
  - [ ] React Hook Form (formulaires)
  - [ ] Zod (validation)
  - [ ] TanStack Query (data fetching)
  - [ ] Zustand ou Redux Toolkit (state management)
  - [ ] Axios ou Fetch wrapper (API calls)
  - [ ] shadcn/ui (composants UI)
- [ ] Structure de dossiers organisée (app/, components/, lib/, etc.)
- [ ] Configuration ESLint et Prettier
- [ ] Variables d'environnement configurées
- [ ] Tests configurés (Jest, React Testing Library)
- [ ] Storybook configuré (optionnel mais recommandé)

**Priorité :** Haute (Fondation)  
**Estimation :** 13 points  
**Tags :** `frontend`, `nextjs`, `setup`, `typescript`

---

#### US-TECH-004 : Configuration de la base de données

**En tant que** développeur  
**Je veux** configurer et initialiser la base de données  
**Afin de** stocker les données de l'application

**Critères d'acceptation :**

- [ ] Choix et configuration du SGBD (MySQL ou PostgreSQL)
- [ ] Création du schéma de base de données initial
- [ ] Migrations Laravel pour les tables principales :
  - [ ] users, roles, permissions
  - [ ] products, categories
  - [ ] orders, order_items
  - [ ] subscriptions
  - [ ] payments, invoices
- [ ] Indexes et contraintes définis
- [ ] Seeders pour données de test
- [ ] Backup automatique configuré
- [ ] Documentation du schéma (ERD)

**Priorité :** Haute (Fondation)  
**Estimation :** 8 points  
**Tags :** `database`, `migrations`, `schema`

---

#### US-TECH-005 : Configuration Docker et environnement de développement

**En tant que** développeur  
**Je veux** avoir un environnement de développement containerisé  
**Afin de** faciliter le setup et la collaboration

**Critères d'acceptation :**

- [ ] Docker Compose configuré avec :
  - [ ] Service PHP/Laravel
  - [ ] Service Node.js/Next.js
  - [ ] Service MySQL/PostgreSQL
  - [ ] Service Redis (cache et queues)
  - [ ] Service Nginx (reverse proxy)
- [ ] Dockerfile pour chaque service
- [ ] Variables d'environnement gérées via .env
- [ ] Scripts de démarrage/arrêt
- [ ] Documentation pour lancer l'environnement
- [ ] Hot reload configuré pour le développement

**Priorité :** Haute (Fondation)  
**Estimation :** 8 points  
**Tags :** `docker`, `devops`, `environment`

---

#### US-TECH-006 : Configuration CI/CD

**En tant que** développeur  
**Je veux** mettre en place un pipeline CI/CD  
**Afin de** automatiser les tests et déploiements

**Critères d'acceptation :**

- [ ] Pipeline GitHub Actions ou GitLab CI configuré
- [ ] Tests automatiques à chaque push (backend et frontend)
- [ ] Linting et formatage automatiques
- [ ] Build automatique des applications
- [ ] Déploiement automatique en staging
- [ ] Déploiement manuel en production (avec approbation)
- [ ] Notifications sur échecs/succès
- [ ] Documentation du processus

**Priorité :** Haute (Fondation)  
**Estimation :** 13 points  
**Tags :** `cicd`, `devops`, `automation`

---

#### US-TECH-007 : Configuration du système d'authentification

**En tant que** développeur  
**Je veux** configurer le système d'authentification entre frontend et backend  
**Afin de** sécuriser les communications API

**Critères d'acceptation :**

- [ ] Laravel Sanctum configuré côté backend
- [ ] Middleware d'authentification créé
- [ ] Service d'authentification côté Next.js
- [ ] Gestion des tokens (access token, refresh token)
- [ ] Stockage sécurisé des tokens (httpOnly cookies ou localStorage)
- [ ] Intercepteurs Axios pour injection automatique des tokens
- [ ] Gestion de l'expiration et refresh automatique
- [ ] Logout et invalidation des tokens
- [ ] Tests d'authentification (E2E)

**Priorité :** Haute (Fondation)  
**Estimation :** 13 points  
**Tags :** `authentication`, `security`, `api`

---

#### US-TECH-008 : Création du design system et composants de base

**En tant que** développeur frontend  
**Je veux** créer un design system avec les composants de base  
**Afin de** avoir une base cohérente pour l'interface

**Critères d'acceptation :**

- [ ] Design tokens définis (couleurs, typographie, espacements)
- [ ] Configuration Tailwind avec les tokens
- [ ] Composants de base créés :
  - [ ] Button (variants, sizes, states)
  - [ ] Input (text, email, password, etc.)
  - [ ] Card
  - [ ] Modal/Dialog
  - [ ] Badge
  - [ ] Toast/Notification
  - [ ] Loading/Spinner
  - [ ] Table
  - [ ] Form (avec validation)
- [ ] Documentation Storybook pour chaque composant
- [ ] Tests unitaires pour chaque composant
- [ ] Accessibilité (ARIA, keyboard navigation)

**Priorité :** Haute (Fondation)  
**Estimation :** 21 points  
**Tags :** `frontend`, `components`, `design-system`, `ui`

---

#### US-TECH-009 : Configuration du routing Next.js

**En tant que** développeur frontend  
**Je veux** configurer le routing de l'application Next.js  
**Afin de** organiser la navigation

**Critères d'acceptation :**

- [ ] Structure de routes avec App Router
- [ ] Routes publiques définies (/, /catalogue, /product/:id, etc.)
- [ ] Routes protégées avec middleware d'authentification
- [ ] Routes admin avec protection par rôle
- [ ] Gestion des 404 et erreurs
- [ ] Navigation programmatique configurée
- [ ] Breadcrumbs pour navigation
- [ ] Tests de navigation

**Priorité :** Haute (Fondation)  
**Estimation :** 5 points  
**Tags :** `frontend`, `routing`, `nextjs`

---

#### US-TECH-010 : Configuration du state management

**En tant que** développeur frontend  
**Je veux** configurer le state management  
**Afin de** gérer l'état de l'application de manière centralisée

**Critères d'acceptation :**

- [ ] Choix de la solution (Zustand, Redux Toolkit, ou Context API)
- [ ] Store global configuré
- [ ] Stores par domaine (auth, cart, products, etc.)
- [ ] Persistance du state (localStorage/sessionStorage)
- [ ] Middleware pour logging (dev)
- [ ] DevTools configurés
- [ ] Documentation de l'architecture du state
- [ ] Tests des stores

**Priorité :** Haute (Fondation)  
**Estimation :** 8 points  
**Tags :** `frontend`, `state-management`, `architecture`

---

#### US-TECH-011 : Configuration des services API

**En tant que** développeur  
**Je veux** créer les services API côté frontend  
**Afin de** centraliser les appels API

**Critères d'acceptation :**

- [ ] Client API configuré (Axios ou Fetch wrapper)
- [ ] Services par domaine (authService, productService, orderService, etc.)
- [ ] Gestion des erreurs centralisée
- [ ] Retry logic pour les requêtes échouées
- [ ] Cache des requêtes (TanStack Query)
- [ ] Types TypeScript pour les réponses API
- [ ] Mock API pour développement (MSW)
- [ ] Tests des services API

**Priorité :** Haute (Fondation)  
**Estimation :** 8 points  
**Tags :** `api`, `services`, `frontend`

---

#### US-TECH-012 : Configuration de la gestion des erreurs

**En tant que** développeur  
**Je veux** mettre en place un système de gestion des erreurs  
**Afin de** gérer proprement les erreurs dans l'application

**Critères d'acceptation :**

- [ ] Error boundaries React configurés
- [ ] Handler d'erreurs global côté frontend
- [ ] Handler d'erreurs global côté backend (Laravel)
- [ ] Format d'erreur standardisé (JSON)
- [ ] Logging des erreurs (Sentry, LogRocket, ou équivalent)
- [ ] Affichage user-friendly des erreurs
- [ ] Notifications d'erreurs critiques
- [ ] Tests de gestion d'erreurs

**Priorité :** Haute (Fondation)  
**Estimation :** 8 points  
**Tags :** `error-handling`, `logging`, `monitoring`

---

#### US-TECH-013 : Configuration du logging et monitoring

**En tant que** développeur  
**Je veux** configurer le logging et monitoring  
**Afin de** surveiller l'application en production

**Critères d'acceptation :**

- [ ] Logging structuré côté backend (Laravel Log)
- [ ] Logging côté frontend (console, service externe)
- [ ] Intégration avec service de monitoring (Sentry, DataDog, etc.)
- [ ] Dashboard de monitoring configuré
- [ ] Alertes sur erreurs critiques
- [ ] Métriques de performance (temps de réponse, etc.)
- [ ] Logs d'audit pour actions sensibles
- [ ] Documentation du système de logging

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `logging`, `monitoring`, `observability`

---

#### US-TECH-014 : Configuration de la sécurité de base

**En tant que** développeur  
**Je veux** mettre en place les mesures de sécurité de base  
**Afin de** protéger l'application

**Critères d'acceptation :**

- [ ] HTTPS configuré
- [ ] CORS configuré correctement
- [ ] Protection CSRF (Laravel)
- [ ] Rate limiting configuré
- [ ] Validation des inputs (backend et frontend)
- [ ] Sanitization des données
- [ ] Headers de sécurité (Helmet.js pour Next.js)
- [ ] Chiffrement des données sensibles
- [ ] Audit de sécurité initial

**Priorité :** Haute (Fondation)  
**Estimation :** 13 points  
**Tags :** `security`, `protection`, `best-practices`

---

#### US-TECH-015 : Configuration des tests

**En tant que** développeur  
**Je veux** configurer les tests pour backend et frontend  
**Afin de** garantir la qualité du code

**Critères d'acceptation :**

- [ ] Tests unitaires backend (PHPUnit) configurés
- [ ] Tests unitaires frontend (Jest + React Testing Library) configurés
- [ ] Tests d'intégration configurés
- [ ] Tests E2E configurés (Playwright ou Cypress)
- [ ] Coverage minimum défini (80%)
- [ ] Scripts npm/composer pour lancer les tests
- [ ] Tests dans le pipeline CI/CD
- [ ] Documentation sur comment écrire les tests

**Priorité :** Haute (Fondation)  
**Estimation :** 13 points  
**Tags :** `testing`, `quality`, `tdd`

---

#### US-TECH-016 : Configuration de la documentation

**En tant que** développeur  
**Je veux** mettre en place la documentation du projet  
**Afin de** faciliter l'onboarding et la maintenance

**Critères d'acceptation :**

- [ ] README principal avec setup complet
- [ ] Documentation de l'architecture
- [ ] Documentation API (Swagger/OpenAPI)
- [ ] Guide de contribution (CONTRIBUTING.md)
- [ ] Documentation des composants (Storybook)
- [ ] Changelog (CHANGELOG.md)
- [ ] Architecture Decision Records (ADRs)
- [ ] Diagrammes (architecture, flux, base de données)

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `documentation`, `onboarding`, `maintenance`

---

#### US-TECH-017 : Migration depuis React/Vite vers Next.js

**En tant que** développeur  
**Je veux** migrer la maquette React/Vite existante vers Next.js  
**Afin de** réutiliser les composants existants

**Critères d'acceptation :**

- [ ] Audit des composants existants
- [ ] Migration des composants vers Next.js (App Router)
- [ ] Adaptation du routing (React Router → Next.js Router)
- [ ] Migration des Context API vers le state management choisi
- [ ] Adaptation des styles (Tailwind déjà présent)
- [ ] Migration des pages existantes
- [ ] Tests de régression
- [ ] Documentation des changements

**Priorité :** Haute (Fondation)  
**Estimation :** 21 points  
**Tags :** `migration`, `refactoring`, `nextjs`

---

#### US-TECH-018 : Configuration de l'environnement de production

**En tant que** développeur DevOps  
**Je veux** configurer l'environnement de production  
**Afin de** déployer l'application

**Critères d'acceptation :**

- [ ] Serveurs de production configurés (VPS, AWS, etc.)
- [ ] Base de données de production configurée
- [ ] Variables d'environnement de production
- [ ] SSL/TLS configuré
- [ ] CDN configuré pour assets statiques
- [ ] Backup automatique configuré
- [ ] Monitoring de production configuré
- [ ] Plan de rollback défini
- [ ] Documentation de déploiement

**Priorité :** Moyenne  
**Estimation :** 13 points  
**Tags :** `deployment`, `production`, `devops`

---

## 📊 Récapitulatif des User Stories Techniques

### Priorité Haute (Fondation - À faire en premier)

- US-TECH-001, US-TECH-002, US-TECH-003, US-TECH-004, US-TECH-005
- US-TECH-006, US-TECH-007, US-TECH-008, US-TECH-009, US-TECH-010
- US-TECH-011, US-TECH-012, US-TECH-014, US-TECH-015, US-TECH-017

**Total :** ~180 points

### Priorité Moyenne

- US-TECH-013, US-TECH-016, US-TECH-018

**Total :** ~29 points

---

### EPIC 1 : Authentification et Gestion des Utilisateurs

#### US-001 : Inscription d'un nouvel utilisateur

**En tant que** visiteur  
**Je veux** créer un compte utilisateur  
**Afin de** accéder aux fonctionnalités réservées aux membres et passer des commandes

**Critères d'acceptation :**

- [ ] Formulaire d'inscription avec validation en temps réel
- [ ] Champs requis : email, mot de passe (min 8 caractères, 1 majuscule, 1 chiffre), prénom, nom
- [ ] Vérification de l'unicité de l'email
- [ ] Envoi d'email de confirmation avec lien d'activation
- [ ] Validation du compte par email avant première connexion
- [ ] Gestion des erreurs (email déjà utilisé, format invalide, etc.)
- [ ] Redirection automatique vers la page d'accueil après inscription réussie

**Priorité :** Haute  
**Estimation :** 5 points  
**Tags :** `auth`, `registration`, `email`

---

#### US-002 : Connexion utilisateur

**En tant que** utilisateur enregistré  
**Je veux** me connecter à mon compte  
**Afin de** accéder à mon espace personnel et mes abonnements

**Critères d'acceptation :**

- [ ] Formulaire de connexion (email + mot de passe)
- [ ] Validation des identifiants
- [ ] Gestion des erreurs (identifiants incorrects, compte non activé)
- [ ] Option "Se souvenir de moi" (cookie sécurisé)
- [ ] Redirection vers la page d'origine après connexion
- [ ] Affichage du nom de l'utilisateur dans le header après connexion
- [ ] Gestion de la session (expiration après inactivité)

**Priorité :** Haute  
**Estimation :** 3 points  
**Tags :** `auth`, `login`, `session`

---

#### US-003 : Récupération de mot de passe

**En tant que** utilisateur  
**Je veux** réinitialiser mon mot de passe  
**Afin de** récupérer l'accès à mon compte si je l'ai oublié

**Critères d'acceptation :**

- [ ] Formulaire de demande de réinitialisation (email)
- [ ] Envoi d'email avec lien sécurisé et temporaire (expiration 1h)
- [ ] Page de réinitialisation avec nouveau mot de passe
- [ ] Validation du nouveau mot de passe (mêmes règles que l'inscription)
- [ ] Invalidation du lien après utilisation
- [ ] Message de confirmation après réinitialisation réussie

**Priorité :** Moyenne  
**Estimation :** 5 points  
**Tags :** `auth`, `password-reset`, `email`

---

#### US-004 : Gestion du profil utilisateur

**En tant que** utilisateur connecté  
**Je veux** modifier mes informations personnelles  
**Afin de** maintenir mes données à jour

**Critères d'acceptation :**

- [ ] Affichage des informations actuelles (prénom, nom, email, téléphone, entreprise)
- [ ] Formulaire d'édition avec validation
- [ ] Modification de l'email avec re-vérification
- [ ] Sauvegarde des modifications avec confirmation
- [ ] Gestion des erreurs de validation

**Priorité :** Moyenne  
**Estimation :** 3 points  
**Tags :** `profile`, `user-management`

---

### EPIC 2 : Catalogue et Recherche de Produits

#### US-005 : Consultation du catalogue de produits

**En tant que** visiteur ou utilisateur  
**Je veux** parcourir le catalogue de solutions de sécurité  
**Afin de** découvrir les produits disponibles et leurs caractéristiques

**Critères d'acceptation :**

- [ ] Affichage de tous les produits avec pagination (20 par page)
- [ ] Carte produit avec : image, nom, catégorie, prix (mensuel/annuel), badge "Nouveau" si applicable
- [ ] Filtres par catégorie (EDR, XDR, SOC, SIEM, etc.)
- [ ] Tri par : prix croissant/décroissant, nom, popularité
- [ ] Affichage responsive (grille adaptative)
- [ ] Lien vers la page détaillée du produit

**Priorité :** Haute  
**Estimation :** 5 points  
**Tags :** `catalog`, `products`, `filtering`

---

#### US-006 : Recherche de produits

**En tant que** utilisateur  
**Je veux** rechercher des produits par mots-clés  
**Afin de** trouver rapidement les solutions qui correspondent à mes besoins

**Critères d'acceptation :**

- [ ] Barre de recherche dans le header (accessible partout)
- [ ] Recherche en temps réel avec suggestions
- [ ] Recherche dans : nom, description, catégories, tags
- [ ] Affichage des résultats avec nombre de résultats
- [ ] Mise en évidence des termes recherchés
- [ ] Gestion des recherches vides
- [ ] Historique des recherches récentes (localStorage)

**Priorité :** Haute  
**Estimation :** 5 points  
**Tags :** `search`, `products`, `autocomplete`

---

#### US-007 : Consultation des détails d'un produit

**En tant que** utilisateur  
**Je veux** voir les détails complets d'un produit  
**Afin de** prendre une décision éclairée avant l'achat

**Critères d'acceptation :**

- [ ] Carrousel d'images du produit
- [ ] Nom, description détaillée, caractéristiques techniques
- [ ] Tableau comparatif des tarifs (mensuel/annuel)
- [ ] Liste des fonctionnalités incluses
- [ ] Avis et notes des clients (si disponibles)
- [ ] Bouton "Ajouter au panier" avec sélection du type d'abonnement
- [ ] Section "Produits similaires" ou "Produits complémentaires"
- [ ] Partage sur réseaux sociaux

**Priorité :** Haute  
**Estimation :** 5 points  
**Tags :** `product-detail`, `pricing`

---

### EPIC 3 : Gestion du Panier et Checkout

#### US-008 : Ajout de produits au panier

**En tant que** utilisateur  
**Je veux** ajouter des produits à mon panier  
**Afin de** préparer ma commande avant le paiement

**Critères d'acceptation :**

- [ ] Ajout depuis la page produit ou le catalogue
- [ ] Sélection du type d'abonnement (mensuel/annuel)
- [ ] Sélection de la quantité (si applicable)
- [ ] Notification de confirmation (toast)
- [ ] Badge avec nombre d'articles dans le header
- [ ] Gestion des doublons (mise à jour de la quantité)
- [ ] Persistance du panier (localStorage + backend)
- [ ] Calcul automatique du total

**Priorité :** Haute  
**Estimation :** 3 points  
**Tags :** `cart`, `add-to-cart`

---

#### US-009 : Modification du panier

**En tant que** utilisateur  
**Je veux** modifier les quantités ou supprimer des articles  
**Afin de** ajuster ma commande avant validation

**Critères d'acceptation :**

- [ ] Page panier avec liste des articles
- [ ] Modification de la quantité (boutons +/-)
- [ ] Suppression d'un article avec confirmation
- [ ] Mise à jour automatique des totaux
- [ ] Affichage du sous-total, TVA, total
- [ ] Bouton "Vider le panier" avec confirmation
- [ ] Lien vers la page produit depuis chaque article

**Priorité :** Haute  
**Estimation :** 3 points  
**Tags :** `cart`, `update-cart`

---

#### US-010 : Processus de commande (Checkout)

**En tant que** utilisateur  
**Je veux** finaliser ma commande en plusieurs étapes  
**Afin de** valider mon achat de manière sécurisée

**Critères d'acceptation :**

- [ ] **Étape 1 :** Connexion/Inscription (si non connecté)
- [ ] **Étape 2 :** Informations de facturation (pré-remplies si disponibles)
  - Validation de l'adresse avec API externe (optionnel)
  - Champs : nom, prénom, entreprise, adresse, code postal, ville, pays
- [ ] **Étape 3 :** Méthode de paiement
  - Carte bancaire (Stripe/PayPal)
  - Virement bancaire (pour entreprises)
  - Prélèvement automatique (pour abonnements)
- [ ] **Étape 4 :** Récapitulatif et confirmation
  - Affichage de la commande complète
  - Conditions générales à accepter
  - Bouton de confirmation
- [ ] Indicateur de progression visuel
- [ ] Possibilité de revenir en arrière
- [ ] Validation à chaque étape avant passage à la suivante

**Priorité :** Haute  
**Estimation :** 13 points  
**Tags :** `checkout`, `payment`, `order`

---

#### US-011 : Confirmation de commande

**En tant que** utilisateur  
**Je veux** recevoir une confirmation de ma commande  
**Afin de** avoir une preuve d'achat et les détails de ma commande

**Critères d'acceptation :**

- [ ] Page de confirmation avec numéro de commande
- [ ] Récapitulatif de la commande (produits, montants, adresse)
- [ ] Envoi d'email de confirmation automatique
- [ ] PDF de facture téléchargeable
- [ ] Lien vers l'espace "Mes commandes"
- [ ] Informations sur la prochaine étape (activation du service, etc.)

**Priorité :** Haute  
**Estimation :** 5 points  
**Tags :** `order-confirmation`, `invoice`, `email`

---

### EPIC 4 : Gestion des Abonnements

#### US-012 : Consultation de mes abonnements

**En tant que** utilisateur  
**Je veux** voir la liste de mes abonnements actifs  
**Afin de** suivre mes services souscrits

**Critères d'acceptation :**

- [ ] Liste des abonnements avec statut (actif, suspendu, expiré)
- [ ] Pour chaque abonnement : nom du produit, date de début, prochaine facturation, montant
- [ ] Badge de statut visuel
- [ ] Actions disponibles : modifier, suspendre, résilier
- [ ] Filtres par statut
- [ ] Tri par date ou nom

**Priorité :** Haute  
**Estimation :** 5 points  
**Tags :** `subscriptions`, `account`

---

#### US-013 : Modification d'un abonnement

**En tant que** utilisateur  
**Je veux** modifier mon abonnement (changement de plan, upgrade/downgrade)  
**Afin de** adapter mon service à mes besoins évolutifs

**Critères d'acceptation :**

- [ ] Bouton "Modifier" sur chaque abonnement
- [ ] Choix du nouveau plan (mensuel ↔ annuel)
- [ ] Calcul de la différence de prix
- [ ] Ajustement pro-rata si changement en cours d'abonnement
- [ ] Confirmation avant modification
- [ ] Notification par email de la modification
- [ ] Mise à jour immédiate dans l'interface

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `subscriptions`, `upgrade`, `downgrade`

---

#### US-014 : Résiliation d'un abonnement

**En tant que** utilisateur  
**Je veux** résilier mon abonnement  
**Afin de** arrêter un service dont je n'ai plus besoin

**Critères d'acceptation :**

- [ ] Bouton "Résilier" avec confirmation
- [ ] Modal de confirmation avec avertissement
- [ ] Choix de la date de résiliation (immédiate ou fin de période)
- [ ] Information sur les conséquences (perte d'accès, données, etc.)
- [ ] Formulaire de feedback (optionnel) pour comprendre la raison
- [ ] Confirmation par email
- [ ] Désactivation automatique à la date choisie

**Priorité :** Moyenne  
**Estimation :** 5 points  
**Tags :** `subscriptions`, `cancellation`

---

#### US-015 : Gestion des méthodes de paiement

**En tant que** utilisateur  
**Je veux** gérer mes méthodes de paiement  
**Afin de** faciliter le renouvellement de mes abonnements

**Critères d'acceptation :**

- [ ] Liste des cartes bancaires enregistrées
- [ ] Ajout d'une nouvelle carte (avec validation)
- [ ] Définition d'une carte par défaut
- [ ] Suppression d'une carte (avec confirmation)
- [ ] Masquage partiel des numéros de carte (sécurité)
- [ ] Gestion des cartes expirées (notification)

**Priorité :** Moyenne  
**Estimation :** 5 points  
**Tags :** `payment-methods`, `billing`

---

### EPIC 5 : Espace Client

#### US-016 : Consultation de mes commandes

**En tant que** utilisateur  
**Je veux** voir l'historique de mes commandes  
**Afin de** suivre mes achats passés

**Critères d'acceptation :**

- [ ] Liste chronologique des commandes
- [ ] Pour chaque commande : numéro, date, montant, statut
- [ ] Filtres par statut et période
- [ ] Recherche par numéro de commande
- [ ] Lien vers le détail de chaque commande
- [ ] Téléchargement de la facture PDF

**Priorité :** Haute  
**Estimation :** 5 points  
**Tags :** `orders`, `account`, `history`

---

#### US-017 : Détail d'une commande

**En tant que** utilisateur  
**Je veux** voir les détails d'une commande spécifique  
**Afin de** consulter les informations complètes de mon achat

**Critères d'acceptation :**

- [ ] Informations de la commande : numéro, date, statut, montant total
- [ ] Liste des produits commandés avec quantités et prix
- [ ] Informations de facturation
- [ ] Informations de livraison (si applicable)
- [ ] Historique des statuts (timeline)
- [ ] Bouton de téléchargement de facture
- [ ] Bouton de contact support (si problème)

**Priorité :** Haute  
**Estimation :** 3 points  
**Tags :** `order-detail`, `invoice`

---

#### US-018 : Contact et support

**En tant que** utilisateur  
**Je veux** contacter le support client  
**Afin de** obtenir de l'aide ou signaler un problème

**Critères d'acceptation :**

- [ ] Formulaire de contact avec catégories (technique, facturation, autre)
- [ ] Chatbot intelligent pour les questions fréquentes
- [ ] Historique des conversations/messages
- [ ] Envoi d'email de confirmation avec numéro de ticket
- [ ] Suivi du statut de la demande
- [ ] Notifications de nouvelles réponses

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `support`, `contact`, `chatbot`

---

### EPIC 6 : Administration

#### US-019 : Dashboard administrateur

**En tant qu'** administrateur  
**Je veux** voir un tableau de bord avec les KPIs principaux  
**Afin de** suivre la performance de la plateforme

**Critères d'acceptation :**

- [ ] KPIs : CA total, nombre de commandes, panier moyen, nouveaux utilisateurs
- [ ] Graphiques : ventes par période, ventes par catégorie, évolution du panier moyen
- [ ] Filtres par période (7 jours, 30 jours, 3 mois, 1 an)
- [ ] Liste des commandes récentes
- [ ] Alertes et notifications importantes
- [ ] Export des données (CSV, PDF)

**Priorité :** Haute  
**Estimation :** 8 points  
**Tags :** `admin`, `dashboard`, `analytics`

---

#### US-020 : Gestion des produits

**En tant qu'** administrateur  
**Je veux** gérer le catalogue de produits  
**Afin de** ajouter, modifier ou supprimer des produits

**Critères d'acceptation :**

- [ ] Liste des produits avec recherche et filtres
- [ ] Création d'un nouveau produit (formulaire complet)
- [ ] Modification d'un produit existant
- [ ] Suppression d'un produit (avec vérification des commandes actives)
- [ ] Gestion des images (upload, ordre)
- [ ] Gestion des catégories et tags
- [ ] Gestion des prix (mensuel/annuel)
- [ ] Activation/désactivation d'un produit

**Priorité :** Haute  
**Estimation :** 13 points  
**Tags :** `admin`, `products`, `catalog`

---

#### US-021 : Gestion des commandes

**En tant qu'** administrateur  
**Je veux** gérer les commandes des clients  
**Afin de** suivre et traiter les commandes

**Critères d'acceptation :**

- [ ] Liste de toutes les commandes avec filtres (statut, date, client)
- [ ] Détail d'une commande avec toutes les informations
- [ ] Modification du statut d'une commande
- [ ] Ajout de notes internes
- [ ] Envoi d'email au client (changement de statut)
- [ ] Export des commandes (CSV)
- [ ] Recherche par numéro de commande ou client

**Priorité :** Haute  
**Estimation :** 8 points  
**Tags :** `admin`, `orders`, `management`

---

#### US-022 : Gestion des utilisateurs

**En tant qu'** administrateur  
**Je veux** gérer les utilisateurs de la plateforme  
**Afin de** administrer les comptes et résoudre les problèmes

**Critères d'acceptation :**

- [ ] Liste des utilisateurs avec recherche et filtres
- [ ] Détail d'un utilisateur (profil, commandes, abonnements)
- [ ] Modification des informations utilisateur
- [ ] Désactivation/réactivation d'un compte
- [ ] Réinitialisation de mot de passe (admin)
- [ ] Historique des actions de l'utilisateur
- [ ] Export de la liste (CSV)

**Priorité :** Haute  
**Estimation :** 8 points  
**Tags :** `admin`, `users`, `management`

---

#### US-023 : Gestion des messages/chatbot

**En tant qu'** administrateur  
**Je veux** gérer les messages clients et configurer le chatbot  
**Afin de** améliorer le support client

**Critères d'acceptation :**

- [ ] Liste des messages/tickets avec statut
- [ ] Réponse aux messages clients
- [ ] Configuration du chatbot (questions/réponses)
- [ ] Statistiques sur les messages (temps de réponse, satisfaction)
- [ ] Catégorisation automatique des messages
- [ ] Assignation à un agent

**Priorité :** Moyenne  
**Estimation :** 13 points  
**Tags :** `admin`, `support`, `chatbot`

---

### EPIC 7 : Facturation et Paiements

#### US-024 : Génération automatique de factures

**En tant que** système  
**Je veux** générer automatiquement les factures  
**Afin de** facturer les clients de manière automatique

**Critères d'acceptation :**

- [ ] Génération de facture à chaque commande
- [ ] Génération de facture récurrente pour les abonnements
- [ ] Format PDF professionnel avec logo et informations légales
- [ ] Numérotation séquentielle des factures
- [ ] Envoi automatique par email
- [ ] Stockage sécurisé des factures
- [ ] Conformité légale (TVA, mentions obligatoires)

**Priorité :** Haute  
**Estimation :** 8 points  
**Tags :** `billing`, `invoices`, `automation`

---

#### US-025 : Gestion des paiements récurrents

**En tant que** système  
**Je veux** gérer les paiements récurrents des abonnements  
**Afin de** facturer automatiquement les clients

**Critères d'acceptation :**

- [ ] Prélèvement automatique à la date d'échéance
- [ ] Gestion des échecs de paiement (notifications, relances)
- [ ] Suspension automatique après X échecs
- [ ] Historique des tentatives de paiement
- [ ] Notification par email en cas d'échec
- [ ] Interface pour réessayer un paiement échoué

**Priorité :** Haute  
**Estimation :** 13 points  
**Tags :** `billing`, `recurring-payment`, `subscriptions`

---

### EPIC 8 : Notifications et Communications

#### US-026 : Notifications par email

**En tant que** système  
**Je veux** envoyer des emails automatiques aux utilisateurs  
**Afin de** les informer des événements importants

**Critères d'acceptation :**

- [ ] Email de bienvenue après inscription
- [ ] Email de confirmation de commande
- [ ] Email de facture
- [ ] Email de rappel de paiement
- [ ] Email de changement de statut d'abonnement
- [ ] Email de réponse au support
- [ ] Templates personnalisables
- [ ] Gestion des préférences de notification (opt-in/opt-out)

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `notifications`, `email`, `automation`

---

#### US-027 : Notifications in-app

**En tant qu'** utilisateur  
**Je veux** recevoir des notifications dans l'application  
**Afin de** être informé des événements importants sans consulter mes emails

**Critères d'acceptation :**

- [ ] Badge de notification dans le header
- [ ] Liste des notifications (non lues/lues)
- [ ] Types de notifications : nouvelle commande, facture, message support, etc.
- [ ] Marquer comme lu/non lu
- [ ] Suppression des notifications
- [ ] Lien vers l'élément concerné (commande, facture, etc.)

**Priorité :** Basse  
**Estimation :** 5 points  
**Tags :** `notifications`, `in-app`, `ui`

---

### EPIC 9 : Sécurité et Conformité

#### US-028 : Gestion des rôles et permissions

**En tant qu'** administrateur  
**Je veux** gérer les rôles et permissions des utilisateurs  
**Afin de** contrôler l'accès aux fonctionnalités

**Critères d'acceptation :**

- [ ] Rôles prédéfinis : Admin, Client, Support
- [ ] Permissions granulaires par fonctionnalité
- [ ] Attribution de rôles aux utilisateurs
- [ ] Création de rôles personnalisés
- [ ] Audit log des changements de permissions

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `security`, `roles`, `permissions`

---

#### US-029 : Conformité RGPD

**En tant que** plateforme  
**Je veux** être conforme au RGPD  
**Afin de** respecter la réglementation européenne

**Critères d'acceptation :**

- [ ] Consentement explicite pour les cookies
- [ ] Politique de confidentialité accessible
- [ ] Droit à l'oubli (suppression des données)
- [ ] Export des données personnelles (format portable)
- [ ] Journalisation des accès aux données
- [ ] Gestion des données sensibles (chiffrement)

**Priorité :** Haute  
**Estimation :** 13 points  
**Tags :** `security`, `rgpd`, `compliance`

---

### EPIC 10 : Fonctionnalités Avancées

#### US-030 : Gestion multi-tenant (organisations)

**En tant qu'** utilisateur entreprise  
**Je veux** gérer une organisation avec plusieurs utilisateurs  
**Afin de** centraliser la gestion des abonnements de mon entreprise

**Critères d'acceptation :**

- [ ] Création d'une organisation
- [ ] Invitation d'utilisateurs par email
- [ ] Rôles dans l'organisation (admin, membre, viewer)
- [ ] Facturation centralisée pour l'organisation
- [ ] Gestion des abonnements au niveau organisation
- [ ] Tableau de bord organisationnel

**Priorité :** Basse  
**Estimation :** 21 points  
**Tags :** `multi-tenant`, `organizations`, `enterprise`

---

#### US-031 : Gestion des licences par produit

**En tant qu'** utilisateur  
**Je veux** gérer le nombre de licences pour chaque produit  
**Afin de** adapter le nombre d'utilisateurs à mes besoins

**Critères d'acceptation :**

- [ ] Affichage du nombre de licences actives/utilisées
- [ ] Modification du nombre de licences (upgrade/downgrade)
- [ ] Calcul automatique du prix selon le nombre de licences
- [ ] Gestion des utilisateurs assignés à chaque licence
- [ ] Notification si limite de licences atteinte

**Priorité :** Basse  
**Estimation :** 13 points  
**Tags :** `licenses`, `products`, `users`

---

#### US-032 : API pour intégrations tierces

**En tant que** développeur externe  
**Je veux** accéder à une API REST  
**Afin de** intégrer la plateforme CYNA dans mes systèmes

**Critères d'acceptation :**

- [ ] Documentation API complète (Swagger/OpenAPI)
- [ ] Authentification par clé API
- [ ] Endpoints pour : produits, commandes, abonnements, utilisateurs
- [ ] Rate limiting
- [ ] Versioning de l'API
- [ ] Webhooks pour événements (nouvelle commande, paiement, etc.)

**Priorité :** Basse  
**Estimation :** 21 points  
**Tags :** `api`, `integration`, `webhooks`

---

### EPIC 11 : Gestion des Contrats et SLA

#### US-033 : Consultation des contrats et SLA

**En tant qu'** utilisateur  
**Je veux** consulter mes contrats et les SLA associés  
**Afin de** connaître mes droits et obligations

**Critères d'acceptation :**

- [ ] Liste des contrats actifs avec dates de début/fin
- [ ] Affichage des SLA (disponibilité, temps de réponse, etc.)
- [ ] Téléchargement des contrats en PDF
- [ ] Historique des modifications de contrat
- [ ] Notifications avant expiration

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `contracts`, `sla`, `legal`

---

#### US-034 : Gestion des renouvellements de contrat

**En tant qu'** utilisateur  
**Je veux** gérer le renouvellement de mes contrats  
**Afin de** maintenir la continuité de service

**Critères d'acceptation :**

- [ ] Notification 30 jours avant expiration
- [ ] Proposition automatique de renouvellement
- [ ] Modification des termes avant renouvellement
- [ ] Signature électronique du nouveau contrat
- [ ] Confirmation par email

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `contracts`, `renewal`, `automation`

---

### EPIC 12 : Gestion des Documents et Ressources

#### US-035 : Téléchargement de documents produits

**En tant qu'** utilisateur  
**Je veux** télécharger des documents produits (guides, datasheets)  
**Afin de** mieux comprendre les solutions avant achat

**Critères d'acceptation :**

- [ ] Bibliothèque de documents par produit
- [ ] Catégories : datasheets, guides, white papers, cas d'usage
- [ ] Filtres par type de document
- [ ] Recherche dans les documents
- [ ] Téléchargement en PDF
- [ ] Tracking des téléchargements (analytics)

**Priorité :** Moyenne  
**Estimation :** 5 points  
**Tags :** `documents`, `resources`, `downloads`

---

### EPIC 13 : Gestion des Remises et Promotions

#### US-036 : Application de codes promo

**En tant qu'** utilisateur  
**Je veux** appliquer un code promo lors du checkout  
**Afin de** bénéficier d'une réduction

**Critères d'acceptation :**

- [ ] Champ de saisie pour code promo
- [ ] Validation du code (existence, validité, éligibilité)
- [ ] Calcul automatique de la réduction
- [ ] Affichage du montant économisé
- [ ] Gestion des codes à usage unique
- [ ] Gestion des codes avec dates d'expiration
- [ ] Gestion des codes avec montant minimum

**Priorité :** Moyenne  
**Estimation :** 5 points  
**Tags :** `promotions`, `discounts`, `checkout`

---

#### US-037 : Gestion des remises administrateur

**En tant qu'** administrateur  
**Je veux** créer et gérer des codes promo  
**Afin de** proposer des offres promotionnelles

**Critères d'acceptation :**

- [ ] Création de code promo (pourcentage ou montant fixe)
- [ ] Définition des conditions (montant minimum, produits éligibles)
- [ ] Définition de la période de validité
- [ ] Limitation du nombre d'utilisations
- [ ] Suivi des utilisations du code
- [ ] Désactivation/activation de codes
- [ ] Export des statistiques d'utilisation

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `admin`, `promotions`, `marketing`

---

### EPIC 14 : Gestion des Avis et Notes

#### US-038 : Consultation des avis clients

**En tant qu'** utilisateur  
**Je veux** consulter les avis et notes des produits  
**Afin de** prendre une décision éclairée

**Critères d'acceptation :**

- [ ] Affichage des notes moyennes par produit
- [ ] Liste des avis avec pagination
- [ ] Filtres par note (5 étoiles, 4 étoiles, etc.)
- [ ] Tri par date, pertinence, note
- [ ] Avis vérifiés (clients ayant acheté)
- [ ] Photos/vidéos dans les avis (optionnel)
- [ ] Réponses de l'équipe aux avis

**Priorité :** Moyenne  
**Estimation :** 5 points  
**Tags :** `reviews`, `ratings`, `products`

---

### EPIC 15 : Gestion des Demandes de Devis

#### US-039 : Demande de devis personnalisé

**En tant qu'** utilisateur  
**Je veux** demander un devis personnalisé  
**Afin de** obtenir une offre adaptée à mes besoins

**Critères d'acceptation :**

- [ ] Formulaire de demande de devis
- [ ] Sélection des produits d'intérêt
- [ ] Informations sur les besoins (nombre d'utilisateurs, etc.)
- [ ] Envoi automatique de la demande
- [ ] Confirmation par email
- [ ] Suivi du statut de la demande
- [ ] Réception du devis par email

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `quotes`, `sales`, `custom`

---

#### US-040 : Gestion des devis administrateur

**En tant qu'** administrateur  
**Je veux** gérer les demandes de devis  
**Afin de** répondre aux besoins clients

**Critères d'acceptation :**

- [ ] Liste des demandes de devis avec statuts
- [ ] Détail d'une demande avec informations client
- [ ] Création d'un devis personnalisé
- [ ] Envoi du devis par email
- [ ] Suivi des devis (envoyé, accepté, refusé, expiré)
- [ ] Conversion d'un devis en commande
- [ ] Export des devis (PDF, Excel)

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `admin`, `quotes`, `sales`

---

### EPIC 16 : Gestion des Paiements et Remboursements

#### US-041 : Demande de remboursement

**En tant qu'** utilisateur  
**Je veux** demander un remboursement  
**Afin de** récupérer mon argent si nécessaire

**Critères d'acceptation :**

- [ ] Formulaire de demande de remboursement
- [ ] Sélection de la commande/abonnement concerné
- [ ] Justification de la demande
- [ ] Suivi du statut de la demande
- [ ] Notification de la décision
- [ ] Traitement automatique selon les règles (délai, montant)
- [ ] Remboursement sur le moyen de paiement d'origine

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `refunds`, `payments`, `support`

---

#### US-042 : Gestion des remboursements administrateur

**En tant qu'** administrateur  
**Je veux** gérer les demandes de remboursement  
**Afin de** traiter les demandes clients

**Critères d'acceptation :**

- [ ] Liste des demandes de remboursement
- [ ] Détail de chaque demande avec historique
- [ ] Validation/refus d'une demande
- [ ] Traitement du remboursement (automatique ou manuel)
- [ ] Notification au client
- [ ] Historique des remboursements
- [ ] Export pour comptabilité

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `admin`, `refunds`, `finance`

---

### EPIC 17 : Gestion de la Localisation

#### US-043 : Sélection de la langue

**En tant qu'** utilisateur  
**Je veux** choisir la langue de l'interface  
**Afin de** utiliser la plateforme dans ma langue

**Critères d'acceptation :**

- [ ] Sélecteur de langue dans le header
- [ ] Support multi-langues (FR, EN minimum)
- [ ] Sauvegarde de la préférence utilisateur
- [ ] Traduction de tous les textes de l'interface
- [ ] Traduction des emails
- [ ] Traduction des produits et descriptions

**Priorité :** Moyenne  
**Estimation :** 13 points  
**Tags :** `i18n`, `localization`, `languages`

---

### EPIC 18 : Gestion de l'Accessibilité

#### US-044 : Accessibilité WCAG

**En tant qu'** utilisateur avec handicap  
**Je veux** utiliser la plateforme de manière accessible  
**Afin de** accéder à tous les services

**Critères d'acceptation :**

- [ ] Conformité WCAG 2.1 niveau AA minimum
- [ ] Navigation au clavier complète
- [ ] Support des lecteurs d'écran
- [ ] Contraste de couleurs suffisant
- [ ] Textes alternatifs pour les images
- [ ] Labels ARIA appropriés
- [ ] Taille de police ajustable

**Priorité :** Moyenne  
**Estimation :** 13 points  
**Tags :** `accessibility`, `wcag`, `inclusion`

---

### EPIC 19 : Gestion de la Conformité et Audit

#### US-045 : Audit trail et logs

**En tant qu'** administrateur  
**Je veux** consulter les logs d'audit  
**Afin de** tracer toutes les actions importantes

**Critères d'acceptation :**

- [ ] Logs de toutes les actions utilisateurs
- [ ] Logs des modifications de données sensibles
- [ ] Filtres par utilisateur, date, action
- [ ] Export des logs (CSV, JSON)
- [ ] Conservation des logs (conformité légale)
- [ ] Alertes sur actions suspectes
- [ ] Recherche dans les logs

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `audit`, `logs`, `security`, `compliance`

---

#### US-046 : Export de données pour conformité

**En tant qu'** administrateur  
**Je veux** exporter les données pour conformité  
**Afin de** répondre aux exigences réglementaires

**Critères d'acceptation :**

- [ ] Export de toutes les données utilisateurs (RGPD)
- [ ] Export des données de commandes
- [ ] Export des données financières
- [ ] Formats d'export (CSV, JSON, XML)
- [ ] Chiffrement des exports
- [ ] Historique des exports
- [ ] Conformité avec les standards (ISO, SOC2)

**Priorité :** Moyenne  
**Estimation :** 8 points  
**Tags :** `compliance`, `export`, `rgpd`, `data`

---

## 📊 Récapitulatif par Priorité

### ⚙️ User Stories Techniques (EPIC 0 - Fondation)

**Voir EPIC 0 ci-dessus pour les détails complets**

**Priorité Haute (Fondation) :** ~180 points

- US-TECH-001 à US-TECH-012, US-TECH-014, US-TECH-015, US-TECH-017

**Priorité Moyenne :** ~29 points

- US-TECH-013, US-TECH-016, US-TECH-018

**Total Technique :** ~209 points

> ⚠️ **Important :** Les user stories techniques doivent être réalisées **en premier** pour établir les fondations du projet avant de commencer les fonctionnalités métier.

---

### Priorité Haute (MVP - Fonctionnel)

- US-001, US-002, US-005, US-006, US-007, US-008, US-009, US-010, US-011
- US-012, US-016, US-017, US-019, US-020, US-021, US-022
- US-024, US-025, US-029

**Total :** ~120 points

### Priorité Moyenne (V1 - Fonctionnel)

- US-003, US-004, US-013, US-014, US-015, US-018, US-023, US-026, US-028
- US-033, US-034, US-035, US-036, US-037, US-038, US-039, US-040, US-041, US-042
- US-043, US-044, US-045, US-046

**Total :** ~140 points

### Priorité Basse (V2+ - Fonctionnel)

- US-027, US-030, US-031, US-032

**Total :** ~60 points

---

## 📈 Vue d'ensemble complète du projet

| Catégorie              | Priorité Haute | Priorité Moyenne | Priorité Basse | **Total**    |
| ---------------------- | -------------- | ---------------- | -------------- | ------------ |
| **Technique (EPIC 0)** | ~180 pts       | ~29 pts          | 0 pts          | **~209 pts** |
| **Fonctionnel**        | ~120 pts       | ~140 pts         | ~60 pts        | **~320 pts** |
| **TOTAL PROJET**       | **~300 pts**   | **~169 pts**     | **~60 pts**    | **~529 pts** |

**Note :** Les nouvelles user stories fonctionnelles (US-033 à US-046) ont été ajoutées après comparaison avec les bonnes pratiques pour plateformes SaaS B2B. Voir `COMPARAISON_USER_STORIES.md` pour plus de détails.

---

## 🎯 Recommandations pour les développeurs

### Phase 0 : Fondations Techniques (OBLIGATOIRE en premier)

1. **Setup technique d'abord** : Réaliser toutes les user stories de l'EPIC 0 (US-TECH-001 à US-TECH-018)
2. **Architecture** : Définir et documenter l'architecture microservices avant de coder
3. **Environnement de développement** : Configurer Docker et CI/CD dès le début
4. **Design system** : Créer les composants de base avant de développer les pages
5. **Migration** : Migrer la maquette React/Vite vers Next.js en premier

### Phase 1 : MVP Fonctionnel

1. **Backend d'abord** : Développer l'API backend (Laravel) avant d'enrichir le front-end
2. **Authentification** : Implémenter l'authentification complète en premier (US-001, US-002)
3. **Catalogue de base** : Créer le catalogue et la recherche avant le panier
4. **Panier et checkout** : Implémenter le processus complet de commande
5. **Tests** : Chaque user story doit avoir ses tests unitaires et d'intégration

### Phase 2 : Qualité et Production

1. **Documentation** : Documenter les APIs et les décisions techniques au fur et à mesure
2. **Sécurité** : Ne jamais négliger la sécurité (authentification, validation, chiffrement)
3. **Performance** : Optimiser les requêtes et le cache dès le début
4. **Monitoring** : Mettre en place des logs et monitoring dès le MVP
5. **Accessibilité** : Respecter les standards WCAG dès le début

---

## 📝 Notes importantes

- Les estimations sont en points de complexité (Fibonacci : 1, 2, 3, 5, 8, 13, 21)
- Les user stories peuvent être décomposées en sous-tâches techniques
- Chaque user story doit être testable et avoir des critères d'acceptation mesurables
- Prioriser selon les besoins métier et la valeur apportée aux utilisateurs
