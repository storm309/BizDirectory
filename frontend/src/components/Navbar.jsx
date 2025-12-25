import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Navigation Bar Component
 */
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-black backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50 shadow-lg shadow-cyan-500/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-extrabold text-white flex items-center space-x-2 hover:scale-105 transition-transform">
            <span className="text-3xl">⚡</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">BizDirectory</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center bg-gradient-to-r from-gray-900 to-gray-800 border border-cyan-500 rounded-full px-5 py-2 shadow-lg shadow-cyan-500/30">
                  <span className="text-sm text-cyan-400 mr-2">👋</span>
                  <span className="text-sm text-cyan-400 font-bold">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-full font-bold hover:from-red-700 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg shadow-red-500/40"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-cyan-500 text-cyan-400 px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full font-bold hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/50"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
