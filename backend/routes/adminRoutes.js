const express = require('express');
const {
  getAllUsers,
  deleteUser,
  getAllBusinesses,
  getStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are admin only
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.delete('/user/:id', deleteUser);
router.get('/businesses', getAllBusinesses);
router.get('/stats', getStats);

module.exports = router;
