import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

/**
 * Register Page - Optimized for Desktop (Wide Split Layout)
 */
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    city: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, user } = useContext(AuthContext);
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
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
    if (result.success) {
      setSuccess('Account created successfully! Redirecting to login...');
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
        
        {/* Floating Orbs (Adjusted colors to match Theme) */}
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>
      
      {/* --- Main Content (Centered Wide Card) --- */}
      <div className="flex-1 flex items-center justify-center relative z-10 py-10">
        
        {/* The Glass Card - Split View */}
        <div className="w-[1000px] bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex overflow-hidden">
            
            {/* Left Side: Visual/Branding Panel */}
            <div className="w-2/5 bg-gradient-to-br from-cyan-900/40 to-slate-900/40 p-12 flex flex-col justify-between border-r border-white/5 relative overflow-hidden">
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                
                <div>
                    <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-cyan-500/10 border border-cyan-500/20">
                        🚀
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4 leading-tight">
                        Start Your <br/> Journey
                    </h2>
                    <p className="text-slate-400 leading-relaxed">
                        Join thousands of local businesses and customers. Create an account to unlock exclusive features.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-300">
                        <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">✓</span>
                        <span>Free Account Setup</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                        <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">✓</span>
                        <span>Instant Access</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                        <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">✓</span>
                        <span>Secure & Private</span>
                    </div>
                </div>
            </div>

            {/* Right Side: The Form */}
            <div className="w-3/5 p-12">
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-1">Create Account</h3>
                    <p className="text-slate-500 text-sm">Enter your details to register</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center text-sm">
                    ⚠️ {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-xl mb-6 flex items-center text-sm">
                    ✅ {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Row 1: Name & City */}
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/30 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/30 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                                placeholder="New York"
                                required
                            />
                        </div>
                    </div>

                    {/* Row 2: Email */}
                    <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-black/30 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    {/* Row 3: Role Selection */}
                    <div>
                        <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">I am a...</label>
                        <div className="relative">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/30 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none appearance-none cursor-pointer"
                            >
                                <option value="customer" className="bg-slate-900 text-slate-300">Customer (Looking to buy)</option>
                                <option value="business" className="bg-slate-900 text-slate-300">Business Owner (Looking to sell)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                        </div>
                    </div>

                    {/* Row 4: Password & Confirm */}
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/30 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                                placeholder="••••••"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Confirm</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-black/30 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all outline-none"
                                placeholder="••••••"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 group relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40 disabled:opacity-50"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        <span className="relative flex items-center justify-center gap-2">
                            {loading ? 'Creating Account...' : 'Create Account ✨'}
                        </span>
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-500 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-all">
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;