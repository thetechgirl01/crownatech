import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './App.css';

import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';
import Spinner from './components/common/Spinner';

import Navbar from './components/Navbar';
import Bookcall from './components/Bookcall.jsx';
import Footer from './components/Footer.jsx';

// Public pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Works from './pages/Works';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import FAQ from './pages/Faq';
import BlogContentPage from './pages/BlogContentPage.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Store from './pages/Store.jsx';

// Admin (lazy — keeps the public bundle small)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const ProjectForm = lazy(() => import('./pages/admin/ProjectForm'));
const AdminBlogs = lazy(() => import('./pages/admin/AdminBlogs'));
const BlogForm = lazy(() => import('./pages/admin/BlogForm'));
const AdminContacts = lazy(() => import('./pages/admin/AdminContacts'));

/**
 * Public site shell — Navbar/Bookcall/Footer wrap the public routes.
 * The admin section uses its own AdminLayout, so we render those routes
 * without the public chrome.
 */
const PublicShell = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Bookcall />
    <Footer />
  </>
);

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
    <div className="text-center">
      <h1 className="text-white text-5xl font-bold mb-3">404</h1>
      <p className="text-muted mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="text-yellow-400 hover:underline">← Back home</a>
    </div>
  </div>
);

const AppRoutes = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Suspense fallback={<Spinner fullScreen />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id/edit" element={<ProjectForm />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/new" element={<BlogForm />} />
            <Route path="blogs/:id/edit" element={<BlogForm />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>
        </Routes>
      </Suspense>
    );
  }

  return (
    <PublicShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/works" element={<Works />} />
        <Route path="/store" element={<Store />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogContentPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PublicShell>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <ScrollToTop />
          <AppRoutes />
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
