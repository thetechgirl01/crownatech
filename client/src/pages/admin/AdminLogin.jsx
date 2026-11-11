import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/common/SEO';

const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Already logged in? Bounce them straight to the dashboard.
  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ct-admin min-h-screen bg flex items-center justify-center px-4 py-12">
      <SEO title="Admin Login" description="CrownaTech admin sign in" />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-white tracking-tight">
            CrownaTech<span className="text-yellow-400">.</span>
          </Link>
          <h1 className="text-white text-3xl font-bold mt-6 mb-2">Welcome back</h1>
          <p className="text-muted">Sign in to manage your site</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl space-y-6"
          noValidate
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm rounded-lg p-3">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-white/70 text-sm mb-2">
              Email
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ct-field w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted focus:outline-none focus:border-yellow-400/60 transition"
                placeholder="[email protected]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-white/70 text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ct-field w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-muted focus:outline-none focus:border-yellow-400/60 transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="ct-button ct-button-primary w-full py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-muted text-xs text-center">
            Protected area. Unauthorized access is prohibited.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
