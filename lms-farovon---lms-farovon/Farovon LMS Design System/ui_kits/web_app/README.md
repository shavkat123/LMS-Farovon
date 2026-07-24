# Farovon LMS — Web App UI Kit

Pixel-honest recreation of the Farovon LMS web app, lifted from `shavkat123/farovon-lms` (React 19 + Vite + Tailwind v4 + react-icons + lucide-react).

This kit is **runnable in a single HTML file** — no build step. It uses Babel-standalone + JSX over CDN React 18.3 + Lucide via CDN, with Tailwind utilities for layout.

## Files
- `index.html` — interactive click-thru (login → dashboard → courses → forum → shop)
- `Sidebar.jsx` — 256px nav with wordmark + active-state right-border + bottom points strip
- `TopBar.jsx` — sticky 64px header with search, notifications, language switcher, user
- `Button.jsx` — primary / success / danger / outline / ghost variants × sm/md/lg
- `Card.jsx` — flat white surface with optional `hoverable` lift
- `Badge.jsx` — soft-tinted pill, 5 variants
- `ProgressBar.jsx` — track + fill, configurable color/height, 500ms ease-out
- `PointsPill.jsx` — small ⭐ + tabular-num value + "pts" eyebrow
- `WelcomeBanner.jsx` — gradient banner with watermark medal
- `CourseCard.jsx` — card with optional required left-border + progress + CTA
- `screens/Login.jsx`, `screens/Dashboard.jsx`, `screens/Courses.jsx`, `screens/Forum.jsx`, `screens/Shop.jsx`, `screens/AppShell.jsx`

## Notes / corner-cuts
- Routing is in-memory state, not react-router.
- Icons come from Lucide CDN (`lucide@latest`); production uses `react-icons/fa` + `lucide-react`.
- Data is hard-coded — no API. The login screen accepts any creds.
- Tailwind utilities are loaded via `cdn.tailwindcss.com` for the demo.
