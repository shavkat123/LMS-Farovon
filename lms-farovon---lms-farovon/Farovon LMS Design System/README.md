# Farovon LMS — Design System

> **Empowering teams through integrated learning, gamification, and collaboration.**

Farovon LMS is a Tajikistan-based enterprise Learning Management System (the founding email convention is `*@farovon.tj`). It bundles a course builder, real-time analytics, a gamified rewards shop, and a community forum into one product.

This design system codifies the colors, type, motion, components, copy voice, and product surfaces — so any new screen, slide, or marketing asset stays on-brand.

---

## Sources

| Source | Where | Status |
|---|---|---|
| **Modern frontend** (canonical) | GitHub: `shavkat123/farovon-lms` (React 19 + Vite + TypeScript + Tailwind v4 + Lucide + react-icons + Chart.js) | Primary reference |
| **Earlier frontend prototype** | GitHub: `shavkat123/farovon-lms-system` (frontend/ + backend/) | Secondary |
| **Power Apps / Dynamics portal** | GitHub: `shavkat123/LMS-Farovon` (Microsoft Power Pages YAML + content snippets) | Legacy / portal copy reference |
| **Backend** | FastAPI (Python) + SQLAlchemy + Pydantic + SQLite/Postgres | n/a for design |
| **Logo** | `uploads/logo (1).png` (provided by user) | → `assets/farovon-logo.png` |

The reader is not assumed to have access to these — files lifted into this project are checked in under `assets/`, `fonts/`, `ui_kits/`, and `slides/`.

---

## Index

```
.
├── README.md                  ← this file (Content + Visual + Iconography)
├── SKILL.md                   ← Agent Skill manifest
├── colors_and_type.css        ← CSS vars: colors, type scale, radii, shadows, motion
├── assets/                    ← logos, logomarks, brand imagery
├── fonts/                     ← (Roboto loaded via Google Fonts; see colors_and_type.css)
├── preview/                   ← Design System tab cards (one HTML per concept)
├── ui_kits/
│   └── web_app/               ← Farovon LMS web app — components + interactive demo
│       ├── README.md
│       ├── index.html         ← runnable click-thru of dashboard / courses / shop / forum
│       ├── Sidebar.jsx
│       ├── TopBar.jsx
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Badge.jsx
│       ├── ProgressBar.jsx
│       ├── PointsPill.jsx
│       ├── CourseCard.jsx
│       ├── WelcomeBanner.jsx
│       └── screens/           ← Dashboard / Courses / Shop / Forum / Login screens
└── slides/                    ← (none — no deck template was provided)
```

---

## CONTENT FUNDAMENTALS

**Voice.** Warm, encouraging, slightly enterprise. The product talks _to_ the learner ("**You're** doing great", "**Your** balance"), not about them. Mentors and admins get a more neutral operational tone ("Monitor team learning…", "Full system overview and control panel.").

**Casing.**
- **Sentence case** for body copy and most buttons ("Enroll Now", "Visit Rewards Shop →").
- **Title Case** for navigation labels and section headings ("Mandatory Training", "Recent Achievements", "Quick Actions", "Discussion Forum").
- **ALL-CAPS micro-labels** with wide tracking for eyebrow/metadata text — `text-[10px] font-black uppercase tracking-[0.2em]` ("POINTS", "% COMPLETE").
- The brand wordmark is rendered as **`FAROVON`** (ALL CAPS) followed by `LMS` in a softer weight.

**Pronouns.** Direct address — "you", "your". The dashboard greeting reads `Welcome back, {{name}}!`. Admin/HR copy uses imperative neutral voice — "Monitor", "Manage", "Track".

**Tone.**
- **Encouraging on student-facing surfaces** — "You're doing great. Continue your development path to unlock more skills and rewards." / "Complete lessons and pass exams to earn more points!"
- **Operational on admin surfaces** — "Manage all →", "Pending Review", "Active Enrollments".
- **Specific over vague** — deadlines render as `Due: 12 Mar 2026`; missed deadlines surface inline with a warning icon and red text.

**Punctuation & glyphs.**
- Right-arrow `→` is the standard CTA suffix on link-style actions ("Edit →", "Manage all →", "Visit Rewards Shop →").
- Middle-dot `·` separates inline metadata ("Missed deadline · 12 Mar 2026").
- Em-dash and ellipsis are used sparingly.

**Emoji.** Used **functionally**, not decoratively, and only inside the product chrome:
- ⭐ as the points / G-Token glyph (yellow-400).
- ❤️, 🚀, 🎯, 🛠️, 🎮, 📊, 💬, ⚡ appear in the README marketing copy and section headers, never in product UI.
- Achievement icons render whatever icon string the backend returns (`ach.icon`) — usually emoji.

**Specific examples (verbatim from the codebase):**
- Dashboard banner: `Welcome back, {{name}}!` / `You're doing great. Continue your development path to unlock more skills and rewards.`
- Empty mandatory state: `No mandatory training assigned right now. You're all caught up!`
- Points hint: `Complete lessons and pass exams to earn more points!`
- Login heading: `Welcome to FAROVON LMS` / `Sign in to access your learning dashboard`
- Sidebar footer: `© 2026 FAROVON Dev`

**Localization.** The product ships English + Russian (`react-i18next`, `src/locales/{en,ru}/translation.json`). Keep copy short — Cyrillic translations run ~20% longer.

---

## VISUAL FOUNDATIONS

### Color
A **two-track** palette: a vivid red **logomark** (the leaf-cluster mark in `assets/farovon-logo.png` — coral `#F2A088` upper petals, scarlet `#FF1F1F` lower petals) sits beside a calm **product-UI** palette built around blue primary `#007BFF` and a Tailwind gray scale. The logomark reds rarely appear inside the product — they're reserved for the wordmark, marketing, and danger states. Inside the app, **blue is the action color**, green is success, yellow-400 ⭐ is the gamification accent, and gray-50 is the workspace.

### Type
**Roboto** across the board (`400 / 500 / 700 / 900`). Loaded from Google Fonts. No serif. No display face. Numbers in the points/G-Token balance use **monospace tabular nums** (`ui-monospace, SFMono-Regular, Menlo`) so digits don't jitter as the score ticks.

The scale in use is Tailwind-default: `12 / 14 / 16 / 18 / 20 / 24 / 30 / 36`. Headings are **bold or extrabold (700–800)**; the points balance hits **black (900)**; eyebrow micro-labels are also `font-black` with `tracking-[0.2em]`.

### Spacing
Tailwind's 4-px grid. Card padding is `p-5` (20px) for compact, `p-6` (24px) for standard, `p-8` (32px) for the welcome banner. Vertical rhythm between sections is `space-y-6` (24px). Forms use `space-y-6` with 1px borders.

### Backgrounds
- **Workspace background** is flat `bg-gray-50` (`#F8F9FA`) — no patterns, no textures.
- **Surfaces** are flat white. No glass, no blur on cards.
- **Welcome banners** use a single linear gradient from `blue-600 → blue-400` (student), `indigo-600 → purple-500` (mentor/HR), `gray-800 → gray-600` (admin), with a 20%-opacity outline-style icon (`FaMedal`, ~180–200px) bleeding off the top-right corner.
- **Modal backdrops** use `bg-gray-900/60` + `backdrop-blur-sm` — this is the **only** place blur is used.
- **Sidebar bottom strip** for students gets a subtle `from-violet-50 to-indigo-50` gradient under the points balance — the one decorative gradient inside chrome.

### Animation
- All transitions are **`transition-colors duration-200`** or **`transition-all duration-500 ease-out`** (the progress bar fill).
- Modals fade-and-rise: `opacity 0 → 1`, `translateY(-12px) scale(0.98) → 0/1` over `200ms`.
- Cards lift on hover: `-translate-y-1` with `shadow-sm → shadow-md` over `200ms`.
- A toast-style notification dot uses the Tailwind `animate-ping` halo.
- Loading buttons spin a 4-stop SVG circle.
- **No bounces, no springs, no parallax, no scroll-jacked animations.**

### Hover states
- **Buttons:** background shifts to a darker variant (`primary → primary-hover`, `success → success-hover`).
- **Ghost buttons / sidebar links:** background fades to `gray-100`, text to `gray-900`.
- **Outline buttons:** background fades to a 50-tint (`hover:bg-blue-50`).
- **Cards (when `hoverable`):** lift `-translate-y-1` + shadow upgrade.
- **Icon buttons:** color shifts from `gray-400 → gray-700`, background to `gray-100`.

### Press / focus
- All buttons share `focus:ring-2 focus:ring-offset-2` with the variant's color.
- Inputs use `focus:ring-1 focus:ring-primary focus:border-primary`.
- No explicit "pressed" scale-down — relies on color shift only.

