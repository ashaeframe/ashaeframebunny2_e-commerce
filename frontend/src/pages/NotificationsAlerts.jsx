import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotificationsAlerts.css";

const NotificationsAlerts = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, type: "Order", title: "New Order Received", message: "Order #ORD006 from John Doe", date: "2 mins ago", read: false },
    { id: 2, type: "Inventory", title: "Low Stock Alert", message: "Product 'Laptop Stand' stock below reorder level", date: "30 mins ago", read: false },
    { id: 3, type: "Payment", title: "Payment Failed", message: "Payment for Order #ORD004 failed. Retry needed.", date: "1 hour ago", read: false },
    { id: 4, type: "Customer", title: "New Customer", message: "New customer registered: Emma Davis", date: "2 hours ago", read: true },
    { id: 5, type: "System", title: "System Update", message: "Database backup completed successfully", date: "4 hours ago", read: true },
    { id: 6, type: "Order", title: "Order Shipped", message: "Order #ORD005 shipped to Tom Brown", date: "5 hours ago", read: true },
    { id: 7, type: "Review", title: "New Product Review", message: "5-star review on 'Wireless Headphones'", date: "6 hours ago", read: true },
    { id: 8, type: "Inventory", title: "Stock Update", message: "Received shipment for 'USB-C Cable' - 100 units", date: "8 hours ago", read: true },
  ]);

  const [filterType, setFilterType] = useState("All");

  const getNotificationColor = (type) => {
    switch (type) {
      case "Order":
        return "#3AB46F";
      case "Inventory":
        return "#FCB045";
      case "Payment":
        return "#FD1D1D";
      case "Customer":
        return "#4ECDC4";
      case "System":
        return "#9B59B6";
      case "Review":
        return "#FFD93D";
      default:
        return "#888";
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "Order":
        return "📋";
      case "Inventory":
        return "📊";
      case "Payment":
        return "💳";
      case "Customer":
        return "👥";
      case "System":
        return "⚙️";
      case "Review":
        return "⭐";
      default:
        return "🔔";
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications = filterType === "All" ? notifications : notifications.filter((n) => n.type === filterType);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="management-container">
      <div className="management-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h1>🔔 Notifications & Alerts</h1>
      </div>

      <div className="management-stats">
        <div className="stat-card">
          <span className="stat-label">Total Notifications</span>
          <span className="stat-value">{notifications.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Unread</span>
          <span className="stat-value" style={{ color: "#FD1D1D" }}>{unreadCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Read</span>
          <span className="stat-value">{notifications.filter((n) => n.read).length}</span>
        </div>
      </div>

      <div className="notifications-filter">
        <div className="filter-buttons">
          {["All", "Order", "Inventory", "Payment", "Customer", "System", "Review"].map((type) => (
            <button
              key={type}
              className={`filter-btn ${filterType === type ? "active" : ""}`}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <p>No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${!notification.read ? "unread" : ""}`}
              style={{ borderLeftColor: getNotificationColor(notification.type) }}
            >
              <div className="notification-icon">{getNotificationIcon(notification.type)}</div>
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="notification-time">{notification.date}</span>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button
                    className="mark-read-btn"
                    onClick={() => handleMarkAsRead(notification.id)}
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteNotification(notification.id)}
                  title="Delete"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsAlerts;
