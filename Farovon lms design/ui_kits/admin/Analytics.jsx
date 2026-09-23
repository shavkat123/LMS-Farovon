// Analytics screen — completion heatmap, dept breakdown, funnel

function AdminAnalytics() {
  const depts = [
    { name: 'Операции',     people: 86, completion: 84, hours: 412, trend: 'up' },
    { name: 'IT',           people: 54, completion: 76, hours: 298, trend: 'up' },
    { name: 'Финансы',       people: 38, completion: 92, hours: 240, trend: 'flat' },
    { name: 'HR',            people: 22, completion: 95, hours: 180, trend: 'up' },
    { name: 'Маркетинг',     people: 28, completion: 68, hours: 142, trend: 'down' },
    { name: 'Безопасность',  people: 14, completion: 88, hours: 96,  trend: 'flat' },
  ];
  const heatmap = Array.from({ length: 7 * 12 }, (_, i) => Math.random());

  const funnel = [
    { stage: 'Назначено',   count: 312, pct: 100 },
    { stage: 'Начали',      count: 281, pct: 90 },
    { stage: 'Половина',    count: 234, pct: 75 },
    { stage: 'Финальный тест', count: 198, pct: 63 },
    { stage: 'Сертификат',  count: 187, pct: 60 },
  ];

  return (
    <div className="space-y-5">
      {/* Filter row */}
      <div className="flex items-center gap-2 flex-wrap">
        <FilterButton label="Период" value="Q1 2026" />
        <FilterButton label="Отдел" value="Все отделы" />
        <FilterButton label="Локация" value="Tashkent + 3" />
        <FilterButton label="Курс" value="Все курсы" />
        <div className="flex-1" />
        <button className="adm-btn adm-btn--ghost"><i data-lucide="download" style={{ width: 13, height: 13 }} /> Экспорт PDF</button>
        <button className="adm-btn adm-btn--ghost"><i data-lucide="share-2" style={{ width: 13, height: 13 }} /> Поделиться</button>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-4 gap-4">
        <KPI label="Часов обучения"    value="1 412" delta="+18%" up />
        <KPI label="Новых сертификатов" value="142"   delta="+22%" up />
        <KPI label="NPS обучения"        value="64"    delta="+5"   up />
        <KPI label="Стоимость / сотрудника" value="$24"  delta="-12%" up sub="экономия" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Department breakdown */}
        <div className="adm-card col-span-2">
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--adm-border-1)' }}>
            <div>
              <span className="adm-eyebrow">По отделам</span>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-fg-1)', marginTop: 2 }}>Завершаемость и нагрузка</div>
            </div>
            <button className="adm-btn adm-btn--ghost"><i data-lucide="arrow-up-down" style={{ width: 13, height: 13 }} /> Сортировка</button>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th>Отдел</th>
                <th style={{ width: 70 }} className="text-right">Люди</th>
                <th style={{ width: 220 }}>Завершаемость</th>
                <th style={{ width: 100 }} className="text-right">Часы</th>
                <th style={{ width: 60 }}>Тренд</th>
              </tr>
            </thead>
            <tbody>
              {depts.map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{d.name}</td>
                  <td className="text-right adm-num">{d.people}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--adm-bg-muted)' }}>
                        <div className="h-full rounded-full"
                             style={{
                               width: `${d.completion}%`,
                               background: d.completion >= 85 ? 'var(--adm-success)' : d.completion < 70 ? 'var(--adm-danger)' : 'var(--adm-primary)',
                             }} />
                      </div>
                      <span className="adm-num" style={{ fontSize: 11, fontWeight: 600, color: 'var(--adm-fg-2)', minWidth: 32 }}>{d.completion}%</span>
                    </div>
                  </td>
                  <td className="text-right adm-num">{d.hours}</td>
                  <td>
                    {d.trend === 'up'   && <i data-lucide="trending-up"   style={{ width: 14, height: 14, color: 'var(--adm-success)' }} />}
                    {d.trend === 'down' && <i data-lucide="trending-down" style={{ width: 14, height: 14, color: 'var(--adm-danger)' }} />}
                    {d.trend === 'flat' && <i data-lucide="minus"          style={{ width: 14, height: 14, color: 'var(--adm-fg-3)' }} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Funnel */}
        <div className="adm-card p-5">
          <span className="adm-eyebrow">Воронка прохождения</span>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-fg-1)', marginTop: 2 }}>«Безопасность на рабочем месте»</div>
          <ul className="mt-5 space-y-2.5">
            {funnel.map((f, i) => (
              <li key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 12, color: 'var(--adm-fg-2)' }}>{f.stage}</span>
                  <span className="adm-num" style={{ fontSize: 12, fontWeight: 600, color: 'var(--adm-fg-1)' }}>
                    {f.count} <span style={{ color: 'var(--adm-fg-3)', fontWeight: 500 }}>· {f.pct}%</span>
                  </span>
                </div>
                <div className="h-2 rounded-sm" style={{ background: 'var(--adm-bg-muted)' }}>
                  <div className="h-full rounded-sm" style={{ width: `${f.pct}%`, background: 'var(--adm-primary)' }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--adm-border-1)' }}>
            <span style={{ fontSize: 11, color: 'var(--adm-fg-3)' }}>Самый большой отток</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--adm-danger)' }}>Половина → Финальный тест (−15%)</span>
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="adm-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="adm-eyebrow">Активность по часам и дням</span>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-fg-1)', marginTop: 2 }}>Когда сотрудники учатся</div>
          </div>
          <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--adm-fg-3)' }}>
            <span>меньше</span>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map(v => (
              <div key={v} style={{ width: 12, height: 12, background: `rgba(30, 58, 138, ${v})`, borderRadius: 2 }} />
            ))}
            <span>больше</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col justify-around" style={{ paddingTop: 14, fontSize: 10, color: 'var(--adm-fg-3)' }}>
            {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d => <div key={d} style={{ height: 18 }}>{d}</div>)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1" style={{ fontSize: 9, color: 'var(--adm-fg-3)' }}>
              {['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(t => <span key={t}>{t}</span>)}
            </div>
            <div className="grid gap-[3px]" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(7, 18px)' }}>
              {heatmap.map((v, i) => (
                <div key={i}
                     style={{
                       background: `rgba(30, 58, 138, ${0.05 + v * 0.85})`,
                       borderRadius: 3,
                     }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, delta, up, sub }) {
  return (
    <div className="adm-card p-5">
      <span className="adm-eyebrow">{label}</span>
      <div className="adm-num" style={{ fontSize: 26, fontWeight: 700, color: 'var(--adm-fg-1)', letterSpacing: '-0.02em', marginTop: 6 }}>{value}</div>
      <div className="flex items-center gap-2 mt-1.5">
        {delta && (
          <span className="adm-num flex items-center gap-0.5" style={{ fontSize: 11, fontWeight: 600, color: up ? 'var(--adm-success)' : 'var(--adm-danger)' }}>
            <i data-lucide={up ? 'trending-up' : 'trending-down'} style={{ width: 11, height: 11 }} /> {delta}
          </span>
        )}
        {sub && <span style={{ fontSize: 11, color: 'var(--adm-fg-3)' }}>{sub}</span>}
      </div>
    </div>
  );
}

function FilterButton({ label, value }) {
  return (
    <button className="adm-btn adm-btn--ghost" style={{ fontWeight: 500 }}>
      <span style={{ color: 'var(--adm-fg-3)' }}>{label}:</span>
      <span style={{ color: 'var(--adm-fg-1)', fontWeight: 600 }}>{value}</span>
      <i data-lucide="chevron-down" style={{ width: 12, height: 12, color: 'var(--adm-fg-3)' }} />
    </button>
  );
}

window.AdminAnalytics = AdminAnalytics;
