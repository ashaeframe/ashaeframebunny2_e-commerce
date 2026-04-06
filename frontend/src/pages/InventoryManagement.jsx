import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InventoryManagement.css";

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([
    { id: 1, product: "Wireless Headphones", sku: "WH-001", stock: 45, reorderLevel: 20, status: "In Stock" },
    { id: 2, product: "USB-C Cable", sku: "USB-002", stock: 120, reorderLevel: 50, status: "In Stock" },
    { id: 3, product: "Phone Case", sku: "PC-003", stock: 80, reorderLevel: 30, status: "In Stock" },
    { id: 4, product: "Screen Protector", sku: "SP-004", stock: 200, reorderLevel: 100, status: "In Stock" },
    { id: 5, product: "Laptop Stand", sku: "LS-005", stock: 30, reorderLevel: 25, status: "Low Stock" },
    { id: 6, product: "Keyboard", sku: "KB-006", stock: 0, reorderLevel: 15, status: "Out of Stock" },
  ]);

  const handleUpdateStock = (id, newStock) => {
    setInventory(inventory.map((item) => {
      const status = newStock === 0 ? "Out of Stock" : newStock <= item.reorderLevel ? "Low Stock" : "In Stock";
      return item.id === id ? { ...item, stock: newStock, status } : item;
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "#3AB46F";
      case "Low Stock":
        return "#FCB045";
      case "Out of Stock":
        return "#FD1D1D";
      default:
        return "#888";
    }
  };

  const totalStock = inventory.reduce((sum, item) => sum + item.stock, 0);
  const lowStockItems = inventory.filter((item) => item.status === "Low Stock" || item.status === "Out of Stock").length;

  return (
    <div className="management-container">
      <div className="management-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h1>📊 Inventory / Stock Management</h1>
      </div>

      <div className="management-stats">
        <div className="stat-card">
          <span className="stat-label">Total Items</span>
          <span className="stat-value">{inventory.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Stock</span>
          <span className="stat-value">{totalStock}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Low Stock Alert</span>
          <span className="stat-value" style={{ color: "#FD1D1D" }}>{lowStockItems}</span>
        </div>
      </div>

      <div className="inventory-filter">
        <input type="text" placeholder="Search product..." className="search-box" />
        <select className="filter-select">
          <option>All Status</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      <div className="management-table-container">
        <table className="management-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="product-name">{item.product}</td>
                <td className="sku">{item.sku}</td>
                <td>
                  <input
                    type="number"
                    className="stock-input"
                    value={item.stock}
                    onChange={(e) => handleUpdateStock(item.id, parseInt(e.target.value) || 0)}
                  />
                </td>
                <td className="reorder-level">{item.reorderLevel}</td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(item.status) }}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="reorder-btn">Reorder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManagement;
