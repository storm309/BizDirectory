import api from '../utils/api';

/**
 * Create a new business
 */
export const createBusiness = async (businessData) => {
  const response = await api.post('/business', businessData);
  return response.data;
};

/**
 * Get all businesses
 */
export const getBusinesses = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/business?${params}`);
  return response.data;
};

/**
 * Get single business by ID
 */
export const getBusinessById = async (id) => {
  const response = await api.get(`/business/${id}`);
  return response.data;
};

/**
 * Update business
 */
export const updateBusiness = async (id, businessData) => {
  const response = await api.put(`/business/${id}`, businessData);
  return response.data;
};

/**
 * Get logged in user's business
 */
export const getMyBusiness = async () => {
  const response = await api.get('/business/my/business');
  return response.data;
};

/**
 * Approve business (Admin only)
 */
export const approveBusiness = async (id) => {
  const response = await api.put(`/business/approve/${id}`);
  return response.data;
};
