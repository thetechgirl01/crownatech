import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../common/Spinner';

/**
 * Wraps any route tree that requires an authenticated admin.
 * While we're verifying the token (`/auth/me` round-trip on first load)
 * we show a full-screen spinner instead of flashing the login screen.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner fullScreen />;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
