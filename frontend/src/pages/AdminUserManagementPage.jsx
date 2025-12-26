import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../services/adminService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Admin User Management Page - High-Tech Database Console
 */
const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      setError('Failed to load users from the server database.');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`⚠️ CRITICAL ACTION: Are you sure you want to delete user "${userName}"? This action cannot be undone and will remove all associated data.`)) {
      return;
    }

    setDeleteLoading(userId);
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Styled Badges for Dark Theme
  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]';
      case 'business':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]';
      case 'customer':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      default:
        return 'bg-slate-700/30 text-slate-400 border-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="w-[1280px] mx-auto px-4 py-10 relative z-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
           <div>
              <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-2">System Administration</div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                 User <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Database</span>
              </h1>
           </div>
           
           <div className="flex items-center gap-4 bg-slate-900/50 border border-white/10 px-6 py-3 rounded-xl backdrop-blur-md">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                 <p className="text-xs text-slate-500 uppercase font-bold">Total Active Users</p>
                 <p className="text-xl font-bold text-white leading-none">{users.length}</p>
              </div>
           </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-md">
            <span className="text-2xl">⚠️</span>
            <span className="text-red-400 font-medium">{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="scale-150"><LoadingSpinner /></div>
          </div>
        ) : (
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* The Glass Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/40 border-b border-white/10">
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">User Identity</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Email</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">System Role</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Location</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                      
                      {/* Name + Avatar */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                              {user.name.charAt(0).toUpperCase()}
                           </div>
                           <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                              {user.name}
                           </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-8 py-5">
                        <div className="text-slate-400 text-sm font-mono bg-black/20 px-2 py-1 rounded inline-block">
                           {user.email}
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getRoleBadgeStyle(user.role)}`}>
                           <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                           {user.role}
                        </span>
                      </td>

                      {/* City */}
                      <td className="px-8 py-5">
                        <div className="text-slate-400 text-sm flex items-center gap-2">
                           <span>📍</span> {user.city}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-8 py-5 text-right">
                        {user.role !== 'admin' ? (
                          <button
                            onClick={() => handleDeleteUser(user._id, user.name)}
                            disabled={deleteLoading === user._id}
                            className="text-sm font-bold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 px-4 py-2 rounded-lg transition-all border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                          >
                            {deleteLoading === user._id ? 'Processing...' : 'Delete Access'}
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest bg-slate-800/50 px-3 py-2 rounded border border-white/5 cursor-not-allowed">
                            🔒 Protected
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {users.length === 0 && (
              <div className="text-center py-20">
                <div className="text-5xl mb-4 opacity-30">📂</div>
                <p className="text-slate-500">Database is empty. No records found.</p>
              </div>
            )}
            
            {/* Footer Stats */}
            <div className="bg-black/20 px-8 py-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-500">
               <span>Last Synced: Just now</span>
               <span>End of Records</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagementPage;