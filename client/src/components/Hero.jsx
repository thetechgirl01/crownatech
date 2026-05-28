import React, { useRef, useEffect } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import gsap from 'gsap';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const techneikRef = useRef(null);
  const overlayRef = useRef(null);
  const crownTechRef = useRef(null);
  const underlineRef = useRef(null);

  // GSAP intro animation
  useEffect(() => {
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.inset = '0';
    overlay.style.backgroundColor = '#011936';
    overlay.style.zIndex = '1';

    if (techneikRef.current) {
      techneikRef.current.style.position = 'relative';
      techneikRef.current.appendChild(overlay);
      overlayRef.current = overlay;

      // Main title animation
      const mainTimeline = gsap.timeline();
      
      mainTimeline.fromTo(
        techneikRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.2, ease: 'power3.out' }
      );

      mainTimeline.fromTo(
        overlay,
        { y: 0 },
        { y: '-100%', duration: 2.2, ease: 'power3.out', delay: 0.1 },
        "-=2.2"
      );

      // After main animation concludes, animate the CrownTech underline
      mainTimeline.fromTo(
        underlineRef.current,
        { width: '0%', opacity: 0 },
        { 
          width: '100%', 
          opacity: 1, 
          duration: 0.8, 
          ease: 'back.out(1.2)',
          onStart: () => {
            // Ensure underline is visible and styled
            if (underlineRef.current) {
              underlineRef.current.style.display = 'block';
            }
          }
        },
        "+=0.2" // Small delay after main animation finishes
      );
    }

    return () => {
      if (overlayRef.current?.parentNode) {
        overlayRef.current.parentNode.removeChild(overlayRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="w-full">
          <div className="flex flex-col items-start space-y-6 md:space-y-8 text-left">
            
            {/* Title */}
            <div className="space-y-4">
              <h1
                ref={techneikRef}
                className="
                  text-white
                  text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                  font-bold
                  leading-tight md:leading-none
                  inline-block
                  relative
                  overflow-hidden
                "
              >
                Web design & development company
              </h1>
            </div>

            {/* Subtitle with animated underline */}
            <div className="space-y-2 relative inline-block">
              <h2 
                ref={crownTechRef}
                className="text-blue-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold relative inline-block"
              >
                CROWNATECH
              </h2>
              {/* Animated underline that appears after main animation */}
              <span
                ref={underlineRef}
                className="absolute bottom-0 left-0 h-1 bg-yellow-400 rounded-full hidden"
                style={{ 
                  width: '0%',
                  background: 'linear-gradient(90deg, #fbbf24, #f59e0b)'
                }}
              />
            </div>

            {/* Description */}
            <div className="space-y-4 max-w-3xl">
              <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl">
                A creative code studio focused on building software solutions
                for businesses and startups with taste.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-wrap gap-4 md:gap-6">
                <Link to="contact"> 
                  <button className="cursor-pointer flex items-center gap-2 bg-white rounded-full text-black font-semibold py-3 px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    Let's talk
                    <span className='bg-black w-9 h-9 rounded-full inline-flex items-center justify-center'>
                      <HiArrowRight className="-rotate-45 text-white" />
                    </span>
                  </button>
                </Link>

                <Link to="works">
                  <button className="cursor-pointer flex items-center gap-2 hover:border-2 border-white text-white font-semibold py-3 px-8 hover:rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg border-b ">
                    Works
                    <AiOutlineArrowRight className="-rotate-45" />
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;