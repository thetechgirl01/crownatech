import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';

/**
 * POST /api/contacts — public submission.
 */
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, budget, message } = req.body;
  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Name, email, and message are required');
  }

  const entry = await Contact.create({
    name,
    email,
    budget: budget || '',
    message,
    ipAddress: req.ip,
    userAgent: req.get('user-agent') || '',
  });

  res.status(201).json({
    success: true,
    message: "Message received. We'll contact you shortly.",
    data: { id: entry._id },
  });
});

/**
 * GET /api/contacts — admin list.
 */
export const getContacts = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.read === 'true') filter.read = true;
  if (req.query.read === 'false') filter.read = false;
  if (req.query.archived === 'true') filter.archived = true;
  if (req.query.archived !== 'true') filter.archived = { $ne: true };

  const contacts = await Contact.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: contacts.length, data: contacts });
});

/**
 * PATCH /api/contacts/:id
 */
export const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  if (req.body.read !== undefined) contact.read = Boolean(req.body.read);
  if (req.body.archived !== undefined) contact.archived = Boolean(req.body.archived);
  await contact.save();
  res.json({ success: true, data: contact });
});

/**
 * DELETE /api/contacts/:id
 */
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  await contact.deleteOne();
  res.json({ success: true, message: 'Contact deleted' });
});
