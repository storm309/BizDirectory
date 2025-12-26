import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBusinessById } from '../services/businessService';
import { getProducts } from '../services/productService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Business Details Page - High-End Storefront UI
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

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Navbar />
        <div className="scale-150"><LoadingSpinner /></div>
      </div>
    );
  }

  // --- Error State ---
  if (error || !business) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <Navbar />
        <div className="w-[1200px] mx-auto px-4 py-20 text-center">
          <div className="inline-block p-10 rounded-3xl bg-red-900/20 border border-red-500/20 backdrop-blur-xl">
            <h2 className="text-3xl font-bold text-red-400 mb-4">⚠️ System Error</h2>
            <p className="text-slate-300 text-lg mb-8">{error}</p>
            <button
              onClick={() => navigate('/customer/home')}
              className="px-8 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all border border-white/10"
            >
              Return Home
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
         <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="w-[1280px] mx-auto px-4 py-10 relative z-10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors pl-2"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-semibold uppercase tracking-wider text-sm">Back</span>
        </button>

        {/* --- Business Header (Storefront Banner) --- */}
        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 mb-12 shadow-2xl overflow-hidden">
           {/* Decorative Top Line */}
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500"></div>
           
           <div className="flex justify-between items-start">
              <div className="flex gap-8">
                 {/* Business Icon/Logo Placeholder */}
                 <div className="w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 flex items-center justify-center shadow-lg">
                    <span className="text-6xl">🏢</span>
                 </div>

                 {/* Business Info */}
                 <div>
                    <div className="flex items-center gap-4 mb-2">
                       <h1 className="text-4xl font-black text-white tracking-tight">
                          {business.name}
                       </h1>
                       <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                          business.approved 
                          ? 'bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                          : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                       }`}>
                          {business.approved ? '✓ Verified Business' : '⚠ Verification Pending'}
                       </span>
                    </div>

                    <div className="flex flex-col gap-2 text-slate-400 mb-6">
                       <p className="flex items-center gap-2">
                          <span className="text-purple-400">🏷️</span> {business.category}
                       </p>
                       <p className="flex items-center gap-2">
                          <span className="text-cyan-400">📍</span> {business.address}, {business.city}
                       </p>
                       {business.phone && (
                          <p className="flex items-center gap-2">
                             <span className="text-green-400">📞</span> {business.phone}
                          </p>
                       )}
                    </div>
                 </div>
              </div>
           </div>

           {/* Description Section */}
           {business.description && (
             <div className="mt-8 pt-8 border-t border-white/5">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">About the Business</h3>
                <p className="text-lg text-slate-300 leading-relaxed font-light max-w-4xl">
                   {business.description}
                </p>
             </div>
           )}
        </div>

        {/* --- Products Inventory Section --- */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
             <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="text-cyan-400">📦</span> Store Inventory 
                <span className="text-sm font-normal text-slate-500 ml-2">({products.length} Items)</span>
             </h2>
          </div>

          {products.length === 0 ? (
            <div className="bg-slate-900/30 rounded-3xl border border-white/5 border-dashed p-20 text-center">
              <div className="text-6xl mb-4 opacity-50 grayscale">📦</div>
              <h3 className="text-xl font-bold text-white mb-2">Inventory Empty</h3>
              <p className="text-slate-500">This business hasn't listed any products yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/customer/product/${product._id}`)}
                  className="group bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)] cursor-pointer flex flex-col h-full"
                >
                  {/* Product Image Area */}
                  <div className="h-56 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                     <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors"></div>
                     <div className="text-5xl group-hover:scale-110 transition-transform duration-500">📦</div>
                     
                     <div className="absolute top-4 right-4">
                        <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider ${
                           product.availability 
                           ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                           : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                           {product.availability ? 'In Stock' : 'Sold Out'}
                        </span>
                     </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                          {product.category}
                       </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 font-light">
                      {product.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                       <span className="text-slate-500 text-xs">View Details ➜</span>
                       <div className="text-2xl font-bold text-white">
                         ${product.price}
                       </div>
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