const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/search', getProducts); // Same handler for search
router.get('/:id', getProductById);

// Protected routes - Business owner
router.post('/', protect, authorize('business'), createProduct);
router.get('/my/products', protect, authorize('business'), getMyProducts);
router.put('/:id', protect, authorize('business'), updateProduct);
router.delete('/:id', protect, authorize('business'), deleteProduct);

module.exports = router;
