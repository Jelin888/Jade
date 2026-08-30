import Payment from '../models/Payment.js';
import Order from '../models/Order.js';

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, orderId } = req.body;

    const payment = await Payment.create({
      user: req.user.id,
      order: orderId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      amount: req.body.amount || 0,
      status: 'success',
    });

    await Order.findByIdAndUpdate(orderId, { status: 'paid', razorpayPaymentId });

    res.json({ success: true, payment });
  } catch (error) {
    next(error);
  }
};

export const getPaymentHistory = async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ payments });
  } catch (error) {
    next(error);
  }
};
