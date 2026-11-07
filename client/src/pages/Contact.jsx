import React, { useState } from 'react';
import Logo from '../assets/tklogo.png'
import { 
  FaRegEnvelope, 
  FaMapMarkerAlt, 
  FaPaperPlane,
  FaFacebook,
  FaLinkedin,
  FaTiktok
} from 'react-icons/fa';
import { contactsApi } from '../api/contacts';
import SuccessModal from '../components/common/SuccessModal';
import SEO from '../components/common/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email, and project details.');
      return;
    }

    setSubmitting(true);
    try {
      await contactsApi.submit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        budget: formData.budget.trim(),
        message: formData.message.trim(),
      });
      setFormData({ name: '', email: '', message: '', budget: '' });
      setShowSuccess(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "We couldn't send your message right now. Please try again in a moment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact"
        description="Get in touch with CrownaTech. We respond within 24-48 hours to project enquiries."
      />

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Message received"
        message="Thanks for reaching out — we'll be in touch shortly."
      />

      {/* HEADER SECTION - Same as Hero.jsx */}
      <div className="py-10 sm:py-1">
        <section className="flex flex-col items-start justify-start px-4 md:px-24 py-8 relative">
          <div className="max-w-6xl w-full p-6 sm:p-8 md:p-16 pt-24 md:pt-32">
            <div className="flex flex-col items-start text-left bg">
              
              <h1 className="
                text-white font-bold leading-tight
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                mb-6
              ">
                Let's Build Something Amazing
              </h1>
              
              <p className="
                text-white/70
                text-base sm:text-lg md:text-xl
                leading-relaxed max-w-3xl mb-12
              ">
                Get in touch and let's discuss how we can bring your vision to life.
              </p>

            </div>
          </div>
        </section>
      </div>

      {/* MAIN CONTENT */}
      <section className='bg-gray-900/95 py-20 rounded-tl-4xl rounded-tr-4xl'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT COLUMN - CONTACT INFO (Shows second on mobile) */}
          <div className="lg:w-1/2 space-y-8">
            {/* Why Choose Us Card */}
            <div className="
              backdrop-blur-xl bg-white/5
              border border-white/10
              rounded-2xl
              p-6 sm:p-8
            ">
              <h3 className="
                text-white
                text-xl sm:text-2xl font-bold
                mb-6
              ">
                Why Work With Us
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="
                    w-10 h-10
                    bg-white
                    rounded-lg
                    flex items-center justify-center
                    flex-shrink-0
                  ">
                    <span className="text-black text-lg font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Expert Consultation</h4>
                    <p className="text-muted text-sm">
                      Free initial consultation to understand your needs and goals
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="
                    w-10 h-10
                    bg-white
                    rounded-lg
                    flex items-center justify-center
                    flex-shrink-0
                  ">
                    <span className="text-black text-lg font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Transparent Process</h4>
                    <p className="text-muted text-sm">
                      Clear communication and regular updates throughout the project
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="
                    w-10 h-10
                    bg-white
                    rounded-lg
                    flex items-center justify-center
                    flex-shrink-0
                  ">
                    <span className="text-black text-lg font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Quality Focus</h4>
                    <p className="text-muted text-sm">
                      Clean code, modern design, and scalable solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="
              backdrop-blur-xl bg-white/5
              border border-white/10
              rounded-2xl
              p-6 sm:p-8
            ">
              <div className="flex items-center gap-3 mb-6">
                <FaMapMarkerAlt className="w-5 h-5 text-white" />
                <h4 className="text-white font-medium">Our Location</h4>
              </div>
              <p className="text-muted text-sm mb-4">
                Lagos, Nigeria<br />
                Available for worldwide projects
              </p>
              
              <div className="flex items-center gap-3 mb-4">
                <FaRegEnvelope className="w-5 h-5 text-white" />
                <h4 className="text-white font-medium">Get in Touch</h4>
              </div>
              <p className="text-muted text-sm">
                Typically respond within 24 hours<br />
                100+ projects successfully delivered
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="
                backdrop-blur-xl bg-white/5
                border border-white/10
                rounded-xl
                p-4
                text-center
              ">
                <div className="text-white text-lg font-bold mb-1">
                  24-48 Hours
                </div>
                <div className="text-muted text-sm">
                  Average Response
                </div>
              </div>

              <div className="
                backdrop-blur-xl bg-white/5
                border border-white/10
                rounded-xl
                p-4
                text-center
              ">
                <div className="text-white text-lg font-bold mb-1">
                  100+ Projects
                </div>
                <div className="text-muted text-sm">
                  Successfully Delivered
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - CONTACT FORM (Shows first on mobile) */}
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="
              backdrop-blur-xl bg-white/5
              border border-white/10
              rounded-2xl
              p-6 sm:p-8
            ">
              <h3 className="
                text-white
                text-xl sm:text-2xl font-bold
                mb-6
              ">
                Tell Us About Your Project
              </h3>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="ct-field
                      w-full
                      px-4 py-3
                      backdrop-blur-xl 
                     
                      rounded-xl
                      text-white
                      placeholder:text-muted
                      focus:outline-none focus:border-white/40
                      transition
                    "
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="ct-field
                      w-full
                      px-4 py-3
                      backdrop-blur-xl 
                     
                      rounded-xl
                      text-white
                      placeholder:text-muted
                      focus:outline-none focus:border-white/40
                      transition
                    "
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <label className="block text-white/70 text-sm mb-2">
                  Project Budget (Optional)
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="ct-field
                     w-full
                      px-4 py-3
                      backdrop-blur-xl 
                     
                      rounded-xl
                      text-white
                      placeholder:text-muted
                      focus:outline-none focus:border-white/40
                      transition
                  "
                  placeholder="e.g., $500 - $10,000 or Not sure yet"
                />
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="block text-white/70 text-sm mb-2">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="ct-field
                    w-full
                      px-4 py-3
                      backdrop-blur-xl 
                     
                      rounded-xl
                      text-white
                      placeholder:text-muted
                      focus:outline-none focus:border-white/40
                      transition
                    resize-none
                  "
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-4 bg-red-500/10 border border-red-500/30 text-red-200 text-sm rounded-lg p-3"
                >
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="ct-button ct-button-secondary
                  w-fit
                  px-6 py-4
                  bg-white
                  text-black
                  rounded-4xl
                  font-semibold
                  flex items-center justify-center gap-3
                  hover:bg-white/90
                  transition-all duration-300
                  group
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {submitting ? 'Sending…' : 'Send Message'}
                <span className="
                  w-8 h-8
                  bg-black
                  text-white
                  rounded-full
                  flex items-center justify-center
                  group-hover:translate-x-1
                  transition-transform
                  rotate-45
                ">
                  <FaPaperPlane className="w-4 h-4 -rotate-45" />
                </span>
              </button>

              {/* Privacy Note */}
              <p className="
                text-muted text-xs sm:text-sm
                text-center mt-6
              ">
                We respect your privacy. Your information is secure with us.
              </p>
            </form>
          </div>
        </div>

        {/* SOCIALS & LOGO SECTION - Dark Theme */}
        <div className="mt-20">
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
                  text-muted
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
                  
                  <p className="text-muted text-sm">
                    Building digital excellence since 2019
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

    </div>
  );
};

export default Contact;