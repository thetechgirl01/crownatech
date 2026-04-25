import express from 'express';
import {
  getBlogPosts,
  getBlogPostsAdmin,
  getBlogBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  uploadInlineImage,
} from '../controllers/blogController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

const blogUpload = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);

// Public
router.get('/', getBlogPosts);

// Admin — list
router.get('/admin', protect, adminOnly, getBlogPostsAdmin);

// Rich-text editor image upload (admin-only)
router.post('/upload-inline', protect, adminOnly, upload.single('image'), uploadInlineImage);

router.get('/:slug', getBlogBySlug);

// Admin — mutations
router.post('/', protect, adminOnly, blogUpload, createBlogPost);
router.put('/:id', protect, adminOnly, blogUpload, updateBlogPost);
router.delete('/:id', protect, adminOnly, deleteBlogPost);

export default router;
