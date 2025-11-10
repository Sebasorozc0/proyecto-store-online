import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useQuote } from '../context/QuoteContext.jsx';

const styles = {
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
    background: '#fff'
  },
  imageContainer: {
    height: '160px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
    fontSize: '14px',
    marginBottom: '12px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#333'
  },
  price: {
    fontSize: '16px',
    color: '#333',
    margin: '0 0 12px 0',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
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
  secondaryButton: {
    padding: '10px 15px',
    fontSize: '14px',
    border: '1px solid #007bff',
    borderRadius: '4px',
    background: '#fff',
    color: '#007bff',
    cursor: 'pointer',
    width: '100%',
  }
};

export default function ProductCard({ product }) {
  
  const { addToCart } = useCart();
  const { addToQuote } = useQuote();
  
  const itemForContext = {
    id: product.product_id,
    name: product.name,
    price: parseFloat(product.price)
  }

  const handleAddToCart = () => {
    addToCart(itemForContext);
    alert(`${itemForContext.name} fue agregado al carrito.`);
  };

  const handleAddToQuote = () => {
    addToQuote(itemForContext);
    alert(`${itemForContext.name} fue agregado a la cotización.`);
  };

  return (
    <div style={styles.card}>
      <div>
        <div style={styles.imageContainer}>
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} style={styles.image} />
          ) : (
            <span>(Imagen no disponible)</span>
          )}
        </div>
        
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>Q {product.price}</p>
      </div>
      
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