# Privacy and legal readiness review

Reviewed 2026-11-07. This is an evidence inventory and draft review checklist, not a legal completeness or compliance opinion. Applicable jurisdictions must be confirmed by the owner/adviser; no UK, EU, Nigerian or other legal regime is assumed merely from website wording.

## Verified implementation evidence

| Practice | Evidence |
| --- | --- |
| Name, email, optional budget, message | `pages/Contact.jsx`, `models/Contact.js`, `controllers/contactController.js` |
| IP, user agent, created/updated timestamps | Contact controller/model; timestamps enabled |
| Enquiry storage and admin workflow | MongoDB connection, Contact read/archive flags and protected admin routes |
| Abuse protection / HTTP logs | Contact rate limiter and server Morgan middleware |
| Admin browser storage | AuthContext stores token/profile and clears them on sign-out; Axios clears stale entries on unauthorized responses |
| Disabled newsletter | NewsletterSignup has no submission endpoint and accepts no input |
| Resource providers | Vercel frontend, Render backend (owner confirmed); Google Fonts, Unsplash and Cloudinary requests observed; MongoDB provider/regions unspecified |
| External destinations | Social/sharing links, project destinations and a Calendly link; no embedded scheduling widget in the active routes |
| Commerce | No Stripe SDK, checkout session endpoint, webhook/order/download system; public test checkout targets are now blocked |

A fresh unauthenticated Chrome sample of Home and Contact observed these origins: www.crownatech.com, fonts.googleapis.com, fonts.gstatic.com, crownatech.onrender.com, images.unsplash.com and res.cloudinary.com. It observed no cookie names, local-storage entries, analytics request paths or console errors. No cookie values, credentials or private admin data were collected. This is a limited sample, not proof of absence across all browsers, service responses or dashboard-injected tools.

The shared source for the React draft and script-free document is `client/src/content/privacy.js`. Vite emits `/privacy-policy.html` from that content during build; `/privacy` is the normal site route. Both are visibly drafts and excluded from indexing until owner review. The no-JavaScript site overview links to the standalone draft; dynamic portfolio listings and forms still require JavaScript in this existing SPA.

## Owner/adviser decisions required

Confirm the legal entity and direct privacy contact, required business disclosures, jurisdictions, lawful bases, rights/complaints handling, retention/deletion criteria, logs/backups, database location/provider, transfers, vendor terms and dashboard analytics. The old Lagos copy was marketing positioning; no verified legal registration address was found or removed. Confirm the actual booking account URL: the historical consultation link targets the general Calendly homepage, and no account URL was invented.

Privacy transparency should be checked against applicable law. The [ICO privacy-information checklist](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/) is a useful review structure for purposes, recipients and retention; it is not a determination that UK law applies to Crownatech.

## Other policy decisions

| Topic | Current treatment | Before enabling new features |
| --- | --- | --- |
| Privacy | Public owner-review draft and accessible footer/form links | Supply missing facts and obtain appropriate review |
| Website Terms of Use | Review needed for content ownership, client imagery licences, permitted use and service enquiries; no invented liability/jurisdiction clauses published | Approve final terms based on the business and audiences served |
| Cookies / preferences | Actual current browser-storage practices described in the privacy draft; no new banner added based on the limited evidence | Review dashboard tools, optional analytics and future embeds against applicable consent/opt-out requirements |
| Digital purchase terms | Not implemented | Approve real prices, seller identity, licence, taxes, support/updates and checkout terms |
| Delivery / refunds | Not invented or activated | Define digital delivery, download access, failed delivery, refund/cancellation and statutory-rights treatment for relevant markets |
| Future work-process video | No placeholder generated and no tracking embed added | Review the selected video host and its requests/cookies before embedding |

The [ICO cookie guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/) distinguishes uses and exemptions in its jurisdiction. Determine actual tools, audiences and applicable requirements before adding a banner or making consent claims. Do not label optional trackers necessary for convenience.

The separate [Stripe plan](stripe-implementation-plan.md) remains approval-gated. No payment secrets or production credentials were changed, and no database operations were performed.
