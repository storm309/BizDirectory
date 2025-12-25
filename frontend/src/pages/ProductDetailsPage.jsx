import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Product Details Page - View detailed product information
 */
const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      setError('Product not found');
      console.error('Error fetching product:', error);
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

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => navigate('/customer/products')}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
            >
              Back to Products
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
          onClick={() => navigate('/customer/products')}
          className="mb-6 text-primary-600 hover:underline"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image Placeholder */}
            <div className="md:w-1/2 bg-gray-200 flex items-center justify-center p-12">
              <div className="text-center">
                <div className="text-8xl mb-4">📦</div>
                <p className="text-gray-500">Product Image</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded">
                  {product.category}
                </span>
                <span className={`ml-2 inline-block text-sm px-3 py-1 rounded ${
                  product.availability 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.availability ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <p className="text-3xl font-bold text-primary-600 mb-6">
                ${product.price}
              </p>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Business Information */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Sold By</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {product.business?.name}
                  </h4>
                  <p className="text-gray-600 mb-1">
                    📍 {product.business?.address}, {product.business?.city}
                  </p>
                  {product.business?.phone && (
                    <p className="text-gray-600 mb-1">
                      📞 {product.business.phone}
                    </p>
                  )}
                  <p className="text-gray-600">
                    🏷️ {product.business?.category}
                  </p>
                  <button
                    onClick={() => navigate(`/customer/business/${product.business._id}`)}
                    className="mt-4 text-primary-600 hover:underline font-semibold"
                  >
                    View Business Profile →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
