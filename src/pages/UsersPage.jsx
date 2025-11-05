// src/pages/UsersPage.jsx

import React from 'react';
// Importamos el componente de tabla que ya creamos
import ReportTable from '../components/ReportTable.jsx';

// --- DATOS DE SIMULACIÓN PARA USUARIOS ---
// El Gerente tiene más permisos que el Administrador
const DUMMY_USERS = [
  {
    id: 1,
    name: 'Gerente General',
    email: 'gerente@storeonline.com',
    role: 'Gerente',
    permissions: 'Admin. Productos, Admin. Usuarios, Ver Reportes, Admin. Permisos'
  },
  {
    id: 2,
    name: 'Admin Productos',
    email: 'admin.prod@storeonline.com',
    role: 'Administrador',
    permissions: 'Admin. Productos, Ver Reportes'
  },
  {
    id: 3,
    name: 'Cliente Registrado',
    email: 'cliente@ejemplo.com',
    role: 'Cliente',
    permissions: 'Recibir Promociones'
  },
];

// --- Definición de las columnas para la tabla ---
const userHeaders = [
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Correo Electrónico' },
  { key: 'role', label: 'Rol' },
  { key: 'permissions', label: 'Permisos Asignados' },
  // Agregamos una columna de "Acciones" simulada
  { key: 'actions', label: 'Acciones' },
];

// --- Preparamos los datos para la tabla ---
// Agregamos el botón de "Editar" a los datos
const userData = DUMMY_USERS.map(user => ({
  ...user,
  // Simulamos un botón (solo texto por ahora)
  actions: 'Editar Permisos' 
}));

// Estilos para el botón de "Agregar"
const styles = {
  button: { 
    margin: '0 0 20px 0',
    padding: '10px 15px', 
    cursor: 'pointer', 
    border: 'none', 
    borderRadius: '4px',
    background: '#28a745', 
    color: 'white', 
    fontSize: '16px' 
  },
};

export default function UsersPage() {
  return (
    <div>
      <h2>Administración de Usuarios y Permisos</h2>
      <p>
        El rol de **Gerente** puede administrar usuarios y ver todas las opciones.
        El rol de **Administrador** solo puede gestionar productos.
      </p>

      <button style={styles.button}>
        + Agregar Nuevo Usuario
      </button>

      {/* Reutilizamos nuestro componente ReportTable */}
      <ReportTable
        title="Lista de Usuarios del Sistema"
        headers={userHeaders}
        data={userData}
      />
    </div>
  );
}