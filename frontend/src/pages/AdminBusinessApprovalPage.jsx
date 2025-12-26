import { useState, useEffect } from 'react';
import { getAllBusinesses } from '../services/adminService';
import { approveBusiness } from '../services/businessService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Admin Business Approval Page - Verification Control Deck
 */
const AdminBusinessApprovalPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approveLoading, setApproveLoading] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, approved

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const data = await getAllBusinesses();
      setBusinesses(data);
    } catch (error) {
      setError('Failed to load businesses');
      console.error('Error fetching businesses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveBusiness = async (businessId, businessName) => {
    if (!window.confirm(`⚠️ SYSTEM CONFIRMATION:\n\nAre you sure you want to verify and approve "${businessName}"? This will make the business visible to all customers.`)) {
      return;
    }

    setApproveLoading(businessId);
    try {
      await approveBusiness(businessId);
      // Update local state
      setBusinesses(businesses.map(business => 
        business._id === businessId 
          ? { ...business, approved: true }
          : business
      ));
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to approve business');
    } finally {
      setApproveLoading(null);
    }
  };

  const filteredBusinesses = businesses.filter(business => {
    if (filter === 'pending') return !business.approved;
    if (filter === 'approved') return business.approved;
    return true;
  });

  const pendingCount = businesses.filter(b => !b.approved).length;
  const approvedCount = businesses.filter(b => b.approved).length;

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="w-[1280px] mx-auto px-4 py-10 relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
           <div>
              <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-2">Admin Clearance</div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                 Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Verification</span>
              </h1>
           </div>
        </div>

        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-md">
            <span className="text-2xl">⚠️</span>
            <span className="text-red-400 font-medium">{error}</span>
          </div>
        )}

        {/* --- Filter Tabs (Neon Style) --- */}
        <div className="flex space-x-2 mb-10 bg-slate-900/50 p-2 rounded-xl border border-white/10 w-fit backdrop-blur-md">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
              filter === 'all'
                ? 'bg-slate-700 text-white shadow-lg'
                : 'text-slate-500 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Database <span className="ml-2 bg-black/20 px-2 py-0.5 rounded text-xs opacity-70">{businesses.length}</span>
          </button>
          
          <button
            onClick={() => setFilter('pending')}
            className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
              filter === 'pending'
                ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                : 'text-slate-500 hover:text-yellow-400 hover:bg-slate-800'
            }`}
          >
            Pending Review <span className="ml-2 bg-black/20 px-2 py-0.5 rounded text-xs opacity-70">{pendingCount}</span>
          </button>
          
          <button
            onClick={() => setFilter('approved')}
            className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
              filter === 'approved'
                ? 'bg-green-600 text-white shadow-[0_0_20px_rgba(22,163,74,0.4)]'
                : 'text-slate-500 hover:text-green-400 hover:bg-slate-800'
            }`}
          >
            Verified <span className="ml-2 bg-black/20 px-2 py-0.5 rounded text-xs opacity-70">{approvedCount}</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="scale-150"><LoadingSpinner /></div>
          </div>
        ) : (
          <>
            {filteredBusinesses.length === 0 ? (
                <div className="bg-slate-900/40 border border-white/5 border-dashed rounded-3xl p-20 text-center">
                    <div className="text-6xl mb-4 opacity-30">📂</div>
                    <p className="text-slate-500 text-lg">No records found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-6">
                {filteredBusinesses.map((business) => (
                    <div
                    key={business._id}
                    className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                        !business.approved 
                        ? 'bg-slate-900/60 border border-yellow-500/30 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]' 
                        : 'bg-slate-900/40 border border-white/10 hover:border-green-500/30'
                    }`}
                    >
                        {/* Status Strip */}
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${
                            !business.approved ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>

                        <div className="pl-4">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                                        {business.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-widest ${
                                            !business.approved 
                                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 animate-pulse' 
                                            : 'bg-green-500/20 text-green-400 border border-green-500/20'
                                        }`}>
                                            {business.approved ? 'Verified' : '⚠ Action Required'}
                                        </span>
                                        <span className="text-slate-500 text-xs px-2 py-0.5 border border-white/10 rounded uppercase font-bold">
                                            {business.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6 text-sm">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Owner Name</p>
                                    <p className="text-slate-300 flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs">👤</span> 
                                        {business.owner?.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Contact Email</p>
                                    <p className="text-slate-300 font-mono text-xs bg-black/20 px-2 py-1 rounded inline-block">
                                        {business.owner?.email}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Location / HQ</p>
                                    <p className="text-slate-300">
                                        📍 {business.address}, <span className="text-white font-bold">{business.city}</span>
                                    </p>
                                </div>
                                {business.phone && (
                                    <div className="col-span-2">
                                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Business Phone</p>
                                        <p className="text-slate-300">📞 {business.phone}</p>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {business.description && (
                                <div className="mb-6 p-4 bg-black/20 rounded-xl border border-white/5">
                                    <p className="text-slate-500 text-xs italic line-clamp-2">"{business.description}"</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="pt-4 border-t border-white/5 flex justify-end">
                                {!business.approved ? (
                                    <button
                                        onClick={() => handleApproveBusiness(business._id, business.name)}
                                        disabled={approveLoading === business._id}
                                        className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {approveLoading === business._id ? (
                                            'Processing Authorization...'
                                        ) : (
                                            <>
                                                <span>🛡️ Grant Approval</span>
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="w-full bg-green-500/10 border border-green-500/20 text-green-400 font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-default">
                                        <span>✓ Status: Active & Visible</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminBusinessApprovalPage;