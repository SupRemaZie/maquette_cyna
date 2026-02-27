import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';
import { Search, User, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { cn } from '../../lib/utils';

const Header = ({ onSidebarToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemsCount, isAuthenticated, user, logout } = useCart();
  const { login: adminLogin, isAuthenticated: isAdminAuthenticated } = useAdmin();

  const isAdminUser = user?.email === 'admin@cyna-it.fr';

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Catalogue', path: '/catalogue' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSwitchToAdmin = () => {
    if (!isAdminAuthenticated) {
      adminLogin('admin@cyna-it.fr', 'Admin123!');
    }
    navigate('/admin/dashboard');
  };

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

          {/* Left: Mobile trigger + Desktop Logo + Desktop Nav */}
          <div className="flex items-center gap-3">
            {showSidebarTrigger && <SidebarTrigger onClick={onSidebarToggle} />}

            {/* Logo - Desktop seulement */}
            <Link to="/" className="hidden lg:flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CYNA</span>
            </Link>

            {/* Nav links - Desktop */}
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
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

          {/* Right: Cart & Account */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <Link
              to="/search"
              className="md:hidden p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Rechercher"
            >
              <Search className="h-6 w-6" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
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
                  className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
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
                        className="flex items-center gap-2 px-3 py-2 min-h-[44px] text-sm text-foreground hover:bg-accent rounded-sm transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Mon compte
                      </Link>
                      {isAdminUser && (
                        <button
                          onClick={handleSwitchToAdmin}
                          className="w-full flex items-center gap-2 px-3 py-2 min-h-[44px] text-sm text-primary hover:bg-primary/10 rounded-sm transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Basculer en admin
                        </button>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 min-h-[44px] text-sm text-foreground hover:bg-accent rounded-sm transition-colors"
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
