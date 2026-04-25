import React, { useState, useEffect } from 'react';
import { HiArrowRight, HiX } from 'react-icons/hi';
import BookcallPick from '../assets/director.jpg';

const Bookcall = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      {/* Floating button with rotating words */}
      <div className={`fixed md:bottom-32 bottom-20 md:right-20  right-8 z-40 flex items-center justify-center`}>
        {/* Rotating text ring - larger on md+ screens */}
        <div className="absolute w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
          <div className="w-full h-full rounded-full animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                  fill="none"
                />
              </defs>
              {/* Responsive font size - larger on md+ screens */}
              <text 
                fill="#ccc"
                fontSize="9"
                className="md:text-[10px]"
                fontFamily="Arial, sans-serif"
                fontWeight="400"
                letterSpacing="3"
                textTransform="uppercase"
              >
                <textPath href="#circlePath" startOffset="0%">
                  15 MINUTES • FREE • CONSULT • 15 MINUTES • FREE • CONSULT •
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* Circular image button - slightly smaller on md+ to create more gap */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-18 h-18 md:w-20 md:h-20 rounded-full overflow-hidden  shadow-lg hover:scale-105 transition-transform duration-300 relative flex items-center justify-center bg-black"
        >
          <img 
            src={BookcallPick} 
            alt="Book a free consultation" 
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

      {/* Modal above the button */}
      {isOpen && (
        <>
          {/* Blur rest of page */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"></div>

          <div className="fixed bottom-[200px] md:bottom-[270px] right-0 md:right-40  z-50 flex flex-col items-end">
            {/* Close button outside modal */}
            <button
              onClick={() => setIsOpen(false)}
              className="mb-2 mr-2 w-8 h-8 rounded-full  flex items-center justify-center shadow-lg transition-colors"
            >
              <HiX className="text-white w-5 h-5" />
            </button>

            {/* Modal content */}
            <div className="bg-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-none shadow-xl max-w-sm w-full p-6 animate-fade-up">
              
              {/* Modal header flex justified */}
              <div className="flex justify-between items-center mb-3">
                <h2 className=" text-2xl font-semibold  text-gray-900 w-1/2 ">15 - minute consult</h2>
                <span className="mb-5 px-3 py-1 border-1 border-black text-sm font-light rounded-full bg-transparent text-black">
                  FREE
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm sm:text-base my-6">
                This is a quick free call with CrownaTech's design & development producer to talk about your project and figure out if there is a match.
              </p>

              {/* Book button */}
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center bg-black justify-between border-2 border-black rounded-full px-6 py-3 hover:bg-black/95 transition-all duration-300 text-black font-medium no-underline"
              >
                <span>Book a call</span>
                <span className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  <HiArrowRight className="text-black w-5 h-5 -rotate-45" />
                </span>
              </a>
            </div>
          </div>
        </>
      )}

     
    </>
  );
};

export default Bookcall;