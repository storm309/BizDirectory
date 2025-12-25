const Business = require('../models/Business');
const User = require('../models/User');

/**
 * @desc    Create a new business
 * @route   POST /api/business
 * @access  Private (Business role)
 */
const createBusiness = async (req, res) => {
  try {
    const { name, category, address, city, phone, description } = req.body;

    // Validation
    if (!name || !category || !address || !city) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user already has a business
    const existingBusiness = await Business.findOne({ owner: req.user._id });
    if (existingBusiness) {
      return res.status(400).json({ message: 'You already have a registered business' });
    }

    const business = await Business.create({
      name,
      owner: req.user._id,
      category,
      address,
      city,
      phone,
      description
    });

    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all businesses (approved only for customers, all for admin)
 * @route   GET /api/business
 * @access  Public
 */
const getBusinesses = async (req, res) => {
  try {
    const { city, category } = req.query;
    let query = {};

    // Filter by approval status unless admin
    if (!req.user || req.user.role !== 'admin') {
      query.approved = true;
    }

    // Apply filters
    if (city) query.city = new RegExp(city, 'i');
    if (category) query.category = category;

    const businesses = await Business.find(query).populate('owner', 'name email');
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single business by ID
 * @route   GET /api/business/:id
 * @access  Public
 */
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).populate('owner', 'name email city');

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update business
 * @route   PUT /api/business/:id
 * @access  Private (Business owner only)
 */
const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Check ownership
    if (business.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this business' });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedBusiness);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get business owned by logged in user
 * @route   GET /api/business/my/business
 * @access  Private (Business role)
 */
const getMyBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({ owner: req.user._id });
    
    if (!business) {
      return res.status(404).json({ message: 'No business found for this user' });
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Approve business (Admin only)
 * @route   PUT /api/business/approve/:id
 * @access  Private (Admin only)
 */
const approveBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    business.approved = true;
    await business.save();

    res.json({ message: 'Business approved successfully', business });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  getMyBusiness,
  approveBusiness
};
