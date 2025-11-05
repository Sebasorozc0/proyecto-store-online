// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Revisa que AMBOS estén importados
import { CartProvider } from './context/CartContext.jsx' 
import { QuoteProvider } from './context/QuoteContext.jsx'

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Revisa que AMBOS estén aquí envolviendo a la app */}
    <QuoteProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </QuoteProvider>
  </React.StrictMode>,
)