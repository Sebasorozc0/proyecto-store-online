import React, { useState, useEffect, useCallback } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// 1. Registrar Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 2. Opciones de la gráfica
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Top 5 Productos Más Vendidos por Mes (Este Año)', font: { size: 20 } },
  },
};

// 3. Componente ReportTable
const tableStyles = {
  container: { padding: '20px', background: '#fff', borderRadius: '8px', margin: '20px 0' },
  title: { margin: '0 0 15px 0', fontSize: '18px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
  th: { background: '#000000ff', padding: '10px', border: '1px solid #ddd', textAlign: 'left' },
  td: { padding: '10px', border: '1px solid #ddd' },
  datePickerContainer: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap' },
  dateLabel: { fontWeight: 'bold' }
};

function ReportTable({ title, headers, data }) {
  return (
    <div style={tableStyles.container}>
      <h3 style={tableStyles.title}>{title}</h3>
      <table style={tableStyles.table}>
        <thead>
          <tr>
            {headers.map((header) => (<th key={header.key} style={tableStyles.th}>{header.label}</th>))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} style={{ ...tableStyles.td, textAlign: 'center' }}>
                No hay datos para este reporte.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (<td key={header.key} style={tableStyles.td}>{row[header.key]}</td>))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Datos iniciales vacíos para la gráfica
const emptyChartData = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  datasets: [{ label: 'Cargando...', data: [], backgroundColor: 'rgba(200, 200, 200, 0.5)' }]
};

// --- 4. EL COMPONENTE DE LA PÁGINA DE REPORTES ---
export default function ReportsPage() {
  
  const [lowStockData, setLowStockData] = useState([]);
  const [topSoldData, setTopSoldData] = useState([]);
  const [chartData, setChartData] = useState(emptyChartData); 
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [salesByDateData, setSalesByDateData] = useState([]);
  const [isDateLoading, setIsDateLoading] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const lowStockHeaders = [
    { key: 'productName', label: 'Producto' },
    { key: 'storeName', label: 'Sucursal' },
    { key: 'stock', label: 'Existencia' },
  ];
  const topSoldHeaders = [
    { key: 'productName', label: 'Producto' },
    { key: 'storeName', label: 'Sucursal' },
    { key: 'totalSold', label: 'Total Vendido' },
  ];
  const salesByDateHeaders = [
    { key: 'sale_id', label: 'ID Factura' },
    { key: 'sale_date', label: 'Fecha' },
    { key: 'customer_name', label: 'Cliente' },
    { key: 'store_name', label: 'Sucursal' },
    { key: 'total_amount', label: 'Total' },
  ];

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const [lowStockRes, topSoldRes, chartRes] = await Promise.all([
        fetch('https://store-online-sa-backend.onrender.com/api/reports/low-stock', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('https://store-online-sa-backend.onrender.com/api/reports/top-sold', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('https://store-online-sa-backend.onrender.com/api/reports/sales-by-month', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (!lowStockRes.ok || !topSoldRes.ok || !chartRes.ok) throw new Error('Error al cargar uno o más reportes');
      
      const lowStock = await lowStockRes.json();
      const topSold = await topSoldRes.json();
      const chart = await chartRes.json();

      setLowStockData(lowStock);
      setTopSoldData(topSold);
      setChartData(chart); 
    } catch (err) {
      console.error("Error al cargar los reportes:", err);
      if (err.message.includes('Failed to fetch')) {
        setError("No se pudo conectar al servidor. ¿El backend (node index.js) está corriendo?");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // --- ¡FUNCIÓN handleDateSearch ACTUALIZADA! ---
  const handleDateSearch = async () => {
    setIsDateLoading(true);
    setSalesByDateData([]); // Limpia la tabla anterior
    const token = localStorage.getItem('token');

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    try {
      const response = await fetch(
        `https://store-online-sa-backend.onrender.com/api/reports/sales-by-date?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      // Leemos el JSON de la respuesta, INCLUSO SI ES UN ERROR
      const data = await response.json();

      // Si la respuesta no fue exitosa (ej. 400, 500)
      if (!response.ok) {
        // data.error será el mensaje que enviamos desde Node.js (ej: 'Error de BD')
        throw new Error(data.error || 'Error desconocido del servidor');
      }
      
      // Si todo salió bien
      setSalesByDateData(data);

    } catch (err) {
      // Ahora la alerta mostrará el error específico del backend
      alert(`Error: ${err.message}`);
    } finally {
      setIsDateLoading(false);
    }
  };

  const refreshButtonStyle = {
    background: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '20px'
  };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Módulo de Reportes</h2>
      
      <button onClick={fetchReports} style={refreshButtonStyle} disabled={loading}>
        {loading ? 'Actualizando...' : 'Actualizar Reportes Generales'}
      </button>
      
      <div style={tableStyles.container}>
        <Bar options={chartOptions} data={chartData} />
      </div>
      
      {loading ? (
        <h3 style={tableStyles.container}>Cargando reportes...</h3>
      ) : error ? (
        <h3 style={{ ...tableStyles.container, color: 'red' }}>{error}</h3>
      ) : (
        <>
          <ReportTable title="Productos con Bajo Stock (Menor a 10)" headers={lowStockHeaders} data={lowStockData} />
          <ReportTable title="Top Productos Más Vendidos (General)" headers={topSoldHeaders} data={topSoldData} />
        </>
      )}

      {/* --- SECCIÓN DE REPORTE POR FECHAS --- */}
      <div style={tableStyles.container}>
        <h3 style={tableStyles.title}>Reporte de Compras por Rango de Fecha</h3>
        <div style={tableStyles.datePickerContainer}>
          <label style={tableStyles.dateLabel}>Desde:</label>
          <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            dateFormat="yyyy-MM-dd"
            className="react-datepicker-wrapper"
          />
          <label style={tableStyles.dateLabel}>Hasta:</label>
          <DatePicker 
            selected={endDate} 
            onChange={(date) => setEndDate(date)} 
            dateFormat="yyyy-MM-dd"
            className="react-datepicker-wrapper"
          />
          <button onClick={handleDateSearch} style={{...refreshButtonStyle, marginBottom: 0}} disabled={isDateLoading}>
            {isDateLoading ? 'Buscando...' : 'Generar Reporte'}
          </button>
        </div>
        
        <ReportTable 
          title="Resultados de la Búsqueda"
          headers={salesByDateHeaders}
          data={salesByDateData} 
        />
      </div>

    </div>
  );
}