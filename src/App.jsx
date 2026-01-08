import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/ui/sidebar';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Account from './pages/Account';
import Contact from './pages/Contact';
import CGU from './pages/CGU';
import MentionsLegales from './pages/MentionsLegales';
import About from './pages/About';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-background">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex-1 flex flex-col lg:pl-64">
            <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/account" element={<Account />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cgu" element={<CGU />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
