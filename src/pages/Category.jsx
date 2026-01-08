import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { categories, products } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';

const Category = () => {
  const { id } = useParams();
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();
  
  const category = categories.find(cat => cat.slug === id);
  const categoryProducts = products.filter(p => p.categoryId === category?.id);
  
  if (!category) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Catégorie introuvable</h1>
        <p className="text-gray-600">La catégorie demandée n'existe pas.</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Image principale */}
      <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {category.name}
          </h1>
        </div>
      </div>
      
      <div className="container-custom py-8 md:py-12">
        {/* Description */}
        <div className="mb-8">
          <p className="text-lg text-gray-600 max-w-3xl">
            {category.description}
          </p>
        </div>
        
        {/* Options de vue et tri */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {categoryProducts.length} produit{categoryProducts.length > 1 ? 's' : ''} disponible{categoryProducts.length > 1 ? 's' : ''}
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="Vue grille"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="Vue liste"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Liste des produits */}
        {categoryProducts.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun produit disponible dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
