function AdminTopBar({ title, breadcrumb, actions }) {
  return (
    <header className="flex items-center px-7 py-3.5"
            style={{ background: '#fff', borderBottom: '1px solid var(--adm-border-1)', minHeight: 60 }}>
      <div className="flex-1 min-w-0">
        {breadcrumb && (
          <div className="flex items-center gap-1.5 mb-0.5" style={{ fontSize: 11, color: 'var(--adm-fg-3)' }}>
            {breadcrumb.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <i data-lucide="chevron-right" style={{ width: 11, height: 11 }} />}
                <span style={{ fontWeight: i === breadcrumb.length - 1 ? 600 : 400, color: i === breadcrumb.length - 1 ? 'var(--adm-fg-2)' : 'inherit' }}>{b}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--adm-fg-1)', letterSpacing: '-0.01em' }}>{title}</h1>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="relative">
          <i data-lucide="search" style={{ width: 14, height: 14, color: 'var(--adm-fg-3)', position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input className="adm-input" style={{ paddingLeft: 32, width: 240 }} placeholder="Поиск (⌘K)" />
        </div>
        <button className="adm-btn adm-btn--ghost" style={{ padding: 8 }} aria-label="Уведомления">
          <i data-lucide="bell" style={{ width: 15, height: 15 }} />
        </button>
        <button className="adm-btn adm-btn--ghost" style={{ padding: 8 }} aria-label="Помощь">
          <i data-lucide="circle-help" style={{ width: 15, height: 15 }} />
        </button>
        {actions}
      </div>
    </header>
  );
}
window.AdminTopBar = AdminTopBar;
