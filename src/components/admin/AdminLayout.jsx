import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Users,
  FileText,
  MessageSquare,
  Bot,
  Settings,
  Shield,
  Search,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { mockOrders, mockMessages, mockChatbotConversations } from '../../data/adminMockData';

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const unreadMessages = mockMessages.filter(m => m.status === 'Non lu').length;
  const newOrders = mockOrders.filter(o => o.status === 'En attente').length;
  const escalatedChats = mockChatbotConversations.filter(c => c.escalated).length;
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', badge: null },
    { icon: Package, label: 'Produits', path: '/admin/products', badge: null },
    { icon: Tag, label: 'Catégories', path: '/admin/categories', badge: null },
    { icon: ShoppingCart, label: 'Commandes', path: '/admin/orders', badge: newOrders },
    { icon: Users, label: 'Utilisateurs', path: '/admin/users', badge: null },
    { icon: FileText, label: 'Contenu', path: '/admin/content', badge: null },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages', badge: unreadMessages },
    { icon: Bot, label: 'Chatbot', path: '/admin/chatbot', badge: escalatedChats },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings', badge: null },
  ];
  
  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">CYNA</span>
                <span className="text-xs text-muted-foreground block">Admin</span>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium flex-1">{item.label}</span>
                  {item.badge !== null && item.badge > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

const AdminHeader = ({ onMenuToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  const pageTitles = {
    '/admin/dashboard': 'Dashboard',
    '/admin/products': 'Produits',
    '/admin/categories': 'Catégories',
    '/admin/orders': 'Commandes',
    '/admin/users': 'Utilisateurs',
    '/admin/content': 'Contenu',
    '/admin/messages': 'Messages',
    '/admin/chatbot': 'Chatbot',
    '/admin/settings': 'Paramètres',
  };
  
  const currentPageTitle = pageTitles[location.pathname] || 'Dashboard';
  
  const notifications = [
    { id: 1, type: 'order', message: 'Nouvelle commande CMD-000123', time: 'Il y a 5 min' },
    { id: 2, type: 'message', message: 'Nouveau message de contact', time: 'Il y a 15 min' },
    { id: 3, type: 'chatbot', message: 'Conversation escaladée', time: 'Il y a 1h' },
  ];
  
  return (
    <header className="bg-card border-b sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-foreground">{currentPageTitle}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-64 pl-10 pr-4 py-2 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
            </div>
            
            {/* Notifications */}
            <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <PopoverTrigger asChild>
                <button
                  className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <div className="p-2">
                  <div className="px-3 py-2 border-b">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="px-3 py-2 hover:bg-accent transition-colors cursor-pointer"
                        >
                          <p className="text-sm text-foreground">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                        Aucune notification
                      </div>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Profile */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label="Profil"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-foreground">
                    {admin?.name || 'Admin'}
                  </span>
                  <ChevronRight className="hidden md:block h-4 w-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 p-0">
                <div className="p-2">
                  <div className="px-3 py-2 border-b">
                    <p className="text-sm font-semibold text-foreground">{admin?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{admin?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-sm transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Mon profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-destructive/10 hover:text-destructive rounded-sm transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:pl-64">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

