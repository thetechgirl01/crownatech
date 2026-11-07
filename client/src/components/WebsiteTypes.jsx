import { useState } from 'react';
import { HiPause, HiPlay } from 'react-icons/hi2';

const TYPES = ['E-commerce', 'Portfolio', 'Blog', 'Landing Page', 'Corporate', 'SaaS', 'Web App', 'Web3', 'Real Estate'];
const WebsiteTypes = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className="ct-types mb-8" data-paused={paused}>
      <div className="ct-types-window">
        <div className="ct-types-track">
          {[0, 1].map(copy => <div className="ct-types-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {TYPES.map(type => <span key={type}>{type}<span className="ct-types-star" aria-hidden="true">✦</span></span>)}
          </div>)}
        </div>
      </div>
      <button type="button" className="ct-icon-button ct-types-toggle" aria-label={paused ? 'Resume website types' : 'Pause website types'} aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? <HiPlay aria-hidden="true" /> : <HiPause aria-hidden="true" />}
      </button>
    </div>
  );
};
export default WebsiteTypes;
