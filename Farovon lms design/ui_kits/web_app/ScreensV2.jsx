// v2 Screens
function HeroBanner({ user }) {
  return (
    <div className="rounded-2xl p-7 text-white relative overflow-hidden v2-hero-grad">
      <div className="relative z-10 max-w-2xl">
        <span className="v2-eyebrow" style={{ color: 'rgba(255,255,255,0.65)' }}>Доброе утро</span>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 4, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
          {user.name.split(' ')[0]}, у вас отличный темп — продолжайте.
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)', marginTop: 10, maxWidth: 520, lineHeight: 1.55 }}>
          Сегодня в плане: 1 обязательный модуль и 1 ревью с ментором.
        </p>
        <div className="mt-6 flex items-center gap-8">
          <div className="flex items-center gap-3">
            <i data-lucide="flame" style={{ width: 18, height: 18, opacity: 0.7 }} />
            <div>
              <div className="v2-num" style={{ fontSize: 20, fontWeight: 700 }}>14</div>
              <div style={{ fontSize: 11, opacity: 0.65, fontWeight: 500 }}>дней подряд</div>
            </div>
          </div>
          <div className="w-px h-9" style={{ background: 'rgba(255,255,255,0.18)' }} />
          <div className="flex items-center gap-3">
            <i data-lucide="book-open" style={{ width: 18, height: 18, opacity: 0.7 }} />
            <div>
              <div className="v2-num" style={{ fontSize: 20, fontWeight: 700 }}>3</div>
              <div style={{ fontSize: 11, opacity: 0.65, fontWeight: 500 }}>курса в работе</div>
            </div>
          </div>
          <div className="w-px h-9" style={{ background: 'rgba(255,255,255,0.18)' }} />
          <div className="flex items-center gap-3">
            <i data-lucide="award" style={{ width: 18, height: 18, opacity: 0.7 }} />
            <div>
              <div className="v2-num" style={{ fontSize: 20, fontWeight: 700 }}>1 250</div>
              <div style={{ fontSize: 11, opacity: 0.65, fontWeight: 500 }}>баллов</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardV2({ user, onNav, onOpenCourse }) {
  return (
    <div className="space-y-6 max-w-[1280px] mx-auto">
      <HeroBanner user={user} />

      <div className="grid grid-cols-4 gap-4">
        <StatTile icon="book-marked" label="В обучении"       value="3"   sub="+1 за неделю" tint="var(--v2-tint-blue)"   color="var(--v2-primary)" />
        <StatTile icon="check-circle-2" label="Завершено"     value="12"  sub="83% успеваемость" tint="var(--v2-tint-teal)"   color="var(--v2-accent-teal)" />
        <StatTile icon="clock"        label="Часов обучения"   value="47" sub="+5 за неделю" tint="var(--v2-tint-violet)" color="var(--v2-accent-violet)" />
        <StatTile icon="award"        label="Сертификатов"     value="6"  sub="2 в этом году" tint="var(--v2-tint-orange)" color="var(--v2-accent-orange)" />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5">
          <ContinueLearning onContinue={onOpenCourse || (() => onNav('courses'))} onOpen={onOpenCourse} />
          <LearningPath />

          <WidgetCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="v2-eyebrow" style={{ color: 'var(--v2-accent-orange)' }}>Каталог</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--v2-fg-1)', marginTop: 2 }}>Рекомендовано вам</h3>
              </div>
              <a href="#" className="text-xs font-semibold" style={{ color: 'var(--v2-primary)' }}>Весь каталог →</a>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <CourseCardV2 course={{ title: 'Основы Power BI', desc: 'Дашборды и визуализация для аналитиков и менеджеров.', category: 'Аналитика', duration: '4 ч', points: 350, theme: 'excel', new: true }} onOpen={onOpenCourse} />
              <CourseCardV2 course={{ title: 'Кибергигиена 2026', desc: 'Фишинг, пароли, инциденты — обновлённая программа.', category: 'Безопасность', duration: '1.5 ч', points: 200, theme: 'cyber' }} onOpen={onOpenCourse} />
              <CourseCardV2 course={{ title: 'Лидерство в команде', desc: 'Для тимлидов: коммуникация, обратная связь, делегирование.', category: 'Soft skills', duration: '6 ч', points: 480, theme: 'leadership' }} onOpen={onOpenCourse} />
            </div>
          </WidgetCard>
        </div>

        <div className="space-y-5">
          <UpcomingEvents />
          <Leaderboard />
          <Achievements />
        </div>
      </div>
    </div>
  );
}

