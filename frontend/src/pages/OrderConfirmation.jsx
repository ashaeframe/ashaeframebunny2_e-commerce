import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OrderConfirmation.css";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const order = JSON.parse(sessionStorage.getItem("orderData"));
    if (!order) {
      navigate("/products");
      return;
    }
    setOrderData(order);

    // Store order in user's order history
    const userOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
    userOrders.push(order);
    localStorage.setItem("userOrders", JSON.stringify(userOrders));

    // Clear order data from session after viewing
    const timer = setTimeout(() => {
      sessionStorage.removeItem("orderData");
    }, 60000); // Clear after 1 minute

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!orderData) {
    return null;
  }

  return (
    <div className="order-confirmation-container">
      {showConfetti && (
        <div className="confetti-animation">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti"></div>
          ))}
        </div>
      )}

      <div className="confirmation-content">
        <div className="success-header">
          <div className="success-icon">
            <span>🎉</span>
          </div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase</p>
        </div>

        <div className="order-card">
          <div className="order-number">
            <span className="label">Order Number</span>
            <span className="value">{orderData.orderId}</span>
          </div>
          <div className="order-date">
            <span className="label">Order Date</span>
            <span className="value">{orderData.date}</span>
          </div>
          <div className="order-status">
            <span className="label">Status</span>
            <span className="status-badge processing">Processing</span>
          </div>
        </div>

        <div className="shipping-address-section">
          <h2>Shipping Address</h2>
          <div className="address-details">
            <p>
              <strong>{orderData.shippingAddress.name}</strong>
            </p>
            <p>{orderData.shippingAddress.address}</p>
            <p>📧 {orderData.shippingAddress.email}</p>
            <p>📱 {orderData.shippingAddress.phone}</p>
          </div>
        </div>

        <div className="order-items-section">
          <h2>Order Items</h2>
          <div className="items-list">
            {orderData.items.map((item, index) => (
              <div key={index} className="confirmation-item">
                <span className="item-name">
                  {item.name} × {item.quantity}
                </span>
                <span className="item-subtotal">
                  ${((item.name === "Wireless Headphones" ? 89.99 : 
                      item.name === "USB-C Cable" ? 12.99 :
                      item.name === "Phone Case" ? 15.99 :
                      item.name === "Screen Protector" ? 8.99 :
                      item.name === "Laptop Stand" ? 34.99 : 65.99) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary-section">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${orderData.total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>${(orderData.total * 0.1).toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{orderData.total > 100 ? "FREE" : "$9.99"}</span>
          </div>
          <div className="summary-total">
            <span>Total Paid</span>
            <span>
              ${(
                orderData.total +
                orderData.total * 0.1 +
                (orderData.total > 100 ? 0 : 9.99)
              ).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="timeline-section">
          <h2>Order Timeline</h2>
          <div className="timeline">
            <div className="timeline-item completed">
              <div className="timeline-marker">✓</div>
              <div className="timeline-content">
                <h3>Order Confirmed</h3>
                <p>Just now</p>
              </div>
            </div>
            <div className="timeline-item pending">
              <div className="timeline-marker">📦</div>
              <div className="timeline-content">
                <h3>Processing</h3>
                <p>We're preparing your order</p>
              </div>
            </div>
            <div className="timeline-item pending">
              <div className="timeline-marker">🚚</div>
              <div className="timeline-content">
                <h3>Shipped</h3>
                <p>Coming soon</p>
              </div>
            </div>
            <div className="timeline-item pending">
              <div className="timeline-marker">📬</div>
              <div className="timeline-content">
                <h3>Delivered</h3>
                <p>Expected within 3-5 days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="btn-primary"
            onClick={() => {
              sessionStorage.removeItem("orderData");
              navigate("/products");
            }}
          >
            Continue Shopping
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              sessionStorage.removeItem("orderData");
              navigate("/dashboard");
            }}
          >
            View My Orders
          </button>
        </div>

        <div className="confirmation-footer">
          <p>
            💌 A confirmation email has been sent to{" "}
            <strong>{orderData.shippingAddress.email}</strong>
          </p>
          <p>Have questions? Contact our support team at support@bunny.com</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
