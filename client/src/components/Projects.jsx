import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { HiArrowUpRight } from "react-icons/hi2";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import Asterisks from "./Asterisks";
import { projectsApi } from "../api/projects";
import LazyImage from "./common/LazyImage";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

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
  
  // Refs for animation
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const spanRef = useRef(null);
  const paragraphRef = useRef(null);
  const animationTriggered = useRef(false);

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

  // GSAP Animation for header contents
  useEffect(() => {
    if (!headingRef.current || !spanRef.current || !paragraphRef.current || animationTriggered.current) return;

    // Split the heading text into characters
    const headingSplit = new SplitText(headingRef.current, {
      type: "chars,words",
      charsClass: "char",
    });

    // Split the span text into characters
    const spanSplit = new SplitText(spanRef.current, {
      type: "chars,words",
      charsClass: "char",
    });

    // Set initial state: all characters hidden with 3D effect
    gsap.set([...headingSplit.chars, ...spanSplit.chars], {
      opacity: 0,
      y: 30,
      rotateX: -90,
      transformOrigin: "top center"
    });

    // Set initial state for paragraph
    gsap.set(paragraphRef.current, {
      opacity: 0,
      y: 20
    });

    // Create scroll-triggered animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none reset",
        onEnter: () => {
          animationTriggered.current = true;
        }
      }
    });

    // Animate heading characters
    timeline.to(headingSplit.chars, {
      duration: 0.06,
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: {
        amount: 0.6,
        from: "start",
        ease: "power2.out"
      },
      ease: "back.out(1.2)"
    });

    // Animate span characters (slight delay after heading)
    timeline.to(spanSplit.chars, {
      duration: 0.06,
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: {
        amount: 0.4,
        from: "start",
        ease: "power2.out"
      },
      ease: "back.out(1.2)"
    }, "-=0.3");

    // Fade in paragraph
    timeline.to(paragraphRef.current, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power2.out"
    }, "-=0.2");

    // Cleanup
    return () => {
      if (headingSplit) headingSplit.revert();
      if (spanSplit) spanSplit.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const scrollTo = (index) => {
    if (!scrollRef.current) return;
    const carousel = scrollRef.current;
    const card = carousel.children[index];
    if (!card) return;
    const left = card.getBoundingClientRect().left
      - carousel.getBoundingClientRect().left + carousel.scrollLeft;
    carousel.scrollTo({ left, behavior: "smooth" });
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
    <section ref={sectionRef} className="px-auto py-24 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* LEFT — TEXTS */}
        <div className="min-w-0 lg:w-1/3">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
            Real projects.
            <span ref={spanRef} className="block"> Real results.</span>
          </h1>
          <p ref={paragraphRef} className="text-gray-400 mt-6 text-lg">
            Carefully engineered websites designed to convert,
            scale, and stand out in competitive markets.
          </p>
        </div>

        {/* RIGHT — SKILLS + CARDS */}
        <div className="min-w-0 lg:w-2/3 relative">
          {/* Animated skills strip */}
          <div className="overflow-hidden mb-8">
            <div className="flex animate-scroll whitespace-nowrap uppercase text-gray-300 text-sm">
              {websiteTypes.concat(websiteTypes).map((type, i) => (
                <span key={i} className="flex items-center mr-6">
                  {type}
                  <Asterisks />
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
              <div className="w-[320px] max-w-full shrink-0 snap-start h-[380px] rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-sm px-6 text-center">
                Featured projects will appear here.
              </div>
            ) : (
              projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))
            )}
          </div>

          <div className="flex flex-row justify-between">
            {/* Pagination dots */}
            <div className="flex gap-3 mt-6">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`transition-all duration-300 ${
                    active === i
                      ? "w-8 h-1 mt-2 bg-yellow-400"
                      : "w-3 h-3 bg-gray-600 rounded-full"
                  }`}
                />
              ))}
            </div>

            {/* More projects */}
            <div className="mt-12 flex justify-end">
              <Link to="/works">
                <button className="cursor-pointer px-8 py-4 yellow text-black font-semibold rounded-4xl shadow-lg hover:scale-105 transition">
                  More
                </button>
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
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
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
          className="absolute top-2 right-2 w-14 h-14 rounded-lg yellow flex items-center justify-center shadow-lg hover:scale-110 transition z-10"
        >
          <HiArrowUpRight className="w-6 h-6 text-black" />
        </a>
      ) : (
        <Link
          to={detailHref}
          aria-label="View project"
          className="absolute top-2 right-2 w-14 h-14 rounded-lg yellow flex items-center justify-center shadow-lg hover:scale-110 transition z-10"
        >
          <HiArrowUpRight className="w-6 h-6 text-black" />
        </Link>
      )}
    </div>
  );
};

export default Projects;