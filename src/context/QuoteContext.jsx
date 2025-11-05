// src/context/QuoteContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Crear el contexto para la cotización
const QuoteContext = createContext();

// 2. Hook personalizado para usar el contexto
export const useQuote = () => {
  return useContext(QuoteContext);
};

// 3. Crear el Proveedor
export function QuoteProvider({ children }) {
  
  // 4. Aquí vive el estado de la cotización
  const [quoteItems, setQuoteItems] = useState([]);

  // 5. Función para agregar un producto a la cotización
  const addToQuote = (productToAdd) => {
    setQuoteItems((prevItems) => {
      // Revisa si el item ya está para evitar duplicados
      const exists = prevItems.find(item => item.id === productToAdd.id);
      if (exists) {
        alert("Este producto ya está en su cotización.");
        return prevItems;
      }
      console.log('Agregando a cotización:', productToAdd);
      return [...prevItems, productToAdd];
    });
  };

  // 6. Prepara el valor a compartir
  const value = {
    quoteItems,
    addToQuote,
  };

  // 7. Retorna el Proveedor
  return (
    <QuoteContext.Provider value={value}>
      {children}
    </QuoteContext.Provider>
  );
}