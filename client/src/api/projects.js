import api from './axios';

/**
 * Build a FormData body from a plain object.
 * Files (File / Blob) and arrays-of-files are appended directly;
 * arrays/objects are JSON-stringified so the server can parse them back.
 */
const toFormData = (obj) => {
  const fd = new FormData();
  Object.entries(obj || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Single File / Blob
    if (value instanceof File || value instanceof Blob) {
      fd.append(key, value);
      return;
    }

    // FileList / array of Files
    if (Array.isArray(value) && value.length && value[0] instanceof File) {
      value.forEach((f) => fd.append(key, f));
      return;
    }

    // Arrays / plain objects → JSON
    if (typeof value === 'object') {
      fd.append(key, JSON.stringify(value));
      return;
    }

    fd.append(key, String(value));
  });
  return fd;
};

export const projectsApi = {
  // Public
  list: (params = {}) =>
    api.get('/api/projects', { params }).then((r) => r.data),

  getBySlug: (slug) =>
    api.get(`/api/projects/${slug}`).then((r) => r.data),

  // Admin
  listAdmin: () => api.get('/api/projects/admin').then((r) => r.data),

  create: (payload) =>
    api
      .post('/api/projects', toFormData(payload), {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),

  update: (id, payload) =>
    api
      .put(`/api/projects/${id}`, toFormData(payload), {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),

  toggleVisibility: (id) =>
    api.patch(`/api/projects/${id}/visibility`).then((r) => r.data),

  remove: (id) => api.delete(`/api/projects/${id}`).then((r) => r.data),
};
