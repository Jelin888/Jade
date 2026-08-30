import express from 'express';
import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse, getEnrolledCourses } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, adminOnly, createCourse);

router.get('/enrolled', protect, getEnrolledCourses);

router.route('/:id')
  .get(getCourseById)
  .put(protect, adminOnly, updateCourse)
  .delete(protect, adminOnly, deleteCourse);

export default router;
