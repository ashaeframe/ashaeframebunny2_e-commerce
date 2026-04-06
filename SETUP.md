# Bunny E-Commerce - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Prerequisites Check
Ensure you have installed:
- [Node.js 16+](https://nodejs.org/)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Step 2: Start MongoDB
**Windows:**
```bash
# If installed locally, MongoDB should auto-start
# Or manually start the service via Services app
```

**Mac/Linux:**
```bash
brew services start mongodb-community
# or
mongod
```

### Step 3: Run the Application

#### Option A: Automatic (Windows)
Double-click: `start-dev.bat`

#### Option B: Manual

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
# Opens automatically on http://localhost:5175
```

---

## 📋 Initial Setup (One-time)

### 1. MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Windows - Start MongoDB service
net start MongoDB

# Mac - Using Homebrew
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bunny-ecommerce
   ```

### 2. Backend Setup
```bash
cd backend
npm install
# Update .env file with your MongoDB URI
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

---

## 🔐 First Time Login

### Create Admin Account
1. Click "Sign up" on login page
2. Enter details:
   - Name: Your Name
   - Email: admin@bunny.com
   - Password: admin123
3. Click "Sign Up"
4. You'll be redirected to dashboard

### Give Admin Role (MongoDB)
```bash
# Use MongoDB Compass or command line
db.users.updateOne(
  { email: "admin@bunny.com" },
  { $set: { role: "admin" } }
)
```

---

## 📁 Project Structure

```
e-commerce_2/
├── backend/              # Node.js Express API
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & validation
│   ├── config/          # Database config
│   ├── server.js        # Main server file
│   ├── .env             # Configuration (create this)
│   └── package.json
│
├── frontend/            # React application
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── services/    # API client
│   │   └── styles/      # CSS files
│   ├── public/          # Static files
│   ├── vite.config.js   # Vite configuration
│   └── package.json
│
├── README.md            # Full documentation
├── SETUP.md             # This file
└── start-dev.bat        # Automated startup (Windows)
```

---

## ⚙️ Configuration Files

### Backend .env
Create `backend/.env`:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/bunny-ecommerce

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key-here

# CORS
FRONTEND_URL=http://localhost:5175
```

### Frontend API Client
Already configured in `frontend/src/services/apiClient.js`
- API Base URL: `http://localhost:5000/api`
- Automatically adds auth token to requests

---

## 🎯 Common Tasks

### Test the Application
1. Register new user account
2. Browse products on Home page
3. Add products to cart
4. Proceed to checkout
5. View order in Dashboard

### Add Test Products
Option 1: Via Admin Dashboard
1. Login as admin
2. Go to Dashboard → Product Management
3. Click "Add Product"
4. Fill in details and save

Option 2: Via MongoDB
```javascript
db.products.insertMany([
  {
    name: "Wireless Headphones",
    category: "Electronics",
    description: "High-quality wireless headphones",
    price: 149.99,
    stock: 50,
    status: "Active",
    rating: 4.5
  },
  // Add more products...
])
```

### Check Backend Logs
Terminal where backend is running shows:
- Request logs
- Error messages
- Database operations

### Reset Database
```bash
# Delete all collections (be careful!)
db.dropDatabase()

# Or delete specific collection
db.products.deleteMany({})
```

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB is running: `mongosh` should connect
- Verify MONGODB_URI in .env
- Check firewall settings

### "Port 5000 already in use"
```bash
# Find process using port 5000
netstat -ano | findstr :5000
# Kill process (Windows)
taskkill /PID [PID] /F
```

### "Token expired"
- Tokens valid for 7 days
- Login again to get new token
- Check JWT_SECRET matches in .env

### "CORS error"
- Ensure FRONTEND_URL matches in .env
- Restart backend after changing .env
- Check browser console for specific error

### "Can't find module"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Database Overview

### Collections
1. **users** - Registered user accounts
2. **products** - Product catalog
3. **orders** - Customer orders
4. **payments** - Payment transactions
5. **customers** - Customer profiles
6. **inventories** - Stock tracking

### Query Examples
```javascript
// View all products
db.products.find()

// View user orders
db.orders.find({ userId: ObjectId("...") })

// Check inventory
db.inventories.find()

// View payments
db.payments.find({ status: "Success" })
```

---

## 🚀 Features Overview

### For Customers
- ✓ Register/Login
- ✓ Browse products
- ✓ Search & filter
- ✓ Add to cart
- ✓ Checkout
- ✓ Track orders
- ✓ View order history

### For Admins
- ✓ Manage products (CRUD)
- ✓ Manage orders
- ✓ Manage customers
- ✓ Track payments
- ✓ Inventory management
- ✓ View analytics
- ✓ Manage users & roles
- ✓ Send notifications

### Analytics
- ✓ Sales charts
- ✓ Revenue tracking
- ✓ Customer analytics
- ✓ Order trends
- ✓ Spending by category
- ✓ Top customers

---

## 📞 Ports & URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:5175 | Auto-open in browser |
| Backend API | http://localhost:5000 | Terminal server |
| MongoDB | localhost:27017 | Local database |
| Backend Health | http://localhost:5000/api/health | Check status |

---

## 💡 Tips

1. **Keep terminals visible** - See errors in real-time
2. **Check browser console** - Open DevTools (F12) for frontend errors
3. **Use MongoDB Compass** - Visual database manager
4. **Enable auto-save** - VS Code auto-saves by default
5. **Clear browser cache** - Force refresh (Ctrl+Shift+R) if issues

---

## 📚 Next Steps

1. ✓ Setup complete!
2. Customize color scheme in CSS files
3. Add more product images
4. Implement email notifications
5. Add real payment gateway integration
6. Deploy to production

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT Guide](https://jwt.io/introduction)
- [Vite Guide](https://vitejs.dev/guide/)

---

## ✅ Verification Checklist

After following this guide:

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Backend installed & running (port 5000)
- [ ] Frontend installed & running (port 5175)
- [ ] Can access http://localhost:5175
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Backend console shows no errors
- [ ] Can browse products
- [ ] Can add to cart

---

**Ready to build with Bunny! 🐰**

For full documentation, see [README.md](README.md)
