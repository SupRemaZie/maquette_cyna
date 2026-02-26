import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockHomeContent, mockProducts } from '../../data/adminMockData';
import { Edit, ChevronRight, Image } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Content = () => {
  const [staticText] = useState(mockHomeContent.staticText);
  const [featuredProducts] = useState(mockHomeContent.featuredProducts);
  const { success } = useToast();

  const slideCount = mockHomeContent.carousel.length;
  const previewSlides = mockHomeContent.carousel
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Gestion du Contenu</h2>

      {/* ── Carrousel ── */}
      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-primary/10 rounded-md flex-shrink-0">
              <Image className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Carrousel Page d'Accueil</h3>
              <p className="text-xs text-muted-foreground">{slideCount} slide(s)</p>
            </div>
          </div>
          <Link
            to="/admin/content/carousel"
            className="flex items-center gap-2 min-h-[44px] px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex-shrink-0"
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Modifier</span>
            <ChevronRight className="h-4 w-4 sm:hidden" />
          </Link>
        </div>

        {previewSlides.length > 0 && (
          <div className="border-t border-border px-4 py-2.5 space-y-1.5">
            {previewSlides.map((slide) => (
              <div key={slide.id} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-3 flex-shrink-0">{slide.order}.</span>
                <div className="w-10 h-6 rounded overflow-hidden bg-muted flex-shrink-0">
                  {slide.image
                    ? <img src={slide.image} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-muted" />
                  }
                </div>
                <p className="text-xs text-foreground truncate">{slide.title}</p>
              </div>
            ))}
            {slideCount > 3 && (
              <p className="text-xs text-muted-foreground pl-5">+ {slideCount - 3} autre(s)</p>
            )}
          </div>
        )}
      </div>

      {/* ── Texte fixe ── */}
      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">Texte Fixe Page d'Accueil</h3>
          <Link
            to="/admin/content/static-text"
            className="flex items-center gap-2 min-h-[44px] px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex-shrink-0"
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Modifier</span>
            <ChevronRight className="h-4 w-4 sm:hidden" />
          </Link>
        </div>
        <div className="border-t border-border px-4 py-2.5">
          <div className="prose max-w-none text-xs line-clamp-2" dangerouslySetInnerHTML={{ __html: staticText }} />
        </div>
      </div>

      {/* ── Top produits ── */}
      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">Top Produits du Moment</h3>
          <button
            onClick={() => success('Contenu enregistré !')}
            className="flex items-center gap-2 min-h-[44px] px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex-shrink-0"
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Modifier</span>
            <ChevronRight className="h-4 w-4 sm:hidden" />
          </button>
        </div>
        <div className="border-t border-border px-4 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {featuredProducts.slice(0, 6).map((productId) => {
              const product = mockProducts.find(p => p.id === productId);
              if (!product) return null;
              return (
                <div key={productId} className="flex items-center gap-2 p-2 border rounded-lg">
                  <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded flex-shrink-0" />
                  <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
