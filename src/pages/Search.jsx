import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    categories: [],
    available: null,
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    let results = products;
    
    // Recherche textuelle
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }
    
    // Filtre prix
    if (filters.minPrice) {
      results = results.filter(p => p.price.monthly >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      results = results.filter(p => p.price.monthly <= parseFloat(filters.maxPrice));
    }
    
    // Filtre catégories
    if (filters.categories.length > 0) {
      results = results.filter(p => filters.categories.includes(p.category));
    }
    
    // Filtre disponibilité
    if (filters.available !== null) {
      results = results.filter(p => p.available === filters.available);
    }
    
    // Tri
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price.monthly - b.price.monthly);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price.monthly - a.price.monthly);
        break;
      case 'newest':
        results.sort((a, b) => (b.newProduct ? 1 : 0) - (a.newProduct ? 1 : 0));
        break;
      case 'available':
        results.sort((a, b) => (b.available ? 1 : 0) - (a.available ? 1 : 0));
        break;
      default:
        break;
    }
    
    setFilteredProducts(results);
  }, [searchQuery, filters, sortBy]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };
  
  const toggleCategory = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };
  
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Recherche</h1>
        
        {/* Barre de recherche */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un service..."
              className="flex-1"
            />
            <Button type="submit">Rechercher</Button>
          </div>
        </form>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filtres - Desktop sidebar / Mobile accordéon */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Prix */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Prix</h3>
                <div className="space-y-2">
                  <Input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                    placeholder="Min (€)"
                  />
                  <Input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                    placeholder="Max (€)"
                  />
                </div>
              </div>
              
              {/* Catégories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(cat.name)}
                        onChange={() => toggleCategory(cat.name)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Disponibilité */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Disponibilité</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="available"
                      checked={filters.available === true}
                      onChange={() => setFilters(prev => ({ ...prev, available: true }))}
                      className="border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Disponible uniquement</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="available"
                      checked={filters.available === null}
                      onChange={() => setFilters(prev => ({ ...prev, available: null }))}
                      className="border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Tous</span>
                  </label>
                </div>
              </div>
              
              <Button
                variant="outline"
                fullWidth
                className="mt-6"
                onClick={() => {
                  setFilters({
                    minPrice: '',
                    maxPrice: '',
                    categories: [],
                    available: null,
                  });
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </div>
          
          {/* Résultats */}
          <div className="flex-1">
            {/* Options de tri et filtre mobile */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center text-gray-700 hover:text-primary-600"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtres
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="relevance">Pertinence</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="newest">Nouveautés</option>
                  <option value="available">Disponibilité</option>
                </select>
              </div>
            </div>
            
            {/* Liste des résultats */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Aucun résultat trouvé.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
