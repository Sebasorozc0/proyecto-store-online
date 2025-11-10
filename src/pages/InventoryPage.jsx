import React, { useState, useEffect, useCallback } from 'react';
import StockInput from '../components/StockInput.jsx';
import TransferModule from '../components/TransferModule.jsx';


// --- ESTILOS ---
const styles = {
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '14px' },
  th: { background: '#000000ff', padding: '12px', border: '1px solid #000000ff', textAlign: 'left' },
  td: { padding: '12px', border: '1px solid #030303ff', verticalAlign: 'top' },
  button: { marginRight: '5px', padding: '5px 10px', cursor: 'pointer', border: 'none', borderRadius: '4px' },
  productImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '4px',
    background: '#2b2a2aff'
  }
};

// --- 2. COMPONENTE ImageUploader (DEFINIDO AQUÍ MISMO) ---
const uploaderStyles = {
  form: { display: 'flex', alignItems: 'center', gap: '5px', margin: '5px 0' },
  input: { fontSize: '12px', padding: '3px', border: '1px solid #000000ff', borderRadius: '4px', width: '120px' },
  button: { fontSize: '12px', padding: '5px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

function ImageUploader({ productId, onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo primero.');
      return;
    }

    const formData = new FormData();
    formData.append('productImage', selectedFile); 

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://store-online-sa-backend.onrender.com/api/products/${productId}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al subir la imagen');

      alert('¡Imagen subida con éxito!');
      onUploadSuccess(); 

    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleUpload} style={uploaderStyles.form}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        style={uploaderStyles.input}
      />
      <button type="submit" style={uploaderStyles.button}>Subir</button>
    </form>
  );
}
// --- FIN DEL COMPONENTE ImageUploader ---


// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function InventoryPage() {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://store-online-sa-backend.onrender.com/api/inventory', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Error al cargar el inventario');
      
      const data = await response.json();
      setProducts(data);
      setLoading(false);

    } catch (error) {
      console.error("Error cargando inventario:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  if (loading) {
    return <h2>Cargando inventario desde la base de datos...</h2>;
  }

  return (
    <div>
      <h2>Gestión de Inventario</h2>
      <button style={{ ...styles.button, background: '#28a745', color: 'white', fontSize: '16px' }}>
        + Agregar Nuevo Producto
      </button>

      <TransferModule products={products} onTransferSuccess={fetchInventory} />

      <h3>Stock Actual por Tienda</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Producto</th>
            <th style={styles.th}>Subir Foto</th>
            <th style={styles.th}>Precio</th>
            <th style_={{...styles.th, width: '35%'}}>Stock por Tienda</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              {/* Columna Producto (con imagen) */}
              <td style={styles.td}>
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} style={styles.productImage} />
                ) : (
                  <div style={styles.productImage} />
                )}
                <div style={{marginTop: '5px', fontWeight: 'bold'}}>{product.name}</div>
              </td>
              
              {/* Columna para subir imagen (usando el componente de arriba) */}
              <td style={styles.td}>
                <ImageUploader 
                  productId={product.product_id}
                  onUploadSuccess={fetchInventory}
                />
              </td>

              {/* Columna Precio */}
              <td style={styles.td}>Q {product.price}</td>

              {/* Columna Stock */}
              <td style={styles.td}>
                {product.stock_by_store && product.stock_by_store.map((storeStock) => (
                  <StockInput
                    key={storeStock.store_id}
                    storeId={storeStock.store_id}
                    storeName={storeStock.store_name}
                    initialStock={storeStock.stock}
                    productId={product.product_id}
                  />
                ))}
              </td>

              {/* Columna Acciones */}
              <td style={styles.td}>
                <button style={{...styles.button, background: '#dc3545', color: 'white'}}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}