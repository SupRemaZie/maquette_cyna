import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';
import { useProducts } from '../context/ProductsContext';
import Button from '../components/common/Button';
import { Info, AlertTriangle } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerVisible, setBannerVisible] = useState(false);
  const { addToCart } = useCart();
  const { banner, carousel, staticText, featuredProducts } = useContent();
  const { clientProducts } = useProducts();

  /* Animation banderole */
  useEffect(() => {
    if (banner.enabled && banner.message) {
      setBannerVisible(false);
      const t = setTimeout(() => setBannerVisible(true), 150);
      return () => clearTimeout(t);
    } else {
      setBannerVisible(false);
    }
  }, [banner.enabled, banner.message]);

  /* Auto-avance carrousel */
  useEffect(() => {
    if (carousel.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carousel.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carousel.length]);

  /* Réinitialise l'index si le nombre de slides diminue */
  useEffect(() => {
    setCurrentSlide(0);
  }, [carousel.length]);

  /* Top produits : IDs depuis ContentContext, données depuis ProductsContext */
  const topProducts = featuredProducts
    .map(fid => clientProducts.find(p => p.id === fid))
    .filter(Boolean);

  return (
    <div className="min-h-screen">

      {/* ── Carrousel ── */}
      <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
        {carousel.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-3xl">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                    {slide.title}
                  </h2>
                  {slide.text && (
                    <p className="text-sm md:text-lg mb-4 md:mb-6">{slide.text}</p>
                  )}
                  {slide.ctaText && slide.link && (
                    <Link to={slide.link}>
                      <Button variant="accent" size="lg">
                        {slide.ctaText}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Indicateurs */}
        {carousel.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 items-center">
            {carousel.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/60 w-3'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Banderole ── */}
      {banner.enabled && banner.message && (
        <div
          className={`overflow-hidden transition-all duration-700 ease-out ${
            bannerVisible ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`flex items-center gap-3 px-4 py-3 text-sm font-medium ${
            banner.type === 'alert' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
          }`}>
            {banner.type === 'alert'
              ? <AlertTriangle className="h-4 w-4 flex-shrink-0 animate-pulse" />
              : <Info className="h-4 w-4 flex-shrink-0" />
            }
            <div className="flex-1 overflow-hidden">
              <p className="whitespace-nowrap animate-marquee">{banner.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container-custom py-8 md:py-12">

        {/* ── Texte fixe ── */}
        {staticText && (
          <section className="mb-12 text-center">
            <div
              className="prose prose-lg max-w-3xl mx-auto text-gray-600 [&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900"
              dangerouslySetInnerHTML={{ __html: staticText }}
            />
          </section>
        )}

        {/* ── Catégories ── */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Nos Catégories</h2>
            <Link
              to="/catalogue"
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm md:text-base flex items-center gap-2"
            >
              Voir tout le catalogue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative h-36 md:h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-white font-semibold text-sm md:text-base">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Top Produits ── */}
        {topProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
              Top Services du moment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {topProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
