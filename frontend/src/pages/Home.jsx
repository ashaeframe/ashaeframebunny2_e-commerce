import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import homeBanner from "../assets/home-banner.svg";
import productPlaceholder from "../assets/product-placeholder.svg";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to Bunny 🐰</h1>
          <p>Your Ultimate Online Shopping Destination</p>
          <button className="hero-cta">Shop Now</button>
        </div>
        <div className="hero-image">
          <img src={homeBanner} alt="Bunny Store" />
        </div>
      </div>

      {/* Products Section */}
      <section className="products-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Discover our amazing collection</p>
        </div>
        
        <div className="products-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="product-card">
              <div className="product-image">
                <img src={productPlaceholder} alt={`Product ${item}`} />
              </div>
              <div className="product-info">
                <h3>Product {item}</h3>
                <p className="description">Amazing quality product</p>
                <p className="price">${(50 + item * 15).toFixed(2)}</p>
                <button className="add-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;