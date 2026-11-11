import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top whenever the route changes. Without this, navigating
 * from a long Works page to a Project Detail leaves the new page scrolled.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    let id = hash.slice(1);
    try { id = decodeURIComponent(id); } catch { /* Keep malformed fragments harmless. */ }
    const target = id && document.getElementById(id);
    if (target) {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
      target.focus({ preventScroll: true });
    } else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
};

export default ScrollToTop;
