// src/pages/CartPage.jsx

import React from 'react';
// 1. Importa el hook 'useCart'
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

// Estilos para la página del carrito
const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    borderBottom: '2px solid #f4f4f4',
    paddingBottom: '10px'
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '15px 0',
  },
  itemDetails: {
    flex: 1, // Ocupa el espacio disponible
    padding: '0 15px'
  },
  itemName: {
    fontSize: '18px',
    margin: '0 0 10px 0'
  },
  itemPrice: {
    fontSize: '16px',
    color: '#555'
  },
  cartTotal: {
    marginTop: '20px',
    textAlign: 'right',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '30px'
  },
  backLink: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#007bff',
    textDecoration: 'none'
  }
};

export default function CartPage() {
  // 2. Llama al hook para obtener los items del carrito
  const { cartItems } = useCart();

  // 3. Calcula el total
  // Usamos .reduce() para sumar el precio de todos los items
  const total = cartItems.reduce((acc, currentItem) => {
    return acc + currentItem.price;
  }, 0); // El 0 es el valor inicial

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tu Carrito de Compras</h1>

      {/* 4. Comprueba si el carrito está vacío */}
      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <p>Tu carrito está vacío.</p>
          <Link to="/" style={styles.backLink}>&larr; Volver a la tienda</Link>
        </div>
      ) : (
        <div>
          {/* 5. Muestra cada item del carrito */}
          {cartItems.map((item) => (
            <div style={styles.cartItem} key={item.id}>
              {/* Aquí iría la imagen */}
              <div style={{ width: '80px', height: '80px', background: '#eee' }}></div>
              
              <div style={styles.itemDetails}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>Q {item.price.toFixed(2)}</p>
              </div>
              
              {/* Aquí podrías agregar un botón para "Eliminar" */}
              <button style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                Eliminar
              </button>
            </div>
          ))}

          {/* 6. Muestra el total */}
          <div style={styles.cartTotal}>
            Total: Q {total.toFixed(2)}
          </div>
          
          <Link to="/" style={styles.backLink}>&larr; Seguir comprando</Link>
        </div>
      )}
    </div>
  );
}