// Course Editor — Equeo-style: drag-and-drop module/lesson tree

function CourseEditor() {
  const modules = [
    { num: 1, title: 'Введение в безопасность', lessons: [
      { type: 'video', title: 'Зачем нужна культура безопасности', dur: '6 мин', pub: true },
      { type: 'reading', title: 'Политика компании Farovon',         dur: '4 мин', pub: true },
      { type: 'quiz',   title: 'Проверка понимания',                 dur: '5 вопр.', pub: true },
    ], collapsed: false },
    { num: 2, title: 'Физическая безопасность', lessons: [
      { type: 'video', title: 'Эвакуация и пути выхода', dur: '8 мин', pub: true },
      { type: 'video', title: 'Работа с электроникой',    dur: '5 мин', pub: false },
    ], collapsed: true },
    { num: 3, title: 'Информационная безопасность', lessons: [], collapsed: true },
    { num: 4, title: 'Реагирование на инциденты',     lessons: [], collapsed: true, draft: true },
  ];

  const typeIcon = { video: 'play-circle', reading: 'book-open', quiz: 'help-circle', task: 'clipboard-list' };
  const typeLabel = { video: 'Видео', reading: 'Чтение', quiz: 'Тест', task: 'Задание' };
  const typeColor = { video: 'var(--adm-primary)', reading: 'var(--adm-fg-2)', quiz: 'var(--adm-accent)', task: 'var(--adm-success)' };

  const tabs = ['Содержание', 'О курсе', 'Аудитория', 'Расписание', 'Сертификат', 'Настройки'];

  return (
    <div className="space-y-4">
      {/* Sub header */}
      <div className="adm-card flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="rounded-lg flex items-center justify-center" style={{ width: 44, height: 44, background: 'var(--adm-bg-muted)', color: 'var(--adm-primary)' }}>
            <i data-lucide="shield" style={{ width: 22, height: 22 }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input defaultValue="Безопасность на рабочем месте"
                     style={{ fontSize: 16, fontWeight: 700, color: 'var(--adm-fg-1)', background: 'transparent', border: 'none', outline: 'none', minWidth: 320, letterSpacing: '-0.01em' }} />
              <span className="adm-pill adm-pill--warn">Черновик</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--adm-fg-3)', marginTop: 2 }}>
              Compliance · версия 2.1 · обновлено сегодня в 14:32 · автор Madina Saidova
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="adm-btn adm-btn--ghost"><i data-lucide="eye" style={{ width: 13, height: 13 }} /> Превью</button>
          <button className="adm-btn adm-btn--ghost"><i data-lucide="users" style={{ width: 13, height: 13 }} /> Назначить</button>
          <button className="adm-btn adm-btn--primary"><i data-lucide="rocket" style={{ width: 13, height: 13 }} /> Опубликовать</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-1" style={{ borderBottom: '1px solid var(--adm-border-1)' }}>
        {tabs.map((t, i) => (
          <button key={t} className="px-3 py-2.5 transition"
                  style={{
                    fontSize: 13, fontWeight: 600,
                    color: i === 0 ? 'var(--adm-primary)' : 'var(--adm-fg-2)',
                    borderBottom: i === 0 ? '2px solid var(--adm-primary)' : '2px solid transparent',
                    marginBottom: -1,
                  }}>{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-4">
        {/* Module tree */}
        <div className="space-y-3">
          {modules.map((m, mi) => (
            <div key={mi} className="adm-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#FAFBFC', borderBottom: m.collapsed ? 'none' : '1px solid var(--adm-border-1)' }}>
                <i data-lucide="grip-vertical" style={{ width: 14, height: 14, color: 'var(--adm-fg-3)', cursor: 'grab' }} />
                <i data-lucide={m.collapsed ? 'chevron-right' : 'chevron-down'} style={{ width: 14, height: 14, color: 'var(--adm-fg-3)' }} />
                <span className="adm-num" style={{ fontSize: 11, fontWeight: 600, color: 'var(--adm-fg-3)', minWidth: 18 }}>{String(m.num).padStart(2, '0')}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--adm-fg-1)', flex: 1 }}>{m.title}</span>
                {m.draft && <span className="adm-pill adm-pill--warn">Черновик</span>}
                <span style={{ fontSize: 11, color: 'var(--adm-fg-3)' }} className="adm-num">{m.lessons.length} уроков</span>
                <button className="adm-btn adm-btn--ghost" style={{ padding: 5 }}><i data-lucide="more-horizontal" style={{ width: 14, height: 14 }} /></button>
              </div>

              {!m.collapsed && (
                <div className="p-2">
                  <ul>
                    {m.lessons.map((l, li) => (
                      <li key={li} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[var(--adm-bg-muted)] transition">
                        <i data-lucide="grip-vertical" style={{ width: 12, height: 12, color: 'var(--adm-fg-3)', cursor: 'grab' }} />
                        <span className="rounded-md flex items-center justify-center"
                              style={{ width: 26, height: 26, background: 'var(--adm-bg-muted)', color: typeColor[l.type] }}>
                          <i data-lucide={typeIcon[l.type]} style={{ width: 13, height: 13 }} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--adm-fg-1)' }} className="truncate">{l.title}</div>
                          <div className="flex items-center gap-2" style={{ fontSize: 10.5, color: 'var(--adm-fg-3)', marginTop: 1 }}>
                            <span>{typeLabel[l.type]}</span>
                            <span>·</span>
                            <span className="adm-num">{l.dur}</span>
                          </div>
                        </div>
                        {!l.pub && <span className="adm-pill adm-pill--warn">Не опубл.</span>}
                        <button style={{ padding: 4, color: 'var(--adm-fg-3)' }}><i data-lucide="pencil" style={{ width: 13, height: 13 }} /></button>
                        <button style={{ padding: 4, color: 'var(--adm-fg-3)' }}><i data-lucide="more-horizontal" style={{ width: 13, height: 13 }} /></button>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full flex items-center justify-center gap-1.5 mt-1 py-2 rounded-md transition"
                          style={{ fontSize: 12, fontWeight: 600, color: 'var(--adm-primary)', background: 'transparent', border: '1px dashed var(--adm-border-2)' }}>
                    <i data-lucide="plus" style={{ width: 13, height: 13 }} /> Добавить урок
                  </button>
                </div>
              )}
            </div>
          ))}

          <button className="w-full flex items-center justify-center gap-1.5 py-3 rounded-lg transition"
                  style={{ fontSize: 13, fontWeight: 600, color: 'var(--adm-primary)', background: '#fff', border: '1px dashed var(--adm-border-2)' }}>
            <i data-lucide="plus" style={{ width: 14, height: 14 }} /> Добавить модуль
          </button>
        </div>

        {/* Right panel: meta */}
        <div className="space-y-3">
          <div className="adm-card p-4">
            <span className="adm-eyebrow">Обложка</span>
            <div className="mt-2 aspect-[4/3] rounded-md flex items-center justify-center"
                 style={{ background: 'var(--adm-bg-muted)', border: '1px dashed var(--adm-border-2)' }}>
              <div className="text-center" style={{ color: 'var(--adm-fg-3)' }}>
                <i data-lucide="image" style={{ width: 28, height: 28 }} />
                <div style={{ fontSize: 11, marginTop: 6 }}>Перетащите изображение</div>
              </div>
            </div>
          </div>

          <div className="adm-card p-4 space-y-3">
            <span className="adm-eyebrow">Параметры</span>
            <Field label="Категория" value="Compliance" />
            <Field label="Уровень"   value="Базовый" />
            <Field label="Длительность" value="~3 ч" />
            <Field label="Дедлайн"    value="12 марта 2026" emphasis />
            <Field label="Награда"    value="+250 баллов" />
            <Field label="Сертификат" value="Да · 12 мес." />
          </div>

          <div className="adm-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="adm-eyebrow">Аудитория</span>
              <button style={{ fontSize: 11, fontWeight: 600, color: 'var(--adm-primary)' }}>Изменить</button>
            </div>
            <div style={{ fontSize: 12, color: 'var(--adm-fg-2)', lineHeight: 1.6 }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <i data-lucide="users" style={{ width: 12, height: 12 }} />
                <span><b className="adm-num">312</b> сотрудников</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--adm-fg-3)' }}>
                Все отделы · все локации · кроме «На испытательном» (24)
              </div>
            </div>
          </div>

          <div className="adm-card p-4">
            <span className="adm-eyebrow">Чек-лист публикации</span>
            <ul className="mt-3 space-y-1.5">
              {[
                ['Заполнено описание',     true],
                ['Загружена обложка',       false],
                ['Все уроки опубликованы',   false],
                ['Финальный тест добавлен',  true],
                ['Аудитория настроена',      true],
              ].map(([t, ok], i) => (
                <li key={i} className="flex items-center gap-2" style={{ fontSize: 12 }}>
                  <i data-lucide={ok ? 'check-circle-2' : 'circle'} style={{ width: 14, height: 14, color: ok ? 'var(--adm-success)' : 'var(--adm-fg-3)' }} />
                  <span style={{ color: ok ? 'var(--adm-fg-2)' : 'var(--adm-fg-1)', textDecoration: ok ? 'line-through' : 'none' }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, emphasis }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span style={{ fontSize: 11, color: 'var(--adm-fg-3)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: emphasis ? 'var(--adm-accent)' : 'var(--adm-fg-1)' }} className="adm-num">{value}</span>
    </div>
  );
}

window.CourseEditor = CourseEditor;
