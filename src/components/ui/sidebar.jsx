import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { ShoppingBag, X, Shield, Mail, Home, Menu } from "lucide-react"

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const mainNavItems = [
    { icon: Home, label: "Accueil", path: "/" },
    { icon: ShoppingBag, label: "Catalogue", path: "/catalogue" },
  ]

  const infoNavItems = [
    { icon: Mail, label: "Contact", path: "/contact" },
  ]

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

  const NavItem = ({ item }) => {
    const Icon = item.icon
    return (
      <Link
        to={item.path}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
          isActive(item.path)
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span className="font-medium">{item.label}</span>
      </Link>
    )
  }

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
          "fixed top-0 left-0 h-full w-[85vw] max-w-xs sm:w-64 bg-card border-r z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b">
            <Link to="/" onClick={onClose} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CYNA</span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Navigation
            </h3>
            <div className="space-y-1 mb-6">
              {mainNavItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
            <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Informations
            </h3>
            <div className="space-y-1">
              {infoNavItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}

export const SidebarTrigger = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-3 min-h-[44px] min-w-[44px] rounded-lg hover:bg-accent transition-colors flex items-center justify-center"
      aria-label="Ouvrir le menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  )
}

export default Sidebar
