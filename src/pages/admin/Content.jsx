import React, { useState } from 'react';
import { mockHomeContent, mockProducts } from '../../data/adminMockData';
import { Edit } from 'lucide-react';

const Content = () => {
  const [carousel] = useState(mockHomeContent.carousel);
  const [staticText] = useState(mockHomeContent.staticText);
  const [featuredProducts] = useState(mockHomeContent.featuredProducts);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Gestion du Contenu</h2>
      
      {/* Carousel */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Carrousel Page d'Accueil</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
            <Edit className="h-4 w-4" />
            Modifier
          </button>
        </div>
        <div className="space-y-4">
          {carousel.map((slide) => (
            <div key={slide.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img src={slide.image} alt={slide.title} className="w-32 h-20 object-cover rounded" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{slide.title}</h4>
                <p className="text-sm text-muted-foreground">{slide.text}</p>
                <p className="text-xs text-muted-foreground mt-1">Ordre: {slide.order}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Texte fixe */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Texte Fixe Page d'Accueil</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
            <Edit className="h-4 w-4" />
            Modifier
          </button>
        </div>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: staticText }} />
      </div>
      
      {/* Top produits */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Top Produits du Moment</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
            <Edit className="h-4 w-4" />
            Modifier
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProducts.map((productId) => {
            const product = mockProducts.find(p => p.id === productId);
            if (!product) return null;
            return (
              <div key={productId} className="p-4 border rounded-lg">
                <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
                <h4 className="font-medium text-foreground">{product.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;

