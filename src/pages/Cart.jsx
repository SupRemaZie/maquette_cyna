import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, getCartTotal, isAuthenticated } = useCart();
  const navigate = useNavigate();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };
  
  const subtotal = getCartTotal();
  const tax = subtotal * 0.20; // TVA 20%
  const total = subtotal + tax;
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Panier</h1>
          <div className="text-center py-12">
            <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-xl text-gray-600 mb-4">Votre panier est vide</p>
            <Link to="/">
              <Button variant="primary">Continuer les achats</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 md:mb-8">Panier</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.subscriptionType}`} className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image */}
                  <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Détails */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link to={`/product/${item.productId}`}>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                            {item.product.name}
                          </h3>
                        </Link>
                        <Badge variant="primary" className="mt-1">{item.product.category}</Badge>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.subscriptionType)}
                        className="text-red-600 hover:text-red-700"
                        aria-label="Supprimer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Durée d'abonnement */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Durée d'abonnement
                      </label>
                      <select
                        value={item.subscriptionType}
                        onChange={(e) => {
                          const newType = e.target.value;
                          removeFromCart(item.productId, item.subscriptionType);
                          updateCartItem(item.productId, newType, item.quantity);
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="monthly">
                          Mensuel - {formatPrice(item.product.price.monthly)}/mois
                        </option>
                        <option value="annual">
                          Annuel - {formatPrice(item.product.price.annual)}/an
                        </option>
                      </select>
                    </div>
                    
                    {/* Quantité et prix */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700">Quantité:</label>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateCartItem(item.productId, item.subscriptionType, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.productId, item.subscriptionType, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-base sm:text-lg font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Récapitulatif</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>TVA (20%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              {!isAuthenticated && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Vous devez être connecté pour passer commande.
                  </p>
                </div>
              )}
              
              <Button
                variant="accent"
                size="lg"
                fullWidth
                onClick={() => {
                  if (isAuthenticated) {
                    navigate('/checkout');
                  } else {
                    navigate('/login', { state: { from: '/checkout' } });
                  }
                }}
              >
                Passer à la caisse
              </Button>
              
              <Link to="/" className="block mt-4 text-center text-primary-600 hover:text-primary-700">
                Continuer les achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
