import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});
export default mongoose.model('Product', productSchema);