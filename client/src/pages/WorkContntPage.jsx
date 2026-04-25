import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WorkContentPage = () => {
  const heroRef = useRef(null);
  const imageRefs = useRef([]);
  const sectionRefs = useRef([]);
  
  // Project data
  const projectData = {
    logo: 'https://shakuro.com/logo-ajp.svg',
    title: 'Errandsbybrownie',
    description: 'World\'s fastest growing jiu jitsu tournament organization',
    excerpt: 'Professional Brazilian Jiu Jitsu organization with global events in over 40 countries worldwide.',
    
    sections: [
      {
        title: 'The jiu jitsu Mecca',
        text: 'AJP represents a unique synergy of a modern grass-roots combat subculture and a national sport in the UAE all due to the vision and support of jiu jitsu by Sheikh Mohammed bin Zayed.',
        image: 'https://images.unsplash.com/photo-1546717122-08b9d6d1ac75?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        wide: true
      },
      {
        title: 'The mission',
        text: 'We were brought in as a result of a concept design we delivered to showcase our passion for the sport as practitioners and as a token of gratitude to the organization that has elevated the level of professional jiu jitsu competition.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      },
      {
        title: 'Identity system',
        text: 'A dynamic but strict style dominated by dark theme and dramatic heroic effects in posters and event graphics.',
        features: ['Color palette inspired by desert colors', 'Logo geometry update', 'Sub-brands system', 'Distinct visual art style'],
        image: 'https://images.unsplash.com/photo-1511886929837-354d826aae2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        wide: true
      },
      {
        title: 'UI/UX design',
        text: 'Creating a welcoming platform while maintaining the technical complexity of a sports league.',
        features: ['Home page layout', 'Rankings system', 'Athlete profiles', 'Event management'],
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      }
    ],
    

    
    demoLink: 'https://demo.example.com',
    buyLink: 'https://buy.stripe.com/test_123456'
  };

  // GSAP animations
  useEffect(() => {
    // Hero animations
    const heroTl = gsap.timeline();
    heroTl
      .from('.hero-title', { y: 100, opacity: 0, duration: 1.2, ease: 'power3.out' })
      .from('.hero-description', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
      .from('.hero-excerpt', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .from('.hero-button', { y: 20, opacity: 0, stagger: 0.2, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.2');

    // Image animations
    imageRefs.current.forEach((img, i) => {
      if (img) {
        gsap.fromTo(img,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Section text animations
    sectionRefs.current.forEach((section, i) => {
      if (section) {
        gsap.fromTo(section.querySelectorAll('.section-content > *'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addImageRef = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const addSectionRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-blue-900"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Logo */}
            <div className="mb-12">
              <img 
                src={projectData.logo} 
                alt="AJP Logo" 
                className="h-20 w-auto opacity-90"
              />
            </div>
            
            {/* Title */}
            <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
              {projectData.title}
            </h1>
            
            {/* Description */}
            <h2 className="hero-description text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-8 font-light max-w-3xl">
              {projectData.description}
            </h2>
            
            {/* Excerpt */}
            <p className="hero-excerpt text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
              {projectData.excerpt}
            </p>

            {/* Stats */}
         

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={projectData.demoLink}
                className="hero-button bg-transparent border-2 border-white text-white px-8 py-4 rounded-none hover:bg-white hover:text-black transition-all duration-300 font-medium text-lg"
              >
                View Live Demo
              </a>
              <a
                href={projectData.buyLink}
                className="hero-button bg-white text-black px-8 py-4 rounded-none hover:bg-gray-200 transition-all duration-300 font-medium text-lg"
              >
                Buy Script · $149
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections with Images */}
      <div className="space-y-32 py-32">
        {projectData.sections.map((section, i) => (
          <div 
            key={i}
            ref={addSectionRef}
            className={`container mx-auto px-4 ${i % 2 === 0 ? '' : ''}`}
          >
            <div className={`max-w-6xl mx-auto ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} flex flex-col md:flex-row items-center gap-12 md:gap-24`}>
              {/* Image */}
              <div className={`md:w-1/2 ${section.wide ? 'md:w-2/3' : ''}`}>
                <div 
                  ref={addImageRef}
                  className={`overflow-hidden ${section.wide ? 'aspect-video' : 'aspect-square'}`}
                >
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="md:w-1/2 section-content">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {section.title}
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {section.text}
                </p>
                
                {section.features && (
                  <div className="space-y-3">
                    {section.features.map((feature, j) => (
                      <div key={j} className="flex items-center">
                        <span className="w-3 h-3 bg-blue-500 mr-3"></span>
                        <span className="text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-width showcase image */}
      <div className="py-32">
        <div className="container mx-auto px-4">
          <div 
            ref={addImageRef}
            className="max-w-6xl mx-auto overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="AJP Event Showcase"
              className="w-full h-[600px] object-cover scale-100 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to use this design?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Get the complete React implementation with GSAP animations, responsive images, and production-ready code.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href={projectData.demoLink}
              className="border-2 border-white text-white px-10 py-5 text-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              View Full Demo
            </a>
            <a
              href={projectData.buyLink}
              className="bg-white text-black px-10 py-5 text-lg hover:bg-gray-200 transition-all duration-300 font-medium"
            >
              Purchase Complete Script · $149
            </a>
          </div>
          <p className="text-gray-500 mt-8 text-sm">
            Includes all React components, GSAP animations, and image optimization
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkContentPage;