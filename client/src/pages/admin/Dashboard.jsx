import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';
import { projectsApi } from '../../api/projects';
import { blogsApi } from '../../api/blogs';
import { contactsApi } from '../../api/contacts';
import Spinner from '../../components/common/Spinner';
import SEO from '../../components/common/SEO';

const StatCard = ({ icon: Icon, label, value, sub, to }) => {
  const body = (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400/40 transition h-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/60 text-sm">{label}</span>
        <Icon className="w-5 h-5 text-yellow-400" />
      </div>
      <div className="text-white text-3xl font-bold">{value}</div>
      {sub && <p className="text-white/40 text-xs mt-2">{sub}</p>}
    </div>
  );
  return to ? <Link to={to}>{body}</Link> : body;
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    visibleProjects: 0,
    hiddenProjects: 0,
    posts: 0,
    publishedPosts: 0,
    contacts: 0,
    unreadContacts: 0,
  });
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [projectsRes, postsRes, contactsRes] = await Promise.all([
          projectsApi.listAdmin(),
          blogsApi.listAdmin(),
          contactsApi.list(),
        ]);
        if (!alive) return;

        const projects = projectsRes.data || [];
        const posts = postsRes.data || [];
        const contacts = contactsRes.data || [];

        setStats({
          projects: projects.length,
          visibleProjects: projects.filter((p) => p.visible).length,
          hiddenProjects: projects.filter((p) => !p.visible).length,
          posts: posts.length,
          publishedPosts: posts.filter((p) => p.published).length,
          contacts: contacts.length,
          unreadContacts: contacts.filter((c) => !c.read).length,
        });
        setRecentContacts(contacts.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <SEO title="Dashboard" />

      <header className="mb-8">
        <h1 className="text-white text-3xl font-bold">Dashboard</h1>
        <p className="text-white/60 mt-2">Quick overview of your site.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={HiOutlineBriefcase}
          label="Projects"
          value={stats.projects}
          sub={`${stats.visibleProjects} visible · ${stats.hiddenProjects} hidden`}
          to="/admin/projects"
        />
        <StatCard
          icon={HiOutlineDocumentText}
          label="Blog Posts"
          value={stats.posts}
          sub={`${stats.publishedPosts} published`}
          to="/admin/blogs"
        />
        <StatCard
          icon={HiOutlineMail}
          label="Messages"
          value={stats.contacts}
          sub={`${stats.unreadContacts} unread`}
          to="/admin/contacts"
        />
        <StatCard
          icon={stats.hiddenProjects > 0 ? HiOutlineEyeOff : HiOutlineEye}
          label="Site Status"
          value={stats.visibleProjects}
          sub="projects publicly visible"
        />
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Recent messages</h2>
          <Link to="/admin/contacts" className="text-yellow-400 text-sm hover:underline">
            View all →
          </Link>
        </div>
        {recentContacts.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-white/60">
            No messages yet.
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <ul className="divide-y divide-white/10">
              {recentContacts.map((c) => (
                <li key={c._id} className="p-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium truncate">{c.name}</span>
                      {!c.read && (
                        <span className="px-2 py-0.5 text-[10px] uppercase bg-yellow-400 text-black rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm truncate">{c.email}</p>
                    <p className="text-white/70 text-sm mt-2 line-clamp-2">{c.message}</p>
                  </div>
                  <span className="text-white/40 text-xs flex-shrink-0">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
