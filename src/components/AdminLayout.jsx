import React from 'react';
// 1. Importa Outlet y Link para la navegación
import { Outlet, Link } from 'react-router-dom';

// Estilos CSS en línea para el layout (para no crear un .css)
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  sidebar: {
    width: '220px',
    background: '#5a61daff', // Un color oscuro para la barra
    color: 'white',
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
    flex: 1, // Ocupa el resto del espacio
    padding: '30px',
    background: '#0c1412ff'
  }
};

export default function AdminLayout() {
  return (
    <div style={styles.container}>
      {/* --- BARRA LATERAL (SIDEBAR) --- */}
      <aside style={styles.sidebar}>
        <h3>Admin Panel</h3>
        <nav>
          <ul style={styles.sidebarNav}>
            {/* 3. "Link to" es como un <a> pero para React Router */}
            <li>
              <Link to="/admin" style={styles.navLink}>
                Inicio (Dashboard)
              </Link>
            </li>
            <li>
              <Link to="/admin/inventario" style={styles.navLink}>
                Inventario
              </Link>
            </li>
            <li>
              <Link to="/admin/reportes" style={styles.navLink}>
                Reportes
              </Link>
            </li>
            <li>
              <Link to="/admin/usuarios" style={styles.navLink}>
                Usuarios
              </Link>
            </li>
            <li>
              <Link to="/" style={styles.navLink}>
                (Volver a la Tienda)
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main style={styles.mainContent}>
        {/* 4. AQUI SE RENDERIZA LA RUTA "HIJA" */}
        <Outlet />
      </main>
    </div>
  );
}