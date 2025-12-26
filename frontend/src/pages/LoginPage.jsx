import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

/**
 * Login Page - High-End Desktop UI
 */
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      redirectToDashboard(user.role);
    }
  }, [user, navigate]);

  const redirectToDashboard = (role) => {
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'business') {
      navigate('/business/dashboard');
    } else {
      navigate('/customer/home');
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

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      redirectToDashboard(result.data.role);
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-white flex flex-col">
      
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
          }}
        ></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Navbar sits on top */}
      <div className="relative z-50">
        <Navbar />
      </div>
      
      {/* --- Main Centered Content --- */}
      <div className="flex-1 flex items-center justify-center relative z-10 pb-20">
        
        {/* Glass Card Container - Fixed Width for Desktop */}
        <div className="w-[500px] bg-slate-900/40 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.6)] transform transition-all hover:border-white/20">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto border border-white/5 shadow-lg shadow-cyan-500/10">
              🔑
            </div>
            <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-400 text-lg">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl mb-8 flex items-center gap-3 backdrop-blur-sm">
              <span className="text-xl">⚠️</span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="group">
              <label className="block text-slate-300 text-sm font-bold mb-2 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-black/30 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-slate-900/50 transition-all placeholder-slate-600 outline-none text-lg"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <div className="flex justify-between items-center mb-2 ml-1">
                 <label className="block text-slate-300 text-sm font-bold uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-black/30 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-slate-900/50 transition-all placeholder-slate-600 outline-none text-lg"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-5 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative flex items-center justify-center gap-2">
                {loading ? 'Authenticating...' : 'Sign In to Dashboard →'}
              </span>
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-slate-400">
              Don't have an account yet?{' '}
              <Link 
                to="/register" 
                className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-all decoration-2 underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;