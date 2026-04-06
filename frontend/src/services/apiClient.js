const API_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('authToken');

// Default headers with auth token
const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// Auth APIs
export const authAPI = {
  register: async (name, email, password, phone = '') => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone }),
    });
    return response.json();
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return response.json();
    } catch (error) {
      console.error("Login request failed:", error);
      return { error: "Unable to connect to server. Is the backend running?" };
    }
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  updateProfile: async (name, phone, address, city, country, zipCode) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ name, phone, address, city, country, zipCode }),
    });
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return response.json();
  },
};

// Product APIs
export const productAPI = {
  getAllProducts: async (category = '', search = '', page = 1, limit = 10) => {
    let url = `${API_URL}/products?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    if (search) url += `&search=${search}`;

    const response = await fetch(url);
    return response.json();
  },

  getProductById: async (productId) => {
    const response = await fetch(`${API_URL}/products/${productId}`);
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${API_URL}/products/categories/all`);
    return response.json();
  },

  createProduct: async (productData) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    return response.json();
  },

  updateProduct: async (productId, productData) => {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(productData),
    });
    return response.json();
  },

  deleteProduct: async (productId) => {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return response.json();
  },
};

// Order APIs
export const orderAPI = {
  createOrder: async (items, shippingAddress, paymentMethod) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ items, shippingAddress, paymentMethod }),
    });
    return response.json();
  },

  getUserOrders: async () => {
    const response = await fetch(`${API_URL}/orders/user/my-orders`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  getOrderById: async (orderId) => {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  getAllOrders: async (status = '', page = 1, limit = 10) => {
    let url = `${API_URL}/orders/admin/all?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;

    const response = await fetch(url, {
      headers: getHeaders(),
    });
    return response.json();
  },

  updateOrderStatus: async (orderId, status, paymentStatus) => {
    const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status, paymentStatus }),
    });
    return response.json();
  },

  getOrderStats: async () => {
    const response = await fetch(`${API_URL}/orders/stats/summary`, {
      headers: getHeaders(),
    });
    return response.json();
  },
};

// Customer APIs
export const customerAPI = {
  getAllCustomers: async (page = 1, limit = 10, status = '') => {
    let url = `${API_URL}/customers?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;

    const response = await fetch(url, {
      headers: getHeaders(),
    });
    return response.json();
  },

  getCustomerById: async (customerId) => {
    const response = await fetch(`${API_URL}/customers/${customerId}`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  updateCustomer: async (customerId, customerData) => {
    const response = await fetch(`${API_URL}/customers/${customerId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(customerData),
    });
    return response.json();
  },

  getCustomerStats: async () => {
    const response = await fetch(`${API_URL}/customers/stats/summary`, {
      headers: getHeaders(),
    });
    return response.json();
  },
};

// Payment APIs
export const paymentAPI = {
  createPayment: async (orderId, amount, paymentMethod, cardDetails = {}) => {
    const response = await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ orderId, amount, paymentMethod, cardDetails }),
    });
    return response.json();
  },

  getUserPayments: async () => {
    const response = await fetch(`${API_URL}/payments/user/my-payments`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  getAllPayments: async (status = '', page = 1, limit = 10) => {
    let url = `${API_URL}/payments/admin/all?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;

    const response = await fetch(url, {
      headers: getHeaders(),
    });
    return response.json();
  },

  getPaymentStats: async () => {
    const response = await fetch(`${API_URL}/payments/stats/summary`, {
      headers: getHeaders(),
    });
    return response.json();
  },
};

// Inventory APIs
export const inventoryAPI = {
  getAllInventory: async (status = '', page = 1, limit = 10) => {
    let url = `${API_URL}/inventory?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;

    const response = await fetch(url, {
      headers: getHeaders(),
    });
    return response.json();
  },

  getInventoryItem: async (itemId) => {
    const response = await fetch(`${API_URL}/inventory/${itemId}`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  updateInventoryStock: async (itemId, currentStock, reorderQuantity) => {
    const response = await fetch(`${API_URL}/inventory/${itemId}/stock`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ currentStock, reorderQuantity }),
    });
    return response.json();
  },

  getLowStockItems: async () => {
    const response = await fetch(`${API_URL}/inventory/items/low-stock`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  getInventoryStats: async () => {
    const response = await fetch(`${API_URL}/inventory/stats/summary`, {
      headers: getHeaders(),
    });
    return response.json();
  },
};

export default {
  authAPI,
  productAPI,
  orderAPI,
  customerAPI,
  paymentAPI,
  inventoryAPI,
};
