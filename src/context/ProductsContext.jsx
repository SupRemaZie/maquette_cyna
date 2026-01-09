import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts } from '../data/adminMockData';

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    // Charger depuis localStorage ou utiliser les données mockées
    const saved = localStorage.getItem('cyna_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Erreur lors du chargement des produits:', e);
        return mockProducts;
      }
    }
    return mockProducts;
  });

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('cyna_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(), // Générer un ID unique
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    setProducts(prev => prev.map(product => 
      product.id === id
        ? { ...product, ...productData, updatedAt: new Date().toISOString() }
        : product
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const deleteProducts = (ids) => {
    setProducts(prev => prev.filter(product => !ids.includes(product.id)));
  };

  const getProduct = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const resetProducts = () => {
    setProducts(mockProducts);
    localStorage.setItem('cyna_products', JSON.stringify(mockProducts));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        deleteProducts,
        getProduct,
        resetProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

