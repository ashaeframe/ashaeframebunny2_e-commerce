import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminUserRoles.css";

const AdminUserRoles = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@bunny.com", role: "Admin", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "John Manager", email: "john@bunny.com", role: "Manager", status: "Active", joinDate: "2024-06-20" },
    { id: 3, name: "Sarah Staff", email: "sarah@bunny.com", role: "Staff", status: "Active", joinDate: "2024-08-10" },
    { id: 4, name: "Mike Supervisor", email: "mike@bunny.com", role: "Supervisor", status: "Inactive", joinDate: "2024-03-05" },
    { id: 5, name: "Lisa Editor", email: "lisa@bunny.com", role: "Editor", status: "Active", joinDate: "2024-09-01" },
  ]);

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const rolePermissions = {
    Admin: ["Full Access", "User Management", "System Settings", "Reports", "Payments"],
    Manager: ["Order Management", "Customer View", "Reports", "Product Management"],
    Supervisor: ["Order Management", "Customer View", "Product View"],
    Staff: ["Order View", "Customer View"],
    Editor: ["Product Management", "Content Management"],
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "#FD1D1D";
      case "Manager":
        return "#3AB46F";
      case "Supervisor":
        return "#FCB045";
      case "Staff":
        return "#4ECDC4";
      case "Editor":
        return "#FFD93D";
      default:
        return "#888";
    }
  };

  const getStatusColor = (status) => {
    return status === "Active" ? "#3AB46F" : "#FD1D1D";
  };

  const handleChangeRole = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  const handleSaveRole = () => {
    setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, role: newRole } : u)));
    setShowRoleModal(false);
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u)));
  };

  return (
    <div className="management-container">
      <div className="management-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
        <h1>👤 Admin & User Roles</h1>
      </div>

      <div className="management-stats">
        <div className="stat-card">
          <span className="stat-label">Total Users</span>
          <span className="stat-value">{users.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Users</span>
          <span className="stat-value">{users.filter((u) => u.status === "Active").length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Admins</span>
          <span className="stat-value">{users.filter((u) => u.role === "Admin").length}</span>
        </div>
      </div>

      <div className="management-table-container">
        <table className="management-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="user-name">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="role-badge" style={{ backgroundColor: getRoleColor(user.role) }}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(user.status) }}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleChangeRole(user)}>
                    Change Role
                  </button>
                  <button
                    className="toggle-btn"
                    onClick={() => handleToggleStatus(user.id)}
                    style={{
                      backgroundColor: user.status === "Active" ? "#FD1D1D" : "#3AB46F",
                    }}
                  >
                    {user.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="role-permissions">
        <h2>📋 Role Permissions</h2>
        <div className="permissions-grid">
          {Object.entries(rolePermissions).map(([role, permissions]) => (
            <div key={role} className="permission-card">
              <h3 style={{ color: getRoleColor(role) }}>{role}</h3>
              <ul>
                {permissions.map((permission, idx) => (
                  <li key={idx}>✓ {permission}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {showRoleModal && (
        <div className="modal-overlay" onClick={() => setShowRoleModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Change User Role</h2>
            <p className="modal-user">{selectedUser?.name}</p>
            <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option>Admin</option>
              <option>Manager</option>
              <option>Supervisor</option>
              <option>Staff</option>
              <option>Editor</option>
            </select>
            <div className="modal-buttons">
              <button className="btn-save" onClick={handleSaveRole}>
                Save
              </button>
              <button className="btn-cancel" onClick={() => setShowRoleModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserRoles;
