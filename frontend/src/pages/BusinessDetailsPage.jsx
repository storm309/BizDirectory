import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBusinessById } from '../services/businessService';
import { getProducts } from '../services/productService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Business Details Page - View business information and products
 */
const BusinessDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBusinessData();
  }, [id]);

  const fetchBusinessData = async () => {
    try {
      const businessData = await getBusinessById(id);
      setBusiness(businessData);

      // Fetch all products and filter by business
      const allProducts = await getProducts();
      const businessProducts = allProducts.filter(
        (product) => product.business._id === id
      );
      setProducts(businessProducts);
    } catch (error) {
      setError('Business not found');
      console.error('Error fetching business:', error);
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

  if (error || !business) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => navigate('/customer/home')}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-primary-600 hover:underline"
        >
          ← Back
        </button>

        {/* Business Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {business.name}
              </h1>
              <div className="space-y-2">
                <p className="text-gray-600">
                  📍 {business.address}, {business.city}
                </p>
                {business.phone && (
                  <p className="text-gray-600">
                    📞 {business.phone}
                  </p>
                )}
                <p className="text-gray-600">
                  🏷️ {business.category}
                </p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-lg font-semibold ${
              business.approved 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {business.approved ? '✓ Verified' : 'Pending Verification'}
            </span>
          </div>

          {business.description && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">About</h3>
              <p className="text-gray-600 leading-relaxed">
                {business.description}
              </p>
            </div>
          )}
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Products ({products.length})
          </h2>

          {products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">
                No products available from this business yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/customer/product/${product._id}`)}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-primary-600 mb-2">
                      ${product.price}
                    </p>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsPage;
