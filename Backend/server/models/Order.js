import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemType: { type: String, enum: ['note', 'course'], required: true },
    item: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'itemTypeModel' },
    itemTypeModel: { type: String, required: true, enum: ['Note', 'Course'] },
    itemName: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    razorpayOrderId: String,
    razorpayPaymentId: String,
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
