# Compatibilité shadcn/ui avec Next.js

## ✅ Oui, shadcn/ui est 100% compatible avec Next.js !

shadcn/ui est conçu pour fonctionner avec :
- ✅ **Next.js** (App Router et Pages Router)
- ✅ **Vite + React** (votre configuration actuelle)
- ✅ **Remix**
- ✅ **Astro**
- ✅ Tout framework React moderne

## État actuel de votre projet

Votre projet utilise actuellement :
- **Vite** comme bundler
- **React Router** pour le routing
- Configuration shadcn/ui avec `"rsc": false` (pas de React Server Components)

## Migration vers Next.js

### 1. Changements nécessaires dans `components.json`

Pour Next.js avec App Router (React Server Components) :
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,  // ← Changer à true pour Next.js App Router
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",  // ← Chemin différent pour Next.js
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

Pour Next.js avec Pages Router :
```json
{
  "rsc": false,  // ← Rester à false
  "tailwind": {
    "css": "styles/globals.css"  // ← Chemin pour Pages Router
  }
}
```

### 2. Structure de dossiers Next.js

**App Router (Next.js 13+) :**
```
app/
  layout.jsx
  page.jsx
  globals.css
components/
  ui/
    button.jsx
    ...
```

**Pages Router :**
```
pages/
  index.jsx
  _app.jsx
styles/
  globals.css
components/
  ui/
    button.jsx
    ...
```

### 3. Configuration Next.js (`next.config.js`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

### 4. Configuration TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 5. Remplacement de React Router

**Actuellement (Vite) :**
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Avec Next.js App Router :**
```javascript
// app/page.jsx
export default function Home() {
  return <Home />
}

// app/account/page.jsx
export default function Account() {
  return <Account />
}
```

**Avec Next.js Pages Router :**
```javascript
// pages/index.jsx
export default function Home() {
  return <Home />
}

// pages/account.jsx
export default function Account() {
  return <Account />
}
```

### 6. Avantages de Next.js avec shadcn/ui

1. **Server Components** : Performance améliorée avec RSC
2. **Routing intégré** : Pas besoin de React Router
3. **Optimisation automatique** : Images, fonts, etc.
4. **API Routes** : Backend intégré
5. **SSR/SSG** : Rendu côté serveur par défaut

### 7. Composants compatibles

Tous vos composants shadcn/ui actuels fonctionneront sans modification :
- ✅ Button
- ✅ Input
- ✅ Badge
- ✅ Checkbox
- ✅ Tabs
- ✅ Dialog
- ✅ Card
- ✅ Tous les autres composants

### 8. Points d'attention

1. **Client Components** : Si vous utilisez des hooks ou événements, ajoutez `'use client'` en haut du fichier (App Router)
2. **Imports** : Les imports restent identiques
3. **Styling** : Tailwind CSS fonctionne de la même manière

### 9. Exemple de migration d'un composant

**Avant (Vite) :**
```javascript
// src/components/account/ProfileTab.jsx
import React from 'react';
import { Button } from '../ui/button';

const ProfileTab = () => {
  return <Button>Cliquer</Button>;
};
```

**Après (Next.js App Router) :**
```javascript
// app/components/account/ProfileTab.jsx
'use client'; // ← Nécessaire si utilisation de hooks/événements

import React from 'react';
import { Button } from '@/components/ui/button';

const ProfileTab = () => {
  return <Button>Cliquer</Button>;
};
```

## Conclusion

✅ **shadcn/ui est parfaitement compatible avec Next.js**

Votre code actuel peut être migré vers Next.js avec des ajustements minimes :
- Changer la configuration dans `components.json`
- Adapter la structure de dossiers
- Remplacer React Router par le routing Next.js
- Ajouter `'use client'` si nécessaire (App Router)

Les composants shadcn/ui eux-mêmes n'ont **aucune modification** à subir !
