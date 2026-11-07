/** Public project actions must never send visitors into a Stripe test checkout. */
export function publicProjectLink(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value);
    if (url.username || url.password || !['https:', 'http:'].includes(url.protocol)) return null;
    const stripe = url.hostname === 'stripe.com' || url.hostname.endsWith('.stripe.com');
    const path = decodeURIComponent(url.pathname).toLowerCase();
    if (stripe && (path.startsWith('/test_') || path.includes('cs_test_'))) return null;
    return url.href;
  } catch { return null; }
}
