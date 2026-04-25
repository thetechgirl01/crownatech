import express from 'express';
import { uploadSingle, removeUpload } from '../controllers/uploadController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', protect, adminOnly, upload.single('image'), uploadSingle);
router.delete('/:publicId', protect, adminOnly, removeUpload);

export default router;
