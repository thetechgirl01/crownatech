import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaDribbble,
} from 'react-icons/fa6';
import { HiArrowUpRight } from 'react-icons/hi2';



const NAV = [
  { label: 'Works', to: '/works' },
  { label: 'Store', to: '/store' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blogs' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

const SOCIALS = [
  { label: 'X / Twitter', href: 'https://x.com/', Icon: FaXTwitter },
  { label: 'Instagram', href: 'https://instagram.com/', Icon: FaInstagram },
  { label: 'LinkedIn', href: 'https://linkedin.com/', Icon: FaLinkedinIn },
  { label: 'Dribbble', href: 'https://dribbble.com/', Icon: FaDribbble },
  { label: 'GitHub', href: 'https://github.com/', Icon: FaGithub },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden text-white"
      role="contentinfo"
      style={{
        background:
          'radial-gradient(120% 80% at 80% 0%, rgba(250,204,21,0.10) 0%, transparent 55%), #011936',
      }}
    >
      {/* Subtle grain overlay (pure CSS, no asset) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ============================================================ */}
      {/* 1. CTA word-mark + marquee                                   */}
      {/* ============================================================ */}
      <BigCTA />

      {/* ============================================================ */}
      {/* 2. Three-column body                                          */}
      {/* ============================================================ */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 border-t border-white/10">
        {/* Brand + tagline */}
        <div className="md:col-span-5">
          <Link to="/" aria-label="CrownaTech home" className="inline-block">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Crowna<span className="text-yellow-400">Tech</span>
            </h2>
          </Link>
          <p className="text-white/55 mt-5 max-w-md leading-relaxed">
            We design and build digital products that earn attention and
            convert it. Based in Lagos, working worldwide.
          </p>

          <div className="mt-8 flex flex-col gap-1 text-sm">
            <a
              href="mailto:[email protected]"
              className="group inline-flex items-center gap-1.5 text-white hover:text-yellow-400 transition w-fit"
            >
              [email protected]
              <HiArrowUpRight className="w-4 h-4 -translate-y-px group-hover:translate-x-0.5 group-hover:-translate-y-1 transition-transform" />
            </a>
            <span className="text-white/40">Lagos, Nigeria · Remote</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="md:col-span-3" aria-label="Footer navigation">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-5">
            Sitemap
          </p>
          <ul className="space-y-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group inline-flex items-center gap-2 text-white/80 hover:text-white text-base transition"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-yellow-400 transition-all duration-300" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter */}
        <div className="md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-5">
            Stay in the loop
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. Bottom bar                                                 */}
      {/* ============================================================ */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-white/40 order-2 sm:order-1">
            © {year} CrownaTech. All rights reserved.
          </p>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/10 hover:border-yellow-400/60 hover:bg-yellow-400/5 text-white/70 hover:text-yellow-400 flex items-center justify-center transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <LocalClock />
        </div>
      </div>
    </footer>
  );
};

/* =================================================================
   BIG CTA — oversized "Let's build something good" headline
   that doubles as the email link, with a thin scrolling marquee
   ================================================================= */
const BigCTA = () => (
  <div className="relative">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-20 lg:pt-28 pb-12 lg:pb-16">
      <p className="text-[11px] uppercase tracking-[0.25em] text-yellow-400 mb-6">
        Have an idea?
      </p>

      <a
        href="mailto:[email protected]?subject=New%20project"
        className="group block"
      >
        <h2 className="font-bold leading-[0.92] tracking-tight text-white text-[clamp(2.5rem,9vw,8rem)]">
          Let's build
          <br />
          <span className="inline-flex items-baseline gap-3 sm:gap-5">
            something
            <HiArrowUpRight
              className="
                shrink-0 w-[0.9em] h-[0.9em] text-yellow-400
                transition-transform duration-500
                group-hover:rotate-45 group-hover:translate-x-2
              "
              aria-hidden="true"
            />
          </span>
          <br />
          <span className="italic font-light text-white/75">good.</span>
        </h2>
      </a>
    </div>

    <Marquee />
  </div>
);

/* =================================================================
   MARQUEE — pure CSS infinite scroll of services
   ================================================================= */
const Marquee = () => {
  const items = [
    'Web Design',
    'Web Development',
    'Brand Identity',
    'Logo Design',
    'UI / UX',
    'E-commerce',
    'Web3',
    'SaaS Platforms',
    'Stock Templates',
  ];
  const row = [...items, ...items, ...items];

  return (
    <div
      className="relative border-y border-white/10 bg-white/[0.02] overflow-hidden py-6"
      aria-hidden="true"
    >
      <div className="flex gap-10 whitespace-nowrap animate-footer-marquee">
        {row.map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-10 text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-white/35"
          >
            {label}
            <span className="text-yellow-400 text-2xl">✦</span>
          </span>
        ))}
      </div>

      {/* Local keyframes — scoped via styled tag so we don't touch globals */}
      <style>{`
        @keyframes footer-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .animate-footer-marquee {
          animation: footer-marquee 40s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-footer-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
};

/* =================================================================
   NEWSLETTER — minimal inline form, optimistic confirmation state
   ================================================================= */
const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Wire this up to a real endpoint when you have one.
    setDone(true);
    setEmail('');
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <>
      <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-sm">
        One email a month. New work, new posts, the occasional thought.
        No noise.
      </p>

      <form onSubmit={onSubmit} className="relative max-w-sm">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@somewhere.com"
          aria-label="Email address"
          className="
            w-full pl-4 pr-28 py-3.5
            bg-white/5 border border-white/10 rounded-full
            text-white placeholder:text-white/40 text-sm
            focus:outline-none focus:border-yellow-400/60 focus:bg-white/[0.07]
            transition
          "
        />
        <button
          type="submit"
          className="
            absolute right-1.5 top-1/2 -translate-y-1/2
            px-4 py-2.5 rounded-full
            bg-yellow-400 hover:bg-yellow-300 text-black
            text-xs font-semibold
            transition
          "
        >
          Subscribe
        </button>
      </form>

      <p
        className={`
          mt-3 text-xs text-yellow-400 transition-opacity duration-300
          ${done ? 'opacity-100' : 'opacity-0'}
        `}
        role="status"
        aria-live="polite"
      >
        ✓ Welcome aboard — check your inbox.
      </p>
    </>
  );
};

/* =================================================================
   LOCAL CLOCK — small detail that adds personality
   ================================================================= */
const LocalClock = () => {
  const [now, setNow] = useState(() => new Date());
  const tickRef = useRef();

  useEffect(() => {
    tickRef.current = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(tickRef.current);
  }, []);

  const time = now.toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Lagos',
    hour12: false,
  });

  return (
    <p className="text-white/40 text-xs flex items-center gap-2 order-3">
      <span
        className="w-1.5 h-1.5 rounded-full bg-yellow-400"
        aria-hidden="true"
      />
      <span className="tabular-nums">Lagos · {time}</span>
    </p>
  );
};

export default Footer;
