import express from 'express';
import {
  getProjects,
  getAllProjectsAdmin,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  toggleVisibility,
} from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Multer config for create/update: accept one hero image + up to 12 gallery images.
const projectUpload = upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'gallery', maxCount: 12 },
]);

// Public
router.get('/', getProjects);

// Admin — list must come BEFORE :slug so "admin" isn't treated as a slug.
router.get('/admin', protect, adminOnly, getAllProjectsAdmin);

router.get('/:slug', getProjectBySlug);

// Admin — mutations
router.post('/', protect, adminOnly, projectUpload, createProject);
router.put('/:id', protect, adminOnly, projectUpload, updateProject);
router.patch('/:id/visibility', protect, adminOnly, toggleVisibility);
router.delete('/:id', protect, adminOnly, deleteProject);

export default router;
