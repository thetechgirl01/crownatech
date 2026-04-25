import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlinePhotograph, HiOutlineTrash } from 'react-icons/hi';
import { blogsApi } from '../../api/blogs';
import Spinner from '../../components/common/Spinner';
import SEO from '../../components/common/SEO';
import RichTextEditor from '../../components/admin/RichTextEditor';

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    tags: '',
    author: 'CrownaTech',
    published: true,
  });

  const [existingCover, setExistingCover] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    let alive = true;
    (async () => {
      try {
        const res = await blogsApi.listAdmin();
        const post = (res.data || []).find((p) => p._id === id);
        if (!alive) return;
        if (!post) {
          setError('Post not found');
          setLoading(false);
          return;
        }
        setForm({
          title: post.title || '',
          slug: post.slug || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          category: post.category || 'Technology',
          tags: (post.tags || []).join(', '),
          author: post.author || 'CrownaTech',
          published: !!post.published,
        });
        setExistingCover(post.coverImage || null);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load post');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id, isEdit]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const onTitleBlur = () => {
    if (!form.slug && form.title) setForm((p) => ({ ...p, slug: slugify(form.title) }));
  };

  const coverPreview = useMemo(() => {
    if (coverFile) return URL.createObjectURL(coverFile);
    return existingCover?.url || null;
  }, [coverFile, existingCover]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and slug are required.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: slugify(form.slug),
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        author: form.author,
        published: form.published,
      };
      if (coverFile) payload.coverImage = coverFile;

      if (isEdit) await blogsApi.update(id, payload);
      else await blogsApi.create(payload);

      navigate('/admin/blogs');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl">
      <SEO title={isEdit ? 'Edit Post' : 'New Post'} />

      <Link
        to="/admin/blogs"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4"
      >
        <HiOutlineArrowLeft className="w-4 h-4" /> Back to posts
      </Link>

      <h1 className="text-white text-3xl font-bold mb-2">
        {isEdit ? 'Edit post' : 'New post'}
      </h1>
      <p className="text-white/60 mb-8">
        Use the editor to write rich content. Inline images upload to Cloudinary automatically.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm rounded-lg p-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-semibold">Basics</h2>
          <Field
            label="Title *"
            name="title"
            value={form.title}
            onChange={onChange}
            onBlur={onTitleBlur}
            required
          />
          <Field label="Slug *" name="slug" value={form.slug} onChange={onChange} required />
          <Textarea
            label="Excerpt (short summary, used on cards & SEO)"
            name="excerpt"
            value={form.excerpt}
            onChange={onChange}
            rows={3}
            maxLength={400}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Category" name="category" value={form.category} onChange={onChange} />
            <Field
              label="Tags (comma-separated)"
              name="tags"
              value={form.tags}
              onChange={onChange}
              placeholder="react, design, performance"
            />
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Cover image</h2>
          <div className="flex items-start gap-4 flex-wrap">
            {coverPreview ? (
              <img src={coverPreview} alt="Cover preview" className="w-64 h-40 object-cover rounded-xl" />
            ) : (
              <div className="w-64 h-40 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-white/40">
                <HiOutlinePhotograph className="w-8 h-8" />
              </div>
            )}
            <label className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm cursor-pointer transition">
              {coverFile || existingCover ? 'Replace' : 'Upload'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              />
            </label>
            {(coverFile || existingCover) && (
              <button
                type="button"
                onClick={() => {
                  setCoverFile(null);
                  setExistingCover(null);
                }}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-300 text-sm transition inline-flex items-center gap-2"
              >
                <HiOutlineTrash className="w-4 h-4" /> Remove
              </button>
            )}
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Content</h2>
          <RichTextEditor
            value={form.content}
            onChange={(html) => setForm((p) => ({ ...p, content: html }))}
            placeholder="Start writing…"
          />
        </section>

        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Publishing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Author" name="author" value={form.author} onChange={onChange} />
            <Checkbox
              label="Published (uncheck to save as draft)"
              name="published"
              checked={form.published}
              onChange={onChange}
            />
          </div>
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition disabled:opacity-60"
          >
            {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create post'}
          </button>
          <Link
            to="/admin/blogs"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

const baseInput =
  'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-400/60 transition';

const Field = ({ label, ...rest }) => (
  <div>
    <label className="block text-white/70 text-sm mb-2">{label}</label>
    <input className={baseInput} {...rest} />
  </div>
);

const Textarea = ({ label, ...rest }) => (
  <div>
    <label className="block text-white/70 text-sm mb-2">{label}</label>
    <textarea className={`${baseInput} resize-none`} {...rest} />
  </div>
);

const Checkbox = ({ label, ...rest }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <input type="checkbox" {...rest} className="w-5 h-5 accent-yellow-400" />
    <span className="text-white/80 text-sm">{label}</span>
  </label>
);

export default BlogForm;
