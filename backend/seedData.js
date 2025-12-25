require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Business = require('./models/Business');
const Product = require('./models/Product');

/**
 * Seed database with sample data
 * Run with: npm run seed
 */
const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Business.deleteMany({});
    await Product.deleteMany({});

    // Create Admin User
    console.log('Creating admin user...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      city: 'New York'
    });

    // Create Customer Users
    console.log('Creating customer users...');
    const customer1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'customer123',
      role: 'customer',
      city: 'New York'
    });

    const customer2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'customer123',
      role: 'customer',
      city: 'Los Angeles'
    });

    // Create Business Owner Users
    console.log('Creating business owner users...');
    const businessOwner1 = await User.create({
      name: 'Mike Johnson',
      email: 'mike@example.com',
      password: 'business123',
      role: 'business',
      city: 'New York'
    });

    const businessOwner2 = await User.create({
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      password: 'business123',
      role: 'business',
      city: 'Los Angeles'
    });

    const businessOwner3 = await User.create({
      name: 'David Brown',
      email: 'david@example.com',
      password: 'business123',
      role: 'business',
      city: 'Chicago'
    });

    // Create Businesses
    console.log('Creating businesses...');
    const business1 = await Business.create({
      name: "Mike's Pizza Palace",
      owner: businessOwner1._id,
      category: 'Restaurant',
      address: '123 Main Street',
      city: 'New York',
      phone: '(555) 123-4567',
      description: 'Best pizza in New York! Fresh ingredients and authentic Italian recipes.',
      approved: true
    });

    const business2 = await Business.create({
      name: "Sarah's Fashion Boutique",
      owner: businessOwner2._id,
      category: 'Fashion',
      address: '456 Sunset Blvd',
      city: 'Los Angeles',
      phone: '(555) 234-5678',
      description: 'Trendy fashion for everyone. Latest styles and affordable prices.',
      approved: true
    });

    const business3 = await Business.create({
      name: "Tech Haven Electronics",
      owner: businessOwner3._id,
      category: 'Electronics',
      address: '789 Michigan Ave',
      city: 'Chicago',
      phone: '(555) 345-6789',
      description: 'Your one-stop shop for all electronics and gadgets.',
      approved: false // Pending approval
    });

    // Create Products
    console.log('Creating products...');
    
    // Products for Mike's Pizza Palace
    await Product.create({
      name: 'Margherita Pizza',
      price: 12.99,
      category: 'Food & Beverages',
      description: 'Classic margherita pizza with fresh mozzarella, basil, and tomato sauce.',
      availability: true,
      business: business1._id
    });

    await Product.create({
      name: 'Pepperoni Pizza',
      price: 14.99,
      category: 'Food & Beverages',
      description: 'Loaded with premium pepperoni and extra cheese.',
      availability: true,
      business: business1._id
    });

    await Product.create({
      name: 'Caesar Salad',
      price: 8.99,
      category: 'Food & Beverages',
      description: 'Fresh romaine lettuce with Caesar dressing and croutons.',
      availability: true,
      business: business1._id
    });

    // Products for Sarah's Fashion Boutique
    await Product.create({
      name: 'Summer Dress',
      price: 49.99,
      category: 'Clothing',
      description: 'Flowy summer dress perfect for warm weather. Available in multiple colors.',
      availability: true,
      business: business2._id
    });

    await Product.create({
      name: 'Designer Jeans',
      price: 89.99,
      category: 'Clothing',
      description: 'Premium quality denim jeans with a modern fit.',
      availability: true,
      business: business2._id
    });

    await Product.create({
      name: 'Leather Handbag',
      price: 129.99,
      category: 'Clothing',
      description: 'Genuine leather handbag with multiple compartments.',
      availability: true,
      business: business2._id
    });

    // Products for Tech Haven Electronics
    await Product.create({
      name: 'Wireless Headphones',
      price: 79.99,
      category: 'Electronics',
      description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
      availability: true,
      business: business3._id
    });

    await Product.create({
      name: 'Smart Watch',
      price: 199.99,
      category: 'Electronics',
      description: 'Feature-packed smart watch with fitness tracking and notifications.',
      availability: true,
      business: business3._id
    });

    await Product.create({
      name: 'Bluetooth Speaker',
      price: 59.99,
      category: 'Electronics',
      description: 'Portable Bluetooth speaker with powerful sound and waterproof design.',
      availability: false, // Out of stock
      business: business3._id
    });

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Test Accounts Created:');
    console.log('\n👨‍💼 Admin Account:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    console.log('\n👤 Customer Accounts:');
    console.log('   Email: john@example.com | Password: customer123');
    console.log('   Email: jane@example.com | Password: customer123');
    console.log('\n🏪 Business Owner Accounts:');
    console.log('   Email: mike@example.com | Password: business123');
    console.log('   Email: sarah@example.com | Password: business123');
    console.log('   Email: david@example.com | Password: business123');
    console.log('\n💡 Note: David\'s business (Tech Haven Electronics) is pending approval.\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
