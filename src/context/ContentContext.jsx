import React, { createContext, useContext, useState } from 'react';
import { mockHomeContent } from '../data/adminMockData';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [banner, setBanner] = useState(mockHomeContent.banner);

  return (
    <ContentContext.Provider value={{ banner, setBanner }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
