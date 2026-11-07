import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineLink } from 'react-icons/hi';
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa6';
import { blogsApi } from '../api/blogs';
import LazyImage from '../components/common/LazyImage';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';
import SEO from '../components/common/SEO';

/**
 * Long-form blog post page.
 *
 * Layout (inspired by editorial sites like shakuro.com/blog/:slug,
 * but built on our own dark / yellow design system):
 *   - Centered title block with category, date, read time, author
 *   - Wide hero image
 *   - Two-column body: sticky table of contents + share buttons on the
 *     left, the article on the right
 *   - .prose-blog typography (already defined in index.css) styles the
 *     rich HTML produced by the admin Quill editor
 *   - Related posts at the bottom
 *
 * Route: /blog/:slug
 */

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

const BlogContentPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const articleRef = useRef(null);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState(null);

  // Fetch post + a small batch of recent posts for the related strip
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    setPost(null);

    Promise.all([blogsApi.getBySlug(slug), blogsApi.list()])
      .then(([single, all]) => {
        if (!alive) return;
        setPost(single.data);
        const rest = (all.data || [])
          .filter((p) => p.slug !== slug)
          .slice(0, 3);
        setRelated(rest);
      })
      .catch((err) => {
        if (alive) setError(err?.response?.data?.message || 'Post not found');
      })
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [slug]);

  // Extract h2 headings from the rendered article so we can build a TOC.
  // Runs once after the content paints. Each heading is given an id so
  // the TOC links can scroll to it.
  useEffect(() => {
    if (!post || !articleRef.current) return;
    const els = articleRef.current.querySelectorAll('h2, h3');
    const list = [];
    els.forEach((el, i) => {
      if (!el.id) {
        el.id =
          el.textContent
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 60) || `section-${i}`;
      }
      list.push({ id: el.id, text: el.textContent, level: el.tagName });
    });
    setHeadings(list);
  }, [post]);

  // Highlight the heading currently in view
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.offsetTop - b.target.offsetTop)[0];
        if (visible) setActiveHeading(visible.target.id);
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : '';

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      /* clipboard may be unavailable on http */
    }
  };

  const cats = useMemo(
    () =>
      (post?.category || '')
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
    [post]
  );

  if (loading) return <Spinner fullScreen />;

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6">
        <EmptyState
          title="Post not found"
          message={error || "This story doesn't exist or was removed."}
          action={
            <Link
              to="/blogs"
              className="ct-button ct-button-primary inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full font-medium transition"
            >
              <HiOutlineArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-28 pb-24">
      <SEO
        title={post.title}
        description={post.excerpt || post.title}
        image={post.coverImage?.url}
      />

      {/* Top bar — back link */}
      <div className="ct-container mb-8">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-muted hover:text-white text-sm transition"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          All posts
        </Link>
      </div>

      {/* Title block */}
      <header className="max-w-3xl mx-auto px-6 sm:px-10 text-center mb-12">
        {cats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {cats.map((c) => (
              <span
                key={c}
                className="px-3 py-1 text-[11px] font-medium uppercase tracking-wider bg-white/5 text-white/80 border border-white/10 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        <h1 className="ct-page-heading text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-center gap-3 text-muted text-sm mt-8">
          <span className="text-white/80">{post.author || 'CrownaTech'}</span>
          <span aria-hidden="true">·</span>
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
      </header>

      {/* Hero image */}
      {post.coverImage?.url && (
        <div className="max-w-6xl mx-auto px-6 sm:px-10 mb-16">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-white/5 border border-white/10">
            <LazyImage
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Body — TOC + article */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sticky sidebar — TOC + share */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              {headings.length > 0 && (
                <nav className="mb-10" aria-label="Table of contents">
                  <p className="text-muted text-xs uppercase tracking-[0.18em] mb-4">
                    On this page
                  </p>
                  <ul className="space-y-2.5">
                    {headings.map((h) => (
                      <li
                        key={h.id}
                        className={h.level === 'H3' ? 'pl-4' : ''}
                      >
                        <a
                          href={`#${h.id}`}
                          className={`block text-sm leading-snug transition border-l-2 pl-3 ${
                            activeHeading === h.id
                              ? 'text-yellow-400 border-yellow-400'
                              : 'text-muted hover:text-white border-white/10'
                          }`}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div>
                <p className="text-muted text-xs uppercase tracking-[0.18em] mb-4">
                  Share
                </p>
                <div className="flex items-center gap-2">
                  <ShareButton
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      shareUrl
                    )}&text=${encodeURIComponent(post.title)}`}
                    label="Share on X"
                  >
                    <FaXTwitter className="w-4 h-4" />
                  </ShareButton>
                  <ShareButton
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      shareUrl
                    )}`}
                    label="Share on LinkedIn"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </ShareButton>
                  <ShareButton
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    label="Share on Facebook"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </ShareButton>
                  <button
                    type="button"
                    onClick={onCopyLink}
                    aria-label="Copy link"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition"
                  >
                    <HiOutlineLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Article body */}
          <div
            ref={articleRef}
            className="prose-blog max-w-[720px] mx-auto lg:mx-0"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </div>

        {/* Mobile share row (sidebar is hidden on small screens) */}
        <div className="lg:hidden flex items-center justify-center gap-2 mt-12 pt-8 border-t border-white/10">
          <ShareButton
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              shareUrl
            )}&text=${encodeURIComponent(post.title)}`}
            label="Share on X"
          >
            <FaXTwitter className="w-4 h-4" />
          </ShareButton>
          <ShareButton
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              shareUrl
            )}`}
            label="Share on LinkedIn"
          >
            <FaLinkedinIn className="w-4 h-4" />
          </ShareButton>
          <ShareButton
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`}
            label="Share on Facebook"
          >
            <FaFacebookF className="w-4 h-4" />
          </ShareButton>
          <button
            type="button"
            onClick={onCopyLink}
            aria-label="Copy link"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition"
          >
            <HiOutlineLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="ct-container mt-24 pt-16 border-t border-white/10">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-white text-2xl sm:text-3xl font-bold">
              Keep reading
            </h2>
            <Link
              to="/blogs"
              className="text-muted hover:text-white text-sm transition"
            >
              All posts →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link
                key={p._id || p.slug}
                to={`/blog/${p.slug}`}
                className="group block"
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-4">
                  {p.coverImage?.url ? (
                    <LazyImage
                      src={p.coverImage.url}
                      alt={p.title}
                      className="w-full h-full object-cover  transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="text-white text-lg font-semibold leading-snug group-hover:text-yellow-400 transition line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-muted text-xs mt-2">
                  {formatDate(p.publishedAt || p.createdAt)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

const ShareButton = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition"
  >
    {children}
  </a>
);

export default BlogContentPage;
