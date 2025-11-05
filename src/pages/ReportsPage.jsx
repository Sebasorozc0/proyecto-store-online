// src/pages/ReportsPage.jsx

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
// 1. Importa el nuevo componente de tabla
import ReportTable from '../components/ReportTable.jsx'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- DATOS SIMULADOS PARA LA GRÁFICA ---
const DUMMY_SALES_DATA = {
  // ... (los mismos datos de la gráfica de antes)
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Laptop Pro 15"',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Smartwatch V2',
      data: [45, 70, 60, 90, 75, 85],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: 'Cámara DSLR Kit',
      data: [30, 25, 40, 50, 45, 35],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

const chartOptions = {
  // ... (las mismas opciones de antes)
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Productos más vendidos por mes', font: { size: 20 } },
  },
};

// --- 2. DATOS SIMULADOS PARA LAS TABLAS ---

// Reporte: Top 20 de los productos con existencia menor a 10 unidades
const lowStockHeaders = [
  { key: 'productName', label: 'Producto' },
  { key: 'storeName', label: 'Sucursal' },
  { key: 'stock', label: 'Existencia' },
];
const lowStockData = [
  { productName: 'Cámara DSLR Kit', storeName: 'Pradera Xela', stock: 0 },
  { productName: 'Cámara DSLR Kit', storeName: 'Las Américas', stock: 3 },
  { productName: 'Laptop Pro 15"', storeName: 'Pradera Xela', stock: 8 },
];

// Reporte: Top 100 de productos más vendidos (simulamos 3)
const topSoldHeaders = [
  { key: 'productName', label: 'Producto' },
  { key: 'storeName', label: 'Sucursal' },
  { key: 'totalSold', label: 'Total Vendido' },
];
const topSoldData = [
  { productName: 'Smartwatch V2', storeName: 'General', totalSold: 430 },
  { productName: 'Laptop Pro 15"', storeName: 'General', totalSold: 396 },
  { productName: 'Cámara DSLR Kit', storeName: 'General', totalSold: 225 },
];


// --- 3. EL COMPONENTE DE LA PÁGINA ---
export default function ReportsPage() {
  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Módulo de Reportes</h2>
      
      {/* --- Gráfica --- */}
      <div style={{ padding: '20px', background: '#ffffffff', borderRadius: '8px' }}>
        <Bar 
          options={chartOptions} 
          data={DUMMY_SALES_DATA} 
        />
      </div>

      {/* --- 4. Renderiza las tablas de reporte --- */}

      {/* Tabla de Bajo Stock */}
      <ReportTable 
        title="Productos con Bajo Stock (Menor a 10)"
        headers={lowStockHeaders}
        data={lowStockData}
      />
      
      {/* Tabla de Más Vendidos */}
      <ReportTable 
        title="Top Productos Más Vendidos (General)"
        headers={topSoldHeaders}
        data={topSoldData}
      />

    </div>
  );
}