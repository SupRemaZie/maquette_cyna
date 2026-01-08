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
} from "lucide-react"
import { useCart } from "../../context/CartContext"

const Sidebar = ({ isOpen, onClose }) => {
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
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group",
          isActive(item.path)
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="font-medium">{item.label}</span>
        {item.badge && item.badge > 0 && (
          <span className="ml-auto bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </Link>
    )
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b">
        <Link to="/" onClick={isMobile ? onClose : undefined} className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">CYNA</span>
        </Link>
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

      {/* Navigation principale */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="mb-6">
          <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation
          </h3>
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.path} item={item} onClick={isMobile ? onClose : undefined} />
            ))}
          </div>
        </div>

        {/* Compte */}
        <div className="mb-6">
          <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Compte
          </h3>
          <div className="space-y-1">
            {accountNavItems.map((item) => (
              <NavItem key={item.path} item={item} onClick={isMobile ? onClose : undefined} />
            ))}
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout()
                  if (isMobile) onClose()
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Déconnexion</span>
              </button>
            )}
          </div>
        </div>

        {/* Informations */}
        <div>
          <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Informations
          </h3>
          <div className="space-y-1">
            {infoNavItems.map((item) => (
              <NavItem key={item.path} item={item} onClick={isMobile ? onClose : undefined} />
            ))}
          </div>
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
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 bg-card border-r">
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
