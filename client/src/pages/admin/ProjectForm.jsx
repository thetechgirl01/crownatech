import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  HiOutlineArrowLeft,
  HiOutlineTrash,
  HiOutlinePhotograph,
} from 'react-icons/hi';
import { projectsApi } from '../../api/projects';
import Spinner from '../../components/common/Spinner';
import SEO from '../../components/common/SEO';

const CATEGORY_OPTIONS = ['Web Design & Development', 'Logo Design', 'Stock', 'Development'];
const INDUSTRY_OPTIONS = ['Featured', 'Web Design & Development', 'Logo Design', 'Stock'];

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    tagline: '',
    description: '',
    inspiration: '',
    category: 'Web Design & Development',
    kind: 'client',
    tags: '',
    industries: ['Featured'],
    externalLink: '',
    scriptAvailable: false,
    price: '',
    currency: 'USD',
    featured: false,
    visible: true,
    order: 0,
    testimonialQuote: '',
    testimonialAuthor: '',
    testimonialRole: '',
  });

  // Existing images (when editing)
  const [existingHero, setExistingHero] = useState(null);
  const [existingGallery, setExistingGallery] = useState([]);

  // New uploads (queued for this submit)
  const [heroFile, setHeroFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  useEffect(() => {
    if (!isEdit) return;
    let alive = true;
    (async () => {
      try {
        const res = await projectsApi.listAdmin();
        const project = (res.data || []).find((p) => p._id === id);
        if (!alive) return;
        if (!project) {
          setError('Project not found');
          setLoading(false);
          return;
        }
        setForm({
          title: project.title || '',
          slug: project.slug || '',
          tagline: project.tagline || '',
          description: project.description || '',
          inspiration: project.inspiration || '',
          category: project.category || 'Web Design & Development',
          kind: project.kind || 'client',
          tags: (project.tags || []).join(', '),
          industries: project.industries?.length ? project.industries : ['Featured'],
          externalLink: project.externalLink || '',
          scriptAvailable: !!project.scriptAvailable,
          price: project.price ?? '',
          currency: project.currency || 'USD',
          featured: !!project.featured,
          visible: !!project.visible,
          order: project.order ?? 0,
          testimonialQuote: project.testimonial?.quote || '',
          testimonialAuthor: project.testimonial?.author || '',
          testimonialRole: project.testimonial?.role || '',
        });
        setExistingHero(project.heroImage || null);
        setExistingGallery(project.gallery || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load project');
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
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const onTitleBlur = () => {
    // Auto-generate slug only if it's empty (don't overwrite manual edits)
    if (!form.slug && form.title) setForm((p) => ({ ...p, slug: slugify(form.title) }));
  };

  const toggleIndustry = (ind) => {
    setForm((p) => {
      const has = p.industries.includes(ind);
      const next = has ? p.industries.filter((i) => i !== ind) : [...p.industries, ind];
      return { ...p, industries: next.length ? next : ['Featured'] };
    });
  };

  const removeExistingGalleryAt = (idx) => {
    setExistingGallery((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeQueuedFileAt = (idx) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const onPickGalleryFiles = (e) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length === 0) return;
    setGalleryFiles((prev) => [...prev, ...newFiles]);
    // Allow re-selecting the same file later (browsers ignore duplicate selections otherwise)
    e.target.value = '';
  };

  const heroPreview = useMemo(() => {
    if (heroFile) return URL.createObjectURL(heroFile);
    return existingHero?.url || null;
  }, [heroFile, existingHero]);

  const galleryPreviews = useMemo(
    () => galleryFiles.map((f) => ({ url: URL.createObjectURL(f), name: f.name })),
    [galleryFiles]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and slug are required.');
      return;
    }
    if (form.kind === 'stock' && (!form.price || Number(form.price) <= 0)) {
      setError('Stock items must have a price greater than 0.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: slugify(form.slug),
        tagline: form.tagline,
        description: form.description,
        inspiration: form.inspiration,
        category: form.category,
        kind: form.kind,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        industries: form.industries,
        externalLink: form.externalLink.trim(),
        scriptAvailable: form.scriptAvailable,
        price: form.price === '' ? null : Number(form.price),
        currency: form.currency,
        featured: form.featured,
        visible: form.visible,
        order: Number(form.order) || 0,
        testimonial: {
          quote: form.testimonialQuote,
          author: form.testimonialAuthor,
          role: form.testimonialRole,
        },
      };

      // Hero image: only send if a new file was picked
      if (heroFile) payload.heroImage = heroFile;

      // Gallery: only send actual File objects (not previously-saved {url,publicId} entries)
      const newGalleryFiles = (galleryFiles || []).filter((f) => f instanceof File);
      if (newGalleryFiles.length) payload.gallery = newGalleryFiles;

      // When editing, ALWAYS tell the server which existing images survived
      // — even if the array is empty, that's a meaningful "delete them all" signal.
      // The server will diff this against the stored gallery, delete the removed
      // ones from Cloudinary, then APPEND the new uploads.
      if (isEdit) {
        payload.galleryJson = JSON.stringify(existingGallery || []);
      }

      if (isEdit) {
        await projectsApi.update(id, payload);
      } else {
        await projectsApi.create(payload);
      }
      navigate('/admin/projects');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl">
      <SEO title={isEdit ? 'Edit Project' : 'New Project'} />

      <Link
        to="/admin/projects"
        className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-4"
      >
        <HiOutlineArrowLeft className="w-4 h-4" /> Back to projects
      </Link>

      <h1 className="text-white text-3xl font-bold mb-2">
        {isEdit ? 'Edit project' : 'New project'}
      </h1>
      <p className="text-muted mb-8">
        Everything here will appear on the public Works page (and the Store, if marked as Stock).
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm rounded-lg p-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Basics */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-semibold">Basics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Title *"
              name="title"
              value={form.title}
              onChange={onChange}
              onBlur={onTitleBlur}
              required
            />
            <Field
              label="Slug *"
              name="slug"
              value={form.slug}
              onChange={onChange}
              hint="Lowercase, hyphenated. Used in /projects/<slug>"
              required
            />
          </div>
          <Field
            label="Tagline"
            name="tagline"
            value={form.tagline}
            onChange={onChange}
            placeholder="One-sentence summary shown on the card"
          />
          <Textarea
            label="Description (Project overview)"
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
          />
          <Textarea
            label="Design inspiration / process"
            name="inspiration"
            value={form.inspiration}
            onChange={onChange}
            rows={4}
            placeholder="Tell the story behind the project"
          />
        </section>

        {/* Categorization */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-semibold">Categorization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Primary category"
              name="category"
              value={form.category}
              onChange={onChange}
              options={CATEGORY_OPTIONS}
            />
            <Select
              label="Kind"
              name="kind"
              value={form.kind}
              onChange={onChange}
              options={[
                { value: 'client', label: 'Client project (Visit Live Site)' },
                { value: 'stock', label: 'Stock / for sale (Buy Script)' },
              ]}
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">
              Show under these Works tabs
            </label>
            <div className="flex flex-wrap gap-2">
              {INDUSTRY_OPTIONS.map((ind) => {
                const active = form.industries.includes(ind);
                return (
                  <button
                    type="button"
                    key={ind}
                    onClick={() => toggleIndustry(ind)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      active
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>
          </div>

          <Field
            label="Tags (comma-separated)"
            name="tags"
            value={form.tags}
            onChange={onChange}
            placeholder="e.g. Courier, Errands, Web Platform"
          />
        </section>

        {/* External link */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-semibold">External link</h2>
          <Field
            label={form.kind === 'stock' ? 'Payment link (Flutterwave / Paystack)' : 'Live site URL'}
            name="externalLink"
            value={form.externalLink}
            onChange={onChange}
            placeholder="https://…"
            type="url"
          />

          {form.kind === 'stock' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field
                label="Price *"
                name="price"
                value={form.price}
                onChange={onChange}
                type="number"
                min="0"
                step="0.01"
              />
              <Select
                label="Currency"
                name="currency"
                value={form.currency}
                onChange={onChange}
                options={['USD', 'NGN', 'EUR', 'GBP']}
              />
              <Checkbox
                label="Script available"
                name="scriptAvailable"
                checked={form.scriptAvailable}
                onChange={onChange}
              />
            </div>
          )}

          {form.kind === 'client' && (
            <Checkbox
              label="Show 'Script Available' badge on this project"
              name="scriptAvailable"
              checked={form.scriptAvailable}
              onChange={onChange}
            />
          )}
        </section>

        {/* Images */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <h2 className="text-white font-semibold">Images</h2>

          {/* Hero */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Hero image</label>
            <div className="flex items-start gap-4 flex-wrap">
              {heroPreview ? (
                <img
                  src={heroPreview}
                  alt="Hero preview"
                  className="w-48 h-32 object-cover rounded-xl"
                />
              ) : (
                <div className="w-48 h-32 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-muted">
                  <HiOutlinePhotograph className="w-8 h-8" />
                </div>
              )}
              <label className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm cursor-pointer transition">
                {heroFile || existingHero ? 'Replace' : 'Upload'}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setHeroFile(e.target.files?.[0] || null)}
                />
              </label>
              {(heroFile || existingHero) && (
                <button
                  type="button"
                  onClick={() => {
                    setHeroFile(null);
                    setExistingHero(null);
                  }}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-300 text-sm transition inline-flex items-center gap-2"
                >
                  <HiOutlineTrash className="w-4 h-4" /> Remove
                </button>
              )}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white/70 text-sm">
                Gallery (multiple — pick as many as you like)
              </label>
              <span className="text-muted text-xs">
                {existingGallery.length + galleryFiles.length} image
                {existingGallery.length + galleryFiles.length === 1 ? '' : 's'} total
              </span>
            </div>

            {existingGallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                {existingGallery.map((img, i) => (
                  <div key={img.publicId || i} className="relative group">
                    <img
                      src={img.url}
                      alt={img.alt || `Gallery ${i + 1}`}
                      className="w-full h-28 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingGalleryAt(i)}
                      className="absolute top-1 right-1 p-1.5 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition"
                      aria-label="Remove image"
                    >
                      <HiOutlineTrash className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                {galleryPreviews.map((g, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={g.url}
                      alt={g.name}
                      className="w-full h-28 object-cover rounded-lg ring-1 ring-yellow-400/40"
                    />
                    <button
                      type="button"
                      onClick={() => removeQueuedFileAt(i)}
                      className="absolute top-1 right-1 p-1.5 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition"
                      aria-label="Remove queued image"
                    >
                      <HiOutlineTrash className="w-4 h-4 text-white" />
                    </button>
                    <span className="absolute bottom-1 left-1 right-1 text-[10px] bg-black/70 text-white px-1.5 py-0.5 rounded truncate">
                      New: {g.name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <label className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm cursor-pointer transition">
              Add gallery images
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={onPickGalleryFiles}
              />
            </label>
            <p className="text-muted text-xs mt-2">
              Pick multiple at once, or click again to add more — each click appends to the list.
            </p>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Client testimonial (optional)</h2>
          <Textarea
            label="Quote"
            name="testimonialQuote"
            value={form.testimonialQuote}
            onChange={onChange}
            rows={3}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Author name"
              name="testimonialAuthor"
              value={form.testimonialAuthor}
              onChange={onChange}
            />
            <Field
              label="Author role / company"
              name="testimonialRole"
              value={form.testimonialRole}
              onChange={onChange}
            />
          </div>
        </section>

        {/* Visibility */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-semibold">Visibility & ordering</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Checkbox
              label="Visible on site"
              name="visible"
              checked={form.visible}
              onChange={onChange}
            />
            <Checkbox
              label="Featured"
              name="featured"
              checked={form.featured}
              onChange={onChange}
            />
            <Field
              label="Display order (lower = first)"
              name="order"
              value={form.order}
              onChange={onChange}
              type="number"
            />
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="ct-button ct-button-primary px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition disabled:opacity-60"
          >
            {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create project'}
          </button>
          <Link
            to="/admin/projects"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-medium transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

/* ---------- small form primitives, scoped to admin ---------- */
const baseInput =
  'ct-field w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted focus:outline-none focus:border-yellow-400/60 transition';

const Field = ({ label, hint, ...rest }) => (
  <div>
    <label className="block text-white/70 text-sm mb-2">{label}</label>
    <input className={baseInput} {...rest} />
    {hint && <p className="text-muted text-xs mt-1">{hint}</p>}
  </div>
);

const Textarea = ({ label, ...rest }) => (
  <div>
    <label className="block text-white/70 text-sm mb-2">{label}</label>
    <textarea className={`${baseInput} resize-none`} {...rest} />
  </div>
);

const Select = ({ label, options, ...rest }) => (
  <div>
    <label className="block text-white/70 text-sm mb-2">{label}</label>
    <select className={baseInput} {...rest}>
      {options.map((o) => {
        const value = typeof o === 'string' ? o : o.value;
        const text = typeof o === 'string' ? o : o.label;
        return (
          <option key={value} value={value} className="bg-gray-900">
            {text}
          </option>
        );
      })}
    </select>
  </div>
);

const Checkbox = ({ label, ...rest }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <input type="checkbox" {...rest} className="w-5 h-5 accent-yellow-400" />
    <span className="text-white/80 text-sm">{label}</span>
  </label>
);

export default ProjectForm;
