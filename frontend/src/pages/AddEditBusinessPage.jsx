import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBusiness, updateBusiness, getBusinessById } from '../services/businessService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Add/Edit Business Page - Corporate Registry UI
 */
const AddEditBusinessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Restaurant',
    address: '',
    city: '',
    phone: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchLoading, setFetchLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchBusiness();
    }
  }, [id]);

  const fetchBusiness = async () => {
    try {
      const data = await getBusinessById(id);
      setFormData({
        name: data.name,
        category: data.category,
        address: data.address,
        city: data.city,
        phone: data.phone || '',
        description: data.description || ''
      });
    } catch (error) {
      setError('Failed to load business data');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode) {
        await updateBusiness(id, formData);
      } else {
        await createBusiness(formData);
      }
      navigate('/business/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save business');
    } finally {
      setLoading(false);
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
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="w-[1200px] mx-auto px-4 py-10 relative z-10">
        
        <div className="flex justify-center">
            
            {/* --- Main Glass Container --- */}
            <div className="w-full max-w-5xl bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex">
                
                {/* Left Panel: Branding & Tips */}
                <div className="w-1/3 bg-gradient-to-br from-slate-900 to-slate-800 p-10 border-r border-white/5 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    
                    <div>
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg border ${isEditMode ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'}`}>
                            {isEditMode ? '⚙️' : '🏢'}
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2 leading-tight">
                            {isEditMode ? 'Modify Profile' : 'Business Registry'}
                        </h1>
                        <p className="text-slate-400">
                            {isEditMode 
                                ? 'Update your business location, contact info, and description.' 
                                : 'Launch your digital storefront and reach local customers.'}
                        </p>
                    </div>

                    <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Registration Tips</h4>
                        <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                            <li>Provide a clear, catchy name.</li>
                            <li>Ensure contact info is accurate.</li>
                            <li>Write a compelling description to attract customers.</li>
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
                        
                        {/* Business Name (Full Width) */}
                        <div className="group">
                            <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                                Business Entity Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-5 py-4 bg-black/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all font-medium"
                                placeholder="e.g. Cyber Cafe & Lounge"
                                required
                            />
                        </div>

                        {/* Row: Category & Phone */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                                    Industry Category <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-black/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="Restaurant" className="bg-slate-900">Restaurant</option>
                                        <option value="Retail" className="bg-slate-900">Retail</option>
                                        <option value="Electronics" className="bg-slate-900">Electronics</option>
                                        <option value="Fashion" className="bg-slate-900">Fashion</option>
                                        <option value="Grocery" className="bg-slate-900">Grocery</option>
                                        <option value="Healthcare" className="bg-slate-900">Healthcare</option>
                                        <option value="Education" className="bg-slate-900">Education</option>
                                        <option value="Services" className="bg-slate-900">Services</option>
                                        <option value="Automotive" className="bg-slate-900">Automotive</option>
                                        <option value="Other" className="bg-slate-900">Other</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500 text-xs">▼</div>
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                                    Contact Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-black/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all font-mono"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>

                        {/* Row: City & Address */}
                        <div className="grid grid-cols-2 gap-6">
                             <div className="group">
                                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                                    City <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-black/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all"
                                    placeholder="New York"
                                    required
                                />
                            </div>

                            <div className="group">
                                <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                                    Full Address <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-black/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all"
                                    placeholder="123 Main Street"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="group">
                            <label className="block text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                                Business Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-5 py-4 bg-black/40 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-600 transition-all resize-none leading-relaxed"
                                placeholder="Tell us about your services, history, and values..."
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
                                {loading ? 'Processing Registry...' : (isEditMode ? 'Update Business Profile' : 'Complete Registration 🚀')}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBusinessPage;