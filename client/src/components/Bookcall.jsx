import { useState, useRef } from 'react';
import { HiArrowRight, HiX } from 'react-icons/hi';
import BookcallPick from '../assets/director.jpg';
import useDialog from '../hooks/useDialog';

const Bookcall = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  useDialog(isOpen, () => setIsOpen(false), dialogRef);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="ct-consult-trigger" aria-label="Book a free consultation" aria-haspopup="dialog" aria-expanded={isOpen}>
        <img src={BookcallPick} alt="" className="w-full h-full object-cover rounded-full" />
      </button>
      {isOpen && <>
        <div className="fixed inset-0 bg-black/60 z-[110]" onClick={() => setIsOpen(false)} aria-hidden="true" />
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="consult-title" aria-describedby="consult-description" tabIndex={-1} className="ct-consult-dialog ct-panel">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <span className="ct-eyebrow">Free consultation</span>
              <h2 id="consult-title" className="text-white text-2xl mt-2">15-minute consult</h2>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close consultation" className="ct-icon-button"><HiX aria-hidden="true" /></button>
          </div>
          <p id="consult-description" className="text-muted mb-6">This is a quick free call with CrownaTech's design &amp; development producer to talk about your project and figure out if there is a match.</p>
          <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="ct-button ct-button-primary w-full">Book a call <HiArrowRight aria-hidden="true" /></a>
        </div>
      </>}
    </>
  );
};
export default Bookcall;
