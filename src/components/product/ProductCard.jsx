import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

const ProductCard = ({ product, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };
  
  return (
    <Card hover className="h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.newProduct && (
            <div className="absolute top-2 right-2">
              <Badge variant="new">Nouveau</Badge>
            </div>
          )}
          {!product.available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="danger">Stock épuisé</Badge>
            </div>
          )}
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-2">
            <Badge variant="primary" className="mb-2">{product.category}</Badge>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          </div>
          
          <div className="mt-auto pt-4">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-2xl font-bold text-primary-600">
                  {formatPrice(product.price.monthly)}
                </span>
                <span className="text-sm text-gray-500 ml-1">/mois</span>
              </div>
              <div className="text-sm text-gray-500">
                ou {formatPrice(product.price.annual)}/an
              </div>
            </div>
            {product.licensesRemaining != null && (
              <div className={`text-xs font-medium px-2 py-1 rounded-full text-center ${
                product.licensesRemaining === 0
                  ? 'bg-red-100 text-red-700'
                  : product.licensesRemaining <= 10
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-green-100 text-green-700'
              }`}>
                {product.licensesRemaining === 0
                  ? 'Plus de licences disponibles'
                  : `${product.licensesRemaining} licence${product.licensesRemaining > 1 ? 's' : ''} restante${product.licensesRemaining > 1 ? 's' : ''}`
                }
              </div>
            )}
          </div>
        </div>
      </Link>
      
      <div className="px-5 pb-5">
        <Button
          variant="primary"
          fullWidth
          disabled={!product.available}
          onClick={(e) => {
            e.preventDefault();
            if (onAddToCart) {
              onAddToCart(product);
            }
          }}
        >
          {product.available ? 'Ajouter au panier' : 'Indisponible'}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
