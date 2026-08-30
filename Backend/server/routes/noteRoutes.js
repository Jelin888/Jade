import express from 'express';
import { getNotes, getNoteById, createNote, updateNote, deleteNote, getPurchasedNotes } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getNotes)
  .post(protect, adminOnly, createNote);

router.get('/purchased', protect, getPurchasedNotes);

router.route('/:id')
  .get(getNoteById)
  .put(protect, adminOnly, updateNote)
  .delete(protect, adminOnly, deleteNote);

export default router;
