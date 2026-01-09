import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockProducts } from '../../data/adminMockData';
import { ArrowLeft, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products] = useState(mockProducts);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const { success } = useToast();
  
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Produit non trouvé</p>
        <Link to="/admin/products" className="text-primary hover:text-primary-600 mt-4 inline-block">
          Retour à la liste
        </Link>
      </div>
    );
  }
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };
  
  const handleDelete = () => {
    // Simuler la suppression
    success('Produit supprimé avec succès !');
    setTimeout(() => {
      navigate('/admin/products');
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/products"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
            <p className="text-sm text-muted-foreground">ID: {product.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/products/${product.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Edit className="h-4 w-4" />
            Modifier
          </Link>
          <button
            onClick={() => setDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Supprimer
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Images */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Images</h3>
          <div className="relative">
            <img
              src={product.images[currentImageIndex] || '/api/placeholder/600/400'}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentImageIndex ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image || '/api/placeholder/150/150'}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Informations principales */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informations principales</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Catégorie</label>
                <p className="text-foreground mt-1">{product.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description courte</label>
                <p className="text-foreground mt-1">{product.shortDescription}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Prix</label>
                <div className="mt-1 space-y-1">
                  <p className="text-foreground">
                    <span className="font-semibold">{formatCurrency(product.priceMonthly)}</span>
                    <span className="text-muted-foreground"> / mois</span>
                  </p>
                  <p className="text-foreground">
                    <span className="font-semibold">{formatCurrency(product.priceYearly)}</span>
                    <span className="text-muted-foreground"> / an</span>
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Disponibilité</label>
                <div className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    product.available
                      ? 'bg-accent/20 text-accent'
                      : 'bg-destructive/20 text-destructive'
                  }`}>
                    {product.available ? 'Disponible' : 'Indisponible'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Priorité d'affichage</label>
                <p className="text-foreground mt-1">{product.priority}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Dates</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date de création</label>
                <p className="text-foreground mt-1">{formatDate(product.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Dernière modification</label>
                <p className="text-foreground mt-1">{formatDate(product.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description complète */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Description complète</h3>
        <p className="text-foreground whitespace-pre-line">{product.fullDescription}</p>
      </div>
      
      {/* Caractéristiques */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Caractéristiques techniques</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Modal de confirmation */}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Confirmer la suppression"
      >
        <p className="text-sm text-foreground mb-4">
          Êtes-vous sûr de vouloir supprimer le produit "{product.name}" ? Cette action est irréversible.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setDeleteModal(false)}
            className="px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;

