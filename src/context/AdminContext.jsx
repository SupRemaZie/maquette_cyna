import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('cyna_admin_auth') === 'true';
  });
  
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('cyna_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    // Credentials de démo
    if (email === 'admin@cyna-it.fr' && password === 'Admin123!') {
      const adminData = {
        id: 1,
        email: 'admin@cyna-it.fr',
        name: 'Administrateur CYNA',
        role: 'superadmin',
      };
      setIsAuthenticated(true);
      setAdmin(adminData);
      localStorage.setItem('cyna_admin_auth', 'true');
      localStorage.setItem('cyna_admin_user', JSON.stringify(adminData));
      return { success: true };
    }
    return { success: false, error: 'Identifiants incorrects' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
    localStorage.removeItem('cyna_admin_auth');
    localStorage.removeItem('cyna_admin_user');
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

