# 🏪 Local Business Directory & Product Finder

> **A modern, full-stack web application for discovering local businesses and products with a stunning dark UI**

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ Features

### 👥 **Three User Roles**
- **Customer**: Search products, discover businesses, view details
- **Business Owner**: Register business, add/manage products
- **Admin**: Approve businesses, manage users, view statistics

### 🎨 **Modern Dark UI**
- Cyberpunk/futuristic design with neon accents
- Glassmorphism effects and smooth animations
- Fully responsive design
- Premium dark theme with cyan/purple/pink gradients

### 🔐 **Secure Authentication**
- JWT-based authentication
- Role-based access control
- Protected routes and API endpoints

### 🔍 **Smart Search & Filters**
- Search products by keyword, category, city
- Filter businesses by location and category
- Real-time search results

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router v6** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** v14+ with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing

---

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Choose one:
  - **MongoDB Atlas** (Cloud - Recommended) - [Sign Up](https://www.mongodb.com/cloud/atlas)
  - **MongoDB Community** (Local) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

---

## 🚀 Installation & Setup

### 1️⃣ Clone or Download the Project

```bash
cd "E:\Product finder Project"
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔧 Configuration

### Backend Configuration (.env)

Navigate to `backend/.env` and configure:

#### **Option 1: MongoDB Atlas (Cloud - Recommended)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a **free M0 cluster**
3. Create database user (username & password)
4. Whitelist IP address (`0.0.0.0/0` for anywhere)
5. Get connection string from **Connect** → **Drivers**

```env
PORT=5000

# Replace with your MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER_URL/business-directory?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
NODE_ENV=development
```

**Example:**
```env
MONGODB_URI=mongodb+srv://adminuser:MyPass123@cluster0.abc12.mongodb.net/business-directory?retryWrites=true&w=majority
```

#### **Option 2: Local MongoDB**

If using local MongoDB:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/business-directory
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
NODE_ENV=development
```

### Frontend Configuration (.env)

Navigate to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 Running the Application

### 🔹 Step 1: Seed the Database (First Time Only)

This will create sample data including test users, businesses, and products:

```bash
cd backend
npm run seed
```

**Output:**
```
✅ Database Connected
✅ Database seeded successfully
- 6 users created
- 3 businesses created  
- 9 products created
```

### 🔹 Step 2: Start Backend Server

**Terminal 1:**
```bash
cd backend
npm run dev
```

Server will start at: `http://localhost:5000`

### 🔹 Step 3: Start Frontend Development Server

**Terminal 2:**
```bash
cd frontend
npm run dev
```

Frontend will start at: `http://localhost:3000`

### 🔹 Step 4: Open in Browser

Visit: **http://localhost:3000**

---

## 👤 Test User Credentials

Use these credentials to login:

### Admin Account
```
Email: admin@example.com
Password: admin123
```

### Customer Accounts
```
Email: john@example.com
Password: customer123

Email: jane@example.com
Password: customer123
```

### Business Owner Accounts
```
Email: mike@example.com
Password: business123

Email: sarah@example.com
Password: business123

Email: david@example.com
Password: business123
```

---

## 📁 Project Structure

```
Product finder Project/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── businessController.js # Business CRUD
│   │   ├── productController.js  # Product CRUD
│   │   └── adminController.js    # Admin operations
│   ├── middleware/
│   │   ├── auth.js               # JWT verification & role check
│   │   └── error.js              # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Business.js           # Business schema
│   │   └── Product.js            # Product schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── businessRoutes.js     # Business endpoints
│   │   ├── productRoutes.js      # Product endpoints
│   │   └── adminRoutes.js        # Admin endpoints
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   ├── seedData.js               # Database seeding script
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx          # Navigation bar
    │   │   ├── ProtectedRoute.jsx  # Route protection
    │   │   └── LoadingSpinner.jsx  # Loading indicator
    │   ├── context/
    │   │   └── AuthContext.jsx     # Auth state management
    │   ├── pages/
    │   │   ├── LandingPage.jsx     # Home page
    │   │   ├── LoginPage.jsx       # Login
    │   │   ├── RegisterPage.jsx    # Registration
    │   │   ├── CustomerHomePage.jsx
    │   │   ├── ProductSearchPage.jsx
    │   │   ├── ProductDetailsPage.jsx
    │   │   ├── BusinessDetailsPage.jsx
    │   │   ├── CustomerProfilePage.jsx
    │   │   ├── BusinessDashboard.jsx
    │   │   ├── AddEditBusinessPage.jsx
    │   │   ├── AddEditProductPage.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AdminUserManagementPage.jsx
    │   │   └── AdminBusinessApprovalPage.jsx
    │   ├── services/
    │   │   ├── authService.js      # Auth API calls
    │   │   ├── businessService.js  # Business API calls
    │   │   ├── productService.js   # Product API calls
    │   │   └── adminService.js     # Admin API calls
    │   ├── utils/
    │   │   └── api.js              # Axios instance
    │   ├── App.jsx                 # Main app component
    │   ├── main.jsx                # Entry point
    │   └── index.css               # Global styles
    ├── .env                        # Environment variables
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Business (Protected)
- `POST /api/business` - Create business (Business role)
- `GET /api/business` - Get all approved businesses
- `GET /api/business/:id` - Get business by ID
- `PUT /api/business/:id` - Update business (Owner only)
- `GET /api/business/my/business` - Get user's business

### Products (Protected)
- `POST /api/product` - Create product (Business owner)
- `GET /api/product` - Get all products (with filters)
- `GET /api/product/:id` - Get product by ID
- `PUT /api/product/:id` - Update product (Owner only)
- `DELETE /api/product/:id` - Delete product (Owner only)
- `GET /api/product/my/products` - Get user's products

### Admin (Admin Only)
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/user/:id` - Delete user
- `GET /api/admin/businesses` - Get all businesses
- `PUT /api/admin/business/:id/approve` - Approve business
- `GET /api/admin/stats` - Get dashboard statistics

---

## 🎨 UI Features

### 🌈 Color Scheme
- **Primary**: Cyan (#22d3ee) - Main accents
- **Secondary**: Blue (#3b82f6) - Support colors
- **Tertiary**: Purple (#a855f7) - Highlights
- **Background**: Pure Black (#000000)
- **Cards**: Dark gray gradients
- **Text**: White/Gray tones

### ✨ Animations
- **Floating orbs** with blur effects
- **Neon glow** on hover
- **Scanning line** effects
- **Smooth transitions** and scale transforms
- **Gradient text** animations

### 📱 Responsive Design
- Mobile-first approach
- Tablet optimized
- Desktop enhanced
- All screen sizes supported

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if MongoDB is running
# For local: Open MongoDB Compass or check MongoDB service
# For Atlas: Check connection string and network access

# Check if port 5000 is available
netstat -ano | findstr :5000

# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Frontend won't start
```bash
# Check if backend is running first
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Error
- Verify MongoDB URI in `backend/.env`
- Check MongoDB Atlas IP whitelist (use `0.0.0.0/0`)
- Ensure database user has correct permissions
- Check username/password (no special characters issues)

### Login Issues
- Make sure you've run `npm run seed` first
- Check browser console for errors
- Verify API URL in `frontend/.env`

---

## 📦 Production Build

### Build Frontend
```bash
cd frontend
npm run build
```

Build output will be in `frontend/dist/`

### Deploy Backend
- Set `NODE_ENV=production` in `.env`
- Use MongoDB Atlas for production
- Deploy to platforms like:
  - **Heroku**
  - **Railway**
  - **Render**
  - **DigitalOcean**

### Deploy Frontend
- Deploy `dist/` folder to:
  - **Vercel**
  - **Netlify**
  - **GitHub Pages**

---

## 🔒 Security Notes

⚠️ **Important for Production:**
- Change `JWT_SECRET` to a strong random string
- Use strong passwords for MongoDB users
- Enable CORS only for your frontend domain
- Add rate limiting middleware
- Use HTTPS in production
- Keep dependencies updated

---

## 📝 Available Scripts

### Backend
```bash
npm run dev      # Start with nodemon (hot reload)
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🤝 Support

If you encounter any issues:
1. Check this README thoroughly
2. Verify all environment variables
3. Ensure MongoDB is connected
4. Check browser console for errors
5. Review terminal logs for backend errors

---

## 📄 License

This project is for educational purposes.

---

## 🙏 Credits

Built with ❤️ using MERN Stack

**Tech Stack:**
- MongoDB - Database
- Express.js - Backend Framework
- React - Frontend Library
- Node.js - Runtime Environment
- Tailwind CSS - Styling
- JWT - Authentication

---

## 🚀 Quick Start Summary

```bash
# 1. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 2. Configure backend/.env with MongoDB URI

# 3. Seed database
cd backend && npm run seed

# 4. Start backend (Terminal 1)
npm run dev

# 5. Start frontend (Terminal 2)
cd ../frontend && npm run dev

# 6. Open http://localhost:3000
# Login with: admin@example.com / admin123
```

---

**🎉 Happy Coding!**
```

### Business Owner Accounts
```
Email: mike@example.com
Password: business123

Email: sarah@example.com
Password: business123

Email: david@example.com
Password: business123
```

---

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd "Product finder Project"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your configuration
# Update the following variables:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (a secure random string)
# - PORT (default: 5000)
```

Example `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/business-directory
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

The frontend `.env` file should contain:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or start manually
mongod
```

### 5. Seed the Database (Optional but Recommended)

```bash
# From the backend directory
npm run seed
```

This will create:
- 1 Admin account
- 2 Customer accounts
- 3 Business Owner accounts
- 3 Businesses (2 approved, 1 pending)
- 9 Products

**Test Accounts:**
- **Admin:** admin@example.com / admin123
- **Customer:** john@example.com / customer123
- **Business Owner:** mike@example.com / business123

### 6. Run the Application

**Start Backend Server:**
```bash
# From backend directory
npm run dev
# Server will run on http://localhost:5000
```

**Start Frontend Development Server:**
```bash
# From frontend directory (in a new terminal)
npm run dev
# App will run on http://localhost:3000
```

## 🎯 Usage Guide

### Customer Workflow
1. Register as a customer at `/register`
2. Login at `/login`
3. Browse featured products on home page
4. Search for specific products using filters
5. View product details and business information
6. Check your profile at `/customer/profile`

### Business Owner Workflow
1. Register as a business owner
2. Login and navigate to business dashboard
3. Register your business with details
4. Wait for admin approval
5. Add products to your business
6. Manage products from dashboard

### Admin Workflow
1. Login with admin credentials
2. View platform statistics on dashboard
3. Manage users at `/admin/users`
4. Approve/reject businesses at `/admin/businesses`

## 📁 Project Structure

```
Product finder Project/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── businessController.js # Business management
│   │   ├── productController.js  # Product management
│   │   └── adminController.js    # Admin operations
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── error.js              # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Business.js           # Business schema
│   │   └── Product.js            # Product schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── businessRoutes.js
│   │   ├── productRoutes.js
│   │   └── adminRoutes.js
│   ├── .env.example
│   ├── package.json
│   ├── seedData.js               # Database seeding script
│   └── server.js                 # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── LoadingSpinner.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx    # Global auth state
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── CustomerHomePage.jsx
    │   │   ├── ProductSearchPage.jsx
    │   │   ├── ProductDetailsPage.jsx
    │   │   ├── BusinessDetailsPage.jsx
    │   │   ├── CustomerProfilePage.jsx
    │   │   ├── BusinessDashboard.jsx
    │   │   ├── AddEditBusinessPage.jsx
    │   │   ├── AddEditProductPage.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AdminUserManagementPage.jsx
    │   │   └── AdminBusinessApprovalPage.jsx
    │   ├── services/
    │   │   ├── authService.js
    │   │   ├── businessService.js
    │   │   ├── productService.js
    │   │   └── adminService.js
    │   ├── utils/
    │   │   └── api.js             # Axios configuration
    │   ├── App.jsx                # Main app with routes
    │   ├── main.jsx               # Entry point
    │   └── index.css              # Global styles
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Business
- `POST /api/business` - Create business (Business role)
- `GET /api/business` - Get all businesses
- `GET /api/business/:id` - Get single business
- `PUT /api/business/:id` - Update business (Owner only)
- `GET /api/business/my/business` - Get my business (Business role)
- `PUT /api/business/approve/:id` - Approve business (Admin only)

### Product
- `POST /api/product` - Create product (Business role)
- `GET /api/product` - Get all products
- `GET /api/product/search` - Search products with filters
- `GET /api/product/:id` - Get single product
- `PUT /api/product/:id` - Update product (Owner only)
- `DELETE /api/product/:id` - Delete product (Owner only)
- `GET /api/product/my/products` - Get my products (Business role)

### Admin
- `GET /api/admin/users` - Get all users (Admin only)
- `DELETE /api/admin/user/:id` - Delete user (Admin only)
- `GET /api/admin/businesses` - Get all businesses (Admin only)
- `GET /api/admin/stats` - Get platform statistics (Admin only)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (RBAC)
- Protected routes on frontend and backend
- Input validation
- Token expiration handling
- Secure password requirements (min 6 characters)

## 🎨 Styling

The application uses Tailwind CSS for styling with a custom color scheme:
- Primary: Blue shades (primary-500, primary-600, etc.)
- Responsive design for mobile, tablet, and desktop
- Consistent UI components across all pages

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `net start MongoDB` (Windows)
- Check if the connection string in `.env` is correct
- Verify MongoDB is listening on port 27017

### Port Already in Use
- Backend: Change `PORT` in backend `.env` file
- Frontend: Vite will automatically suggest an alternative port

### CORS Issues
- Ensure backend CORS is configured correctly (already set up)
- Check that frontend API URL matches backend URL

### Build Errors
- Delete `node_modules` and reinstall: `npm install`
- Clear npm cache: `npm cache clean --force`

## 📝 Development Tips

- Use `npm run dev` for hot-reload during development
- Check browser console for frontend errors
- Check terminal/console for backend errors
- Use MongoDB Compass to view database contents
- Test API endpoints using Postman or Thunder Client

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Set a strong `JWT_SECRET`
4. Deploy to services like Heroku, Railway, or AWS

### Frontend
1. Build the production bundle: `npm run build`
2. Deploy the `dist` folder to Vercel, Netlify, or similar
3. Update `VITE_API_URL` to point to production API

## 📄 License

This project is created for educational purposes.

## 👥 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Verify all dependencies are installed
4. Ensure MongoDB is running

## 🎉 Acknowledgments

Built with modern web development best practices using React, Node.js, Express, and MongoDB.

---

**Happy Coding! 🚀**
#   B i z D i r e c t o r y 
 
 