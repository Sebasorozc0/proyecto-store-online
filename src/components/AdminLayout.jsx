import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

// Estilos
const styles = {
  container: { 
    display: 'flex', 
    minHeight: '100vh', 
    fontFamily: 'Arial, sans-serif' 
  },
  sidebar: { 
    width: '220px', 
    background: '#2c3e50', // Fondo oscuro de la barra
    color: 'white', // Texto blanco en la barra
    padding: '20px' 
  },
  sidebarNav: { 
    listStyle: 'none', 
    padding: 0 
  },
  navLink: { 
    color: 'white', 
    textDecoration: 'none', 
    display: 'block', 
    padding: '10px 15px', 
    borderRadius: '4px', 
    margin: '5px 0' 
  },
  mainContent: {
    flex: 1, 
    padding: '30px', 
    background: '#f4f7f6', // Tu fondo claro
    color: '#333' // <-- ¡AQUÍ ESTÁ LA CORRECCIÓN!
  },
  logoutButton: {
    background: '#e74c3c', 
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    padding: '10px 15px',
    borderRadius: '4px',
    margin: '20px 0 5px 0',
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    fontSize: '14px'
  },
  welcomeUser: {
    padding: '10px 0',
    borderBottom: '1px solid #34495e',
    fontSize: '14px'
  }
};

export default function AdminLayout() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUserName(JSON.parse(userData).name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h3>Admin Panel</h3>

        <div style={styles.welcomeUser}>
          Bienvenido, <strong>{userName || 'Usuario'}</strong>
        </div>

        <nav>
          <ul style={styles.sidebarNav}>
            <li><Link to="/admin" style={styles.navLink}>Inicio (Dashboard)</Link></li>
            <li><Link to="/admin/inventario" style={styles.navLink}>Inventario</Link></li>
            <li><Link to="/admin/reportes" style={styles.navLink}>Reportes</Link></li>
            <li><Link to="/admin/usuarios" style={styles.navLink}>Usuarios</Link></li>
            <li><Link to="/" style={styles.navLink}>(Volver a la Tienda)</Link></li>
          </ul>

          <button style={styles.logoutButton} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </nav>
      </aside>

      {/* Esta es el área que ahora tendrá texto oscuro */}
      <main style={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}