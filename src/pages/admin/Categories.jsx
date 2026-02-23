import React, { useState } from 'react';
import { mockCategories, mockProducts } from '../../data/adminMockData';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/common/Modal';
import { Switch } from '../../components/ui/switch';

const Categories = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPublished, setEditPublished] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const { success, error: showError } = useToast();

  const handleDelete = (category) => {
    if (category.productCount > 0) {
      showError('Impossible de supprimer une catégorie contenant des produits');
      return;
    }
    setCategories(prev => prev.filter(c => c.id !== category.id));
    success('Catégorie supprimée avec succès !');
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditPublished(category.published ?? true);
  };

  const handleSave = () => {
    if (!editName.trim()) return;
    setCategories(prev => prev.map(c =>
      c.id === editingCategory.id ? { ...c, name: editName.trim(), published: editPublished } : c
    ));
    success(`Catégorie ${editPublished ? 'publiée' : 'enregistrée en brouillon'} avec succès !`);
    setEditingCategory(null);
  };

  const handleAdd = () => {
    if (!newName.trim()) return;
    const newCategory = {
      id: Date.now(),
      name: newName.trim(),
      productCount: selectedProducts.length,
      published: isPublished,
    };
    setCategories(prev => [...prev, newCategory]);
    success(`Catégorie ${isPublished ? 'publiée' : 'enregistrée en brouillon'} avec succès !`);
    setNewName('');
    setSelectedProducts([]);
    setProductSearch('');
    setIsPublished(true);
    setIsAdding(false);
  };

  const toggleProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const filteredProducts = mockProducts.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Catégories</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {categories.length} catégorie(s)
          </p>
        </div>
        <button
          onClick={() => { setNewName(''); setIsAdding(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Ajouter une catégorie
        </button>
      </div>
      
      {/* Mobile : cards */}
      <div className="md:hidden space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-border p-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-foreground">{category.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{category.productCount} produit(s)</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => handleEdit(category)}
                className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              {category.productCount === 0 && (
                <button
                  onClick={() => handleDelete(category)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop : table */}
      <div className="hidden md:block bg-white rounded-lg shadow-md border border-border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Nom</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Produits</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b hover:bg-muted/50">
                <td className="px-4 py-3 font-medium text-foreground">{category.name}</td>
                <td className="px-4 py-3 text-sm text-foreground">{category.productCount}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    {category.productCount === 0 && (
                      <button
                        onClick={() => handleDelete(category)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modale ajout */}
      <Modal
        isOpen={isAdding}
        onClose={() => { setIsAdding(false); setSelectedProducts([]); setProductSearch(''); setIsPublished(true); }}
        title="Ajouter une catégorie"
        showCloseButton={false}
        size="lg"
      >
        <div className="space-y-5">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Nom de la catégorie <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ex : Threat Intelligence"
              className="w-full px-4 py-3 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-base"
              autoFocus
            />
          </div>

          {/* Publication */}
          <div className="flex items-center justify-between py-3 px-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Publier la catégorie</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isPublished ? 'Visible sur le site' : 'Enregistrée en brouillon'}
              </p>
            </div>
            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
          </div>

          {/* Produits associés */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">
                Produits associés
              </label>
              {selectedProducts.length > 0 && (
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {selectedProducts.length} sélectionné(s)
                </span>
              )}
            </div>

            {/* Recherche produits */}
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Filtrer les produits..."
                className="w-full pl-9 pr-4 py-2.5 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>

            {/* Liste */}
            <div className="border border-border rounded-lg overflow-y-auto max-h-52">
              {filteredProducts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Aucun produit trouvé</p>
              ) : (
                filteredProducts.map((product, idx) => (
                  <label
                    key={product.id}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors ${idx !== filteredProducts.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProduct(product.id)}
                      className="h-5 w-5 rounded border-input accent-primary flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Boutons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-1">
            <button
              onClick={() => { setIsAdding(false); setSelectedProducts([]); setProductSearch(''); setIsPublished(true); }}
              className="min-h-[44px] w-full sm:w-auto px-5 border border-input rounded-lg text-base hover:bg-muted transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleAdd}
              className="min-h-[44px] w-full sm:w-auto px-5 bg-primary text-primary-foreground rounded-lg text-base hover:bg-primary/90 transition-colors"
            >
              Ajouter
            </button>
          </div>
        </div>
      </Modal>

      {/* Modale édition */}
      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Modifier la catégorie"
        showCloseButton={false}
        size="lg"
      >
        <div className="space-y-5">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Nom de la catégorie <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="w-full px-4 py-3 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-base"
              autoFocus
            />
          </div>

          {/* Publication */}
          <div className="flex items-center justify-between py-3 px-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Publier la catégorie</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {editPublished ? 'Visible sur le site' : 'Enregistrée en brouillon'}
              </p>
            </div>
            <Switch checked={editPublished} onCheckedChange={setEditPublished} />
          </div>

          {/* Boutons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-1">
            <button
              onClick={() => setEditingCategory(null)}
              className="min-h-[44px] w-full sm:w-auto px-5 border border-input rounded-lg text-base hover:bg-muted transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="min-h-[44px] w-full sm:w-auto px-5 bg-primary text-primary-foreground rounded-lg text-base hover:bg-primary/90 transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;

