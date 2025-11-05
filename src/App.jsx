// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Páginas públicas
import HomePage from './pages/HomePage.jsx';
import CartPage from './pages/CartPage.jsx'; 
import QuotePage from './pages/QuotePage.jsx'; // ¿Importaste esta?

// El Layout de Admin
import AdminLayout from './components/AdminLayout.jsx';

// Las páginas internas de Admin
import AdminDashboard from './pages/AdminDashboard.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import UsersPage from './pages/UsersPage.jsx';

function App() {
  return (
    <div>
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/cotizacion" element={<QuotePage />} /> {/* ¿Agregaste esta? */}

        {/* --- RUTAS DE ADMINISTRACIÓN (ANIDADAS) --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="inventario" element={<InventoryPage />} />
          <Route path="reportes" element={<ReportsPage />} />
          <Route path="usuarios" element={<UsersPage />} />
        </Route>
        
      </Routes>
    </div>
  )
}

export default App