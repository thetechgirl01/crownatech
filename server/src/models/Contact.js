import mongoose from 'mongoose';
import validator from 'validator';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    budget: { type: String, default: '', trim: true, maxlength: 80 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },

    // Admin workflow
    read: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },

    // Light abuse mitigation
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
