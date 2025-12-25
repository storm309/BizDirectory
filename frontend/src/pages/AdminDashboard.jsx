import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getStats } from '../services/adminService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Admin Dashboard - Main page for administrators
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-lg p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-100">
            Welcome, {user?.name}! Manage your platform.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {stats?.totalUsers || 0}
                    </p>
                  </div>
                  <div className="text-5xl">👥</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Businesses</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {stats?.totalBusinesses || 0}
                    </p>
                  </div>
                  <div className="text-5xl">🏪</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Approved Businesses</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                      {stats?.approvedBusinesses || 0}
                    </p>
                  </div>
                  <div className="text-5xl">✅</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Pending Approval</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">
                      {stats?.pendingBusinesses || 0}
                    </p>
                  </div>
                  <div className="text-5xl">⏳</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Products</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {stats?.totalProducts || 0}
                    </p>
                  </div>
                  <div className="text-5xl">📦</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                to="/admin/users"
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center">
                  <div className="text-5xl mr-6">👥</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      User Management
                    </h3>
                    <p className="text-gray-600">
                      View and manage all registered users
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                to="/admin/businesses"
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center">
                  <div className="text-5xl mr-6">🏪</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Business Approval
                    </h3>
                    <p className="text-gray-600">
                      Review and approve business registrations
                    </p>
                    {stats?.pendingBusinesses > 0 && (
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mt-2">
                        {stats.pendingBusinesses} pending
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
