import multer from 'multer';

/**
 * We keep files in memory (small images) and stream them directly
 * to Cloudinary in the controller — no disk I/O needed.
 */
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per image
    files: 15,
  },
});

export default upload;
