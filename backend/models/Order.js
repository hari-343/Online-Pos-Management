import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, default: 'Placed' },
  orderDate: { type: Date, default: Date.now }
});
export default mongoose.model('Order', orderSchema);