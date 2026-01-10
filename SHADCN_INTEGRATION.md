# Intégration de shadcn/ui

## Vue d'ensemble

Cette intégration remplace les composants personnalisés par ceux de shadcn/ui pour avoir une base de composants homogène, accessible et maintenable.

## Configuration

### 1. Fichier `components.json`
Créé pour configurer shadcn/ui avec :
- Style : `default`
- CSS Variables : activées
- Alias configurés : `@/components`, `@/lib/utils`, etc.

### 2. Configuration Vite
Ajout des alias dans `vite.config.js` :
```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### 3. Dépendances installées
- `@radix-ui/react-label`
- `@radix-ui/react-slot`
- `@radix-ui/react-tabs`
- `@radix-ui/react-dialog`
- `@radix-ui/react-checkbox`

## Composants shadcn/ui ajoutés

### Composants UI de base (`src/components/ui/`)
1. **button.jsx** - Déjà existant, amélioré
2. **card.jsx** - Déjà existant, amélioré
3. **input.jsx** - Nouveau composant
4. **label.jsx** - Nouveau composant
5. **badge.jsx** - Nouveau composant
6. **checkbox.jsx** - Nouveau composant
7. **tabs.jsx** - Nouveau composant
8. **dialog.jsx** - Nouveau composant (remplace Modal)

## Wrappers de compatibilité

Les composants dans `src/components/common/` sont maintenant des wrappers qui utilisent shadcn/ui en interne, tout en maintenant la compatibilité avec l'API existante :

### Input.jsx
- Utilise `shadcn/ui Input` et `Label`
- Maintient l'API existante (label, error, required)
- Améliore l'accessibilité avec aria-*

### Button.jsx
- Utilise `shadcn/ui Button`
- Mapping des variants pour compatibilité (primary → default, etc.)
- Support de fullWidth et autres props

### Badge.jsx
- Utilise `shadcn/ui Badge`
- Support de tous les variants (default, success, danger, etc.)

### Card.jsx
- Utilise `shadcn/ui Card` et ses sous-composants
- Exporte CardHeader, CardTitle, CardContent, etc. pour utilisation avancée

### Checkbox.jsx
- Utilise `shadcn/ui Checkbox` avec Radix UI
- Support de l'ancienne API `onChange` et nouvelle API `onCheckedChange`
- Intégration avec Label

### Tabs.jsx
- Utilise `shadcn/ui Tabs` avec Radix UI
- Support de l'orientation horizontale/verticale
- API simplifiée pour compatibilité

### Modal.jsx
- Utilise `shadcn/ui Dialog` (remplace l'ancien Modal)
- Maintient l'API existante (isOpen, onClose, title, size)
- Amélioration avec animations et accessibilité

## Migration effectuée

### Fichiers mis à jour

1. **AccountLayout.jsx**
   - Utilise directement `shadcn/ui Tabs` et `Button`
   - Structure améliorée avec TabsList et TabsTrigger

2. **ProfileTab.jsx**
   - Utilise `shadcn/ui Button`
   - Input reste via wrapper pour compatibilité

3. **PaymentTab.jsx**
   - Utilise `shadcn/ui Button` et `Badge`
   - Checkbox via wrapper avec support `onCheckedChange`

4. **SubscriptionsTab.jsx** et **OrdersTab.jsx**
   - Utilisent `shadcn/ui Badge`

## Avantages de shadcn/ui

1. **Accessibilité** : Tous les composants sont basés sur Radix UI (ARIA compliant)
2. **Cohérence** : Design system unifié
3. **Maintenabilité** : Composants bien documentés et testés
4. **Personnalisation** : Facile à personnaliser via Tailwind CSS
5. **Performance** : Composants optimisés et légers
6. **TypeScript ready** : Prêt pour migration TypeScript future

## Utilisation

### Import direct des composants shadcn/ui
```javascript
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
```

### Import via wrappers (recommandé pour compatibilité)
```javascript
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import Input from '@/components/common/Input';
```

## Prochaines étapes recommandées

1. **Migration progressive** : Remplacer progressivement les imports `common/` par `ui/` directement
2. **TypeScript** : Ajouter TypeScript pour une meilleure sécurité de types
3. **Tests** : Ajouter des tests avec React Testing Library
4. **Documentation Storybook** : Créer une documentation interactive des composants
5. **Thème personnalisé** : Ajuster les variables CSS pour correspondre au design system

## Notes importantes

- Les wrappers dans `common/` maintiennent la compatibilité avec le code existant
- Les composants shadcn/ui sont copiés dans le projet (pas de dépendance externe)
- Tous les composants sont personnalisables via Tailwind CSS
- Les composants Radix UI sous-jacents garantissent l'accessibilité
