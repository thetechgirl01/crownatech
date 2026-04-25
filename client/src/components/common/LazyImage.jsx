import React, { useState } from 'react';

/**
 * Image with native lazy loading + a low-key skeleton background while it loads.
 * Drop-in replacement for <img />; keeps any extra props.
 */
const LazyImage = ({ src, alt = '', className = '', ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-500 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={!loaded ? { backgroundColor: 'rgba(255,255,255,0.04)' } : undefined}
      {...rest}
    />
  );
};

export default LazyImage;
