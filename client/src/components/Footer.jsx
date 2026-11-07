import { Link } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';
import NewsletterSignup from './common/NewsletterSignup';

const NAV = [
  { label: 'Works', to: '/works' },
  { label: 'Store', to: '/store' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blogs' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

const Footer = () => (
  <footer className="ct-footer">
    <div className="ct-container">
      <div className="ct-footer-cta">
        <div>
          <p className="ct-eyebrow">Have an idea?</p>
          <h2>Let's build something good.</h2>
        </div>
        <Link to="/contact" className="ct-button ct-button-secondary">
          Let's talk <HiArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <div className="ct-footer-body">
        <div>
          <Link to="/" className="text-white text-2xl font-semibold" aria-label="Crownatech home">
            Crowna<span className="text-yellow-400">Tech</span>
          </Link>
          <p className="mt-4 text-muted max-w-sm">
            We design and build digital products that earn attention and convert it.
            Working remotely with clients worldwide.
          </p>
          <p className="mt-5 text-muted text-sm">Remote-first. Built around collaboration.</p>
        </div>
        <nav aria-label="Footer navigation">
          <h3 className="ct-footer-label">Explore</h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {NAV.map(item => <li key={item.to}>
              <Link className="ct-footer-link" to={item.to}>{item.label}</Link>
            </li>)}
          </ul>
        </nav>
        <div>
          <h3 className="ct-footer-label">Studio notes</h3>
          <NewsletterSignup />
        </div>
      </div>
      <div className="ct-footer-bottom">
        <p>© {new Date().getFullYear()} CrownaTech. All rights reserved.</p>
        <Link to="/blogs" className="ct-footer-link">Read our latest articles <HiArrowUpRight aria-hidden="true" /></Link>
      </div>
    </div>
  </footer>
);
export default Footer;
