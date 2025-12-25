const express = require('express');
const {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  getMyBusiness,
  approveBusiness
} = require('../controllers/businessController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getBusinesses);
router.get('/:id', getBusinessById);

// Protected routes - Business owner
router.post('/', protect, authorize('business'), createBusiness);
router.get('/my/business', protect, authorize('business'), getMyBusiness);
router.put('/:id', protect, authorize('business'), updateBusiness);

// Admin only
router.put('/approve/:id', protect, authorize('admin'), approveBusiness);

module.exports = router;
