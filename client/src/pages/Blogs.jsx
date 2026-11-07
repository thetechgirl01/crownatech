import NewsletterSignup from '../components/common/NewsletterSignup';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { blogsApi } from '../api/blogs';
import LazyImage from '../components/common/LazyImage';
import EmptyState from '../components/common/EmptyState';
import { CardGridSkeleton } from '../components/common/CardSkeleton';
import SEO from '../components/common/SEO';

/**
 * Editorial blog index.
 *
 * Layout (inspired by long-form editorial sites like shakuro.com/blog,
 * but executed in our existing dark / goldenrod design system):
 *   - Big confident header
 *   - Category filter strip on the left + search box on the right
 *   - 2-column responsive card grid (image on top, category chip overlay,
 *     title + date below)
 *   - "Load more" button at the bottom (no pagination)
 *   - Newsletter strip at the very bottom
 *
 * Two modes (kept for backwards compat with Home.jsx):
 *   - Standalone (default): fetches its own data, full UI
 *   - Embedded:  pass `blogs` + `showFilters={false}` to render just the grid
 */

const PAGE_SIZE = 8;

const formatDate = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
};

const Blogs = ({ blogs: external, showFilters = true }) => {
  const [blogs, setBlogs] = useState(external || []);
  const [loading, setLoading] = useState(!external);
  const [error, setError] = useState('');

  // Filters (only used in standalone mode)
  const [activeCategory, setActiveCategory] = useState('Recents');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Fetch in standalone mode
  useEffect(() => {
    if (external) {
      setBlogs(external);
      return;
    }
    let alive = true;
    setLoading(true);
    blogsApi
      .list()
      .then((res) => {
        if (alive) setBlogs(res.data || []);
      })
      .catch((err) => {
        if (alive) setError(err?.response?.data?.message || 'Failed to load posts');
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [external]);

  // Build the category list from what's actually in the data
  const categories = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => b.category && set.add(b.category));
    return ['Recents', ...Array.from(set)];
  }, [blogs]);

  // Filtered / searched view
  const visible = useMemo(() => {
    let list = [...blogs];
    if (activeCategory !== 'Recents') {
      list = list.filter((b) => b.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q) ||
          (b.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    // Recents = newest first
    list.sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt) -
        new Date(a.publishedAt || a.createdAt)
    );
    return list;
  }, [blogs, activeCategory, search]);

  const shown = useMemo(() => visible.slice(0, visibleCount), [visible, visibleCount]);

  // ============================================================
  //  Embedded mode — just render the grid (used inside Home.jsx)
  // ============================================================
  if (!showFilters) {
    if (!blogs.length) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.slice(0, 4).map((post) => (
          <BlogCard key={post._id || post.slug} post={post} />
        ))}
      </div>
    );
  }

  // ============================================================
  //  Standalone mode — full editorial blog index
  // ============================================================
  return (
    <div className="ct-container min-h-screen ct-page-content">
      <SEO
        title="Blog"
        description="Stories, tutorials, and behind-the-scenes notes on design, web development, and building digital products."
      />

      {/* Header */}
      <header className="mb-14 sm:mb-20">
      
        <h1 className="ct-page-heading text-white font-bold leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
          This is where we tell&nbsp;stories.
          <br />
          <span className="text-white/70">
            Most of them are about design&nbsp;&amp;&nbsp;code.
          </span>
        </h1>
      </header>

      {/* Filter strip + search */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between mb-12 pb-6 border-b border-white/10">
        <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Categories">
          {categories.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(PAGE_SIZE);
                }}
                aria-pressed={active}
                className={`ct-filter ${active ? 'ct-filter-active' : ''}`}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        <label className="relative flex items-center w-full lg:w-72">
          <HiOutlineSearch
            className="absolute left-3 w-4 h-4 text-muted pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search…"
            className="ct-field w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-muted text-sm focus:outline-none focus:border-yellow-400/60 transition"
            aria-label="Search blog posts"
          />
        </label>
      </div>

      {/* Body */}
      {error ? (
        <EmptyState
          title="Couldn't load posts"
          message={error}
        />
      ) : loading ? (
        <CardGridSkeleton count={6} />
      ) : shown.length === 0 ? (
        <EmptyState
          title="No posts yet"
          message={
            search.trim()
              ? `Nothing matches "${search}". Try a different search.`
              : 'Check back soon — new stories are on the way.'
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {shown.map((post) => (
              <BlogCard key={post._id || post.slug} post={post} />
            ))}
          </div>

          {visible.length > visibleCount && (
            <div className="flex justify-center mt-16">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="ct-button ct-button-tertiary"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}

      {/* Newsletter strip */}
      <NewsletterStrip />
    </div>
  );
};

/* ------------------------------------------------------------
   Blog card — large image, category chip overlay, title, date
   ------------------------------------------------------------ */
const BlogCard = ({ post }) => {
  const cover = post.coverImage?.url;
  const cats = (post.category || '').split(',').map((c) => c.trim()).filter(Boolean);
  return (
    <article className="group">
      <Link to={`/blog/${post.slug}`} className="block">
        {/* Media */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-5">
          {cover ? (
            <LazyImage
              src={cover}
              alt={post.coverImage?.alt || post.title}
              className="w-full h-full object-cover transition-transform duration-200 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
              No image
            </div>
          )}

          {cats.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[80%]">
              {cats.slice(0, 3).map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 text-[11px] sm:text-xs font-medium uppercase tracking-wider bg-black/55 backdrop-blur-md text-white border border-white/15 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Text */}
        <h2 className="text-white text-xl sm:text-2xl font-semibold leading-snug group-hover:text-yellow-400 transition-colors line-clamp-3">
          {post.title}
        </h2>

        <div className="flex items-center gap-3 text-muted text-sm mt-3">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt || post.createdAt)}
          </time>
          {post.readTime ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.readTime} min read</span>
            </>
          ) : null}
        </div>
      </Link>
    </article>
  );
};

/* ------------------------------------------------------------
   Newsletter strip (purely visual — wire up later if you want)
   ------------------------------------------------------------ */
const NewsletterStrip = () => (
  <section className="mt-20 pt-10 border-t border-white/10 grid gap-8 md:grid-cols-2">
    <div>
      <h2 className="text-white text-2xl sm:text-3xl font-semibold mb-3">Studio notes</h2>
      <p className="text-muted">Keep up with our latest articles and projects.</p>
    </div>
    <NewsletterSignup />
  </section>
);

export default Blogs;
