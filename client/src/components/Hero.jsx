import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export const Hero = () => (
  <section className="ct-home-hero">
    <div className="ct-container">
      <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-5xl">
        Web design &amp; development company
      </h1>
      <p className="ct-hero-wordmark text-blue-300 text-xl sm:text-2xl md:text-3xl font-semibold mt-8">CROWNATECH</p>
      <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mt-6 leading-relaxed">
        A creative code studio focused on building software solutions for businesses and startups with taste.
      </p>
      <div className="flex flex-wrap gap-4 mt-8">
        <Link to="/contact" className="ct-button ct-button-secondary">Let's talk <HiArrowRight aria-hidden="true" className="-rotate-45" /></Link>
        <Link to="/works" className="ct-button ct-button-tertiary">Works <HiArrowRight aria-hidden="true" className="-rotate-45" /></Link>
      </div>
    </div>
  </section>
);
export default Hero;
