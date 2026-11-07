import { Link } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';
import Portrait from '../assets/director.jpg';
import SEO from '../components/common/SEO';

const services = [
    {
      title: "Custom Web Development",
      description: "Tailored web applications built with modern technologies to meet your specific business needs."
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that combine aesthetics with functionality for optimal user experience."
    },
    {
      title: "Web Strategy & Consulting",
      description: "Expert guidance to help you make informed decisions about your digital presence and online strategy."
    }
  ];

const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We start by understanding your goals, audience, and requirements to create a strategic plan."
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Creating wireframes and prototypes to visualize the final product before development begins."
    },
    {
      step: "03",
      title: "Development",
      description: "Building your solution with clean, efficient code using the latest technologies and best practices."
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Deploying your project and providing ongoing support to ensure optimal performance."
    }
  ];

const AboutUs = () => (
  <div className="ct-container ct-page-content">
    <SEO title="About" description="Crownatech combines creative thinking and technical expertise to build digital experiences for businesses and startups. Working remotely with clients worldwide." />
    <header className="mb-12 sm:mb-20">
      <h1 className="ct-page-heading text-white">Building digital excellence.<br /><span className="ct-heading-secondary">With strategy, design, and code.</span></h1>
    </header>
    <section data-reveal className="ct-about-story" aria-labelledby="about-story-title">
      <figure>
        <img src={Portrait} alt="Crownatech studio portrait" width="640" height="800" className="w-full aspect-[4/5] object-cover rounded-3xl" />
      </figure>
      <div>
        <p className="ct-eyebrow mb-4">The studio</p>
        <h2 id="about-story-title" className="ct-section-title text-white mb-6">Creative thinking.<br />Technical craft.</h2>
        <p className="text-muted text-lg mb-6">We are a passionate team of web developers and designers dedicated to creating exceptional digital experiences. We work remotely with businesses and startups, combining technical expertise with creative thinking.</p>
        <p className="text-muted mb-6">Every project is treated as a partnership, with clear communication and transparent processes from start to finish.</p>
        <p className="text-muted mb-8">Our commitment to quality and attention to detail helps us deliver solutions that are scalable, maintainable, and aligned with your long-term business goals.</p>
        <Link to="/works" className="ct-button ct-button-primary">Explore our work <HiArrowUpRight aria-hidden="true" /></Link>
      </div>
    </section>
    <section className="ct-editorial-section" aria-labelledby="about-approach-title">
      <div>
        <p className="ct-eyebrow mb-4">Our approach</p>
        <h2 id="about-approach-title" className="ct-section-title text-white">A clear process.<br />A shared direction.</h2>
        <p className="text-muted mt-5">A structured process keeps every project focused on quality and real value.</p>
      </div>
      <ol className="ct-editorial-list">
        {process.map(item => <li key={item.step}>
          <span className="text-yellow-400 text-sm" aria-hidden="true">{item.step}</span>
          <div><h3 className="text-white text-lg sm:text-xl mb-3">{item.title}</h3><p className="text-muted">{item.description}</p></div>
        </li>)}
      </ol>
    </section>
    <section className="ct-editorial-section" aria-labelledby="about-services-title">
      <div>
        <p className="ct-eyebrow mb-4">What we offer</p>
        <h2 id="about-services-title" className="ct-section-title text-white">Built around<br />your business.</h2>
        <p className="text-muted mt-5">Clean code, thoughtful design, and regular collaboration.</p>
      </div>
      <div className="ct-editorial-list">
        {services.map((service, index) => <div key={service.title} className="ct-editorial-row">
          <span className="text-yellow-400 text-sm" aria-hidden="true">0{index + 1}</span>
          <div><h3 className="text-white text-lg sm:text-xl mb-3">{service.title}</h3><p className="text-muted">{service.description}</p></div>
        </div>)}
        <Link to="/contact" className="ct-button ct-button-secondary mt-6">Talk to us <HiArrowUpRight aria-hidden="true" /></Link>
      </div>
    </section>
  </div>
);
export default AboutUs;
