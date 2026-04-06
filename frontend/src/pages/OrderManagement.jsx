import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OrderManagement.css";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    { id: "#ORD001", customer: "John Doe", amount: "$89.99", date: "2025-01-28", status: "Delivered" },
    { id: "#ORD002", customer: "Jane Smith", amount: "$45.50", date: "2025-01-27", status: "Shipped" },
    { id: "#ORD003", customer: "Mike Johnson", amount: "$125.00", date: "2025-01-26", status: "Processing" },
    { id: "#ORD004", customer: "Sarah Williams", amount: "$67.99", date: "2025-01-25", status: "Pending" },
    { id: "#ORD005", customer: "Tom Brown", amount: "$199.99", date: "2025-01-24", status: "Delivered" },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#3AB46F";
      case "Shipped":
        return "#FCB045";
      case "Processing":
        return "#4ECDC4";
      case "Pending":
        return "#FD1D1D";
      default:
        return "#888";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order)));
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h1>📋 Order Management</h1>
      </div>

      <div className="management-stats">
        <div className="stat-card">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">{orders.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{orders.filter((o) => o.status === "Pending").length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Delivered</span>
          <span className="stat-value">{orders.filter((o) => o.status === "Delivered").length}</span>
        </div>
      </div>

      <div className="management-table-container">
        <table className="management-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>{order.customer}</td>
                <td className="amount">{order.amount}</td>
                <td>{order.date}</td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    className="status-select"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
