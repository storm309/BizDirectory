const mongoose = require('mongoose');

/**
 * Business Schema
 * Stores information about registered businesses
 */
const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a business name'],
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Restaurant',
      'Retail',
      'Electronics',
      'Fashion',
      'Grocery',
      'Healthcare',
      'Education',
      'Services',
      'Automotive',
      'Other'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Please add a city'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  approved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create index for search optimization
businessSchema.index({ name: 'text', city: 'text', category: 'text' });

module.exports = mongoose.model('Business', businessSchema);
