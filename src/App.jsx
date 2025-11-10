// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Páginas Públicas y Login
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/CartPage.jsx'; 
import QuotePage from './pages/QuotePage.jsx';
import LoginPage from './pages/LoginPage.jsx'; // Importar Login

// El Layout de Admin
import AdminLayout from './components/AdminLayout.jsx';

// El Guardián de Rutas
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Páginas Internas de Admin
import AdminDashboard from './pages/AdminDashboard.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import UsersPage from './pages/UsersPage.jsx';

function App() {
  return (
    <div>
      <Routes>
        
        {/* --- RUTAS PÚBLICAS Y LOGIN --- */}
        {/* Estas rutas no tienen la barra lateral de admin */}
        <Route path="/" element={<HomePage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/cotizacion" element={<QuotePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* --- RUTAS DE ADMINISTRACIÓN (AHORA PROTEGIDAS) --- */}
        <Route 
          path="/admin" 
          element={
            // Envolvemos el AdminLayout con nuestro guardián
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Todas las rutas hijas quedan protegidas automáticamente */}
          <Route index element={<AdminDashboard />} /> 
          <Route path="inventario" element={<InventoryPage />} />
          <Route path="reportes" element={<ReportsPage />} />
          <Route path="usuarios" element={<UsersPage />} />
        </Route>
        
        {/* Ruta para "No Encontrado" (404) */}
        <Route path="*" element={
          <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>Error 404: Página no encontrada</h2>
            <p>La ruta que buscas no existe.</p>
          </div>
        } />

      </Routes>
    </div>
  )
}

export default App