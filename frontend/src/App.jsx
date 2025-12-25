import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerHomePage from './pages/CustomerHomePage';
import ProductSearchPage from './pages/ProductSearchPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import BusinessDetailsPage from './pages/BusinessDetailsPage';
import CustomerProfilePage from './pages/CustomerProfilePage';
import BusinessDashboard from './pages/BusinessDashboard';
import AddEditBusinessPage from './pages/AddEditBusinessPage';
import AddEditProductPage from './pages/AddEditProductPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
import AdminBusinessApprovalPage from './pages/AdminBusinessApprovalPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Customer Routes */}
          <Route 
            path="/customer/home" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerHomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/products" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <ProductSearchPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/product/:id" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <ProductDetailsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/business/:id" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <BusinessDetailsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/profile" 
            element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerProfilePage />
              </ProtectedRoute>
            } 
          />

          {/* Business Owner Routes */}
          <Route 
            path="/business/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['business']}>
                <BusinessDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/business/add" 
            element={
              <ProtectedRoute allowedRoles={['business']}>
                <AddEditBusinessPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/business/edit/:id" 
            element={
              <ProtectedRoute allowedRoles={['business']}>
                <AddEditBusinessPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/business/product/add" 
            element={
              <ProtectedRoute allowedRoles={['business']}>
                <AddEditProductPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/business/product/edit/:id" 
            element={
              <ProtectedRoute allowedRoles={['business']}>
                <AddEditProductPage />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminUserManagementPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/businesses" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminBusinessApprovalPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
