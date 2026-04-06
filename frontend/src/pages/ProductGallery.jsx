import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import headphones from "../assets/product-headphones.svg";
import cable from "../assets/product-cable.svg";
import phoneCase from "../assets/product-case.svg";
import protector from "../assets/product-protector.svg";
import stand from "../assets/product-stand.svg";
import keyboard from "../assets/product-keyboard.svg";
import "../styles/ProductGallery.css";

const ProductGallery = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: "Wireless Headphones", price: "$89.99", image: headphones, rating: 4.5, reviews: 324, description: "Premium wireless headphones with noise cancellation" },
    { id: 2, name: "USB-C Cable", price: "$12.99", image: cable, rating: 4.2, reviews: 156, description: "Fast charging 2m USB-C cable" },
    { id: 3, name: "Phone Case", price: "$15.99", image: phoneCase, rating: 4.7, reviews: 512, description: "Durable protective phone case" },
    { id: 4, name: "Screen Protector", price: "$8.99", image: protector, rating: 4.3, reviews: 289, description: "Tempered glass screen protector" },
    { id: 5, name: "Laptop Stand", price: "$34.99", image: stand, rating: 4.6, reviews: 178, description: "Adjustable ergonomic laptop stand" },
    { id: 6, name: "Mechanical Keyboard", price: "$65.99", image: keyboard, rating: 4.8, reviews: 445, description: "Professional RGB mechanical keyboard" },
  ];

  const handleAddToCart = (product) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    sessionStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="product-gallery-container">
      <div className="gallery-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h1>🛍️ Product Gallery</h1>
        <div className="cart-info">
          <span className="cart-count">{cart.length}</span>
          items in cart
        </div>
      </div>

      <div className="gallery-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product)}
          >
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="rating">
                <span className="stars">⭐ {product.rating}</span>
                <span className="reviews">({product.reviews})</span>
              </div>
              <p className="description">{product.description}</p>
              <div className="product-footer">
                <span className="price">{product.price}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>×</button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-details">
                <h2>{selectedProduct.name}</h2>
                <div className="modal-rating">
                  <span className="stars">⭐ {selectedProduct.rating}</span>
                  <span className="reviews">({selectedProduct.reviews} reviews)</span>
                </div>
                <p className="modal-description">{selectedProduct.description}</p>
                <div className="modal-specs">
                  <div className="spec-item">
                    <span className="spec-label">Price</span>
                    <span className="spec-value">{selectedProduct.price}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Stock Status</span>
                    <span className="spec-value">✓ In Stock</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Shipping</span>
                    <span className="spec-value">🚚 Free Shipping</span>
                  </div>
                </div>
                <button
                  className="modal-add-btn"
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
