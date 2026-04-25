import mongoose from 'mongoose';

/**
 * Project / Work schema.
 *
 * One schema covers both client work (with Visit Site) and for-sale
 * items in the Store (with Buy Script). The `kind` field drives which
 * CTA is shown on the detail page.
 *
 * Categories correspond to the filter tabs on the Works page:
 *   Featured, Web Design & Development, Logo Design, Stock
 * Any item with kind === 'stock' (or category 'Stock') is eligible
 * for the Store page.
 */

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String }, // cloudinary public_id for later deletion
    alt: { type: String, default: '' },
  },
  { _id: false }
);

const testimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, default: '' },
    author: { type: String, default: '' },
    role: { type: String, default: '' },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 180,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug can only contain lowercase letters, numbers, and hyphens',
      ],
    },
    tagline: { type: String, default: '', maxlength: 240 },
    description: { type: String, default: '' },       // overview
    inspiration: { type: String, default: '' },       // design story / process

    category: {
      type: String,
      enum: ['Web Design & Development', 'Logo Design', 'Stock', 'Development'],
      default: 'Web Design & Development',
    },
    kind: {
      type: String,
      enum: ['client', 'stock'],
      default: 'client',
    },

    tags: { type: [String], default: [] },
    industries: { type: [String], default: ['Featured'] },

    heroImage: imageSchema,
    gallery: { type: [imageSchema], default: [] },

    externalLink: { type: String, default: '' }, // live site OR payment link

    scriptAvailable: { type: Boolean, default: false },
    price: { type: Number, default: null },       // only for stock items
    currency: { type: String, default: 'USD' },

    testimonial: { type: testimonialSchema, default: () => ({}) },

    featured: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes for common queries
projectSchema.index({ visible: 1, category: 1 });
projectSchema.index({ kind: 1, visible: 1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;
