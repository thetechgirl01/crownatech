import useDialog from '../../hooks/useDialog';
import React, { useRef } from 'react';
import { HiCheck } from 'react-icons/hi';

/**
 * Reusable success / confirmation modal. Closes on Esc and on backdrop click.
 * Used by the Contact form once a message has been submitted.
 */
const SuccessModal = ({ open, onClose, title = 'Success', message }) => {
  const dialogRef = useRef(null);
  useDialog(open, onClose, dialogRef);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      aria-describedby="success-message"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md bg-gray-900/95 border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-center shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-yellow-400 flex items-center justify-center">
          <HiCheck className="w-8 h-8 text-black" aria-hidden="true" />
        </div>
        <h3 id="success-title" className="text-white text-2xl font-bold mb-3">
          {title}
        </h3>
        <p id="success-message" className="text-white/70 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="ct-button ct-button-secondary px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
