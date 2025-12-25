const mongoose = require('mongoose');

/**
 * Product Schema
 * Stores information about products listed by businesses
 */
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Food & Beverages',
      'Electronics',
      'Clothing',
      'Home & Garden',
      'Sports',
      'Books',
      'Toys',
      'Health & Beauty',
      'Automotive',
      'Other'
    ]
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  }
}, {
  timestamps: true
});

// Create index for search optimization
productSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);
