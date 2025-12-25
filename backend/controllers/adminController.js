const User = require('../models/User');
const Business = require('../models/Business');
const Product = require('../models/Product');

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private (Admin only)
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/admin/user/:id
 * @access  Private (Admin only)
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow deleting admin users
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin users' });
    }

    // If user is a business owner, delete their business and products
    if (user.role === 'business') {
      const business = await Business.findOne({ owner: user._id });
      if (business) {
        await Product.deleteMany({ business: business._id });
        await Business.findByIdAndDelete(business._id);
      }
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all businesses (including unapproved)
 * @route   GET /api/admin/businesses
 * @access  Private (Admin only)
 */
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({}).populate('owner', 'name email');
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Private (Admin only)
 */
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBusinesses = await Business.countDocuments();
    const approvedBusinesses = await Business.countDocuments({ approved: true });
    const pendingBusinesses = await Business.countDocuments({ approved: false });
    const totalProducts = await Product.countDocuments();

    res.json({
      totalUsers,
      totalBusinesses,
      approvedBusinesses,
      pendingBusinesses,
      totalProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllBusinesses,
  getStats
};
