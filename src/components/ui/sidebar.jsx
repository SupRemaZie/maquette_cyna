import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  Search,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Lock,
  Eye,
  FileText,
  Mail,
  Info,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useCart } from "../../context/CartContext"

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation()
  const { isAuthenticated, logout, getCartItemsCount } = useCart()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const mainNavItems = [
    { icon: Home, label: "Accueil", path: "/" },
    { icon: ShoppingBag, label: "Catalogue", path: "/category/edr" },
  ]

  const accountNavItems = isAuthenticated
    ? [
        { icon: User, label: "Mon compte", path: "/account" },
        { icon: Settings, label: "Paramètres", path: "/account?tab=profile" },
      ]
    : [
        { icon: User, label: "Connexion", path: "/login" },
        { icon: User, label: "Inscription", path: "/register" },
      ]

  const infoNavItems = [
    { icon: Mail, label: "Contact", path: "/contact" },
  ]

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  const NavItem = ({ item, onClick }) => {
    const Icon = item.icon
    return (
      <Link
        to={item.path}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 rounded-lg transition-colors group relative",
          isCollapsed ? "px-3 py-3 justify-center" : "px-4 py-3",
          isActive(item.path)
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
        title={isCollapsed ? item.label : undefined}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && (
          <>
            <span className="font-medium">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="ml-auto bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </>
        )}
        {isCollapsed && item.badge && item.badge > 0 && (
          <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </Link>
    )
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center border-b",
        isCollapsed ? "justify-center p-4" : "justify-between p-6"
      )}>
        <Link 
          to="/" 
          onClick={isMobile ? onClose : undefined} 
          className={cn(
            "flex items-center gap-2",
            isCollapsed && "justify-center"
          )}
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-foreground">CYNA</span>
          )}
        </Link>
        {!isMobile && !isCollapsed && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Réduire la sidebar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {/* Bouton pour étendre si collapsed */}
      {!isMobile && isCollapsed && onToggleCollapse && (
        <div className="p-2 border-b">
          <button
            onClick={onToggleCollapse}
            className="w-full p-2 rounded-lg hover:bg-accent transition-colors flex items-center justify-center"
            aria-label="Étendre la sidebar"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Navigation principale */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {!isCollapsed && (
          <div className="mb-6">
            <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </h3>
          </div>
        )}
        <div className={cn("space-y-1", isCollapsed && "mb-6")}>
          {mainNavItems.map((item) => (
            <NavItem key={item.path} item={item} onClick={isMobile ? onClose : undefined} />
          ))}
        </div>

        {/* Compte */}
        {!isCollapsed && (
          <div className="mb-6">
            <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Compte
            </h3>
          </div>
        )}
        <div className={cn("space-y-1", isCollapsed && "mb-6")}>
          {accountNavItems.map((item) => (
            <NavItem key={item.path} item={item} onClick={isMobile ? onClose : undefined} />
          ))}
          {isAuthenticated && (
            <button
              onClick={() => {
                logout()
                if (isMobile) onClose()
              }}
              className={cn(
                "w-full flex items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
                isCollapsed ? "px-3 py-3 justify-center" : "px-4 py-3 gap-3"
              )}
              title={isCollapsed ? "Déconnexion" : undefined}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">Déconnexion</span>}
            </button>
          )}
        </div>

        {/* Informations */}
        {!isCollapsed && (
          <div>
            <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Informations
            </h3>
          </div>
        )}
        <div className="space-y-1">
          {infoNavItems.map((item) => (
            <NavItem key={item.path} item={item} onClick={isMobile ? onClose : undefined} />
          ))}
        </div>
      </nav>
    </div>
  )

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        <aside
          className={cn(
            "fixed top-0 left-0 h-full w-64 bg-card border-r z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </aside>
      </>
    )
  }

  return (
    <aside className={cn(
      "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 bg-card border-r transition-all duration-300",
      isCollapsed ? "lg:w-16" : "lg:w-64"
    )}>
      {sidebarContent}
    </aside>
  )
}

export const SidebarTrigger = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
      aria-label="Ouvrir le menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  )
}

export default Sidebar
