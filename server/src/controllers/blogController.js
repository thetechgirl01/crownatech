import asyncHandler from 'express-async-handler';
import BlogPost from '../models/BlogPost.js';
import {
  uploadBufferToCloudinary,
  uploadManyToCloudinary,
  deleteFromCloudinary,
} from '../utils/cloudinaryUpload.js';

const toBool = (v) => v === 'true' || v === true;

/**
 * Rough word-count based read time. Strips basic HTML tags.
 */
const calcReadTime = (html) => {
  if (!html) return 1;
  const text = String(html).replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

/**
 * GET /api/blogs  — public, only published posts.
 * Supports ?category & ?search.
 */
export const getBlogPosts = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const filter = { published: true };
  if (category && category !== 'All') filter.category = category;
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [{ title: re }, { excerpt: re }, { content: re }];
  }
  const posts = await BlogPost.find(filter).sort({ publishedAt: -1 });
  res.json({ success: true, count: posts.length, data: posts });
});

/**
 * GET /api/blogs/admin — all posts (published + drafts).
 */
export const getBlogPostsAdmin = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find({}).sort({ createdAt: -1 });
  res.json({ success: true, count: posts.length, data: posts });
});

/**
 * GET /api/blogs/:slug
 */
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug });
  if (!post || (!post.published && !req.user)) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json({ success: true, data: post });
});

/**
 * POST /api/blogs — admin create.
 */
export const createBlogPost = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    excerpt,
    content,
    category,
    tags,
    author,
    published,
  } = req.body;

  if (!title || !slug) {
    res.status(400);
    throw new Error('Title and slug are required');
  }

  const clash = await BlogPost.findOne({ slug });
  if (clash) {
    res.status(400);
    throw new Error('A post with this slug already exists');
  }

  const payload = {
    title,
    slug,
    excerpt: excerpt || '',
    content: content || '',
    category: category || 'General',
    tags: Array.isArray(tags) ? tags : tags ? JSON.parse(tags) : [],
    author: author || 'CrownaTech',
    published: published === undefined ? true : toBool(published),
    readTime: calcReadTime(content),
  };

  if (req.files?.coverImage?.[0]) {
    const up = await uploadBufferToCloudinary(req.files.coverImage[0].buffer, {
      folder: 'joyceofweb/blog',
    });
    payload.coverImage = { url: up.url, publicId: up.publicId, alt: title };
  }
  if (req.files?.images?.length) {
    const ups = await uploadManyToCloudinary(req.files.images, { folder: 'joyceofweb/blog' });
    payload.images = ups.map((u, i) => ({
      url: u.url,
      publicId: u.publicId,
      alt: `${title} image ${i + 1}`,
    }));
  }

  const post = await BlogPost.create(payload);
  res.status(201).json({ success: true, data: post });
});

/**
 * PUT /api/blogs/:id
 */
export const updateBlogPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const updatable = ['title', 'slug', 'excerpt', 'content', 'category', 'author'];
  updatable.forEach((k) => {
    if (req.body[k] !== undefined) post[k] = req.body[k];
  });

  if (req.body.tags !== undefined) {
    post.tags = Array.isArray(req.body.tags) ? req.body.tags : JSON.parse(req.body.tags || '[]');
  }
  if (req.body.published !== undefined) post.published = toBool(req.body.published);

  if (req.body.slug && req.body.slug !== post.slug) {
    const clash = await BlogPost.findOne({ slug: req.body.slug, _id: { $ne: post._id } });
    if (clash) {
      res.status(400);
      throw new Error('A post with this slug already exists');
    }
  }

  if (req.files?.coverImage?.[0]) {
    if (post.coverImage?.publicId) await deleteFromCloudinary(post.coverImage.publicId);
    const up = await uploadBufferToCloudinary(req.files.coverImage[0].buffer, {
      folder: 'joyceofweb/blog',
    });
    post.coverImage = { url: up.url, publicId: up.publicId, alt: post.title };
  }
  if (req.files?.images?.length) {
    const ups = await uploadManyToCloudinary(req.files.images, { folder: 'joyceofweb/blog' });
    const newImages = ups.map((u, i) => ({
      url: u.url,
      publicId: u.publicId,
      alt: `${post.title} image ${i + 1}`,
    }));
    post.images = [...(post.images || []), ...newImages];
  }

  if (req.body.content !== undefined) post.readTime = calcReadTime(req.body.content);

  const saved = await post.save();
  res.json({ success: true, data: saved });
});

/**
 * DELETE /api/blogs/:id
 */
export const deleteBlogPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  if (post.coverImage?.publicId) await deleteFromCloudinary(post.coverImage.publicId);
  await Promise.all((post.images || []).map((i) => deleteFromCloudinary(i.publicId)));
  await post.deleteOne();
  res.json({ success: true, message: 'Post deleted' });
});

/**
 * POST /api/blogs/upload-inline
 * Used by the rich-text editor to insert images mid-content.
 * Returns { url }.
 */
export const uploadInlineImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image uploaded');
  }
  const up = await uploadBufferToCloudinary(req.file.buffer, { folder: 'joyceofweb/blog/inline' });
  res.json({ success: true, url: up.url, publicId: up.publicId });
});
