import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/adminMockData';
import { Plus, Eye, Edit, Trash2, Search, Filter } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ open: false, productId: null });
  const { success, error: showError } = useToast();
  
  const categories = ['EDR', 'XDR', 'SOC', 'Threat Intelligence', 'SIEM'];
  
  // Filtrage et tri
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesAvailability = selectedAvailability === 'all' ||
                                 (selectedAvailability === 'available' && product.available) ||
                                 (selectedAvailability === 'unavailable' && !product.available);
      const matchesPrice = (!priceRange.min || product.priceMonthly >= parseFloat(priceRange.min)) &&
                          (!priceRange.max || product.priceMonthly <= parseFloat(priceRange.max));
      
      return matchesSearch && matchesCategory && matchesAvailability && matchesPrice;
    });
    
    // Tri
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'category' || sortConfig.key === 'name') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  }, [products, searchQuery, selectedCategory, selectedAvailability, priceRange, sortConfig]);
  
  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / pageSize);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };
  
  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  const handleDelete = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setDeleteModal({ open: false, productId: null });
    setSelectedProducts(prev => prev.filter(id => id !== productId));
    success('Produit supprimé avec succès !');
  };
  
  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      showError('Aucun produit sélectionné');
      return;
    }
    setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
    success(`${selectedProducts.length} produit(s) supprimé(s) avec succès !`);
  };
  
  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Produits</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredAndSortedProducts.length} produit(s) trouvé(s)
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Ajouter un nouveau produit
        </Link>
      </div>
      
      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          >
            <option value="all">Tous les statuts</option>
            <option value="available">Disponible</option>
            <option value="unavailable">Indisponible</option>
          </select>
          
          <div className="flex gap-2">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              placeholder="Prix min"
              className="flex-1 px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              placeholder="Prix max"
              className="flex-1 px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
        </div>
        
        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <span className="text-sm text-muted-foreground">
              {selectedProducts.length} produit(s) sélectionné(s)
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm"
            >
              Supprimer la sélection
            </button>
          </div>
        )}
      </div>
      
      {/* Tableau */}
      <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-accent"
                  onClick={() => handleSort('id')}
                >
                  ID <SortIcon columnKey="id" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Image</th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-accent"
                  onClick={() => handleSort('name')}
                >
                  Nom <SortIcon columnKey="name" />
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-accent"
                  onClick={() => handleSort('category')}
                >
                  Catégorie <SortIcon columnKey="category" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Prix</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Disponibilité</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Priorité</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{product.id}</td>
                  <td className="px-4 py-3">
                    <img
                      src={product.images[0] || '/api/placeholder/50/50'}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{product.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-xs">
                      {product.shortDescription}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{product.category}</td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    <div>{product.priceMonthly}€/mois</div>
                    <div className="text-xs text-muted-foreground">{product.priceYearly}€/an</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      product.available
                        ? 'bg-accent/20 text-accent'
                        : 'bg-destructive/20 text-destructive'
                    }`}>
                      {product.available ? 'Disponible' : 'Indisponible'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{product.priority}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/products/${product.id}`}
                        className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                        title="Voir détails"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteModal({ open: true, productId: product.id })}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-4 py-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Afficher:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-input bg-background rounded text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-input bg-background rounded text-sm disabled:opacity-50"
            >
              Précédent
            </button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-input bg-background rounded text-sm disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de confirmation de suppression */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, productId: null })}
        title="Confirmer la suppression"
      >
        <p className="text-sm text-foreground mb-4">
          Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setDeleteModal({ open: false, productId: null })}
            className="px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => handleDelete(deleteModal.productId)}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Products;

