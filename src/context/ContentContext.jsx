import React, { createContext, useContext, useState } from 'react';
import { mockHomeContent } from '../data/adminMockData';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [banner, setBanner] = useState(mockHomeContent.banner);
  const [carousel, setCarousel] = useState(
    [...mockHomeContent.carousel].sort((a, b) => a.order - b.order)
  );
  const [staticText, setStaticText] = useState(mockHomeContent.staticText);
  const [featuredProducts, setFeaturedProducts] = useState(mockHomeContent.featuredProducts);

  return (
    <ContentContext.Provider value={{
      banner, setBanner,
      carousel, setCarousel,
      staticText, setStaticText,
      featuredProducts, setFeaturedProducts,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
