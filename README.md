# Barimo Law, P.A. — Website

Rebuilt with **Next.js 15** (App Router) + TypeScript + Tailwind CSS + Framer Motion.
The contact form posts to a Next.js API route (`app/api/contact/route.ts`) which
sends email through [Resend](https://resend.com).

This replaces the previous Vite + standalone Vercel-function setup — everything
(frontend and the `/api/contact` endpoint) now lives inside one Next.js app.

---

## 1. Prerequisites

- **Node.js 20+** — check with `node -v`. Get it from https://nodejs.org if needed.
- **Git** — check with `git -v`.
- **Git Bash** (comes with [Git for Windows](https://git-scm.com/download/win)) if you're on Windows.
- A free [GitHub](https://github.com) account.
- A free [Vercel](https://vercel.com) account (sign in with GitHub).
- A free [Resend](https://resend.com) account, for the contact form emails.

---

## 2. Run it locally

Open **Git Bash** in this project folder and run:

```bash
npm install
```

Copy the env file and fill in your Resend values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=you@yourfirm.com
CONTACT_FROM_EMAIL=
```

- Get `RESEND_API_KEY` from https://resend.com/api-keys (free tier is fine for low volume).
- `CONTACT_TO_EMAIL` is where form submissions land.
- Leave `CONTACT_FROM_EMAIL` blank until you verify your own domain in Resend — it
  will default to Resend's shared test sender.

Start the dev server:

```bash
npm run dev
```

Visit **http://localhost:3000**. Edit files under `app/` or `components/` and
the page hot-reloads.

To check that everything builds cleanly (this is exactly what Vercel runs):

```bash
npm run build
```

---

## 3. Push to a local Git repo, then GitHub

Still in Git Bash, from the project folder:

```bash
git init
git add -A
git commit -m "Initial commit: Next.js rewrite"
```

Create a new **empty** repository on GitHub (no README/license, so it has
nothing to conflict with) — go to https://github.com/new, name it e.g.
`barimo-law`, and click **Create repository**.

GitHub will show you the remote URL. Connect and push:

```bash
git remote add origin https://github.com/<your-username>/barimo-law.git
git branch -M main
git push -u origin main
```

If prompted, sign in with your GitHub credentials (Git Bash will open a
browser login, or ask for a personal access token).

---

## 4. Deploy to Vercel

1. Go to https://vercel.com/new.
2. Click **Import Git Repository** and select the `barimo-law` repo you just pushed.
3. Vercel auto-detects **Next.js** — leave the default build settings as-is
   (Build Command `next build`, Output `—`, Install Command `npm install`).
4. Before clicking Deploy, expand **Environment Variables** and add the same
   three values from your `.env.local`:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL` (optional)
5. Click **Deploy**.

Vercel builds and gives you a live `*.vercel.app` URL. Every future
`git push` to `main` auto-deploys.

### Updating the site later

```bash
git add -A
git commit -m "Describe your change"
git push
```

Vercel picks up the push automatically and redeploys.

---

## Project structure

```
app/
  layout.tsx          Root layout: fonts + <head> metadata
  page.tsx             Home page, composes all sections
  globals.css           Tailwind base styles
  api/contact/route.ts  Contact form API route (Resend email)
components/              All UI sections (Hero, TeamSection, CTASection, etc.)
src/data/team.ts         Team member data
src/types/team.ts        Shared TypeScript types
public/                   Static assets (logos, team photos, favicon)
```

## Notes carried over from the original build

- The contact form has a honeypot field (`company`) to filter out simple bots.
- The Super Lawyers badge slot in the footer is a placeholder `div` — drop the
  embed code in once the client provides it.
- Testimonials use three real client reviews (Ellie S., William S., Vanessa C.).
- Footer includes the office address, Instagram link, and privacy policy link.
  No phone number is listed anywhere on the site by design.
- The Instagram section (`#follow`) links out to instagram.com/barimolaw —
  Instagram does not provide a public API/embed for a live scrolling feed
  without an authenticated Business API connection, so this is a static,
  on-brand set of content categories that deep-link to the profile. If the
  firm later wants a real live feed, connect the Instagram Graph API and swap
  the tiles in `components/InstagramSection.tsx` for fetched post data.
- The contact form captures an additional "case type" field (property
  insurance vs. personal injury vs. not sure) and includes it in the email
  Resend sends — update `app/api/contact/route.ts` if you want to route by
  case type later.
