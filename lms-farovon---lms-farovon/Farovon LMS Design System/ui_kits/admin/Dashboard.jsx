// Admin Dashboard

function KPICard({ label, value, delta, deltaPositive, icon, sub }) {
  return (
    <div className="adm-card p-5">
      <div className="flex items-start justify-between mb-4">
        <span className="adm-eyebrow">{label}</span>
        <i data-lucide={icon} style={{ width: 16, height: 16, color: 'var(--adm-fg-3)' }} />
      </div>
      <div className="adm-num" style={{ fontSize: 28, fontWeight: 700, color: 'var(--adm-fg-1)', letterSpacing: '-0.02em', lineHeight: 1 }}>
        {value}
      </div>
      <div className="flex items-center gap-2 mt-2">
        {delta && (
          <span className="adm-num flex items-center gap-0.5"
                style={{ fontSize: 11, fontWeight: 600, color: deltaPositive ? 'var(--adm-success)' : 'var(--adm-danger)' }}>
            <i data-lucide={deltaPositive ? 'trending-up' : 'trending-down'} style={{ width: 12, height: 12 }} />
            {delta}
          </span>
        )}
        {sub && <span style={{ fontSize: 11, color: 'var(--adm-fg-3)' }}>{sub}</span>}
      </div>
    </div>
  );
}

function MiniSparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 220, h = 48;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return [x, y];
  });
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color.replace('#', '')})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function AdminDashboard() {
  const activity = [12, 18, 15, 22, 28, 34, 30, 38, 42, 47, 44, 52, 58, 54];
  const completion = [62, 64, 63, 65, 68, 70, 72, 71, 74, 76, 75, 78, 80, 82];

  const deadlines = [
    { course: 'Безопасность на рабочем месте', users: 312, completed: 187, deadline: '12 марта', urgency: 'high' },
    { course: 'Кибергигиена 2026',                users: 280, completed: 220, deadline: '20 марта', urgency: 'med' },
    { course: 'Антикоррупционная политика',      users: 312, completed: 295, deadline: '25 марта', urgency: 'low' },
    { course: 'GDPR & защита данных',             users: 145, completed: 88,  deadline: '02 апреля', urgency: 'med' },
  ];

  const recent = [
    { who: 'Aziz Karimov',     act: 'завершил курс',       what: 'Power BI: продвинутый',      when: '12 мин назад' },
    { who: 'Madina Saidova',   act: 'опубликовала курс',    what: 'Лидерство в команде',        when: '1 ч назад' },
    { who: 'Bekhzod Khasanov', act: 'провалил тест',        what: 'Кибергигиена · попытка 2',   when: '2 ч назад', danger: true },
    { who: 'Nilufar Rahimova', act: 'добавлена в группу',   what: 'Senior Analytics',           when: '3 ч назад' },
    { who: 'Rustam Khalilov',  act: 'обновил материал',      what: 'Безопасность · Модуль 4',    when: '5 ч назад' },
  ];

  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard label="Активных сотрудников" value="312" delta="+8" deltaPositive sub="за 30 дней" icon="users" />
        <KPICard label="Курсов запущено"       value="47"  delta="+3" deltaPositive sub="в этом квартале" icon="book-open" />
        <KPICard label="Средняя завершаемость" value="78%" delta="+4%" deltaPositive sub="к прошлому мес." icon="check-circle-2" />
        <KPICard label="Просрочек дедлайна"    value="12"  delta="-3"  deltaPositive sub="к прошлой неделе" icon="alarm-clock" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="adm-card p-5 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="adm-eyebrow">Активность за 14 дней</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-fg-1)', marginTop: 2 }}>Завершённые уроки в день</div>
            </div>
            <div className="flex items-center gap-2">
              {['7д', '14д', '30д', '90д'].map((p, i) => (
                <button key={p} className="px-2.5 py-1 rounded-md"
                        style={{ fontSize: 11, fontWeight: 600, background: i === 1 ? 'var(--adm-bg-muted)' : 'transparent', color: i === 1 ? 'var(--adm-fg-1)' : 'var(--adm-fg-3)' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ChartBars data={activity} />
        </div>

        <div className="adm-card p-5">
          <div className="mb-3">
            <span className="adm-eyebrow">Тренд завершаемости</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="adm-num" style={{ fontSize: 22, fontWeight: 700, color: 'var(--adm-fg-1)' }}>82%</span>
              <span className="adm-num flex items-center gap-0.5" style={{ fontSize: 11, fontWeight: 600, color: 'var(--adm-success)' }}>
                <i data-lucide="trending-up" style={{ width: 11, height: 11 }} /> +6%
              </span>
            </div>
          </div>
          <MiniSparkline data={completion} color="#1E3A8A" />
          <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid var(--adm-border-1)' }}>
            <span style={{ fontSize: 11, color: 'var(--adm-fg-3)' }}>Цель квартала</span>
            <span className="adm-num" style={{ fontSize: 12, fontWeight: 600, color: 'var(--adm-fg-1)' }}>85%</span>
          </div>
        </div>
      </div>

      {/* Deadlines + activity */}
      <div className="grid grid-cols-3 gap-4">
        <div className="adm-card col-span-2">
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--adm-border-1)' }}>
            <div>
              <span className="adm-eyebrow">Обязательные курсы</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-fg-1)', marginTop: 2 }}>Дедлайны и охват</div>
            </div>
            <button className="adm-btn adm-btn--ghost"><i data-lucide="external-link" style={{ width: 13, height: 13 }} /> Все курсы</button>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th>Курс</th>
                <th style={{ width: 140 }}>Прогресс</th>
                <th style={{ width: 100 }}>Дедлайн</th>
                <th style={{ width: 80 }}></th>
              </tr>
            </thead>
            <tbody>
              {deadlines.map((d, i) => {
                const pct = Math.round(d.completed / d.users * 100);
                const u = d.urgency;
                return (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{d.course}</div>
                      <div style={{ fontSize: 11, color: 'var(--adm-fg-3)', marginTop: 2 }} className="adm-num">
                        {d.completed} / {d.users} сотрудников
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--adm-bg-muted)' }}>
                          <div className="h-full rounded-full"
                               style={{
                                 width: `${pct}%`,
                                 background: u === 'high' ? 'var(--adm-danger)' : u === 'med' ? 'var(--adm-accent)' : 'var(--adm-success)',
                               }} />
                        </div>
                        <span className="adm-num" style={{ fontSize: 11, fontWeight: 600, color: 'var(--adm-fg-2)', minWidth: 28 }}>{pct}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={'adm-pill adm-pill--dot ' + (u === 'high' ? 'adm-pill--danger' : u === 'med' ? 'adm-pill--warn' : 'adm-pill--success')}>
                        {d.deadline}
                      </span>
                    </td>
                    <td className="text-right">
                      <button className="adm-btn adm-btn--ghost" style={{ padding: '4px 10px', fontSize: 12 }}>Открыть</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="adm-card">
          <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--adm-border-1)' }}>
            <span className="adm-eyebrow">Активность</span>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-fg-1)', marginTop: 2 }}>Последние события</div>
          </div>
          <ul className="px-5 py-2">
            {recent.map((r, i) => (
              <li key={i} className="flex items-start gap-3 py-3" style={{ borderBottom: i < recent.length - 1 ? '1px solid var(--adm-border-1)' : 'none' }}>
                <div className="adm-avatar" style={{ width: 26, height: 26, fontSize: 10 }}>
                  {r.who.split(' ').map(s => s[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 12.5, color: 'var(--adm-fg-1)', lineHeight: 1.4 }}>
                    <b>{r.who}</b>{' '}
                    <span style={{ color: r.danger ? 'var(--adm-danger)' : 'var(--adm-fg-2)' }}>{r.act}</span>{' '}
                    <span style={{ color: 'var(--adm-fg-2)' }}>«{r.what}»</span>
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--adm-fg-3)', marginTop: 2 }}>{r.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ChartBars({ data }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1.5" style={{ height: 140 }}>
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-full rounded-sm transition"
               style={{
                 height: `${(v / max) * 100}%`,
                 background: i === data.length - 1 ? 'var(--adm-primary)' : 'var(--adm-primary-100)',
                 minHeight: 4,
               }} />
          <span style={{ fontSize: 9, color: 'var(--adm-fg-3)' }}>{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

window.AdminDashboard = AdminDashboard;
