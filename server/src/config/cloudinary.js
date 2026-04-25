import { v2 as cloudinary } from 'cloudinary';

/**
 * Cloudinary is configured lazily from env vars.
 * If credentials are missing we still export the client so the app boots;
 * controllers guard against missing config and return a helpful error.
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const isCloudinaryConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

export const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'joyceofweb';

export default cloudinary;
