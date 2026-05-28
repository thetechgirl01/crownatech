import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { 
  FaRegEnvelope, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaPaperPlane,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
  FaUser,
  FaComment
} from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import { MdEmail, MdMessage } from 'react-icons/md';

// Import your logo image
import Logo from '../assets/tklogo.png'; // Update this path to your actual logo

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    customBudget: '',
    message: ''
  });

  // Refs for animations
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const emailRef = useRef(null);
  const connectSectionRef = useRef(null);
  const socialCardsRef = useRef([]);
  const logoRef = useRef(null);
  const formRef = useRef(null);
  const animationTriggered = useRef(false);

  const projectTypes = [
    'Business Website',
    'E-commerce Store',
    'Web Application',
    'Portfolio Site',
    'Blog/Content',
    'SaaS Platform',
    'Landing Page',
    'Redesign/Update'
  ];

  const budgetRanges = [
    'Under $500',
    '$500 - $2,000',
    '$2,000 - $5,000',
    '$5,000 - $10,000',
    'Over $10,000'
  ];

  const socialLinks = [
    { icon: <FaFacebook />, label: 'Facebook', url: 'https://facebook.com/crownatech' },
    { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://linkedin.com/company/crownatech' },
    { icon: <FaTiktok />, label: 'TikTok', url: 'https://tiktok.com/@crownatech' }
  ];

  // GSAP Animation for header and connect section
  useEffect(() => {
    if (!headingRef.current || animationTriggered.current) return;

    // Split the heading text into characters
    const headingSplit = new SplitText(headingRef.current, {
      type: "chars,words",
      charsClass: "char",
    });

    // Set initial state
    gsap.set(headingSplit.chars, {
      opacity: 0,
      y: 30,
      rotateX: -90,
      transformOrigin: "top center"
    });

    gsap.set(buttonRef.current, { opacity: 0, x: -20 });
    gsap.set(emailRef.current, { opacity: 0, x: -20 });
    gsap.set(connectSectionRef.current, { opacity: 0, y: 50 });
    gsap.set(socialCardsRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.8, rotateY: 90 });
    gsap.set(formRef.current, { opacity: 0, y: 30 });

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

    // Animate button and email
    timeline.to(buttonRef.current, {
      duration: 0.6,
      opacity: 1,
      x: 0,
      ease: "power2.out"
    }, "-=0.3");

    timeline.to(emailRef.current, {
      duration: 0.6,
      opacity: 1,
      x: 0,
      ease: "power2.out"
    }, "-=0.4");

    // Animate form
    timeline.to(formRef.current, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power3.out"
    }, "-=0.2");

    // Animate connect section
    timeline.to(connectSectionRef.current, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power3.out"
    }, "+=0.2");

    // Stagger animate social cards
    timeline.to(socialCardsRef.current, {
      duration: 0.5,
      opacity: 1,
      scale: 1,
      stagger: 0.1,
      ease: "back.out(0.8)"
    }, "-=0.3");

    // Animate logo with 3D rotation
    timeline.to(logoRef.current, {
      duration: 0.8,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      ease: "back.out(1.2)"
    }, "-=0.2");

    // Cleanup
    return () => {
      if (headingSplit) headingSplit.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjectTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      projectType: type
    }));
  };

  const handleBudgetSelect = (range) => {
    setFormData(prev => ({
      ...prev,
      budget: range,
      customBudget: '' // Clear custom budget when selecting a range
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div ref={sectionRef} className="min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION - Better positioning on mobile */}
        <header className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
            
            {/* Heading */}
            <div className="lg:w-1/2">
              <h1 
                ref={headingRef}
                className="
                  text-white font-bold leading-tight
                  text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                  text-center lg:text-left
                "
              >
                we are on
                <span className="block text-yellow-400 mt-2">social media.</span>
              </h1>
            </div>
            
          
          </div>
        </header>

   

        {/* CONNECT WITH US SECTION */}
        <section ref={connectSectionRef} className="mb-20">
          <div className="
            backdrop-blur-xl bg-white/5
            border border-white/10
            rounded-2xl
            overflow-hidden
          ">
            <div className="flex flex-col lg:flex-row">
              
              {/* LEFT SIDE - SOCIALS */}
              <div className="
                lg:w-1/2
                p-6 sm:p-8 md:p-12
                flex flex-col justify-center
              ">
                <h3 className="
                  text-white
                  text-2xl sm:text-3xl md:text-4xl
                  font-bold
                  mb-4 sm:mb-6
                ">
                  Connect With Us
                </h3>
                
                <p className="
                  text-white/60
                  text-sm sm:text-base
                  mb-6 sm:mb-8
                  leading-relaxed
                ">
                  Follow for updates, insights, and behind-the-scenes looks at our latest projects.
                </p>
                
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      ref={el => socialCardsRef.current[index] = el}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group
                        flex flex-col items-center
                        p-3 sm:p-4
                        backdrop-blur-xl bg-white/5
                        border border-white/10
                        rounded-xl
                        hover:bg-white/10
                        hover:-translate-y-1
                        transition-all duration-300
                      "
                    >
                      <div className="
                        w-10 h-10 sm:w-12 sm:h-12
                        flex items-center justify-center
                        text-yellow-400
                        group-hover:text-yellow-300
                        transition-colors
                        mb-2 sm:mb-3
                      ">
                        <div className="w-5 h-5 sm:w-6 sm:h-6">
                          {social.icon}
                        </div>
                      </div>
                      <span className="
                        text-white
                        text-xs sm:text-sm font-medium
                        group-hover:text-yellow-400
                        transition-colors
                      ">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* RIGHT SIDE - LOGO */}
              <div className="
                lg:w-1/2
                p-6 sm:p-8 md:p-12
                flex flex-col items-center justify-center
                border-t lg:border-t-0 lg:border-l border-white/10
              ">
                <div className="text-center">
                  <div 
                    ref={logoRef}
                    className="
                      w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40
                      mx-auto
                      mb-4 sm:mb-6
                      relative
                    "
                  >
                    <img src={Logo} alt="Crownatech Logo" className="w-full h-full object-contain" />
                  </div>
                  
                  <h2 className="
                    text-white
                    text-2xl sm:text-3xl md:text-4xl
                    font-bold
                    mb-2
                    tracking-tight
                  ">
                    CrownaTech
                  </h2>
                  
                  <p className="text-white/60 text-xs sm:text-sm">
                    Building digital excellence since 2019
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Contact;