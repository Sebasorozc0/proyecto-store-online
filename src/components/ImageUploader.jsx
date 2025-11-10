// src/components/ImageUploader.jsx
import React, { useState } from 'react';

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    margin: '5px 0'
  },
  input: {
    fontSize: '12px',
    padding: '3px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '120px' // Ajusta el ancho
  },
  button: {
    fontSize: '12px',
    padding: '5px',
    background: '#17a2b8',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default function ImageUploader({ productId, onUploadSuccess }) {
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
    // 'productImage' debe coincidir con upload.single('productImage') en el backend
    formData.append('productImage', selectedFile); 

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://store-online-sa-backend.onrender.com/api/products/${productId}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // No se pone 'Content-Type' con FormData, el navegador lo hace solo
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al subir la imagen');
      }

      alert('¡Imagen subida con éxito!');
      // Llama a la función del padre (InventoryPage) para recargar la lista
      onUploadSuccess(); 

    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleUpload} style={styles.form}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Subir</button>
    </form>
  );
}