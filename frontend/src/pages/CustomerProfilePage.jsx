import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

/**
 * Customer Profile Page - Digital Identity Card UI
 */
const CustomerProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center">
        
        {/* Page Title */}
        <div className="mb-10 text-center">
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                User <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Dashboard</span>
            </h1>
            <p className="text-slate-400">Manage your identity and personal preferences</p>
        </div>

        {/* --- The Digital ID Card --- */}
        <div className="w-[800px] bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative group">
          
          {/* Top Decorative Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
          
          <div className="p-10">
            {/* Header: Avatar & Name */}
            <div className="flex items-center gap-8 mb-10 border-b border-white/5 pb-8">
                
                {/* Glowing Avatar */}
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative w-32 h-32 bg-slate-950 rounded-full flex items-center justify-center border-2 border-slate-700 shadow-xl">
                        <span className="text-5xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    {/* Status Dot */}
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-slate-900 rounded-full" title="Online"></div>
                </div>

                {/* Name & Role Details */}
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-3xl font-bold text-white tracking-wide">
                            {user?.name}
                        </h2>
                        <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider">
                            Verified User
                        </span>
                    </div>
                    <p className="text-slate-400 mb-4">{user?.email}</p>
                    
                    <div className="flex gap-3">
                        <span className="px-4 py-1.5 bg-slate-800 rounded-lg text-slate-300 text-sm font-medium border border-white/5 capitalize">
                            👤 {user?.role} Access
                        </span>
                        <span className="px-4 py-1.5 bg-slate-800 rounded-lg text-slate-300 text-sm font-medium border border-white/5">
                            📅 Since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Grid Information */}
            <div className="grid grid-cols-2 gap-6">
                
                {/* Field 1: Display Name */}
                <div className="p-5 bg-black/20 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Display Name</label>
                    <div className="text-lg text-white font-medium flex items-center gap-2">
                        {user?.name}
                        <span className="text-slate-600 text-sm">✎</span>
                    </div>
                </div>

                {/* Field 2: Email */}
                <div className="p-5 bg-black/20 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Primary Email</label>
                    <div className="text-lg text-white font-medium flex items-center gap-2">
                        {user?.email}
                        <span className="text-green-500/50 text-xs">✓ Verified</span>
                    </div>
                </div>

                {/* Field 3: Location */}
                <div className="p-5 bg-black/20 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Current Location</label>
                    <div className="text-lg text-white font-medium flex items-center gap-2">
                        <span className="text-red-400">📍</span> {user?.city || 'Not set'}
                    </div>
                </div>

                {/* Field 4: Account Status */}
                <div className="p-5 bg-black/20 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <label className="block text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">System Status</label>
                    <div className="text-lg text-green-400 font-medium flex items-center gap-2">
                        <span className="animate-pulse">●</span> Active
                    </div>
                </div>

            </div>

            {/* Footer Notice */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-sm">
                <p className="text-slate-500">
                    <span className="text-cyan-500 font-bold">ID:</span> {user?._id || 'UNKNOWN'}
                </p>
                <p className="text-slate-500 flex items-center gap-2">
                    To update profile information, please contact support.
                    <span className="w-2 h-2 bg-slate-600 rounded-full"></span>
                </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;