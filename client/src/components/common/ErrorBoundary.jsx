import React from 'react';

/**
 * App-wide error boundary. Catches render errors and shows a friendly
 * fallback with a reload button instead of a blank screen.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Hook for error tracking (Sentry, LogRocket, etc.) later.
    // Swallow in production to avoid leaking stack traces.
    if (import.meta.env.DEV) {
      console.error('App error:', error, info);
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-xl">
            <h1 className="text-white text-2xl font-bold mb-3">Something went wrong</h1>
            <p className="text-muted mb-6">
              We hit an unexpected error. Please reload the page. if it keeps happening,
              get in touch.
            </p>
            <button
              onClick={this.handleReload}
              className="ct-button ct-button-primary px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
