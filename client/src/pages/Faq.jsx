import React, { useState, useEffect, useRef } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import gsap from 'gsap';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqRef = useRef(null);
  const itemRefs = useRef([]);

  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer: "Timeline varies by complexity: simple websites take 2-4 weeks, business sites 4-6 weeks, and complex applications 8-12 weeks. We provide a detailed timeline during consultation."
    },
    {
      question: "What is your pricing structure?",
      answer: "We offer transparent project-based pricing. Basic websites start at $1,500, business sites at $3,000-$7,000, e-commerce at $5,000-$15,000, and custom applications from $10,000+."
    },
    {
      question: "Do you offer post-launch support?",
      answer: "Yes, we provide comprehensive maintenance packages including security updates, performance monitoring, content updates, and technical support with monthly, quarterly, or annual plans."
    },
    {
      question: "What technologies do you use?",
      answer: "We use modern stacks: React/Next.js for frontend, Node.js/Express for backend, MongoDB/PostgreSQL for databases, and Tailwind CSS for styling. We choose based on project needs."
    },
    {
      question: "Can you work with existing websites?",
      answer: "Absolutely. We specialize in redesigns, updates, and migrations. We can improve performance, add features, or rebuild with modern tech while maintaining your brand identity."
    },
    {
      question: "Is the website mobile-responsive?",
      answer: "Yes, all our websites are built mobile-first and tested across all devices and browsers to ensure perfect performance and consistent user experience everywhere."
    },
    {
      question: "Who owns the website after completion?",
      answer: "You own 100% of the website, design, and custom code. We transfer all rights upon final payment. Source code and assets are delivered to you."
    },
    {
      question: "What's included in your hosting services?",
      answer: "Our managed hosting includes automatic backups, SSL certificates, 24/7 monitoring, security updates, and performance optimization. We can also help set up third-party hosting."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    
    // GSAP animation for opening/closing
    if (itemRefs.current[index]) {
      const answerElement = itemRefs.current[index].querySelector('.faq-answer');
      const chevron = itemRefs.current[index].querySelector('.faq-chevron');
      
      if (activeIndex === index) {
        // Closing animation
        gsap.to(answerElement, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(chevron, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        // Opening animation
        gsap.to(answerElement, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(chevron, {
          rotation: 180,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Close previously opened FAQ
        if (activeIndex !== null && itemRefs.current[activeIndex]) {
          const prevAnswer = itemRefs.current[activeIndex].querySelector('.faq-answer');
          const prevChevron = itemRefs.current[activeIndex].querySelector('.faq-chevron');
          gsap.to(prevAnswer, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(prevChevron, {
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    }
  };

  // GSAP page entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".faq-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      // FAQ items staggered animation
      gsap.from(".faq-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: "power3.out"
      });

      // Icon animation
      gsap.from(".faq-icon", {
        scale: 0,
        rotation: 180,
        duration: 1,
        delay: 0.3,
        ease: "back.out(1.7)"
      });

    }, faqRef);

    return () => ctx.revert();
  }, []);

  // Hover animation for FAQ items
  const handleMouseEnter = (index) => {
    gsap.to(itemRefs.current[index], {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(itemRefs.current[index], {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div ref={faqRef} className="min-h-screen py-10 sm:py-16">
      
      {/* HERO HEADER */}
      <header className="faq-header px-4 sm:px-6 max-w-7xl mx-auto mb-12 sm:mb-20">
        <div className="flex flex-col lg:flex-row justify-between gap-8 items-center">
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="
                faq-icon
                w-12 h-12
                bg-gradient-to-br from-blue-500 to-purple-600
                rounded-xl
                flex items-center justify-center
              ">
                <FaQuestionCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white/70 text-sm font-medium uppercase tracking-wider">
                  Frequently Asked
                </h2>
                <h1 className="
                  text-white font-bold leading-tight
                  text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                  mt-1
                ">
                  Questions Answered
                </h1>
              </div>
            </div>
            
            <p className="
              text-white/70
              text-base sm:text-lg md:text-xl
              leading-relaxed mt-4 max-w-2xl
            ">
              Get quick answers to the most common questions about our web development services.
            </p>
          </div>

          {/* STATS CARD */}
          <div className="
            faq-item
            backdrop-blur-xl bg-white/5
            border border-white/10
            rounded-2xl
            p-6 sm:p-8
            max-w-sm w-full
          ">
            <div className="text-center">
              <div className="
                w-16 h-16
                bg-gradient-to-br from-blue-500 to-purple-600
                rounded-xl
                flex items-center justify-center
                mx-auto mb-4
              ">
                <span className="text-white text-2xl font-bold">8</span>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">
                Common Questions
              </h3>
              <p className="text-blue-300 text-sm mb-4">
                Most asked by clients
              </p>
              <p className="text-gray-300 text-sm leading-snug">
                Quick answers to help you get started
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* FAQ GRID */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
              className="
                faq-item
                backdrop-blur-xl bg-white/5
                border border-white/10
                rounded-xl sm:rounded-2xl
                overflow-hidden
                cursor-pointer
                hover:border-white/20
                transition-colors duration-300
              "
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="
                  w-full
                  text-left
                  p-6 sm:p-8
                  flex items-start justify-between
                "
              >
                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="
                      w-8 h-8
                      bg-gradient-to-br from-blue-500/20 to-purple-600/20
                      rounded-lg
                      flex items-center justify-center
                      flex-shrink-0
                    ">
                      <span className="text-blue-400 font-bold">{index + 1}</span>
                    </div>
                    
                    <h4 className="
                      text-white
                      text-lg sm:text-xl font-semibold
                    ">
                      {faq.question}
                    </h4>
                  </div>
                  
                  <div className="faq-answer" style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
                    <div className="pl-12 pt-4">
                      <p className="
                        text-gray-300
                        text-base
                        leading-relaxed
                      ">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="
                  faq-chevron
                  ml-4
                  w-8 h-8
                  flex-shrink-0
                  flex items-center justify-center
                  text-white/60
                ">
                  {activeIndex === index ? (
                    <FaChevronUp className="w-5 h-5" />
                  ) : (
                    <FaChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="
          faq-item
          mt-12
          backdrop-blur-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20
          border border-white/10
          rounded-2xl
          p-8 sm:p-12
          text-center
        ">
          <h3 className="
            text-white
            text-2xl sm:text-3xl font-bold
            mb-4
          ">
            Still have questions?
          </h3>
          <p className="
            text-white/70
            text-base sm:text-lg
            max-w-2xl mx-auto
            mb-8
          ">
            Can't find what you're looking for? Our team is ready to help.
          </p>
          
          <button
            onClick={() => {
              gsap.to(window, {
                duration: 1,
                scrollTo: { y: "#contact", offsetY: 100 },
                ease: "power2.inOut"
              });
            }}
            className="
              group
              inline-flex items-center gap-3
              px-8 py-4
              bg-gradient-to-r from-blue-500 to-purple-600
              rounded-xl
              text-white font-semibold
              hover:from-blue-600 hover:to-purple-700
              hover:scale-105
              transition-all duration-300
            "
          >
            Get in Touch
            <FaChevronDown className="
              w-5 h-5
              group-hover:translate-y-1
              transition-transform
            " />
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQ;