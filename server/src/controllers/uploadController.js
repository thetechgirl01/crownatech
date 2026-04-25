import asyncHandler from 'express-async-handler';
import {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} from '../utils/cloudinaryUpload.js';

/**
 * POST /api/uploads  — admin-only, returns { url, publicId }.
 * Convenience endpoint for the admin to grab a URL before attaching
 * it to something (rarely needed; create/update already accept files).
 */
export const uploadSingle = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image uploaded');
  }
  const up = await uploadBufferToCloudinary(req.file.buffer);
  res.json({ success: true, url: up.url, publicId: up.publicId });
});

/**
 * DELETE /api/uploads/:publicId — removes an orphaned image.
 * Note: Cloudinary publicIds can contain slashes, so the admin should
 * pass an encoded publicId. We decode here.
 */
export const removeUpload = asyncHandler(async (req, res) => {
  const publicId = decodeURIComponent(req.params.publicId);
  await deleteFromCloudinary(publicId);
  res.json({ success: true, message: 'Deleted' });
});
