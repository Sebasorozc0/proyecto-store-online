// src/components/StockInput.jsx

import React, { useState } from 'react';

// Estilos
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 0',
    borderBottom: '1px solid #000000ff'
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px',
    fontSize: '13px'
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: '60px',
    padding: '4px',
    border: '1px solid #23276eff',
    borderRadius: '4px',
    textAlign: 'right',
    marginRight: '5px'
  },
  // Estilos dinámicos para el botón
  button: (loading, success) => ({
    padding: '4px 8px',
    fontSize: '12px',
    border: 'none',
    borderRadius: '4px',
    // Cambia de color si está cargando, si tuvo éxito o si es normal
    background: success ? '#28a745' : (loading ? '#6c757d' : '#007bff'),
    color: 'white',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'background 0.3s ease'
  })
};

export default function StockInput({ storeId, storeName, initialStock, productId }) {
  
  const [stock, setStock] = useState(initialStock);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Nuevo estado para feedback visual

  const handleUpdate = async () => {
    setLoading(true);
    setSuccess(false); // Resetea el estado de éxito

    try {
      const token = localStorage.getItem('token'); // Obtenemos el token

      const response = await fetch('https://store-online-sa-backend.onrender.com/api/stock/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Es buena práctica enviar el token, aunque el backend aún no lo exija
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: productId,
          storeId: storeId,
          newStock: parseInt(stock)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar');
      }

      // ¡ÉXITO!
      setSuccess(true);
      // Después de 2 segundos, quitamos el estado de "éxito" para volver al botón azul
      setTimeout(() => setSuccess(false), 2000);

    } catch (error) {
      alert(`Error: ${error.message}`);
      setStock(initialStock); // Revierte el cambio si falló
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <span style={styles.label}>{storeName}:</span>
      <div style={styles.inputContainer}>
        <input 
          type="number" 
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={styles.input}
          min="0"
        />
        <button 
          onClick={handleUpdate} 
          style={styles.button(loading, success)}
          disabled={loading}
        >
          {/* Cambia el texto del botón según el estado */}
          {loading ? '...' : (success ? '¡Listo!' : 'Actualizar')}
        </button>
      </div>
    </div>
  );
}