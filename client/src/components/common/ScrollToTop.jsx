import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top whenever the route changes. Without this, navigating
 * from a long Works page to a Project Detail leaves the new page scrolled.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
