import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restopi-ordering';

async function seedDB() {
  await mongoose.connect(MONGO_URI);
  await Category.deleteMany({});
  await Product.deleteMany({});

  const c1 = await Category.create({ name: 'Fast Food' });
  const c2 = await Category.create({ name: 'Beverages' });

  await Product.insertMany([
    {
      name: 'Signature Cheese Burger',
      description: 'Juicy patty with double cheddar and secret RestoPi sauce.',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      status: 'active',
      category: c1._id
    },
    {
      name: 'Loaded Truffle Fries',
      description: 'Crispy golden fries tossed in truffle oil and parmesan.',
      price: 5.49,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
      status: 'active',
      category: c1._id
    },
    {
      name: 'Cold Brew Iced Coffee',
      description: 'Smooth slow-steeped premium arabica cold brew.',
      price: 4.25,
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400',
      status: 'active',
      category: c2._id
    }
  ]);

  console.log('RestoPi Sample Menu Seeded Successfully!');
  process.exit(0);
}

seedDB();