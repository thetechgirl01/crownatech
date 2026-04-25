import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String },
    alt: { type: String, default: '' },
  },
  { _id: false }
);

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug can only contain lowercase letters, numbers, and hyphens',
      ],
    },
    excerpt: { type: String, default: '', maxlength: 400 },

    // Rich HTML produced by the admin editor. Sanitized on the client at render.
    content: { type: String, default: '' },

    // Optional extra images referenced inside `content`.
    coverImage: imageSchema,
    images: { type: [imageSchema], default: [] },

    category: {
      type: String,
      default: 'General',
      trim: true,
    },

    tags: { type: [String], default: [] },

    author: { type: String, default: 'CrownaTech' },

    readTime: { type: Number, default: 5 }, // minutes

    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

blogPostSchema.index({ published: 1, publishedAt: -1 });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
