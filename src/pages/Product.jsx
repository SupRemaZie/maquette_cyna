import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProductCard from '../components/product/ProductCard';

const Product = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [subscriptionType, setSubscriptionType] = useState('monthly');
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));
  const similarProducts = products
    .filter(p => p.categoryId === product?.categoryId && p.id !== product?.id)
    .slice(0, 6);
  
  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Produit introuvable</h1>
        <p className="text-gray-600">Le produit demandé n'existe pas.</p>
      </div>
    );
  }
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };
  
  const handleAddToCart = () => {
    addToCart(product, subscriptionType, 1);
  };
  
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Carrousel d'images */}
          <div>
            <div className="relative mb-4">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.newProduct && (
                <div className="absolute top-4 left-4">
                  <Badge variant="new">Nouveau</Badge>
                </div>
              )}
              {!product.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <Badge variant="danger">Stock épuisé</Badge>
                </div>
              )}
            </div>
            
            {/* Miniatures */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary-600 ring-2 ring-primary-200'
                        : 'border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Vue ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Informations produit */}
          <div>
            <div className="mb-4">
              <Badge variant="primary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline space-x-4 mb-4">
                <div>
                  <span className="text-4xl font-bold text-primary-600">
                    {formatPrice(product.price[subscriptionType])}
                  </span>
                  <span className="text-gray-500 ml-2">
                    /{subscriptionType === 'monthly' ? 'mois' : 'an'}
                  </span>
                </div>
              </div>
              
              {/* Sélection abonnement */}
              <div className="flex space-x-2 mb-6">
                <button
                  onClick={() => setSubscriptionType('monthly')}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    subscriptionType === 'monthly'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:border-primary-400'
                  }`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setSubscriptionType('annual')}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    subscriptionType === 'annual'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:border-primary-400'
                  }`}
                >
                  Annuel
                  <span className="ml-2 text-sm text-accent-600 font-semibold">
                    (Économisez {formatPrice(product.price.monthly * 12 - product.price.annual)})
                  </span>
                </button>
              </div>
              
              <Button
                variant="accent"
                size="lg"
                fullWidth
                disabled={!product.available}
                onClick={handleAddToCart}
              >
                {product.available ? 'S\'ABONNER MAINTENANT' : 'Indisponible'}
              </Button>
            </div>
            
            {/* Description courte */}
            <div className="mb-6">
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Disponibilité */}
            <div className="mb-6">
              {product.available ? (
                <div className="flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Disponible</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Stock épuisé</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Description détaillée */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
        </div>
        
        {/* Caractéristiques */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Caractéristiques techniques</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-accent-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Services similaires */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Services similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard
                  key={similarProduct.id}
                  product={similarProduct}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
