function AdminSidebar({ active, onNav }) {
  const sections = [
    {
      label: 'Обзор',
      items: [
        { k: 'dashboard', t: 'Дашборд', i: 'layout-dashboard' },
        { k: 'analytics', t: 'Аналитика', i: 'bar-chart-3' },
      ],
    },
    {
      label: 'Контент',
      items: [
        { k: 'courses',   t: 'Курсы',         i: 'book-open',  count: 47 },
        { k: 'paths',     t: 'Траектории',    i: 'route',      count: 12 },
        { k: 'tests',     t: 'Тесты',         i: 'clipboard-check', count: 84 },
        { k: 'library',   t: 'Библиотека',    i: 'library' },
      ],
    },
    {
      label: 'Люди',
      items: [
        { k: 'users',     t: 'Сотрудники',    i: 'users',         count: 312 },
        { k: 'groups',    t: 'Группы',         i: 'users-round' },
        { k: 'roles',     t: 'Роли и доступы', i: 'shield' },
      ],
    },
    {
      label: 'Коммуникации',
      items: [
        { k: 'broadcasts', t: 'Рассылки',      i: 'send' },
        { k: 'forum',      t: 'Форум',         i: 'messages-square', count: 3 },
        { k: 'events',     t: 'События',       i: 'calendar' },
      ],
    },
    {
      label: 'Система',
      items: [
        { k: 'settings',   t: 'Настройки',     i: 'settings-2' },
        { k: 'integrations', t: 'Интеграции', i: 'plug' },
        { k: 'audit',      t: 'Журнал',         i: 'file-text' },
      ],
    },
  ];

  return (
    <aside className="adm-rail flex flex-col shrink-0" style={{ width: 248, height: '100vh' }}>
      <div className="px-4 pt-5 pb-4 flex items-center gap-2.5" style={{ borderBottom: '1px solid var(--adm-border-rail)' }}>
        <div className="rounded-md flex items-center justify-center"
             style={{ width: 32, height: 32, background: '#fff', flexShrink: 0 }}>
          <img src="../../assets/farovon-logo.png" alt="Farovon" style={{ width: 22, height: 22, objectFit: 'contain' }} />
        </div>
        <div className="min-w-0">
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>Farovon LMS</div>
          <div style={{ fontSize: 10, color: 'var(--adm-fg-rail-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Admin Console</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {sections.map((s, si) => (
          <div key={si}>
            <div className="adm-rail-section">{s.label}</div>
            <ul className="space-y-0.5">
              {s.items.map(it => (
                <li key={it.k}>
                  <button onClick={() => onNav(it.k)}
                          className={'adm-rail-link w-full ' + (active === it.k ? 'active' : '')}>
                    <i data-lucide={it.i} style={{ width: 16, height: 16 }} />
                    <span className="flex-1 text-left">{it.t}</span>
                    {it.count !== undefined && (
                      <span className="adm-num"
                            style={{ fontSize: 10, fontWeight: 600, color: 'var(--adm-fg-rail-2)' }}>
                        {it.count}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="px-3 pb-4 pt-3" style={{ borderTop: '1px solid var(--adm-border-rail)' }}>
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg"
             style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="rounded-full flex items-center justify-center font-bold"
               style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #2D4FBF, #7B5BFF)', color: '#fff', fontSize: 12 }}>
            МС
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }} className="truncate">Мадина Саидова</div>
            <div style={{ fontSize: 10, color: 'var(--adm-fg-rail-2)' }}>HR Lead · Admin</div>
          </div>
          <i data-lucide="more-vertical" style={{ width: 14, height: 14, color: 'var(--adm-fg-rail-2)' }} />
        </div>
      </div>
    </aside>
  );
}
window.AdminSidebar = AdminSidebar;
