import { useState, useEffect } from 'react';
import { getAllBusinesses } from '../services/adminService';
import { approveBusiness } from '../services/businessService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Admin Business Approval Page
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
    if (!window.confirm(`Approve business "${businessName}"?`)) {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Business Approvals</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({businesses.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Approved ({approvedCount})
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <div
                key={business._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {business.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    business.approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {business.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Owner:</span> {business.owner?.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Email:</span> {business.owner?.email}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Category:</span> {business.category}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">City:</span> {business.city}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Address:</span> {business.address}
                  </p>
                  {business.phone && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Phone:</span> {business.phone}
                    </p>
                  )}
                </div>

                {business.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {business.description}
                  </p>
                )}

                {!business.approved && (
                  <button
                    onClick={() => handleApproveBusiness(business._id, business.name)}
                    disabled={approveLoading === business._id}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400"
                  >
                    {approveLoading === business._id ? 'Approving...' : 'Approve Business'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && filteredBusinesses.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">
              {filter === 'pending' 
                ? 'No pending businesses to approve'
                : filter === 'approved'
                ? 'No approved businesses yet'
                : 'No businesses registered yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBusinessApprovalPage;
