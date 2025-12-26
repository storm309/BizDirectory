import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getStats } from '../services/adminService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Admin Dashboard - Mission Control UI
 */
const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="w-[1280px] mx-auto px-4 py-10 relative z-10">
        
        {/* --- Header / Welcome --- */}
        <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-6">
           <div>
              <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-2">Platform Administration</div>
              <h1 className="text-5xl font-black text-white tracking-tight mb-2">
                 Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Control</span>
              </h1>
              <p className="text-slate-400 text-lg">
                 Welcome back, Admin <span className="text-white font-bold">{user?.name}</span>. System is ready.
              </p>
           </div>
           
           <div className="text-right">
              <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                 <span className="flex items-center gap-2 text-green-400 font-bold text-sm">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    System Operational
                 </span>
              </div>
           </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="scale-150"><LoadingSpinner /></div>
          </div>
        ) : (
          <>
            {/* --- Statistics Grid (The HUD) --- */}
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               📊 System Metrics
            </h2>
            
            <div className="grid grid-cols-3 gap-6 mb-12">
               
               {/* 1. Total Users */}
               <div className="bg-slate-900/50 backdrop-blur-md border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500">
                  <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                     <div className="text-6xl grayscale group-hover:grayscale-0">👥</div>
                  </div>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Total Users</p>
                  <p className="text-4xl font-black text-white">{stats?.totalUsers || 0}</p>
                  <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 w-3/4"></div>
                  </div>
               </div>

               {/* 2. Total Products */}
               <div className="bg-slate-900/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
                  <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                     <div className="text-6xl grayscale group-hover:grayscale-0">📦</div>
                  </div>
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">Inventory Items</p>
                  <p className="text-4xl font-black text-white">{stats?.totalProducts || 0}</p>
                  <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-500 w-1/2"></div>
                  </div>
               </div>

               {/* 3. Total Businesses */}
               <div className="bg-slate-900/50 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-500">
                  <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                     <div className="text-6xl grayscale group-hover:grayscale-0">🏪</div>
                  </div>
                  <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">Registered Businesses</p>
                  <p className="text-4xl font-black text-white">{stats?.totalBusinesses || 0}</p>
                  <div className="w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-500 w-2/3"></div>
                  </div>
               </div>

               {/* 4. Approved Businesses */}
               <div className="bg-slate-900/50 backdrop-blur-md border border-green-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/50 transition-all duration-500">
                  <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                     <div className="text-6xl grayscale group-hover:grayscale-0">✅</div>
                  </div>
                  <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-1">Verified Partners</p>
                  <p className="text-4xl font-black text-white">{stats?.approvedBusinesses || 0}</p>
               </div>

               {/* 5. Pending Approvals (Warning State) */}
               <div className={`col-span-2 bg-slate-900/50 backdrop-blur-md border rounded-2xl p-6 relative overflow-hidden group transition-all duration-500 flex items-center justify-between ${
                  (stats?.pendingBusinesses || 0) > 0 
                  ? 'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.1)]' 
                  : 'border-slate-700'
               }`}>
                  <div>
                     <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                        (stats?.pendingBusinesses || 0) > 0 ? 'text-yellow-400 animate-pulse' : 'text-slate-500'
                     }`}>Pending Approvals</p>
                     <div className="flex items-baseline gap-4">
                        <p className="text-4xl font-black text-white">{stats?.pendingBusinesses || 0}</p>
                        {(stats?.pendingBusinesses || 0) > 0 && (
                           <span className="text-sm text-yellow-500 font-bold">Action Required ⚠️</span>
                        )}
                     </div>
                  </div>
                  <div className="text-6xl opacity-20">⏳</div>
               </div>
            </div>

            {/* --- Quick Actions Panels --- */}
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               ⚡ Administrative Actions
            </h2>

            <div className="grid grid-cols-2 gap-8">
               {/* User Management Panel */}
               <Link
                 to="/admin/users"
                 className="group relative h-48 bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)]"
               >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="absolute right-0 bottom-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                     <div className="text-9xl">👥</div>
                  </div>
                  
                  <div className="relative z-10 p-10 h-full flex flex-col justify-center">
                     <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">User Management</h3>
                     <p className="text-slate-400 max-w-sm">Access the full user database, manage roles, and perform account actions.</p>
                     <div className="mt-6 flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                        Access Database ➜
                     </div>
                  </div>
               </Link>

               {/* Business Approvals Panel */}
               <Link
                 to="/admin/businesses"
                 className="group relative h-48 bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.3)]"
               >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="absolute right-0 bottom-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                     <div className="text-9xl">🏪</div>
                  </div>
                  
                  <div className="relative z-10 p-10 h-full flex flex-col justify-center">
                     <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Business Approvals</h3>
                     <p className="text-slate-400 max-w-sm">Review incoming business registration requests and verify store details.</p>
                     <div className="mt-6 flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                        Open Queue ➜
                        {(stats?.pendingBusinesses || 0) > 0 && (
                           <span className="bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded-full ml-2 animate-pulse">
                              {stats.pendingBusinesses} NEW
                           </span>
                        )}
                     </div>
                  </div>
               </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;