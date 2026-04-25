import React, { useState } from 'react';
import { 
  FaRegEnvelope, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaPaperPlane,
  FaFacebook,
  FaLinkedin,
  FaTiktok
} from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

// Import your logo image
import Logo from '../assets/tklogo.png'; // Update this path to your actual logo

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    customBudget: '',
    message: ''
  });

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
    <div className="min-h-screen py-10 sm:py-16">
      {/* HERO */}
      <header className="px-auto max-w-7xl mx-auto mb-12 sm:mb-20">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          
          <h1 className="
            text-white font-bold leading-tight
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            text-center lg:text-left
            max-w-xl
          ">
            Have an idea? 
            We can help.
          </h1>

          {/* Have an idea? Section */}
          <div className="mb-10 sm:mb-12">
            <div className="mb-8">
              <a
                href="/contact"
                className="
                  group
                  flex items-center justify-between
                  w-fit
                  border border-gray-500
                  rounded-4xl
                  px-4 py-2
                  text-sm sm:text-base
                  hover:bg-gray-800
                  transition-all duration-300
                "
              >
                <span className="text-white font-medium mx-auto pr-7 group-hover:text-white transition-colors">
                  Get in Touch
                </span>

                <span className="
                  w-10 h-10
                  bg-yellow-400
                  rounded-full
                  flex items-center justify-center
                  group-hover:translate-x-1
                  transition-transform
                ">
                  <HiArrowRight className="text-black w-5 h-5 -rotate-45" />
                </span>
              </a>
            </div>
            
            {/* Email Contact */}
            <div className="flex items-center gap-3">
              <FaRegEnvelope className="w-5 h-5 text-gray-600" />
              <a 
                href="mailto:hello@crownatech.com" 
                className="text-gray-800 text-lg font-medium hover:text-blue-600 transition-colors"
              >
                contact@crownatech.com
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* CONNECT WITH US SECTION - Extracted from contact.jsx */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
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
              p-8 sm:p-12 md:p-16
              flex flex-col justify-center
            ">
              <h3 className="
                text-white
                text-2xl sm:text-3xl md:text-4xl
                font-bold
                mb-6 sm:mb-8
              ">
                Connect With Us
              </h3>
              
              <p className="
                text-white/60
                text-base sm:text-lg
                mb-8 sm:mb-10
                leading-relaxed
              ">
                Follow for updates, insights, and behind-the-scenes looks at our latest projects.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      flex flex-col items-center
                      p-4
                      backdrop-blur-xl bg-white/5
                      border border-white/10
                      rounded-xl
                      hover:bg-white/10
                      transition-all duration-300
                    "
                  >
                    <div className="
                      w-12 h-12
                      flex items-center justify-center
                      text-white
                      group-hover:text-white
                      transition-colors
                      mb-3
                    ">
                      <div className="w-6 h-6">
                        {social.icon}
                      </div>
                    </div>
                    <span className="
                      text-white
                      text-sm font-medium
                      group-hover:text-white
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
              p-8 sm:p-12 md:p-16
              flex flex-col items-center justify-center
              border-t lg:border-t-0 lg:border-l border-white/10
            ">
              <div className="text-center">
                <div className="
                  w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48
                  mx-auto
                  mb-6 sm:mb-8
                  relative
                ">
                  <img src={Logo} alt="Crownatech Logo" className="w-full h-full object-contain" />
                </div>
                
                <h2 className="
                  text-white
                  text-3xl sm:text-4xl md:text-5xl
                  font-bold
                  mb-3
                  tracking-tight
                ">
                  CrownaTech
                </h2>
                
                <p className="text-white/60 text-sm">
                  Building digital excellence since 2019
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Contact;