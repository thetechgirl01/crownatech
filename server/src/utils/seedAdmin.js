/**
 * Seeds (or updates) the admin user using env vars.
 *
 *   npm run seed
 *
 * Reads SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD / SEED_ADMIN_NAME.
 * Safe to re-run: updates the password if the admin already exists.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';

const run = async () => {
  const email = (process.env.SEED_ADMIN_EMAIL || '').toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD || '';
  const name = process.env.SEED_ADMIN_NAME || 'Admin';

  if (!email || !password) {
    console.error('❌  SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  await connectDB();

  let user = await User.findOne({ email });
  if (user) {
    user.name = name;
    user.password = password; // pre-save hook hashes it
    await user.save();
    console.log(`🔁  Updated existing admin: ${email}`);
  } else {
    user = await User.create({ name, email, password, role: 'admin' });
    console.log(`✅  Created admin: ${email}`);
  }

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
