import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';
import { projectsApi } from '../api/projects';
import { CardGridSkeleton } from '../components/common/CardSkeleton';
import EmptyState from '../components/common/EmptyState';
import LazyImage from '../components/common/LazyImage';
import SEO from '../components/common/SEO';

/**
 * Store — lists all projects with kind === 'stock'.
 * Each card links to /projects/:slug for the full detail page,
 * and shows a Buy button that redirects to the admin-supplied
 * payment link (Flutterwave / Paystack).
 */
const Store = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    projectsApi
      .list({ kind: 'stock' })
      .then((res) => alive && setItems(res.data || []))
      .catch(() => alive && setError('Could not load store items'))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="min-h-screen ct-page-content">
      <SEO
        title="Store"
        description="Buy ready-made scripts, templates, and stock projects from CrownaTech."
      />

      <div className="ct-container">
        <header className="mb-14">
          <h1 className="ct-page-heading text-white font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            Ready-to-launch templates.<br /><span className="ct-heading-secondary">Scripts for your next project.</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-3xl">
            Pick up the same production-grade builds we ship for clients. fully responsive,
            performance-tuned, and ready to deploy.
          </p>
        </header>

        {loading ? (
          <CardGridSkeleton count={6} />
        ) : error ? (
          <EmptyState title="Couldn't load store" message={error} />
        ) : items.length === 0 ? (
          <EmptyState
            title="The shelves are empty"
            message="No items are listed for sale right now. Check back soon."
            action={
              <Link
                to="/works"
                className="ct-button ct-button-primary inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition"
              >
                Browse our work
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item) => (
              <StoreCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StoreCard = ({ item }) => {
  const detailLink = `/projects/${item.slug}`;
  const buyLink = item.externalLink || detailLink;

  return (
    <article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/40 transition-colors group flex flex-col">
      <Link to={detailLink} aria-label={`View ${item.title}`} className="block relative aspect-[16/10] overflow-hidden">
        {item.heroImage?.url ? (
          <LazyImage
            src={item.heroImage.url}
            alt={item.title}
            className="w-full h-full object-cover  transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-white/5" />
        )}
        {item.scriptAvailable && (
          <span className="absolute top-3 left-3 px-3 py-1 text-[11px] uppercase tracking-wide rounded-full bg-yellow-400 text-black font-semibold">
            Script
          </span>
        )}
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
          <Link to={detailLink} className="hover:text-yellow-400 transition-colors">
            {item.title}
          </Link>
        </h3>
        {item.tagline && (
          <p className="text-muted text-sm mb-4 line-clamp-2">{item.tagline}</p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div>
            {item.price ? (
              <div>
                <p className="text-white text-2xl font-bold">
                  {item.currency || 'USD'} {item.price}
                </p>
                <p className="text-muted text-xs">One-time purchase</p>
              </div>
            ) : (
              <p className="text-muted text-sm">Contact for pricing</p>
            )}
          </div>
          <a
            href={buyLink}
            {...(item.externalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="ct-button ct-button-primary inline-flex items-center gap-2 px-4 py-2.5 bg-yellow-400 text-black rounded-full font-semibold text-sm hover:bg-yellow-500 transition"
          >
            Buy
            <HiArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default Store;
