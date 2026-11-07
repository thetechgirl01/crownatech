import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import SEO from '../components/common/SEO';

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

const FAQ = () => (
  <div className="ct-container ct-page-content">
    <SEO title="FAQ" description="Answers to common questions about Crownatech's web design and development services." />
    <header className="mb-12 sm:mb-16">
      <p className="ct-eyebrow mb-4">Frequently asked</p>
      <h1 className="ct-page-heading text-white">Questions answered</h1>
      <p className="text-muted text-lg max-w-2xl mt-6">Get quick answers to the most common questions about our web development services.</p>
    </header>
    <section className="max-w-4xl" aria-label="Frequently asked questions">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={faq.question} name="crownatech-faq" className="ct-faq-item">
            <summary>
              <span className="ct-faq-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="flex-1">{faq.question}</span>
              <FaChevronDown aria-hidden="true" className="ct-faq-chevron" />
            </summary>
            <div className="ct-faq-answer"><p>{faq.answer}</p></div>
          </details>
        ))}
      </div>
      <div className="ct-panel p-6 sm:p-10 mt-12">
        <h2 className="text-white text-2xl sm:text-3xl mb-4">Still have questions?</h2>
        <p className="text-muted mb-6">Can't find what you're looking for? Our team is ready to help.</p>
        <Link to="/contact" className="ct-button ct-button-primary">Get in touch</Link>
      </div>
    </section>
  </div>
);
export default FAQ;
