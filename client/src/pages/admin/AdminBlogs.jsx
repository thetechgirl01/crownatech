import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineExternalLink,
} from 'react-icons/hi';
import { blogsApi } from '../../api/blogs';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import SEO from '../../components/common/SEO';

const AdminBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await blogsApi.listAdmin();
        if (alive) setPosts(res.data || []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const onDelete = async (id) => {
    if (!confirm('Delete this post and its images?')) return;
    setBusyId(id);
    try {
      await blogsApi.remove(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete post');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <SEO title="Blog Posts · Admin" />

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-white text-3xl font-bold">Blog posts</h1>
          <p className="text-muted mt-1">Write, edit, and publish articles.</p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="ct-button ct-button-primary inline-flex items-center gap-2 px-5 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition w-fit"
        >
          <HiOutlinePlus className="w-5 h-5" /> New post
        </Link>
      </header>

      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          message="Write your first article to populate the blog."
          action={
            <Link
              to="/admin/blogs/new"
              className="ct-button ct-button-primary inline-flex items-center gap-2 px-5 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition"
            >
              <HiOutlinePlus className="w-5 h-5" /> New post
            </Link>
          }
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {posts.map((p) => (
            <li
              key={p._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row gap-5"
            >
              <div className="md:w-32 flex-shrink-0">
                {p.coverImage?.url ? (
                  <img
                    src={p.coverImage.url}
                    alt={p.title}
                    className="w-full h-24 object-cover rounded-xl"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted text-xs">
                    No cover
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-lg truncate">{p.title}</h3>
                    <p className="text-muted text-xs mt-1 truncate">/{p.slug}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-[11px] rounded-full ${
                      p.published
                        ? 'bg-green-400/20 text-green-300'
                        : 'bg-white/10 text-muted'
                    }`}
                  >
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                {p.excerpt && (
                  <p className="text-muted text-sm line-clamp-2 mb-3">{p.excerpt}</p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted mb-3">
                  <span>{new Date(p.publishedAt || p.createdAt).toLocaleDateString()}</span>
                  <span>·</span>
                  <span>{p.category}</span>
                  <span>·</span>
                  <span>{p.readTime} min read</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.published && (
                    <Link
                      to={`/blog/${p.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition"
                    >
                      <HiOutlineExternalLink className="w-4 h-4" /> View
                    </Link>
                  )}
                  <Link
                    to={`/admin/blogs/${p._id}/edit`}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition"
                  >
                    <HiOutlinePencil className="w-4 h-4" /> Edit
                  </Link>
                  <button
                    onClick={() => onDelete(p._id)}
                    disabled={busyId === p._id}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-sm transition disabled:opacity-50"
                  >
                    <HiOutlineTrash className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminBlogs;
