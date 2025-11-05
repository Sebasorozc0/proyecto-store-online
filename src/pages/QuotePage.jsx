// src/pages/QuotePage.jsx

import React, { useState } from 'react';
// 1. Importa el hook 'useQuote'
import { useQuote } from '../context/QuoteContext.jsx';
import { Link } from 'react-router-dom';

// Estilos (similares al carrito, pero con un formulario)
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
  quoteItem: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '15px 0',
  },
  itemDetails: {
    flex: 1,
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
  quoteTotal: {
    marginTop: '20px',
    textAlign: 'right',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  emptyQuote: {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '30px'
  },
  backLink: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#007bff',
    textDecoration: 'none'
  },
  // --- Estilos para el formulario de registro ---
  formContainer: {
    marginTop: '40px',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
  },
  formInput: {
    width: '300px',
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  formButton: {
    padding: '10px 15px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    background: '#28a745',
    color: 'white',
    cursor: 'pointer',
  }
};

export default function QuotePage() {
  // 2. Llama al hook para obtener los items de la cotización
  const { quoteItems } = useQuote();
  const [email, setEmail] = useState('');

  // 3. Calcula el total de la cotización
  const total = quoteItems.reduce((acc, currentItem) => {
    return acc + currentItem.price;
  }, 0);

  // 4. Manejador para el formulario de email
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Por favor, ingresa un correo válido.');
      return;
    }
    // Simulación de registro
    console.log(`Simulación: Registrando email ${email} para promociones.`);
    alert(`¡Gracias por registrarte! Te enviaremos promociones a ${email} (simulación).`);
    setEmail(''); // Limpia el campo
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mi Cotización</h1>

      {/* 5. Comprueba si la cotización está vacía */}
      {quoteItems.length === 0 ? (
        <div style={styles.emptyQuote}>
          <p>No tienes productos en tu cotización.</p>
          <Link to="/" style={styles.backLink}>&larr; Volver a la tienda</Link>
        </div>
      ) : (
        <div>
          {/* 6. Muestra cada item de la cotización */}
          {quoteItems.map((item) => (
            <div style={styles.quoteItem} key={item.id}>
              <div style={{ width: '80px', height: '80px', background: '#eee' }}></div>
              <div style={styles.itemDetails}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>Q {item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div style={styles.quoteTotal}>
            Total (Cotización): Q {total.toFixed(2)}
          </div>
          <Link to="/" style={styles.backLink}>&larr; Seguir cotizando</Link>
        </div>
      )}

      {/* --- 7. Formulario de Registro de Email --- */}
      <div style={styles.formContainer}>
        <h3>Recibe Promociones</h3>
        <p>Regístrate con tu correo electrónico para recibir promociones.</p> 
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="tu.correo@ejemplo.com"
            style={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" style={styles.formButton}>
            Registrarme
          </button>
        </form>
      </div>

    </div>
  );
}