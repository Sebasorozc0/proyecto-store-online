// src/components/ReportTable.jsx

import React from 'react';

// Estilos para la tabla (puedes moverlos a un CSS)
const styles = {
  container: {
    padding: '20px',
    background: '#f6f5f5ff',
    borderRadius: '8px',
    margin: '20px 0',
  },
  title: {
    margin: '0 0 15px 0',
    fontSize: '18px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  th: {
    background: '#ffffffff',
    padding: '10px',
    border: '1px solid #ffffffff',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
  },
};

export default function ReportTable({ title, headers, data }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{title}</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            {/* Mapea los encabezados */}
            {headers.map((header) => (
              <th key={header.key} style={styles.th}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Mapea las filas de datos */}
          {data.map((row, index) => (
            <tr key={index}>
              {/* Mapea las celdas de cada fila */}
              {headers.map((header) => (
                <td key={header.key} style={styles.td}>
                  {row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}