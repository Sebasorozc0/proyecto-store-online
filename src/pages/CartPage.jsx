import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  container: { padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' },
  title: { borderBottom: '2px solid #f4f4f4', paddingBottom: '10px' },
  cartItem: { display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' },
  itemDetails: { flex: 1, padding: '0 15px' },
  itemName: { fontSize: '18px', margin: '0 0 10px 0' },
  itemPrice: { fontSize: '16px', color: '#555' },
  quantityControls: { display: 'flex', alignItems: 'center', gap: '10px' },
  qtyButton: { padding: '5px 10px', fontSize: '16px', cursor: 'pointer' },
  removeButton: { color: 'red', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '20px' },
  cartTotal: { marginTop: '20px', textAlign: 'right', fontSize: '24px', fontWeight: 'bold' },
  emptyCart: { textAlign: 'center', fontSize: '18px', marginTop: '30px' },
  backLink: { display: 'inline-block', marginTop: '20px', color: '#007bff', textDecoration: 'none' },
  checkoutButton: {
    display: 'block',
    width: '100%',
    padding: '15px',
    marginTop: '20px',
    background: '#28a745',
    color: 'white',
    fontSize: '20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    const storeId = prompt("Ingresa el ID de la tienda donde realizarás la compra (ej. 1 para Miraflores, 2 para Pradera Xela):", "1");
    if (!storeId) return;

    const customerId = 1; 

    try {
      setLoading(true);
      const response = await fetch('https://store-online-sa-backend.onrender.com/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: parseInt(storeId),
          customerId: customerId,
          items: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar la compra');
      }

      alert(`¡Compra realizada con éxito!\nFactura ID: ${data.saleId}\nTotal: Q${total.toFixed(2)}`);
      clearCart(); 
      navigate('/'); 

    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tu Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <p>Tu carrito está vacío.</p>
          <Link to="/" style={styles.backLink}>&larr; Volver a la tienda</Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div style={styles.cartItem} key={item.id}>
              <div style={{ width: '80px', height: '80px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                📷
              </div>
              
              <div style={styles.itemDetails}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>Q {item.price.toFixed(2)} x {item.quantity} = <strong>Q {(item.price * item.quantity).toFixed(2)}</strong></p>
              </div>

              <div style={styles.quantityControls}>
                <button style={styles.qtyButton} onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button style={styles.qtyButton} onClick={() => addToCart(item)}>+</button>
              </div>
              
              <button style={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                Eliminar
              </button>
            </div>
          ))}

          <div style={styles.cartTotal}>
            Total: Q {total.toFixed(2)}
          </div>
          
          <button 
            style={{...styles.checkoutButton, opacity: loading ? 0.7 : 1}} 
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Finalizar Compra'}
          </button>

          <Link to="/" style={styles.backLink}>&larr; Seguir comprando</Link>
        </div>
      )}
    </div>
  );
}