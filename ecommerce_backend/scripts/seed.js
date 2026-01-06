require('dotenv').config();
const { connectDB, closeDB } = require('../src/db/connection');
const { User, Category, Product } = require('../src/models');

/**
 * Seed the database with initial data
 */
async function seed() {
  try {
    console.log('Starting database seed...');
    
    // Connect to database
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Existing data cleared');

    // Create admin user
    console.log('Creating admin user...');
    const adminUser = await User.create({
      email: 'admin@crackers.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      phone: '+1234567890',
      isActive: true,
    });
    console.log('Admin user created:', adminUser.email);

    // Create categories
    console.log('Creating categories...');
    const categories = await Category.insertMany([
      {
        name: 'Sparklers',
        slug: 'sparklers',
        description: 'Beautiful sparklers for celebrations and festivities',
        isActive: true,
        displayOrder: 1,
      },
      {
        name: 'Fountains',
        slug: 'fountains',
        description: 'Ground fountains with spectacular displays',
        isActive: true,
        displayOrder: 2,
      },
      {
        name: 'Aerial Fireworks',
        slug: 'aerial-fireworks',
        description: 'Sky-high aerial fireworks for grand celebrations',
        isActive: true,
        displayOrder: 3,
      },
    ]);
    console.log('Categories created:', categories.length);

    // Create products
    console.log('Creating products...');
    const products = await Product.insertMany([
      {
        name: 'Golden Sparkler 10"',
        slug: 'golden-sparkler-10',
        description: 'Premium 10-inch golden sparklers, perfect for birthday celebrations and weddings. Burns for approximately 45 seconds with brilliant gold sparks.',
        category: categories[0]._id,
        price: 12.99,
        originalPrice: 15.99,
        images: ['/assets/sparkler-gold.jpg'],
        stock: 150,
        sku: 'SPK-GOLD-10',
        weight: { value: 50, unit: 'g' },
        isActive: true,
        isFeatured: true,
        tags: ['sparklers', 'gold', 'celebration'],
      },
      {
        name: 'Silver Sparkler 12"',
        slug: 'silver-sparkler-12',
        description: 'Elegant 12-inch silver sparklers with extended burn time. Creates stunning silver sparks for up to 60 seconds.',
        category: categories[0]._id,
        price: 14.99,
        originalPrice: 17.99,
        images: ['/assets/sparkler-silver.jpg'],
        stock: 120,
        sku: 'SPK-SILV-12',
        weight: { value: 60, unit: 'g' },
        isActive: true,
        isFeatured: false,
        tags: ['sparklers', 'silver', 'wedding'],
      },
      {
        name: 'Rainbow Sparkler Pack',
        slug: 'rainbow-sparkler-pack',
        description: 'Assorted pack of colorful sparklers including red, green, blue, and gold. Pack of 20 sparklers.',
        category: categories[0]._id,
        price: 24.99,
        images: ['/assets/sparkler-rainbow.jpg'],
        stock: 80,
        sku: 'SPK-RAIN-20',
        weight: { value: 100, unit: 'g' },
        isActive: true,
        isFeatured: true,
        tags: ['sparklers', 'rainbow', 'pack', 'colorful'],
      },
      {
        name: 'Volcano Fountain',
        slug: 'volcano-fountain',
        description: 'Ground fountain that shoots sparks up to 6 feet high with red and gold effects. Duration: 90 seconds.',
        category: categories[1]._id,
        price: 29.99,
        originalPrice: 34.99,
        images: ['/assets/fountain-volcano.jpg'],
        stock: 60,
        sku: 'FTN-VOLC-01',
        weight: { value: 250, unit: 'g' },
        isActive: true,
        isFeatured: true,
        tags: ['fountain', 'ground', 'sparks'],
      },
      {
        name: 'Dragon Fountain Deluxe',
        slug: 'dragon-fountain-deluxe',
        description: 'Multi-colored fountain with crackling effects and whistles. Creates a spectacular 8-foot display for 2 minutes.',
        category: categories[1]._id,
        price: 39.99,
        images: ['/assets/fountain-dragon.jpg'],
        stock: 45,
        sku: 'FTN-DRAG-01',
        weight: { value: 350, unit: 'g' },
        isActive: true,
        isFeatured: false,
        tags: ['fountain', 'deluxe', 'multi-color'],
      },
      {
        name: 'Flower Garden Fountain',
        slug: 'flower-garden-fountain',
        description: 'Beautiful flower-shaped fountain with color-changing effects. Safe for family gatherings.',
        category: categories[1]._id,
        price: 19.99,
        images: ['/assets/fountain-flower.jpg'],
        stock: 90,
        sku: 'FTN-FLOW-01',
        weight: { value: 180, unit: 'g' },
        isActive: true,
        isFeatured: false,
        tags: ['fountain', 'flower', 'family-friendly'],
      },
      {
        name: 'Thunder Blast Aerial',
        slug: 'thunder-blast-aerial',
        description: 'Premium aerial firework with 16 shots of colorful bursts reaching 100 feet. Includes red, blue, and silver effects.',
        category: categories[2]._id,
        price: 79.99,
        originalPrice: 89.99,
        images: ['/assets/aerial-thunder.jpg'],
        stock: 30,
        sku: 'AER-THUN-16',
        weight: { value: 800, unit: 'g' },
        isActive: true,
        isFeatured: true,
        tags: ['aerial', 'premium', 'colorful'],
      },
      {
        name: 'Starlight Symphony Pack',
        slug: 'starlight-symphony-pack',
        description: 'Complete aerial fireworks collection with 50 assorted shots. Perfect for grand celebrations and events.',
        category: categories[2]._id,
        price: 149.99,
        images: ['/assets/aerial-symphony.jpg'],
        stock: 20,
        sku: 'AER-STAR-50',
        weight: { value: 2000, unit: 'g' },
        isActive: true,
        isFeatured: true,
        tags: ['aerial', 'pack', 'celebration', 'premium'],
      },
    ]);
    console.log('Products created:', products.length);

    console.log('\n=== Seed Summary ===');
    console.log('Admin users: 1');
    console.log(`Categories: ${categories.length}`);
    console.log(`Products: ${products.length}`);
    console.log('\nAdmin credentials:');
    console.log('Email: admin@crackers.com');
    console.log('Password: admin123');
    console.log('===================\n');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await closeDB();
  }
}

// Run seed if called directly
if (require.main === module) {
  seed().then(() => {
    process.exit(0);
  });
}

module.exports = seed;
