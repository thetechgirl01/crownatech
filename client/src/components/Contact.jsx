import { HiArrowUpRight } from 'react-icons/hi2';
import { FaFacebook, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../assets/tklogo.png';

const SOCIALS = [
  { Icon: FaFacebook, label: 'Facebook', url: 'https://facebook.com/crownatech' },
  { Icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com/company/crownatech' },
  { Icon: FaTiktok, label: 'TikTok', url: 'https://tiktok.com/@crownatech' },
];
const Contact = () => (
  <section className="ct-container ct-section">
    <header data-reveal className="mb-10 sm:mb-14 flex flex-wrap items-end justify-between gap-6">
      <div>
        <h2 className="ct-section-title text-white">Connect with us</h2>
        <p className="text-muted max-w-xl mt-4">Follow for updates, insights, and behind-the-scenes looks at our latest projects.</p>
      </div>
      <Link to="/contact" className="ct-button ct-button-secondary">Let's talk <HiArrowUpRight aria-hidden="true" /></Link>
    </header>
    <div className="ct-panel ct-panel-brand grid lg:grid-cols-2 overflow-hidden">
      <div className="p-6 sm:p-10">
        <h3 className="text-white text-xl font-semibold mb-6">Find us on social media</h3>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {SOCIALS.map(social => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 px-2 py-5 border border-white/15 rounded-2xl text-white hover:bg-white/5 transition-colors">
            <social.Icon className="w-6 h-6 text-yellow-400" aria-hidden="true" />
            <span className="text-sm">{social.label}</span>
          </a>)}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-8 border-t lg:border-t-0 lg:border-l border-white/15">
        <img src={Logo} alt="Crownatech" className="w-24 h-24 object-contain" loading="lazy" width="96" height="96" />
        <p className="text-white text-2xl font-semibold mt-4">CrownaTech</p>
        <p className="text-muted text-sm mt-2">Building digital excellence since 2019</p>
      </div>
    </div>
  </section>
);
export default Contact;
