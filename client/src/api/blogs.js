import api from './axios';

const toFormData = (obj) => {
  const fd = new FormData();
  Object.entries(obj || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (value instanceof File || value instanceof Blob) return fd.append(key, value);
    if (Array.isArray(value) && value.length && value[0] instanceof File) {
      value.forEach((f) => fd.append(key, f));
      return;
    }
    if (typeof value === 'object') return fd.append(key, JSON.stringify(value));
    fd.append(key, String(value));
  });
  return fd;
};

export const blogsApi = {
  list: (params = {}) => api.get('/api/blogs', { params }).then((r) => r.data),
  getBySlug: (slug) => api.get(`/api/blogs/${slug}`).then((r) => r.data),

  // Admin
  listAdmin: () => api.get('/api/blogs/admin').then((r) => r.data),

  create: (payload) =>
    api
      .post('/api/blogs', toFormData(payload), {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),

  update: (id, payload) =>
    api
      .put(`/api/blogs/${id}`, toFormData(payload), {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),

  remove: (id) => api.delete(`/api/blogs/${id}`).then((r) => r.data),

  // Inline image upload from the rich text editor.
  uploadInlineImage: (file) => {
    const fd = new FormData();
    fd.append('image', file);
    return api
      .post('/api/blogs/upload-inline', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};
