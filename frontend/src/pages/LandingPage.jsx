import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

/**
 * Landing Page - First page users see
 */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-[450px] h-[450px] bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
        </div>
      </div>

      <Navbar />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center text-white animate-fade-in-up">
          {/* Hero Section */}
          <div className="mb-8">
            <span className="inline-block px-6 py-2 bg-cyan-500 bg-opacity-10 backdrop-blur-md rounded-full text-sm font-bold mb-4 border border-cyan-500 neon-text">
              ⚡ Welcome to the Future of Local Shopping
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
            <span className="text-white">Local Business</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse-glow">
              Directory
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-400 max-w-3xl mx-auto leading-relaxed">
            🚀 Discover amazing local businesses and find products near you with cutting-edge technology
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 mb-20">
            <Link
              to="/register"
              className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-5 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-110 glow-cyan"
            >
              <span className="relative z-10 flex items-center justify-center">
                Get Started Free ⚡
              </span>
            </Link>
            <Link
              to="/login"
              className="bg-gray-900 border-2 border-cyan-500 text-cyan-400 px-12 py-5 rounded-2xl text-lg font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 neon-border"
            >
              Sign In →
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="dark-card p-8 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">🛍️</div>
              <h3 className="text-2xl font-bold mb-3 text-white relative z-10">For Customers</h3>
              <p className="text-gray-400 text-lg leading-relaxed relative z-10">
                Search and discover local products and businesses in your area with smart filters
              </p>
            </div>

            <div className="dark-card p-8 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">🏪</div>
              <h3 className="text-2xl font-bold mb-3 text-white relative z-10">For Business Owners</h3>
              <p className="text-gray-400 text-lg leading-relaxed relative z-10">
                Register your business and showcase your products to thousands of local customers
              </p>
            </div>

            <div className="dark-card p-8 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">📍</div>
              <h3 className="text-2xl font-bold mb-3 text-white relative z-10">Location-Based</h3>
              <p className="text-gray-400 text-lg leading-relaxed relative z-10">
                Find businesses and products based on your city and personal preferences
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="text-center dark-card p-6 transform hover:scale-105 transition-all">
              <div className="text-5xl font-extrabold mb-2 neon-text">1000+</div>
              <div className="text-lg text-gray-400">Active Businesses</div>
            </div>
            <div className="text-center dark-card p-6 transform hover:scale-105 transition-all">
              <div className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">5000+</div>
              <div className="text-lg text-gray-400">Products Listed</div>
            </div>
            <div className="text-center dark-card p-6 transform hover:scale-105 transition-all">
              <div className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">10K+</div>
              <div className="text-lg text-gray-400">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-10 relative z-10 border-t border-gray-800">
        <p className="text-sm text-gray-500">
          © 2025 Local Business Directory. All rights reserved. Made with <span className="text-cyan-400">❤️</span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
