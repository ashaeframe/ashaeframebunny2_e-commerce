# Bunny E-Commerce - API Testing Guide

## 🧪 Testing All Endpoints

This guide helps you test every API endpoint using tools like Postman, cURL, or REST Client.

---

## 🔑 Authentication Setup

### 1. Register New User
**POST** `http://localhost:5000/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1-555-0100"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### 2. Login
**POST** `http://localhost:5000/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### 3. Get Profile
**GET** `http://localhost:5000/api/auth/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0100",
    "role": "customer"
  },
  "customer": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "totalOrders": 2,
    "totalSpent": 299.98
  }
}
```

---

## 📦 Product Endpoints

### 1. Get All Products
**GET** `http://localhost:5000/api/products?page=1&limit=10&category=Electronics&search=headphones`

**Response:**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "name": "Wireless Headphones",
      "category": "Electronics",
      "price": 149.99,
      "stock": 50,
      "rating": 4.5,
      "status": "Active"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "pages": 1
  }
}
```

### 2. Get Single Product
**GET** `http://localhost:5000/api/products/507f1f77bcf86cd799439020`

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "name": "Wireless Headphones",
  "category": "Electronics",
  "description": "Premium wireless headphones with noise cancellation",
  "price": 149.99,
  "stock": 50,
  "rating": 4.5,
  "reviews": [],
  "status": "Active"
}
```

### 3. Create Product (Admin Only)
**POST** `http://localhost:5000/api/products`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "name": "New Wireless Speaker",
  "category": "Electronics",
  "description": "Portable Bluetooth speaker",
  "price": 89.99,
  "stock": 100,
  "reorderLevel": 20,
  "image": "/assets/speaker.svg",
  "status": "Active"
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439030",
    "name": "New Wireless Speaker",
    "category": "Electronics",
    "price": 89.99,
    "stock": 100
  }
}
```

### 4. Update Product (Admin Only)
**PUT** `http://localhost:5000/api/products/507f1f77bcf86cd799439020`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "price": 129.99,
  "stock": 45,
  "status": "Active"
}
```

### 5. Delete Product (Admin Only)
**DELETE** `http://localhost:5000/api/products/507f1f77bcf86cd799439020`

**Headers:**
```
Authorization: Bearer {admin-token}
```

---

## 🛒 Order Endpoints

### 1. Create Order
**POST** `http://localhost:5000/api/orders`

**Headers:**
```
Authorization: Bearer {user-token}
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439020",
      "name": "Wireless Headphones",
      "quantity": 2,
      "price": 149.99
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0100",
    "address": "123 Main St"
  },
  "paymentMethod": "Credit Card"
}
```

**Response:**
```json
{
  "message": "Order created successfully",
  "orderId": "ORD-1234567890-ABC123DEF",
  "order": {
    "_id": "507f1f77bcf86cd799439040",
    "orderId": "ORD-1234567890-ABC123DEF",
    "userId": "507f1f77bcf86cd799439011",
    "items": [...],
    "totalAmount": 299.98,
    "tax": 5,
    "shippingCost": 10,
    "grandTotal": 314.98,
    "status": "Pending"
  }
}
```

### 2. Get User Orders
**GET** `http://localhost:5000/api/orders/user/my-orders`

**Headers:**
```
Authorization: Bearer {user-token}
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439040",
    "orderId": "ORD-1234567890-ABC123DEF",
    "items": [...],
    "status": "Shipped",
    "totalAmount": 299.98,
    "grandTotal": 314.98,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### 3. Get All Orders (Admin)
**GET** `http://localhost:5000/api/orders/admin/all?status=Processing&page=1&limit=10`

**Headers:**
```
Authorization: Bearer {admin-token}
```

### 4. Update Order Status (Admin)
**PUT** `http://localhost:5000/api/orders/507f1f77bcf86cd799439040/status`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "status": "Shipped",
  "paymentStatus": "Success"
}
```

### 5. Get Order Statistics (Admin)
**GET** `http://localhost:5000/api/orders/stats/summary`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Response:**
```json
{
  "totalOrders": 25,
  "totalRevenue": 7849.50,
  "ordersByStatus": [
    {"_id": "Pending", "count": 5},
    {"_id": "Processing", "count": 8},
    {"_id": "Shipped", "count": 10},
    {"_id": "Delivered", "count": 2}
  ]
}
```

---

## 👥 Customer Endpoints

### 1. Get All Customers (Admin)
**GET** `http://localhost:5000/api/customers?page=1&limit=10&status=Active`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Response:**
```json
{
  "customers": [
    {
      "_id": "507f1f77bcf86cd799439050",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "totalOrders": 5,
      "totalSpent": 499.95,
      "status": "Active"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "pages": 5
  }
}
```

### 2. Get Customer Details (Admin)
**GET** `http://localhost:5000/api/customers/507f1f77bcf86cd799439050`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Response:**
```json
{
  "customer": {
    "_id": "507f1f77bcf86cd799439050",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1-555-0100",
    "totalOrders": 5,
    "totalSpent": 499.95,
    "loyaltyPoints": 4999
  },
  "orders": [
    {
      "orderId": "ORD-xxx",
      "totalAmount": 299.98,
      "status": "Delivered"
    }
  ]
}
```