function CoursesV2({ onOpen }) {
  const all = [
    { title: 'Безопасность на рабочем месте', desc: 'Ежегодное обязательное обучение по охране труда.', category: 'Compliance', duration: '3 ч', points: 250, theme: 'safety', required: true, progress: 60 },
    { title: 'Лидерство для новых тимлидов', desc: 'Коммуникация, обратная связь, делегирование.', category: 'Soft skills', duration: '6 ч', points: 480, theme: 'leadership', progress: 35 },
    { title: 'Онбординг новых сотрудников', desc: 'Программа для адаптации в первые 2 недели.', category: 'Adaptation', duration: '2 ч', points: 150, theme: 'onboarding', progress: 100 },
    { title: 'Excel для аналитиков', desc: 'PivotTables, Power Query, дашборды.', category: 'Hard skills', duration: '8 ч', points: 600, theme: 'excel' },
    { title: 'Сервис, который запоминается', desc: 'Эмпатичная коммуникация со сложными клиентами.', category: 'Customer', duration: '4 ч', points: 350, theme: 'customer', new: true },
    { title: 'Кибергигиена 2026', desc: 'Фишинг, пароли, инциденты — обновлено.', category: 'Безопасность', duration: '1.5 ч', points: 200, theme: 'cyber' },
  ];
  const filters = ['Все курсы', 'Обязательные', 'В работе', 'Завершённые', 'Рекомендовано'];
  const [active, setActive] = React.useState('Все курсы');
  return (
    <div className="space-y-6 max-w-[1280px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <span className="v2-eyebrow" style={{ color: 'var(--v2-primary)' }}>Каталог</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--v2-fg-1)', marginTop: 4 }}>Курсы и обучение</h1>
          <p style={{ fontSize: 14, color: 'var(--v2-fg-2)', marginTop: 4 }}>{all.length} курсов · 3 в работе · 1 обязательный</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5"
                  style={{ background: '#fff', border: '1px solid var(--v2-border-1)', color: 'var(--v2-fg-2)' }}>
            <i data-lucide="sliders-horizontal" style={{ width: 14, height: 14 }} /> Фильтры
          </button>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5"
                  style={{ background: 'var(--v2-primary)', color: '#fff' }}>
            <i data-lucide="plus" style={{ width: 14, height: 14 }} /> Записаться на курс
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f} onClick={() => setActive(f)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition"
                  style={{
                    background: active === f ? 'var(--v2-fg-1)' : '#fff',
                    color: active === f ? '#fff' : 'var(--v2-fg-2)',
                    border: '1px solid ' + (active === f ? 'var(--v2-fg-1)' : 'var(--v2-border-1)'),
                  }}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {all.map((c, i) => <CourseCardV2 key={i} course={c} onOpen={onOpen} />)}
      </div>
    </div>
  );
}

