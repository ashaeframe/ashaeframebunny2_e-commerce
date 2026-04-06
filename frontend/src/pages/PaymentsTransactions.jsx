import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../styles/PaymentsTransactions.css";

const PaymentsTransactions = () => {
  const navigate = useNavigate();

  const transactionData = [
    { month: "Jan", revenue: 12400, transactions: 42 },
    { month: "Feb", revenue: 15300, transactions: 58 },
    { month: "Mar", revenue: 18200, transactions: 72 },
    { month: "Apr", revenue: 14800, transactions: 65 },
    { month: "May", revenue: 22100, transactions: 89 },
    { month: "Jun", revenue: 19800, transactions: 78 },
  ];

  const [transactions, setTransactions] = useState([
    { id: 1, orderId: "#ORD001", amount: "$89.99", method: "Credit Card", date: "2025-01-28", status: "Success" },
    { id: 2, orderId: "#ORD002", amount: "$45.50", method: "PayPal", date: "2025-01-27", status: "Success" },
    { id: 3, orderId: "#ORD003", amount: "$125.00", method: "Debit Card", date: "2025-01-26", status: "Success" },
    { id: 4, orderId: "#ORD004", amount: "$67.99", method: "Credit Card", date: "2025-01-25", status: "Failed" },
    { id: 5, orderId: "#ORD005", amount: "$199.99", method: "Wallet", date: "2025-01-24", status: "Success" },
  ]);

  const getStatusColor = (status) => {
    return status === "Success" ? "#3AB46F" : "#FD1D1D";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.month}</p>
          <p className="value">Revenue: ${payload[0].payload.revenue.toLocaleString()}</p>
          <p className="value">Transactions: {payload[0].payload.transactions}</p>
        </div>
      );
    }
    return null;
  };

  const totalRevenue = transactions
    .filter((t) => t.status === "Success")
    .reduce((sum, t) => sum + parseFloat(t.amount.slice(1)), 0);

  return (
    <div className="management-container">
      <div className="management-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h1>💳 Payments & Transactions</h1>
      </div>

      <div className="management-stats">
        <div className="stat-card">
          <span className="stat-label">Total Revenue (6M)</span>
          <span className="stat-value">$82,400</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Transactions</span>
          <span className="stat-value">{transactions.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Success Rate</span>
          <span className="stat-value">80%</span>
        </div>
      </div>

      <div className="chart-container">
        <h2>Revenue & Transactions Trend</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={transactionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3AB46F" strokeWidth={3} name="Revenue ($)" />
            <Line type="monotone" dataKey="transactions" stroke="#FD1D1D" strokeWidth={3} name="Transactions" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="management-table-container">
        <h2>Recent Transactions</h2>
        <table className="management-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="order-id">{transaction.orderId}</td>
                <td className="amount">{transaction.amount}</td>
                <td>{transaction.method}</td>
                <td>{transaction.date}</td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(transaction.status) }}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsTransactions;
