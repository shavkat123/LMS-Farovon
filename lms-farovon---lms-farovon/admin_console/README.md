# Farovon LMS — Admin Console (handoff)

Single self-contained HTML file: the full corporate admin panel for Farovon LMS.
Open `AdminConsole.html` directly in a browser (React 18 + Babel + Tailwind + Lucide via CDN).

## About this file (read first)
`AdminConsole.html` is a **high-fidelity design reference**, not production code to ship as-is.
It's a hi-fi mockup: final colors, spacing, typography, copy, and interactive states are
intentional and should be reproduced exactly. The task is to **recreate these screens in your
target codebase's environment** (React/Vue/etc. with your router, state, and styling system) —
not to embed this HTML. If no frontend exists yet, pick the appropriate framework and build there.
Demo data is hard-coded inline; replace it with real API/props.

## What's inside — 15 screens
**Обзор:** Дашборд · Аналитика
**Контент:** Курсы (редактор) · Траектории · Тесты · Библиотека
**Люди:** Сотрудники · Группы · Роли и доступы
**Коммуникации:** Рассылки · Форум (модерация) · События
**Система:** Настройки · Интеграции · Журнал аудита

Navigate via the left rail — the active screen swaps in the content area.

## Design system (keep exactly)
- **Font:** Inter (400–700). Numbers use tabular-nums; monospace = JetBrains Mono (`.adm-mono`).
- **Primary:** navy #1E3A8A. **Accent (status/urgency only):** warm #B45309.
- **Neutrals:** app bg #F4F5F7, surface #fff, text #0B1220 / #475569 / #94A3B8, borders #E5E7EB.
- **Status:** success #15803D, danger #B91C1C.
- **Icons:** Lucide, stroke 1.5. **No emoji anywhere.**
- **Density:** compact enterprise — 8px grid, sharp-ish corners (6–10px), thin borders, minimal shadow.
- All tokens are CSS variables (`--adm-*`) in the `<style>` block. Reuse them; don't hard-code hex in components.

## Reusable primitives (already in the file)
- `AdmToolbar` — search + filter chips + primary action bar.
- `AdmStat` — KPI stat card (icon, label, value, delta).
- `.adm-card`, `.adm-table`, `.adm-pill` (--success/--info/--warn/--danger/--neutral, --dot variant), `.adm-btn` (--primary/--ghost/--danger-ghost), `.adm-input`, `.adm-avatar`, `.adm-eyebrow`.

## For Claude Code
Rebuild as production React (your router + styling system), preserving:
1. Palette, spacing, typography (tokens above) — verbatim.
2. Each screen's layout: stat rows, dense tables, filter toolbars, the permission matrix, settings toggles, audit log with highlighted security row.
3. Russian copy as-is.
4. Interactive state already present: rail navigation, settings tabs, filter chips.
Replace the hard-coded demo arrays in each component with real API data / props.
Split the single file back into per-screen components (they're already separated by `/* ===== FileName ===== */` banners).
