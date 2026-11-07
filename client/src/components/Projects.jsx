import React, { useEffect, useRef, useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { projectsApi } from "../api/projects";
import LazyImage from "./common/LazyImage";

const websiteTypes = [
  "E-commerce", "Portfolio", "Blog", "Landing Page",
  "Corporate", "SaaS", "Web App", "Web3", "Real Estate",
];

/**
 * Home page "Real projects, real results" carousel.
 * Pulls featured/visible projects from the API. Falls back to an empty
 * state without breaking the layout if the API is unreachable.
 */
const Projects = () => {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let alive = true;
    projectsApi
      .list({ featured: 'true' })
      .then((res) => {
        if (!alive) return;
        // If no featured exist, fall back to the first 6 visible projects
        const list = (res.data && res.data.length ? res.data : null);
        if (list) return setProjects(list.slice(0, 6));
        return projectsApi.list().then((r) => {
          if (alive) setProjects((r.data || []).slice(0, 6));
        });
      })
      .catch(() => alive && setProjects([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const scrollTo = (index) => {
    if (!scrollRef.current) return;
    const carousel = scrollRef.current;
    const card = carousel.children[index];
    if (!card) return;
    const left = card.getBoundingClientRect().left
      - carousel.getBoundingClientRect().left + carousel.scrollLeft;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    carousel.scrollTo({ left, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const carousel = scrollRef.current;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const firstCard = carousel.children[0];
    if (!firstCard) return;
    const firstLeft = firstCard.getBoundingClientRect().left;
    let nearest = 0;
    let distance = Infinity;
    Array.from(carousel.children).forEach((card, index) => {
      const target = Math.min(card.getBoundingClientRect().left - firstLeft, maxScroll);
      const currentDistance = Math.abs(carousel.scrollLeft - target);
      if (currentDistance < distance || (maxScroll > 0 && currentDistance === distance)) {
        nearest = index;
        distance = currentDistance;
      }
    });
    setActive(nearest);
  };

  return (
    <section className="ct-container ct-section">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* LEFT — TEXTS */}
        <div className="min-w-0 lg:w-1/3">
          <h2 className="ct-section-title text-4xl sm:text-5xl font-bold leading-tight text-white">
            Real projects.
            <span className="block"> Real results.</span>
          </h2>
          <p className="text-gray-400 mt-6 text-lg">
            Carefully engineered websites designed to convert,
            scale, and stand out in competitive markets.
          </p>
        </div>

        {/* RIGHT — SKILLS + CARDS */}
        <div className="min-w-0 lg:w-2/3 relative">
          {/* Animated skills strip */}
          <div className="overflow-hidden mb-8">
            <div className="flex flex-wrap gap-x-5 gap-y-3 uppercase text-muted text-xs">
              {websiteTypes.map((type, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  {type}
                  <span className="w-1 h-1 rounded-full bg-yellow-400" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 text-gray-500">
            <HiChevronLeft className="w-5 h-5" />
          </div>
          <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 text-gray-500">
            <HiChevronRight className="w-5 h-5" />
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 hide-scrollbar"
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[320px] max-w-full shrink-0 snap-start h-[380px] rounded-3xl bg-white/5 border border-white/10 animate-pulse"
                />
              ))
            ) : projects.length === 0 ? (
              <div className="w-[320px] max-w-full shrink-0 snap-start h-[380px] rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-muted text-sm px-6 text-center">
                Featured projects will appear here.
              </div>
            ) : (
              projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            {/* Pagination dots */}
            <div className="flex flex-wrap gap-1">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                  aria-current={active === i ? "true" : undefined}
                  className="ct-carousel-dot"
                >
                  <span aria-hidden="true" className={active === i ? "w-8 h-1 rounded-full bg-yellow-400" : "w-2 h-2 rounded-full bg-gray-400"} />
                </button>
              ))}
            </div>

            {/* More projects */}
            <div className="flex justify-end">
              <Link to="/works" className="ct-button ct-button-primary">
                  More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const detailHref = `/projects/${project.slug}`;
  const ext = project.externalLink;
  return (
    <div className="relative w-[320px] max-w-full shrink-0 snap-start">
      <Link to={detailHref} aria-label={`View ${project.title}`}>
        <div
          className="relative h-[380px] rounded-3xl overflow-hidden bg-black group cursor-pointer"
          style={{
            clipPath: `polygon(0 0, 76% 0, 76% 20%, 100% 20%, 100% 100%, 0 100%)`
          }}
        >
          {project.heroImage?.url ? (
            <LazyImage
              src={project.heroImage.url}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80  transition-transform duration-200"
            />
          ) : (
            <div className="absolute inset-0 bg-white/5" />
          )}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
            <h3 className="text-white font-semibold uppercase text-lg line-clamp-2">
              {project.title}
            </h3>
          </div>
        </div>
      </Link>

      {/* Corner button → external if available, else detail */}
      {ext ? (
        <a
          href={ext}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={project.kind === 'stock' ? 'Buy script' : 'Visit live site'}
          className="absolute top-2 right-2 w-14 h-14 rounded-lg yellow flex items-center justify-center shadow-lg  transition z-10"
        >
          <HiArrowUpRight className="w-6 h-6 text-black" />
        </a>
      ) : (
        <Link
          to={detailHref}
          aria-label="View project"
          className="absolute top-2 right-2 w-14 h-14 rounded-lg yellow flex items-center justify-center shadow-lg  transition z-10"
        >
          <HiArrowUpRight className="w-6 h-6 text-black" />
        </Link>
      )}
    </div>
  );
};

export default Projects;
