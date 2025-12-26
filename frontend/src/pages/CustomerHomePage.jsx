import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getProducts } from '../services/productService';
import { getBusinesses } from '../services/businessService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Customer Home Page - Futuristic Dashboard UI
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
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] opacity-50"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] opacity-50"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="w-[1280px] mx-auto px-4 py-10 relative z-10">
        
        {/* --- Hero Dashboard Panel --- */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl p-12 mb-12 shadow-2xl">
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none">
              <div className="text-9xl">👋</div>
           </div>
           <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>

           <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
                 User Dashboard
              </div>
              <h1 className="text-5xl font-black mb-4 tracking-tight">
                 Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{user?.name}</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl">
                 Explore the latest products and connect with top-rated businesses in <span className="text-white font-semibold border-b border-cyan-500/50">{user?.city}</span>.
              </p>
           </div>
        </div>

        {/* --- Quick Actions Grid --- */}
        <div className="grid grid-cols-2 gap-8 mb-16">
           <Link
             to="/customer/products"
             className="group relative overflow-hidden bg-slate-900/40 border border-white/5 rounded-2xl p-8 hover:bg-slate-800/60 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.3)]"
           >
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all border border-cyan-500/20">
                    🔍
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Start Searching</h3>
                    <p className="text-slate-400">Browse the marketplace with advanced filters</p>
                 </div>
                 <div className="ml-auto w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all">
                    ➜
                 </div>
              </div>
           </Link>

           <Link
             to="/customer/profile"
             className="group relative overflow-hidden bg-slate-900/40 border border-white/5 rounded-2xl p-8 hover:bg-slate-800/60 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(168,85,247,0.3)]"
           >
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-purple-500/20 transition-all border border-purple-500/20">
                    👤
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Manage Profile</h3>
                    <p className="text-slate-400">Update your account details and settings</p>
                 </div>
                 <div className="ml-auto w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-500 transition-all">
                    ➜
                 </div>
              </div>
           </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="scale-150"><LoadingSpinner /></div>
          </div>
        ) : (
          <>
            {/* --- Featured Products --- */}
            <div className="mb-16">
              <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">✨ Featured Products</h2>
                  <p className="text-slate-500">Handpicked items just for you</p>
                </div>
                <Link to="/customer/products" className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline transition-all">
                   View Marketplace →
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {products.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/customer/product/${product._id}`)}
                    className="group bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)] cursor-pointer flex flex-col h-full"
                  >
                     {/* Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                       <div className="text-5xl group-hover:scale-110 transition-transform duration-500">📦</div>
                       <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider text-cyan-400 border border-cyan-500/30">
                             {product.category}
                          </span>
                       </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2 font-light">
                        {product.description}
                      </p>
                      
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                         <div className="text-xs text-slate-500 flex items-center gap-1">
                            📍 {product.business?.city}
                         </div>
                         <div className="text-2xl font-bold text-white">
                            ${product.price}
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Local Businesses --- */}
            <div>
              <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">🏪 Top Businesses</h2>
                  <p className="text-slate-500">Trusted partners in your area</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {businesses.map((business) => (
                  <div
                    key={business._id}
                    onClick={() => navigate(`/customer/business/${business._id}`)}
                    className="group relative bg-slate-900/30 border border-white/5 rounded-2xl p-6 hover:bg-slate-800/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
                  >
                     <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center text-2xl border border-purple-500/20 group-hover:bg-purple-500/20 transition-all">
                           🏪
                        </div>
                        <div>
                           <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                              {business.name}
                           </h3>
                           <p className="text-slate-500 text-xs mb-2">📍 {business.city}</p>
                           <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                              {business.category}
                           </span>
                        </div>
                     </div>
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