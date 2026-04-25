import api from './axios';

export const contactsApi = {
  // Public
  submit: (payload) => api.post('/api/contacts', payload).then((r) => r.data),

  // Admin
  list: (params = {}) => api.get('/api/contacts', { params }).then((r) => r.data),
  update: (id, payload) =>
    api.patch(`/api/contacts/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/api/contacts/${id}`).then((r) => r.data),
};
