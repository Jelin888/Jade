import express from 'express';
import { getAdminStats, getStudents, getUsers, getAllOrders, getAllPayments } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/stats', getAdminStats);
router.get('/students', getStudents);
router.get('/users', getUsers);
router.get('/orders', getAllOrders);
router.get('/payments', getAllPayments);

export default router;
