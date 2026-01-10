import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Search, User, LogOut } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

const Header = ({ onSidebarToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemsCount, isAuthenticated, user, logout } = useCart();
  
  // Routes qui ne doivent pas avoir le bouton sidebar
  const noSidebarRoutes = ['/login', '/register', '/forgot-password'];
  const showSidebarTrigger = !noSidebarRoutes.includes(location.pathname);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };
  
  return (
    <header className="bg-card border-b sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-4">
            {/* Sidebar Trigger - Mobile */}
            {showSidebarTrigger && <SidebarTrigger onClick={onSidebarToggle} />}
          </div>
          
          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Rechercher un service..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </form>
          
          {/* Right side - Cart & Account */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <Link
              to="/search"
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-6 w-6" />
            </Link>
            
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Panier"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
            
            {/* Account Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Compte utilisateur"
                >
                  <User className="h-6 w-6" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 p-0">
                {isAuthenticated ? (
                  <div className="p-2">
                    <div className="px-3 py-2 border-b">
                      <p className="text-sm font-semibold text-foreground">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/account"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-sm transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Mon compte
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-sm transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-2">
                    <Link
                      to="/login"
                      className="block w-full px-3 py-2 text-sm text-center text-foreground hover:bg-accent rounded-sm transition-colors"
                    >
                      Se connecter
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full px-3 py-2 text-sm text-center text-primary hover:bg-primary/10 rounded-sm transition-colors mt-1"
                    >
                      S'inscrire
                    </Link>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Search Bar - Mobile (when focused) */}
        {isSearchFocused && (
          <form onSubmit={handleSearch} className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un service..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus
              />
            </div>
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
