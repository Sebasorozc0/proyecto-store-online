// src/components/TransferModule.jsx

import React, { useState, useMemo } from 'react';

// Estilos para el módulo
const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#111010ff',
    margin: '20px 0',
  },
  title: {
    margin: '0 0 15px 0'
  },
  formRow: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
  },
  formGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  select: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    background: '#5cb85c',
    color: 'white',
    cursor: 'pointer',
  }
};

export default function TransferModule({ products }) {
  // --- ESTADOS ---
  const [selectedProductId, setSelectedProductId] = useState('');
  const [fromStoreId, setFromStoreId] = useState('');
  const [toStoreId, setToStoreId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // --- LÓGICA DERIVADA ---

  // 1. Encuentra el producto seleccionado
  const selectedProduct = useMemo(() => {
    return products.find(p => p.id === parseInt(selectedProductId));
  }, [selectedProductId, products]);

  // 2. Encuentra la tienda de origen (para saber el stock máximo)
  const originStock = useMemo(() => {
    if (!selectedProduct || !fromStoreId) return null;
    return selectedProduct.stock_by_store.find(s => s.store_id === parseInt(fromStoreId));
  }, [selectedProduct, fromStoreId]);

  // --- MANEJADORES DE EVENTOS ---

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
    // Resetea las tiendas cuando cambia el producto
    setFromStoreId('');
    setToStoreId('');
  };

  const handleFromStoreChange = (e) => {
    setFromStoreId(e.target.value);
    // Asegura que no se pueda transferir a la misma tienda
    if (toStoreId === e.target.value) {
      setToStoreId('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    
    // Validaciones
    if (!selectedProductId || !fromStoreId || !toStoreId || quantity <= 0) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }
    if (quantity > originStock.stock) {
      alert(`Error: Solo hay ${originStock.stock} unidades en la tienda de origen.`);
      return;
    }

    // --- SIMULACIÓN DE API ---
    setLoading(true);
    console.log(`Simulando API: Mover ${quantity} de ${selectedProduct.name} 
      desde tienda ${fromStoreId} (${originStock.store_name}) 
      hacia tienda ${toStoreId}`);

    setTimeout(() => {
      setLoading(false);
      alert("¡Traslado simulado con éxito!");
      // Aquí, una app real refrescaría los datos de inventario
      // Reseteamos el formulario
      setSelectedProductId('');
      setFromStoreId('');
      setToStoreId('');
      setQuantity(1);
    }, 1500);
    // --- FIN DE SIMULACIÓN ---
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Módulo de Traslado entre Tiendas</h3>
      <form onSubmit={handleSubmit}>
        <div style={styles.formRow}>
          {/* --- Selector de Producto --- */}
          <div style={styles.formGroup}>
            <label style={styles.label}>1. Seleccionar Producto:</label>
            <select style={styles.select} value={selectedProductId} onChange={handleProductChange}>
              <option value="">-- Elige un producto --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* --- Selectores de Tienda (solo si se eligió un producto) --- */}
        {selectedProduct && (
          <div style={styles.formRow}>
            {/* Tienda de Origen */}
            <div style={styles.formGroup}>
              <label style={styles.label}>2. Desde (Origen):</label>
              <select style={styles.select} value={fromStoreId} onChange={handleFromStoreChange}>
                <option value="">-- Elige tienda origen --</option>
                {selectedProduct.stock_by_store.map(s => (
                  <option key={s.store_id} value={s.store_id}>
                    {s.store_name} (Stock: {s.stock})
                  </option>
                ))}
              </select>
            </div>

            {/* Tienda de Destino */}
            <div style={styles.formGroup}>
              <label style={styles.label}>3. Hacia (Destino):</label>
              <select style={styles.select} value={toStoreId} onChange={(e) => setToStoreId(e.target.value)} disabled={!fromStoreId}>
                <option value="">-- Elige tienda destino --</option>
                {selectedProduct.stock_by_store
                  .filter(s => s.store_id !== parseInt(fromStoreId)) // No se puede enviar a la misma tienda
                  .map(s => (
                    <option key={s.store_id} value={s.store_id}>
                      {s.store_name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Cantidad */}
            <div style={styles.formGroup}>
              <label style={styles.label}>4. Cantidad:</label>
              <input 
                type="number"
                style={styles.input}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                max={originStock ? originStock.stock : 1} // El máximo es el stock de origen
                disabled={!originStock}
              />
            </div>
          </div>
        )}

        <button type="submit" style={styles.button} disabled={loading || !fromStoreId || !toStoreId}>
          {loading ? 'Procesando...' : 'Realizar Traslado'}
        </button>
      </form>
    </div>
  );
}