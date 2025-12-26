import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Product Details Page - High-End Desktop UI
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

  // --- Loading State (Dark Theme) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Navbar />
        <div className="scale-150">
           <LoadingSpinner />
        </div>
      </div>
    );
  }

  // --- Error State (Dark Theme) ---
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <Navbar />
        <div className="w-[1200px] mx-auto px-4 py-20 text-center">
          <div className="inline-block p-8 rounded-3xl bg-red-500/10 border border-red-500/20 backdrop-blur-xl">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-2xl mb-8 font-bold">{error}</p>
            <button
              onClick={() => navigate('/customer/products')}
              className="px-8 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Content Container (Fixed Width for Desktop) */}
      <div className="w-[1200px] mx-auto pt-10 relative z-10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/customer/products')}
          className="group flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors pl-2"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-semibold uppercase tracking-wider text-sm">Back to Marketplace</span>
        </button>

        {/* Main Glass Layout */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex min-h-[600px]">
          
          {/* --- LEFT: Product Showcase (Image) --- */}
          <div className="w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex items-center justify-center border-r border-white/5 relative">
            {/* Glow behind image */}
            <div className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
            
            <div className="relative z-10 text-center transform transition-transform hover:scale-105 duration-500">
              <div className="w-80 h-80 bg-slate-800/50 rounded-3xl border border-cyan-500/30 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-md">
                <div className="text-9xl mb-4 drop-shadow-2xl filter brightness-110">📦</div>
                <p className="text-cyan-400/60 uppercase tracking-widest text-xs font-bold">Product Preview</p>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Product Details --- */}
          <div className="w-1/2 p-12 flex flex-col">
            
            {/* Header Tags */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                {product.category}
              </span>
              <span className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,0,0,0.2)] ${
                product.availability 
                  ? 'bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                  : 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
              }`}>
                {product.availability ? '● In Stock' : '○ Out of Stock'}
              </span>
            </div>

            {/* Title & Price */}
            <h1 className="text-5xl font-black text-white mb-4 leading-tight tracking-tight">
              {product.name}
            </h1>
            
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-8 inline-block">
              ${product.price}
            </div>

            {/* Description */}
            <div className="mb-10 flex-grow">
              <h3 className="text-slate-300 font-bold uppercase tracking-wider text-sm mb-3">Description</h3>
              <p className="text-slate-400 leading-relaxed text-lg font-light border-l-2 border-slate-700 pl-4">
                {product.description}
              </p>
            </div>

            {/* Seller / Business Card */}
            <div className="mt-auto">
              <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-4">Sold By Business Partner</h3>
              
              <div className="group bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:bg-black/60">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {product.business?.name}
                    </h4>
                    <p className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                       <span className="text-purple-400">🏷️</span> {product.business?.category}
                    </p>
                    
                    <div className="space-y-1 text-sm text-slate-500">
                      <p className="flex items-center gap-2">
                        <span className="text-cyan-500/70">📍</span> {product.business?.address}, {product.business?.city}
                      </p>
                      {product.business?.phone && (
                        <p className="flex items-center gap-2">
                          <span className="text-green-500/70">📞</span> {product.business.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/customer/business/${product.business._id}`)}
                    className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all transform hover:scale-110 shadow-lg shadow-cyan-500/10"
                    title="View Business Profile"
                  >
                    ↗
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