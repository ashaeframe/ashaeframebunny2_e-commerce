import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productPlaceholder from "../assets/product-placeholder.svg";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="dashboard-layout">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>🐰 Bunny</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeSection === "home" ? "active" : ""}`}
            onClick={() => handleNavigation("home")}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </button>
          
          <button
            className={`nav-item ${activeSection === "products" ? "active" : ""}`}
            onClick={() => handleNavigation("products")}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">Products</span>
          </button>
          
          <button
            className={`nav-item ${activeSection === "contact" ? "active" : ""}`}
            onClick={() => handleNavigation("contact")}
          >
            <span className="nav-icon">📧</span>
            <span className="nav-text">Contact Information</span>
          </button>

          <div className="sidebar-divider"></div>

          <button className="nav-item" onClick={() => navigate("/product-management")}>
            <span className="nav-icon">📦</span>
            <span className="nav-text">Product Management</span>
          </button>

          <button className="nav-item" onClick={() => navigate("/order-management")}>
            <span className="nav-icon">📋</span>
            <span className="nav-text">Order Management</span>
          </button>

          <button className="nav-item" onClick={() => navigate("/customer-management")}>
            <span className="nav-icon">👥</span>
            <span className="nav-text">Customer Management</span>
          </button>

          <button className="nav-item" onClick={() => navigate("/payments-transactions")}>
            <span className="nav-icon">💳</span>
            <span className="nav-text">Payments & Transactions</span>
          </button>

          <button className="nav-item" onClick={() => navigate("/inventory-management")}>
            <span className="nav-icon">📊</span>
            <span className="nav-text">Inventory Management</span>
          </button>

          <button className="nav-item" onClick={() => navigate("/analytics-reports")}>
            <span className="nav-icon">📈</span>
            <span className="nav-text">Analytics & Reports</span>
          </button>

          <button className="nav-item" onClick={() => navigate("/admin-user-roles")}>
            <span className="nav-icon">👤</span>
            <span className="nav-text">Admin & User Roles</span>
          </button>

          <button className="nav-item" onClick={() => navigate("/notifications-alerts")}>
            <span className="nav-icon">🔔</span>
            <span className="nav-text">Notifications & Alerts</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Header with Stats and Logout */}
        <div className="dashboard-top">
          <div className="top-stats">
            <button
              className="top-stat-item clickable-stat"
              onClick={() => navigate("/orders-analytics")}
            >
              <span className="stat-label">Total Orders</span>
              <span className="stat-value">12</span>
            </button>
            <button
              className="top-stat-item clickable-stat"
              onClick={() => navigate("/spending-analytics")}
            >
              <span className="stat-label">Total Spent</span>
              <span className="stat-value">$1,250.50</span>
            </button>
          </div>
          
          <div className="top-actions">
            <span className="user-email">{user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="dashboard-content">
          {activeSection === "home" && (
            <div className="section-content">
              <h1>Home</h1>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-details">
                    <p className="stat-label">Total Orders</p>
                    <p className="stat-value">12</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-details">
                    <p className="stat-label">Total Spent</p>
                    <p className="stat-value">$1,250.50</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🎁</div>
                  <div className="stat-details">
                    <p className="stat-label">Active Cart</p>
                    <p className="stat-value">3 Items</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-details">
                    <p className="stat-label">Loyalty Points</p>
                    <p className="stat-value">450</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-section">
                <h2>Recent Orders</h2>
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#ORD-001</td>
                      <td>Jan 28, 2026</td>
                      <td>$299.99</td>
                      <td><span className="status delivered">Delivered</span></td>
                    </tr>
                    <tr>
                      <td>#ORD-002</td>
                      <td>Jan 25, 2026</td>
                      <td>$150.00</td>
                      <td><span className="status shipped">Shipped</span></td>
                    </tr>
                    <tr>
                      <td>#ORD-003</td>
                      <td>Jan 20, 2026</td>
                      <td>$85.50</td>
                      <td><span className="status delivered">Delivered</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="dashboard-section">
                <h2>Recommended For You</h2>
                <div className="recommendations-grid">
                  <div className="product-item">
                    <div className="product-img"><img src={productPlaceholder} alt="Product 1" /></div>
                    <h3>Product Name</h3>
                    <p className="price">$99.99</p>
                    <button className="add-cart-btn">Add to Cart</button>
                  </div>
                  <div className="product-item">
                    <div className="product-img"><img src={productPlaceholder} alt="Product 2" /></div>
                    <h3>Product Name</h3>
                    <p className="price">$79.99</p>
                    <button className="add-cart-btn">Add to Cart</button>
                  </div>
                  <div className="product-item">
                    <div className="product-img"><img src={productPlaceholder} alt="Product 3" /></div>
                    <h3>Product Name</h3>
                    <p className="price">$59.99</p>
                    <button className="add-cart-btn">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "products" && (
            <div className="section-content">
              <h1>Products</h1>
              <div className="dashboard-section">
                <h2>All Products</h2>
                <div className="products-grid">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="product-item">
                      <div className="product-img"><img src={productPlaceholder} alt={`Product ${item}`} /></div>
                      <h3>Product {item}</h3>
                      <p className="description">High quality product</p>
                      <p className="price">${(50 + item * 10).toFixed(2)}</p>
                      <button className="add-cart-btn">Add to Cart</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div className="section-content">
              <h1>Contact Information</h1>
              <div className="dashboard-section">
                <h2>Get In Touch</h2>
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <div className="contact-details">
                      <h3>Email</h3>
                      <p>support@ecommerce.com</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📱</span>
                    <div className="contact-details">
                      <h3>Phone</h3>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <div className="contact-details">
                      <h3>Address</h3>
                      <p>123 E-Commerce Street, NY 10001</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">🕐</span>
                    <div className="contact-details">
                      <h3>Business Hours</h3>
                      <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="contact-form-section">
                  <h2>Send us a Message</h2>
                  <form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" placeholder="Your message..." rows="5"></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