### 3. Update Customer (Admin)
**PUT** `http://localhost:5000/api/customers/507f1f77bcf86cd799439050`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1-555-0200",
  "address": "456 Oak Ave",
  "city": "New York",
  "country": "USA",
  "zipCode": "10001",
  "status": "Active",
  "loyaltyPoints": 5000
}
```

### 4. Get Customer Statistics (Admin)
**GET** `http://localhost:5000/api/customers/stats/summary`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Response:**
```json
{
  "totalCustomers": 150,
  "activeCustomers": 142,
  "totalSpent": 45000.00,
  "topCustomers": [...]
}
```

---

## 💳 Payment Endpoints

### 1. Create Payment
**POST** `http://localhost:5000/api/payments`

**Headers:**
```
Authorization: Bearer {user-token}
```

**Request Body:**
```json
{
  "orderId": "507f1f77bcf86cd799439040",
  "amount": 314.98,
  "paymentMethod": "Credit Card",
  "cardDetails": {
    "last4": "4242",
    "brand": "Visa"
  }
}
```

**Response:**
```json
{
  "message": "Payment processed successfully",
  "transactionId": "TXN-1234567890-XYZ",
  "payment": {
    "_id": "507f1f77bcf86cd799439060",
    "orderId": "507f1f77bcf86cd799439040",
    "amount": 314.98,
    "status": "Success"
  }
}
```

### 2. Get User Payments
**GET** `http://localhost:5000/api/payments/user/my-payments`

**Headers:**
```
Authorization: Bearer {user-token}
```

### 3. Get All Payments (Admin)
**GET** `http://localhost:5000/api/payments/admin/all?status=Success&page=1&limit=10`

**Headers:**
```
Authorization: Bearer {admin-token}
```

### 4. Get Payment Statistics (Admin)
**GET** `http://localhost:5000/api/payments/stats/summary`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Response:**
```json
{
  "totalRevenue": 45000.00,
  "paymentsByMethod": [
    {"_id": "Credit Card", "count": 80, "total": 24000},
    {"_id": "PayPal", "count": 30, "total": 15000},
    {"_id": "Debit Card", "count": 20, "total": 6000}
  ],
  "successfulTransactions": 130,
  "failedTransactions": 5
}
```

---

## 📦 Inventory Endpoints

### 1. Get All Inventory (Admin)
**GET** `http://localhost:5000/api/inventory?status=Low%20Stock&page=1&limit=10`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Response:**
```json
{
  "inventory": [
    {
      "_id": "507f1f77bcf86cd799439070",
      "productId": {...},
      "currentStock": 5,
      "reorderLevel": 10,
      "status": "Low Stock"
    }
  ],
  "pagination": {
    "total": 3,
    "page": 1,
    "pages": 1
  }
}
```

### 2. Update Inventory Stock (Admin)
**PUT** `http://localhost:5000/api/inventory/507f1f77bcf86cd799439070/stock`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Request Body:**
```json
{
  "currentStock": 100,
  "reorderQuantity": 50
}
```

### 3. Get Low Stock Items (Admin)
**GET** `http://localhost:5000/api/inventory/items/low-stock`

**Headers:**
```
Authorization: Bearer {admin-token}
```

### 4. Get Inventory Statistics (Admin)
**GET** `http://localhost:5000/api/inventory/stats/summary`

**Headers:**
```
Authorization: Bearer {admin-token}
```

**Response:**
```json
{
  "totalItems": 150,
  "outOfStock": 5,
  "lowStock": 12,
  "inStock": 133,
  "totalStockValue": 45000.00,
  "topSoldProducts": [...]
}
```

---

## 🧪 cURL Examples

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bunny.com","password":"admin123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products?page=1&limit=10
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "items": [{"productId":"xxx","name":"Product","quantity":1,"price":99.99}],
    "shippingAddress": {"name":"John","email":"john@example.com","phone":"+1-555-0100","address":"123 Main"},
    "paymentMethod":"Credit Card"
  }'
```

### Check Health
```bash
curl http://localhost:5000/api/health
```

---

## 📋 Testing Checklist

### Authentication ✓
- [ ] Register new user
- [ ] Login with credentials
- [ ] Get user profile
- [ ] Update profile
- [ ] Logout

### Products ✓
- [ ] View all products
- [ ] Search products
- [ ] Filter by category
- [ ] Get single product
- [ ] Create product (admin)
- [ ] Update product (admin)
- [ ] Delete product (admin)

### Orders ✓
- [ ] Create order
- [ ] Get user orders
- [ ] Get single order
- [ ] Get all orders (admin)
- [ ] Update order status (admin)
- [ ] View order stats (admin)

### Customers ✓
- [ ] Get all customers (admin)
- [ ] Get customer details (admin)
- [ ] Update customer (admin)
- [ ] View customer stats (admin)

### Payments ✓
- [ ] Process payment
- [ ] Get user payments
- [ ] Get all payments (admin)
- [ ] View payment stats (admin)

### Inventory ✓
- [ ] View all inventory
- [ ] Update stock levels
- [ ] Check low stock items
- [ ] View inventory stats

---

## 🔍 Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Check request body |
| 401 | Unauthorized | Provide valid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Check backend logs |

---

**Happy testing! 🧪**
