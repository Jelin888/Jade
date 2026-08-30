import Razorpay from 'razorpay';
import { config } from '../config/env.js';

const razorpay = new Razorpay({
  key_id: config.razorpay.keyId || 'dummy_key',
  key_secret: config.razorpay.keySecret || 'dummy_secret',
});

export const createRazorpayOrder = async (amount, currency = 'INR') => {
  const options = {
    amount: amount * 100, // in paise
    currency,
    receipt: `receipt_${Date.now()}`,
  };
  return await razorpay.orders.create(options);
};
