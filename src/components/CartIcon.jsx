// src/components/CartIcon.jsx

import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

// Estilos
const styles = {
  link: {
    textDecoration: 'none',
    // 1. FORZAMOS EL COLOR A BLANCO
    color: '#FFFFFF', 
    fontWeight: 'bold', // Lo ponemos en negrita para que resalte
  },
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '5px' 
  },
  count: { 
    background: '#dc3545', // Círculo rojo
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px',
    fontWeight: 'bold',
  }
};

export default function CartIcon() {
  const { cartItems } = useCart();

  return (
    <Link to="/carrito" style={styles.link}>
      <div style={styles.container}>
        {/* 2. Reemplazamos el <span> con el emoji por texto simple */}
        <span>Carrito</span>
        
        {/* 3. El contador sigue igual */}
        {cartItems.length > 0 && (
          <span style={styles.count}>
            {cartItems.length}
          </span>
        )}
      </div>
    </Link>
  );
}