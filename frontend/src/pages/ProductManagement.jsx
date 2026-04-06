import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import headphones from "../assets/product-headphones.svg";
import cable from "../assets/product-cable.svg";
import phoneCase from "../assets/product-case.svg";
import protector from "../assets/product-protector.svg";
import stand from "../assets/product-stand.svg";
import keyboard from "../assets/product-keyboard.svg";
import "../styles/ProductManagement.css";

const ProductManagement = () => {
  const navigate = useNavigate();
  const productImages = {
    1: headphones,
    2: cable,
    3: phoneCase,
    4: protector,
    5: stand,
    6: keyboard,
  };

  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: "$89.99", stock: 45, status: "Active" },
    { id: 2, name: "USB-C Cable", category: "Accessories", price: "$12.99", stock: 120, status: "Active" },
    { id: 3, name: "Phone Case", category: "Accessories", price: "$15.99", stock: 80, status: "Active" },
    { id: 4, name: "Screen Protector", category: "Accessories", price: "$8.99", stock: 200, status: "Active" },
    { id: 5, name: "Laptop Stand", category: "Electronics", price: "$34.99", stock: 30, status: "Low Stock" },
    { id: 6, name: "Keyboard", category: "Electronics", price: "$65.99", stock: 0, status: "Out of Stock" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", stock: "" });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
      setProducts([...products, { id: products.length + 1, ...newProduct, status: "Active" }]);
      setNewProduct({ name: "", category: "", price: "", stock: "" });
      setShowModal(false);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#3AB46F";
      case "Low Stock":
        return "#FCB045";
      case "Out of Stock":
        return "#FD1D1D";
      default:
        return "#888";
    }
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h1>📦 Product Management</h1>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      <div className="management-stats">
        <div className="stat-card">
          <span className="stat-label">Total Products</span>
          <span className="stat-value">{products.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Products</span>
          <span className="stat-value">{products.filter((p) => p.status === "Active").length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Low Stock</span>
          <span className="stat-value">{products.filter((p) => p.status === "Low Stock").length}</span>
        </div>
      </div>

      <div className="management-table-container">
        <table className="management-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="product-image-cell">
                  <img src={productImages[product.id]} alt={product.name} className="product-thumbnail" />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(product.status) }}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <div className="modal-buttons">
              <button className="btn-save" onClick={handleAddProduct}>
                Save
              </button>
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
