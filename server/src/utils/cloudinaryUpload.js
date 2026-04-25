import streamifier from 'streamifier';
import cloudinary, {
  CLOUDINARY_FOLDER,
  isCloudinaryConfigured,
} from '../config/cloudinary.js';

/**
 * Upload a single in-memory buffer to Cloudinary.
 * Returns { url, publicId }.
 */
export const uploadBufferToCloudinary = (buffer, { folder } = {}) =>
  new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(
        new Error(
          'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.'
        )
      );
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder || CLOUDINARY_FOLDER,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (err, result) => {
        if (err) return reject(err);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });

/**
 * Upload multiple buffers in parallel. Preserves input order.
 */
export const uploadManyToCloudinary = async (files, opts) => {
  if (!files || files.length === 0) return [];
  return Promise.all(files.map((f) => uploadBufferToCloudinary(f.buffer, opts)));
};

/**
 * Best-effort delete by public_id. Never throws — swallowing errors
 * because failing to clean up an image shouldn't break a delete request.
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId || !isCloudinaryConfigured()) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.warn('Cloudinary delete failed for', publicId, err.message);
  }
};
