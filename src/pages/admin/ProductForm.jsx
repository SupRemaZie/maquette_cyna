import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, X, Plus } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { useProducts } from '../../context/ProductsContext';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { getProduct, addProduct, updateProduct } = useProducts();
  const { success, error: showError } = useToast();
  
  const existingProduct = isEdit ? getProduct(id) : null;
  
  const [formData, setFormData] = useState({
    name: existingProduct?.name || '',
    category: existingProduct?.category || 'EDR',
    shortDescription: existingProduct?.shortDescription || '',
    fullDescription: existingProduct?.fullDescription || '',
    features: existingProduct?.features || [''],
    priceMonthly: existingProduct?.priceMonthly || '',
    priceYearly: existingProduct?.priceYearly || '',
    available: existingProduct?.available ?? true,
    priority: existingProduct?.priority || 0,
    images: existingProduct?.images || [],
  });
  
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState(existingProduct?.images || []);
  
  const categories = ['EDR', 'XDR', 'SOC', 'Threat Intelligence', 'SIEM'];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };
  
  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ''],
    }));
  };
  
  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index),
      }));
    }
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imagePreviews.length > 4) {
      alert('Maximum 4 images autorisées');
      return;
    }
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result],
        }));
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'La description courte est requise';
    } else if (formData.shortDescription.length > 200) {
      newErrors.shortDescription = 'Maximum 200 caractères';
    }
    
    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = 'La description complète est requise';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'Au moins une image est requise';
    }
    
    if (!formData.priceMonthly || parseFloat(formData.priceMonthly) <= 0) {
      newErrors.priceMonthly = 'Le prix mensuel doit être supérieur à 0';
    }
    
    if (!formData.priceYearly || parseFloat(formData.priceYearly) <= 0) {
      newErrors.priceYearly = 'Le prix annuel doit être supérieur à 0';
    }
    
    if (formData.features.filter(f => f.trim()).length === 0) {
      newErrors.features = 'Au moins une caractéristique est requise';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      showError('Veuillez corriger les erreurs dans le formulaire');
      return;
    }
    
    // Préparer les données du produit
    const productData = {
      name: formData.name.trim(),
      category: formData.category,
      shortDescription: formData.shortDescription.trim(),
      fullDescription: formData.fullDescription.trim(),
      features: formData.features.filter(f => f.trim()),
      priceMonthly: parseFloat(formData.priceMonthly),
      priceYearly: parseFloat(formData.priceYearly),
      available: formData.available,
      priority: parseInt(formData.priority) || 0,
      images: formData.images,
    };
    
    // Sauvegarder le produit
    if (isEdit) {
      updateProduct(parseInt(id), productData);
      success('Produit modifié avec succès !');
    } else {
      addProduct(productData);
      success('Produit créé avec succès !');
    }
    
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
            to={isEdit ? `/admin/products/${id}` : '/admin/products'}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {isEdit ? 'Modifier le produit' : 'Nouveau produit'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isEdit ? `ID: ${id}` : 'Remplissez le formulaire pour créer un nouveau produit'}
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Images */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Images (max 4)</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagePreviews.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {imagePreviews.length < 4 && (
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Ajouter</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {errors.images && (
              <p className="text-sm text-destructive">{errors.images}</p>
            )}
          </div>
        </div>
        
        {/* Informations principales */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-border space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Informations principales</h3>
          
          <Input
            label="Nom du service *"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Catégorie *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description courte * (max 200 caractères)
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={3}
              maxLength={200}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
                errors.shortDescription ? 'border-destructive' : 'border-input'
              }`}
            />
            <div className="flex justify-between mt-1">
              {errors.shortDescription && (
                <p className="text-sm text-destructive">{errors.shortDescription}</p>
              )}
              <p className="text-xs text-muted-foreground ml-auto">
                {formData.shortDescription.length}/200
              </p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description complète *
            </label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring ${
                errors.fullDescription ? 'border-destructive' : 'border-input'
              }`}
            />
            {errors.fullDescription && (
              <p className="text-sm text-destructive mt-1">{errors.fullDescription}</p>
            )}
          </div>
        </div>
        
        {/* Caractéristiques */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Caractéristiques techniques *</h3>
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-2 px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded transition-colors"
            >
              <Plus className="h-4 w-4" />
              Ajouter
            </button>
          </div>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Caractéristique..."
                  className="flex-1 px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.features && (
              <p className="text-sm text-destructive">{errors.features}</p>
            )}
          </div>
        </div>
        
        {/* Prix et disponibilité */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-border space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Prix et disponibilité</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prix mensuel (€) *"
              type="number"
              name="priceMonthly"
              value={formData.priceMonthly}
              onChange={handleChange}
              error={errors.priceMonthly}
              min="0"
              step="0.01"
              required
            />
            
            <Input
              label="Prix annuel (€) *"
              type="number"
              name="priceYearly"
              value={formData.priceYearly}
              onChange={handleChange}
              error={errors.priceYearly}
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Disponibilité
              </label>
              <p className="text-xs text-muted-foreground">
                Le produit sera visible sur le site si disponible
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Priorité d'affichage (0-100)
            </label>
            <input
              type="number"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Plus le nombre est élevé, plus le produit apparaîtra en premier
            </p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            to={isEdit ? `/admin/products/${id}` : '/admin/products'}
            className="px-4 py-2 border border-input bg-background rounded-lg hover:bg-accent transition-colors"
          >
            Annuler
          </Link>
          <Button type="submit" variant="primary">
            {isEdit ? 'Enregistrer les modifications' : 'Créer le produit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

