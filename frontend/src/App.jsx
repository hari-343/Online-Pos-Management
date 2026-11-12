import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import CheckoutForm from './components/CheckoutForm';
import OrderSuccess from './components/OrderSuccess';

export default function App() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('products');
  const [orderDetails, setOrderDetails] = useState(null);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === product._id);
      if (existing) {
        return prevCart.map(item => 
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, qty) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => 
      item._id === productId ? { ...item, quantity: qty } : item
    ));
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ paddingBottom: cart.length > 0 ? '80px' : '0' }}>
      {/* Navbar (மேலே கார்ட் பட்டன் தேவையில்லை என்றால் நீக்கிக் கொள்ளலாம் அல்லது ஹெட்டராகப் பயன்படுத்தலாம்) */}
      <Navbar cartCount={totalCartCount} onOpenCart={() => setView('cart')} />

      {view === 'products' && (
        <ProductList 
          cart={cart} 
          onAddToCart={handleAddToCart} 
          onUpdateQuantity={handleUpdateQuantity} 
        />
      )}

      {view === 'cart' && (
        <CartModal 
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
          onClose={() => setView('products')}
          onProceedToCheckout={() => setView('checkout')}
        />
      )}

      {view === 'checkout' && (
        <CheckoutForm 
          cart={cart}
          onBack={() => setView('cart')}
          onSuccess={(data) => {
            setOrderDetails(data);
            setCart([]);
            setView('success');
          }}
        />
      )}

      {view === 'success' && orderDetails && (
        <OrderSuccess 
          orderDetails={orderDetails}
          onReset={() => {
            setOrderDetails(null);
            setView('products');
          }}
        />
      )}

      {/* 🚀 Bottom Sticky Order Cart Bar (கீழേ நிலைநிறுத்தப்பட்ட கார்ட் பட்டன் பேனல்) */}
      {cart.length > 0 && view === 'products' && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#1e293b',
          color: '#fff',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.15)',
          zIndex: 999
        }}>
          <div>
            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{totalCartCount} Items Added</span>
            <span style={{ margin: '0 10px', color: '#94a3b8' }}>|</span>
            <span style={{ fontSize: '1.1rem', color: '#38bdf8', fontWeight: 'bold' }}>${totalCartAmount.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => setView('cart')}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '0.7rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            View Order Cart 🛒
          </button>
        </div>
      )}
    </div>
  );
}
