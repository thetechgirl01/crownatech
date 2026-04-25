# CrownaTech / JoyceOfWeb — MERN Agency Platform

A production-ready software agency website with admin panel, project showcase,
blog, store, and external-payment integration. Built on **MongoDB**, **Express**,
**React (Vite)**, and **Node.js**, with **Cloudinary** for image storage and
**Flutterwave / Paystack** as the payment gateway (links pasted into the admin —
no card data ever touches the site).

---

## Project structure

```
joyceofweb/
├── client/                  # Vite + React 19 + Tailwind v4 frontend
│   ├── src/
│   │   ├── api/             # axios instance + endpoint wrappers
│   │   ├── components/      # shared + admin + common UI
│   │   ├── context/         # AuthContext (JWT)
│   │   ├── pages/           # public pages
│   │   │   └── admin/       # admin panel pages
│   │   ├── App.jsx          # routing (public + lazy admin)
│   │   └── index.css        # design tokens + .prose-blog styles
│   ├── vite.config.js       # /api proxy to localhost:5000
│   └── .env.example
└── server/                  # Express + Mongoose backend
    ├── src/
    │   ├── config/          # db.js, cloudinary.js
    │   ├── controllers/     # auth, projects, blogs, contacts, uploads
    │   ├── middleware/      # auth (JWT), errorHandler, multer upload
    │   ├── models/          # User, Project, BlogPost, Contact
    │   ├── routes/          # api/auth, /projects, /blogs, /contacts, /uploads
    │   ├── utils/           # cloudinaryUpload, generateToken, seedAdmin
    │   └── index.js         # app boot (helmet, cors, rate-limit)
    └── .env.example
```

---

## Quick start

### 1. Prerequisites

