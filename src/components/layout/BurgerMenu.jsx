import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useCart();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };
  
  const menuItemsAuthenticated = [
    { label: 'Mes paramètres', link: '/account' },
    { label: 'Mes commandes', link: '/account?tab=orders' },
    { label: 'CGU', link: '/cgu' },
    { label: 'Mentions légales', link: '/mentions-legales' },
    { label: 'Contact', link: '/contact' },
    { label: 'À propos', link: '/about' },
  ];
  
  const menuItemsUnauthenticated = [
    { label: 'Se connecter', link: '/login' },
    { label: "S'inscrire", link: '/register' },
    { label: 'CGU', link: '/cgu' },
    { label: 'Mentions légales', link: '/mentions-legales' },
    { label: 'Contact', link: '/contact' },
    { label: 'À propos', link: '/about' },
  ];
  
  const menuItems = isAuthenticated ? menuItemsAuthenticated : menuItemsUnauthenticated;
  
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-primary-600 focus:outline-none"
        aria-label="Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-16 md:top-20 right-0 w-64 bg-white shadow-xl z-50 h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.link}>
                    <Link
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {isAuthenticated && (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Se déconnecter
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default BurgerMenu;
