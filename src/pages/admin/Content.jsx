import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockHomeContent, mockProducts } from '../../data/adminMockData';
import { Edit, ChevronRight, Image, Search } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useContent } from '../../context/ContentContext';
import Modal from '../../components/common/Modal';

const MAX_TOP_PRODUCTS = 6;
const availableProducts = mockProducts.filter(p => p.available);

const Content = () => {
  const [staticText] = useState(mockHomeContent.staticText);
  const [topModal, setTopModal] = useState(false);
  const [modalSelected, setModalSelected] = useState([]);
  const [search, setSearch] = useState('');
  const { success } = useToast();
  const { banner, featuredProducts, setFeaturedProducts } = useContent();

  const openTopModal = () => {
    setModalSelected([...featuredProducts]);
    setSearch('');
    setTopModal(true);
  };

  const toggleProduct = (id) => {
    setModalSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < MAX_TOP_PRODUCTS ? [...prev, id] : prev
    );
  };

  const handleSaveTop = () => {
    setFeaturedProducts(modalSelected);
    setTopModal(false);
    success('Top produits mis à jour !');
  };

  const filteredAvailable = availableProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <h3 className="text-sm font-semibold text-foreground">Texte Fixe Page d'Accueil / Banderole </h3>
          <Link
            to="/admin/content/static-text"
            className="flex items-center gap-2 min-h-[44px] px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex-shrink-0"
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Modifier</span>
            <ChevronRight className="h-4 w-4 sm:hidden" />
          </Link>
        </div>
        <div className="border-t border-border px-4 py-2.5 space-y-1">
          <div className="prose max-w-none text-xs line-clamp-2" dangerouslySetInnerHTML={{ __html: staticText }} />
        </div>
        <div className="border-t border-border px-4 py-2.5 space-y-1">
          <div className="prose max-w-none text-xs line-clamp-2">
            <span className="font-medium">Banderole :</span> {banner.enabled && banner.message ? `${banner.type.toUpperCase()} - ${banner.message}` : 'Désactivée'}
          </div>
        </div>

      </div>

      {/* ── Top produits ── */}
      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Top Produits du Moment</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{featuredProducts.length}/{MAX_TOP_PRODUCTS} produit(s)</p>
          </div>
          <button
            onClick={openTopModal}
            className="flex items-center gap-2 min-h-[44px] px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex-shrink-0"
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Modifier</span>
            <ChevronRight className="h-4 w-4 sm:hidden" />
          </button>
        </div>
        <div className="border-t border-border px-4 py-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {featuredProducts.map((productId) => {
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

      {/* ── Modale Top Produits ── */}
      <Modal
        isOpen={topModal}
        onClose={() => setTopModal(false)}
        title="Sélectionner les Top Produits"
      >
        <p className="text-xs text-muted-foreground mb-3">
          Sélectionnez jusqu'à {MAX_TOP_PRODUCTS} produits actifs à afficher sur la page d'accueil.
          <span className="font-medium text-foreground ml-1">({modalSelected.length}/{MAX_TOP_PRODUCTS})</span>
        </p>

        {/* Recherche */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Liste */}
        <div className="space-y-1 max-h-72 overflow-y-auto -mx-1 px-1">
          {filteredAvailable.map(product => {
            const isSelected = modalSelected.includes(product.id);
            const isDisabled = !isSelected && modalSelected.length >= MAX_TOP_PRODUCTS;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => toggleProduct(product.id)}
                disabled={isDisabled}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isSelected
                    ? 'bg-primary/10 border border-primary/30'
                    : isDisabled
                      ? 'opacity-40 cursor-not-allowed border border-transparent'
                      : 'hover:bg-muted border border-transparent'
                }`}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'bg-primary border-primary' : 'border-input'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
          {filteredAvailable.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">Aucun produit trouvé.</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-border">
          <button
            onClick={() => setTopModal(false)}
            className="px-4 py-2 border border-input rounded-lg text-sm hover:bg-muted transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSaveTop}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Content;
