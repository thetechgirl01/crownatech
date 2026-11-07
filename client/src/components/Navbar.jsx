import useDialog from '../hooks/useDialog';
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Tklogo from '../assets/tklogo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  useDialog(isOpen, () => setIsOpen(false), menuRef);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Works", path: "/works" },
    { name: "Store", path: "/store" },
    { name: "About Us", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Get in Touch", path: "/contact" },
  ];

  const services = [
    "Custom web development",
    "Web Design",
    "Content marketing"
  ];

  const tools = [
    'JavaScript', 'React', 'Node', 'Express',
    'Bootstrap', 'jQuery', 'PHP', 'MySQL',
    'MongoDB', 'Git', 'GitHub', 'Figma',
    'WordPress'
  ];

  return (
    <div ref={menuRef} role={isOpen ? "dialog" : undefined} aria-modal={isOpen ? true : undefined} aria-label={isOpen ? "Site navigation" : undefined} tabIndex={isOpen ? -1 : undefined}>
      {/* NAVBAR - Fixed with highest z-index */}
      <nav
        className={`fixed w-full z-[100] transition-colors duration-200 ${
          scrolled
            ? "bg-brand/95 backdrop-blur-sm border-b border-white/10 text-white"
            : "bg-brand/80 text-white backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to='/' onClick={() => setIsOpen(false)} aria-label="Crownatech home">
            <div className="flex-shrink-0 w-10 h-10">
              <img src={Tklogo} alt="crownatech Logo" />
            </div>
            </Link>

            {/* Menu Button - Always clickable */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-11 h-11 flex items-center justify-center rounded-full overflow-visible cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="site-menu"
            >
              {/* Animated White Circle Background */}
              <span
                className={`absolute inset-0 rounded-full bg-white transition-all duration-200 ease-out ${
                  isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />

              {/* Menu Icon Container */}
              <span className="relative w-6 h-5 flex items-center justify-center ">
                {/* Two-line Hamburger Menu (when closed) */}
                {!isOpen ? (
                  <span className="flex flex-col gap-1.5 w-full">
                    <span className="block h-[2px] w-full bg-white rounded-full transition-all duration-300" />
                    <span className="block h-[2px] w-3/4 bg-white rounded-full transition-all duration-300" />
                  </span>
                ) : (
                  /* X Icon (when open) */
                  <span className="relative w-5 h-5">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-[2px] bg-black rotate-45 rounded-full" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-[2px] bg-black -rotate-45 rounded-full" />
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay - Behind nav but above content */}
      <div
        className={`fixed inset-0 z-[90] bg-black transition-opacity duration-200 ${
          isOpen
            ? "opacity-40 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out navigation */}
      <aside
        id="site-menu"
        inert={!isOpen}
        tabIndex={-1}
        className={`ct-menu fixed top-0 right-0 h-dvh z-[95] bg-brand
          transition-transform duration-200 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          w-full md:w-[min(28rem,50vw)]
          overflow-y-auto overflow-x-hidden`}
      >
        <div className="min-h-full flex flex-col items-start px-6 sm:px-8 py-24">
          {/* Navigation Links */}
          <div className="w-full mx-auto">
            <ul className="space-y-6 md:space-y-8 w-full mb-12">
              {navLinks.map((link) => (
                <li key={link.name} className="overflow-hidden">
                  <Link
                    to={link.path}
                    data-dialog-initial-focus={link.path === "/" ? "true" : undefined}
                    onClick={() => setIsOpen(false)}
                    className="block py-1 text-2xl md:text-3xl font-light text-white hover:text-yellow-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* "What we bring to the table" Section */}
            <div className="w-full mb-10"
            >
              <h2 className="text-lg md:text-xl font-medium text-white mb-4">
                What we bring to the table:
              </h2>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li
                    key={service}
                    className="text-white/80 text-sm"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Section */}
            <div className="w-full mb-10 overflow-hidden"
            >
              <h2 className="text-lg md:text-xl font-medium text-white mb-4">
                Tools:
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tools.map((tool) => (
                  <li
                    key={tool}
                    className="text-white/70 text-sm"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
