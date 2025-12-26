import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/productService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Product Search Page - Cyberpunk Marketplace UI
 */
const ProductSearchPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    keyword: '',
    city: '',
    category: ''
  });

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="w-[1280px] mx-auto px-4 py-12 relative z-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Marketplace</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Search for the best products from local businesses near you.
          </p>
        </div>

        {/* --- Search Control Panel (Glass Bar) --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-12 shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-6 items-end">
              
              {/* Keyword Input */}
              <div className="col-span-4">
                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                  Search Keyword
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-3.5 text-slate-500">🔍</span>
                  <input
                    type="text"
                    name="keyword"
                    value={filters.keyword}
                    onChange={handleFilterChange}
                    placeholder="What are you looking for?"
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              {/* City Input */}
              <div className="col-span-3">
                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                  Location / City
                </label>
                <div className="relative group">
                   <span className="absolute left-4 top-3.5 text-slate-500">📍</span>
                  <input
                    type="text"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    placeholder="Enter city..."
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="col-span-3">
                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 bg-black/40 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-slate-400">All Categories</option>
                    <option value="Food & Beverages" className="bg-slate-900">Food & Beverages</option>
                    <option value="Electronics" className="bg-slate-900">Electronics</option>
                    <option value="Clothing" className="bg-slate-900">Clothing</option>
                    <option value="Home & Garden" className="bg-slate-900">Home & Garden</option>
                    <option value="Sports" className="bg-slate-900">Sports</option>
                    <option value="Books" className="bg-slate-900">Books</option>
                    <option value="Toys" className="bg-slate-900">Toys</option>
                    <option value="Health & Beauty" className="bg-slate-900">Health & Beauty</option>
                    <option value="Automotive" className="bg-slate-900">Automotive</option>
                    <option value="Other" className="bg-slate-900">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500 text-xs">▼</div>
                </div>
              </div>

              {/* Search Button */}
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105"
                >
                  Search Results
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* --- Results Section --- */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="scale-150"><LoadingSpinner /></div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <h2 className="text-2xl font-bold text-white">Search Results</h2>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-400 text-sm">
                Found <span className="text-cyan-400 font-bold">{products.length}</span> items
              </span>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-white/5 border-dashed">
                <div className="text-6xl mb-4 opacity-50">🔭</div>
                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your filters or search for something else.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-8">
                {products.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/customer/product/${product._id}`)}
                    className="group bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)] cursor-pointer flex flex-col h-full"
                  >
                    {/* Placeholder Image Area */}
                    <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                       <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors"></div>
                       <div className="text-4xl group-hover:scale-110 transition-transform duration-300">📦</div>
                       
                       {/* Availability Badge */}
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

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      
                      {/* Category Tag */}
                      <div className="mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                           {product.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow font-light">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-end border-t border-white/5 pt-4 mt-auto">
                        <div>
                          <p className="text-slate-500 text-xs mb-1 flex items-center gap-1">
                             🏪 {product.business?.name}
                          </p>
                          <p className="text-slate-500 text-xs flex items-center gap-1">
                             📍 {product.business?.city}
                          </p>
                        </div>
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
        )}
      </div>
    </div>
  );
};

export default ProductSearchPage;