import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

/**
 * Admin shell — sidebar + top bar + content.
 * Sidebar collapses to a slide-out on mobile.
 */
const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const links = [
    { to: '/admin', label: 'Dashboard', icon: HiOutlineHome, end: true },
    { to: '/admin/projects', label: 'Projects', icon: HiOutlineBriefcase },
    { to: '/admin/blogs', label: 'Blog Posts', icon: HiOutlineDocumentText },
    { to: '/admin/contacts', label: 'Messages', icon: HiOutlineMail },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? 'bg-yellow-400 text-black font-semibold'
        : 'text-white/70 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <div className="ct-admin min-h-screen bg flex text-white">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-menu"
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-brand border-r border-white/10 backdrop-blur-xl
          flex flex-col transition-transform duration-300 lg:translate-x-0 ${
            open ? 'translate-x-0 visible' : '-translate-x-full invisible lg:visible'
          }`}
      >
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-white">
            CrownaTech<span className="text-yellow-400">.</span>
          </Link>
          <button
            className="lg:hidden text-white/70 hover:text-white"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass} onClick={() => setOpen(false)}>
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="px-4 py-3 mb-2">
            <p className="text-xs text-muted">Signed in as</p>
            <p className="text-sm text-white truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition"
          >
            <HiOutlineLogout className="w-5 h-5" />
            <span>Log out</span>
          </button>
          <Link to="/privacy" className="ct-footer-link text-sm px-4">Privacy Policy draft</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar (mobile menu trigger) */}
        <header className="lg:hidden sticky top-0 z-20 bg-brand border-b border-white/10 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="text-white"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="admin-menu"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>
          <span className="text-white font-semibold">Admin</span>
          <span className="w-6" />
        </header>

        <main className="flex-1 p-6 lg:p-10 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
