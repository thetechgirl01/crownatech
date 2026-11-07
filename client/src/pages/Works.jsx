import React, { useEffect, useMemo, useState } from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { projectsApi } from '../api/projects';
import Contact from '../components/Contact';
import { CardGridSkeleton } from '../components/common/CardSkeleton';
import EmptyState from '../components/common/EmptyState';
import LazyImage from '../components/common/LazyImage';
import SEO from '../components/common/SEO';

/**
 * Public Works page. Mirrors the original design (clip-path card,
 * left-staggered grid, industry filters) but pulls projects from the API.
 *
 * Filters operate on the `industries` array stored on each project,
 * which mirrors what was previously hardcoded ("Featured", "Web Design
 * & Development", "Logo Design", "Stock").
 */
const Works = () => {
  const industries = ['Featured', 'Web Design & Development', 'Logo Design', 'Stock'];

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState(['Featured']);

  useEffect(() => {
    let alive = true;
    projectsApi
      .list()
      .then((res) => alive && setProjects(res.data || []))
      .catch(() => alive && setError('Could not load projects'))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!selectedIndustries.length) return projects;
    return projects.filter((p) =>
      (p.industries || []).some((ind) => selectedIndustries.includes(ind))
    );
  }, [projects, selectedIndustries]);

  const handleIndustryClick = (industry) => {
    setSelectedIndustries((prev) => {
      const has = prev.includes(industry);
      const next = has ? prev.filter((i) => i !== industry) : [...prev, industry];
      // Always keep at least one filter active so the page doesn't go empty
      return next.length === 0 ? ['Featured'] : next;
    });
  };

  return (
    <div className="min-h-screen ct-page-content">
      <SEO
        title="Works"
        description="Selected projects from CrownaTech. websites, ecommerce platforms, brand systems, and more."
      />

      <div className="ct-container">
      <header className="mb-12 sm:mb-16">
        <h1 className="ct-page-heading text-white font-bold leading-tight max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1 bg">
          We help businesses achieve their goals.<br /><span className="ct-heading-secondary">By solving real, meaningful problems.</span>
        </h1>
      </header>

      {/* Filters */}
      <div className="bg mb-10">
        <div className="flex flex-wrap gap-3">
          {industries.map((item) => (
            <button
              key={item}
              onClick={() => handleIndustryClick(item)}
              aria-pressed={selectedIndustries.includes(item)}
              className={`ct-filter ${
                selectedIndustries.includes(item)
                  ? 'ct-filter-active'
                  : 'text-white hover:text-yellow-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section aria-label="Selected projects">
        {loading ? (
          <CardGridSkeleton count={6} />
        ) : error ? (
          <EmptyState title="Couldn't load Works" message={error} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No projects in this category yet"
            message="Try a different filter or check back soon."
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 sm:gap-y-24 md:gap-y-0 gap-y-24">
            {filtered.map((work, index) => (
              <div key={work._id} className={index % 2 === 1 ? 'lg:mt-96' : ''}>
                <ProjectCard project={work} />

                {/* Tags */}
                {work.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6 mb-4">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs uppercase tracking-wide text-gray-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title (links to detail page) */}
                <Link to={`/projects/${work.slug}`}>
                  <h3 className="text-3xl font-bold text-white mb-4 hover:text-yellow-300 transition">
                    {work.title}
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-gray-400 text-lg">
                  {work.tagline || work.description?.slice(0, 200)}
                </p>

                {/* Script badge if applicable */}
                {work.scriptAvailable && (
                  <span className="inline-block mt-4 px-3 py-1 text-xs mb-20 uppercase tracking-wide rounded-full bg-yellow-400/20 text-yellow-400">
                    Script Available
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
      </div>

      <Contact />
    </div>
  );
};

/**
 * Card preserves the original clip-path silhouette. The whole card
 * (image area) is now a Link to the detail page; the corner button
 * still goes to the external live site / payment link.
 */
const ProjectCard = ({ project }) => {
  const isStock = project.kind === 'stock';
  const ext = project.externalLink;
  return (
    <div className="relative min-w-0 w-full mt-8 lg:mt-20">
      <Link to={`/projects/${project.slug}`} aria-label={`View ${project.title}`}>
        <div
          className="relative h-[480px] rounded-3xl overflow-hidden group cursor-pointer"
          style={{
            clipPath:
              'polygon(0 0, 76% 0, 76% 18%, 100% 18%, 100% 100%, 0 100%)',
          }}
        >
          {project.heroImage?.url ? (
            <LazyImage
              src={project.heroImage.url}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80  transition duration-200"
            />
          ) : (
            <div className="absolute inset-0 bg-white/5" />
          )}
        </div>
      </Link>

      {/* Corner button — external link if present, else falls through to detail */}
      {ext ? (
        <a
          href={ext}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={isStock ? 'Buy script' : 'Visit live site'}
          className="absolute top-2 right-2 w-20 h-14 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 rounded-lg bg-yellow-500 flex items-center justify-center shadow-lg  transition z-10"
        >
          <HiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
        </a>
      ) : (
        <Link
          to={`/projects/${project.slug}`}
          aria-label="View project"
          className="absolute top-2 right-2 w-20 h-14 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 rounded-lg bg-yellow-500 flex items-center justify-center shadow-lg  transition z-10"
        >
          <HiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black" />
        </Link>
      )}
    </div>
  );
};

export default Works;
