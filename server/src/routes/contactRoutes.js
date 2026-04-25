import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  submitContact,
  getContacts,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Prevent form spam — 5 submissions per 15 minutes per IP.
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions from this IP. Please try again later.',
  },
});

// Public
router.post('/', submitLimiter, submitContact);

// Admin
router.get('/', protect, adminOnly, getContacts);
router.patch('/:id', protect, adminOnly, updateContact);
router.delete('/:id', protect, adminOnly, deleteContact);

export default router;
