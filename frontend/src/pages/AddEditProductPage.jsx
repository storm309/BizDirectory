import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProductById, deleteProduct } from '../services/productService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Add/Edit Product Page - Inventory Configurator UI
 */
const AddEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Food & Beverages',
    description: '',
    availability: true
  });
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchLoading, setFetchLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setFormData({
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description,
        availability: data.availability
      });
    } catch (error) {
      setError('Failed to load product data');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/business/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('⚠️ CRITICAL: Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(true);
    try {
      await deleteProduct(id);
      navigate('/business/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete product');
      setDeleteLoading(false);
    }
  };

  // --- Loading State ---
  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Navbar />
        <div className="scale-150"><LoadingSpinner /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="w-[1200px] mx-auto px-4 py-10 relative z-10">
        
        <div className="flex justify-center">
            
            {/* --- Main Glass Container --- */}
            <div className="w-full max-w-5xl bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex">
                
                {/* Left Panel: Visual Context */}
                <div className="w-1/3 bg-gradient-to-br from-slate-900 to-slate-800 p-10 border-r border-white/5 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    
                    <div>
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg border ${isEditMode ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'}`}>
                            {isEditMode ? '⚙️' : '✨'}
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2 leading-tight">
                            {isEditMode ? 'Edit Configuration' : 'New Product Entry'}
                        </h1>
                        <p className="text-slate-400">
                            {isEditMode 
                                ? 'Update product specifications and pricing.' 
                                : 'Add a new item to your business inventory.'}
                        </p>
                    </div>

                    <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Tips</h4>
                        <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                            <li>Use high-quality descriptions.</li>
                            <li>Select the most accurate category.</li>
                            <li>Ensure pricing is competitive.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Panel: The Form */}
                <div className="w-2/3 p-10">
                    
                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                            <span className="text-xl">⚠️</span>
                            <span className="text-red-400 font-medium">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Row 1: Name & Price */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                                    Product Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-black/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all font-medium"
                                    placeholder="e.g. Wireless Headphones"
                                    required
                                />
                            </div>

                            <div className="group">
                                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                                    Price ($) <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-4 text-slate-500">$</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-8 pr-5 py-4 bg-black/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all font-mono"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Category & Availability */}
                        <div className="grid grid-cols-2 gap-6">
                             <div className="group">
                                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                                    Category <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-black/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none cursor-pointer"
                                        required
                                    >
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

                            <div className="group">
                                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4 ml-1">
                                    Status
                                </label>
                                <label className="flex items-center gap-4 cursor-pointer p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name="availability"
                                            checked={formData.availability}
                                            onChange={handleChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                    </div>
                                    <span className={`text-sm font-bold ${formData.availability ? 'text-green-400' : 'text-slate-500'}`}>
                                        {formData.availability ? 'Available for Sale' : 'Currently Unavailable'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="group">
                            <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                                Description <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                className="w-full px-5 py-4 bg-black/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all resize-none leading-relaxed"
                                placeholder="Describe the product features, specs, and details..."
                                required
                            ></textarea>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 border-t border-white/5 flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/business/dashboard')}
                                className="px-8 py-3 rounded-xl border border-slate-600 text-slate-300 font-bold hover:bg-slate-800 hover:text-white transition-all"
                            >
                                Cancel
                            </button>
                            
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : (isEditMode ? 'Save Changes' : 'Create Product')}
                            </button>
                        </div>

                        {isEditMode && (
                            <div className="mt-8 pt-4">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={deleteLoading}
                                    className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 font-bold text-sm uppercase tracking-wider hover:bg-red-500/10 hover:border-red-500/50 transition-all flex items-center justify-center gap-2"
                                >
                                    {deleteLoading ? 'Deleting...' : '🗑️ Delete Product Permanently'}
                                </button>
                            </div>
                        )}

                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditProductPage;