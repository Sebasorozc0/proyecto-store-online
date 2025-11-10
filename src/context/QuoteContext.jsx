import React, { createContext, useState, useContext } from 'react';

const QuoteContext = createContext();

export const useQuote = () => {
  return useContext(QuoteContext);
};

export function QuoteProvider({ children }) {
  
  const [quoteItems, setQuoteItems] = useState([]);

  const addToQuote = (productToAdd) => {
    setQuoteItems((prevItems) => {
      const exists = prevItems.find(item => item.id === productToAdd.id);
      if (exists) {
        alert("Este producto ya está en su cotización.");
        return prevItems;
      }
      return [...prevItems, productToAdd];
    });
  };

  const value = {
    quoteItems,
    addToQuote,
  };

  return (
    <QuoteContext.Provider value={value}>
      {children}
    </QuoteContext.Provider>
  );
}