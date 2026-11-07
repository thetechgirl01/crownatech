import { HiArrowUpRight } from 'react-icons/hi2';
import { useState, useRef, useId } from 'react';
import { HiX } from 'react-icons/hi';
import BookcallPick from '../assets/director.jpg';
import useDialog from '../hooks/useDialog';

const Bookcall = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const circleId = `${useId()}-consult-circle`;
  useDialog(isOpen, () => setIsOpen(false), dialogRef);
  return (
    <>
      <div className="ct-consult-widget">
        <div className="ct-consult-ring" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs><path id={circleId} d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" /></defs>
            <text fill="#ccc" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="400" letterSpacing="3" textTransform="uppercase"><textPath href={`#${circleId}`} startOffset="0%">15 MINUTES • FREE • CONSULT • 15 MINUTES • FREE • CONSULT •</textPath></text>
          </svg>
        </div>
        <button onClick={() => setIsOpen(true)} className="ct-consult-trigger" aria-label="Book a free consultation" aria-haspopup="dialog" aria-expanded={isOpen}>
          <img src={BookcallPick} alt="" className="w-full h-full object-cover rounded-full" />
        </button>
      </div>
      {isOpen && <>
        <div className="fixed inset-0 bg-black/60 z-[110]" onClick={() => setIsOpen(false)} aria-hidden="true" />
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="consult-title" aria-describedby="consult-description" tabIndex={-1} className="ct-consult-dialog ct-panel ct-consult-light">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <span className="ct-eyebrow">Free consultation</span>
              <h2 id="consult-title" className="text-gray-900 text-2xl mt-2">15-minute consult</h2>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close consultation" className="ct-icon-button"><HiX aria-hidden="true" /></button>
          </div>
          <p id="consult-description" className="text-gray-700 mb-6">This is a quick free call with CrownaTech's design &amp; development producer to talk about your project and figure out if there is a match.</p>
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="ct-button ct-button-consult w-full">Book a call <HiArrowUpRight aria-hidden="true" /></a>
        </div>
      </>}
    </>
  );
};
export default Bookcall;
