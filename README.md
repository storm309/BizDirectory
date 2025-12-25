# Local Business Directory & Product Finder

A full-stack web application that connects local businesses with customers. Business owners can register their businesses and list products, while customers can search for products and businesses by location and category. Administrators can approve businesses and manage the platform.

## 🚀 Features

### For Customers
- 🔍 Search products by keyword, category, and city
- 📍 Discover local businesses in your area
- 🛍️ View detailed product and business information
- 👤 User profile management

### For Business Owners
- 🏪 Register and manage business information
- 📦 Add, edit, and delete products
- 📊 Dashboard to track business status
- ⏳ Business approval system

### For Administrators
- 👥 User management
- ✅ Business approval/rejection
- 📈 Platform statistics dashboard
- 🔐 Full administrative control

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** Context API
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

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
#   B i z D i r e c t o r y  
 