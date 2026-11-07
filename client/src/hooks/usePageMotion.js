import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Progressive enhancement: CSS never hides content; each selected region plays once. */
export default function usePageMotion(rootRef) {
  const { pathname } = useLocation();
  useEffect(() => {
    const root = rootRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || preference.matches || !window.IntersectionObserver || !Element.prototype.animate) return;
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        observer.unobserve(target);
        const wordmark = target.hasAttribute('data-wordmark');
        try {
          const animation = target.animate([
            { opacity: wordmark ? .9 : .82, transform: wordmark ? 'translateX(-10px) scale(.985)' : 'translateY(12px)' },
            { opacity: 1, transform: 'none' },
          ], { duration: wordmark ? 320 : 380, easing: 'cubic-bezier(.2,.7,.2,1)' });
          animations.add(animation);
          animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
        } catch { /* Unsupported animation options leave the original content visible. */ }
      });
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    root.querySelectorAll('[data-reveal], [data-wordmark]').forEach(target => {
      if (target.hasAttribute('data-wordmark') || target.getBoundingClientRect().top >= window.innerHeight * .8) observer.observe(target);
    });
    const stop = () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); animations.clear(); };
    preference.addEventListener('change', stop);
    return () => { stop(); preference.removeEventListener('change', stop); };
  }, [pathname, rootRef]);
}
