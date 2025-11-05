// src/context/CartContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
// Esto es como crear un "canal" de datos global.
const CartContext = createContext();

// 2. Crear un Hook personalizado (opcional pero recomendado)
// Esto nos da un atajo fácil (useCart()) para acceder al contexto
// en lugar de usar useContext(CartContext) cada vez.
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Crear el "Proveedor" (Provider)
// Este es el componente que envolverá nuestra app y "proveerá"
// el estado del carrito y las funciones a todos sus hijos.
export function CartProvider({ children }) {
  
  // 4. Aquí vive el estado del carrito
  const [cartItems, setCartItems] = useState([]);

  // 5. Función para agregar un producto al carrito
  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      // Lógica simple: solo agrega el producto al array
      // (Una app real revisaría si el producto ya existe y 
      // en su lugar aumentaría la cantidad)
      console.log('Agregando al carrito:', productToAdd);
      return [...prevItems, productToAdd];
    });
  };

  // 6. Prepara el "valor" que se compartirá
  // Cualquier componente hijo podrá acceder a 'cartItems' y 'addToCart'
  const value = {
    cartItems,
    addToCart,
  };

  // 7. Retorna el Proveedor con el valor y los componentes hijos
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}