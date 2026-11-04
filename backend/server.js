import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import Category from './models/Category.js';
import Product from './models/Product.js';
import Customer from './models/Customer.js';
import Order from './models/Order.js';
import OrderItem from './models/OrderItem.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/restopi-ordering';
mongoose.connect(MONGO_URI)
  .then(() => console.log('RestoPi Database Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({ status: 'active' }).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/category/:id', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id, status: 'active' }).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
});

app.post('/api/orders', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { customer, items } = req.body;

    if (!customer || !customer.name || !customer.email || !customer.mobile || !customer.address || !customer.city || !customer.pincode) {
      return res.status(400).json({ error: 'All customer fields are required.' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    let calculatedTotal = 0;
    const verifiedOrderItemsData = [];

    for (let item of items) {
      const productDoc = await Product.findById(item.productId).session(session);
      if (!productDoc || productDoc.status !== 'active') {
        throw new Error(`Item unavailable: ${item.productId}`);
      }

      const subtotal = productDoc.price * item.quantity;
      calculatedTotal += subtotal;

      verifiedOrderItemsData.push({
        product: productDoc._id,
        quantity: item.quantity,
        unitPrice: productDoc.price,
        subtotal
      });
    }

    const newCustomer = new Customer(customer);
    const savedCustomer = await newCustomer.save({ session });

    const orderNumber = 'RPI-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 100);

    const newOrder = new Order({
      orderNumber,
      customer: savedCustomer._id,
      totalAmount: calculatedTotal,
      orderStatus: 'Placed'
    });
    const savedOrder = await newOrder.save({ session });

    for (let oItem of verifiedOrderItemsData) {
      await new OrderItem({ ...oItem, order: savedOrder._id }).save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'Order recorded successfully via RestoPi Engine',
      orderNumber: savedOrder.orderNumber,
      totalAmount: savedOrder.totalAmount
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: err.message || 'Failed to place order' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`RestoPi Backend running on port ${PORT}`));