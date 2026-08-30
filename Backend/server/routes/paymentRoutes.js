import express from 'express';
import { verifyPayment, getPaymentHistory } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/verify', protect, verifyPayment);
router.get('/history', protect, getPaymentHistory);

export default router;
