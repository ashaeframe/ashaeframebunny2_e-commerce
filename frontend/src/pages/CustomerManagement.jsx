import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CustomerManagement.css";

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "555-0101", orders: 5, spent: "$450.00" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "555-0102", orders: 8, spent: "$680.50" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "555-0103", orders: 3, spent: "$245.75" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", phone: "555-0104", orders: 12, spent: "$1,200.00" },
    { id: 5, name: "Tom Brown", email: "tom@example.com", phone: "555-0105", orders: 7, spent: "$560.25" },
  ]);

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h1>👥 Customer Management</h1>
      </div>

      <div className="management-stats">
        <div className="stat-card">
          <span className="stat-label">Total Customers</span>
          <span className="stat-value">{customers.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">{customers.reduce((sum, c) => sum + c.orders, 0)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Revenue</span>
          <span className="stat-value">$3,136.50</span>
        </div>
      </div>

      <div className="management-table-container">
        <table className="management-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="customer-name">{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td className="text-center">{customer.orders}</td>
                <td className="amount">{customer.spent}</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="delete-btn" onClick={() => handleDeleteCustomer(customer.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerManagement;
