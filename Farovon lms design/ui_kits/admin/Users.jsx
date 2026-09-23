// Users management screen — dense employee table

function AdminUsers() {
  const users = [
    { id: 1, name: 'Aziz Karimov',      email: 'a.karimov@farovon.tj',  dept: 'Операции',     role: 'Junior Analyst',     courses: { done: 4, total: 7 }, points: 1250, status: 'active',     last: '5 мин назад' },
    { id: 2, name: 'Madina Saidova',    email: 'm.saidova@farovon.tj', dept: 'HR',           role: 'HR Lead',             courses: { done: 12, total: 12 }, points: 4820, status: 'admin',      last: '20 мин назад' },
    { id: 3, name: 'Bekhzod Khasanov',  email: 'b.khasanov@farovon.tj', dept: 'IT',           role: 'Senior Engineer',     courses: { done: 6, total: 9 },  points: 2140, status: 'overdue',    last: '1 ч назад' },
    { id: 4, name: 'Nilufar Rahimova',  email: 'n.rahimova@farovon.tj', dept: 'Финансы',      role: 'Accountant',           courses: { done: 8, total: 8 },  points: 3260, status: 'active',     last: '2 ч назад' },
    { id: 5, name: 'Rustam Khalilov',   email: 'r.khalilov@farovon.tj', dept: 'Безопасность', role: 'Head of Security',    courses: { done: 15, total: 15 }, points: 5680, status: 'admin',     last: 'вчера' },
    { id: 6, name: 'Sardor Rashidov',   email: 's.rashidov@farovon.tj', dept: 'Операции',     role: 'Operations Manager',  courses: { done: 10, total: 11 }, points: 3120, status: 'active',    last: 'вчера' },
    { id: 7, name: 'Olimjon Bakhriev',  email: 'o.bakhriev@farovon.tj', dept: 'Маркетинг',    role: 'Marketing Manager',    courses: { done: 5, total: 8 },  points: 1840, status: 'on-leave',   last: '3 дня назад' },
    { id: 8, name: 'Zarina Yuldasheva', email: 'z.yuldasheva@farovon.tj', dept: 'HR',         role: 'Recruiter',            courses: { done: 7, total: 7 },  points: 2480, status: 'active',     last: '4 ч назад' },
    { id: 9, name: 'Farrukh Ismoilov',  email: 'f.ismoilov@farovon.tj', dept: 'IT',           role: 'DevOps',                courses: { done: 3, total: 9 },  points: 920,  status: 'overdue',    last: '6 ч назад' },
    { id:10, name: 'Dilshod Murodov',   email: 'd.murodov@farovon.tj', dept: 'Финансы',       role: 'Finance Analyst',      courses: { done: 6, total: 8 },  points: 2050, status: 'active',     last: '30 мин назад' },
  ];

  const statusMap = {
    active:   { label: 'Активен',     cls: 'adm-pill adm-pill--success adm-pill--dot' },
    admin:    { label: 'Админ',        cls: 'adm-pill adm-pill--info adm-pill--dot' },
    overdue:  { label: 'Просрочка',    cls: 'adm-pill adm-pill--danger adm-pill--dot' },
    'on-leave': { label: 'В отпуске',    cls: 'adm-pill adm-pill--neutral adm-pill--dot' },
  };

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="adm-card p-4 flex items-center gap-3 flex-wrap">
        <div className="relative" style={{ flex: '1 1 280px', minWidth: 240 }}>
          <i data-lucide="search" style={{ width: 14, height: 14, color: 'var(--adm-fg-3)', position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input className="adm-input" style={{ paddingLeft: 32 }} placeholder="Имя, email, отдел…" />
        </div>
        <FilterPill label="Отдел" value="Все отделы" />
        <FilterPill label="Роль" value="Все роли" />
        <FilterPill label="Статус" value="Активные" />
        <FilterPill label="Группа" value="—" />
        <div className="flex-1" />
        <button className="adm-btn adm-btn--ghost"><i data-lucide="download" style={{ width: 13, height: 13 }} /> Экспорт</button>
        <button className="adm-btn adm-btn--ghost"><i data-lucide="upload" style={{ width: 13, height: 13 }} /> Импорт CSV</button>
        <button className="adm-btn adm-btn--primary"><i data-lucide="plus" style={{ width: 13, height: 13 }} /> Добавить</button>
      </div>

      {/* Bulk action bar (selected) */}
      <div className="adm-card flex items-center justify-between px-4 py-2.5"
           style={{ background: 'var(--adm-primary-50)', borderColor: 'var(--adm-primary-100)' }}>
        <div className="flex items-center gap-3" style={{ fontSize: 12.5, color: 'var(--adm-primary)' }}>
          <i data-lucide="check-square" style={{ width: 14, height: 14 }} />
          <span><b className="adm-num">3</b> сотрудника выбрано</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="adm-btn adm-btn--ghost" style={{ fontSize: 12 }}>Назначить курс</button>
          <button className="adm-btn adm-btn--ghost" style={{ fontSize: 12 }}>В группу…</button>
          <button className="adm-btn adm-btn--ghost" style={{ fontSize: 12 }}>Отправить уведомление</button>
          <span style={{ width: 1, height: 18, background: 'var(--adm-border-2)' }} />
          <button className="adm-btn adm-btn--danger-ghost" style={{ fontSize: 12 }}>Деактивировать</button>
        </div>
      </div>

      {/* Table */}
      <div className="adm-card overflow-hidden">
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}><input type="checkbox" /></th>
              <th>Сотрудник</th>
              <th style={{ width: 130 }}>Отдел</th>
              <th style={{ width: 180 }}>Должность</th>
              <th style={{ width: 160 }}>Прогресс обучения</th>
              <th style={{ width: 90 }} className="text-right">Баллы</th>
              <th style={{ width: 110 }}>Статус</th>
              <th style={{ width: 110 }}>Активность</th>
              <th style={{ width: 36 }}></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => {
              const pct = Math.round(u.courses.done / u.courses.total * 100);
              const checked = i < 3;
              const statusInfo = statusMap[u.status];
              return (
                <tr key={u.id} style={{ background: checked ? 'var(--adm-primary-50)' : 'transparent' }}>
                  <td><input type="checkbox" defaultChecked={checked} /></td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="adm-avatar">{u.name.split(' ').map(s => s[0]).join('')}</div>
                      <div className="min-w-0">
                        <div style={{ fontWeight: 600 }} className="truncate">{u.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--adm-fg-3)' }} className="truncate">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{u.dept}</td>
                  <td>{u.role}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--adm-bg-muted)' }}>
                        <div className="h-full rounded-full"
                             style={{
                               width: `${pct}%`,
                               background: pct === 100 ? 'var(--adm-success)' : pct < 50 ? 'var(--adm-danger)' : 'var(--adm-primary)',
                             }} />
                      </div>
                      <span className="adm-num" style={{ fontSize: 11, fontWeight: 600, color: 'var(--adm-fg-2)', minWidth: 36 }}>
                        {u.courses.done}/{u.courses.total}
                      </span>
                    </div>
                  </td>
                  <td className="text-right adm-num" style={{ fontWeight: 600 }}>{u.points.toLocaleString()}</td>
                  <td><span className={statusInfo.cls}>{statusInfo.label}</span></td>
                  <td style={{ fontSize: 11, color: 'var(--adm-fg-3)' }}>{u.last}</td>
                  <td className="text-right">
                    <button style={{ padding: 4, color: 'var(--adm-fg-3)' }}>
                      <i data-lucide="more-horizontal" style={{ width: 15, height: 15 }} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--adm-border-1)' }}>
          <div style={{ fontSize: 12, color: 'var(--adm-fg-3)' }} className="adm-num">
            Показано <b style={{ color: 'var(--adm-fg-1)' }}>1–10</b> из <b style={{ color: 'var(--adm-fg-1)' }}>312</b>
          </div>
          <div className="flex items-center gap-1">
            {['‹', '1', '2', '3', '…', '32', '›'].map((p, i) => (
              <button key={i} className="adm-num"
                      style={{
                        minWidth: 28, height: 28, padding: '0 8px',
                        fontSize: 12, fontWeight: 600,
                        background: p === '1' ? 'var(--adm-primary)' : 'transparent',
                        color: p === '1' ? '#fff' : 'var(--adm-fg-2)',
                        borderRadius: 6,
                        border: p === '1' ? 'none' : '1px solid var(--adm-border-2)',
                      }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, value }) {
  return (
    <button className="adm-btn adm-btn--ghost" style={{ fontWeight: 500 }}>
      <span style={{ color: 'var(--adm-fg-3)' }}>{label}:</span>
      <span style={{ color: 'var(--adm-fg-1)' }}>{value}</span>
      <i data-lucide="chevron-down" style={{ width: 12, height: 12, color: 'var(--adm-fg-3)' }} />
    </button>
  );
}

window.AdminUsers = AdminUsers;
