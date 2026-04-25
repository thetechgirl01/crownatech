import React from 'react';

/**
 * Pulsing card skeleton used while project / blog lists are loading.
 * Mirrors the proportions of the real cards so the layout doesn't jump.
 */
export const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[380px] rounded-3xl bg-white/5 border border-white/10" />
    <div className="mt-6 space-y-3">
      <div className="h-3 w-24 bg-white/10 rounded" />
      <div className="h-5 w-3/4 bg-white/10 rounded" />
      <div className="h-3 w-full bg-white/10 rounded" />
      <div className="h-3 w-5/6 bg-white/10 rounded" />
    </div>
  </div>
);

export const CardGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export default CardSkeleton;
