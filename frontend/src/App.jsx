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

  return (
    <div>
      <Navbar cartCount={totalCartCount} onOpenCart={() => setView('cart')} />

      {view === 'products' && (
        <ProductList onAddToCart={handleAddToCart} />
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
    </div>
  );
}