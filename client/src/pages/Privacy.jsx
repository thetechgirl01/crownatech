import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { privacySections, privacyReviewDate } from '../content/privacy';

const Privacy = () => (
  <article className="ct-container ct-page-content">
    <SEO title="Privacy Policy draft" description="Crownatech's Privacy Policy draft, based on reviewed website data practices and awaiting owner confirmation." url="https://www.crownatech.com/privacy" noIndex />
    <header className="mb-10 sm:mb-14">
      <h1 className="ct-page-heading text-white">Your information.<br /><span className="ct-heading-secondary">Our current practices.</span></h1>
      <p className="text-muted mt-6 max-w-3xl">Privacy Policy draft. Reviewed <time dateTime={privacyReviewDate}>7 November 2026</time>.</p>
    </header>
    <div className="ct-panel ct-panel-brand p-5 sm:p-7 mb-10 max-w-3xl">
      <h2 className="text-white text-xl mb-3">Draft for owner review</h2>
      <p className="text-muted">This notice is not finalized. The open questions below must be resolved before it is presented as legally complete.</p>
      <a className="ct-footer-link underline mt-3" href="/privacy-policy.html">Read the script-free version</a>
    </div>
    <nav aria-label="Privacy Policy contents" className="flex flex-wrap gap-x-5 gap-y-2 mb-12 max-w-3xl">
      {privacySections.map(section => <Link key={section.id} to={`#${section.id}`} className="ct-footer-link text-sm underline">{section.title}</Link>)}
    </nav>
    <div className="ct-legal-copy">
      {privacySections.map(section => <section key={section.id} aria-labelledby={section.id}>
        <h2 id={section.id} tabIndex={-1}>{section.title}</h2>
        {section.paragraphs?.map(text => <p key={text}>{text}</p>)}
        {section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
      </section>)}
      <Link to="/contact" className="ct-button ct-button-tertiary mt-8">Contact us about privacy</Link>
    </div>
  </article>
);
export default Privacy;
