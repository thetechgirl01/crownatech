import WebsiteTypes from './WebsiteTypes';
import React, { useEffect, useRef, useState, useCallback } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { projectsApi } from "../api/projects";
import LazyImage from "./common/LazyImage";



/**
 * Home page "Real projects, real results" carousel.
 * Pulls featured/visible projects from the API. Falls back to an empty
 * state without breaking the layout if the API is unreachable.
 */
const Projects = () => {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ previous: false, next: false });
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

  const handleScroll = useCallback(() => {
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
    const previous = carousel.scrollLeft > 2;
    const next = carousel.scrollLeft < maxScroll - 2;
    setEdges(current => current.previous === previous && current.next === next ? current : { previous, next });
  }, []);

  useEffect(() => {
    const carousel = scrollRef.current;
    if (!carousel) return;
    const frame = requestAnimationFrame(handleScroll);
    const observer = window.ResizeObserver ? new ResizeObserver(handleScroll) : null;
    observer?.observe(carousel);
    window.addEventListener('resize', handleScroll);
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener('resize', handleScroll); };
  }, [loading, projects.length, handleScroll]);

  const move = direction => {
    const carousel = scrollRef.current;
    if (!carousel?.children.length) return;
    const firstLeft = carousel.children[0].getBoundingClientRect().left;
    const max = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const targets = Array.from(carousel.children).map(card => Math.min(card.getBoundingClientRect().left - firstLeft, max));
    const left = direction > 0
      ? targets.find(target => target > carousel.scrollLeft + 2) ?? max
      : targets.slice().reverse().find(target => target < carousel.scrollLeft - 2) ?? 0;
    carousel.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
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
          <WebsiteTypes />

          <div
            ref={scrollRef}
            id="featured-projects"
            role="region"
            aria-label="Featured projects"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={event => {
              if (event.target !== event.currentTarget) return;
              if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
              }
            }}
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
            <div className="flex gap-2" aria-label="Project carousel controls">
              <button type="button" className="ct-icon-button" aria-label="Previous projects" aria-controls="featured-projects" disabled={loading || projects.length < 2 || !edges.previous} onClick={() => move(-1)}><HiChevronLeft aria-hidden="true" /></button>
              <button type="button" className="ct-icon-button" aria-label="Next projects" aria-controls="featured-projects" disabled={loading || projects.length < 2 || !edges.next} onClick={() => move(1)}><HiChevronRight aria-hidden="true" /></button>
            </div>
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
          className="ct-project-action"
        >
          <HiArrowUpRight className="w-6 h-6 text-black" />
        </a>
      ) : (
        <Link
          to={detailHref}
          aria-label="View project"
          className="ct-project-action"
        >
          <HiArrowUpRight className="w-6 h-6 text-black" />
        </Link>
      )}
    </div>
  );
};

export default Projects;
