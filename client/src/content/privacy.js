export const privacyReviewDate = '2026-11-07';
export const privacySections = [
  {
    id: 'about-this-draft', title: 'About this draft',
    paragraphs: [
      'Crownatech operates this website and handles project enquiries. This draft describes the practices found in the website code and a limited public-browser review. It is available for owner review and is not a claim of legal completeness or regulatory certification.',
      'The owner must confirm the legal entity name, privacy contact details, applicable jurisdictions and lawful bases before this notice is finalized.',
    ],
  },
  {
    id: 'contact-data', title: 'Project enquiries',
    paragraphs: [
      'When you submit the contact form, the application collects your name, email address, message and optional budget. The backend also records the submitting IP address, browser user-agent information and submission timestamps.',
      'These records support responding to enquiries, discussing project requirements, managing messages and protecting the form against abuse. Contact messages are stored in a MongoDB database configured for the backend. Message-management routes require an administrator sign-in.',
    ],
  },
  {
    id: 'newsletter', title: 'Email subscriptions',
    paragraphs: ['The newsletter fields are currently disabled. They do not submit or save email addresses. This notice must be reviewed before a mailing-list service or email-marketing collection is introduced.'],
  },
  {
    id: 'cookies', title: 'Cookies and browser storage',
    paragraphs: [
      'Administrator sign-in uses browser local storage for a login token and basic profile information. Signing out clears those application entries. The authentication token expiry is configurable; the production value needs owner confirmation.',
      'No first-party cookie-setting or advertising analytics code was found in the inspected application. In a fresh unauthenticated sample of the homepage and contact page, no cookies or local-storage entries were observed. This limited sample does not establish that every provider, browser or page is cookie-free.',
      'Hosting-dashboard analytics settings and provider-level cookies remain to be confirmed. No new consent banner has been added on the basis of this sample. Any future tracking, video embed or marketing tool requires a fresh review of its actual behavior and applicable consent or preference requirements.',
    ],
  },
  {
    id: 'providers', title: 'Hosting and external resources',
    paragraphs: [
      'The frontend is hosted on Vercel and the backend on Render. The application uses MongoDB for stored records and Cloudinary for uploaded website images. The database provider, storage regions, backup arrangements, vendor agreements and provider retention settings need owner confirmation.',
      'Pages load fonts from Google Fonts, process imagery from Unsplash, and some published images from Cloudinary. Those services receive the connection information needed to deliver their resources. Social sharing links, project links and the consultation link take you to external websites with their own notices.',
      'The backend uses HTTP request logging. The scope and retention of application, hosting and security logs must be confirmed by the owner.',
    ],
  },
  {
    id: 'retention', title: 'Retention and requests',
    paragraphs: [
      'The inspected application does not define an automatic contact-message deletion schedule. Retention periods or criteria for enquiries, administrator profiles, logs and backups have not been confirmed and must be supplied by the owner.',
      'You can use the Contact page to ask about information submitted through the website, or to request a correction or deletion. The applicable rights, identity-verification process, response arrangements and complaints contact need owner review. This draft does not promise an unverified response deadline.',
    ],
  },
  {
    id: 'future-products', title: 'Future digital products',
    paragraphs: [
      'Crownatech plans to offer scripts and digital products. This application does not currently create Stripe checkout sessions or store payment-card details or order records. Existing external product or project links are governed by the destination website.',
      'Any future checkout, purchase-contact collection, payment provider, order storage or controlled-download feature needs a separate privacy and terms review before activation. No live payment integration is enabled by this draft.',
    ],
  },
  {
    id: 'owner-review', title: 'Information still required from the owner',
    items: [
      'Legal entity name, required business disclosures and a direct privacy contact.',
      'Applicable jurisdictions, lawful bases, rights and complaints arrangements.',
      'Actual retention and deletion criteria, including logs and backups.',
      'Provider contracts, processing/storage regions and any international transfer arrangements.',
      'Hosting-dashboard analytics, cookies and any tools added outside the repository.',
      'Future purchase, licence, delivery, refund and download-access terms.',
    ],
    paragraphs: ['This draft should be finalized against those confirmed details and reviewed by an appropriately qualified adviser before being presented as a complete legal notice.'],
  },
];
