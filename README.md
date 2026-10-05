# RAW/FRAME — Creative Developer Portfolio

RAW/FRAME is a maximalist, motion-led portfolio for a freelance creative developer / filmmaker. It combines an editorial portfolio, services, client wall, team page, enquiry capture, AI chat and meeting booking.

## Stack

- React + TypeScript + Vite
- Framer Motion for page and interaction animation
- Three.js dependencies remain available for future 3D scenes
- Vercel serverless API functions
- PostgreSQL via `pg`
- Google Calendar via `googleapis` (optional)
- OpenAI-compatible AI endpoint via environment variables (optional)

## Routes

The site uses hash routing so it can still work on static GitHub Pages hosting.

- `#/ ` — home
- `#/work` — project archive
- `#/services` — Planning / Shooting / Editing / Growing
- `#/team` — team
- `#/clients` — client/logo wall
- `#/contact` — project enquiry
- `#/book` — meeting request
- Chat button — AI studio assistant

## Folder map

```
src/
  components/
    StudioShell.tsx   # global frame, nav, footer and page transition
    ProjectCard.tsx   # reusable project card
    Chatbot.tsx       # visitor chat UI
  data/site.ts        # dummy projects, services, clients, team and FAQs
  lib/api.ts          # frontend API functions
  pages/              # each public route
  App.tsx             # hash router
  App.css             # visual system
  index.css           # reset and font foundation

api/
  db.ts               # shared PostgreSQL pool
  contact.ts          # saves project enquiries
  meetings.ts         # saves bookings + checks Google Calendar
  chat.ts             # AI-compatible chat + fallback answers

db/schema.sql         # PostgreSQL tables and indexes
.env.example          # environment variable template
vercel.json           # serverless function configuration
```

## 1. Local setup

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## 2. PostgreSQL setup

Create a PostgreSQL database with your provider (Neon, Supabase, Railway, local PostgreSQL, etc.).

Copy `.env.example` to `.env` and set:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
```

Run `db/schema.sql` once against that database. For example, with `psql`:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

The tables are:

- `leads` — contact/project enquiries
- `meetings` — requested meeting slots and calendar IDs
- `chat_messages` — visitor question + assistant answer logs

## 3. Fix / enable calendar booking

The booking endpoint works without Google Calendar by saving a request to PostgreSQL. To create real Google Calendar events, create a Google service account and share the target calendar with the service-account email.

Set:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=...
GOOGLE_CALENDAR_ID=...
```

The API then:

1. saves the meeting request;
2. checks the requested interval with Google Calendar FreeBusy;
3. returns HTTP 409 when the slot is occupied;
4. creates a 30-minute event when free;
5. saves the resulting Google event ID.

This is why the old booking flow no longer depends on a frontend-only calendar widget.

## 4. Enable the AI chatbot

The chatbot works with a deterministic fallback even when no AI provider is configured.

For an OpenAI-compatible provider, set:

```env
AI_API_URL=https://your-provider.example/v1/chat/completions
AI_API_KEY=your-secret
AI_MODEL=your-model
```

Do **not** put these secrets in React code or commit a real `.env` file.

The browser talks only to `/api/chat`; the server owns the secret and forwards the conversation to the configured provider.

## 5. Deploy

Vercel is recommended because the repo already uses serverless `api/*.ts` functions.

1. Import `PremJ-ai/raw-frame-films` into Vercel.
2. Add the same environment variables in the Vercel project settings.
3. Deploy.
4. Run `db/schema.sql` against your production PostgreSQL database.
5. Share the Google Calendar with the service account if calendar creation is required.

GitHub Pages can display the frontend because routing is hash-based, but PostgreSQL, AI and Calendar APIs require a serverless backend such as Vercel.

## Editing the portfolio

Start with `src/data/site.ts`. Replace dummy projects, clients, team members and service copy there.

Project images currently reuse the repository's existing assets under `public/`. Replace those files or update the image paths in `site.ts`.

## Code comments

Every new functional file has comments describing what the function/module is responsible for and why the logic exists. The original legacy Three.js components were left in the repository rather than deleted, so they can be reused for future 3D sections.

## Important production checklist

- [ ] Set a real PostgreSQL `DATABASE_URL`
- [ ] Run `db/schema.sql`
- [ ] Configure Google Calendar credentials if bookings should create events
- [ ] Configure an AI provider if you want generative chat rather than fallback answers
- [ ] Replace dummy client/team/project data
- [ ] Replace placeholder imagery and approve all portfolio rights
- [ ] Add rate limiting / bot protection before public launch
- [ ] Add a privacy notice before collecting visitor contact data
