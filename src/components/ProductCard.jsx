// src/components/ProductCard.jsx

import React from 'react';
import { useCart } from '../context/CartContext.jsx';
// 1. Importa el hook 'useQuote'
import { useQuote } from '../context/QuoteContext.jsx';

// Estilos
const styles = {
  // ... (tus estilos de card, imagePlaceholder, name, price no cambian)
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px',
    width: '250px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imagePlaceholder: {
    height: '160px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
    fontSize: '14px',
    marginBottom: '12px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
  },
  price: {
    fontSize: '16px',
    color: '#333',
    margin: '0 0 12px 0',
  },
  // 2. Un div para los botones
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px', // Espacio entre botones
  },
  button: {
    padding: '10px 15px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '4px',
    background: '#007bff',
    color: 'white',
    cursor: 'pointer',
    width: '100%',
  },
  // 3. Estilo para el botón secundario (cotización)
  secondaryButton: {
    padding: '10px 15px',
    fontSize: '14px',
    border: '1px solid #007bff', // Borde azul
    borderRadius: '4px',
    background: '#fff', // Fondo blanco
    color: '#007bff', // Texto azul
    cursor: 'pointer',
    width: '100%',
  }
};

export default function ProductCard({ product }) {
  
  const { addToCart } = useCart();
  // 4. Llama al hook de cotización
  const { addToQuote } = useQuote();
  
  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} fue agregado al carrito.`);
  };

  // 5. Nueva función para agregar a cotización
  const handleAddToQuote = () => {
    addToQuote(product);
    alert(`${product.name} fue agregado a la cotización.`);
  };

  return (
    <div style={styles.card}>
      <div>
        {/* ... (imagen, nombre, precio igual que antes) ... */}
        <div style={styles.imagePlaceholder}>
          (Imagen de {product.name})
        </div>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>Q {product.price.toFixed(2)}</p>
      </div>
      
      {/* 6. Usa el buttonGroup para ambos botones */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={handleAddToCart}>
          Agregar al Carrito
        </button>
        <button style={styles.secondaryButton} onClick={handleAddToQuote}>
          Agregar a Cotización
        </button>
      </div>
    </div>
  );
}