// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import CartIcon from '../components/CartIcon.jsx';
import { Link } from 'react-router-dom';

// --- DATOS DE SIMULACIÓN (MOCK DATA) ---
const DUMMY_PRODUCTS = [
  {
    id: 101,
    name: 'Laptop Pro 15"',
    price: 12500.00,
  },
  {
    id: 102,
    name: 'Smartwatch V2',
    price: 1800.00,
  },
  {
    id: 103,
    name: 'Cámara DSLR Kit',
    price: 7500.00,
  },
  {
    id: 104,
    name: 'Celular Ultra',
    price: 9000.00,
  }
];

// Estilos para la página de inicio
const styles = {
  header: {
    padding: '20px',
    background: '#333', // Un fondo oscuro como el de tu imagen
    color: '#FFFFFF', // Texto blanco
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
    gap: '20px', // Espacio entre links
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
    background: '#222', // Fondo oscuro para el contenido
    minHeight: '80vh', // Asegura que la página no esté vacía si carga lento
  },
  adminLink: {
    textDecoration: 'none',
    color: '#FFFFFF', // Texto blanco
    fontSize: '14px',
    fontWeight: 'bold',
  }
};


export default function HomePage() {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simular la carga de productos para la tienda
  useEffect(() => {
    setTimeout(() => {
      setProducts(DUMMY_PRODUCTS);
      setLoading(false);
    }, 500);
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
          // ¡ESTA ES LA LÍNEA IMPORTANTE!
          <p style={{ color: 'white' }}>Cargando productos...</p>
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}