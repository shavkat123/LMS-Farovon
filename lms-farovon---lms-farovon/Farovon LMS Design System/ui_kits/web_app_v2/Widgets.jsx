// v2 Widgets
function WidgetCard({ children, className = '', style = {} }) {
  return (
    <div className={`rounded-2xl ${className}`}
         style={{ background: 'var(--v2-bg-surface)', border: '1px solid var(--v2-border-1)', boxShadow: 'var(--v2-shadow-card)', ...style }}>
      {children}
    </div>
  );
}

// Continue learning — wide hero widget
function ContinueLearning({ onContinue, onOpen }) {
  return (
    <WidgetCard className="overflow-hidden">
      <div className="grid grid-cols-[1.4fr_1fr]">
        <div className="p-7">
          <div className="flex items-center gap-2 mb-3">
            <span className="v2-eyebrow" style={{ color: 'var(--v2-primary)' }}>Продолжить обучение</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'var(--v2-tint-orange)', color: 'var(--v2-accent-orange)' }}>обязательно</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.15, color: 'var(--v2-fg-1)', letterSpacing: '-0.01em' }}>
            Безопасность на рабочем месте
          </h2>
          <p className="mt-2" style={{ fontSize: 14, color: 'var(--v2-fg-2)', maxWidth: 460 }}>
            Модуль 4 из 7 · «Реагирование на инциденты». Осталось ~18 минут до завершения.
          </p>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--v2-border-1)' }}>
              <div className="h-full rounded-full" style={{ width: '60%', background: 'linear-gradient(90deg, var(--v2-primary), var(--v2-accent-violet))' }} />
            </div>
            <span className="v2-num text-sm font-bold" style={{ color: 'var(--v2-primary)' }}>60%</span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button onClick={onContinue}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2"
                    style={{ background: 'var(--v2-primary)', color: '#fff' }}>
              Продолжить <i data-lucide="arrow-right" style={{ width: 14, height: 14 }} />
            </button>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--v2-accent-orange)', fontWeight: 600 }}>
              <i data-lucide="clock" style={{ width: 12, height: 12 }} /> Дедлайн: 12 марта
            </div>
          </div>
        </div>

        <div className="relative v2-cover v2-cover--paper">
          <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
            <span className="v2-eyebrow" style={{ color: 'var(--v2-fg-3)' }}>Compliance</span>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--v2-fg-1)', lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.01em' }}>
              Безопасность<br/>на рабочем месте
            </div>
            <div className="mt-4 px-3 py-1.5 rounded-md flex items-center gap-1.5"
                 style={{ background: '#fff', border: '1px solid var(--v2-border-1)', fontSize: 12, fontWeight: 600, color: 'var(--v2-fg-2)' }}>
              <i data-lucide="award" style={{ width: 13, height: 13, color: 'var(--v2-accent)' }} /> +250 баллов
            </div>
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}

// Stat tile
function StatTile({ icon, label, value, sub, tint, color }) {
  return (
    <WidgetCard className="p-5">
      <div className="flex items-start justify-between">
        <span className="flex items-center justify-center rounded-xl"
              style={{ width: 40, height: 40, background: tint, color }}>
          <i data-lucide={icon} style={{ width: 20, height: 20 }} />
        </span>
        <i data-lucide="more-horizontal" style={{ width: 16, height: 16, color: 'var(--v2-fg-3)' }} />
      </div>
      <div className="mt-4">
        <div className="v2-eyebrow mb-1">{label}</div>
        <div className="flex items-baseline gap-2">
          <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--v2-fg-1)' }} className="v2-num">{value}</span>
          {sub && <span style={{ fontSize: 12, color: 'var(--v2-success)', fontWeight: 600 }}>{sub}</span>}
        </div>
      </div>
    </WidgetCard>
  );
}

