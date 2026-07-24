// v2 TopBar
function TopBarV2({ user, onLogout }) {
  return (
    <header className="h-[72px] flex items-center justify-between px-8 sticky top-0 z-10"
            style={{ background: '#fff', borderBottom: '1px solid var(--v2-border-1)' }}>
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4" style={{ color: 'var(--v2-fg-3)' }}>
            <i data-lucide="search" style={{ width: 16, height: 16 }} />
          </span>
          <input
            placeholder="Найти курс, пользователя или тему…"
            className="pl-11 pr-4 py-2.5 text-sm w-full focus:outline-none transition"
            style={{
              background: 'var(--v2-bg-muted)',
              border: '1px solid transparent',
              borderRadius: 10,
              color: 'var(--v2-fg-1)',
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition" style={{ color: 'var(--v2-fg-2)' }}>
          <i data-lucide="globe" style={{ width: 14, height: 14 }} /> RU
        </button>

        <button className="relative w-10 h-10 rounded-lg flex items-center justify-center transition" style={{ color: 'var(--v2-fg-2)' }}>
          <i data-lucide="calendar-check" style={{ width: 18, height: 18 }} />
        </button>

        <button className="relative w-10 h-10 rounded-lg flex items-center justify-center transition" style={{ color: 'var(--v2-fg-2)' }}>
          <i data-lucide="bell" style={{ width: 18, height: 18 }} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: 'var(--v2-danger)' }} />
        </button>

        <div className="w-px h-8 mx-2" style={{ background: 'var(--v2-border-1)' }} />

        <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-xl transition" style={{ color: 'var(--v2-fg-1)' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
               style={{ background: 'linear-gradient(135deg, #2D4FBF, #7B5BFF)', color: '#fff' }}>
            {(user?.name || 'AK').split(' ').map(s => s[0]).join('').slice(0,2)}
          </div>
          <div className="text-left leading-tight">
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.name || 'Aziz Karimov'}</div>
            <div style={{ fontSize: 11, color: 'var(--v2-fg-3)' }}>Junior Analyst · Tashkent</div>
          </div>
          <i data-lucide="chevron-down" style={{ width: 14, height: 14, color: 'var(--v2-fg-3)' }} />
        </button>
      </div>
    </header>
  );
}
window.TopBarV2 = TopBarV2;
