import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineExternalLink,
} from 'react-icons/hi';
import { projectsApi } from '../../api/projects';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import SEO from '../../components/common/SEO';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await projectsApi.listAdmin();
      setProjects(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const onToggleVisibility = async (id) => {
    setBusyId(id);
    try {
      const res = await projectsApi.toggleVisibility(id);
      setProjects((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to update visibility');
    } finally {
      setBusyId(null);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this project? This will also remove its images from Cloudinary.')) return;
    setBusyId(id);
    try {
      await projectsApi.remove(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete project');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <SEO title="Projects · Admin" />

      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-white text-3xl font-bold">Projects</h1>
          <p className="text-muted mt-1">Manage everything that appears on /works and /store.</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="ct-button ct-button-primary inline-flex items-center gap-2 px-5 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition w-fit"
        >
          <HiOutlinePlus className="w-5 h-5" /> New project
        </Link>
      </header>

      {loading ? (
        <Spinner />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          message="Create your first project to populate the Works page."
          action={
            <Link
              to="/admin/projects/new"
              className="ct-button ct-button-primary inline-flex items-center gap-2 px-5 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition"
            >
              <HiOutlinePlus className="w-5 h-5" /> New project
            </Link>
          }
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {projects.map((p) => (
            <li
              key={p._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row gap-5"
            >
              <div className="md:w-40 flex-shrink-0">
                {p.heroImage?.url ? (
                  <img
                    src={p.heroImage.url}
                    alt={p.title}
                    className="w-full h-32 md:h-28 object-cover rounded-xl"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-32 md:h-28 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted text-xs">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold text-lg truncate">{p.title}</h3>
                    <p className="text-muted text-xs mt-1 truncate">/{p.slug}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 text-[11px] rounded-full bg-white/5 border border-white/10 text-white/70">
                      {p.category}
                    </span>
                    {p.kind === 'stock' && (
                      <span className="px-2.5 py-1 text-[11px] rounded-full bg-yellow-400/20 text-yellow-400">
                        Stock {p.price ? `· ${p.currency} ${p.price}` : ''}
                      </span>
                    )}
                    {p.scriptAvailable && (
                      <span className="px-2.5 py-1 text-[11px] rounded-full bg-blue-400/20 text-blue-200">
                        Script
                      </span>
                    )}
                  </div>
                </div>

                {p.tagline && (
                  <p className="text-muted text-sm line-clamp-2 mb-3">{p.tagline}</p>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => onToggleVisibility(p._id)}
                    disabled={busyId === p._id}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition disabled:opacity-50 ${
                      p.visible
                        ? 'bg-white/5 text-white hover:bg-white/10'
                        : 'bg-yellow-400/10 text-yellow-300 hover:bg-yellow-400/20'
                    }`}
                  >
                    {p.visible ? (
                      <>
                        <HiOutlineEye className="w-4 h-4" /> Visible
                      </>
                    ) : (
                      <>
                        <HiOutlineEyeOff className="w-4 h-4" /> Hidden
                      </>
                    )}
                  </button>

                  {p.externalLink && (
                    <a
                      href={p.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition"
                    >
                      <HiOutlineExternalLink className="w-4 h-4" /> Open
                    </a>
                  )}

                  <Link
                    to={`/admin/projects/${p._id}/edit`}
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

export default AdminProjects;
