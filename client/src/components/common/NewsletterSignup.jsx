import { useId } from 'react';
/** No subscription endpoint exists yet. Keep the UI honest and collect no data. */
const NewsletterSignup = () => {
  const id = useId();
  return (
  <div className="space-y-4">
    <p className="text-muted text-sm leading-relaxed">
      Studio updates, new work, and ideas from Crownatech.
    </p>
    <div className="ct-newsletter-fields" aria-describedby={`${id}-availability`}>
      <label className="sr-only" htmlFor={`${id}-email`}>Email address</label>
      <input id={`${id}-email`} className="ct-field w-full px-4" type="email" placeholder="Your email address" disabled />
      <button className="ct-button ct-button-tertiary" type="button" disabled>Coming soon</button>
    </div>
    <p id={`${id}-availability`} className="text-muted text-sm">
      Email subscriptions are not available yet. No email addresses are collected here.
    </p>
  </div>
  );
};
export default NewsletterSignup;
