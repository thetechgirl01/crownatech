import api from './axios';

export const authApi = {
  login: (email, password) =>
    api.post('https://crownatech.onrender.com/api/auth/login', { email, password })
      .then((r) => r.data),

  me: () =>
    api.get('https://crownatech.onrender.com/api/auth/me')
      .then((r) => r.data),
};