import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function CheckoutForm({ cart, onBack, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', address: '', city: '', pincode: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    let errs = {};
    if (!formData.name.trim()) errs.name = 'Customer Name is required.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = 'Valid email is required.';
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) errs.mobile = 'Valid 10-digit mobile number required.';
    if (!formData.address.trim()) errs.address = 'Delivery address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!formData.pincode.trim() || !/^\d{5,6}$/.test(formData.pincode)) errs.pincode = 'Valid pincode required.';
    return errs;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setApiError('');
      try {
        const response = await fetch(`${API_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: formData,
            items: cart.map(i => ({ productId: i._id, quantity: i.quantity }))
          })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Checkout failed');
        onSuccess(data);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2>RestoPi POS - Customer & KOT Checkout</h2>
      {apiError && <div style={{ color: '#ef4444', margin: '1rem 0' }}>{apiError}</div>}
      
      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', marginTop: '1rem' }}>
        <h4 style={{ color: '#334155' }}>Order Total Summary: ${totalAmount.toFixed(2)}</h4>
        <form onSubmit={handleSubmit} style={{ marginTop: '1.2netrem' }}>
          <div className="form-group">
            <label>Customer Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
            {errors.mobile && <div className="error-text">{errors.mobile}</div>}
          </div>
          <div className="form-group">
            <label>Delivery / Table Address</label>
            <textarea name="address" rows="2" value={formData.address} onChange={handleChange}></textarea>
            {errors.address && <div className="error-text">{errors.address}</div>}
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
            {errors.city && <div className="error-text">{errors.city}</div>}
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
            {errors.pincode && <div className="error-text">{errors.pincode}</div>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
            <button type="button" onClick={onBack} style={{ padding: '0.6rem 1rem', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Back to Cart</button>
            <button type="submit" className="add-btn" disabled={loading}>
              {loading ? 'Processing via RestoPi...' : 'Place Order & Print KOT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
