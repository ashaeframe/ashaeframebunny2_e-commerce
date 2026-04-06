import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import "../styles/AnalyticsReports.css";

const AnalyticsReports = () => {
  const navigate = useNavigate();

  const categoryData = [
    { name: "Electronics", value: 4500 },
    { name: "Fashion", value: 3200 },
    { name: "Home & Garden", value: 2800 },
    { name: "Sports", value: 1900 },
    { name: "Books", value: 1200 },
  ];

  const monthlyData = [
    { month: "Jan", sales: 12400, profit: 3100 },
    { month: "Feb", sales: 15300, profit: 3800 },
    { month: "Mar", sales: 18200, profit: 4500 },
    { month: "Apr", sales: 14800, profit: 3600 },
    { month: "May", sales: 22100, profit: 5500 },
    { month: "Jun", sales: 19800, profit: 4900 },
  ];

  const COLORS = ["#3AB46F", "#FCB045", "#FD1D1D", "#FF6B6B", "#4ECDC4"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name || payload[0].payload.month}</p>
          <p className="value">${(payload[0].value || 0).toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h1>📈 Analytics & Reports</h1>
      </div>

      <div className="management-stats">
        <div className="stat-card">
          <span className="stat-label">Total Sales</span>
          <span className="stat-value">$82,400</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Profit</span>
          <span className="stat-value">$21,400</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Profit Margin</span>
          <span className="stat-value">26%</span>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-card">
          <h2>Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Monthly Sales & Profit</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="sales" fill="#3AB46F" radius={[8, 8, 0, 0]} name="Sales ($)" />
              <Bar dataKey="profit" fill="#FD1D1D" radius={[8, 8, 0, 0]} name="Profit ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="reports-section">
        <h2>📊 Key Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-label">Avg Order Value</span>
            <span className="metric-value">$156.50</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Total Orders</span>
            <span className="metric-value">527</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Conversion Rate</span>
            <span className="metric-value">3.2%</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Customer Retention</span>
            <span className="metric-value">65%</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Return Rate</span>
            <span className="metric-value">2.1%</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Avg Customer Value</span>
            <span className="metric-value">$2,450</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;
