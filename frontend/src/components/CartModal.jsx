import React from 'react';

export default function CartModal({ cart, onUpdateQuantity, onRemove, onClose, onProceedToCheckout }) {
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <h2>RestoPi Active Order</h2>
          <p style={{ margin: '2rem 0', textAlign: 'center', color: '#64748b' }}>No items added to current check.</p>
          <button className="add-btn" onClick={onClose} style={{ width: '100%' }}>Close Panel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>RestoPi Active Order</h2>
        <div style={{ marginTop: '1rem' }}>
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div>
                <h4>{item.name}</h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>${item.price.toFixed(2)} each</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button style={{ padding: '2px 8px', cursor: 'pointer' }} onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button style={{ padding: '2px 8px', cursor: 'pointer' }} onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                <button style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', marginLeft: '6px' }} onClick={() => onRemove(item._id)}>🗑️</button>
              </div>
              <div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', fontSize: '1.2rem', borderTop: '2px solid #f1f5f9', paddingTop: '1rem' }}>
          <strong>Subtotal Summary:</strong>
          <strong>${totalAmount.toFixed(2)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '2rem' }}>
          <button style={{ padding: '0.7rem 1rem', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }} onClick={onClose}>Back to Menu</button>
          <button className="add-btn" onClick={onProceedToCheckout}>Proceed to Table/Customer Checkout</button>
        </div>
      </div>
    </div>
  );
}