import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SpendingAnalytics from "./pages/SpendingAnalytics";
import OrdersAnalytics from "./pages/OrdersAnalytics";
import ProductManagement from "./pages/ProductManagement";
import OrderManagement from "./pages/OrderManagement";
import CustomerManagement from "./pages/CustomerManagement";
import PaymentsTransactions from "./pages/PaymentsTransactions";
import InventoryManagement from "./pages/InventoryManagement";
import AnalyticsReports from "./pages/AnalyticsReports";
import AdminUserRoles from "./pages/AdminUserRoles";
import NotificationsAlerts from "./pages/NotificationsAlerts";
import ProductGallery from "./pages/ProductGallery";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/spending-analytics"
          element={isLoggedIn ? <SpendingAnalytics /> : <Navigate to="/login" />}
        />
        <Route
          path="/orders-analytics"
          element={isLoggedIn ? <OrdersAnalytics /> : <Navigate to="/login" />}
        />
        <Route
          path="/product-management"
          element={isLoggedIn ? <ProductManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/order-management"
          element={isLoggedIn ? <OrderManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/customer-management"
          element={isLoggedIn ? <CustomerManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/payments-transactions"
          element={isLoggedIn ? <PaymentsTransactions /> : <Navigate to="/login" />}
        />
        <Route
          path="/inventory-management"
          element={isLoggedIn ? <InventoryManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/analytics-reports"
          element={isLoggedIn ? <AnalyticsReports /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin-user-roles"
          element={isLoggedIn ? <AdminUserRoles /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications-alerts"
          element={isLoggedIn ? <NotificationsAlerts /> : <Navigate to="/login" />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/products" element={<ProductGallery />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
