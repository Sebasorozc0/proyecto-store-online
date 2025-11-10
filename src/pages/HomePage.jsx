import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import CartIcon from '../components/CartIcon.jsx';
import { Link } from 'react-router-dom';

const styles = {
  header: {
    padding: '20px',
    background: '#333', 
    color: '#FFFFFF', 
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px', 
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
    background: '#222', 
    minHeight: '80vh', 
  },
  adminLink: {
    textDecoration: 'none',
    color: '#FFFFFF', 
    fontSize: '14px',
    fontWeight: 'bold',
  }
};


export default function HomePage() {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://store-online-sa-backend.onrender.com/api/products')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("¡Error al conectar con el backend!", error);
        setLoading(false);
      });
  }, []); 

  return (
    <div>
      <header style={styles.header}>
        <h1 style={styles.title}>Store Online S.A.</h1>
        
        <div style={styles.headerControls}>
          <Link to="/admin" style={styles.adminLink}>
            Ir al Panel de Admin &rarr;
          </Link>
          
          <Link to="/cotizacion" style={styles.adminLink}>
            Cotización
          </Link>

          <CartIcon />
        </div>

      </header>
      
      <div style={styles.productList}>
        {loading ? (
          <p style={{ color: 'white' }}>Cargando productos desde el servidor...</p>
        ) : (
          products.map(product => (
            <ProductCard key={product.product_id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}