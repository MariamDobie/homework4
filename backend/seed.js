const mongoose = require('mongoose');
require('dotenv').config();
const MenuItem = require('./models/MenuItem');

const menuItems = [
  { name: 'Koshari', price: 20, description: 'A famous Egyptian dish made with rice, lentils, macaroni, chickpeas, fried onions, and spicy tomato sauce.', category: 'Main' },
  { name: 'Molokhia with Chicken', price: 25, description: 'Traditional molokhia soup served with rice and roasted chicken, full of classic Egyptian flavor.', category: 'Main' },
  { name: 'Mahshi Platter', price: 75, description: 'Stuffed grape leaves, peppers, and zucchini with seasoned rice and herbs.', category: 'Main' },
  { name: 'Grilled Kofta', price: 30, description: 'Juicy grilled kofta served with Egyptian bread, tahini, salad, and fries.', category: 'Main' },
  { name: 'Feteer Meshaltet', price: 35, description: 'Layered Egyptian pastry served with cheese, honey, or meat fillings.', category: 'Appetizer' },
  { name: 'Basbousa', price: 80, description: 'Sweet semolina cake soaked in syrup, a beloved Egyptian dessert.', category: 'Dessert' }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');
    
    // Insert new data
    await MenuItem.insertMany(menuItems);
    console.log('✅ Menu items added successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();