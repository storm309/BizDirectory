import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

/**
 * Landing Page - Optimized STRICTLY for Laptop/Desktop (High-End UI)
 */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      
      {/* 1. Background Visuals (Cinematic & Wide) */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Cyber Grid - Wide */}
        <div 
          className="absolute inset-0 opacity-15" 
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
          }}
        ></div>
        
        {/* Giant Glowing Orbs (Fixed positions for Desktop) */}
        <div className="absolute top-[-100px] left-[20%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute bottom-[-100px] left-[35%] w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>
      
      {/* 2. Main Desktop Container */}
      <div className="w-[1280px] mx-auto pt-24 pb-32 relative z-10"> {/* Fixed wide width for consistency */}
        
        {/* Hero Section */}
        <div className="text-center animate-fade-in-up">
          
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="px-5 py-2 bg-cyan-950/30 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all cursor-default">
              ⚡ The Future of Local Shopping is Here
            </span>
          </div>
          
          {/* Massive Typography */}
          <h1 className="text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            Local Business <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
              Directory & Marketplace
            </span>
          </h1>
          
          <p className="text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Connect with the best local businesses, discover exclusive products, 
            and experience shopping with <span className="text-white font-medium">next-gen technology.</span>
          </p>

          {/* Desktop Buttons */}
          <div className="flex flex-row justify-center gap-6 mb-32">
            <Link
              to="/register"
              className="group relative w-64 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative h-full flex items-center justify-center text-xl font-bold">
                Get Started Free 🚀
              </span>
            </Link>
            
            <Link
              to="/login"
              className="w-64 h-16 flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 text-cyan-400 text-xl font-bold hover:bg-slate-800 hover:border-cyan-500/50 transition-all hover:scale-105 backdrop-blur-md"
            >
              Sign In to Account
            </Link>
          </div>

          {/* 3. Features Section (Horizontal 3-Column Layout) */}
          <div className="grid grid-cols-3 gap-10 text-left">
            {/* Feature 1 */}
            <div className="relative group bg-slate-900/40 border border-white/5 p-10 rounded-3xl backdrop-blur-xl hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                🛍️
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">For Customers</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Smart search filters, real-time inventory checks, and instant connections with sellers in your exact neighborhood.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="relative group bg-slate-900/40 border border-white/5 p-10 rounded-3xl backdrop-blur-xl hover:bg-slate-800/60 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                🏪
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">Business Growth</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                A powerful dashboard to manage products, track analytics, and reach thousands of local customers effortlessly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative group bg-slate-900/40 border border-white/5 p-10 rounded-3xl backdrop-blur-xl hover:bg-slate-800/60 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
              <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                📍
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Geo-Targeting</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Advanced location services ensure you find exactly what you need, right where you are, without the shipping wait.
              </p>
            </div>
          </div>

          {/* 4. Stats Section (Floating Glass Strip) */}
          <div className="mt-32 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl opacity-30"></div>
             <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl py-12 px-16 flex flex-row justify-between items-center max-w-5xl mx-auto hover:border-white/20 transition-colors">
                
                <div className="text-center w-1/3 border-r border-white/10">
                  <div className="text-6xl font-black text-white mb-2 drop-shadow-lg">1000+</div>
                  <div className="text-cyan-400 font-bold uppercase tracking-widest text-sm">Active Businesses</div>
                </div>
                
                <div className="text-center w-1/3 border-r border-white/10">
                  <div className="text-6xl font-black text-white mb-2 drop-shadow-lg">5000+</div>
                  <div className="text-blue-400 font-bold uppercase tracking-widest text-sm">Products Listed</div>
                </div>
                
                <div className="text-center w-1/3">
                  <div className="text-6xl font-black text-white mb-2 drop-shadow-lg">10K+</div>
                  <div className="text-purple-400 font-bold uppercase tracking-widest text-sm">Satisfied Users</div>
                </div>

             </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 bg-[#020617] mt-20">
        <div className="w-[1280px] mx-auto text-center">
          <p className="text-slate-500">
            © 2025 Local Business Directory. All rights reserved. Made with <span className="text-red-500 animate-pulse inline-block">❤️</span> for the Community.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;