### Borders
- Cards: `1px solid var(--border-1)` (`gray-200`).
- Inputs: `1px solid gray-300` → primary on focus.
- Section dividers: `border-t border-gray-100` or `border-gray-200`.
- **Left-border accents** for emphasis: `border-l-4 border-l-red-500` on mandatory-training cards, `border-r-4 border-primary` on the active sidebar item. (This is the one place left-border accents are sanctioned — don't over-use.)

### Shadows
- **`shadow-sm`** on resting cards.
- **`shadow-md`** on banners and on hovered cards.
- **`shadow-2xl`** on modals (only).
- No inner shadows. No coloured shadows.

### Capsules vs. gradients
Status uses **soft-tinted pill badges** (`bg-blue-100 text-blue-800`, `bg-green-100 text-green-800`, `bg-red-100 text-red-800`, `bg-yellow-100 text-yellow-800`, `bg-gray-100 text-gray-800`) — never gradient pills. Welcome banners are the only gradient surfaces in the app.

### Layout
- **Two-column app shell**: 256px (`w-64`) fixed sidebar, fluid main column.
- **Sticky 64px (`h-16`) header** inside the main column (`top-0 z-10`).
- Content area max-width is implicit — uses 12-column responsive grids (`lg:grid-cols-3` with `lg:col-span-2` main + 1-col rail).
- Cards inside grids use `gap-4` (16px) or `gap-6` (24px).

### Transparency & blur
**Sparingly.** Backdrop blur only on modal overlays (`bg-gray-900/60 backdrop-blur-sm`). Toast notification halo uses `opacity-75`. Banner medal decorations use `opacity-10` to `opacity-20`. No frosted-glass cards.

### Imagery
The codebase doesn't ship product photography. Decorative imagery is limited to the logomark and large outline icons (`FaMedal`) used as banner watermarks. **Tone for any imagery added later should be warm, candid, well-lit office/classroom photography** — not stocky, not hand-illustrated, no grain filter.

### Corner radii
- Buttons: `rounded-md` (6px).
- Inputs: `rounded-md` (6px).
- Cards: `rounded-lg` (8px).
- Banners: `rounded-xl` (12px).
- Modals: `rounded-2xl` (16px).
- Badges, points pills, avatars: `rounded-full`.

### Card anatomy
`bg-white` + `border border-gray-200` + `shadow-sm` + `rounded-lg` + `overflow-hidden`. Padding from `p-5` to `p-8` based on density. The `hoverable` variant adds the lift + shadow upgrade.

### Z-stack
`z-10` for sticky header, `z-50` for modals. No tooltip layer convention yet — pick `z-40` if needed.

### Motion principles
**Reassuring, not exuberant.** All easing curves are `ease-out` or Tailwind default. Durations cluster around `150–200ms` for state changes and `500ms` only for the progress-bar fill. The product never bounces.

---

## ICONOGRAPHY

The product uses **two icon libraries side-by-side** (this is the codebase's actual practice — see `package.json`):

1. **`react-icons/fa`** (Font Awesome 5 free, solid set) — the dominant in-product set: `FaHome`, `FaBook`, `FaTrophy`, `FaStore`, `FaUsers`, `FaChartBar`, `FaCog`, `FaComments`, `FaLightbulb`, `FaBell`, `FaSearch`, `FaUserCircle`, `FaStar`, `FaMedal`, `FaClock`, `FaExclamationTriangle`, `FaTimes`.
2. **`lucide-react`** (`^0.576`) — used in newer course-builder / forum surfaces.

**Style.** Solid-fill glyphs at sidebar nav (size 18–20px, gray-600 → primary on active), outline at marketing/banner accents (large, 180–200px, opacity 10–20%). Stroke widths are whatever the library ships — don't mix custom strokes.

**Sizing.** Sidebar nav: `text-lg` (~18px). Header actions: `size={20}`. Badge icons: `size={10–12}`. Hero/banner watermarks: `size={180–200}` at low opacity.

**Color.** Inherits `currentColor` — gray-400/500 at rest, primary on active, semantic colors (red/amber/green) when paired with status copy.

**Emoji as icons.** Only inside gamification: ⭐ for points (yellow-400), and whatever emoji the backend stores in `achievement.icon`.

**Unicode glyphs as icons.** `→` (right-arrow) suffix on link-style CTAs is the only one.

**Custom SVGs.** Only the loading spinner inside `<Button isLoading>` and the (default Vite) `react.svg` placeholder.

**Brand logo** lives at `assets/farovon-logo.png` (transparent), `assets/farovon-logomark.png` (alt mark), `assets/farovon-logo-square.jpeg` (square crop). The wordmark is set in Roboto Bold: `FAROVON` (primary blue) + ` LMS` (gray-800, slightly smaller weight).

**Iconography in this design system.** UI kit components use Lucide via CDN (`https://unpkg.com/lucide@latest`) since it covers everything Font Awesome does at parity. **Substitution flagged:** the live product mixes `react-icons/fa` and `lucide-react`; this kit standardises on Lucide. Swap back to `react-icons/fa` for production parity.

> **Note on fonts.** Roboto is loaded from Google Fonts (no local TTF files were shipped in the codebase). If you need offline rendering, download Roboto 400/500/700/900 from <https://fonts.google.com/specimen/Roboto> into `fonts/` and update `colors_and_type.css`.

---

## Using this system

- **Prototype against `colors_and_type.css`** — link it from any HTML file and use the CSS vars (`var(--color-primary)`, `var(--text-2xl)`, `var(--radius-lg)`, etc.).
- **Lift components** from `ui_kits/web_app/` — they're plain JSX, no build step, runnable via `<script type="text/babel">`.
- **Match the voice.** Sentence case for body, Title Case for nav, ALL-CAPS for eyebrows, `→` on link CTAs.
- **Match the motion.** 200ms color transitions, 500ms progress fills, fade-rise modals — nothing bouncier.
