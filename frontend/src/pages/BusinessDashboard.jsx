import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getMyBusiness } from '../services/businessService';
import { getMyProducts } from '../services/productService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Business Dashboard - Main page for business owners
 */
const BusinessDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const businessData = await getMyBusiness();
      setBusiness(businessData);

      const productsData = await getMyProducts();
      setProducts(productsData);
    } catch (error) {
      if (error.response?.status === 404) {
        setError('no-business');
      } else {
        setError('error');
      }
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  // No business registered yet
  if (error === 'no-business') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-6">🏪</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Register Your Business
            </h2>
            <p className="text-gray-600 mb-8">
              You haven't registered a business yet. Get started by adding your business information.
            </p>
            <Link
              to="/business/add"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
            >
              Register Business
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg shadow-lg p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-xl text-gray-100">
            Manage your business and products
          </p>
        </div>

        {/* Business Status Alert */}
        {business && !business.approved && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Business Pending Approval
                </h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Your business is awaiting admin approval. You can add products, but they won't be visible to customers until approved.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Business Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">My Business</h2>
            <Link
              to={`/business/edit/${business._id}`}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Edit Business
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Business Name</p>
              <p className="text-lg font-semibold text-gray-800">{business?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Category</p>
              <p className="text-lg font-semibold text-gray-800">{business?.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">City</p>
              <p className="text-lg font-semibold text-gray-800">{business?.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                business?.approved 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {business?.approved ? 'Approved' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              My Products ({products.length})
            </h2>
            <Link
              to="/business/product/add"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              + Add Product
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-500 text-lg mb-4">
                No products yet. Start adding products to your business.
              </p>
              <Link
                to="/business/product/add"
                className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Add First Product
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary-600 mb-2">
                    ${product.price}
                  </p>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                      {product.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      product.availability 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.availability ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <Link
                    to={`/business/product/edit/${product._id}`}
                    className="block w-full text-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    Edit Product
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
