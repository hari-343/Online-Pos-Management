import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function ProductList({ cart, onAddToCart, onUpdateQuantity }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories:', err));
    
    fetchProducts('all');
  }, []);

  const fetchProducts = (catId) => {
    setSelectedCategory(catId);
    const endpoint = catId === 'all' 
      ? `${API_URL}/api/products` 
      : `${API_URL}/api/products/category/${catId}`;
      
    fetch(endpoint)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  };

  // கார்ட்டில் உள்ள குறிப்பிட்ட பொருளின் எண்ணிக்கையைக் கண்டறிய
  const getCartQuantity = (productId) => {
    const item = cart.find(i => i._id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container">
      <div className="category-tabs">
        <button 
          className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => fetchProducts('all')}
        >
          All Menu Items
        </button>
        {categories.map(cat => (
          <button 
            key={cat._id}
            className={`tab-btn ${selectedCategory === cat._id ? 'active' : ''}`}
            onClick={() => fetchProducts(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {products.map(product => {
          const qty = getCartQuantity(product._id);
          return (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="price">${product.price.toFixed(2)}</div>
                
                {/* பட்டன் கீழே மற்றும் + / - வசதி */}
                {qty === 0 ? (
                  <button className="add-btn" onClick={() => onAddToCart(product)}>
                    Add to Order
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px' }}>
                    <button 
                      onClick={() => onUpdateQuantity(product._id, qty - 1)}
                      style={{ background: '#cbd5e1', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: '600' }}>{qty} in cart</span>
                    <button 
                      onClick={() => onUpdateQuantity(product._id, qty + 1)}
                      style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
