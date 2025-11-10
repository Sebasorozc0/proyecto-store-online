import React, { useState, useMemo } from 'react';

// Estilos
const styles = {
  container: { padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff', margin: '20px 0' },
  title: { margin: '0 0 15px 0' },
  formRow: { display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' },
  formGroup: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: '150px' },
  label: { marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' },
  select: { padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' },
  input: { padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' },
  button: { padding: '10px 15px', fontSize: '16px', border: 'none', borderRadius: '4px', background: '#5cb85c', color: 'white', cursor: 'pointer' }
};

export default function TransferModule({ products, onTransferSuccess }) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [fromStoreId, setFromStoreId] = useState('');
  const [toStoreId, setToStoreId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Encuentra el producto seleccionado
  const selectedProduct = useMemo(() => {
    return products.find(p => p.product_id == selectedProductId);
  }, [selectedProductId, products]);

  // --- ¡LÓGICA ACTUALIZADA! ---
  // Crea una lista única de TODAS las tiendas disponibles (ej. las 6 sucursales)
  // Lo extrae del primer producto, ya que todos los productos tienen todas las tiendas.
  const allStores = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }
    // Asume que la consulta /api/inventory devuelve todas las tiendas para cada producto
    return products[0].stock_by_store.map(s => ({
      store_id: s.store_id,
      store_name: s.store_name
    }));
  }, [products]);

  // Encuentra los datos de la tienda de origen seleccionada
  const originStock = useMemo(() => {
    if (!selectedProduct || !fromStoreId) return null;
    // Busca en el stock_by_store del producto seleccionado
    return selectedProduct.stock_by_store?.find(s => s.store_id == fromStoreId);
  }, [selectedProduct, fromStoreId]);

  // --- Manejador del envío del formulario ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!selectedProductId || !fromStoreId || !toStoreId || quantity <= 0) {
      alert("Por favor completa todos los campos.");
      return;
    }
    if (fromStoreId === toStoreId) {
      alert("La tienda de origen y destino no pueden ser la misma.");
      return;
    }
    // Verifica el stock real del origen
    if (!originStock || quantity > originStock.stock) {
      alert(`Stock insuficiente. Solo hay ${originStock?.stock || 0} disponibles en origen.`);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch('https://store-online-sa-backend.onrender.com/api/inventory/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: parseInt(selectedProductId),
          fromStoreId: parseInt(fromStoreId),
          toStoreId: parseInt(toStoreId),
          quantity: parseInt(quantity)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en la transferencia');
      }

      alert('¡Transferencia realizada con éxito!');
      
      setSelectedProductId('');
      setFromStoreId('');
      setToStoreId('');
      setQuantity(1);

      if (onTransferSuccess) {
        onTransferSuccess();
      }

    } catch (error) {
      console.error("Error en handleSubmit:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Traslado entre Tiendas</h3>
      <form onSubmit={handleSubmit}>
        <div style={styles.formRow}>
          {/* 1. Selector de Producto */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Producto:</label>
            <select style={styles.select} value={selectedProductId} onChange={(e) => {
                setSelectedProductId(e.target.value);
                setFromStoreId(''); 
                setToStoreId('');
            }}>
              <option value="">-- Seleccionar Producto --</option>
              {products.map(p => (
                <option key={p.product_id} value={p.product_id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Muestra el resto de campos solo si se ha seleccionado un producto */}
        {selectedProduct && (
          <div style={styles.formRow}>
            {/* 2. Selector de Origen */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Desde (Origen):</label>
              <select style={styles.select} value={fromStoreId} onChange={(e) => setFromStoreId(e.target.value)}>
                <option value="">-- Seleccionar Origen --</option>
                {/* Filtra para mostrar solo tiendas que tienen este producto y con stock > 0 */}
                {selectedProduct.stock_by_store?.filter(s => s.stock > 0).map(s => (
                  <option key={s.store_id} value={s.store_id}>
                    {s.store_name} (Disp: {s.stock})
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Selector de Destino (¡LÓGICA CORREGIDA!) */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Hacia (Destino):</label>
              <select style={styles.select} value={toStoreId} onChange={(e) => setToStoreId(e.target.value)} disabled={!fromStoreId}>
                <option value="">-- Seleccionar Destino --</option>
                {/* Ahora muestra TODAS las tiendas (de allStores) excepto la de origen */}
                {allStores.filter(s => s.store_id != fromStoreId).map(s => (
                    <option key={s.store_id} value={s.store_id}>{s.store_name}</option>
                ))}
              </select>
            </div>

            {/* 4. Campo de Cantidad */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Cantidad:</label>
              <input 
                type="number" 
                style={styles.input} 
                min="1" 
                max={originStock?.stock || 1} 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                disabled={!fromStoreId}
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