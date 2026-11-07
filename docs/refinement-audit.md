# Final refinement inventory and acceptance map

Baseline: `ecdec28` on `main`, inspected against `f22964d`, `1f3efb2`, and `b3a8636`. The previous consultation colors and text-path ring are present in `1f3efb2:client/src/components/Bookcall.jsx`.

## Route and component inventory

| Area | Existing implementation | Refinement |
| --- | --- | --- |
| Public shell | Navbar, Footer, Bookcall, useDialog, shared CSS | Keep toggle; add Home; close menu on logo; consistent button icons, backgrounds and legal links |
| Home | Hero, Services, About, Projects, WorkProcess, Contact, embedded Blogs | Directional About, visible carousel arrows, looping gold-star types, restrained shared reveals and wordmark motion |
| About | AboutUs, repeated stats/process/service cards | Editorial story using existing portrait/content; no new achievements or metrics |
| Work | Works, custom polygon cards, `lg:mt-96` | Preserve desktop grid, polygons, imagery and stagger; improve corner-action separation and mobile gaps |
| Blog | Blogs, BlogContentPage, search, filters, newsletter state | Preserve two-tone header and CMS; honest empty state; shared controls and copy punctuation |
| Contact | Contact page, real contacts API, SuccessModal | Keep payload/validation; consistent header/buttons/background and remote-first copy |
| Store/project | Store, ProjectDetail, projects API | Two-tone header, shared controls; block public Stripe test checkouts; plan commerce separately |
| Admin | Layout, login, dashboards, lists, project/blog editors | Shared control styling, no authentication/data changes; check visible copy and field behavior |
| Feedback | Spinner, CardSkeleton, EmptyState, ErrorBoundary | Keep accessible loading/error/empty states; include in regression checks |
| Privacy | No route/policy existed | Evidence-based public draft, footer/form link, explicit owner-review gaps |
| Historical unmounted files | WorkContntPage, projects/Errandsbybrownie, Blog, Youtube, Tesst | Not public routes; disable placeholder checkout targets; preserve client project location text and avoid rewriting historical content |

## Requirement coverage

| Brief item | Work batch / evidence |
| --- | --- |
| 1, 13: palette and navy roles | A: aliases for `#011936`, `#1e293b`, `#daa520`, white/near-black; social panel matches navy section role |
| 2: all buttons | A: shared pill/icon-circle rules; diagonal navigation arrows; form/close/destructive semantics retained |
| 3: navigation | A: Home first, no text close control, logo closes menu; focus trap includes original toggle |
| 4: Blog-style headers | A: white lead / muted continuation for About, Work, Contact, Store and FAQ |
| 5: directional About preview | A: right-aligned content, original image slices and copy retained |
| 6: About page | A: existing story/portrait in an editorial composition, process as a numbered list rather than repeated grids |
| 7: Works | B: exact polygon and desktop stagger retained; measured corner breathing room; smaller mobile gaps |
| 8: project controls | B: previous/next, boundaries, resize, swipe, dots, keyboard and reduced-motion checks |
| 9: website types | B: two identical groups, gold stars, slow loop, pause control and reduced-motion static alternative |
| 10: motion | B: one IntersectionObserver + Web Animations system; minimal movement, once per mount, content visible by default, reduced-motion bypass |
| 11: process video readiness | B: preserve steps; named introduction region can accept a future video, no placeholder asset |
| 12: consultation | B: historical white/gray/black/gold colors and circular text, current dialog coordinates/spacing preserved |
| 14: remote positioning | A: replace marketing Lagos/Nigeria positioning; preserve factual client-project context |
| 15: em dashes | A: replace authored UI/metadata punctuation without editing dependencies, code syntax or CMS records |
| 16: Blog | A/C QA: preserve header, real data integration and honest empty states |
| 17: Store/Stripe | C: public-link guard, no live commerce; separate checkout/webhook/order/download plan |
| 18: privacy/legal | C: inspect models/controllers/storage/third parties and live cookies; draft notice, legal review checklist, no unverified consent banner |
| 19: mobile | Every batch: 320/375/768/1440px and interaction checks |
| 20: quality | Every batch: build, lint baseline comparison, browser/contrast/forms/link checks, credential-pattern scan |
| 21: Git/deployment | Every batch: main, focused commit, normal push, production result and live verification |
| 22: acceptance | Final: cross-page audit and documented limits; no homepage-only completion |

Owner review remains required for legal identity/contact details, jurisdiction/legal basis, retention/deletion rules, hosting/storage regions, backup access/retention, vendor contracts and future purchase/refund/download terms. Dashboard-only scripts and provider cookies must be distinguished from repository evidence.
