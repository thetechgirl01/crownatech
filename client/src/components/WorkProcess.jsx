import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { MdLightbulb, MdDesignServices, MdCode, MdRocketLaunch } from 'react-icons/md';

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

const Workprocess = () => (
  <section className="ct-section">
    <div className="ct-container">
      <header className="mb-10 sm:mb-14 max-w-3xl">
        <h2 className="ct-section-title text-white">Our work process</h2>
        <p className="text-muted text-base sm:text-lg mt-5">A clear and simple 4-step process to ensure every project is delivered efficiently and with excellence.</p>
      </header>
      <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <li key={step.title} className="ct-panel overflow-hidden">
            <img src={step.image} alt="" loading="lazy" width="800" height="600" className="w-full aspect-[4/3] object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <step.icon className="w-6 h-6 text-yellow-400" aria-hidden="true" />
                <span className="text-muted text-sm">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-10 sm:mt-14">
        <Link to="/contact" className="ct-button ct-button-primary">Start your project <HiArrowRight aria-hidden="true" /></Link>
      </div>
    </div>
  </section>
);
export default Workprocess;
