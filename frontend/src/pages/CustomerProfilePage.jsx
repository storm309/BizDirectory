import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

/**
 * Customer Profile Page - View and manage profile
 */
const CustomerProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-4xl text-primary-600 font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Full Name
              </label>
              <p className="text-lg font-semibold text-gray-800">
                {user?.name}
              </p>
            </div>

            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email Address
              </label>
              <p className="text-lg font-semibold text-gray-800">
                {user?.email}
              </p>
            </div>

            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                City
              </label>
              <p className="text-lg font-semibold text-gray-800">
                {user?.city}
              </p>
            </div>

            <div className="border-b pb-4">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Role
              </label>
              <p className="text-lg font-semibold text-gray-800 capitalize">
                {user?.role}
              </p>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Member since: {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-500 text-center">
              To update your profile information, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
