import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import {
  uploadManyToCloudinary,
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} from '../utils/cloudinaryUpload.js';

/**
 * Parse fields that come in as JSON strings in multipart/form-data.
 * Falls back to the raw value if it isn't valid JSON.
 */
const parseMaybeJSON = (val, fallback) => {
  if (val === undefined || val === null || val === '') return fallback;
  if (typeof val !== 'string') return val;
  try {
    return JSON.parse(val);
  } catch {
    return val;
  }
};

/**
 * Shape the request body into a projectable payload.
 * Multipart values arrive as strings, so we coerce carefully.
 */
const buildPayload = (body) => {
  const payload = {};
  const passthrough = [
    'title',
    'slug',
    'tagline',
    'description',
    'inspiration',
    'category',
    'kind',
    'externalLink',
    'currency',
  ];
  passthrough.forEach((k) => {
    if (body[k] !== undefined) payload[k] = body[k];
  });

  if (body.tags !== undefined) payload.tags = parseMaybeJSON(body.tags, []);
  if (body.industries !== undefined)
    payload.industries = parseMaybeJSON(body.industries, ['Featured']);
  if (body.testimonial !== undefined)
    payload.testimonial = parseMaybeJSON(body.testimonial, {});

  if (body.scriptAvailable !== undefined)
    payload.scriptAvailable = body.scriptAvailable === 'true' || body.scriptAvailable === true;
  if (body.featured !== undefined)
    payload.featured = body.featured === 'true' || body.featured === true;
  if (body.visible !== undefined)
    payload.visible = body.visible === 'true' || body.visible === true;

  if (body.price !== undefined && body.price !== '')
    payload.price = Number(body.price);
  if (body.order !== undefined && body.order !== '')
    payload.order = Number(body.order);

  return payload;
};

/**
 * GET /api/projects
 * Public list. Respects ?category, ?kind, ?visible (defaults to true).
 */
export const getProjects = asyncHandler(async (req, res) => {
  const { category, kind, featured } = req.query;
  const filter = { visible: true };
  if (category && category !== 'All') filter.industries = category;
  if (kind) filter.kind = kind;
  if (featured === 'true') filter.featured = true;

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: projects.length, data: projects });
});

/**
 * GET /api/projects/admin
 * Admin — returns everything regardless of visibility.
 */
export const getAllProjectsAdmin = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, count: projects.length, data: projects });
});

/**
 * GET /api/projects/:slug
 */
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project || (!project.visible && !req.user)) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json({ success: true, data: project });
});

/**
 * POST /api/projects
 * Admin create. Accepts multipart with `heroImage` (single) and `gallery` (many).
 */
export const createProject = asyncHandler(async (req, res) => {
  const payload = buildPayload(req.body);

  if (!payload.title || !payload.slug) {
    res.status(400);
    throw new Error('Title and slug are required');
  }

  // Uniqueness pre-check for a friendlier error than the Mongo 11000.
  const existing = await Project.findOne({ slug: payload.slug });
  if (existing) {
    res.status(400);
    throw new Error('A project with this slug already exists');
  }

  // Handle hero image
  if (req.files?.heroImage?.[0]) {
    const up = await uploadBufferToCloudinary(req.files.heroImage[0].buffer);
    payload.heroImage = { url: up.url, publicId: up.publicId, alt: payload.title };
  }

  // Handle gallery images
  if (req.files?.gallery?.length) {
    const ups = await uploadManyToCloudinary(req.files.gallery);
    payload.gallery = ups.map((u, i) => ({
      url: u.url,
      publicId: u.publicId,
      alt: `${payload.title} image ${i + 1}`,
    }));
  }

  const project = await Project.create(payload);
  res.status(201).json({ success: true, data: project });
});

/**
 * PUT /api/projects/:id
 * Admin update.
 *
 * Gallery contract (this is the bit that was broken before):
 *   - `galleryJson` = JSON array of EXISTING images the admin wants to keep
 *     (with their {url, publicId, alt}). The server diffs this against the
 *     stored gallery and deletes any old image that's no longer in the list.
 *   - `gallery`     = NEW files the admin just selected (multer parses these
 *     out of multipart). They get uploaded to Cloudinary and APPENDED.
 *   - `keepGallery=false` (legacy switch) wipes everything old.
 *
 * Final gallery = (surviving old) + (newly uploaded).
 * Neither block overwrites the other anymore.
 */
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const payload = buildPayload(req.body);

  // Slug uniqueness if changed
  if (payload.slug && payload.slug !== project.slug) {
    const clash = await Project.findOne({ slug: payload.slug });
    if (clash) {
      res.status(400);
      throw new Error('A project with this slug already exists');
    }
  }

  // ----- Hero image -----
  if (req.files?.heroImage?.[0]) {
    if (project.heroImage?.publicId) {
      await deleteFromCloudinary(project.heroImage.publicId);
    }
    const up = await uploadBufferToCloudinary(req.files.heroImage[0].buffer);
    payload.heroImage = {
      url: up.url,
      publicId: up.publicId,
      alt: payload.title || project.title,
    };
  }

  // ----- Gallery: keep old + append new (the fix) -----
  const galleryJsonProvided = req.body.galleryJson !== undefined;
  const newFilesProvided = Boolean(req.files?.gallery?.length);
  const wipeOld = req.body.keepGallery === 'false';

  if (galleryJsonProvided || newFilesProvided || wipeOld) {
    let survivingOld = project.gallery || [];

    // Step 1: figure out which existing images survived the admin's edits
    if (galleryJsonProvided) {
      const parsed = parseMaybeJSON(req.body.galleryJson, null);
      if (Array.isArray(parsed)) {
        // Anything in the stored gallery that isn't in `parsed` was removed in the form.
        const incomingIds = new Set(
          parsed.map((g) => g.publicId).filter(Boolean)
        );
        const removed = (project.gallery || []).filter(
          (g) => g.publicId && !incomingIds.has(g.publicId)
        );
        await Promise.all(
          removed.map((img) => deleteFromCloudinary(img.publicId))
        );
        survivingOld = parsed;
      }
    }

    // Step 2: legacy "wipe everything" switch
    if (wipeOld) {
      await Promise.all(
        survivingOld.map((img) => deleteFromCloudinary(img.publicId))
      );
      survivingOld = [];
    }

    // Step 3: upload any newly attached files and append
    let newlyUploaded = [];
    if (newFilesProvided) {
      const ups = await uploadManyToCloudinary(req.files.gallery);
      newlyUploaded = ups.map((u, i) => ({
        url: u.url,
        publicId: u.publicId,
        alt: `${payload.title || project.title} image ${
          survivingOld.length + i + 1
        }`,
      }));
    }

    // Step 4: merge — old first (in their saved order), new appended
    payload.gallery = [...survivingOld, ...newlyUploaded];
  }
  // If none of the gallery fields were sent at all, leave project.gallery alone.

  Object.assign(project, payload);
  const updated = await project.save();
  res.json({ success: true, data: updated });
});

/**
 * PATCH /api/projects/:id/visibility
 */
export const toggleVisibility = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  project.visible = !project.visible;
  await project.save();
  res.json({ success: true, data: project });
});

/**
 * DELETE /api/projects/:id
 */
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Fire-and-forget cleanup of images
  if (project.heroImage?.publicId) {
    await deleteFromCloudinary(project.heroImage.publicId);
  }
  await Promise.all(
    (project.gallery || []).map((img) => deleteFromCloudinary(img.publicId))
  );

  await project.deleteOne();
  res.json({ success: true, message: 'Project deleted' });
});