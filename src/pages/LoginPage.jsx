// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Estilos para el formulario de login (puedes moverlos a un CSS)
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#f4f7f6' // Un fondo claro
  },
  formWrapper: {
    padding: '30px',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    margin: '0 0 25px 0',
    color: '#2c3e50'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box' // Asegura que el padding no rompa el ancho
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    background: '#007bff',
    color: 'white',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px'
  }
};

export default function LoginPage() {
  // 1. Estados para guardar lo que el usuario escribe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Para mostrar mensajes de error
  const navigate = useNavigate(); // Para redirigir al usuario

  // 2. Función que se llama al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError(''); // Limpia errores anteriores

    // 3. ¡Aquí ocurre la magia! Llamada al backend
    try {
      const response = await fetch('https://store-online-sa-backend.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      // 4. Analizar la respuesta del backend
      if (!response.ok) {
        // Si el backend envió un error (ej. 401, 404)
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // --- ¡LOGIN EXITOSO! ---
      console.log('Login exitoso:', data);
      
      // 5. Guarda el token y los datos del usuario
      // localStorage es una "mini-base de datos" del navegador
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 6. Redirige al usuario al panel de administración
      navigate('/admin');

    } catch (err) {
      // 7. Si hay un error de red o del backend
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Iniciar Sesión (Admin)</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Campo de Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Correo Electrónico:</label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña:</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botón de Enviar */}
          <button type="submit" style={styles.button}>
            Entrar
          </button>

          {/* Muestra de Errores */}
          {error && <p style={styles.error}>{error}</p>}
        
        </form>
      </div>
    </div>
  );
}