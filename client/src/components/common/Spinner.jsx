import React from 'react';

/**
 * Centered loading spinner. Matches the goldenrod accent of the site.
 * Pass `fullScreen` to take the whole viewport (used while auth is hydrating).
 */
const Spinner = ({ fullScreen = false, label = 'Loading…' }) => {
  const wrap = fullScreen
    ? 'min-h-screen flex items-center justify-center bg'
    : 'flex items-center justify-center py-12';

  return (
    <div className={wrap} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 rounded-full border-2 border-white/20 border-t-yellow-400 animate-spin"
          aria-hidden="true"
        />
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
};

export default Spinner;
