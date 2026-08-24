// v2 Sidebar — colored icon tiles, like Equeo
function SidebarV2({ active, onNav, points = 1250 }) {
  const links = [
    { id: 'dashboard', icon: 'layout-dashboard', label: 'Главная',          tint: 'var(--v2-tint-blue)',   color: 'var(--v2-primary)' },
    { id: 'courses',   icon: 'book-open',        label: 'Курсы',            tint: 'var(--v2-tint-orange)', color: 'var(--v2-accent-orange)' },
    { id: 'paths',     icon: 'route',            label: 'Траектории',       tint: 'var(--v2-tint-teal)',   color: 'var(--v2-accent-teal)' },
    { id: 'events',    icon: 'calendar-days',    label: 'Мероприятия',      tint: 'var(--v2-tint-violet)', color: 'var(--v2-accent-violet)' },
    { id: 'forum',     icon: 'message-circle',   label: 'Сообщество',       tint: 'var(--v2-tint-pink)',   color: 'var(--v2-accent-pink)' },
    { id: 'rating',    icon: 'trophy',           label: 'Рейтинг',          tint: 'var(--v2-tint-amber)',  color: '#D97706' },
    { id: 'shop',      icon: 'gift',             label: 'Магазин наград',   tint: 'var(--v2-tint-teal)',   color: 'var(--v2-accent-teal)' },
  ];

  return (
    <aside className="w-[260px] shrink-0 h-full flex flex-col" style={{ background: '#fff', borderRight: '1px solid var(--v2-border-1)' }}>
      <div className="h-[72px] flex items-center px-6 gap-3" style={{ borderBottom: '1px solid var(--v2-border-1)' }}>
        <img src={(window.__resources && window.__resources.logo) || "../../assets/farovon-logo.png"} alt="" style={{ width: 32, height: 32 }} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em', color: 'var(--v2-fg-1)' }}>FAROVON</div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--v2-fg-3)' }}>LEARNING HUB</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <ul className="space-y-1">
          {links.map(l => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a href="#" onClick={(e) => { e.preventDefault(); onNav(l.id); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                  style={{
                    background: isActive ? l.tint : 'transparent',
                    color: isActive ? l.color : 'var(--v2-fg-2)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: 14,
                  }}
                >
                  <span className="flex items-center justify-center rounded-lg shrink-0"
                    style={{
                      width: 32, height: 32,
                      background: l.tint,
                      color: l.color,
                    }}>
                    <i data-lucide={l.icon} style={{ width: 16, height: 16 }} />
                  </span>
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="m-3 p-4 rounded-2xl"
           style={{ background: 'linear-gradient(135deg, #FFF4DC 0%, #FFE0C2 100%)', border: '1px solid #FFD9A8' }}>
        <div className="flex items-center justify-between mb-1">
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#92400E' }}>Ваш баланс</span>
          <i data-lucide="sparkles" style={{ width: 14, height: 14, color: '#D97706' }} />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span style={{ fontSize: 28, fontWeight: 800, color: '#7C3A0E' }} className="v2-num">{points.toLocaleString()}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#92400E' }}>баллов</span>
        </div>
        <button className="mt-3 w-full text-xs font-semibold py-1.5 rounded-lg transition"
                style={{ background: '#fff', color: '#92400E', border: '1px solid #FFD9A8' }}
                onClick={() => onNav('shop')}>
          В магазин →
        </button>
      </div>
    </aside>
  );
}
window.SidebarV2 = SidebarV2;
