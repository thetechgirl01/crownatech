import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO meta tag wrapper. Uses sensible CrownaTech defaults and lets
 * each page override only what it needs.
 *
 *   <SEO title="Works" description="..." image="/og.png" />
 */
const SITE_NAME = 'CrownaTech';
const DEFAULT_DESC =
  'CrownaTech is a creative web design & development studio building software solutions for businesses and startups with taste.';
const DEFAULT_KEYWORDS =
  'crownatech, remote web design, web development, software agency, mern stack, react developer';

const SEO = ({
  title,
  description = DEFAULT_DESC,
  keywords = DEFAULT_KEYWORDS,
  image,
  url,
  type = 'website',
  noIndex = false,
}) => {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} | Creative Web Solutions`;
  const canonical = url || (typeof window !== 'undefined' ? window.location.href : undefined);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {noIndex && <meta name="robots" content="noindex" />}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
