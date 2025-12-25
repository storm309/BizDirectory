import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getProducts } from '../services/productService';
import { getBusinesses } from '../services/businessService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Customer Home Page - Dashboard for customers
 */
const CustomerHomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, businessesData] = await Promise.all([
        getProducts(),
        getBusinesses()
      ]);
      setProducts(productsData.slice(0, 6)); // Show only first 6
      setBusinesses(businessesData.slice(0, 6)); // Show only first 6
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900 rounded-3xl shadow-2xl p-10 mb-10 text-white relative overflow-hidden border border-cyan-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full opacity-10 -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full opacity-10 -ml-24 -mb-24 blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold mb-3 neon-text">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-xl text-gray-300">
              📍 Discover amazing local businesses and products in {user?.city}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Link
            to="/customer/products"
            className="group dark-card p-8 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center relative z-10">
              <div className="text-5xl mr-6 group-hover:scale-110 transition-transform">🔍</div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  Search Products
                </h3>
                <p className="text-gray-400">Find products near you with smart filters</p>
              </div>
            </div>
          </Link>

          <Link
            to="/customer/profile"
            className="group dark-card p-8 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center relative z-10">
              <div className="text-5xl mr-6 group-hover:scale-110 transition-transform">👤</div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  My Profile
                </h3>
                <p className="text-gray-400">View and manage your account</p>
              </div>
            </div>
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Featured Products Section */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-white flex items-center">
                  <span className="text-4xl mr-3">✨</span>
                  Featured Products
                </h2>
                <Link to="/customer/products" className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center group">
                  View All <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="group dark-card overflow-hidden hover:border-cyan-500 transition-all duration-300 cursor-pointer transform hover:scale-105 relative"
                    onClick={() => navigate(`/customer/product/${product._id}`)}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500 rounded-full filter blur-3xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative z-10">
                      <span className="text-7xl group-hover:scale-110 transition-transform">📦</span>
                    </div>
                    <div className="p-6 relative z-10">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
                        ${product.price}
                      </p>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center bg-cyan-500 bg-opacity-20 border border-cyan-500 text-cyan-400 text-xs px-3 py-1 rounded-full font-bold">
                          {product.category}
                        </span>
                        <p className="text-sm text-gray-500 flex items-center">
                          <span className="mr-1">📍</span>{product.business?.city}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Businesses Section */}
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center">
                <span className="text-4xl mr-3">🏪</span>
                Local Businesses
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {businesses.map((business) => (
                  <div
                    key={business._id}
                    className="group dark-card p-6 hover:border-purple-500 transition-all duration-300 cursor-pointer transform hover:scale-105 relative overflow-hidden"
                    onClick={() => navigate(`/customer/business/${business._id}`)}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="mb-4 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/50">
                        🏪
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {business.name}
                      </h3>
                    </div>
                    <p className="text-gray-400 mb-2 flex items-center relative z-10">
                      <span className="mr-2">📍</span>{business.city}
                    </p>
                    <span className="inline-flex items-center bg-purple-500 bg-opacity-20 border border-purple-500 text-purple-400 text-xs px-3 py-1 rounded-full font-bold relative z-10">
                      {business.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerHomePage;
