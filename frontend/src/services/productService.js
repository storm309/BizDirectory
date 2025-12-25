import api from '../utils/api';

/**
 * Create a new product
 */
export const createProduct = async (productData) => {
  const response = await api.post('/product', productData);
  return response.data;
};

/**
 * Get all products with search/filter
 */
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/product?${params}`);
  return response.data;
};

/**
 * Search products
 */
export const searchProducts = async (searchParams) => {
  const params = new URLSearchParams(searchParams).toString();
  const response = await api.get(`/product/search?${params}`);
  return response.data;
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

/**
 * Update product
 */
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/product/${id}`, productData);
  return response.data;
};

/**
 * Delete product
 */
export const deleteProduct = async (id) => {
  const response = await api.delete(`/product/${id}`);
  return response.data;
};

/**
 * Get logged in business owner's products
 */
export const getMyProducts = async () => {
  const response = await api.get('/product/my/products');
  return response.data;
};
