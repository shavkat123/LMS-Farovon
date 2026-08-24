// Course Detail (Equeo-style: hero + module list + sidebar info)
function CourseDetailV2({ onBack }) {
  const modules = [
    { num: 1, title: 'Введение и контекст', dur: '12 мин', state: 'done',    type: 'video' },
    { num: 2, title: 'Типы инцидентов на рабочем месте', dur: '18 мин', state: 'done',    type: 'video' },
    { num: 3, title: 'Практика: чек-лист безопасности', dur: '15 мин', state: 'done',    type: 'practice' },
    { num: 4, title: 'Реагирование на инциденты',         dur: '22 мин', state: 'current', type: 'video' },
    { num: 5, title: 'Промежуточный тест',                dur: '10 мин', state: 'next',    type: 'test' },
    { num: 6, title: 'Кейсы из практики',                  dur: '20 мин', state: 'locked',  type: 'video' },
    { num: 7, title: 'Финальная аттестация',               dur: '25 мин', state: 'locked',  type: 'test' },
  ];
  const typeIcons = { video: 'play-circle', practice: 'clipboard-check', test: 'file-question' };
  const stateColors = {
    done:    { bg: 'var(--v2-success)',       text: '#fff',                ring: 'var(--v2-success-50)' },
    current: { bg: 'var(--v2-accent-orange)', text: '#fff',                ring: 'var(--v2-tint-orange)' },
    next:    { bg: '#fff',                    text: 'var(--v2-fg-2)',      ring: 'var(--v2-border-1)' },
    locked:  { bg: 'var(--v2-bg-muted)',      text: 'var(--v2-fg-3)',      ring: 'var(--v2-border-1)' },
  };

  return (
    <div className="space-y-6 max-w-[1280px] mx-auto">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold transition" style={{ color: 'var(--v2-fg-2)' }}>
        <i data-lucide="arrow-left" style={{ width: 14, height: 14 }} /> Все курсы
      </button>

      {/* Hero */}
      <WidgetCard className="overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1fr]">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: 'var(--v2-tint-orange)', color: 'var(--v2-accent-orange)' }}>обязательно</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: 'var(--v2-tint-blue)', color: 'var(--v2-primary)' }}>Compliance</span>
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--v2-fg-1)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
              Безопасность на рабочем месте
            </h1>
            <p className="mt-3" style={{ fontSize: 14, color: 'var(--v2-fg-2)', lineHeight: 1.6, maxWidth: 520 }}>
              Ежегодное обязательное обучение по охране труда. Учим распознавать инциденты, грамотно реагировать и оформлять документы.
            </p>

            <div className="mt-6 flex items-center gap-6">
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v2-fg-3)' }}>Прогресс</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-40 h-2 rounded-full" style={{ background: 'var(--v2-border-1)' }}>
                    <div className="h-full rounded-full" style={{ width: '43%', background: 'linear-gradient(90deg, var(--v2-success), var(--v2-accent-orange))' }} />
                  </div>
                  <span className="v2-num" style={{ fontSize: 14, fontWeight: 800, color: 'var(--v2-accent-orange)' }}>3/7</span>
                </div>
              </div>
              <div className="w-px h-10" style={{ background: 'var(--v2-border-1)' }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--v2-fg-3)' }}>Дедлайн</div>
                <div className="flex items-center gap-1.5 mt-1" style={{ fontSize: 14, fontWeight: 700, color: 'var(--v2-danger)' }}>
                  <i data-lucide="alarm-clock" style={{ width: 14, height: 14 }} /> через 12 дней
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2"
                      style={{ background: 'var(--v2-primary)', color: '#fff' }}>
                Продолжить с модуля 4 <i data-lucide="play" style={{ width: 14, height: 14 }} />
              </button>
              <button className="px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2"
                      style={{ background: 'var(--v2-bg-muted)', color: 'var(--v2-fg-1)' }}>
                <i data-lucide="bookmark" style={{ width: 14, height: 14 }} /> В закладки
              </button>
            </div>
          </div>

          <div className="relative v2-cover v2-cover--paper">
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
              <span className="v2-eyebrow" style={{ color: 'var(--v2-fg-3)' }}>Compliance</span>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--v2-fg-1)', lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.01em' }}>
                Безопасность<br/>на рабочем месте
              </div>
            </div>
          </div>
        </div>
      </WidgetCard>

      {/* Body: lessons + side info */}
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5">
          <WidgetCard className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--v2-fg-1)' }}>Программа курса</h3>
              <span style={{ fontSize: 12, color: 'var(--v2-fg-3)' }}>7 модулей · ~2 ч 02 мин</span>
            </div>
            <ul className="space-y-2">
              {modules.map(m => {
                const c = stateColors[m.state];
                const clickable = m.state !== 'locked';
                return (
                  <li key={m.num} className="flex items-center gap-4 p-3 rounded-xl transition"
                      style={{
                        background: m.state === 'current' ? 'var(--v2-tint-orange)' : 'transparent',
                        border: '1px solid ' + (m.state === 'current' ? '#FFD9A8' : 'var(--v2-border-1)'),
                        cursor: clickable ? 'pointer' : 'default',
                        opacity: m.state === 'locked' ? 0.55 : 1,
                      }}>
                    <div className="rounded-full flex items-center justify-center font-bold"
                         style={{ width: 36, height: 36, background: c.bg, color: c.text, border: `3px solid ${c.ring}`, fontSize: 13, flexShrink: 0 }}>
                      {m.state === 'done' ? <i data-lucide="check" style={{ width: 14, height: 14 }} />
                       : m.state === 'locked' ? <i data-lucide="lock" style={{ width: 12, height: 12 }} />
                       : m.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <i data-lucide={typeIcons[m.type]} style={{ width: 12, height: 12, color: 'var(--v2-fg-3)' }} />
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--v2-fg-3)' }}>
                          {m.type === 'video' ? 'Видео-модуль' : m.type === 'practice' ? 'Практика' : 'Тестирование'}
                        </span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--v2-fg-1)', marginTop: 2 }}>{m.title}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div style={{ fontSize: 12, color: 'var(--v2-fg-3)' }}>{m.dur}</div>
                      {m.state === 'current' && (
                        <button className="mt-1 px-3 py-1 rounded-lg text-xs font-bold"
                                style={{ background: 'var(--v2-accent-orange)', color: '#fff' }}>Начать</button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </WidgetCard>

          {/* Discussion preview */}
          <WidgetCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--v2-fg-1)' }}>Обсуждение курса</h3>
              <button className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--v2-primary)' }}>
                Открыть форум <i data-lucide="arrow-up-right" style={{ width: 12, height: 12 }} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Madina S.', when: '2 ч', text: 'Кто-нибудь сдавал тест с первого раза? Поделитесь, на что обратить внимание.' },
                { name: 'Bekhzod K.', when: '5 ч', text: 'Чек-лист в модуле 3 очень полезен — распечатал на стену.' },
              ].map((c, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0"
                       style={{ background: 'linear-gradient(135deg, #DCE4FF, #EFEAFF)', color: 'var(--v2-primary)', fontSize: 13 }}>
                    {c.name[0]}
                  </div>
                  <div className="flex-1 p-3 rounded-xl" style={{ background: 'var(--v2-bg-muted)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--v2-fg-1)' }}>{c.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--v2-fg-3)' }}>· {c.when} назад</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--v2-fg-2)' }}>{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </WidgetCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <WidgetCard className="p-6">
            <span className="v2-eyebrow" style={{ color: 'var(--v2-primary)' }}>О курсе</span>
            <div className="mt-4 space-y-3">
              {[
                { icon: 'clock',    label: 'Длительность', val: '~2 часа' },
                { icon: 'layers',   label: 'Модулей',       val: '7' },
                { icon: 'sparkles', label: 'Награда',       val: '+250 баллов' },
                { icon: 'award',    label: 'Сертификат',    val: 'после теста' },
                { icon: 'globe',    label: 'Язык',          val: 'Русский' },
                { icon: 'calendar', label: 'Обновлён',      val: 'март 2026' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-3 py-2" style={{ borderTop: i ? '1px solid var(--v2-border-1)' : 'none' }}>
                  <i data-lucide={r.icon} style={{ width: 14, height: 14, color: 'var(--v2-fg-3)' }} />
                  <span style={{ fontSize: 13, color: 'var(--v2-fg-2)', flex: 1 }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--v2-fg-1)' }}>{r.val}</span>
                </div>
              ))}
            </div>
          </WidgetCard>

          <WidgetCard className="p-6">
            <span className="v2-eyebrow" style={{ color: 'var(--v2-accent-violet)' }}>Автор курса</span>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                   style={{ background: 'linear-gradient(135deg, var(--v2-accent-violet), var(--v2-primary))', color: '#fff', fontSize: 16 }}>
                ОС
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--v2-fg-1)' }}>Отдел СОТ</div>
                <div style={{ fontSize: 12, color: 'var(--v2-fg-3)' }}>Безопасность и охрана труда</div>
              </div>
            </div>
            <button className="mt-4 w-full py-2 rounded-xl text-sm font-semibold transition"
                    style={{ background: 'var(--v2-tint-violet)', color: 'var(--v2-accent-violet)' }}>
              Задать вопрос
            </button>
          </WidgetCard>

          <WidgetCard className="p-5" style={{ background: 'var(--v2-tint-warm)', border: '1px solid var(--v2-accent-100)' }}>
            <div className="flex items-start gap-3">
              <i data-lucide="trophy" style={{ width: 22, height: 22, color: 'var(--v2-accent)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--v2-fg-1)' }}>Завершите курс — получите достижение</div>
                <div style={{ fontSize: 12, color: '#92400E', marginTop: 4 }}>«Безопасный сотрудник 2026» + 250 баллов в магазин наград.</div>
              </div>
            </div>
          </WidgetCard>
        </div>
      </div>
    </div>
  );
}
window.CourseDetailV2 = CourseDetailV2;
