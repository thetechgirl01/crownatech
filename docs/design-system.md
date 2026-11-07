# Crownatech visual standards

The shared direction combines the homepage's navy and expressive Gotu display type, the Blog's restrained editorial layouts, and Work's distinctive cutout imagery. Rounded controls, slate panels, white text, and deliberate goldenrod accents connect these patterns. Preserve the staggered Work composition and custom image shapes.

## Foundations

Tokens and reusable CSS live in `client/src/index.css`. Navy `#011936` is the brand canvas; slate `#1e293b` is the raised surface; goldenrod `#daa520` is the action/accent color, with existing amber `#fbbf24` for hover. Use dark text on gold. White and near-black provide contrast; error/success colors convey status only.

Keep Gotu for page display headings, Montserrat for section headings, and Roboto for body copy and controls. Use `.ct-page-heading`, `.ct-container`, `.ct-section`, `.ct-panel`, `.ct-button` with primary/secondary/tertiary variants, and `.ct-field`. Shared fields retain their labels, names, validation, and API behavior. Focus must remain visible, disabled controls clear, and touch targets comfortable.

Motion is optional. Prefer short color transitions, avoid scroll-triggered text splitting and content hiding, and respect reduced motion. The functional project carousel remains.

## Audit and rollout

- Foundations: competing yellow/goldenrod values, empty hover token, hidden scrollbars, low-contrast text, inconsistent button/field styles.
- Shared shell: offscreen menu remains keyboard-focusable; footer CTA overwhelms smaller pages; footer marquee and grain differ from the main visual language; newsletter controls differ across pages.
- Pages: About/Contact have nested gutters; FAQ uses unrelated purple gradients; page heading sizes and vertical offsets vary. Preserve article reading widths and Work stagger.
- Motion: long hero reveal, repeated SplitText entrance effects, About reverse-on-scroll, FAQ stagger/scale and decorative marquees create unnecessary delay and hidden-content risks.
- Forms and feedback: connect visible labels, standardize field sizing and validation announcements, keep real contact submissions unchanged. Newsletter forms currently simulate success without an endpoint: never present simulated subscription success as a real subscription.
- Admin: apply shared control and surface styles without changing authentication, APIs, or data operations.

Each batch is built, checked in the browser across mobile/tablet/desktop, committed to main, and checked on production after Vercel deployment. Backend health is checked; a health response alone does not prove a Render deployment SHA.

## Implemented refinements

The shared shell uses a compact navy footer with a restrained Gotu CTA and consistent navigation and newsletter controls. Newsletter fields are explicitly unavailable until a real endpoint exists; they collect no addresses and never claim a subscription succeeded.

Active public pages use shared heading scales, containers and gutters. Home section headings are h2 under one h1. The shell includes a skip link and main landmark. Native FAQ disclosure controls work with keyboard input and without animation code. Work filters retain their behavior and project cards retain their clip-path and 384px desktop stagger; the fixed mobile card minimum width was removed.

Scroll-triggered heading/section reveals, decorative marquees, particle pulses and large hover moves were removed from routed pages. The project carousel still works, respects reduced motion and has 44px pagination targets. Process imagery loads lazily with intrinsic dimensions. Existing business facts, FAQ answers and API data were retained; no new statistics, prices, testimonials or portfolio items were added.

Shared dialog behavior contains focus, handles Escape, restores focus and restores scrolling after close. Contact fields have programmatic labels and autocomplete; contact API payloads and success/error handling are retained. Admin control styles and labels are shared without changing authentication or backend operations.

Historical, unmounted page templates remain in the repository; they are not part of the current route tree. Existing unrelated lint errors remain in legacy templates, data-fetching effects and admin code. The deployment procedure does not treat a successful build as a clean lint result.
