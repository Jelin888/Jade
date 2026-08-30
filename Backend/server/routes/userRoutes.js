import express from 'express';
import { updateProfile, getStudentStats, getStudentLibrary } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.get('/stats', protect, getStudentStats);
router.get('/library', protect, getStudentLibrary);

export default router;
