import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { HiArrowRight } from "react-icons/hi";
import { 
  MdLightbulb, 
  MdDesignServices, 
  MdCode, 
  MdRocketLaunch 
} from "react-icons/md";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const steps = [
  {
    title: "Idea & Research",
    description: "Understand client needs, research the market, and plan a strategy for success.",
    longDescription: "We dive deep into your vision, analyze market trends, and craft a strategic roadmap that ensures your project stands out from day one.",
    icon: MdLightbulb,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
  },
  {
    title: "Design & Prototype",
    description: "Create wireframes, UI/UX designs, and interactive prototypes for approval.",
    longDescription: "Our designers transform ideas into stunning visual experiences with interactive prototypes that feel real before a single line of code is written.",
    icon: MdDesignServices,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
  },
  {
    title: "Development",
    description: "Code the project using modern, scalable technologies with clean architecture.",
    longDescription: "We build with cutting-edge tech, writing clean, maintainable code that scales beautifully and performs flawlessly under pressure.",
    icon: MdCode,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
  },
  {
    title: "Launch & Support",
    description: "Deploy the project, monitor performance, and provide ongoing support.",
    longDescription: "We handle deployment, rigorous testing, and provide continuous support to ensure your digital product evolves with your business needs.",
    icon: MdRocketLaunch,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
  },
];

const Workprocess = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const animationTriggered = useRef(false);

  useEffect(() => {
    if (!headingRef.current || !paragraphRef.current || animationTriggered.current) return;

    const headingSplit = new SplitText(headingRef.current, {
      type: "chars,words",
      charsClass: "char",
    });

    gsap.set(headingSplit.chars, {
      opacity: 0,
      y: 50,
      rotateX: -90,
      transformOrigin: "top center"
    });

    gsap.set(paragraphRef.current, {
      opacity: 0,
      y: 30
    });

    gsap.set(".step-card", {
      opacity: 0,
      y: 50,
      scale: 0.9
    });

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

    timeline.to(headingSplit.chars, {
      duration: 0.08,
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: {
        amount: 0.8,
        from: "start",
        ease: "power3.out"
      },
      ease: "back.out(1.4)"
    });

    timeline.to(paragraphRef.current, {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: "power3.out"
    }, "-=0.4");

    timeline.to(".step-card", {
      duration: 0.6,
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: {
        amount: 0.4,
        from: "start",
        ease: "power2.out"
      },
      ease: "back.out(0.8)"
    }, "-=0.2");

    return () => {
      if (headingSplit) headingSplit.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="min-h-fit py-16 sm:py-20 md:py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse top-20 -left-48" />
        <div className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000 bottom-20 -right-48" />
        <div className="absolute w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-700 top-1/2 left-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4">
         
          </div>
          <h1 
            ref={headingRef}
            className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6"
          >
            Our Work Process
          </h1>
          <p 
            ref={paragraphRef}
            className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            A clear and simple 4-step process to ensure every project is delivered efficiently and with excellence.
          </p>
        </header>

        {/* 4 Boxes Grid - Enhanced with Interactive Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className="step-card group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glass morphism card */}
                <div className="
                  backdrop-blur-xl bg-white/5
                  border border-white/10
                  rounded-2xl
                  p-6 md:p-8
                  hover:bg-white/10
                  hover:-translate-y-2
                  transition-all duration-500
                  h-full
                  relative
                  overflow-hidden
                  cursor-pointer
                ">
                  {/* Animated gradient background on hover */}
                  <div className="
                    absolute inset-0 
                    bg-gradient-to-br from-yellow-400/0 via-transparent to-transparent
                    group-hover:from-yellow-400/10
                    transition-all duration-700
                  " />
                  
                  {/* Step Number with yellow accent - Animated */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="
                      w-14 h-14
                      bg-gradient-to-br from-yellow-400 to-yellow-600
                      rounded-xl
                      flex items-center justify-center
                      shadow-lg
                      transform transition-all duration-300
                      group-hover:scale-110 group-hover:rotate-6
                    ">
                      <IconComponent className="w-7 h-7 text-black" />
                    </div>
                    <div className="
                      text-yellow-400/20
                      font-bold
                      text-6xl
                      absolute top-4 right-4
                      transition-all duration-300
                      group-hover:text-yellow-400/40 group-hover:scale-110
                    ">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="
                    text-white 
                    font-semibold 
                    text-xl sm:text-2xl 
                    mb-3
                    relative
                    transition-all duration-300
                    group-hover:text-yellow-400
                  ">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="
                    text-gray-400 
                    text-sm sm:text-base 
                    leading-relaxed
                    relative
                    transition-all duration-300
                  ">
                    {step.description}
                  </p>

                  {/* Interactive Image Preview on Hover */}
                  <div className={`
                    absolute inset-0 rounded-2xl overflow-hidden pointer-events-none
                    transition-all duration-500 ease-out
                    ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                  `}>
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />
                  </div>

                  {/* Animated underline */}
                  <div className="
                    absolute bottom-0 left-0 right-0
                    h-0.5
                    bg-gradient-to-r from-yellow-400 via-transparent to-transparent
                    scale-x-0 group-hover:scale-x-100
                    transition-transform duration-500
                    origin-left
                  " />

                  {/* Learn more link */}
                  <div className="
                    mt-4
                    opacity-0 group-hover:opacity-100
                    transform translate-y-2 group-hover:translate-y-0
                    transition-all duration-300
                  ">
                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Timeline Bar */}
        <div className="mt-16 sm:mt-20 relative">
          <div className="hidden lg:flex justify-between items-center relative">
            {steps.map((_, index) => (
              <div key={index} className="flex-1 relative">
                <div className="flex justify-center">
                  <div className="
                    w-4 h-4 
                    bg-yellow-400 
                    rounded-full 
                    relative z-10
                    transition-all duration-300
                    hover:scale-150 hover:bg-yellow-500
                    cursor-pointer
                  " />
                </div>
              </div>
            ))}
            {/* Progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-500" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <button className="ct-button ct-button-primary
            group
            inline-flex items-center gap-2
            bg-yellow-400
            text-black font-semibold
            px-6 sm:px-8 py-3 sm:py-4
            rounded-full
            hover:scale-105
            transition-all duration-300
            shadow-lg hover:shadow-yellow-400/20
            relative overflow-hidden
          ">
            <span className="relative z-10">Start Your Project</span>
            <HiArrowRight className="
              relative z-10
              w-4 h-4 sm:w-5 sm:h-5
              group-hover:translate-x-1
              transition-transform
            " />
            
            {/* Ripple effect on hover */}
            <div className="
              absolute inset-0 bg-yellow-500
              transform scale-x-0 group-hover:scale-x-100
              transition-transform duration-300 origin-left
            " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workprocess;