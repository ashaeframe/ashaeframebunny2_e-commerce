# Bunny E-Commerce Application - Full Stack Setup Guide

## Overview
This is a complete full-stack e-commerce application called "Bunny" with React frontend and Node.js/Express backend.

### Features
- **User Authentication**: Register & Login with JWT tokens
- **Product Management**: Browse, search, filter products with admin CRUD
- **Shopping Cart**: Add/remove items, calculate tax & shipping
- **Order Management**: Create orders, track status, view order history
- **Admin Dashboard**: Manage products, orders, customers, payments, inventory
- **Analytics**: Sales charts, spending analysis, order trends
- **Inventory Tracking**: Stock management with low stock alerts
- **Payment Processing**: Multiple payment methods tracking
- **Customer Management**: Customer profiles, loyalty points, spending analytics

### Technology Stack

**Frontend:**
- React 19.2.0
- React Router v6
- Recharts (data visualization)
- Vite 7.2.4
- CSS3 with custom styling

**Backend:**
- Node.js with Express 4.18.2
- MongoDB 7.0.0
- Mongoose (ODM)
- JWT Authentication
- bcryptjs (password hashing)

---

## Setup Instructions

### Prerequisites
- Node.js 16+ installed
- MongoDB running locally (or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file with:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/bunny-ecommerce
   PORT=5000
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5175
   ```

4. **Start backend server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5175`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login user and get JWT token
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/products/categories/all` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/admin/all` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders/stats/summary` - Get order statistics (admin only)

### Customers
- `GET /api/customers` - Get all customers (admin only)
- `GET /api/customers/:id` - Get customer details (admin only)
- `PUT /api/customers/:id` - Update customer (admin only)
- `GET /api/customers/stats/summary` - Get customer statistics (admin only)

### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments/user/my-payments` - Get user's payments
- `GET /api/payments/admin/all` - Get all payments (admin only)
- `GET /api/payments/stats/summary` - Get payment statistics (admin only)

### Inventory
- `GET /api/inventory` - Get all inventory items (admin only)
- `GET /api/inventory/:id` - Get inventory item (admin only)
- `PUT /api/inventory/:id/stock` - Update stock (admin only)
- `GET /api/inventory/items/low-stock` - Get low stock items (admin only)
- `GET /api/inventory/stats/summary` - Get inventory statistics (admin only)

---

## Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (customer/admin/manager/staff),
  isActive: Boolean,
  timestamps
}
```

### Product Schema
```javascript
{
  name: String,
  category: String,
  description: String,
  price: Number,
  stock: Number,
  reorderLevel: Number,
  image: String,
  status: String (Active/Inactive),
  rating: Number,
  reviews: Array,
  timestamps
}
```

### Order Schema
```javascript
{
  orderId: String (unique),
  userId: Reference to User,
  items: Array,
  totalAmount: Number,
  tax: Number,
  shippingCost: Number,
  grandTotal: Number,
  status: String (Pending/Processing/Shipped/Delivered),
  shippingAddress: Object,
  paymentMethod: String,
  paymentStatus: String,
  timestamps
}
```

### Customer Schema
```javascript
{
  userId: Reference to User,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  totalOrders: Number,
  totalSpent: Number,
  loyaltyPoints: Number,
  status: String (Active/Inactive),
  timestamps
}
```

### Payment Schema
```javascript
{
  orderId: Reference to Order,
  userId: Reference to User,
  amount: Number,
  paymentMethod: String,
  transactionId: String (unique),
  status: String (Pending/Success/Failed),
  cardDetails: Object,
  timestamps
}
```

### Inventory Schema
```javascript
{
  productId: Reference to Product,
  currentStock: Number,
  reorderLevel: Number,
  reorderQuantity: Number,
  soldCount: Number,
  status: String (In Stock/Low Stock/Out of Stock),
  timestamps
}
```

---

## Frontend Components

### Pages
- **Login.jsx** - Authentication (login & signup)
- **Dashboard.jsx** - Admin dashboard with sidebar navigation
- **Home.jsx** - Home page with featured products
- **ProductGallery.jsx** - Product listing with search & filter
- **Cart.jsx** - Shopping cart management
- **OrderConfirmation.jsx** - Order confirmation with confetti animation

### Admin Management Pages
- **ProductManagement.jsx** - Add/edit/delete products
- **OrderManagement.jsx** - Manage orders and status
- **CustomerManagement.jsx** - View and manage customers
- **PaymentsTransactions.jsx** - Payment tracking and revenue
- **InventoryManagement.jsx** - Stock tracking and reorder
- **AnalyticsReports.jsx** - Sales and revenue charts
- **AdminUserRoles.jsx** - User role management
- **NotificationsAlerts.jsx** - System notifications

### Analytics
- **SpendingAnalytics.jsx** - Pie chart of spending by category
- **OrdersAnalytics.jsx** - Bar chart of orders over time

---

## Testing Credentials

### Admin Account
- Email: `admin@bunny.com`
- Password: `admin123`

### Customer Account
- Email: `customer@bunny.com`
- Password: `customer123`

---

## Default Test Data

The backend seeds some default products when started:
- Headphones - $149.99
- USB Cable - $12.99
- Phone Case - $24.99
- Screen Protector - $9.99
- Phone Stand - $19.99
- Keyboard - $79.99

---

## File Structure

```
e-commerce_2/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Customer.js
│   │   ├── Payment.js
│   │   └── Inventory.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── customers.js
│   │   ├── payments.js
│   │   └── inventory.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProductCard.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Home.jsx
    │   │   ├── Cart.jsx
    │   │   ├── ProductGallery.jsx
    │   │   ├── OrderConfirmation.jsx
    │   │   └── admin/
    │   │       ├── ProductManagement.jsx
    │   │       ├── OrderManagement.jsx
    │   │       ├── CustomerManagement.jsx
    │   │       ├── PaymentsTransactions.jsx
    │   │       ├── InventoryManagement.jsx
    │   │       ├── AnalyticsReports.jsx
    │   │       ├── AdminUserRoles.jsx
    │   │       └── NotificationsAlerts.jsx
    │   ├── services/
    │   │   └── apiClient.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── index.html
```

---

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/bunny-ecommerce
PORT=5000
JWT_SECRET=bunny-secret-key-2024
NODE_ENV=development
FRONTEND_URL=http://localhost:5175
```

### Frontend
API URL is hardcoded to `http://localhost:5000/api` in `apiClient.js`

---

## Development Commands

### Backend
```bash
npm run dev      # Run with nodemon (auto-restart)
npm start        # Run production
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify MongoDB is accessible on localhost:27017

### Frontend Can't Connect to Backend
- Ensure backend is running on port 5000
- Check CORS configuration in server.js
- Verify API_URL in apiClient.js matches backend

### Token Expired
- Token expires in 7 days
- User will need to login again
- Check JWT_SECRET is same in frontend and backend

### Port Already in Use
- Backend: `netstat -ano | findstr :5000` (Windows)
- Frontend: Change port in vite.config.js

---

## Next Steps
1. Start MongoDB
2. Run backend: `cd backend && npm run dev`
3. In new terminal, run frontend: `cd frontend && npm run dev`
4. Open `http://localhost:5175` in browser
5. Register a new account or use test credentials

---

## Support
For issues or questions, check console logs for detailed error messages.

Happy shopping with Bunny! 🐰
