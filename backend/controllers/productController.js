const Product = require('../models/Product');
const Business = require('../models/Business');

/**
 * @desc    Create a new product
 * @route   POST /api/product
 * @access  Private (Business owner)
 */
const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, availability } = req.body;

    // Validation
    if (!name || !price || !category || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Find business owned by user
    const business = await Business.findOne({ owner: req.user._id });
    if (!business) {
      return res.status(404).json({ message: 'You must register a business first' });
    }

    // Check if business is approved
    if (!business.approved) {
      return res.status(403).json({ message: 'Your business must be approved before adding products' });
    }

    const product = await Product.create({
      name,
      price,
      category,
      description,
      availability: availability !== undefined ? availability : true,
      business: business._id
    });

    const populatedProduct = await Product.findById(product._id).populate('business', 'name city');
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all products with optional search and filters
 * @route   GET /api/product
 * @route   GET /api/product/search?city=&category=&keyword=
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    const { city, category, keyword } = req.query;
    let query = {};

    // Build search query
    if (keyword) {
      query.$or = [
        { name: new RegExp(keyword, 'i') },
        { description: new RegExp(keyword, 'i') }
      ];
    }

    if (category) {
      query.category = category;
    }

    // Get products
    let products = await Product.find(query).populate('business', 'name city address category');

    // Filter by city if provided (filter on populated business)
    if (city) {
      products = products.filter(product => 
        product.business && product.business.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/product/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('business', 'name city address phone category');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/product/:id
 * @access  Private (Business owner)
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('business');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check ownership
    if (product.business.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('business', 'name city address');

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/product/:id
 * @access  Private (Business owner)
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('business');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check ownership
    if (product.business.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get products for logged in business owner
 * @route   GET /api/product/my/products
 * @access  Private (Business owner)
 */
const getMyProducts = async (req, res) => {
  try {
    // Find business owned by user
    const business = await Business.findOne({ owner: req.user._id });
    if (!business) {
      return res.status(404).json({ message: 'No business found' });
    }

    const products = await Product.find({ business: business._id }).populate('business', 'name city');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts
};
