import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cyna_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('cyna_auth') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('cyna_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  useEffect(() => {
    localStorage.setItem('cyna_cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product, subscriptionType = 'monthly', quantity = 1) => {
    const maxQty = product.licensesRemaining ?? Infinity;
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.productId === product.id && item.subscriptionType === subscriptionType
      );

      if (existingItem) {
        const newQty = Math.min(existingItem.quantity + quantity, maxQty);
        return prevCart.map(item =>
          item.productId === product.id && item.subscriptionType === subscriptionType
            ? { ...item, quantity: newQty }
            : item
        );
      }

      const cappedQty = Math.min(quantity, maxQty);
      if (cappedQty <= 0) return prevCart;

      return [
        ...prevCart,
        {
          productId: product.id,
          product: product,
          subscriptionType,
          quantity: cappedQty,
          price: product.price[subscriptionType],
        },
      ];
    });
  };
  
  const removeFromCart = (productId, subscriptionType) => {
    setCart(prevCart =>
      prevCart.filter(
        item => !(item.productId === productId && item.subscriptionType === subscriptionType)
      )
    );
  };
  
  const updateCartItem = (productId, subscriptionType, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, subscriptionType);
      return;
    }

    setCart(prevCart => {
      const item = prevCart.find(i => i.productId === productId && i.subscriptionType === subscriptionType);
      const maxQty = item?.product?.licensesRemaining ?? Infinity;
      const cappedQty = Math.min(quantity, maxQty);
      return prevCart.map(i =>
        i.productId === productId && i.subscriptionType === subscriptionType
          ? { ...i, quantity: cappedQty }
          : i
      );
    });
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  
  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('cyna_auth', 'true');
    localStorage.setItem('cyna_user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('cyna_auth');
    localStorage.removeItem('cyna_user');
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