function ForumV2() {
  const threads = [
    { id: 4, title: 'Добро пожаловать в сообщество Farovon!', author: 'CEO',          replies: 28, votes: 64, tag: 'Закреплено', tagColor: 'var(--v2-accent-amber)', when: '2 нед', avatar: '👤' },
    { id: 1, title: 'Советы по экзамену Power BI?',           author: 'Madina S.',    replies: 12, votes: 8,  tag: 'Помощь',     tagColor: 'var(--v2-primary)',       when: '2 ч',   avatar: 'М' },
    { id: 2, title: 'Как удерживать мотивацию в длинных модулях?', author: 'Bekhzod K.', replies: 7,  votes: 14, tag: 'Дискуссия', tagColor: 'var(--v2-accent-violet)', when: '5 ч',   avatar: 'Б' },
    { id: 3, title: 'Прогресс не сохраняется на iOS Safari',  author: 'Nigora R.',    replies: 3,  votes: 2,  tag: 'Баг',        tagColor: 'var(--v2-danger)',        when: '1 д',   avatar: 'Н' },
  ];
  return (
    <div className="space-y-6 max-w-[1280px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <span className="v2-eyebrow" style={{ color: 'var(--v2-accent-pink)' }}>Сообщество</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--v2-fg-1)', marginTop: 4 }}>Обсуждения и Q&A</h1>
          <p style={{ fontSize: 14, color: 'var(--v2-fg-2)', marginTop: 4 }}>Спрашивайте, отвечайте — за полезные ответы начисляются баллы.</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5"
                style={{ background: 'var(--v2-primary)', color: '#fff' }}>
          <i data-lucide="plus" style={{ width: 14, height: 14 }} /> Новая тема
        </button>
      </div>

      <WidgetCard>
        <ul className="divide-y" style={{ borderColor: 'var(--v2-border-1)' }}>
          {threads.map(t => (
            <li key={t.id} className="p-5 flex items-center gap-4 hover:bg-[var(--v2-bg-muted)] cursor-pointer transition">
              <div className="text-center w-12 shrink-0 rounded-xl py-2"
                   style={{ background: 'var(--v2-bg-muted)' }}>
                <i data-lucide="chevron-up" style={{ width: 14, height: 14, color: 'var(--v2-fg-3)', margin: '0 auto' }} />
                <div className="v2-num" style={{ fontSize: 14, fontWeight: 800, color: 'var(--v2-fg-1)' }}>{t.votes}</div>
                <i data-lucide="chevron-down" style={{ width: 14, height: 14, color: 'var(--v2-fg-3)', margin: '0 auto' }} />
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0"
                   style={{ background: 'linear-gradient(135deg, #DCE4FF, #EFEAFF)', color: 'var(--v2-primary)' }}>{t.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: `color-mix(in srgb, ${t.tagColor} 12%, white)`, color: t.tagColor }}>{t.tag}</span>
                  <span style={{ fontSize: 11, color: 'var(--v2-fg-3)' }}>· {t.when} назад · автор {t.author}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--v2-fg-1)' }} className="truncate">{t.title}</h3>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1.5" style={{ fontSize: 13, color: 'var(--v2-fg-2)', fontWeight: 600 }}>
                  <i data-lucide="message-circle" style={{ width: 14, height: 14 }} /> {t.replies}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </WidgetCard>
    </div>
  );
}

function ShopV2() {
  const items = [
    { id: 1, name: 'Брендированная кружка Farovon', cost: 200,  stock: 12, icon: 'coffee',     cat: 'Мерч' },
    { id: 2, name: 'Дополнительный выходной',         cost: 2500, stock: 3,  icon: 'palmtree',   cat: 'Бенефит' },
    { id: 3, name: 'Беспроводные наушники',           cost: 1800, stock: 5,  icon: 'headphones', cat: 'Техника' },
    { id: 4, name: 'Обед с CEO',                      cost: 1500, stock: 1,  icon: 'utensils',   cat: 'Опыт' },
    { id: 5, name: 'Набор: блокнот + ручка',          cost: 350,  stock: 24, icon: 'notebook-pen', cat: 'Мерч' },
    { id: 6, name: 'Сертификат на онлайн-курс',       cost: 1200, stock: 8,  icon: 'graduation-cap', cat: 'Обучение' },
  ];
  const balance = 1250;
  return (
    <div className="space-y-6 max-w-[1280px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <span className="v2-eyebrow" style={{ color: 'var(--v2-accent-teal)' }}>Магазин наград</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--v2-fg-1)', marginTop: 4 }}>Обменяйте баллы на призы</h1>
          <p style={{ fontSize: 14, color: 'var(--v2-fg-2)', marginTop: 4 }}>Зарабатывайте баллы за курсы, тесты и помощь коллегам.</p>
        </div>
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl"
             style={{ background: '#fff', border: '1px solid var(--v2-border-1)' }}>
          <i data-lucide="award" style={{ width: 22, height: 22, color: 'var(--v2-accent)' }} />
          <div>
            <div className="v2-eyebrow" style={{ color: 'var(--v2-fg-3)' }}>Доступно</div>
            <div className="v2-num" style={{ fontSize: 20, fontWeight: 700, color: 'var(--v2-fg-1)', lineHeight: 1, letterSpacing: '-0.01em' }}>{balance.toLocaleString()} баллов</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {items.map(i => {
          const can = balance >= i.cost;
          return (
            <WidgetCard key={i.id} className="p-5">
              <div className="aspect-[4/3] rounded-xl flex items-center justify-center mb-4"
                   style={{ background: 'var(--v2-bg-muted)', border: '1px solid var(--v2-border-1)' }}>
                <i data-lucide={i.icon} style={{ width: 56, height: 56, color: 'var(--v2-fg-2)', strokeWidth: 1.25 }} />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="v2-eyebrow" style={{ color: 'var(--v2-fg-3)' }}>{i.cat}</span>
                <span style={{ fontSize: 11, color: 'var(--v2-fg-3)' }}>· осталось {i.stock}</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--v2-fg-1)' }}>{i.name}</h3>
              <div className="mt-4 flex items-center justify-between">
                <span className="v2-num flex items-center gap-1.5" style={{ fontSize: 15, fontWeight: 700, color: 'var(--v2-fg-1)' }}>
                  <i data-lucide="award" style={{ width: 14, height: 14, color: 'var(--v2-accent)' }} />
                  {i.cost.toLocaleString()}
                </span>
                <button disabled={!can}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold transition"
                        style={{
                          background: can ? 'var(--v2-primary)' : 'var(--v2-bg-muted)',
                          color: can ? '#fff' : 'var(--v2-fg-3)',
                          cursor: can ? 'pointer' : 'not-allowed'
                        }}>
                  {can ? 'Обменять' : `Не хватает ${(i.cost - balance).toLocaleString()}`}
                </button>
              </div>
            </WidgetCard>
          );
        })}
      </div>
    </div>
  );
}