// Learning path — Equeo-style step trail
function LearningPath() {
  const steps = [
    { label: 'Основы', state: 'done' },
    { label: 'Excel: продвинутый', state: 'done' },
    { label: 'Презентации', state: 'current' },
    { label: 'Анализ данных', state: 'next' },
    { label: 'Финальный проект', state: 'locked' },
  ];
  const colors = {
    done:    { bg: 'var(--v2-success)',        ring: 'var(--v2-success-50)', text: '#fff' },
    current: { bg: 'var(--v2-accent-orange)',  ring: 'var(--v2-tint-orange)', text: '#fff' },
    next:    { bg: '#fff',                     ring: 'var(--v2-border-1)',    text: 'var(--v2-fg-2)' },
    locked:  { bg: 'var(--v2-bg-muted)',       ring: 'var(--v2-border-1)',    text: 'var(--v2-fg-3)' },
  };
  return (
    <WidgetCard className="p-6">
      <div className="flex items-center justify-between mb-1">
        <span className="v2-eyebrow" style={{ color: 'var(--v2-accent-teal)' }}>Траектория развития</span>
        <a href="#" className="text-xs font-semibold" style={{ color: 'var(--v2-primary)' }}>Открыть полностью →</a>
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--v2-fg-1)', marginBottom: 4 }}>Junior → Middle Analyst</h3>
      <p style={{ fontSize: 13, color: 'var(--v2-fg-2)' }}>2 из 5 шагов завершено · следующее ревью с ментором 18 марта</p>

      <div className="mt-6 relative">
        <div className="absolute top-5 left-5 right-5 h-0.5" style={{ background: 'var(--v2-border-1)' }} />
        <div className="absolute top-5 left-5 h-0.5" style={{ width: '40%', background: 'linear-gradient(90deg, var(--v2-success), var(--v2-accent-orange))' }} />
        <div className="grid grid-cols-5 relative">
          {steps.map((s, i) => {
            const c = colors[s.state];
            return (
              <div key={i} className="flex flex-col items-center text-center px-1">
                <div className="rounded-full flex items-center justify-center font-bold relative"
                     style={{ width: 40, height: 40, background: c.bg, color: c.text, border: `4px solid ${c.ring}`, fontSize: 14 }}>
                  {s.state === 'done' ? <i data-lucide="check" style={{ width: 16, height: 16 }} />
                   : s.state === 'locked' ? <i data-lucide="lock" style={{ width: 14, height: 14 }} />
                   : i + 1}
                </div>
                <div className="mt-2" style={{ fontSize: 11, fontWeight: s.state === 'current' ? 700 : 500, color: s.state === 'locked' ? 'var(--v2-fg-3)' : 'var(--v2-fg-1)', maxWidth: 90, lineHeight: 1.3 }}>
                  {s.label}
                </div>
                {s.state === 'current' && (
                  <div className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                       style={{ background: 'var(--v2-tint-orange)', color: 'var(--v2-accent-orange)' }}>сейчас</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </WidgetCard>
  );
}

// Upcoming events
function UpcomingEvents() {
  const events = [
    { day: '14', mon: 'мар', title: 'Вебинар: культура обратной связи', time: '14:00 · онлайн', tag: 'live', color: 'var(--v2-accent-pink)' },
    { day: '18', mon: 'мар', title: 'Ревью с ментором', time: '11:30 · MS Teams', tag: '1:1', color: 'var(--v2-accent-violet)' },
    { day: '22', mon: 'мар', title: 'Тимбилдинг: командные игры', time: '17:00 · офис', tag: 'офис', color: 'var(--v2-accent-teal)' },
  ];
  return (
    <WidgetCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="v2-eyebrow" style={{ color: 'var(--v2-accent-violet)' }}>Ближайшие события</span>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--v2-fg-1)', marginTop: 2 }}>Календарь</h3>
        </div>
        <a href="#" className="text-xs font-semibold" style={{ color: 'var(--v2-primary)' }}>Все →</a>
      </div>
      <div className="space-y-3">
        {events.map((e, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl transition cursor-pointer hover:bg-[var(--v2-bg-muted)]">
            <div className="text-center rounded-xl shrink-0 py-2 px-3"
                 style={{ background: 'var(--v2-bg-muted)', minWidth: 48 }}>
              <div className="v2-num" style={{ fontSize: 18, fontWeight: 800, color: 'var(--v2-fg-1)', lineHeight: 1 }}>{e.day}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--v2-fg-3)', textTransform: 'uppercase', marginTop: 2 }}>{e.mon}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: `color-mix(in srgb, ${e.color} 12%, white)`, color: e.color }}>{e.tag}</span>
              </div>
              <div className="mt-1 truncate" style={{ fontSize: 14, fontWeight: 600, color: 'var(--v2-fg-1)' }}>{e.title}</div>
              <div style={{ fontSize: 12, color: 'var(--v2-fg-3)' }}>{e.time}</div>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}

// Leaderboard widget
function Leaderboard() {
  const me = { rank: 7, name: 'Вы (Aziz K.)', pts: 1250 };
  const top = [
    { rank: 1, name: 'Madina Saidova',   pts: 3420, dept: 'HR' },
    { rank: 2, name: 'Bekhzod Karimov',  pts: 2980, dept: 'Sales' },
    { rank: 3, name: 'Nigora Rakhimova', pts: 2710, dept: 'IT' },
  ];
  const medal = ['🥇','🥈','🥉'];
  return (
    <WidgetCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="v2-eyebrow" style={{ color: '#D97706' }}>Рейтинг марта</span>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--v2-fg-1)', marginTop: 2 }}>Лидеры</h3>
        </div>
        <a href="#" className="text-xs font-semibold" style={{ color: 'var(--v2-primary)' }}>Полный рейтинг →</a>
      </div>

      <ol className="space-y-2">
        {top.map(p => (
          <li key={p.rank} className="flex items-center gap-3 p-2.5 rounded-xl"
              style={{ background: p.rank === 1 ? 'linear-gradient(90deg, var(--v2-tint-amber), transparent)' : 'transparent' }}>
            <span style={{ fontSize: 22, lineHeight: 1, width: 28, textAlign: 'center' }}>{medal[p.rank - 1]}</span>
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--v2-fg-1)' }} className="truncate">{p.name}</div>
              <div style={{ fontSize: 11, color: 'var(--v2-fg-3)' }}>{p.dept}</div>
            </div>
            <div className="v2-num" style={{ fontSize: 14, fontWeight: 800, color: '#D97706' }}>{p.pts.toLocaleString()}</div>
          </li>
        ))}
      </ol>

      <div className="mt-3 pt-3 border-t flex items-center gap-3" style={{ borderColor: 'var(--v2-border-1)' }}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
             style={{ background: 'var(--v2-primary)', color: '#fff' }}>{me.rank}</div>
        <div className="flex-1 min-w-0">
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--v2-fg-1)' }}>{me.name}</div>
          <div style={{ fontSize: 11, color: 'var(--v2-fg-3)' }}>+120 за неделю — поднялись на 2 позиции</div>
        </div>
        <div className="v2-num" style={{ fontSize: 14, fontWeight: 800, color: 'var(--v2-fg-1)' }}>{me.pts.toLocaleString()}</div>
      </div>
    </WidgetCard>
  );
}

// Achievements
function Achievements() {
  const items = [
    { icon: 'rocket',        title: 'Быстрый старт',     date: 'Получено 14 фев', got: true },
    { icon: 'target',        title: 'Меткий стрелок',     date: 'Сдан тест на 100%', got: true },
    { icon: 'trophy',        title: 'Покоритель курсов', date: '3 курса за месяц', got: true },
    { icon: 'flame',         title: 'Серия 14 дней',     date: 'осталось 4 дня', got: false },
  ];
  return (
    <WidgetCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="v2-eyebrow" style={{ color: 'var(--v2-accent-orange)' }}>Достижения</span>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--v2-fg-1)', marginTop: 2 }}>3 из 24 получено</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((a, i) => (
          <div key={i} className="p-3 rounded-xl text-center transition"
               style={{
                 background: a.got ? 'var(--v2-bg-muted)' : '#fff',
                 border: '1px solid var(--v2-border-1)',
                 opacity: a.got ? 1 : 0.55,
               }}>
            <i data-lucide={a.icon} style={{ width: 22, height: 22, color: a.got ? 'var(--v2-primary)' : 'var(--v2-fg-3)' }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--v2-fg-1)', marginTop: 4 }}>{a.title}</div>
            <div style={{ fontSize: 10, color: 'var(--v2-fg-3)', marginTop: 2 }}>{a.date}</div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}

// Course catalog card — neutral cover with category as typography
function CourseCardV2({ course, onOpen }) {
  const covers = {
    safety:     { variant: 'navy',  label: 'Compliance' },
    cyber:      { variant: 'navy',  label: 'Security' },
    leadership: { variant: 'paper', label: 'Soft skills' },
    customer:   { variant: 'warm',  label: 'Customer care' },
    excel:      { variant: 'slate', label: 'Analytics' },
    onboarding: { variant: 'paper', label: 'Onboarding' },
  };
  const c = covers[course.theme] || covers.leadership;
  const dark = c.variant === 'navy' || c.variant === 'slate';
  const labelColor = dark ? 'rgba(255,255,255,0.7)' : 'var(--v2-fg-3)';
  const titleColor = dark ? '#FFFFFF' : 'var(--v2-fg-1)';

  return (
    <WidgetCard className="overflow-hidden flex flex-col h-full transition cursor-pointer hover:shadow-md"
                style={{ borderColor: 'var(--v2-border-1)' }}
                onClick={onOpen}>
      <div className={`v2-cover v2-cover--${c.variant} h-32`}>
        <div className="v2-cover-label" style={{ color: labelColor }}>{c.label}</div>
        <div className="v2-cover-title" style={{ color: titleColor }}>{course.title}</div>
        {course.required && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: 'var(--v2-danger)', color: '#fff', borderRadius: 4 }}>Обязательно</span>
        )}
        {course.new && !course.required && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: '#fff', color: 'var(--v2-fg-1)', border: '1px solid var(--v2-border-2)', borderRadius: 4 }}>Новый</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-1.5">
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--v2-fg-3)' }}>{course.category}</span>
          <span style={{ color: 'var(--v2-border-2)' }}>·</span>
          <span style={{ fontSize: 11, color: 'var(--v2-fg-3)' }}>{course.duration}</span>
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--v2-fg-1)', lineHeight: 1.35, letterSpacing: '-0.005em' }}>{course.title}</h3>
        <p style={{ fontSize: 12, color: 'var(--v2-fg-2)', marginTop: 4, lineHeight: 1.5 }} className="line-clamp-2">{course.desc}</p>

        <div className="mt-auto pt-4">
          {course.progress != null ? (
            <>
              <div className="flex items-center justify-between mb-1.5">
                <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--v2-fg-2)' }}>{course.progress}% пройдено</span>
                <span className="v2-num" style={{ fontSize: 11, fontWeight: 600, color: 'var(--v2-fg-3)' }}>+{course.points} баллов</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--v2-border-1)' }}>
                <div className="h-full rounded-full" style={{ width: `${course.progress}%`, background: course.required ? 'var(--v2-accent)' : 'var(--v2-primary)' }} />
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <span className="v2-num" style={{ fontSize: 12, fontWeight: 600, color: 'var(--v2-fg-3)' }}>+{course.points} баллов</span>
              <button className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--v2-primary)' }}>
                Записаться <i data-lucide="arrow-right" style={{ width: 12, height: 12 }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </WidgetCard>
  );
}

window.WidgetCard = WidgetCard;
window.ContinueLearning = ContinueLearning;
window.StatTile = StatTile;
window.LearningPath = LearningPath;
window.UpcomingEvents = UpcomingEvents;
window.Leaderboard = Leaderboard;
window.Achievements = Achievements;
window.CourseCardV2 = CourseCardV2;
