import axios from 'axios';

/**
 * Single shared axios instance.
 *
 * baseURL resolution:
 *   - In dev, leave VITE_API_URL empty. The Vite proxy forwards /api
 *     to the Express server (see vite.config.js).
 *   - In prod, set VITE_API_URL to the deployed API origin
 *     (e.g. https://api.crownatech.com).
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: false,
});

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jow_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Globally handle 401 by clearing the stale token.
// Components decide what to render — we don't force a navigation here.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('jow_token');
      localStorage.removeItem('jow_user');
    }
    return Promise.reject(error);
  }
);

export default api;
