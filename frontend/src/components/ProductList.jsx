import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';
// Example: fetch(`${API_URL}/api/products`)

export default function ProductList({ onAddToCart }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
    fetchProducts('all');
  }, []);

  const fetchProducts = (catId) => {
    setSelectedCategory(catId);
    const endpoint = catId === 'all' ? '/api/products' : `/api/products/category/${catId}`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => setProducts(data));
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
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="price">${product.price.toFixed(2)}</div>
              <button className="add-btn" onClick={() => onAddToCart(product)}>
                Add to Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