- **Node.js ≥ 18.18**
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a free Atlas cluster
- A free **Cloudinary** account ([cloudinary.com](https://cloudinary.com)) for image hosting
- Optional: **Flutterwave** or **Paystack** for payment links

### 2. Install everything

From the project root:

```bash
npm install                # installs concurrently
npm run install:all        # installs client + server
```

### 3. Configure environment variables

Copy the two example files and fill them in:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env.local
```

**Server (`server/.env`)** — required:
| Key | What it is |
|---|---|
| `MONGO_URI` | Mongo connection string (`mongodb://127.0.0.1:27017/joyceofweb` works locally) |
| `JWT_SECRET` | Long random string — `openssl rand -hex 64` |
| `CLIENT_URL` | Comma-separated list of allowed origins (`http://localhost:5173` in dev) |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | From your Cloudinary dashboard |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME` | Used by the seed script below |

**Client (`client/.env.local`)** — leave `VITE_API_URL` blank in dev (the Vite
proxy handles it). Set it in production to the deployed API origin.

### 4. Create the admin user

```bash
npm run seed:admin
```

This creates (or updates the password for) the admin account using the
`SEED_ADMIN_*` values from `server/.env`. Re-runnable safely.

### 5. Start everything

```bash
npm run dev
```

This boots both the API (port 5000) and the Vite dev server (port 5173)
in parallel. Open:

- **Public site:** http://localhost:5173
- **Admin login:** http://localhost:5173/admin/login
- **API health check:** http://localhost:5000/api/health

---

## Available scripts

From the **root**:

| Script | What it does |
|---|---|
| `npm run install:all` | Installs both client and server deps |
| `npm run dev` | Runs client + server together |
| `npm run dev:client` | Vite dev server only |
| `npm run dev:server` | Express (with nodemon) only |
| `npm run build` | Production build of the client into `client/dist/` |
| `npm start` | Starts the server in production mode |
| `npm run seed:admin` | Creates / updates the admin user |
| `npm run lint:client` | ESLint on the client |

---

## API surface

All routes are under `/api`. JSON in, JSON out (multipart for file uploads).

| Method & path | Auth | Description |
|---|---|---|
| `GET /api/health` | — | Health check |
| `POST /api/auth/login` | — | Returns `{ token, user }` |
| `GET /api/auth/me` | Bearer | Returns the authenticated admin |
| `GET /api/projects` | — | Public list (only `visible:true`). Filters: `?category`, `?kind`, `?featured` |
| `GET /api/projects/admin` | Admin | Everything, including hidden |
| `GET /api/projects/:slug` | — | Single project by slug |
| `POST /api/projects` | Admin | Create. `multipart/form-data` with `heroImage` + `gallery[]` files |
| `PUT /api/projects/:id` | Admin | Update (same shape) |
| `PATCH /api/projects/:id/visibility` | Admin | Toggle visibility |
| `DELETE /api/projects/:id` | Admin | Delete + Cloudinary cleanup |
| `GET /api/blogs` | — | Published posts. `?category`, `?search` |
| `GET /api/blogs/admin` | Admin | All posts (incl. drafts) |
| `GET /api/blogs/:slug` | — | Single post |
| `POST /api/blogs` | Admin | Create |
| `PUT /api/blogs/:id` | Admin | Update |
| `DELETE /api/blogs/:id` | Admin | Delete |
| `POST /api/blogs/upload-inline` | Admin | Used by the rich-text editor for inline images |
| `POST /api/contacts` | — | Public submission (rate-limited 5/15min/IP) |
| `GET /api/contacts` | Admin | List submissions |
| `PATCH /api/contacts/:id` | Admin | Mark read / archived |
| `DELETE /api/contacts/:id` | Admin | Delete |
| `POST /api/uploads` | Admin | Generic Cloudinary upload (returns `{ url, publicId }`) |
| `DELETE /api/uploads/:publicId` | Admin | Remove an orphaned image |

---

## Admin panel

Sign in at `/admin/login`. The sidebar gives you:

- **Dashboard** — counts + recent contact submissions
- **Projects** — list, edit, delete, toggle visibility, jump to live link
  - **New / Edit project** — title, slug (auto-generated from title), description,
    design inspiration, category, kind (client vs stock), tags, industries
    (the filter tabs on the Works page), external link (live site OR payment link),
    price + currency for stock items, optional “Script Available” badge,
    multi-image hero + gallery, optional client testimonial, visibility toggle,
    display order
- **Blog Posts** — Quill rich-text editor, inline image uploads to Cloudinary,
  publish / draft toggle, cover image
- **Messages** — read every contact form submission, mark as read, reply by
  mailto, delete

Everything is connected end-to-end. Image deletes on the backend also remove the
asset from Cloudinary.

---

## Payment flow

This site **never** touches card details. The flow is:

1. Admin pastes a Flutterwave / Paystack payment link into the project's
   "External link" field, sets `kind = stock`, and gives it a price.
2. The project shows up on `/store` and on its own `/projects/:slug` page.
3. The user clicks **Buy Script** → opens the payment link in a new tab.
4. The payment provider handles the rest (success / failure / receipt).

There's no webhook or order DB on purpose — keep it simple, let the gateway own it.

---

## Deployment

### Frontend (Vercel / Netlify / Cloudflare Pages)

- **Build command:** `npm run build` (or `npm install && npm run build` from root)
- **Output directory:** `client/dist`
- **Env var:** `VITE_API_URL=https://your-api.example.com`
- Make sure SPA rewrites are on (rewrite `/*` to `/index.html`).

### Backend (Render / Railway / Fly.io / a VPS)

- **Build command:** `cd server && npm install`
- **Start command:** `cd server && npm start`
- **Env vars:** everything from `server/.env.example`
- `CLIENT_URL` should be your deployed frontend URL (you can list multiple
  comma-separated origins, e.g. preview deployments).

### MongoDB

- Local Mongo for dev; **MongoDB Atlas** free tier for prod is the simplest path.
- Whitelist your backend host's IP in Atlas Network Access.

### Cloudinary

- Sign up, grab the three keys from the dashboard, drop them in `server/.env`.
- Default folder is `joyceofweb` (override with `CLOUDINARY_FOLDER`).

---

## Security notes

- Passwords hashed with bcrypt (cost 12), never returned in API responses
- JWT (HS256) with 7-day expiry; client stores in `localStorage` (`jow_token`)
- `helmet`, CORS allow-list, global `/api/auth` rate-limit (30 req/15min/IP)
- Contact form rate-limited to 5 submissions / 15min / IP
- Multer rejects non-image uploads and caps file size at 10MB
- Slugs validated against `^[a-z0-9]+(?:-[a-z0-9]+)*$`
- All Cloudinary deletions are best-effort (logged but not fatal)

---

## Tech stack

**Backend:** Node.js, Express 4, Mongoose 8, JSON Web Tokens, bcryptjs, Cloudinary
SDK, Multer, Helmet, CORS, Morgan, express-rate-limit, validator.

**Frontend:** React 19, Vite 7 (Rolldown), React Router 7, Tailwind CSS v4,
axios, react-helmet-async, react-quill-new, react-icons, GSAP, lucide-react.

---

## What's where (cheat sheet)

- Want to add a new project category? Edit the `category` enum in
  `server/src/models/Project.js` and the `CATEGORY_OPTIONS` /
  `INDUSTRY_OPTIONS` arrays in `client/src/pages/admin/ProjectForm.jsx`,
  plus the `industries` array on `client/src/pages/Works.jsx`.
- Want to change the design tokens? `client/src/index.css` — search for `:root`.
- Want to change rate limits? `server/src/index.js` (auth) and
  `server/src/routes/contactRoutes.js` (contact form).

---

## License

Private — © CrownaTech. All rights reserved.
