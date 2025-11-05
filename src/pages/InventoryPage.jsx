// src/pages/InventoryPage.jsx

import React, { useState, useEffect } from 'react';
import StockInput from '../components/StockInput.jsx';
// 1. Importa el nuevo módulo de traslado
import TransferModule from '../components/TransferModule.jsx';

// --- DATOS DE SIMULACIÓN (MOCK DATA) ---
// (El mismo de antes)
const DUMMY_PRODUCTS = [
  // ... (tus datos no cambian)
  {
    id: 101,
    name: 'Laptop Pro 15"',
    price: 12500.00,
    stock_by_store: [
      { store_id: 1, store_name: 'Miraflores', stock: 15 },
      { store_id: 2, store_name: 'Pradera Xela', stock: 8 },
      { store_id: 3, store_name: 'Las Américas', stock: 10 }
    ]
  },
  {
    id: 102,
    name: 'Smartwatch V2',
    price: 1800.00,
    stock_by_store: [
      { store_id: 1, store_name: 'Miraflores', stock: 30 },
      { store_id: 2, store_name: 'Pradera Xela', stock: 12 },
      { store_id: 3, store_name: 'Las Américas', stock: 20 }
    ]
  },
  {
    id: 103,
    name: 'Cámara DSLR Kit',
    price: 7500.00,
    stock_by_store: [
      { store_id: 1, store_name: 'Miraflores', stock: 5 },
      { store_id: 2, store_name: 'Pradera Xela', stock: 0 },
      { store_id: 3, store_name: 'Las Américas', stock: 3 }
    ]
  },
  {
    id: 104,
    name: 'Celular Ultra',
    price: 9000.00,
    stock_by_store: [
      { store_id: 1, store_name: 'Miraflores', stock: 25 },
      { store_id: 2, store_name: 'Pradera Xela', stock: 10 },
      { store_id: 3, store_name: 'Las Américas', stock: 18 }
    ]
  }
];

// --- Estilos ---
// (Los mismos de antes)
const styles = {
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '14px' },
  th: { background: '#562d2dff', padding: '12px', border: '1px solid #f4f4f4ff', textAlign: 'left' },
  td: { padding: '12px', border: '1px solid #ffffffff', verticalAlign: 'top' },
  button: { marginRight: '5px', padding: '5px 10px', cursor: 'pointer', border: 'none', borderRadius: '4px' },
};


export default function InventoryPage() {
  
  const [products, setProducts] =useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(DUMMY_PRODUCTS);
      setLoading(false);
    }, 1000);
  }, []); 

  if (loading) {
    return <h2>Cargando inventario...</h2>;
  }

  return (
    <div>
      <h2>Gestión de Inventario</h2>
      <button style={{ ...styles.button, background: '#28a745', color: 'white', fontSize: '16px' }}>
        + Agregar Nuevo Producto
      </button>

      {/* 2. Renderiza el módulo de traslado aquí, 
         pasándole la lista de productos que ya cargamos.
      */}
      <TransferModule products={products} />

      {/* 3. El título de la tabla ahora puede ser "Stock Actual" */}
      <h3>Stock Actual por Tienda (Editable)</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Producto</th>
            <th style={styles.th}>Precio</th>
            <th style={styles.th}>Stock por Tienda</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* El resto de tu tabla sigue igual que antes */}
          {products.map((product) => (
            <tr key={product.id}>
              <td style={styles.td}>{product.name}</td>
              <td style={styles.td}>Q {product.price.toFixed(2)}</td>
              <td style={styles.td}>
                {product.stock_by_store.map((storeStock) => (
                  <StockInput
                    key={storeStock.store_id}
                    storeId={storeStock.store_id}
                    storeName={storeStock.store_name}
                    initialStock={storeStock.stock}
                    productId={product.id}
                  />
                ))}
              </td>
              <td style={styles.td}>
                <button style={{...styles.button, background: '#007bff', color: 'white'}}>Editar</button>
                <button style={{...styles.button, background: '#dc3545', color: 'white'}}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}