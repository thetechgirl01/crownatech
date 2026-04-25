import React from 'react';

const EmptyState = ({ title = 'Nothing here yet', message, action }) => (
  <div className="text-center py-20 px-6">
    <div className="mx-auto w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
      <span className="text-yellow-400 text-2xl" aria-hidden="true">·</span>
    </div>
    <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
    {message && <p className="text-white/60 max-w-md mx-auto">{message}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
