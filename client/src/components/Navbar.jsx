import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tklogo from '../assets/tklogo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
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
    <>
      {/* NAVBAR - Fixed with highest z-index */}
      <nav
        className={`fixed w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-white/5 backdrop-blur-sm shadow-md text-black"
            : "bg-transparent text-white  backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to='/'>
            <div className="flex-shrink-0 w-10 h-10">
              <img src={Tklogo} alt="crownatech Logo" />
            </div>
            </Link>

            {/* Menu Button - Always clickable */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-11 h-11 flex items-center justify-center rounded-full overflow-visible cursor-pointer"
              aria-label="Toggle menu"
            >
              {/* Animated White Circle Background */}
              <span
                className={`absolute inset-0 rounded-full bg-white transition-all duration-500 ease-out ${
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
        className={`fixed inset-0 z-[90] bg-black transition-opacity duration-500 ${
          isOpen
            ? "opacity-40 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide Menu - 1/3 of screen width */}
      <aside
        className={`fixed top-0 right-0 h-screen z-[95] bg-gray-900/95 backdrop-blur-md
          transition-transform duration-700 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          w-full md:w-1/3 
          overflow-y-auto overflow-x-hidden`}
      >
        <div className="h-full flex flex-col items-start justify-center px-6 sm:px-8 md:px-10 mt-24">
          {/* Navigation Links - Centered container */}
          <div className="w-full mx-auto">
            <ul className="space-y-6 md:space-y-8 w-full mb-12">
              {navLinks.map((link, index) => (
                <li key={link.name} className="overflow-hidden">
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-2xl md:text-3xl font-light text-white 
                             tracking-tight hover:text-yellow-300 
                             transition-all duration-300 transform hover:translate-x-4
                             hover:opacity-80"
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      transform: isOpen ? 'translateX(0)' : 'translateX(100px)',
                      opacity: isOpen ? 1 : 0,
                      transition: `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms, 
                                   opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms, 
                                   color 0.3s ease`
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* "What we bring to the table" Section */}
            <div className="w-full mb-10"
              style={{
                transitionDelay: `${navLinks.length * 100 + 200}ms`,
                transform: isOpen ? 'translateX(0)' : 'translateX(100px)',
                opacity: isOpen ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${navLinks.length * 100 + 200}ms, 
                             opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${navLinks.length * 100 + 200}ms`
              }}
            >
              <h2 className="text-lg md:text-xl font-medium text-white mb-4">
                What we bring to the table:
              </h2>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li 
                    key={service} 
                    className="text-white/80 text-sm"
                    style={{
                      transitionDelay: `${navLinks.length * 100 + 300 + (index * 50)}ms`,
                      transform: isOpen ? 'translateX(0)' : 'translateX(50px)',
                      opacity: isOpen ? 1 : 0,
                      transition: `transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${navLinks.length * 100 + 300 + (index * 50)}ms, 
                                   opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${navLinks.length * 100 + 300 + (index * 50)}ms`
                    }}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Section */}
            <div className="w-full mb-10 overflow-hidden"
              style={{
                transitionDelay: `${navLinks.length * 100 + 500}ms`,
                transform: isOpen ? 'translateX(0)' : 'translateX(100px)',
                opacity: isOpen ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${navLinks.length * 100 + 500}ms, 
                             opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${navLinks.length * 100 + 500}ms`
              }}
            >
              <h2 className="text-lg md:text-xl font-medium text-white mb-4">
                Tools:
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tools.map((tool, index) => (
                  <li 
                    key={tool} 
                    className="text-white/70 text-sm"
                    style={{
                      transitionDelay: `${navLinks.length * 100 + 600 + (index * 30)}ms`,
                      transform: isOpen ? 'translateX(0)' : 'translateX(50px)',
                      opacity: isOpen ? 1 : 0,
                      transition: `transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${navLinks.length * 100 + 600 + (index * 30)}ms, 
                                   opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${navLinks.length * 100 + 600 + (index * 30)}ms`
                    }}
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}