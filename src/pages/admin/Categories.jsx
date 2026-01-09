import React, { useState } from 'react';
import { mockCategories } from '../../data/adminMockData';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Categories = () => {
  const [categories] = useState(mockCategories);
  const { success, error: showError } = useToast();
  
  const handleDelete = (category) => {
    if (category.productCount > 0) {
      showError('Impossible de supprimer une catégorie contenant des produits');
      return;
    }
    success('Catégorie supprimée avec succès !');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestion des Catégories</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {categories.length} catégorie(s)
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="h-5 w-5" />
          Ajouter une catégorie
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Image</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Produits</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Ordre</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm text-foreground">{category.id}</td>
                  <td className="px-4 py-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">{category.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{category.description}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{category.productCount}</td>
                  <td className="px-4 py-3 text-sm text-foreground">{category.displayOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-primary hover:bg-primary/10 rounded transition-colors">
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
      </div>
    </div>
  );
};

export default Categories;

