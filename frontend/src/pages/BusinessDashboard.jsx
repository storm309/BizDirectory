import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getMyBusiness } from '../services/businessService';
import { getMyProducts } from '../services/productService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Business Dashboard - High-Tech Control Panel
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

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Navbar />
        <div className="scale-150"><LoadingSpinner /></div>
      </div>
    );
  }

  // --- No Business Registered (Empty State) ---
  if (error === 'no-business') {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
          
          <div className="relative z-10 w-[800px] bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-16 text-center shadow-2xl">
            <div className="w-32 h-32 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-full mx-auto flex items-center justify-center text-6xl mb-8 shadow-[0_0_50px_rgba(6,182,212,0.4)] animate-pulse">
               🏪
            </div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
              Initialize Business Profile
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-lg mx-auto">
              You haven't registered a business yet. Launch your digital storefront and start selling today.
            </p>
            <Link
              to="/business/add"
              className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105"
            >
              🚀 Register Business Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Dashboard ---
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="w-[1280px] mx-auto px-4 py-10 relative z-10">
        
        {/* --- Hero / Welcome Panel --- */}
        <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
           <div>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                 Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Control Center</span>
              </h1>
              <p className="text-slate-400">Welcome back, Commander {user?.name}.</p>
           </div>
           
           {/* Quick Stats (Optional Visual) */}
           <div className="flex gap-4">
              <div className="bg-slate-900/50 border border-white/10 px-6 py-2 rounded-lg text-center">
                 <div className="text-xs text-slate-500 uppercase font-bold">Total Products</div>
                 <div className="text-xl font-bold text-white">{products.length}</div>
              </div>
              <div className="bg-slate-900/50 border border-white/10 px-6 py-2 rounded-lg text-center">
                 <div className="text-xs text-slate-500 uppercase font-bold">System Status</div>
                 <div className="text-xl font-bold text-green-400">Online</div>
              </div>
           </div>
        </div>

        {/* --- Alert: Pending Approval --- */}
        {business && !business.approved && (
          <div className="mb-10 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 flex items-start gap-4 backdrop-blur-md shadow-[0_0_30px_rgba(234,179,8,0.1)]">
            <div className="text-3xl">⚠️</div>
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-1">
                Verification Pending
              </h3>
              <p className="text-yellow-200/70 text-sm">
                Your business is currently under review by the administration. You can manage your inventory, but products will remain hidden from the public marketplace until approved.
              </p>
            </div>
          </div>
        )}

        {/* --- Business Profile Card --- */}
        <div className="grid grid-cols-12 gap-8 mb-12">
           <div className="col-span-12 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <div className="flex justify-between items-start relative z-10">
                 <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                       🏢 Business Profile
                       <span className={`text-[10px] px-2 py-1 rounded border uppercase tracking-wider ${
                          business?.approved 
                          ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                          : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                       }`}>
                          {business?.approved ? '● Verified' : '○ Pending'}
                       </span>
                    </h2>
                    
                    <div className="grid grid-cols-3 gap-12">
                       <div>
                          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Business Name</p>
                          <p className="text-xl font-bold text-white">{business?.name}</p>
                       </div>
                       <div>
                          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Category Sector</p>
                          <p className="text-xl font-bold text-white">{business?.category}</p>
                       </div>
                       <div>
                          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Location HQ</p>
                          <p className="text-xl font-bold text-white">{business?.city}</p>
                       </div>
                    </div>
                 </div>

                 <Link
                    to={`/business/edit/${business._id}`}
                    className="bg-slate-800 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/10 hover:border-cyan-400 shadow-lg flex items-center gap-2"
                 >
                    ⚙️ Edit Profile
                 </Link>
              </div>
           </div>
        </div>

        {/* --- Products Inventory Section --- */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
               📦 Inventory Management <span className="text-slate-500 text-lg font-normal">({products.length})</span>
            </h2>
            <Link
              to="/business/product/add"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              + Add New Unit
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="bg-slate-900/30 border border-white/5 border-dashed rounded-3xl p-16 text-center">
              <div className="text-6xl mb-4 opacity-30">📦</div>
              <p className="text-slate-500 text-lg mb-6">
                Your inventory is empty. Start adding products to launch your store.
              </p>
              <Link
                to="/business/product/add"
                className="text-cyan-400 font-bold hover:underline"
              >
                Create First Product →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:bg-slate-800/60 group"
                >
                  <div className="flex justify-between items-start mb-4">
                     <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                       {product.name}
                     </h3>
                     <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider ${
                        product.availability 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                     }`}>
                        {product.availability ? 'Active' : 'Offline'}
                     </span>
                  </div>

                  <p className="text-2xl font-bold text-white mb-2">
                    ${product.price}
                  </p>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2 h-10">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                     <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-800 px-2 py-1 rounded">
                        {product.category}
                     </span>
                     
                     <Link
                       to={`/business/product/edit/${product._id}`}
                       className="text-sm font-bold text-cyan-400 hover:text-white bg-cyan-500/10 hover:bg-cyan-600 px-4 py-2 rounded-lg transition-all border border-cyan-500/20"
                     >
                       Edit Unit
                     </Link>
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

export default BusinessDashboard;