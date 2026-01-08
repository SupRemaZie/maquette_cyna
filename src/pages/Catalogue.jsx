import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, products } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Shield, Filter, Grid, List, X } from 'lucide-react';
import { cn } from '../lib/utils';

const Catalogue = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtrer les produits par catégorie
  const filteredProducts = selectedCategory
    ? products.filter(p => p.categoryId === selectedCategory.id)
    : products;
  
  // Trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price.monthly - b.price.monthly;
      case 'price-desc':
        return b.price.monthly - a.price.monthly;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return (b.newProduct ? 1 : 0) - (a.newProduct ? 1 : 0);
      default:
        return 0;
    }
  });
  
  // Grouper les produits par catégorie pour la vue d'ensemble
  const productsByCategory = categories.map(category => ({
    category,
    products: products.filter(p => p.categoryId === category.id),
  }));
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom py-12 md:py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Catalogue CYNA</h1>
              <p className="text-primary-100 text-lg">
                Découvrez notre gamme complète de solutions de sécurité SaaS
              </p>
            </div>
          </div>
          <p className="text-primary-50 max-w-2xl">
            Protégez votre entreprise avec nos solutions EDR, XDR, SOC, SIEM et Threat Intelligence. 
            Des outils professionnels pour une sécurité optimale.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-8 md:py-12">
        {/* Vue d'ensemble par catégorie */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Vue d'ensemble par catégorie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsByCategory.map(({ category, products: categoryProducts }) => (
              <Card
                key={category.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                    <p className="text-white/90 text-sm mb-2">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">
                        {categoryProducts.length} service{categoryProducts.length > 1 ? 's' : ''}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory(category);
                        }}
                      >
                        Voir
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Filtres et options */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Filtre par catégorie */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {selectedCategory ? selectedCategory.name : 'Toutes les catégories'}
                {selectedCategory && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(null);
                    }}
                    className="ml-2 p-0.5 hover:bg-gray-200 rounded"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Button>
              
              {showFilters && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-card border rounded-lg shadow-lg z-10 p-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setShowFilters(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 rounded-lg hover:bg-accent transition-colors",
                      !selectedCategory && "bg-accent"
                    )}
                  >
                    Toutes les catégories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowFilters(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-lg hover:bg-accent transition-colors",
                        selectedCategory?.id === cat.id && "bg-accent"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Compteur */}
            <span className="text-muted-foreground text-sm">
              {sortedProducts.length} service{sortedProducts.length > 1 ? 's' : ''} 
              {selectedCategory && ` dans ${selectedCategory.name}`}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Tri */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            >
              <option value="name">Nom (A-Z)</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="newest">Nouveautés</option>
            </select>
            
            {/* Vue */}
            <div className="flex border border-input rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === 'grid' ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                )}
                aria-label="Vue grille"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === 'list' ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                )}
                aria-label="Vue liste"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Liste des produits */}
        {sortedProducts.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Aucun service trouvé dans cette catégorie.
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory(null)}
              className="mt-4"
            >
              Voir tous les services
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogue;
