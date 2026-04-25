import React, { useEffect, useState } from 'react';
import {
  HiOutlineMail,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineReply,
} from 'react-icons/hi';
import { contactsApi } from '../../api/contacts';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import SEO from '../../components/common/SEO';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [filter, setFilter] = useState('all'); // all | unread | read

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await contactsApi.list();
        if (alive) setContacts(res.data || []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const onMarkRead = async (id, read) => {
    setBusyId(id);
    try {
      const res = await contactsApi.update(id, { read });
      setContacts((prev) => prev.map((c) => (c._id === id ? res.data : c)));
    } finally {
      setBusyId(null);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    setBusyId(id);
    try {
      await contactsApi.remove(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } finally {
      setBusyId(null);
    }
  };

  const filtered = contacts.filter((c) => {
    if (filter === 'unread') return !c.read;
    if (filter === 'read') return c.read;
    return true;
  });

  return (
    <div>
      <SEO title="Messages · Admin" />

      <header className="mb-8">
        <h1 className="text-white text-3xl font-bold">Messages</h1>
        <p className="text-white/60 mt-1">Project enquiries from the contact form.</p>
      </header>

      <div className="flex gap-2 mb-6">
        {['all', 'unread', 'read'].map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition ${
              filter === k
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : filtered.length === 0 ? (
        <EmptyState title="No messages" message="Submissions will show up here." />
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {filtered.map((c) => (
            <li
              key={c._id}
              className={`bg-white/5 border rounded-2xl p-5 transition ${
                c.read ? 'border-white/10' : 'border-yellow-400/40'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold truncate">{c.name}</h3>
                    {!c.read && (
                      <span className="px-2 py-0.5 text-[10px] uppercase bg-yellow-400 text-black rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-yellow-400 hover:underline text-sm break-all"
                  >
                    {c.email}
                  </a>
                  {c.budget && (
                    <p className="text-white/40 text-xs mt-1">Budget: {c.budget}</p>
                  )}
                </div>
                <span className="text-white/40 text-xs flex-shrink-0">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-white/80 whitespace-pre-wrap mb-4">{c.message}</p>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${c.email}?subject=Re: Your project enquiry`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-500 transition"
                >
                  <HiOutlineReply className="w-4 h-4" /> Reply
                </a>
                <button
                  onClick={() => onMarkRead(c._id, !c.read)}
                  disabled={busyId === c._id}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition disabled:opacity-50"
                >
                  {c.read ? (
                    <>
                      <HiOutlineMail className="w-4 h-4" /> Mark unread
                    </>
                  ) : (
                    <>
                      <HiOutlineCheck className="w-4 h-4" /> Mark read
                    </>
                  )}
                </button>
                <button
                  onClick={() => onDelete(c._id)}
                  disabled={busyId === c._id}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-sm transition disabled:opacity-50"
                >
                  <HiOutlineTrash className="w-4 h-4" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminContacts;
