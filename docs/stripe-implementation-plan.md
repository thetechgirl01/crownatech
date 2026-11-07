# Future digital-product sales: proposed implementation

Planning only. No Stripe SDK, payment endpoint, credentials, orders, database migrations or live checkout have been introduced. Owner approval is required before implementation and separately before live activation.

## Product readiness

Confirm the seller's legal entity, account eligibility, currency, tax obligations, supported countries, licensing, product descriptions, real prices, version/support scope, file contents, delivery method and refund terms. Obtain approved purchase/privacy notices before taking payments. Never manufacture sample products or prices in production.

Keep the public Store backed by the existing project catalog. Future product detail needs: actual screenshots/description, price/currency, license, requirements, version/changelog, what is included, support/update terms and delivery/refund information. A missing or blocked external link currently falls back to product details/contact rather than a test checkout. No existing database values were rewritten.

## Server-owned checkout

Proposed: an authenticated or securely session-bound server endpoint accepts only a product identifier and allowed quantity. It reads the approved product and Stripe Price mapping on the server, validates availability, and creates a hosted Checkout Session. Do not trust browser-submitted totals, currency, price IDs, entitlement IDs or redirect URLs. Use server-side idempotency and rate limits. Keep all payment secrets in approved service configuration, never the client or Git.

Use Stripe-hosted payment entry so card details do not pass through Crownatech's application. HTTPS and the business's own security/compliance review still apply. [Stripe integration security guidance](https://docs.stripe.com/security/guide).

## Verified payment and webhook handling

Use a dedicated webhook route that preserves the raw request body before Express JSON parsing. Validate the Stripe signature against the correct endpoint secret. Reject invalid signatures and separate test/live configuration. [Stripe webhook signature guidance](https://docs.stripe.com/events/manage-webhook-endpoints#resolve-signature-verification-errors).

Retrieve the Checkout Session and validate its payment state, line items, environment and association with the expected order. Handle immediate and delayed payment outcomes, duplicate/retried/out-of-order events and concurrent fulfillment safely. A browser redirect alone must not grant downloads. [Stripe fulfillment guidance](https://docs.stripe.com/checkout/fulfillment?ui=full-page).

## Proposed order and entitlement records

Use explicit order states: pending, paid, fulfilled, failed, refunded. Store the approved product/version, server-calculated price/currency, purchase contact, provider Session/Payment IDs and timestamps. Enforce unique event/session identifiers and an atomic paid-to-fulfilled transition. Record an audit trail without payment secrets or card data. Confirm retention/deletion rules before collecting new fields.

## Controlled downloads

Keep deliverable files in private storage. Only a server-verified paid entitlement can obtain a short-lived, product/version-scoped signed download. Use an account or a securely delivered expiring purchase token; authorization remains server-side. Check expiry, revocation and refund status on each issuance; rate-limit access and avoid permanent public asset URLs. Define support/reissue and permitted re-download behavior before implementation.

## Release gates

First test in an isolated non-production environment. Cover forged prices, invalid signatures, missing raw bodies, delayed/failed payments, duplicate events, concurrency, abandoned checkout, stolen/expired download tokens, refunds and authorization failures. Then obtain owner approval for policies, credentials, provider settings and live activation. Monitor payment/fulfillment failures before expanding sales. No automatic switch to live mode.
