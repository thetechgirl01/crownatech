import React, { useRef, useEffect } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import gsap from 'gsap';
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const techneikRef = useRef(null);
  const overlayRef = useRef(null);

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

      gsap.fromTo(
        techneikRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 2.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        overlay,
        { y: 0 },
        { y: '-100%', duration: 2.2, ease: 'power3.out', delay: 0.1 }
      );
    }

    return () => {
      if (overlayRef.current?.parentNode) {
        overlayRef.current.parentNode.removeChild(overlayRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 sm:pt-24">
      <section className="w-full px-auto md:px-24 py-8 md:py-16">
        <div className="max-w-6xl w-full p-6 sm:p-8 md:p-12">
          <div className="flex flex-col items-start space-y-6 md:space-y-8 text-left bg">
            
            {/* Location */}
           

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

            {/* Subtitle */}
            <div className="space-y-2">
              <h2 className="text-blue-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
                CROWNATECH
              </h2>
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
                <button className="cursor-pointer flex items-center gap-2 bg-white rounded-full text-black font-semibold py-3 px-8  transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Get in touch
                  <span className='bg-black w-9 h-9 rounded-4xl '>
                    <HiArrowRight className="-rotate-45  text-white mx-auto my-2" />
                  </span>
                </button></Link>

               <Link to="works">
                <button className="cursor-pointer flex items-center gap-2 hover:border-2 border-white text-white font-semibold py-3 px-8 hover:rounded-4xl transition-all duration-300  hover:scale-105 hover:shadow-lg">
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