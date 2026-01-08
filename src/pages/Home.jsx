import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carouselSlides, homePresentation, categories, products } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  
  // Top produits (les 6 premiers)
  const topProducts = products.slice(0, 6);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="min-h-screen">
      {/* Carrousel */}
      <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
        {carouselSlides.map((slide, index) => (
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
                  <p className="text-lg md:text-2xl mb-2 md:mb-4">{slide.subtitle}</p>
                  <p className="text-sm md:text-lg mb-4 md:mb-6">{slide.description}</p>
                  <Link to={slide.ctaLink}>
                    <Button variant="accent" size="lg">
                      {slide.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicateurs */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="container-custom py-8 md:py-12">
        {/* Texte de présentation */}
        <section className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {homePresentation.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {homePresentation.content}
          </p>
        </section>
        
        {/* Catégories */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Nos Catégories
            </h2>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative h-32 md:h-48 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-white font-semibold text-sm md:text-base">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Top Produits */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
            Top Produits du moment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
