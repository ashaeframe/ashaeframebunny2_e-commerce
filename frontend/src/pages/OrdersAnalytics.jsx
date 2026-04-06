import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import "../styles/OrdersAnalytics.css";

const OrdersAnalytics = () => {
  const navigate = useNavigate();

  const ordersData = [
    { month: "Jan", orders: 8, value: 320 },
    { month: "Feb", orders: 12, value: 450 },
    { month: "Mar", orders: 15, value: 580 },
    { month: "Apr", orders: 10, value: 390 },
    { month: "May", orders: 18, value: 720 },
    { month: "Jun", orders: 12, value: 490 },
  ];

  const recentOrders = [
    { id: "#ORD001", date: "2025-01-28", product: "Wireless Headphones", amount: "$89.99", status: "Delivered" },
    { id: "#ORD002", date: "2025-01-27", product: "USB-C Cable", amount: "$12.99", status: "Delivered" },
    { id: "#ORD003", date: "2025-01-26", product: "Phone Case", amount: "$15.99", status: "In Transit" },
    { id: "#ORD004", date: "2025-01-25", product: "Screen Protector", amount: "$8.99", status: "Processing" },
    { id: "#ORD005", date: "2025-01-24", product: "Laptop Stand", amount: "$34.99", status: "Delivered" },
    { id: "#ORD006", date: "2025-01-23", product: "Keyboard", amount: "$65.99", status: "Delivered" },
  ];

  const COLORS = ["#3AB46F", "#FCB045", "#FD1D1D", "#FF6B6B", "#4ECDC4", "#FFD93D"];

  const totalOrders = ordersData.reduce((sum, item) => sum + item.orders, 0);
  const totalOrderValue = ordersData.reduce((sum, item) => sum + item.value, 0);
  const avgOrderValue = (totalOrderValue / totalOrders).toFixed(2);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#3AB46F";
      case "In Transit":
        return "#FCB045";
      case "Processing":
        return "#FD1D1D";
      default:
        return "#888";
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.month}</p>
          <p className="value">Orders: {payload[0].payload.orders}</p>
          <p className="value">Value: ${payload[0].payload.value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="orders-analytics-container">
      <div className="analytics-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
        <h1>📊 Orders Analytics</h1>
      </div>

      <div className="analytics-stats">
        <div className="stat-card">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">{totalOrders}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Value</span>
          <span className="stat-value">${totalOrderValue.toLocaleString()}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg. Order Value</span>
          <span className="stat-value">${avgOrderValue}</span>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-container">
          <h2>Orders Trend (Last 6 Months)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="orders" fill="#3AB46F" name="Number of Orders" radius={[8, 8, 0, 0]}>
                {ordersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-orders-section">
        <h2>📦 Recent Orders</h2>
        <div className="orders-table">
          <div className="table-header">
            <div className="col-id">Order ID</div>
            <div className="col-date">Date</div>
            <div className="col-product">Product</div>
            <div className="col-amount">Amount</div>
            <div className="col-status">Status</div>
          </div>
          {recentOrders.map((order, index) => (
            <div key={index} className="table-row">
              <div className="col-id">{order.id}</div>
              <div className="col-date">{order.date}</div>
              <div className="col-product">{order.product}</div>
              <div className="col-amount">{order.amount}</div>
              <div className="col-status">
                <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersAnalytics;
