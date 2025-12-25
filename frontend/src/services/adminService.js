import api from '../utils/api';

/**
 * Get all users
 */
export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

/**
 * Delete user
 */
export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/user/${id}`);
  return response.data;
};

/**
 * Get all businesses (including unapproved)
 */
export const getAllBusinesses = async () => {
  const response = await api.get('/admin/businesses');
  return response.data;
};

/**
 * Get admin dashboard statistics
 */
export const getStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};
