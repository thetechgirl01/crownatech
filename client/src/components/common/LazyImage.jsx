/** Native loading with visible defaults; callers can prioritize above-fold images. */
const LazyImage = ({ src, alt = '', className = '', ...rest }) => (
  <img src={src} alt={alt} loading="lazy" decoding="async" className={className} {...rest} />
);
export default LazyImage;
