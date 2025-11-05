// src/components/StockInput.jsx

import React, { useState } from 'react';

// Estilos para este componente
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 0',
    borderBottom: '1px solid #eee'
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px'
  },
  input: {
    width: '60px',
    padding: '4px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'right'
  },
  button: {
    padding: '4px 8px',
    fontSize: '12px',
    border: 'none',
    borderRadius: '4px',
    background: '#007bff',
    color: 'white',
    cursor: 'pointer',
    marginLeft: '5px'
  }
};

export default function StockInput({ storeId, storeName, initialStock, productId }) {
  
  // 1. Este componente maneja su propio estado para el valor del input
  const [stock, setStock] = useState(initialStock);
  const [loading, setLoading] = useState(false);

  // 2. Se ejecuta cuando el usuario escribe en el <input>
  const handleChange = (e) => {
    // Solo actualiza el estado, no "guarda" nada aún
    setStock(e.target.value);
  };

  // 3. Se ejecuta al presionar "Actualizar"
  const handleUpdate = () => {
    // --- SIMULACIÓN DE LLAMADA A LA API ---
    setLoading(true);
    console.log(`Simulando API: Actualizar stock del producto ${productId} en tienda ${storeId} a ${stock}`);
    
    // Simulamos un retraso de la red
    setTimeout(() => {
      setLoading(false);
      // En una app real, aquí confirmarías que la API guardó los datos.
      alert(`Stock para "${storeName}" actualizado a ${stock} (simulado)`);
    }, 750);
    // --- FIN DE SIMULACIÓN ---
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>{storeName}:</label>
      <div>
        <input 
          type="number" 
          value={stock}
          onChange={handleChange}
          style={styles.input}
          min="0" // Evita números negativos
        />
        <button 
          onClick={handleUpdate} 
          style={styles.button}
          disabled={loading} // Deshabilita el botón mientras "guarda"
        >
          {loading ? '...' : 'Actualizar'}
        </button>
      </div>
    </div>
  );
}