function PathsV2() {
  const paths = [
    { title: 'Junior → Middle Analyst', steps: 5, done: 2, tint: 'var(--v2-tint-teal)',   color: 'var(--v2-accent-teal)',   icon: 'bar-chart-3' },
    { title: 'Soft skills для тимлида',  steps: 6, done: 3, tint: 'var(--v2-tint-violet)', color: 'var(--v2-accent-violet)', icon: 'users' },
    { title: 'Введение в продуктовую аналитику', steps: 4, done: 0, tint: 'var(--v2-tint-orange)', color: 'var(--v2-accent-orange)', icon: 'target' },
  ];
  return (
    <div className="space-y-6 max-w-[1280px] mx-auto">
      <div>
        <span className="v2-eyebrow" style={{ color: 'var(--v2-accent-teal)' }}>Карьерные траектории</span>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--v2-fg-1)', marginTop: 4 }}>Ваши пути развития</h1>
        <p style={{ fontSize: 14, color: 'var(--v2-fg-2)', marginTop: 4 }}>Структурированные программы роста — курсы, ревью, проектные задания.</p>
      </div>

      <LearningPath />

      <div className="grid grid-cols-3 gap-5">
        {paths.map((p, i) => (
          <WidgetCard key={i} className="p-6">
            <span className="flex items-center justify-center rounded-2xl mb-4"
                  style={{ width: 48, height: 48, background: p.tint, color: p.color }}>
              <i data-lucide={p.icon} style={{ width: 22, height: 22 }} />
            </span>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--v2-fg-1)' }}>{p.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--v2-fg-2)', marginTop: 6 }}>{p.done} из {p.steps} шагов завершено</p>
            <div className="mt-4 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--v2-border-1)' }}>
              <div className="h-full rounded-full" style={{ width: `${(p.done / p.steps) * 100}%`, background: p.color }} />
            </div>
            <button className="mt-5 w-full py-2 rounded-xl text-sm font-semibold transition"
                    style={{ background: p.tint, color: p.color }}>
              {p.done === 0 ? 'Начать траекторию' : 'Продолжить'}
            </button>
          </WidgetCard>
        ))}
      </div>
    </div>
  );
}

window.HeroBanner = HeroBanner;
window.DashboardV2 = DashboardV2;
window.CoursesV2 = CoursesV2;
window.ForumV2 = ForumV2;
window.ShopV2 = ShopV2;
window.PathsV2 = PathsV2;
