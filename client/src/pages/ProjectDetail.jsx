import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { projectsApi } from '../api/projects';
import Spinner from '../components/common/Spinner';
import LazyImage from '../components/common/LazyImage';
import SEO from '../components/common/SEO';

/**
 * Public dynamic project page — /projects/:slug
 * Renders hero, overview, design inspiration, gallery, testimonial,
 * and the right CTA (Visit Live Site for client work, Buy Script for
 * for-sale items).
 */
const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError('');
    projectsApi
      .getBySlug(slug)
      .then((res) => alive && setProject(res.data))
      .catch((err) =>
        alive &&
        setError(err?.response?.status === 404 ? 'Project not found' : 'Could not load project')
      )
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) return <Spinner fullScreen />;

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="text-center">
          <h1 className="ct-page-heading text-white text-3xl font-bold mb-3">{error || 'Project not found'}</h1>
          <Link to="/works" className="text-yellow-400 hover:underline">
            ← Back to Works
          </Link>
        </div>
      </div>
    );
  }

  const isStock = project.kind === 'stock';
  const ctaLabel = isStock
    ? `Buy Script${project.price ? ` · ${project.currency} ${project.price}` : ''}`
    : 'Visit Live Site';

  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <SEO
        title={project.title}
        description={project.tagline || project.description?.slice(0, 160)}
        image={project.heroImage?.url}
        type="article"
      />

      <article className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* Back */}
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-8"
        >
          <HiOutlineArrowLeft className="w-4 h-4" /> Back to Works
        </Link>

        {/* Title + meta */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="px-3 py-1 text-xs uppercase tracking-wide rounded-full bg-white/5 border border-white/10 text-white/70">
              {project.category}
            </span>
            {project.scriptAvailable && (
              <span className="px-3 py-1 text-xs uppercase tracking-wide rounded-full bg-yellow-400/20 text-yellow-400">
                Script Available
              </span>
            )}
          </div>
          <h1 className="ct-page-heading text-white font-bold leading-tight text-4xl sm:text-5xl md:text-6xl mb-4">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="text-white/70 text-lg sm:text-xl max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          )}
        </header>

        {/* Hero */}
        {project.heroImage?.url && (
          <div className="mb-16 rounded-3xl overflow-hidden bg-white/5 border border-white/10">
            <LazyImage
              src={project.heroImage.url}
              alt={project.heroImage.alt || project.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* CTA row (top) */}
        {project.externalLink && (
          <div className="mb-16 flex flex-wrap gap-4">
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-button ct-button-primary cursor-pointer inline-flex items-center gap-3 bg-yellow-400 text-black font-semibold py-4 px-8 rounded-full hover:bg-yellow-500  transition-all duration-300"
            >
              {ctaLabel}
              <span className="bg-black w-9 h-9 rounded-full flex items-center justify-center">
                <HiArrowUpRight className="w-4 h-4 text-white" />
              </span>
            </a>
          </div>
        )}

        {/* Overview */}
        {project.description && (
          <section className="mb-16">
            <h2 className="text-white font-bold text-2xl sm:text-3xl mb-5">Project overview</h2>
            <p className="text-white/70 text-lg leading-relaxed whitespace-pre-line max-w-3xl">
              {project.description}
            </p>
          </section>
        )}

        {/* Inspiration / process */}
        {project.inspiration && (
          <section className="mb-16">
            <h2 className="text-white font-bold text-2xl sm:text-3xl mb-5">Design inspiration</h2>
            <p className="text-white/70 text-lg leading-relaxed whitespace-pre-line max-w-3xl">
              {project.inspiration}
            </p>
          </section>
        )}

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-white font-bold text-2xl sm:text-3xl mb-6">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {project.gallery.map((img, i) => (
                <div
                  key={img.publicId || i}
                  className="rounded-2xl overflow-hidden bg-white/5 border border-white/10"
                >
                  <LazyImage
                    src={img.url}
                    alt={img.alt || `${project.title} gallery ${i + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonial */}
        {project.testimonial?.quote && (
          <section className="mb-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 backdrop-blur-xl">
              <p className="text-white text-xl sm:text-2xl leading-relaxed italic border-l-4 border-yellow-400 pl-6 mb-6">
                “{project.testimonial.quote}”
              </p>
              <div>
                <p className="text-white font-semibold">{project.testimonial.author}</p>
                {project.testimonial.role && (
                  <p className="text-muted text-sm">{project.testimonial.role}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        {project.externalLink && (
          <section className="text-center pt-8 border-t border-white/10">
            <h3 className="text-white font-bold text-2xl sm:text-3xl mb-4">
              {isStock ? 'Get this for your project' : 'See it in action'}
            </h3>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              {isStock
                ? 'Click below to head to checkout. Payment is handled by our gateway provider.'
                : 'Click below to visit the live site we built.'}
            </p>
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ct-button ct-button-primary inline-flex items-center gap-3 bg-yellow-400 text-black font-semibold py-4 px-10 rounded-full hover:bg-yellow-500  transition-all duration-300"
            >
              {ctaLabel}
              <span className="bg-black w-9 h-9 rounded-full flex items-center justify-center">
                <HiArrowUpRight className="w-4 h-4 text-white" />
              </span>
            </a>
          </section>
        )}
      </article>
    </div>
  );
};

export default ProjectDetail;
