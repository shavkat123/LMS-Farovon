/* @ds-bundle: {"format":4,"namespace":"FarovonLMSDesignSystem_019dd3","components":[],"sourceHashes":{"ui_kits/admin/AdminSidebar.jsx":"619166854ded","ui_kits/admin/AdminTopBar.jsx":"ce3d67cb5876","ui_kits/admin/Analytics.jsx":"a26939bdfbf1","ui_kits/admin/CourseEditor.jsx":"73af5b5ecbcb","ui_kits/admin/Dashboard.jsx":"cdb42a45b555","ui_kits/admin/Users.jsx":"2e3267d4d8da","ui_kits/web_app/CourseDetail.jsx":"76f706e5c198","ui_kits/web_app/ScreensV2.jsx":"9754f3a4c310","ui_kits/web_app/SidebarV2.jsx":"00ba46837491","ui_kits/web_app/TopBarV2.jsx":"1ab60799cf31","ui_kits/web_app/Widgets.jsx":"92545b5f585f","ui_kits/web_app_v2/CourseDetail.jsx":"76f706e5c198","ui_kits/web_app_v2/Screens.jsx":"9754f3a4c310","ui_kits/web_app_v2/SidebarV2.jsx":"00ba46837491","ui_kits/web_app_v2/TopBarV2.jsx":"1ab60799cf31","ui_kits/web_app_v2/Widgets.jsx":"92545b5f585f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FarovonLMSDesignSystem_019dd3 = window.FarovonLMSDesignSystem_019dd3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/admin/AdminSidebar.jsx
try { (() => {
function AdminSidebar({
  active,
  onNav
}) {
  const sections = [{
    label: 'Обзор',
    items: [{
      k: 'dashboard',
      t: 'Дашборд',
      i: 'layout-dashboard'
    }, {
      k: 'analytics',
      t: 'Аналитика',
      i: 'bar-chart-3'
    }]
  }, {
    label: 'Контент',
    items: [{
      k: 'courses',
      t: 'Курсы',
      i: 'book-open',
      count: 47
    }, {
      k: 'paths',
      t: 'Траектории',
      i: 'route',
      count: 12
    }, {
      k: 'tests',
      t: 'Тесты',
      i: 'clipboard-check',
      count: 84
    }, {
      k: 'library',
      t: 'Библиотека',
      i: 'library'
    }]
  }, {
    label: 'Люди',
    items: [{
      k: 'users',
      t: 'Сотрудники',
      i: 'users',
      count: 312
    }, {
      k: 'groups',
      t: 'Группы',
      i: 'users-round'
    }, {
      k: 'roles',
      t: 'Роли и доступы',
      i: 'shield'
    }]
  }, {
    label: 'Коммуникации',
    items: [{
      k: 'broadcasts',
      t: 'Рассылки',
      i: 'send'
    }, {
      k: 'forum',
      t: 'Форум',
      i: 'messages-square',
      count: 3
    }, {
      k: 'events',
      t: 'События',
      i: 'calendar'
    }]
  }, {
    label: 'Система',
    items: [{
      k: 'settings',
      t: 'Настройки',
      i: 'settings-2'
    }, {
      k: 'integrations',
      t: 'Интеграции',
      i: 'plug'
    }, {
      k: 'audit',
      t: 'Журнал',
      i: 'file-text'
    }]
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "adm-rail flex flex-col shrink-0",
    style: {
      width: 248,
      height: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 pt-5 pb-4 flex items-center gap-2.5",
    style: {
      borderBottom: '1px solid var(--adm-border-rail)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-md flex items-center justify-center",
    style: {
      width: 32,
      height: 32,
      background: '#fff',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/farovon-logo.png",
    alt: "Farovon",
    style: {
      width: 22,
      height: 22,
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: '#fff',
      letterSpacing: '-0.01em',
      lineHeight: 1.1
    }
  }, "Farovon LMS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--adm-fg-rail-2)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "Admin Console"))), /*#__PURE__*/React.createElement("nav", {
    className: "flex-1 overflow-y-auto px-3 pb-4"
  }, sections.map((s, si) => /*#__PURE__*/React.createElement("div", {
    key: si
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-rail-section"
  }, s.label), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-0.5"
  }, s.items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it.k
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav(it.k),
    className: 'adm-rail-link w-full ' + (active === it.k ? 'active' : '')
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": it.i,
    style: {
      width: 16,
      height: 16
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "flex-1 text-left"
  }, it.t), it.count !== undefined && /*#__PURE__*/React.createElement("span", {
    className: "adm-num",
    style: {
      fontSize: 10,
      fontWeight: 600,
      color: 'var(--adm-fg-rail-2)'
    }
  }, it.count)))))))), /*#__PURE__*/React.createElement("div", {
    className: "px-3 pb-4 pt-3",
    style: {
      borderTop: '1px solid var(--adm-border-rail)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5 px-2 py-2 rounded-lg",
    style: {
      background: 'rgba(255,255,255,0.03)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-full flex items-center justify-center font-bold",
    style: {
      width: 32,
      height: 32,
      background: 'linear-gradient(135deg, #2D4FBF, #7B5BFF)',
      color: '#fff',
      fontSize: 12
    }
  }, "\u041C\u0421"), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: '#fff'
    },
    className: "truncate"
  }, "\u041C\u0430\u0434\u0438\u043D\u0430 \u0421\u0430\u0438\u0434\u043E\u0432\u0430"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--adm-fg-rail-2)'
    }
  }, "HR Lead \xB7 Admin")), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "more-vertical",
    style: {
      width: 14,
      height: 14,
      color: 'var(--adm-fg-rail-2)'
    }
  }))));
}
window.AdminSidebar = AdminSidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/AdminSidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/AdminTopBar.jsx
try { (() => {
function AdminTopBar({
  title,
  breadcrumb,
  actions
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "flex items-center px-7 py-3.5",
    style: {
      background: '#fff',
      borderBottom: '1px solid var(--adm-border-1)',
      minHeight: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, breadcrumb && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 mb-0.5",
    style: {
      fontSize: 11,
      color: 'var(--adm-fg-3)'
    }
  }, breadcrumb.map((b, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-right",
    style: {
      width: 11,
      height: 11
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: i === breadcrumb.length - 1 ? 600 : 400,
      color: i === breadcrumb.length - 1 ? 'var(--adm-fg-2)' : 'inherit'
    }
  }, b)))), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--adm-fg-1)',
      letterSpacing: '-0.01em'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    style: {
      width: 14,
      height: 14,
      color: 'var(--adm-fg-3)',
      position: 'absolute',
      left: 10,
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    style: {
      paddingLeft: 32,
      width: 240
    },
    placeholder: "\u041F\u043E\u0438\u0441\u043A (\u2318K)"
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      padding: 8
    },
    "aria-label": "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bell",
    style: {
      width: 15,
      height: 15
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      padding: 8
    },
    "aria-label": "\u041F\u043E\u043C\u043E\u0449\u044C"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "circle-help",
    style: {
      width: 15,
      height: 15
    }
  })), actions));
}
window.AdminTopBar = AdminTopBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/AdminTopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Analytics.jsx
try { (() => {
// Analytics screen — completion heatmap, dept breakdown, funnel

function AdminAnalytics() {
  const depts = [{
    name: 'Операции',
    people: 86,
    completion: 84,
    hours: 412,
    trend: 'up'
  }, {
    name: 'IT',
    people: 54,
    completion: 76,
    hours: 298,
    trend: 'up'
  }, {
    name: 'Финансы',
    people: 38,
    completion: 92,
    hours: 240,
    trend: 'flat'
  }, {
    name: 'HR',
    people: 22,
    completion: 95,
    hours: 180,
    trend: 'up'
  }, {
    name: 'Маркетинг',
    people: 28,
    completion: 68,
    hours: 142,
    trend: 'down'
  }, {
    name: 'Безопасность',
    people: 14,
    completion: 88,
    hours: 96,
    trend: 'flat'
  }];
  const heatmap = Array.from({
    length: 7 * 12
  }, (_, i) => Math.random());
  const funnel = [{
    stage: 'Назначено',
    count: 312,
    pct: 100
  }, {
    stage: 'Начали',
    count: 281,
    pct: 90
  }, {
    stage: 'Половина',
    count: 234,
    pct: 75
  }, {
    stage: 'Финальный тест',
    count: 198,
    pct: 63
  }, {
    stage: 'Сертификат',
    count: 187,
    pct: 60
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement(FilterButton, {
    label: "\u041F\u0435\u0440\u0438\u043E\u0434",
    value: "Q1 2026"
  }), /*#__PURE__*/React.createElement(FilterButton, {
    label: "\u041E\u0442\u0434\u0435\u043B",
    value: "\u0412\u0441\u0435 \u043E\u0442\u0434\u0435\u043B\u044B"
  }), /*#__PURE__*/React.createElement(FilterButton, {
    label: "\u041B\u043E\u043A\u0430\u0446\u0438\u044F",
    value: "Tashkent + 3"
  }), /*#__PURE__*/React.createElement(FilterButton, {
    label: "\u041A\u0443\u0440\u0441",
    value: "\u0412\u0441\u0435 \u043A\u0443\u0440\u0441\u044B"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "download",
    style: {
      width: 13,
      height: 13
    }
  }), " \u042D\u043A\u0441\u043F\u043E\u0440\u0442 PDF"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "share-2",
    style: {
      width: 13,
      height: 13
    }
  }), " \u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "\u0427\u0430\u0441\u043E\u0432 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F",
    value: "1 412",
    delta: "+18%",
    up: true
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "\u041D\u043E\u0432\u044B\u0445 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432",
    value: "142",
    delta: "+22%",
    up: true
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "NPS \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F",
    value: "64",
    delta: "+5",
    up: true
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C / \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430",
    value: "$24",
    delta: "-12%",
    up: true,
    sub: "\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u044F"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-card col-span-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 flex items-center justify-between",
    style: {
      borderBottom: '1px solid var(--adm-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u041F\u043E \u043E\u0442\u0434\u0435\u043B\u0430\u043C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--adm-fg-1)',
      marginTop: 2
    }
  }, "\u0417\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u0438 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0430")), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-up-down",
    style: {
      width: 13,
      height: 13
    }
  }), " \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430")), /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u041E\u0442\u0434\u0435\u043B"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 70
    },
    className: "text-right"
  }, "\u041B\u044E\u0434\u0438"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 220
    }
  }, "\u0417\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u043C\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 100
    },
    className: "text-right"
  }, "\u0427\u0430\u0441\u044B"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 60
    }
  }, "\u0422\u0440\u0435\u043D\u0434"))), /*#__PURE__*/React.createElement("tbody", null, depts.map((d, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 600
    }
  }, d.name), /*#__PURE__*/React.createElement("td", {
    className: "text-right adm-num"
  }, d.people), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 h-1.5 rounded-full",
    style: {
      background: 'var(--adm-bg-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full",
    style: {
      width: `${d.completion}%`,
      background: d.completion >= 85 ? 'var(--adm-success)' : d.completion < 70 ? 'var(--adm-danger)' : 'var(--adm-primary)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "adm-num",
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--adm-fg-2)',
      minWidth: 32
    }
  }, d.completion, "%"))), /*#__PURE__*/React.createElement("td", {
    className: "text-right adm-num"
  }, d.hours), /*#__PURE__*/React.createElement("td", null, d.trend === 'up' && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "trending-up",
    style: {
      width: 14,
      height: 14,
      color: 'var(--adm-success)'
    }
  }), d.trend === 'down' && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "trending-down",
    style: {
      width: 14,
      height: 14,
      color: 'var(--adm-danger)'
    }
  }), d.trend === 'flat' && /*#__PURE__*/React.createElement("i", {
    "data-lucide": "minus",
    style: {
      width: 14,
      height: 14,
      color: 'var(--adm-fg-3)'
    }
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u0412\u043E\u0440\u043E\u043D\u043A\u0430 \u043F\u0440\u043E\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--adm-fg-1)',
      marginTop: 2
    }
  }, "\xAB\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435\xBB"), /*#__PURE__*/React.createElement("ul", {
    className: "mt-5 space-y-2.5"
  }, funnel.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--adm-fg-2)'
    }
  }, f.stage), /*#__PURE__*/React.createElement("span", {
    className: "adm-num",
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--adm-fg-1)'
    }
  }, f.count, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--adm-fg-3)',
      fontWeight: 500
    }
  }, "\xB7 ", f.pct, "%"))), /*#__PURE__*/React.createElement("div", {
    className: "h-2 rounded-sm",
    style: {
      background: 'var(--adm-bg-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-sm",
    style: {
      width: `${f.pct}%`,
      background: 'var(--adm-primary)'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-4 flex items-center justify-between",
    style: {
      borderTop: '1px solid var(--adm-border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--adm-fg-3)'
    }
  }, "\u0421\u0430\u043C\u044B\u0439 \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u043E\u0442\u0442\u043E\u043A"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--adm-danger)'
    }
  }, "\u041F\u043E\u043B\u043E\u0432\u0438\u043D\u0430 \u2192 \u0424\u0438\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0435\u0441\u0442 (\u221215%)")))), /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C \u043F\u043E \u0447\u0430\u0441\u0430\u043C \u0438 \u0434\u043D\u044F\u043C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--adm-fg-1)',
      marginTop: 2
    }
  }, "\u041A\u043E\u0433\u0434\u0430 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438 \u0443\u0447\u0430\u0442\u0441\u044F")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-[10px]",
    style: {
      color: 'var(--adm-fg-3)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u043C\u0435\u043D\u044C\u0448\u0435"), [0.1, 0.3, 0.5, 0.7, 0.9].map(v => /*#__PURE__*/React.createElement("div", {
    key: v,
    style: {
      width: 12,
      height: 12,
      background: `rgba(30, 58, 138, ${v})`,
      borderRadius: 2
    }
  })), /*#__PURE__*/React.createElement("span", null, "\u0431\u043E\u043B\u044C\u0448\u0435"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-around",
    style: {
      paddingTop: 14,
      fontSize: 10,
      color: 'var(--adm-fg-3)'
    }
  }, ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      height: 18
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between mb-1",
    style: {
      fontSize: 9,
      color: 'var(--adm-fg-3)'
    }
  }, ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-[3px]",
    style: {
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridTemplateRows: 'repeat(7, 18px)'
    }
  }, heatmap.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: `rgba(30, 58, 138, ${0.05 + v * 0.85})`,
      borderRadius: 3
    }
  })))))));
}
function KPI({
  label,
  value,
  delta,
  up,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "adm-num",
    style: {
      fontSize: 26,
      fontWeight: 700,
      color: 'var(--adm-fg-1)',
      letterSpacing: '-0.02em',
      marginTop: 6
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-1.5"
  }, delta && /*#__PURE__*/React.createElement("span", {
    className: "adm-num flex items-center gap-0.5",
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: up ? 'var(--adm-success)' : 'var(--adm-danger)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": up ? 'trending-up' : 'trending-down',
    style: {
      width: 11,
      height: 11
    }
  }), " ", delta), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--adm-fg-3)'
    }
  }, sub)));
}
function FilterButton({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--adm-fg-3)'
    }
  }, label, ":"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--adm-fg-1)',
      fontWeight: 600
    }
  }, value), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      width: 12,
      height: 12,
      color: 'var(--adm-fg-3)'
    }
  }));
}
window.AdminAnalytics = AdminAnalytics;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Analytics.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/CourseEditor.jsx
try { (() => {
// Course Editor — Equeo-style: drag-and-drop module/lesson tree

function CourseEditor() {
  const modules = [{
    num: 1,
    title: 'Введение в безопасность',
    lessons: [{
      type: 'video',
      title: 'Зачем нужна культура безопасности',
      dur: '6 мин',
      pub: true
    }, {
      type: 'reading',
      title: 'Политика компании Farovon',
      dur: '4 мин',
      pub: true
    }, {
      type: 'quiz',
      title: 'Проверка понимания',
      dur: '5 вопр.',
      pub: true
    }],
    collapsed: false
  }, {
    num: 2,
    title: 'Физическая безопасность',
    lessons: [{
      type: 'video',
      title: 'Эвакуация и пути выхода',
      dur: '8 мин',
      pub: true
    }, {
      type: 'video',
      title: 'Работа с электроникой',
      dur: '5 мин',
      pub: false
    }],
    collapsed: true
  }, {
    num: 3,
    title: 'Информационная безопасность',
    lessons: [],
    collapsed: true
  }, {
    num: 4,
    title: 'Реагирование на инциденты',
    lessons: [],
    collapsed: true,
    draft: true
  }];
  const typeIcon = {
    video: 'play-circle',
    reading: 'book-open',
    quiz: 'help-circle',
    task: 'clipboard-list'
  };
  const typeLabel = {
    video: 'Видео',
    reading: 'Чтение',
    quiz: 'Тест',
    task: 'Задание'
  };
  const typeColor = {
    video: 'var(--adm-primary)',
    reading: 'var(--adm-fg-2)',
    quiz: 'var(--adm-accent)',
    task: 'var(--adm-success)'
  };
  const tabs = ['Содержание', 'О курсе', 'Аудитория', 'Расписание', 'Сертификат', 'Настройки'];
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-card flex items-center justify-between p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-lg flex items-center justify-center",
    style: {
      width: 44,
      height: 44,
      background: 'var(--adm-bg-muted)',
      color: 'var(--adm-primary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "shield",
    style: {
      width: 22,
      height: 22
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    defaultValue: "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435",
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--adm-fg-1)',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      minWidth: 320,
      letterSpacing: '-0.01em'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-pill adm-pill--warn"
  }, "\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--adm-fg-3)',
      marginTop: 2
    }
  }, "Compliance \xB7 \u0432\u0435\u0440\u0441\u0438\u044F 2.1 \xB7 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0432 14:32 \xB7 \u0430\u0432\u0442\u043E\u0440 Madina Saidova"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "eye",
    style: {
      width: 13,
      height: 13
    }
  }), " \u041F\u0440\u0435\u0432\u044C\u044E"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "users",
    style: {
      width: 13,
      height: 13
    }
  }), " \u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "rocket",
    style: {
      width: 13,
      height: 13
    }
  }), " \u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 px-1",
    style: {
      borderBottom: '1px solid var(--adm-border-1)'
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: "px-3 py-2.5 transition",
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: i === 0 ? 'var(--adm-primary)' : 'var(--adm-fg-2)',
      borderBottom: i === 0 ? '2px solid var(--adm-primary)' : '2px solid transparent',
      marginBottom: -1
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-[1fr_320px] gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, modules.map((m, mi) => /*#__PURE__*/React.createElement("div", {
    key: mi,
    className: "adm-card overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-4 py-3",
    style: {
      background: '#FAFBFC',
      borderBottom: m.collapsed ? 'none' : '1px solid var(--adm-border-1)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "grip-vertical",
    style: {
      width: 14,
      height: 14,
      color: 'var(--adm-fg-3)',
      cursor: 'grab'
    }
  }), /*#__PURE__*/React.createElement("i", {
    "data-lucide": m.collapsed ? 'chevron-right' : 'chevron-down',
    style: {
      width: 14,
      height: 14,
      color: 'var(--adm-fg-3)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "adm-num",
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--adm-fg-3)',
      minWidth: 18
    }
  }, String(m.num).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--adm-fg-1)',
      flex: 1
    }
  }, m.title), m.draft && /*#__PURE__*/React.createElement("span", {
    className: "adm-pill adm-pill--warn"
  }, "\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--adm-fg-3)'
    },
    className: "adm-num"
  }, m.lessons.length, " \u0443\u0440\u043E\u043A\u043E\u0432"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      padding: 5
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "more-horizontal",
    style: {
      width: 14,
      height: 14
    }
  }))), !m.collapsed && /*#__PURE__*/React.createElement("div", {
    className: "p-2"
  }, /*#__PURE__*/React.createElement("ul", null, m.lessons.map((l, li) => /*#__PURE__*/React.createElement("li", {
    key: li,
    className: "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[var(--adm-bg-muted)] transition"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "grip-vertical",
    style: {
      width: 12,
      height: 12,
      color: 'var(--adm-fg-3)',
      cursor: 'grab'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "rounded-md flex items-center justify-center",
    style: {
      width: 26,
      height: 26,
      background: 'var(--adm-bg-muted)',
      color: typeColor[l.type]
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": typeIcon[l.type],
    style: {
      width: 13,
      height: 13
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--adm-fg-1)'
    },
    className: "truncate"
  }, l.title), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2",
    style: {
      fontSize: 10.5,
      color: 'var(--adm-fg-3)',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("span", null, typeLabel[l.type]), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "adm-num"
  }, l.dur))), !l.pub && /*#__PURE__*/React.createElement("span", {
    className: "adm-pill adm-pill--warn"
  }, "\u041D\u0435 \u043E\u043F\u0443\u0431\u043B."), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: 4,
      color: 'var(--adm-fg-3)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "pencil",
    style: {
      width: 13,
      height: 13
    }
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: 4,
      color: 'var(--adm-fg-3)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "more-horizontal",
    style: {
      width: 13,
      height: 13
    }
  }))))), /*#__PURE__*/React.createElement("button", {
    className: "w-full flex items-center justify-center gap-1.5 mt-1 py-2 rounded-md transition",
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--adm-primary)',
      background: 'transparent',
      border: '1px dashed var(--adm-border-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 13,
      height: 13
    }
  }), " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0440\u043E\u043A")))), /*#__PURE__*/React.createElement("button", {
    className: "w-full flex items-center justify-center gap-1.5 py-3 rounded-lg transition",
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--adm-primary)',
      background: '#fff',
      border: '1px dashed var(--adm-border-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u043E\u0434\u0443\u043B\u044C")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u041E\u0431\u043B\u043E\u0436\u043A\u0430"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 aspect-[4/3] rounded-md flex items-center justify-center",
    style: {
      background: 'var(--adm-bg-muted)',
      border: '1px dashed var(--adm-border-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center",
    style: {
      color: 'var(--adm-fg-3)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "image",
    style: {
      width: 28,
      height: 28
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 6
    }
  }, "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435")))), /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-4 space-y-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B"), /*#__PURE__*/React.createElement(Field, {
    label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
    value: "Compliance"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u0423\u0440\u043E\u0432\u0435\u043D\u044C",
    value: "\u0411\u0430\u0437\u043E\u0432\u044B\u0439"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
    value: "~3 \u0447"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u0414\u0435\u0434\u043B\u0430\u0439\u043D",
    value: "12 \u043C\u0430\u0440\u0442\u0430 2026",
    emphasis: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u041D\u0430\u0433\u0440\u0430\u0434\u0430",
    value: "+250 \u0431\u0430\u043B\u043B\u043E\u0432"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442",
    value: "\u0414\u0430 \xB7 12 \u043C\u0435\u0441."
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u0410\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F"), /*#__PURE__*/React.createElement("button", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--adm-primary)'
    }
  }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--adm-fg-2)',
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 mb-1.5"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "users",
    style: {
      width: 12,
      height: 12
    }
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    className: "adm-num"
  }, "312"), " \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--adm-fg-3)'
    }
  }, "\u0412\u0441\u0435 \u043E\u0442\u0434\u0435\u043B\u044B \xB7 \u0432\u0441\u0435 \u043B\u043E\u043A\u0430\u0446\u0438\u0438 \xB7 \u043A\u0440\u043E\u043C\u0435 \xAB\u041D\u0430 \u0438\u0441\u043F\u044B\u0442\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u043C\xBB (24)"))), /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u0427\u0435\u043A-\u043B\u0438\u0441\u0442 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438"), /*#__PURE__*/React.createElement("ul", {
    className: "mt-3 space-y-1.5"
  }, [['Заполнено описание', true], ['Загружена обложка', false], ['Все уроки опубликованы', false], ['Финальный тест добавлен', true], ['Аудитория настроена', true]].map(([t, ok], i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex items-center gap-2",
    style: {
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": ok ? 'check-circle-2' : 'circle',
    style: {
      width: 14,
      height: 14,
      color: ok ? 'var(--adm-success)' : 'var(--adm-fg-3)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ok ? 'var(--adm-fg-2)' : 'var(--adm-fg-1)',
      textDecoration: ok ? 'line-through' : 'none'
    }
  }, t))))))));
}
function Field({
  label,
  value,
  emphasis
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--adm-fg-3)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      fontWeight: 600,
      color: emphasis ? 'var(--adm-accent)' : 'var(--adm-fg-1)'
    },
    className: "adm-num"
  }, value));
}
window.CourseEditor = CourseEditor;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/CourseEditor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Dashboard.jsx
try { (() => {
// Admin Dashboard

function KPICard({
  label,
  value,
  delta,
  deltaPositive,
  icon,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, label), /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 16,
      height: 16,
      color: 'var(--adm-fg-3)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-num",
    style: {
      fontSize: 28,
      fontWeight: 700,
      color: 'var(--adm-fg-1)',
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-2"
  }, delta && /*#__PURE__*/React.createElement("span", {
    className: "adm-num flex items-center gap-0.5",
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: deltaPositive ? 'var(--adm-success)' : 'var(--adm-danger)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": deltaPositive ? 'trending-up' : 'trending-down',
    style: {
      width: 12,
      height: 12
    }
  }), delta), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--adm-fg-3)'
    }
  }, sub)));
}
function MiniSparkline({
  data,
  color
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 220,
    h = 48;
  const pts = data.map((v, i) => {
    const x = i / (data.length - 1) * w;
    const y = h - (v - min) / (max - min || 1) * h;
    return [x, y];
  });
  const d = pts.map((p, i) => i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`).join(' ');
  const area = `${d} L${w},${h} L0,${h} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: h,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `grad-${color.replace('#', '')}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.2"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#grad-${color.replace('#', '')})`
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: color,
    strokeWidth: "1.5"
  }));
}
function AdminDashboard() {
  const activity = [12, 18, 15, 22, 28, 34, 30, 38, 42, 47, 44, 52, 58, 54];
  const completion = [62, 64, 63, 65, 68, 70, 72, 71, 74, 76, 75, 78, 80, 82];
  const deadlines = [{
    course: 'Безопасность на рабочем месте',
    users: 312,
    completed: 187,
    deadline: '12 марта',
    urgency: 'high'
  }, {
    course: 'Кибергигиена 2026',
    users: 280,
    completed: 220,
    deadline: '20 марта',
    urgency: 'med'
  }, {
    course: 'Антикоррупционная политика',
    users: 312,
    completed: 295,
    deadline: '25 марта',
    urgency: 'low'
  }, {
    course: 'GDPR & защита данных',
    users: 145,
    completed: 88,
    deadline: '02 апреля',
    urgency: 'med'
  }];
  const recent = [{
    who: 'Aziz Karimov',
    act: 'завершил курс',
    what: 'Power BI: продвинутый',
    when: '12 мин назад'
  }, {
    who: 'Madina Saidova',
    act: 'опубликовала курс',
    what: 'Лидерство в команде',
    when: '1 ч назад'
  }, {
    who: 'Bekhzod Khasanov',
    act: 'провалил тест',
    what: 'Кибергигиена · попытка 2',
    when: '2 ч назад',
    danger: true
  }, {
    who: 'Nilufar Rahimova',
    act: 'добавлена в группу',
    what: 'Senior Analytics',
    when: '3 ч назад'
  }, {
    who: 'Rustam Khalilov',
    act: 'обновил материал',
    what: 'Безопасность · Модуль 4',
    when: '5 ч назад'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement(KPICard, {
    label: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432",
    value: "312",
    delta: "+8",
    deltaPositive: true,
    sub: "\u0437\u0430 30 \u0434\u043D\u0435\u0439",
    icon: "users"
  }), /*#__PURE__*/React.createElement(KPICard, {
    label: "\u041A\u0443\u0440\u0441\u043E\u0432 \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043E",
    value: "47",
    delta: "+3",
    deltaPositive: true,
    sub: "\u0432 \u044D\u0442\u043E\u043C \u043A\u0432\u0430\u0440\u0442\u0430\u043B\u0435",
    icon: "book-open"
  }), /*#__PURE__*/React.createElement(KPICard, {
    label: "\u0421\u0440\u0435\u0434\u043D\u044F\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u043C\u043E\u0441\u0442\u044C",
    value: "78%",
    delta: "+4%",
    deltaPositive: true,
    sub: "\u043A \u043F\u0440\u043E\u0448\u043B\u043E\u043C\u0443 \u043C\u0435\u0441.",
    icon: "check-circle-2"
  }), /*#__PURE__*/React.createElement(KPICard, {
    label: "\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043A \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0430",
    value: "12",
    delta: "-3",
    deltaPositive: true,
    sub: "\u043A \u043F\u0440\u043E\u0448\u043B\u043E\u0439 \u043D\u0435\u0434\u0435\u043B\u0435",
    icon: "alarm-clock"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-5 col-span-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C \u0437\u0430 14 \u0434\u043D\u0435\u0439"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--adm-fg-1)',
      marginTop: 2
    }
  }, "\u0417\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u044B\u0435 \u0443\u0440\u043E\u043A\u0438 \u0432 \u0434\u0435\u043D\u044C")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, ['7д', '14д', '30д', '90д'].map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    className: "px-2.5 py-1 rounded-md",
    style: {
      fontSize: 11,
      fontWeight: 600,
      background: i === 1 ? 'var(--adm-bg-muted)' : 'transparent',
      color: i === 1 ? 'var(--adm-fg-1)' : 'var(--adm-fg-3)'
    }
  }, p)))), /*#__PURE__*/React.createElement(ChartBars, {
    data: activity
  })), /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u0422\u0440\u0435\u043D\u0434 \u0437\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u043C\u043E\u0441\u0442\u0438"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2 mt-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-num",
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--adm-fg-1)'
    }
  }, "82%"), /*#__PURE__*/React.createElement("span", {
    className: "adm-num flex items-center gap-0.5",
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--adm-success)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "trending-up",
    style: {
      width: 11,
      height: 11
    }
  }), " +6%"))), /*#__PURE__*/React.createElement(MiniSparkline, {
    data: completion,
    color: "#1E3A8A"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mt-3 pt-3",
    style: {
      borderTop: '1px solid var(--adm-border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--adm-fg-3)'
    }
  }, "\u0426\u0435\u043B\u044C \u043A\u0432\u0430\u0440\u0442\u0430\u043B\u0430"), /*#__PURE__*/React.createElement("span", {
    className: "adm-num",
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--adm-fg-1)'
    }
  }, "85%")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-card col-span-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4 flex items-center justify-between",
    style: {
      borderBottom: '1px solid var(--adm-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u0443\u0440\u0441\u044B"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--adm-fg-1)',
      marginTop: 2
    }
  }, "\u0414\u0435\u0434\u043B\u0430\u0439\u043D\u044B \u0438 \u043E\u0445\u0432\u0430\u0442")), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "external-link",
    style: {
      width: 13,
      height: 13
    }
  }), " \u0412\u0441\u0435 \u043A\u0443\u0440\u0441\u044B")), /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\u041A\u0443\u0440\u0441"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 140
    }
  }, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 100
    }
  }, "\u0414\u0435\u0434\u043B\u0430\u0439\u043D"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 80
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, deadlines.map((d, i) => {
    const pct = Math.round(d.completed / d.users * 100);
    const u = d.urgency;
    return /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, d.course), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--adm-fg-3)',
        marginTop: 2
      },
      className: "adm-num"
    }, d.completed, " / ", d.users, " \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 h-1.5 rounded-full",
      style: {
        background: 'var(--adm-bg-muted)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full rounded-full",
      style: {
        width: `${pct}%`,
        background: u === 'high' ? 'var(--adm-danger)' : u === 'med' ? 'var(--adm-accent)' : 'var(--adm-success)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      className: "adm-num",
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--adm-fg-2)',
        minWidth: 28
      }
    }, pct, "%"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: 'adm-pill adm-pill--dot ' + (u === 'high' ? 'adm-pill--danger' : u === 'med' ? 'adm-pill--warn' : 'adm-pill--success')
    }, d.deadline)), /*#__PURE__*/React.createElement("td", {
      className: "text-right"
    }, /*#__PURE__*/React.createElement("button", {
      className: "adm-btn adm-btn--ghost",
      style: {
        padding: '4px 10px',
        fontSize: 12
      }
    }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C")));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "adm-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-4",
    style: {
      borderBottom: '1px solid var(--adm-border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "adm-eyebrow"
  }, "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--adm-fg-1)',
      marginTop: 2
    }
  }, "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F")), /*#__PURE__*/React.createElement("ul", {
    className: "px-5 py-2"
  }, recent.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "flex items-start gap-3 py-3",
    style: {
      borderBottom: i < recent.length - 1 ? '1px solid var(--adm-border-1)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-avatar",
    style: {
      width: 26,
      height: 26,
      fontSize: 10
    }
  }, r.who.split(' ').map(s => s[0]).join('')), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--adm-fg-1)',
      lineHeight: 1.4
    }
  }, /*#__PURE__*/React.createElement("b", null, r.who), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: r.danger ? 'var(--adm-danger)' : 'var(--adm-fg-2)'
    }
  }, r.act), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--adm-fg-2)'
    }
  }, "\xAB", r.what, "\xBB")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10.5,
      color: 'var(--adm-fg-3)',
      marginTop: 2
    }
  }, r.when))))))));
}
function ChartBars({
  data
}) {
  const max = Math.max(...data);
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-end gap-1.5",
    style: {
      height: 140
    }
  }, data.map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex-1 flex flex-col items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full rounded-sm transition",
    style: {
      height: `${v / max * 100}%`,
      background: i === data.length - 1 ? 'var(--adm-primary)' : 'var(--adm-primary-100)',
      minHeight: 4
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      color: 'var(--adm-fg-3)'
    }
  }, i + 1))));
}
window.AdminDashboard = AdminDashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Users.jsx
try { (() => {
// Users management screen — dense employee table

function AdminUsers() {
  const users = [{
    id: 1,
    name: 'Aziz Karimov',
    email: 'a.karimov@farovon.tj',
    dept: 'Операции',
    role: 'Junior Analyst',
    courses: {
      done: 4,
      total: 7
    },
    points: 1250,
    status: 'active',
    last: '5 мин назад'
  }, {
    id: 2,
    name: 'Madina Saidova',
    email: 'm.saidova@farovon.tj',
    dept: 'HR',
    role: 'HR Lead',
    courses: {
      done: 12,
      total: 12
    },
    points: 4820,
    status: 'admin',
    last: '20 мин назад'
  }, {
    id: 3,
    name: 'Bekhzod Khasanov',
    email: 'b.khasanov@farovon.tj',
    dept: 'IT',
    role: 'Senior Engineer',
    courses: {
      done: 6,
      total: 9
    },
    points: 2140,
    status: 'overdue',
    last: '1 ч назад'
  }, {
    id: 4,
    name: 'Nilufar Rahimova',
    email: 'n.rahimova@farovon.tj',
    dept: 'Финансы',
    role: 'Accountant',
    courses: {
      done: 8,
      total: 8
    },
    points: 3260,
    status: 'active',
    last: '2 ч назад'
  }, {
    id: 5,
    name: 'Rustam Khalilov',
    email: 'r.khalilov@farovon.tj',
    dept: 'Безопасность',
    role: 'Head of Security',
    courses: {
      done: 15,
      total: 15
    },
    points: 5680,
    status: 'admin',
    last: 'вчера'
  }, {
    id: 6,
    name: 'Sardor Rashidov',
    email: 's.rashidov@farovon.tj',
    dept: 'Операции',
    role: 'Operations Manager',
    courses: {
      done: 10,
      total: 11
    },
    points: 3120,
    status: 'active',
    last: 'вчера'
  }, {
    id: 7,
    name: 'Olimjon Bakhriev',
    email: 'o.bakhriev@farovon.tj',
    dept: 'Маркетинг',
    role: 'Marketing Manager',
    courses: {
      done: 5,
      total: 8
    },
    points: 1840,
    status: 'on-leave',
    last: '3 дня назад'
  }, {
    id: 8,
    name: 'Zarina Yuldasheva',
    email: 'z.yuldasheva@farovon.tj',
    dept: 'HR',
    role: 'Recruiter',
    courses: {
      done: 7,
      total: 7
    },
    points: 2480,
    status: 'active',
    last: '4 ч назад'
  }, {
    id: 9,
    name: 'Farrukh Ismoilov',
    email: 'f.ismoilov@farovon.tj',
    dept: 'IT',
    role: 'DevOps',
    courses: {
      done: 3,
      total: 9
    },
    points: 920,
    status: 'overdue',
    last: '6 ч назад'
  }, {
    id: 10,
    name: 'Dilshod Murodov',
    email: 'd.murodov@farovon.tj',
    dept: 'Финансы',
    role: 'Finance Analyst',
    courses: {
      done: 6,
      total: 8
    },
    points: 2050,
    status: 'active',
    last: '30 мин назад'
  }];
  const statusMap = {
    active: {
      label: 'Активен',
      cls: 'adm-pill adm-pill--success adm-pill--dot'
    },
    admin: {
      label: 'Админ',
      cls: 'adm-pill adm-pill--info adm-pill--dot'
    },
    overdue: {
      label: 'Просрочка',
      cls: 'adm-pill adm-pill--danger adm-pill--dot'
    },
    'on-leave': {
      label: 'В отпуске',
      cls: 'adm-pill adm-pill--neutral adm-pill--dot'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "adm-card p-4 flex items-center gap-3 flex-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative",
    style: {
      flex: '1 1 280px',
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    style: {
      width: 14,
      height: 14,
      color: 'var(--adm-fg-3)',
      position: 'absolute',
      left: 10,
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    className: "adm-input",
    style: {
      paddingLeft: 32
    },
    placeholder: "\u0418\u043C\u044F, email, \u043E\u0442\u0434\u0435\u043B\u2026"
  })), /*#__PURE__*/React.createElement(FilterPill, {
    label: "\u041E\u0442\u0434\u0435\u043B",
    value: "\u0412\u0441\u0435 \u043E\u0442\u0434\u0435\u043B\u044B"
  }), /*#__PURE__*/React.createElement(FilterPill, {
    label: "\u0420\u043E\u043B\u044C",
    value: "\u0412\u0441\u0435 \u0440\u043E\u043B\u0438"
  }), /*#__PURE__*/React.createElement(FilterPill, {
    label: "\u0421\u0442\u0430\u0442\u0443\u0441",
    value: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435"
  }), /*#__PURE__*/React.createElement(FilterPill, {
    label: "\u0413\u0440\u0443\u043F\u043F\u0430",
    value: "\u2014"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "download",
    style: {
      width: 13,
      height: 13
    }
  }), " \u042D\u043A\u0441\u043F\u043E\u0440\u0442"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "upload",
    style: {
      width: 13,
      height: 13
    }
  }), " \u0418\u043C\u043F\u043E\u0440\u0442 CSV"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--primary"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 13,
      height: 13
    }
  }), " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C")), /*#__PURE__*/React.createElement("div", {
    className: "adm-card flex items-center justify-between px-4 py-2.5",
    style: {
      background: 'var(--adm-primary-50)',
      borderColor: 'var(--adm-primary-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3",
    style: {
      fontSize: 12.5,
      color: 'var(--adm-primary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-square",
    style: {
      width: 14,
      height: 14
    }
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    className: "adm-num"
  }, "3"), " \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043E")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      fontSize: 12
    }
  }, "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043A\u0443\u0440\u0441"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      fontSize: 12
    }
  }, "\u0412 \u0433\u0440\u0443\u043F\u043F\u0443\u2026"), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      fontSize: 12
    }
  }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 18,
      background: 'var(--adm-border-2)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--danger-ghost",
    style: {
      fontSize: 12
    }
  }, "\u0414\u0435\u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C"))), /*#__PURE__*/React.createElement("div", {
    className: "adm-card overflow-hidden"
  }, /*#__PURE__*/React.createElement("table", {
    className: "adm-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 36
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  })), /*#__PURE__*/React.createElement("th", null, "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 130
    }
  }, "\u041E\u0442\u0434\u0435\u043B"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 180
    }
  }, "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 160
    }
  }, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 90
    },
    className: "text-right"
  }, "\u0411\u0430\u043B\u043B\u044B"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 110
    }
  }, "\u0421\u0442\u0430\u0442\u0443\u0441"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 110
    }
  }, "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 36
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, users.map((u, i) => {
    const pct = Math.round(u.courses.done / u.courses.total * 100);
    const checked = i < 3;
    const statusInfo = statusMap[u.status];
    return /*#__PURE__*/React.createElement("tr", {
      key: u.id,
      style: {
        background: checked ? 'var(--adm-primary-50)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      defaultChecked: checked
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2.5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "adm-avatar"
    }, u.name.split(' ').map(s => s[0]).join('')), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      },
      className: "truncate"
    }, u.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--adm-fg-3)'
      },
      className: "truncate"
    }, u.email)))), /*#__PURE__*/React.createElement("td", null, u.dept), /*#__PURE__*/React.createElement("td", null, u.role), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 h-1.5 rounded-full",
      style: {
        background: 'var(--adm-bg-muted)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "h-full rounded-full",
      style: {
        width: `${pct}%`,
        background: pct === 100 ? 'var(--adm-success)' : pct < 50 ? 'var(--adm-danger)' : 'var(--adm-primary)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      className: "adm-num",
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--adm-fg-2)',
        minWidth: 36
      }
    }, u.courses.done, "/", u.courses.total))), /*#__PURE__*/React.createElement("td", {
      className: "text-right adm-num",
      style: {
        fontWeight: 600
      }
    }, u.points.toLocaleString()), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: statusInfo.cls
    }, statusInfo.label)), /*#__PURE__*/React.createElement("td", {
      style: {
        fontSize: 11,
        color: 'var(--adm-fg-3)'
      }
    }, u.last), /*#__PURE__*/React.createElement("td", {
      className: "text-right"
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        padding: 4,
        color: 'var(--adm-fg-3)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "more-horizontal",
      style: {
        width: 15,
        height: 15
      }
    }))));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 flex items-center justify-between",
    style: {
      borderTop: '1px solid var(--adm-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--adm-fg-3)'
    },
    className: "adm-num"
  }, "\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u043E ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--adm-fg-1)'
    }
  }, "1\u201310"), " \u0438\u0437 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--adm-fg-1)'
    }
  }, "312")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1"
  }, ['‹', '1', '2', '3', '…', '32', '›'].map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "adm-num",
    style: {
      minWidth: 28,
      height: 28,
      padding: '0 8px',
      fontSize: 12,
      fontWeight: 600,
      background: p === '1' ? 'var(--adm-primary)' : 'transparent',
      color: p === '1' ? '#fff' : 'var(--adm-fg-2)',
      borderRadius: 6,
      border: p === '1' ? 'none' : '1px solid var(--adm-border-2)'
    }
  }, p))))));
}
function FilterPill({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "adm-btn adm-btn--ghost",
    style: {
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--adm-fg-3)'
    }
  }, label, ":"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--adm-fg-1)'
    }
  }, value), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      width: 12,
      height: 12,
      color: 'var(--adm-fg-3)'
    }
  }));
}
window.AdminUsers = AdminUsers;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Users.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app/CourseDetail.jsx
try { (() => {
// Course Detail (Equeo-style: hero + module list + sidebar info)
function CourseDetailV2({
  onBack
}) {
  const modules = [{
    num: 1,
    title: 'Введение и контекст',
    dur: '12 мин',
    state: 'done',
    type: 'video'
  }, {
    num: 2,
    title: 'Типы инцидентов на рабочем месте',
    dur: '18 мин',
    state: 'done',
    type: 'video'
  }, {
    num: 3,
    title: 'Практика: чек-лист безопасности',
    dur: '15 мин',
    state: 'done',
    type: 'practice'
  }, {
    num: 4,
    title: 'Реагирование на инциденты',
    dur: '22 мин',
    state: 'current',
    type: 'video'
  }, {
    num: 5,
    title: 'Промежуточный тест',
    dur: '10 мин',
    state: 'next',
    type: 'test'
  }, {
    num: 6,
    title: 'Кейсы из практики',
    dur: '20 мин',
    state: 'locked',
    type: 'video'
  }, {
    num: 7,
    title: 'Финальная аттестация',
    dur: '25 мин',
    state: 'locked',
    type: 'test'
  }];
  const typeIcons = {
    video: 'play-circle',
    practice: 'clipboard-check',
    test: 'file-question'
  };
  const stateColors = {
    done: {
      bg: 'var(--v2-success)',
      text: '#fff',
      ring: 'var(--v2-success-50)'
    },
    current: {
      bg: 'var(--v2-accent-orange)',
      text: '#fff',
      ring: 'var(--v2-tint-orange)'
    },
    next: {
      bg: '#fff',
      text: 'var(--v2-fg-2)',
      ring: 'var(--v2-border-1)'
    },
    locked: {
      bg: 'var(--v2-bg-muted)',
      text: 'var(--v2-fg-3)',
      ring: 'var(--v2-border-1)'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "flex items-center gap-1.5 text-sm font-semibold transition",
    style: {
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0412\u0441\u0435 \u043A\u0443\u0440\u0441\u044B"), /*#__PURE__*/React.createElement(WidgetCard, {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-[1.5fr_1fr]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
    style: {
      background: 'var(--v2-tint-orange)',
      color: 'var(--v2-accent-orange)'
    }
  }, "\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
    style: {
      background: 'var(--v2-tint-blue)',
      color: 'var(--v2-primary)'
    }
  }, "Compliance")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      letterSpacing: '-0.01em',
      lineHeight: 1.15
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3",
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      lineHeight: 1.6,
      maxWidth: 520
    }
  }, "\u0415\u0436\u0435\u0433\u043E\u0434\u043D\u043E\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u043E\u0445\u0440\u0430\u043D\u0435 \u0442\u0440\u0443\u0434\u0430. \u0423\u0447\u0438\u043C \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0432\u0430\u0442\u044C \u0438\u043D\u0446\u0438\u0434\u0435\u043D\u0442\u044B, \u0433\u0440\u0430\u043C\u043E\u0442\u043D\u043E \u0440\u0435\u0430\u0433\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438 \u043E\u0444\u043E\u0440\u043C\u043B\u044F\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B."), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 flex items-center gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--v2-fg-3)'
    }
  }, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-40 h-2 rounded-full",
    style: {
      background: 'var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full",
    style: {
      width: '43%',
      background: 'linear-gradient(90deg, var(--v2-success), var(--v2-accent-orange))'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "v2-num",
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: 'var(--v2-accent-orange)'
    }
  }, "3/7"))), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-10",
    style: {
      background: 'var(--v2-border-1)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--v2-fg-3)'
    }
  }, "\u0414\u0435\u0434\u043B\u0430\u0439\u043D"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 mt-1",
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--v2-danger)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "alarm-clock",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0447\u0435\u0440\u0435\u0437 12 \u0434\u043D\u0435\u0439"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2",
    style: {
      background: 'var(--v2-primary)',
      color: '#fff'
    }
  }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441 \u043C\u043E\u0434\u0443\u043B\u044F 4 ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "play",
    style: {
      width: 14,
      height: 14
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2",
    style: {
      background: 'var(--v2-bg-muted)',
      color: 'var(--v2-fg-1)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bookmark",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0412 \u0437\u0430\u043A\u043B\u0430\u0434\u043A\u0438"))), /*#__PURE__*/React.createElement("div", {
    className: "relative v2-cover v2-cover--paper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex flex-col items-start justify-end p-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-fg-3)'
    }
  }, "Compliance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--v2-fg-1)',
      lineHeight: 1.1,
      marginTop: 6,
      letterSpacing: '-0.01em'
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C", /*#__PURE__*/React.createElement("br", null), "\u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435"))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-span-2 space-y-5"
  }, /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-5"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)'
    }
  }, "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u043A\u0443\u0440\u0441\u0430"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--v2-fg-3)'
    }
  }, "7 \u043C\u043E\u0434\u0443\u043B\u0435\u0439 \xB7 ~2 \u0447 02 \u043C\u0438\u043D")), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2"
  }, modules.map(m => {
    const c = stateColors[m.state];
    const clickable = m.state !== 'locked';
    return /*#__PURE__*/React.createElement("li", {
      key: m.num,
      className: "flex items-center gap-4 p-3 rounded-xl transition",
      style: {
        background: m.state === 'current' ? 'var(--v2-tint-orange)' : 'transparent',
        border: '1px solid ' + (m.state === 'current' ? '#FFD9A8' : 'var(--v2-border-1)'),
        cursor: clickable ? 'pointer' : 'default',
        opacity: m.state === 'locked' ? 0.55 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-full flex items-center justify-center font-bold",
      style: {
        width: 36,
        height: 36,
        background: c.bg,
        color: c.text,
        border: `3px solid ${c.ring}`,
        fontSize: 13,
        flexShrink: 0
      }
    }, m.state === 'done' ? /*#__PURE__*/React.createElement("i", {
      "data-lucide": "check",
      style: {
        width: 14,
        height: 14
      }
    }) : m.state === 'locked' ? /*#__PURE__*/React.createElement("i", {
      "data-lucide": "lock",
      style: {
        width: 12,
        height: 12
      }
    }) : m.num), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": typeIcons[m.type],
      style: {
        width: 12,
        height: 12,
        color: 'var(--v2-fg-3)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--v2-fg-3)'
      }
    }, m.type === 'video' ? 'Видео-модуль' : m.type === 'practice' ? 'Практика' : 'Тестирование')), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--v2-fg-1)',
        marginTop: 2
      }
    }, m.title)), /*#__PURE__*/React.createElement("div", {
      className: "text-right shrink-0"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--v2-fg-3)'
      }
    }, m.dur), m.state === 'current' && /*#__PURE__*/React.createElement("button", {
      className: "mt-1 px-3 py-1 rounded-lg text-xs font-bold",
      style: {
        background: 'var(--v2-accent-orange)',
        color: '#fff'
      }
    }, "\u041D\u0430\u0447\u0430\u0442\u044C")));
  }))), /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)'
    }
  }, "\u041E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430"), /*#__PURE__*/React.createElement("button", {
    className: "text-xs font-semibold flex items-center gap-1",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0444\u043E\u0440\u0443\u043C ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-up-right",
    style: {
      width: 12,
      height: 12
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, [{
    name: 'Madina S.',
    when: '2 ч',
    text: 'Кто-нибудь сдавал тест с первого раза? Поделитесь, на что обратить внимание.'
  }, {
    name: 'Bekhzod K.',
    when: '5 ч',
    text: 'Чек-лист в модуле 3 очень полезен — распечатал на стену.'
  }].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0",
    style: {
      background: 'linear-gradient(135deg, #DCE4FF, #EFEAFF)',
      color: 'var(--v2-primary)',
      fontSize: 13
    }
  }, c.name[0]), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 p-3 rounded-xl",
    style: {
      background: 'var(--v2-bg-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, "\xB7 ", c.when, " \u043D\u0430\u0437\u0430\u0434")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--v2-fg-2)'
    }
  }, c.text))))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041E \u043A\u0443\u0440\u0441\u0435"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-3"
  }, [{
    icon: 'clock',
    label: 'Длительность',
    val: '~2 часа'
  }, {
    icon: 'layers',
    label: 'Модулей',
    val: '7'
  }, {
    icon: 'sparkles',
    label: 'Награда',
    val: '+250 баллов'
  }, {
    icon: 'award',
    label: 'Сертификат',
    val: 'после теста'
  }, {
    icon: 'globe',
    label: 'Язык',
    val: 'Русский'
  }, {
    icon: 'calendar',
    label: 'Обновлён',
    val: 'март 2026'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex items-center gap-3 py-2",
    style: {
      borderTop: i ? '1px solid var(--v2-border-1)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": r.icon,
    style: {
      width: 14,
      height: 14,
      color: 'var(--v2-fg-3)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--v2-fg-2)',
      flex: 1
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    }
  }, r.val))))), /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-violet)'
    }
  }, "\u0410\u0432\u0442\u043E\u0440 \u043A\u0443\u0440\u0441\u0430"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full flex items-center justify-center font-bold",
    style: {
      background: 'linear-gradient(135deg, var(--v2-accent-violet), var(--v2-primary))',
      color: '#fff',
      fontSize: 16
    }
  }, "\u041E\u0421"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    }
  }, "\u041E\u0442\u0434\u0435\u043B \u0421\u041E\u0422"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--v2-fg-3)'
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0438 \u043E\u0445\u0440\u0430\u043D\u0430 \u0442\u0440\u0443\u0434\u0430"))), /*#__PURE__*/React.createElement("button", {
    className: "mt-4 w-full py-2 rounded-xl text-sm font-semibold transition",
    style: {
      background: 'var(--v2-tint-violet)',
      color: 'var(--v2-accent-violet)'
    }
  }, "\u0417\u0430\u0434\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441")), /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-5",
    style: {
      background: 'var(--v2-tint-warm)',
      border: '1px solid var(--v2-accent-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "trophy",
    style: {
      width: 22,
      height: 22,
      color: 'var(--v2-accent)',
      flexShrink: 0,
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    }
  }, "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u043A\u0443\u0440\u0441 \u2014 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#92400E',
      marginTop: 4
    }
  }, "\xAB\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A 2026\xBB + 250 \u0431\u0430\u043B\u043B\u043E\u0432 \u0432 \u043C\u0430\u0433\u0430\u0437\u0438\u043D \u043D\u0430\u0433\u0440\u0430\u0434.")))))));
}
window.CourseDetailV2 = CourseDetailV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app/CourseDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app/ScreensV2.jsx
try { (() => {
// v2 Screens
function HeroBanner({
  user
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-7 text-white relative overflow-hidden v2-hero-grad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 max-w-2xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'rgba(255,255,255,0.65)'
    }
  }, "\u0414\u043E\u0431\u0440\u043E\u0435 \u0443\u0442\u0440\u043E"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      marginTop: 4,
      letterSpacing: '-0.015em',
      lineHeight: 1.2
    }
  }, user.name.split(' ')[0], ", \u0443 \u0432\u0430\u0441 \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u0439 \u0442\u0435\u043C\u043F \u2014 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.78)',
      marginTop: 10,
      maxWidth: 520,
      lineHeight: 1.55
    }
  }, "\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0432 \u043F\u043B\u0430\u043D\u0435: 1 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043C\u043E\u0434\u0443\u043B\u044C \u0438 1 \u0440\u0435\u0432\u044C\u044E \u0441 \u043C\u0435\u043D\u0442\u043E\u0440\u043E\u043C."), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 flex items-center gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "flame",
    style: {
      width: 18,
      height: 18,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 20,
      fontWeight: 700
    }
  }, "14"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      fontWeight: 500
    }
  }, "\u0434\u043D\u0435\u0439 \u043F\u043E\u0434\u0440\u044F\u0434"))), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-9",
    style: {
      background: 'rgba(255,255,255,0.18)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "book-open",
    style: {
      width: 18,
      height: 18,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 20,
      fontWeight: 700
    }
  }, "3"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      fontWeight: 500
    }
  }, "\u043A\u0443\u0440\u0441\u0430 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435"))), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-9",
    style: {
      background: 'rgba(255,255,255,0.18)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "award",
    style: {
      width: 18,
      height: 18,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 20,
      fontWeight: 700
    }
  }, "1 250"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      fontWeight: 500
    }
  }, "\u0431\u0430\u043B\u043B\u043E\u0432"))))));
}
function DashboardV2({
  user,
  onNav,
  onOpenCourse
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement(HeroBanner, {
    user: user
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement(StatTile, {
    icon: "book-marked",
    label: "\u0412 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0438",
    value: "3",
    sub: "+1 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E",
    tint: "var(--v2-tint-blue)",
    color: "var(--v2-primary)"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "check-circle-2",
    label: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E",
    value: "12",
    sub: "83% \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C",
    tint: "var(--v2-tint-teal)",
    color: "var(--v2-accent-teal)"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "clock",
    label: "\u0427\u0430\u0441\u043E\u0432 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F",
    value: "47",
    sub: "+5 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E",
    tint: "var(--v2-tint-violet)",
    color: "var(--v2-accent-violet)"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "award",
    label: "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432",
    value: "6",
    sub: "2 \u0432 \u044D\u0442\u043E\u043C \u0433\u043E\u0434\u0443",
    tint: "var(--v2-tint-orange)",
    color: "var(--v2-accent-orange)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-span-2 space-y-5"
  }, /*#__PURE__*/React.createElement(ContinueLearning, {
    onContinue: onOpenCourse || (() => onNav('courses')),
    onOpen: onOpenCourse
  }), /*#__PURE__*/React.createElement(LearningPath, null), /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-orange)'
    }
  }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 2
    }
  }, "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u043E\u0432\u0430\u043D\u043E \u0432\u0430\u043C")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-xs font-semibold",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u0412\u0435\u0441\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement(CourseCardV2, {
    course: {
      title: 'Основы Power BI',
      desc: 'Дашборды и визуализация для аналитиков и менеджеров.',
      category: 'Аналитика',
      duration: '4 ч',
      points: 350,
      theme: 'excel',
      new: true
    },
    onOpen: onOpenCourse
  }), /*#__PURE__*/React.createElement(CourseCardV2, {
    course: {
      title: 'Кибергигиена 2026',
      desc: 'Фишинг, пароли, инциденты — обновлённая программа.',
      category: 'Безопасность',
      duration: '1.5 ч',
      points: 200,
      theme: 'cyber'
    },
    onOpen: onOpenCourse
  }), /*#__PURE__*/React.createElement(CourseCardV2, {
    course: {
      title: 'Лидерство в команде',
      desc: 'Для тимлидов: коммуникация, обратная связь, делегирование.',
      category: 'Soft skills',
      duration: '6 ч',
      points: 480,
      theme: 'leadership'
    },
    onOpen: onOpenCourse
  })))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement(UpcomingEvents, null), /*#__PURE__*/React.createElement(Leaderboard, null), /*#__PURE__*/React.createElement(Achievements, null))));
}
function CoursesV2({
  onOpen
}) {
  const all = [{
    title: 'Безопасность на рабочем месте',
    desc: 'Ежегодное обязательное обучение по охране труда.',
    category: 'Compliance',
    duration: '3 ч',
    points: 250,
    theme: 'safety',
    required: true,
    progress: 60
  }, {
    title: 'Лидерство для новых тимлидов',
    desc: 'Коммуникация, обратная связь, делегирование.',
    category: 'Soft skills',
    duration: '6 ч',
    points: 480,
    theme: 'leadership',
    progress: 35
  }, {
    title: 'Онбординг новых сотрудников',
    desc: 'Программа для адаптации в первые 2 недели.',
    category: 'Adaptation',
    duration: '2 ч',
    points: 150,
    theme: 'onboarding',
    progress: 100
  }, {
    title: 'Excel для аналитиков',
    desc: 'PivotTables, Power Query, дашборды.',
    category: 'Hard skills',
    duration: '8 ч',
    points: 600,
    theme: 'excel'
  }, {
    title: 'Сервис, который запоминается',
    desc: 'Эмпатичная коммуникация со сложными клиентами.',
    category: 'Customer',
    duration: '4 ч',
    points: 350,
    theme: 'customer',
    new: true
  }, {
    title: 'Кибергигиена 2026',
    desc: 'Фишинг, пароли, инциденты — обновлено.',
    category: 'Безопасность',
    duration: '1.5 ч',
    points: 200,
    theme: 'cyber'
  }];
  const filters = ['Все курсы', 'Обязательные', 'В работе', 'Завершённые', 'Рекомендовано'];
  const [active, setActive] = React.useState('Все курсы');
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-end justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 4
    }
  }, "\u041A\u0443\u0440\u0441\u044B \u0438 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      marginTop: 4
    }
  }, all.length, " \u043A\u0443\u0440\u0441\u043E\u0432 \xB7 3 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435 \xB7 1 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5",
    style: {
      background: '#fff',
      border: '1px solid var(--v2-border-1)',
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sliders-horizontal",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0424\u0438\u043B\u044C\u0442\u0440\u044B"), /*#__PURE__*/React.createElement("button", {
    className: "px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5",
    style: {
      background: 'var(--v2-primary)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u0443\u0440\u0441"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, filters.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setActive(f),
    className: "px-3.5 py-1.5 rounded-full text-xs font-semibold transition",
    style: {
      background: active === f ? 'var(--v2-fg-1)' : '#fff',
      color: active === f ? '#fff' : 'var(--v2-fg-2)',
      border: '1px solid ' + (active === f ? 'var(--v2-fg-1)' : 'var(--v2-border-1)')
    }
  }, f))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-5"
  }, all.map((c, i) => /*#__PURE__*/React.createElement(CourseCardV2, {
    key: i,
    course: c,
    onOpen: onOpen
  }))));
}
function ForumV2() {
  const threads = [{
    id: 4,
    title: 'Добро пожаловать в сообщество Farovon!',
    author: 'CEO',
    replies: 28,
    votes: 64,
    tag: 'Закреплено',
    tagColor: 'var(--v2-accent-amber)',
    when: '2 нед',
    avatar: '👤'
  }, {
    id: 1,
    title: 'Советы по экзамену Power BI?',
    author: 'Madina S.',
    replies: 12,
    votes: 8,
    tag: 'Помощь',
    tagColor: 'var(--v2-primary)',
    when: '2 ч',
    avatar: 'М'
  }, {
    id: 2,
    title: 'Как удерживать мотивацию в длинных модулях?',
    author: 'Bekhzod K.',
    replies: 7,
    votes: 14,
    tag: 'Дискуссия',
    tagColor: 'var(--v2-accent-violet)',
    when: '5 ч',
    avatar: 'Б'
  }, {
    id: 3,
    title: 'Прогресс не сохраняется на iOS Safari',
    author: 'Nigora R.',
    replies: 3,
    votes: 2,
    tag: 'Баг',
    tagColor: 'var(--v2-danger)',
    when: '1 д',
    avatar: 'Н'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-end justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-pink)'
    }
  }, "\u0421\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 4
    }
  }, "\u041E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u044F \u0438 Q&A"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      marginTop: 4
    }
  }, "\u0421\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0439\u0442\u0435, \u043E\u0442\u0432\u0435\u0447\u0430\u0439\u0442\u0435 \u2014 \u0437\u0430 \u043F\u043E\u043B\u0435\u0437\u043D\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u043D\u0430\u0447\u0438\u0441\u043B\u044F\u044E\u0442\u0441\u044F \u0431\u0430\u043B\u043B\u044B.")), /*#__PURE__*/React.createElement("button", {
    className: "px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5",
    style: {
      background: 'var(--v2-primary)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 14,
      height: 14
    }
  }), " \u041D\u043E\u0432\u0430\u044F \u0442\u0435\u043C\u0430")), /*#__PURE__*/React.createElement(WidgetCard, null, /*#__PURE__*/React.createElement("ul", {
    className: "divide-y",
    style: {
      borderColor: 'var(--v2-border-1)'
    }
  }, threads.map(t => /*#__PURE__*/React.createElement("li", {
    key: t.id,
    className: "p-5 flex items-center gap-4 hover:bg-[var(--v2-bg-muted)] cursor-pointer transition"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center w-12 shrink-0 rounded-xl py-2",
    style: {
      background: 'var(--v2-bg-muted)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-up",
    style: {
      width: 14,
      height: 14,
      color: 'var(--v2-fg-3)',
      margin: '0 auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: 'var(--v2-fg-1)'
    }
  }, t.votes), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      width: 14,
      height: 14,
      color: 'var(--v2-fg-3)',
      margin: '0 auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0",
    style: {
      background: 'linear-gradient(135deg, #DCE4FF, #EFEAFF)',
      color: 'var(--v2-primary)'
    }
  }, t.avatar), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
    style: {
      background: `color-mix(in srgb, ${t.tagColor} 12%, white)`,
      color: t.tagColor
    }
  }, t.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, "\xB7 ", t.when, " \u043D\u0430\u0437\u0430\u0434 \xB7 \u0430\u0432\u0442\u043E\u0440 ", t.author)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    },
    className: "truncate"
  }, t.title)), /*#__PURE__*/React.createElement("div", {
    className: "text-right shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5",
    style: {
      fontSize: 13,
      color: 'var(--v2-fg-2)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "message-circle",
    style: {
      width: 14,
      height: 14
    }
  }), " ", t.replies)))))));
}
function ShopV2() {
  const items = [{
    id: 1,
    name: 'Брендированная кружка Farovon',
    cost: 200,
    stock: 12,
    icon: 'coffee',
    cat: 'Мерч'
  }, {
    id: 2,
    name: 'Дополнительный выходной',
    cost: 2500,
    stock: 3,
    icon: 'palmtree',
    cat: 'Бенефит'
  }, {
    id: 3,
    name: 'Беспроводные наушники',
    cost: 1800,
    stock: 5,
    icon: 'headphones',
    cat: 'Техника'
  }, {
    id: 4,
    name: 'Обед с CEO',
    cost: 1500,
    stock: 1,
    icon: 'utensils',
    cat: 'Опыт'
  }, {
    id: 5,
    name: 'Набор: блокнот + ручка',
    cost: 350,
    stock: 24,
    icon: 'notebook-pen',
    cat: 'Мерч'
  }, {
    id: 6,
    name: 'Сертификат на онлайн-курс',
    cost: 1200,
    stock: 8,
    icon: 'graduation-cap',
    cat: 'Обучение'
  }];
  const balance = 1250;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-end justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-teal)'
    }
  }, "\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u043D\u0430\u0433\u0440\u0430\u0434"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 4
    }
  }, "\u041E\u0431\u043C\u0435\u043D\u044F\u0439\u0442\u0435 \u0431\u0430\u043B\u043B\u044B \u043D\u0430 \u043F\u0440\u0438\u0437\u044B"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      marginTop: 4
    }
  }, "\u0417\u0430\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0439\u0442\u0435 \u0431\u0430\u043B\u043B\u044B \u0437\u0430 \u043A\u0443\u0440\u0441\u044B, \u0442\u0435\u0441\u0442\u044B \u0438 \u043F\u043E\u043C\u043E\u0449\u044C \u043A\u043E\u043B\u043B\u0435\u0433\u0430\u043C.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 px-5 py-3 rounded-xl",
    style: {
      background: '#fff',
      border: '1px solid var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "award",
    style: {
      width: 22,
      height: 22,
      color: 'var(--v2-accent)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-fg-3)'
    }
  }, "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E"), /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: 'var(--v2-fg-1)',
      lineHeight: 1,
      letterSpacing: '-0.01em'
    }
  }, balance.toLocaleString(), " \u0431\u0430\u043B\u043B\u043E\u0432")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-5"
  }, items.map(i => {
    const can = balance >= i.cost;
    return /*#__PURE__*/React.createElement(WidgetCard, {
      key: i.id,
      className: "p-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aspect-[4/3] rounded-xl flex items-center justify-center mb-4",
      style: {
        background: 'var(--v2-bg-muted)',
        border: '1px solid var(--v2-border-1)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": i.icon,
      style: {
        width: 56,
        height: 56,
        color: 'var(--v2-fg-2)',
        strokeWidth: 1.25
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "v2-eyebrow",
      style: {
        color: 'var(--v2-fg-3)'
      }
    }, i.cat), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--v2-fg-3)'
      }
    }, "\xB7 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ", i.stock)), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--v2-fg-1)'
      }
    }, i.name), /*#__PURE__*/React.createElement("div", {
      className: "mt-4 flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "v2-num flex items-center gap-1.5",
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--v2-fg-1)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "award",
      style: {
        width: 14,
        height: 14,
        color: 'var(--v2-accent)'
      }
    }), i.cost.toLocaleString()), /*#__PURE__*/React.createElement("button", {
      disabled: !can,
      className: "px-4 py-1.5 rounded-lg text-xs font-semibold transition",
      style: {
        background: can ? 'var(--v2-primary)' : 'var(--v2-bg-muted)',
        color: can ? '#fff' : 'var(--v2-fg-3)',
        cursor: can ? 'pointer' : 'not-allowed'
      }
    }, can ? 'Обменять' : `Не хватает ${(i.cost - balance).toLocaleString()}`)));
  })));
}
function PathsV2() {
  const paths = [{
    title: 'Junior → Middle Analyst',
    steps: 5,
    done: 2,
    tint: 'var(--v2-tint-teal)',
    color: 'var(--v2-accent-teal)',
    icon: 'bar-chart-3'
  }, {
    title: 'Soft skills для тимлида',
    steps: 6,
    done: 3,
    tint: 'var(--v2-tint-violet)',
    color: 'var(--v2-accent-violet)',
    icon: 'users'
  }, {
    title: 'Введение в продуктовую аналитику',
    steps: 4,
    done: 0,
    tint: 'var(--v2-tint-orange)',
    color: 'var(--v2-accent-orange)',
    icon: 'target'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-teal)'
    }
  }, "\u041A\u0430\u0440\u044C\u0435\u0440\u043D\u044B\u0435 \u0442\u0440\u0430\u0435\u043A\u0442\u043E\u0440\u0438\u0438"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 4
    }
  }, "\u0412\u0430\u0448\u0438 \u043F\u0443\u0442\u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044F"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      marginTop: 4
    }
  }, "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B \u0440\u043E\u0441\u0442\u0430 \u2014 \u043A\u0443\u0440\u0441\u044B, \u0440\u0435\u0432\u044C\u044E, \u043F\u0440\u043E\u0435\u043A\u0442\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F.")), /*#__PURE__*/React.createElement(LearningPath, null), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-5"
  }, paths.map((p, i) => /*#__PURE__*/React.createElement(WidgetCard, {
    key: i,
    className: "p-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center justify-center rounded-2xl mb-4",
    style: {
      width: 48,
      height: 48,
      background: p.tint,
      color: p.color
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": p.icon,
    style: {
      width: 22,
      height: 22
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--v2-fg-2)',
      marginTop: 6
    }
  }, p.done, " \u0438\u0437 ", p.steps, " \u0448\u0430\u0433\u043E\u0432 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 h-1.5 rounded-full overflow-hidden",
    style: {
      background: 'var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full",
    style: {
      width: `${p.done / p.steps * 100}%`,
      background: p.color
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "mt-5 w-full py-2 rounded-xl text-sm font-semibold transition",
    style: {
      background: p.tint,
      color: p.color
    }
  }, p.done === 0 ? 'Начать траекторию' : 'Продолжить')))));
}
window.HeroBanner = HeroBanner;
window.DashboardV2 = DashboardV2;
window.CoursesV2 = CoursesV2;
window.ForumV2 = ForumV2;
window.ShopV2 = ShopV2;
window.PathsV2 = PathsV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app/ScreensV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app/SidebarV2.jsx
try { (() => {
// v2 Sidebar — colored icon tiles, like Equeo
function SidebarV2({
  active,
  onNav,
  points = 1250
}) {
  const links = [{
    id: 'dashboard',
    icon: 'layout-dashboard',
    label: 'Главная',
    tint: 'var(--v2-tint-blue)',
    color: 'var(--v2-primary)'
  }, {
    id: 'courses',
    icon: 'book-open',
    label: 'Курсы',
    tint: 'var(--v2-tint-orange)',
    color: 'var(--v2-accent-orange)'
  }, {
    id: 'paths',
    icon: 'route',
    label: 'Траектории',
    tint: 'var(--v2-tint-teal)',
    color: 'var(--v2-accent-teal)'
  }, {
    id: 'events',
    icon: 'calendar-days',
    label: 'Мероприятия',
    tint: 'var(--v2-tint-violet)',
    color: 'var(--v2-accent-violet)'
  }, {
    id: 'forum',
    icon: 'message-circle',
    label: 'Сообщество',
    tint: 'var(--v2-tint-pink)',
    color: 'var(--v2-accent-pink)'
  }, {
    id: 'rating',
    icon: 'trophy',
    label: 'Рейтинг',
    tint: 'var(--v2-tint-amber)',
    color: '#D97706'
  }, {
    id: 'shop',
    icon: 'gift',
    label: 'Магазин наград',
    tint: 'var(--v2-tint-teal)',
    color: 'var(--v2-accent-teal)'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "w-[260px] shrink-0 h-full flex flex-col",
    style: {
      background: '#fff',
      borderRight: '1px solid var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-[72px] flex items-center px-6 gap-3",
    style: {
      borderBottom: '1px solid var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/farovon-logo.png",
    alt: "",
    style: {
      width: 32,
      height: 32
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 16,
      letterSpacing: '-0.01em',
      color: 'var(--v2-fg-1)'
    }
  }, "FAROVON"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.15em',
      color: 'var(--v2-fg-3)'
    }
  }, "LEARNING HUB"))), /*#__PURE__*/React.createElement("nav", {
    className: "flex-1 overflow-y-auto py-3 px-3"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "space-y-1"
  }, links.map(l => {
    const isActive = active === l.id;
    return /*#__PURE__*/React.createElement("li", {
      key: l.id
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNav(l.id);
      },
      className: "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
      style: {
        background: isActive ? l.tint : 'transparent',
        color: isActive ? l.color : 'var(--v2-fg-2)',
        fontWeight: isActive ? 600 : 500,
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center justify-center rounded-lg shrink-0",
      style: {
        width: 32,
        height: 32,
        background: l.tint,
        color: l.color
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": l.icon,
      style: {
        width: 16,
        height: 16
      }
    })), l.label));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "m-3 p-4 rounded-2xl",
    style: {
      background: 'linear-gradient(135deg, #FFF4DC 0%, #FFE0C2 100%)',
      border: '1px solid #FFD9A8'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#92400E'
    }
  }, "\u0412\u0430\u0448 \u0431\u0430\u043B\u0430\u043D\u0441"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 14,
      height: 14,
      color: '#D97706'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: '#7C3A0E'
    },
    className: "v2-num"
  }, points.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: '#92400E'
    }
  }, "\u0431\u0430\u043B\u043B\u043E\u0432")), /*#__PURE__*/React.createElement("button", {
    className: "mt-3 w-full text-xs font-semibold py-1.5 rounded-lg transition",
    style: {
      background: '#fff',
      color: '#92400E',
      border: '1px solid #FFD9A8'
    },
    onClick: () => onNav('shop')
  }, "\u0412 \u043C\u0430\u0433\u0430\u0437\u0438\u043D \u2192")));
}
window.SidebarV2 = SidebarV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app/SidebarV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app/TopBarV2.jsx
try { (() => {
// v2 TopBar
function TopBarV2({
  user,
  onLogout
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "h-[72px] flex items-center justify-between px-8 sticky top-0 z-10",
    style: {
      background: '#fff',
      borderBottom: '1px solid var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 flex-1 max-w-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-y-0 left-0 flex items-center pl-4",
    style: {
      color: 'var(--v2-fg-3)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    style: {
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("input", {
    placeholder: "\u041D\u0430\u0439\u0442\u0438 \u043A\u0443\u0440\u0441, \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0438\u043B\u0438 \u0442\u0435\u043C\u0443\u2026",
    className: "pl-11 pr-4 py-2.5 text-sm w-full focus:outline-none transition",
    style: {
      background: 'var(--v2-bg-muted)',
      border: '1px solid transparent',
      borderRadius: 10,
      color: 'var(--v2-fg-1)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition",
    style: {
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "globe",
    style: {
      width: 14,
      height: 14
    }
  }), " RU"), /*#__PURE__*/React.createElement("button", {
    className: "relative w-10 h-10 rounded-lg flex items-center justify-center transition",
    style: {
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "calendar-check",
    style: {
      width: 18,
      height: 18
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "relative w-10 h-10 rounded-lg flex items-center justify-center transition",
    style: {
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bell",
    style: {
      width: 18,
      height: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute top-2 right-2 w-2 h-2 rounded-full",
    style: {
      background: 'var(--v2-danger)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-8 mx-2",
    style: {
      background: 'var(--v2-border-1)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-xl transition",
    style: {
      color: 'var(--v2-fg-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold",
    style: {
      background: 'linear-gradient(135deg, #2D4FBF, #7B5BFF)',
      color: '#fff'
    }
  }, (user?.name || 'AK').split(' ').map(s => s[0]).join('').slice(0, 2)), /*#__PURE__*/React.createElement("div", {
    className: "text-left leading-tight"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, user?.name || 'Aziz Karimov'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, "Junior Analyst \xB7 Tashkent")), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      width: 14,
      height: 14,
      color: 'var(--v2-fg-3)'
    }
  }))));
}
window.TopBarV2 = TopBarV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app/TopBarV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app/Widgets.jsx
try { (() => {
// v2 Widgets
function WidgetCard({
  children,
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `rounded-2xl ${className}`,
    style: {
      background: 'var(--v2-bg-surface)',
      border: '1px solid var(--v2-border-1)',
      boxShadow: 'var(--v2-shadow-card)',
      ...style
    }
  }, children);
}

// Continue learning — wide hero widget
function ContinueLearning({
  onContinue,
  onOpen
}) {
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-[1.4fr_1fr]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
    style: {
      background: 'var(--v2-tint-orange)',
      color: 'var(--v2-accent-orange)'
    }
  }, "\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      lineHeight: 1.15,
      color: 'var(--v2-fg-1)',
      letterSpacing: '-0.01em'
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2",
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      maxWidth: 460
    }
  }, "\u041C\u043E\u0434\u0443\u043B\u044C 4 \u0438\u0437 7 \xB7 \xAB\u0420\u0435\u0430\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0430 \u0438\u043D\u0446\u0438\u0434\u0435\u043D\u0442\u044B\xBB. \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ~18 \u043C\u0438\u043D\u0443\u0442 \u0434\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F."), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 h-2 rounded-full overflow-hidden",
    style: {
      background: 'var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full",
    style: {
      width: '60%',
      background: 'linear-gradient(90deg, var(--v2-primary), var(--v2-accent-violet))'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "v2-num text-sm font-bold",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "60%")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onContinue,
    className: "px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2",
    style: {
      background: 'var(--v2-primary)',
      color: '#fff'
    }
  }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right",
    style: {
      width: 14,
      height: 14
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 text-xs",
    style: {
      color: 'var(--v2-accent-orange)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "clock",
    style: {
      width: 12,
      height: 12
    }
  }), " \u0414\u0435\u0434\u043B\u0430\u0439\u043D: 12 \u043C\u0430\u0440\u0442\u0430"))), /*#__PURE__*/React.createElement("div", {
    className: "relative v2-cover v2-cover--paper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex flex-col items-start justify-end p-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-fg-3)'
    }
  }, "Compliance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--v2-fg-1)',
      lineHeight: 1.1,
      marginTop: 6,
      letterSpacing: '-0.01em'
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C", /*#__PURE__*/React.createElement("br", null), "\u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 px-3 py-1.5 rounded-md flex items-center gap-1.5",
    style: {
      background: '#fff',
      border: '1px solid var(--v2-border-1)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "award",
    style: {
      width: 13,
      height: 13,
      color: 'var(--v2-accent)'
    }
  }), " +250 \u0431\u0430\u043B\u043B\u043E\u0432")))));
}

// Stat tile
function StatTile({
  icon,
  label,
  value,
  sub,
  tint,
  color
}) {
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center justify-center rounded-xl",
    style: {
      width: 40,
      height: 40,
      background: tint,
      color
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 20,
      height: 20
    }
  })), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "more-horizontal",
    style: {
      width: 16,
      height: 16,
      color: 'var(--v2-fg-3)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-eyebrow mb-1"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: 'var(--v2-fg-1)'
    },
    className: "v2-num"
  }, value), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--v2-success)',
      fontWeight: 600
    }
  }, sub))));
}

// Learning path — Equeo-style step trail
function LearningPath() {
  const steps = [{
    label: 'Основы',
    state: 'done'
  }, {
    label: 'Excel: продвинутый',
    state: 'done'
  }, {
    label: 'Презентации',
    state: 'current'
  }, {
    label: 'Анализ данных',
    state: 'next'
  }, {
    label: 'Финальный проект',
    state: 'locked'
  }];
  const colors = {
    done: {
      bg: 'var(--v2-success)',
      ring: 'var(--v2-success-50)',
      text: '#fff'
    },
    current: {
      bg: 'var(--v2-accent-orange)',
      ring: 'var(--v2-tint-orange)',
      text: '#fff'
    },
    next: {
      bg: '#fff',
      ring: 'var(--v2-border-1)',
      text: 'var(--v2-fg-2)'
    },
    locked: {
      bg: 'var(--v2-bg-muted)',
      ring: 'var(--v2-border-1)',
      text: 'var(--v2-fg-3)'
    }
  };
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-teal)'
    }
  }, "\u0422\u0440\u0430\u0435\u043A\u0442\u043E\u0440\u0438\u044F \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044F"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-xs font-semibold",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u2192")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginBottom: 4
    }
  }, "Junior \u2192 Middle Analyst"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--v2-fg-2)'
    }
  }, "2 \u0438\u0437 5 \u0448\u0430\u0433\u043E\u0432 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E \xB7 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u0440\u0435\u0432\u044C\u044E \u0441 \u043C\u0435\u043D\u0442\u043E\u0440\u043E\u043C 18 \u043C\u0430\u0440\u0442\u0430"), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-5 left-5 right-5 h-0.5",
    style: {
      background: 'var(--v2-border-1)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-5 left-5 h-0.5",
    style: {
      width: '40%',
      background: 'linear-gradient(90deg, var(--v2-success), var(--v2-accent-orange))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 relative"
  }, steps.map((s, i) => {
    const c = colors[s.state];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex flex-col items-center text-center px-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-full flex items-center justify-center font-bold relative",
      style: {
        width: 40,
        height: 40,
        background: c.bg,
        color: c.text,
        border: `4px solid ${c.ring}`,
        fontSize: 14
      }
    }, s.state === 'done' ? /*#__PURE__*/React.createElement("i", {
      "data-lucide": "check",
      style: {
        width: 16,
        height: 16
      }
    }) : s.state === 'locked' ? /*#__PURE__*/React.createElement("i", {
      "data-lucide": "lock",
      style: {
        width: 14,
        height: 14
      }
    }) : i + 1), /*#__PURE__*/React.createElement("div", {
      className: "mt-2",
      style: {
        fontSize: 11,
        fontWeight: s.state === 'current' ? 700 : 500,
        color: s.state === 'locked' ? 'var(--v2-fg-3)' : 'var(--v2-fg-1)',
        maxWidth: 90,
        lineHeight: 1.3
      }
    }, s.label), s.state === 'current' && /*#__PURE__*/React.createElement("div", {
      className: "mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
      style: {
        background: 'var(--v2-tint-orange)',
        color: 'var(--v2-accent-orange)'
      }
    }, "\u0441\u0435\u0439\u0447\u0430\u0441"));
  }))));
}

// Upcoming events
function UpcomingEvents() {
  const events = [{
    day: '14',
    mon: 'мар',
    title: 'Вебинар: культура обратной связи',
    time: '14:00 · онлайн',
    tag: 'live',
    color: 'var(--v2-accent-pink)'
  }, {
    day: '18',
    mon: 'мар',
    title: 'Ревью с ментором',
    time: '11:30 · MS Teams',
    tag: '1:1',
    color: 'var(--v2-accent-violet)'
  }, {
    day: '22',
    mon: 'мар',
    title: 'Тимбилдинг: командные игры',
    time: '17:00 · офис',
    tag: 'офис',
    color: 'var(--v2-accent-teal)'
  }];
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-violet)'
    }
  }, "\u0411\u043B\u0438\u0436\u0430\u0439\u0448\u0438\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 2
    }
  }, "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-xs font-semibold",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u0412\u0441\u0435 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, events.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex items-center gap-3 p-3 rounded-xl transition cursor-pointer hover:bg-[var(--v2-bg-muted)]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center rounded-xl shrink-0 py-2 px-3",
    style: {
      background: 'var(--v2-bg-muted)',
      minWidth: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      lineHeight: 1
    }
  }, e.day), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--v2-fg-3)',
      textTransform: 'uppercase',
      marginTop: 2
    }
  }, e.mon)), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
    style: {
      background: `color-mix(in srgb, ${e.color} 12%, white)`,
      color: e.color
    }
  }, e.tag)), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 truncate",
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--v2-fg-1)'
    }
  }, e.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--v2-fg-3)'
    }
  }, e.time))))));
}

// Leaderboard widget
function Leaderboard() {
  const me = {
    rank: 7,
    name: 'Вы (Aziz K.)',
    pts: 1250
  };
  const top = [{
    rank: 1,
    name: 'Madina Saidova',
    pts: 3420,
    dept: 'HR'
  }, {
    rank: 2,
    name: 'Bekhzod Karimov',
    pts: 2980,
    dept: 'Sales'
  }, {
    rank: 3,
    name: 'Nigora Rakhimova',
    pts: 2710,
    dept: 'IT'
  }];
  const medal = ['🥇', '🥈', '🥉'];
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: '#D97706'
    }
  }, "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043C\u0430\u0440\u0442\u0430"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 2
    }
  }, "\u041B\u0438\u0434\u0435\u0440\u044B")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-xs font-semibold",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041F\u043E\u043B\u043D\u044B\u0439 \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u2192")), /*#__PURE__*/React.createElement("ol", {
    className: "space-y-2"
  }, top.map(p => /*#__PURE__*/React.createElement("li", {
    key: p.rank,
    className: "flex items-center gap-3 p-2.5 rounded-xl",
    style: {
      background: p.rank === 1 ? 'linear-gradient(90deg, var(--v2-tint-amber), transparent)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      lineHeight: 1,
      width: 28,
      textAlign: 'center'
    }
  }, medal[p.rank - 1]), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--v2-fg-1)'
    },
    className: "truncate"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, p.dept)), /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: '#D97706'
    }
  }, p.pts.toLocaleString())))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t flex items-center gap-3",
    style: {
      borderColor: 'var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
    style: {
      background: 'var(--v2-primary)',
      color: '#fff'
    }
  }, me.rank), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--v2-fg-1)'
    }
  }, me.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, "+120 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u043F\u043E\u0434\u043D\u044F\u043B\u0438\u0441\u044C \u043D\u0430 2 \u043F\u043E\u0437\u0438\u0446\u0438\u0438")), /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: 'var(--v2-fg-1)'
    }
  }, me.pts.toLocaleString())));
}

// Achievements
function Achievements() {
  const items = [{
    icon: 'rocket',
    title: 'Быстрый старт',
    date: 'Получено 14 фев',
    got: true
  }, {
    icon: 'target',
    title: 'Меткий стрелок',
    date: 'Сдан тест на 100%',
    got: true
  }, {
    icon: 'trophy',
    title: 'Покоритель курсов',
    date: '3 курса за месяц',
    got: true
  }, {
    icon: 'flame',
    title: 'Серия 14 дней',
    date: 'осталось 4 дня',
    got: false
  }];
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-orange)'
    }
  }, "\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 2
    }
  }, "3 \u0438\u0437 24 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, items.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "p-3 rounded-xl text-center transition",
    style: {
      background: a.got ? 'var(--v2-bg-muted)' : '#fff',
      border: '1px solid var(--v2-border-1)',
      opacity: a.got ? 1 : 0.55
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": a.icon,
    style: {
      width: 22,
      height: 22,
      color: a.got ? 'var(--v2-primary)' : 'var(--v2-fg-3)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--v2-fg-1)',
      marginTop: 4
    }
  }, a.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--v2-fg-3)',
      marginTop: 2
    }
  }, a.date)))));
}

// Course catalog card — neutral cover with category as typography
function CourseCardV2({
  course,
  onOpen
}) {
  const covers = {
    safety: {
      variant: 'navy',
      label: 'Compliance'
    },
    cyber: {
      variant: 'navy',
      label: 'Security'
    },
    leadership: {
      variant: 'paper',
      label: 'Soft skills'
    },
    customer: {
      variant: 'warm',
      label: 'Customer care'
    },
    excel: {
      variant: 'slate',
      label: 'Analytics'
    },
    onboarding: {
      variant: 'paper',
      label: 'Onboarding'
    }
  };
  const c = covers[course.theme] || covers.leadership;
  const dark = c.variant === 'navy' || c.variant === 'slate';
  const labelColor = dark ? 'rgba(255,255,255,0.7)' : 'var(--v2-fg-3)';
  const titleColor = dark ? '#FFFFFF' : 'var(--v2-fg-1)';
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "overflow-hidden flex flex-col h-full transition cursor-pointer hover:shadow-md",
    style: {
      borderColor: 'var(--v2-border-1)'
    },
    onClick: onOpen
  }, /*#__PURE__*/React.createElement("div", {
    className: `v2-cover v2-cover--${c.variant} h-32`
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-cover-label",
    style: {
      color: labelColor
    }
  }, c.label), /*#__PURE__*/React.createElement("div", {
    className: "v2-cover-title",
    style: {
      color: titleColor
    }
  }, course.title), course.required && /*#__PURE__*/React.createElement("span", {
    className: "absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
    style: {
      background: 'var(--v2-danger)',
      color: '#fff',
      borderRadius: 4
    }
  }, "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"), course.new && !course.required && /*#__PURE__*/React.createElement("span", {
    className: "absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
    style: {
      background: '#fff',
      color: 'var(--v2-fg-1)',
      border: '1px solid var(--v2-border-2)',
      borderRadius: 4
    }
  }, "\u041D\u043E\u0432\u044B\u0439")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 flex-1 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--v2-fg-3)'
    }
  }, course.category), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--v2-border-2)'
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, course.duration)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--v2-fg-1)',
      lineHeight: 1.35,
      letterSpacing: '-0.005em'
    }
  }, course.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--v2-fg-2)',
      marginTop: 4,
      lineHeight: 1.5
    },
    className: "line-clamp-2"
  }, course.desc), /*#__PURE__*/React.createElement("div", {
    className: "mt-auto pt-4"
  }, course.progress != null ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--v2-fg-2)'
    }
  }, course.progress, "% \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043E"), /*#__PURE__*/React.createElement("span", {
    className: "v2-num",
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--v2-fg-3)'
    }
  }, "+", course.points, " \u0431\u0430\u043B\u043B\u043E\u0432")), /*#__PURE__*/React.createElement("div", {
    className: "h-1 rounded-full overflow-hidden",
    style: {
      background: 'var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full",
    style: {
      width: `${course.progress}%`,
      background: course.required ? 'var(--v2-accent)' : 'var(--v2-primary)'
    }
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-num",
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--v2-fg-3)'
    }
  }, "+", course.points, " \u0431\u0430\u043B\u043B\u043E\u0432"), /*#__PURE__*/React.createElement("button", {
    className: "text-xs font-semibold flex items-center gap-1",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right",
    style: {
      width: 12,
      height: 12
    }
  }))))));
}
window.WidgetCard = WidgetCard;
window.ContinueLearning = ContinueLearning;
window.StatTile = StatTile;
window.LearningPath = LearningPath;
window.UpcomingEvents = UpcomingEvents;
window.Leaderboard = Leaderboard;
window.Achievements = Achievements;
window.CourseCardV2 = CourseCardV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app/Widgets.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app_v2/CourseDetail.jsx
try { (() => {
// Course Detail (Equeo-style: hero + module list + sidebar info)
function CourseDetailV2({
  onBack
}) {
  const modules = [{
    num: 1,
    title: 'Введение и контекст',
    dur: '12 мин',
    state: 'done',
    type: 'video'
  }, {
    num: 2,
    title: 'Типы инцидентов на рабочем месте',
    dur: '18 мин',
    state: 'done',
    type: 'video'
  }, {
    num: 3,
    title: 'Практика: чек-лист безопасности',
    dur: '15 мин',
    state: 'done',
    type: 'practice'
  }, {
    num: 4,
    title: 'Реагирование на инциденты',
    dur: '22 мин',
    state: 'current',
    type: 'video'
  }, {
    num: 5,
    title: 'Промежуточный тест',
    dur: '10 мин',
    state: 'next',
    type: 'test'
  }, {
    num: 6,
    title: 'Кейсы из практики',
    dur: '20 мин',
    state: 'locked',
    type: 'video'
  }, {
    num: 7,
    title: 'Финальная аттестация',
    dur: '25 мин',
    state: 'locked',
    type: 'test'
  }];
  const typeIcons = {
    video: 'play-circle',
    practice: 'clipboard-check',
    test: 'file-question'
  };
  const stateColors = {
    done: {
      bg: 'var(--v2-success)',
      text: '#fff',
      ring: 'var(--v2-success-50)'
    },
    current: {
      bg: 'var(--v2-accent-orange)',
      text: '#fff',
      ring: 'var(--v2-tint-orange)'
    },
    next: {
      bg: '#fff',
      text: 'var(--v2-fg-2)',
      ring: 'var(--v2-border-1)'
    },
    locked: {
      bg: 'var(--v2-bg-muted)',
      text: 'var(--v2-fg-3)',
      ring: 'var(--v2-border-1)'
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "flex items-center gap-1.5 text-sm font-semibold transition",
    style: {
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0412\u0441\u0435 \u043A\u0443\u0440\u0441\u044B"), /*#__PURE__*/React.createElement(WidgetCard, {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-[1.5fr_1fr]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
    style: {
      background: 'var(--v2-tint-orange)',
      color: 'var(--v2-accent-orange)'
    }
  }, "\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
    style: {
      background: 'var(--v2-tint-blue)',
      color: 'var(--v2-primary)'
    }
  }, "Compliance")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      letterSpacing: '-0.01em',
      lineHeight: 1.15
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435"), /*#__PURE__*/React.createElement("p", {
    className: "mt-3",
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      lineHeight: 1.6,
      maxWidth: 520
    }
  }, "\u0415\u0436\u0435\u0433\u043E\u0434\u043D\u043E\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u043E\u0445\u0440\u0430\u043D\u0435 \u0442\u0440\u0443\u0434\u0430. \u0423\u0447\u0438\u043C \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0432\u0430\u0442\u044C \u0438\u043D\u0446\u0438\u0434\u0435\u043D\u0442\u044B, \u0433\u0440\u0430\u043C\u043E\u0442\u043D\u043E \u0440\u0435\u0430\u0433\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438 \u043E\u0444\u043E\u0440\u043C\u043B\u044F\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B."), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 flex items-center gap-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--v2-fg-3)'
    }
  }, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-40 h-2 rounded-full",
    style: {
      background: 'var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full",
    style: {
      width: '43%',
      background: 'linear-gradient(90deg, var(--v2-success), var(--v2-accent-orange))'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "v2-num",
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: 'var(--v2-accent-orange)'
    }
  }, "3/7"))), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-10",
    style: {
      background: 'var(--v2-border-1)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--v2-fg-3)'
    }
  }, "\u0414\u0435\u0434\u043B\u0430\u0439\u043D"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 mt-1",
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--v2-danger)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "alarm-clock",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0447\u0435\u0440\u0435\u0437 12 \u0434\u043D\u0435\u0439"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2",
    style: {
      background: 'var(--v2-primary)',
      color: '#fff'
    }
  }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441 \u043C\u043E\u0434\u0443\u043B\u044F 4 ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "play",
    style: {
      width: 14,
      height: 14
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2",
    style: {
      background: 'var(--v2-bg-muted)',
      color: 'var(--v2-fg-1)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bookmark",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0412 \u0437\u0430\u043A\u043B\u0430\u0434\u043A\u0438"))), /*#__PURE__*/React.createElement("div", {
    className: "relative v2-cover v2-cover--paper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex flex-col items-start justify-end p-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-fg-3)'
    }
  }, "Compliance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--v2-fg-1)',
      lineHeight: 1.1,
      marginTop: 6,
      letterSpacing: '-0.01em'
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C", /*#__PURE__*/React.createElement("br", null), "\u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435"))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-span-2 space-y-5"
  }, /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-5"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)'
    }
  }, "\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 \u043A\u0443\u0440\u0441\u0430"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--v2-fg-3)'
    }
  }, "7 \u043C\u043E\u0434\u0443\u043B\u0435\u0439 \xB7 ~2 \u0447 02 \u043C\u0438\u043D")), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2"
  }, modules.map(m => {
    const c = stateColors[m.state];
    const clickable = m.state !== 'locked';
    return /*#__PURE__*/React.createElement("li", {
      key: m.num,
      className: "flex items-center gap-4 p-3 rounded-xl transition",
      style: {
        background: m.state === 'current' ? 'var(--v2-tint-orange)' : 'transparent',
        border: '1px solid ' + (m.state === 'current' ? '#FFD9A8' : 'var(--v2-border-1)'),
        cursor: clickable ? 'pointer' : 'default',
        opacity: m.state === 'locked' ? 0.55 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-full flex items-center justify-center font-bold",
      style: {
        width: 36,
        height: 36,
        background: c.bg,
        color: c.text,
        border: `3px solid ${c.ring}`,
        fontSize: 13,
        flexShrink: 0
      }
    }, m.state === 'done' ? /*#__PURE__*/React.createElement("i", {
      "data-lucide": "check",
      style: {
        width: 14,
        height: 14
      }
    }) : m.state === 'locked' ? /*#__PURE__*/React.createElement("i", {
      "data-lucide": "lock",
      style: {
        width: 12,
        height: 12
      }
    }) : m.num), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 min-w-0"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": typeIcons[m.type],
      style: {
        width: 12,
        height: 12,
        color: 'var(--v2-fg-3)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--v2-fg-3)'
      }
    }, m.type === 'video' ? 'Видео-модуль' : m.type === 'practice' ? 'Практика' : 'Тестирование')), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--v2-fg-1)',
        marginTop: 2
      }
    }, m.title)), /*#__PURE__*/React.createElement("div", {
      className: "text-right shrink-0"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--v2-fg-3)'
      }
    }, m.dur), m.state === 'current' && /*#__PURE__*/React.createElement("button", {
      className: "mt-1 px-3 py-1 rounded-lg text-xs font-bold",
      style: {
        background: 'var(--v2-accent-orange)',
        color: '#fff'
      }
    }, "\u041D\u0430\u0447\u0430\u0442\u044C")));
  }))), /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)'
    }
  }, "\u041E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u0435 \u043A\u0443\u0440\u0441\u0430"), /*#__PURE__*/React.createElement("button", {
    className: "text-xs font-semibold flex items-center gap-1",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0444\u043E\u0440\u0443\u043C ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-up-right",
    style: {
      width: 12,
      height: 12
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, [{
    name: 'Madina S.',
    when: '2 ч',
    text: 'Кто-нибудь сдавал тест с первого раза? Поделитесь, на что обратить внимание.'
  }, {
    name: 'Bekhzod K.',
    when: '5 ч',
    text: 'Чек-лист в модуле 3 очень полезен — распечатал на стену.'
  }].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0",
    style: {
      background: 'linear-gradient(135deg, #DCE4FF, #EFEAFF)',
      color: 'var(--v2-primary)',
      fontSize: 13
    }
  }, c.name[0]), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 p-3 rounded-xl",
    style: {
      background: 'var(--v2-bg-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    }
  }, c.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, "\xB7 ", c.when, " \u043D\u0430\u0437\u0430\u0434")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--v2-fg-2)'
    }
  }, c.text))))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041E \u043A\u0443\u0440\u0441\u0435"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-3"
  }, [{
    icon: 'clock',
    label: 'Длительность',
    val: '~2 часа'
  }, {
    icon: 'layers',
    label: 'Модулей',
    val: '7'
  }, {
    icon: 'sparkles',
    label: 'Награда',
    val: '+250 баллов'
  }, {
    icon: 'award',
    label: 'Сертификат',
    val: 'после теста'
  }, {
    icon: 'globe',
    label: 'Язык',
    val: 'Русский'
  }, {
    icon: 'calendar',
    label: 'Обновлён',
    val: 'март 2026'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex items-center gap-3 py-2",
    style: {
      borderTop: i ? '1px solid var(--v2-border-1)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": r.icon,
    style: {
      width: 14,
      height: 14,
      color: 'var(--v2-fg-3)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--v2-fg-2)',
      flex: 1
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    }
  }, r.val))))), /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-violet)'
    }
  }, "\u0410\u0432\u0442\u043E\u0440 \u043A\u0443\u0440\u0441\u0430"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full flex items-center justify-center font-bold",
    style: {
      background: 'linear-gradient(135deg, var(--v2-accent-violet), var(--v2-primary))',
      color: '#fff',
      fontSize: 16
    }
  }, "\u041E\u0421"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    }
  }, "\u041E\u0442\u0434\u0435\u043B \u0421\u041E\u0422"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--v2-fg-3)'
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0438 \u043E\u0445\u0440\u0430\u043D\u0430 \u0442\u0440\u0443\u0434\u0430"))), /*#__PURE__*/React.createElement("button", {
    className: "mt-4 w-full py-2 rounded-xl text-sm font-semibold transition",
    style: {
      background: 'var(--v2-tint-violet)',
      color: 'var(--v2-accent-violet)'
    }
  }, "\u0417\u0430\u0434\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441")), /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-5",
    style: {
      background: 'var(--v2-tint-warm)',
      border: '1px solid var(--v2-accent-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "trophy",
    style: {
      width: 22,
      height: 22,
      color: 'var(--v2-accent)',
      flexShrink: 0,
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    }
  }, "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u043A\u0443\u0440\u0441 \u2014 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#92400E',
      marginTop: 4
    }
  }, "\xAB\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A 2026\xBB + 250 \u0431\u0430\u043B\u043B\u043E\u0432 \u0432 \u043C\u0430\u0433\u0430\u0437\u0438\u043D \u043D\u0430\u0433\u0440\u0430\u0434.")))))));
}
window.CourseDetailV2 = CourseDetailV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app_v2/CourseDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app_v2/Screens.jsx
try { (() => {
// v2 Screens
function HeroBanner({
  user
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl p-7 text-white relative overflow-hidden v2-hero-grad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 max-w-2xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'rgba(255,255,255,0.65)'
    }
  }, "\u0414\u043E\u0431\u0440\u043E\u0435 \u0443\u0442\u0440\u043E"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      marginTop: 4,
      letterSpacing: '-0.015em',
      lineHeight: 1.2
    }
  }, user.name.split(' ')[0], ", \u0443 \u0432\u0430\u0441 \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u0439 \u0442\u0435\u043C\u043F \u2014 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0439\u0442\u0435."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.78)',
      marginTop: 10,
      maxWidth: 520,
      lineHeight: 1.55
    }
  }, "\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0432 \u043F\u043B\u0430\u043D\u0435: 1 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043C\u043E\u0434\u0443\u043B\u044C \u0438 1 \u0440\u0435\u0432\u044C\u044E \u0441 \u043C\u0435\u043D\u0442\u043E\u0440\u043E\u043C."), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 flex items-center gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "flame",
    style: {
      width: 18,
      height: 18,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 20,
      fontWeight: 700
    }
  }, "14"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      fontWeight: 500
    }
  }, "\u0434\u043D\u0435\u0439 \u043F\u043E\u0434\u0440\u044F\u0434"))), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-9",
    style: {
      background: 'rgba(255,255,255,0.18)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "book-open",
    style: {
      width: 18,
      height: 18,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 20,
      fontWeight: 700
    }
  }, "3"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      fontWeight: 500
    }
  }, "\u043A\u0443\u0440\u0441\u0430 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435"))), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-9",
    style: {
      background: 'rgba(255,255,255,0.18)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "award",
    style: {
      width: 18,
      height: 18,
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 20,
      fontWeight: 700
    }
  }, "1 250"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      fontWeight: 500
    }
  }, "\u0431\u0430\u043B\u043B\u043E\u0432"))))));
}
function DashboardV2({
  user,
  onNav,
  onOpenCourse
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement(HeroBanner, {
    user: user
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement(StatTile, {
    icon: "book-marked",
    label: "\u0412 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0438",
    value: "3",
    sub: "+1 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E",
    tint: "var(--v2-tint-blue)",
    color: "var(--v2-primary)"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "check-circle-2",
    label: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E",
    value: "12",
    sub: "83% \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u043C\u043E\u0441\u0442\u044C",
    tint: "var(--v2-tint-teal)",
    color: "var(--v2-accent-teal)"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "clock",
    label: "\u0427\u0430\u0441\u043E\u0432 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F",
    value: "47",
    sub: "+5 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E",
    tint: "var(--v2-tint-violet)",
    color: "var(--v2-accent-violet)"
  }), /*#__PURE__*/React.createElement(StatTile, {
    icon: "award",
    label: "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0432",
    value: "6",
    sub: "2 \u0432 \u044D\u0442\u043E\u043C \u0433\u043E\u0434\u0443",
    tint: "var(--v2-tint-orange)",
    color: "var(--v2-accent-orange)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-span-2 space-y-5"
  }, /*#__PURE__*/React.createElement(ContinueLearning, {
    onContinue: onOpenCourse || (() => onNav('courses')),
    onOpen: onOpenCourse
  }), /*#__PURE__*/React.createElement(LearningPath, null), /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-orange)'
    }
  }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 2
    }
  }, "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u043E\u0432\u0430\u043D\u043E \u0432\u0430\u043C")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-xs font-semibold",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u0412\u0435\u0441\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement(CourseCardV2, {
    course: {
      title: 'Основы Power BI',
      desc: 'Дашборды и визуализация для аналитиков и менеджеров.',
      category: 'Аналитика',
      duration: '4 ч',
      points: 350,
      theme: 'excel',
      new: true
    },
    onOpen: onOpenCourse
  }), /*#__PURE__*/React.createElement(CourseCardV2, {
    course: {
      title: 'Кибергигиена 2026',
      desc: 'Фишинг, пароли, инциденты — обновлённая программа.',
      category: 'Безопасность',
      duration: '1.5 ч',
      points: 200,
      theme: 'cyber'
    },
    onOpen: onOpenCourse
  }), /*#__PURE__*/React.createElement(CourseCardV2, {
    course: {
      title: 'Лидерство в команде',
      desc: 'Для тимлидов: коммуникация, обратная связь, делегирование.',
      category: 'Soft skills',
      duration: '6 ч',
      points: 480,
      theme: 'leadership'
    },
    onOpen: onOpenCourse
  })))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement(UpcomingEvents, null), /*#__PURE__*/React.createElement(Leaderboard, null), /*#__PURE__*/React.createElement(Achievements, null))));
}
function CoursesV2({
  onOpen
}) {
  const all = [{
    title: 'Безопасность на рабочем месте',
    desc: 'Ежегодное обязательное обучение по охране труда.',
    category: 'Compliance',
    duration: '3 ч',
    points: 250,
    theme: 'safety',
    required: true,
    progress: 60
  }, {
    title: 'Лидерство для новых тимлидов',
    desc: 'Коммуникация, обратная связь, делегирование.',
    category: 'Soft skills',
    duration: '6 ч',
    points: 480,
    theme: 'leadership',
    progress: 35
  }, {
    title: 'Онбординг новых сотрудников',
    desc: 'Программа для адаптации в первые 2 недели.',
    category: 'Adaptation',
    duration: '2 ч',
    points: 150,
    theme: 'onboarding',
    progress: 100
  }, {
    title: 'Excel для аналитиков',
    desc: 'PivotTables, Power Query, дашборды.',
    category: 'Hard skills',
    duration: '8 ч',
    points: 600,
    theme: 'excel'
  }, {
    title: 'Сервис, который запоминается',
    desc: 'Эмпатичная коммуникация со сложными клиентами.',
    category: 'Customer',
    duration: '4 ч',
    points: 350,
    theme: 'customer',
    new: true
  }, {
    title: 'Кибергигиена 2026',
    desc: 'Фишинг, пароли, инциденты — обновлено.',
    category: 'Безопасность',
    duration: '1.5 ч',
    points: 200,
    theme: 'cyber'
  }];
  const filters = ['Все курсы', 'Обязательные', 'В работе', 'Завершённые', 'Рекомендовано'];
  const [active, setActive] = React.useState('Все курсы');
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-end justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 4
    }
  }, "\u041A\u0443\u0440\u0441\u044B \u0438 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      marginTop: 4
    }
  }, all.length, " \u043A\u0443\u0440\u0441\u043E\u0432 \xB7 3 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435 \xB7 1 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5",
    style: {
      background: '#fff',
      border: '1px solid var(--v2-border-1)',
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sliders-horizontal",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0424\u0438\u043B\u044C\u0442\u0440\u044B"), /*#__PURE__*/React.createElement("button", {
    className: "px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5",
    style: {
      background: 'var(--v2-primary)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 14,
      height: 14
    }
  }), " \u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u0443\u0440\u0441"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, filters.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setActive(f),
    className: "px-3.5 py-1.5 rounded-full text-xs font-semibold transition",
    style: {
      background: active === f ? 'var(--v2-fg-1)' : '#fff',
      color: active === f ? '#fff' : 'var(--v2-fg-2)',
      border: '1px solid ' + (active === f ? 'var(--v2-fg-1)' : 'var(--v2-border-1)')
    }
  }, f))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-5"
  }, all.map((c, i) => /*#__PURE__*/React.createElement(CourseCardV2, {
    key: i,
    course: c,
    onOpen: onOpen
  }))));
}
function ForumV2() {
  const threads = [{
    id: 4,
    title: 'Добро пожаловать в сообщество Farovon!',
    author: 'CEO',
    replies: 28,
    votes: 64,
    tag: 'Закреплено',
    tagColor: 'var(--v2-accent-amber)',
    when: '2 нед',
    avatar: '👤'
  }, {
    id: 1,
    title: 'Советы по экзамену Power BI?',
    author: 'Madina S.',
    replies: 12,
    votes: 8,
    tag: 'Помощь',
    tagColor: 'var(--v2-primary)',
    when: '2 ч',
    avatar: 'М'
  }, {
    id: 2,
    title: 'Как удерживать мотивацию в длинных модулях?',
    author: 'Bekhzod K.',
    replies: 7,
    votes: 14,
    tag: 'Дискуссия',
    tagColor: 'var(--v2-accent-violet)',
    when: '5 ч',
    avatar: 'Б'
  }, {
    id: 3,
    title: 'Прогресс не сохраняется на iOS Safari',
    author: 'Nigora R.',
    replies: 3,
    votes: 2,
    tag: 'Баг',
    tagColor: 'var(--v2-danger)',
    when: '1 д',
    avatar: 'Н'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-end justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-pink)'
    }
  }, "\u0421\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 4
    }
  }, "\u041E\u0431\u0441\u0443\u0436\u0434\u0435\u043D\u0438\u044F \u0438 Q&A"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      marginTop: 4
    }
  }, "\u0421\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0439\u0442\u0435, \u043E\u0442\u0432\u0435\u0447\u0430\u0439\u0442\u0435 \u2014 \u0437\u0430 \u043F\u043E\u043B\u0435\u0437\u043D\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u043D\u0430\u0447\u0438\u0441\u043B\u044F\u044E\u0442\u0441\u044F \u0431\u0430\u043B\u043B\u044B.")), /*#__PURE__*/React.createElement("button", {
    className: "px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5",
    style: {
      background: 'var(--v2-primary)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "plus",
    style: {
      width: 14,
      height: 14
    }
  }), " \u041D\u043E\u0432\u0430\u044F \u0442\u0435\u043C\u0430")), /*#__PURE__*/React.createElement(WidgetCard, null, /*#__PURE__*/React.createElement("ul", {
    className: "divide-y",
    style: {
      borderColor: 'var(--v2-border-1)'
    }
  }, threads.map(t => /*#__PURE__*/React.createElement("li", {
    key: t.id,
    className: "p-5 flex items-center gap-4 hover:bg-[var(--v2-bg-muted)] cursor-pointer transition"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center w-12 shrink-0 rounded-xl py-2",
    style: {
      background: 'var(--v2-bg-muted)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-up",
    style: {
      width: 14,
      height: 14,
      color: 'var(--v2-fg-3)',
      margin: '0 auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: 'var(--v2-fg-1)'
    }
  }, t.votes), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      width: 14,
      height: 14,
      color: 'var(--v2-fg-3)',
      margin: '0 auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0",
    style: {
      background: 'linear-gradient(135deg, #DCE4FF, #EFEAFF)',
      color: 'var(--v2-primary)'
    }
  }, t.avatar), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
    style: {
      background: `color-mix(in srgb, ${t.tagColor} 12%, white)`,
      color: t.tagColor
    }
  }, t.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, "\xB7 ", t.when, " \u043D\u0430\u0437\u0430\u0434 \xB7 \u0430\u0432\u0442\u043E\u0440 ", t.author)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    },
    className: "truncate"
  }, t.title)), /*#__PURE__*/React.createElement("div", {
    className: "text-right shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5",
    style: {
      fontSize: 13,
      color: 'var(--v2-fg-2)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "message-circle",
    style: {
      width: 14,
      height: 14
    }
  }), " ", t.replies)))))));
}
function ShopV2() {
  const items = [{
    id: 1,
    name: 'Брендированная кружка Farovon',
    cost: 200,
    stock: 12,
    icon: 'coffee',
    cat: 'Мерч'
  }, {
    id: 2,
    name: 'Дополнительный выходной',
    cost: 2500,
    stock: 3,
    icon: 'palmtree',
    cat: 'Бенефит'
  }, {
    id: 3,
    name: 'Беспроводные наушники',
    cost: 1800,
    stock: 5,
    icon: 'headphones',
    cat: 'Техника'
  }, {
    id: 4,
    name: 'Обед с CEO',
    cost: 1500,
    stock: 1,
    icon: 'utensils',
    cat: 'Опыт'
  }, {
    id: 5,
    name: 'Набор: блокнот + ручка',
    cost: 350,
    stock: 24,
    icon: 'notebook-pen',
    cat: 'Мерч'
  }, {
    id: 6,
    name: 'Сертификат на онлайн-курс',
    cost: 1200,
    stock: 8,
    icon: 'graduation-cap',
    cat: 'Обучение'
  }];
  const balance = 1250;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-end justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-teal)'
    }
  }, "\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u043D\u0430\u0433\u0440\u0430\u0434"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 4
    }
  }, "\u041E\u0431\u043C\u0435\u043D\u044F\u0439\u0442\u0435 \u0431\u0430\u043B\u043B\u044B \u043D\u0430 \u043F\u0440\u0438\u0437\u044B"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      marginTop: 4
    }
  }, "\u0417\u0430\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0439\u0442\u0435 \u0431\u0430\u043B\u043B\u044B \u0437\u0430 \u043A\u0443\u0440\u0441\u044B, \u0442\u0435\u0441\u0442\u044B \u0438 \u043F\u043E\u043C\u043E\u0449\u044C \u043A\u043E\u043B\u043B\u0435\u0433\u0430\u043C.")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 px-5 py-3 rounded-xl",
    style: {
      background: '#fff',
      border: '1px solid var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "award",
    style: {
      width: 22,
      height: 22,
      color: 'var(--v2-accent)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-fg-3)'
    }
  }, "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E"), /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: 'var(--v2-fg-1)',
      lineHeight: 1,
      letterSpacing: '-0.01em'
    }
  }, balance.toLocaleString(), " \u0431\u0430\u043B\u043B\u043E\u0432")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-5"
  }, items.map(i => {
    const can = balance >= i.cost;
    return /*#__PURE__*/React.createElement(WidgetCard, {
      key: i.id,
      className: "p-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "aspect-[4/3] rounded-xl flex items-center justify-center mb-4",
      style: {
        background: 'var(--v2-bg-muted)',
        border: '1px solid var(--v2-border-1)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": i.icon,
      style: {
        width: 56,
        height: 56,
        color: 'var(--v2-fg-2)',
        strokeWidth: 1.25
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "v2-eyebrow",
      style: {
        color: 'var(--v2-fg-3)'
      }
    }, i.cat), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--v2-fg-3)'
      }
    }, "\xB7 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ", i.stock)), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--v2-fg-1)'
      }
    }, i.name), /*#__PURE__*/React.createElement("div", {
      className: "mt-4 flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "v2-num flex items-center gap-1.5",
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--v2-fg-1)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "award",
      style: {
        width: 14,
        height: 14,
        color: 'var(--v2-accent)'
      }
    }), i.cost.toLocaleString()), /*#__PURE__*/React.createElement("button", {
      disabled: !can,
      className: "px-4 py-1.5 rounded-lg text-xs font-semibold transition",
      style: {
        background: can ? 'var(--v2-primary)' : 'var(--v2-bg-muted)',
        color: can ? '#fff' : 'var(--v2-fg-3)',
        cursor: can ? 'pointer' : 'not-allowed'
      }
    }, can ? 'Обменять' : `Не хватает ${(i.cost - balance).toLocaleString()}`)));
  })));
}
function PathsV2() {
  const paths = [{
    title: 'Junior → Middle Analyst',
    steps: 5,
    done: 2,
    tint: 'var(--v2-tint-teal)',
    color: 'var(--v2-accent-teal)',
    icon: 'bar-chart-3'
  }, {
    title: 'Soft skills для тимлида',
    steps: 6,
    done: 3,
    tint: 'var(--v2-tint-violet)',
    color: 'var(--v2-accent-violet)',
    icon: 'users'
  }, {
    title: 'Введение в продуктовую аналитику',
    steps: 4,
    done: 0,
    tint: 'var(--v2-tint-orange)',
    color: 'var(--v2-accent-orange)',
    icon: 'target'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 max-w-[1280px] mx-auto"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-teal)'
    }
  }, "\u041A\u0430\u0440\u044C\u0435\u0440\u043D\u044B\u0435 \u0442\u0440\u0430\u0435\u043A\u0442\u043E\u0440\u0438\u0438"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 4
    }
  }, "\u0412\u0430\u0448\u0438 \u043F\u0443\u0442\u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044F"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      marginTop: 4
    }
  }, "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u044B \u0440\u043E\u0441\u0442\u0430 \u2014 \u043A\u0443\u0440\u0441\u044B, \u0440\u0435\u0432\u044C\u044E, \u043F\u0440\u043E\u0435\u043A\u0442\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F.")), /*#__PURE__*/React.createElement(LearningPath, null), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-5"
  }, paths.map((p, i) => /*#__PURE__*/React.createElement(WidgetCard, {
    key: i,
    className: "p-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center justify-center rounded-2xl mb-4",
    style: {
      width: 48,
      height: 48,
      background: p.tint,
      color: p.color
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": p.icon,
    style: {
      width: 22,
      height: 22
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--v2-fg-1)'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--v2-fg-2)',
      marginTop: 6
    }
  }, p.done, " \u0438\u0437 ", p.steps, " \u0448\u0430\u0433\u043E\u0432 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 h-1.5 rounded-full overflow-hidden",
    style: {
      background: 'var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full",
    style: {
      width: `${p.done / p.steps * 100}%`,
      background: p.color
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "mt-5 w-full py-2 rounded-xl text-sm font-semibold transition",
    style: {
      background: p.tint,
      color: p.color
    }
  }, p.done === 0 ? 'Начать траекторию' : 'Продолжить')))));
}
window.HeroBanner = HeroBanner;
window.DashboardV2 = DashboardV2;
window.CoursesV2 = CoursesV2;
window.ForumV2 = ForumV2;
window.ShopV2 = ShopV2;
window.PathsV2 = PathsV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app_v2/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app_v2/SidebarV2.jsx
try { (() => {
// v2 Sidebar — colored icon tiles, like Equeo
function SidebarV2({
  active,
  onNav,
  points = 1250
}) {
  const links = [{
    id: 'dashboard',
    icon: 'layout-dashboard',
    label: 'Главная',
    tint: 'var(--v2-tint-blue)',
    color: 'var(--v2-primary)'
  }, {
    id: 'courses',
    icon: 'book-open',
    label: 'Курсы',
    tint: 'var(--v2-tint-orange)',
    color: 'var(--v2-accent-orange)'
  }, {
    id: 'paths',
    icon: 'route',
    label: 'Траектории',
    tint: 'var(--v2-tint-teal)',
    color: 'var(--v2-accent-teal)'
  }, {
    id: 'events',
    icon: 'calendar-days',
    label: 'Мероприятия',
    tint: 'var(--v2-tint-violet)',
    color: 'var(--v2-accent-violet)'
  }, {
    id: 'forum',
    icon: 'message-circle',
    label: 'Сообщество',
    tint: 'var(--v2-tint-pink)',
    color: 'var(--v2-accent-pink)'
  }, {
    id: 'rating',
    icon: 'trophy',
    label: 'Рейтинг',
    tint: 'var(--v2-tint-amber)',
    color: '#D97706'
  }, {
    id: 'shop',
    icon: 'gift',
    label: 'Магазин наград',
    tint: 'var(--v2-tint-teal)',
    color: 'var(--v2-accent-teal)'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "w-[260px] shrink-0 h-full flex flex-col",
    style: {
      background: '#fff',
      borderRight: '1px solid var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-[72px] flex items-center px-6 gap-3",
    style: {
      borderBottom: '1px solid var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/farovon-logo.png",
    alt: "",
    style: {
      width: 32,
      height: 32
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 16,
      letterSpacing: '-0.01em',
      color: 'var(--v2-fg-1)'
    }
  }, "FAROVON"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.15em',
      color: 'var(--v2-fg-3)'
    }
  }, "LEARNING HUB"))), /*#__PURE__*/React.createElement("nav", {
    className: "flex-1 overflow-y-auto py-3 px-3"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "space-y-1"
  }, links.map(l => {
    const isActive = active === l.id;
    return /*#__PURE__*/React.createElement("li", {
      key: l.id
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNav(l.id);
      },
      className: "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
      style: {
        background: isActive ? l.tint : 'transparent',
        color: isActive ? l.color : 'var(--v2-fg-2)',
        fontWeight: isActive ? 600 : 500,
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "flex items-center justify-center rounded-lg shrink-0",
      style: {
        width: 32,
        height: 32,
        background: l.tint,
        color: l.color
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": l.icon,
      style: {
        width: 16,
        height: 16
      }
    })), l.label));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "m-3 p-4 rounded-2xl",
    style: {
      background: 'linear-gradient(135deg, #FFF4DC 0%, #FFE0C2 100%)',
      border: '1px solid #FFD9A8'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#92400E'
    }
  }, "\u0412\u0430\u0448 \u0431\u0430\u043B\u0430\u043D\u0441"), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 14,
      height: 14,
      color: '#D97706'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: '#7C3A0E'
    },
    className: "v2-num"
  }, points.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: '#92400E'
    }
  }, "\u0431\u0430\u043B\u043B\u043E\u0432")), /*#__PURE__*/React.createElement("button", {
    className: "mt-3 w-full text-xs font-semibold py-1.5 rounded-lg transition",
    style: {
      background: '#fff',
      color: '#92400E',
      border: '1px solid #FFD9A8'
    },
    onClick: () => onNav('shop')
  }, "\u0412 \u043C\u0430\u0433\u0430\u0437\u0438\u043D \u2192")));
}
window.SidebarV2 = SidebarV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app_v2/SidebarV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app_v2/TopBarV2.jsx
try { (() => {
// v2 TopBar
function TopBarV2({
  user,
  onLogout
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "h-[72px] flex items-center justify-between px-8 sticky top-0 z-10",
    style: {
      background: '#fff',
      borderBottom: '1px solid var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 flex-1 max-w-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-y-0 left-0 flex items-center pl-4",
    style: {
      color: 'var(--v2-fg-3)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "search",
    style: {
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("input", {
    placeholder: "\u041D\u0430\u0439\u0442\u0438 \u043A\u0443\u0440\u0441, \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0438\u043B\u0438 \u0442\u0435\u043C\u0443\u2026",
    className: "pl-11 pr-4 py-2.5 text-sm w-full focus:outline-none transition",
    style: {
      background: 'var(--v2-bg-muted)',
      border: '1px solid transparent',
      borderRadius: 10,
      color: 'var(--v2-fg-1)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition",
    style: {
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "globe",
    style: {
      width: 14,
      height: 14
    }
  }), " RU"), /*#__PURE__*/React.createElement("button", {
    className: "relative w-10 h-10 rounded-lg flex items-center justify-center transition",
    style: {
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "calendar-check",
    style: {
      width: 18,
      height: 18
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "relative w-10 h-10 rounded-lg flex items-center justify-center transition",
    style: {
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bell",
    style: {
      width: 18,
      height: 18
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute top-2 right-2 w-2 h-2 rounded-full",
    style: {
      background: 'var(--v2-danger)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-8 mx-2",
    style: {
      background: 'var(--v2-border-1)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-xl transition",
    style: {
      color: 'var(--v2-fg-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold",
    style: {
      background: 'linear-gradient(135deg, #2D4FBF, #7B5BFF)',
      color: '#fff'
    }
  }, (user?.name || 'AK').split(' ').map(s => s[0]).join('').slice(0, 2)), /*#__PURE__*/React.createElement("div", {
    className: "text-left leading-tight"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, user?.name || 'Aziz Karimov'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, "Junior Analyst \xB7 Tashkent")), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down",
    style: {
      width: 14,
      height: 14,
      color: 'var(--v2-fg-3)'
    }
  }))));
}
window.TopBarV2 = TopBarV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app_v2/TopBarV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web_app_v2/Widgets.jsx
try { (() => {
// v2 Widgets
function WidgetCard({
  children,
  className = '',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `rounded-2xl ${className}`,
    style: {
      background: 'var(--v2-bg-surface)',
      border: '1px solid var(--v2-border-1)',
      boxShadow: 'var(--v2-shadow-card)',
      ...style
    }
  }, children);
}

// Continue learning — wide hero widget
function ContinueLearning({
  onContinue,
  onOpen
}) {
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-[1.4fr_1fr]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-7"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
    style: {
      background: 'var(--v2-tint-orange)',
      color: 'var(--v2-accent-orange)'
    }
  }, "\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      lineHeight: 1.15,
      color: 'var(--v2-fg-1)',
      letterSpacing: '-0.01em'
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435"), /*#__PURE__*/React.createElement("p", {
    className: "mt-2",
    style: {
      fontSize: 14,
      color: 'var(--v2-fg-2)',
      maxWidth: 460
    }
  }, "\u041C\u043E\u0434\u0443\u043B\u044C 4 \u0438\u0437 7 \xB7 \xAB\u0420\u0435\u0430\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0430 \u0438\u043D\u0446\u0438\u0434\u0435\u043D\u0442\u044B\xBB. \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ~18 \u043C\u0438\u043D\u0443\u0442 \u0434\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F."), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 h-2 rounded-full overflow-hidden",
    style: {
      background: 'var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full",
    style: {
      width: '60%',
      background: 'linear-gradient(90deg, var(--v2-primary), var(--v2-accent-violet))'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "v2-num text-sm font-bold",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "60%")), /*#__PURE__*/React.createElement("div", {
    className: "mt-5 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onContinue,
    className: "px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2",
    style: {
      background: 'var(--v2-primary)',
      color: '#fff'
    }
  }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right",
    style: {
      width: 14,
      height: 14
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 text-xs",
    style: {
      color: 'var(--v2-accent-orange)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "clock",
    style: {
      width: 12,
      height: 12
    }
  }), " \u0414\u0435\u0434\u043B\u0430\u0439\u043D: 12 \u043C\u0430\u0440\u0442\u0430"))), /*#__PURE__*/React.createElement("div", {
    className: "relative v2-cover v2-cover--paper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex flex-col items-start justify-end p-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-fg-3)'
    }
  }, "Compliance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--v2-fg-1)',
      lineHeight: 1.1,
      marginTop: 6,
      letterSpacing: '-0.01em'
    }
  }, "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C", /*#__PURE__*/React.createElement("br", null), "\u043D\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u043C \u043C\u0435\u0441\u0442\u0435"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 px-3 py-1.5 rounded-md flex items-center gap-1.5",
    style: {
      background: '#fff',
      border: '1px solid var(--v2-border-1)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--v2-fg-2)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "award",
    style: {
      width: 13,
      height: 13,
      color: 'var(--v2-accent)'
    }
  }), " +250 \u0431\u0430\u043B\u043B\u043E\u0432")))));
}

// Stat tile
function StatTile({
  icon,
  label,
  value,
  sub,
  tint,
  color
}) {
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center justify-center rounded-xl",
    style: {
      width: 40,
      height: 40,
      background: tint,
      color
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 20,
      height: 20
    }
  })), /*#__PURE__*/React.createElement("i", {
    "data-lucide": "more-horizontal",
    style: {
      width: 16,
      height: 16,
      color: 'var(--v2-fg-3)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-eyebrow mb-1"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: 'var(--v2-fg-1)'
    },
    className: "v2-num"
  }, value), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--v2-success)',
      fontWeight: 600
    }
  }, sub))));
}

// Learning path — Equeo-style step trail
function LearningPath() {
  const steps = [{
    label: 'Основы',
    state: 'done'
  }, {
    label: 'Excel: продвинутый',
    state: 'done'
  }, {
    label: 'Презентации',
    state: 'current'
  }, {
    label: 'Анализ данных',
    state: 'next'
  }, {
    label: 'Финальный проект',
    state: 'locked'
  }];
  const colors = {
    done: {
      bg: 'var(--v2-success)',
      ring: 'var(--v2-success-50)',
      text: '#fff'
    },
    current: {
      bg: 'var(--v2-accent-orange)',
      ring: 'var(--v2-tint-orange)',
      text: '#fff'
    },
    next: {
      bg: '#fff',
      ring: 'var(--v2-border-1)',
      text: 'var(--v2-fg-2)'
    },
    locked: {
      bg: 'var(--v2-bg-muted)',
      ring: 'var(--v2-border-1)',
      text: 'var(--v2-fg-3)'
    }
  };
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-teal)'
    }
  }, "\u0422\u0440\u0430\u0435\u043A\u0442\u043E\u0440\u0438\u044F \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044F"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-xs font-semibold",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u2192")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginBottom: 4
    }
  }, "Junior \u2192 Middle Analyst"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--v2-fg-2)'
    }
  }, "2 \u0438\u0437 5 \u0448\u0430\u0433\u043E\u0432 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E \xB7 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u0440\u0435\u0432\u044C\u044E \u0441 \u043C\u0435\u043D\u0442\u043E\u0440\u043E\u043C 18 \u043C\u0430\u0440\u0442\u0430"), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-5 left-5 right-5 h-0.5",
    style: {
      background: 'var(--v2-border-1)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-5 left-5 h-0.5",
    style: {
      width: '40%',
      background: 'linear-gradient(90deg, var(--v2-success), var(--v2-accent-orange))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 relative"
  }, steps.map((s, i) => {
    const c = colors[s.state];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "flex flex-col items-center text-center px-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-full flex items-center justify-center font-bold relative",
      style: {
        width: 40,
        height: 40,
        background: c.bg,
        color: c.text,
        border: `4px solid ${c.ring}`,
        fontSize: 14
      }
    }, s.state === 'done' ? /*#__PURE__*/React.createElement("i", {
      "data-lucide": "check",
      style: {
        width: 16,
        height: 16
      }
    }) : s.state === 'locked' ? /*#__PURE__*/React.createElement("i", {
      "data-lucide": "lock",
      style: {
        width: 14,
        height: 14
      }
    }) : i + 1), /*#__PURE__*/React.createElement("div", {
      className: "mt-2",
      style: {
        fontSize: 11,
        fontWeight: s.state === 'current' ? 700 : 500,
        color: s.state === 'locked' ? 'var(--v2-fg-3)' : 'var(--v2-fg-1)',
        maxWidth: 90,
        lineHeight: 1.3
      }
    }, s.label), s.state === 'current' && /*#__PURE__*/React.createElement("div", {
      className: "mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
      style: {
        background: 'var(--v2-tint-orange)',
        color: 'var(--v2-accent-orange)'
      }
    }, "\u0441\u0435\u0439\u0447\u0430\u0441"));
  }))));
}

// Upcoming events
function UpcomingEvents() {
  const events = [{
    day: '14',
    mon: 'мар',
    title: 'Вебинар: культура обратной связи',
    time: '14:00 · онлайн',
    tag: 'live',
    color: 'var(--v2-accent-pink)'
  }, {
    day: '18',
    mon: 'мар',
    title: 'Ревью с ментором',
    time: '11:30 · MS Teams',
    tag: '1:1',
    color: 'var(--v2-accent-violet)'
  }, {
    day: '22',
    mon: 'мар',
    title: 'Тимбилдинг: командные игры',
    time: '17:00 · офис',
    tag: 'офис',
    color: 'var(--v2-accent-teal)'
  }];
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-violet)'
    }
  }, "\u0411\u043B\u0438\u0436\u0430\u0439\u0448\u0438\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 2
    }
  }, "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-xs font-semibold",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u0412\u0441\u0435 \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, events.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex items-center gap-3 p-3 rounded-xl transition cursor-pointer hover:bg-[var(--v2-bg-muted)]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center rounded-xl shrink-0 py-2 px-3",
    style: {
      background: 'var(--v2-bg-muted)',
      minWidth: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      lineHeight: 1
    }
  }, e.day), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: 'var(--v2-fg-3)',
      textTransform: 'uppercase',
      marginTop: 2
    }
  }, e.mon)), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
    style: {
      background: `color-mix(in srgb, ${e.color} 12%, white)`,
      color: e.color
    }
  }, e.tag)), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 truncate",
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--v2-fg-1)'
    }
  }, e.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--v2-fg-3)'
    }
  }, e.time))))));
}

// Leaderboard widget
function Leaderboard() {
  const me = {
    rank: 7,
    name: 'Вы (Aziz K.)',
    pts: 1250
  };
  const top = [{
    rank: 1,
    name: 'Madina Saidova',
    pts: 3420,
    dept: 'HR'
  }, {
    rank: 2,
    name: 'Bekhzod Karimov',
    pts: 2980,
    dept: 'Sales'
  }, {
    rank: 3,
    name: 'Nigora Rakhimova',
    pts: 2710,
    dept: 'IT'
  }];
  const medal = ['🥇', '🥈', '🥉'];
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: '#D97706'
    }
  }, "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043C\u0430\u0440\u0442\u0430"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 2
    }
  }, "\u041B\u0438\u0434\u0435\u0440\u044B")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-xs font-semibold",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u041F\u043E\u043B\u043D\u044B\u0439 \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u2192")), /*#__PURE__*/React.createElement("ol", {
    className: "space-y-2"
  }, top.map(p => /*#__PURE__*/React.createElement("li", {
    key: p.rank,
    className: "flex items-center gap-3 p-2.5 rounded-xl",
    style: {
      background: p.rank === 1 ? 'linear-gradient(90deg, var(--v2-tint-amber), transparent)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      lineHeight: 1,
      width: 28,
      textAlign: 'center'
    }
  }, medal[p.rank - 1]), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--v2-fg-1)'
    },
    className: "truncate"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, p.dept)), /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: '#D97706'
    }
  }, p.pts.toLocaleString())))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t flex items-center gap-3",
    style: {
      borderColor: 'var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
    style: {
      background: 'var(--v2-primary)',
      color: '#fff'
    }
  }, me.rank), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--v2-fg-1)'
    }
  }, me.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, "+120 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u043F\u043E\u0434\u043D\u044F\u043B\u0438\u0441\u044C \u043D\u0430 2 \u043F\u043E\u0437\u0438\u0446\u0438\u0438")), /*#__PURE__*/React.createElement("div", {
    className: "v2-num",
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: 'var(--v2-fg-1)'
    }
  }, me.pts.toLocaleString())));
}

// Achievements
function Achievements() {
  const items = [{
    icon: 'rocket',
    title: 'Быстрый старт',
    date: 'Получено 14 фев',
    got: true
  }, {
    icon: 'target',
    title: 'Меткий стрелок',
    date: 'Сдан тест на 100%',
    got: true
  }, {
    icon: 'trophy',
    title: 'Покоритель курсов',
    date: '3 курса за месяц',
    got: true
  }, {
    icon: 'flame',
    title: 'Серия 14 дней',
    date: 'осталось 4 дня',
    got: false
  }];
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow",
    style: {
      color: 'var(--v2-accent-orange)'
    }
  }, "\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: 'var(--v2-fg-1)',
      marginTop: 2
    }
  }, "3 \u0438\u0437 24 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, items.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "p-3 rounded-xl text-center transition",
    style: {
      background: a.got ? 'var(--v2-bg-muted)' : '#fff',
      border: '1px solid var(--v2-border-1)',
      opacity: a.got ? 1 : 0.55
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": a.icon,
    style: {
      width: 22,
      height: 22,
      color: a.got ? 'var(--v2-primary)' : 'var(--v2-fg-3)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--v2-fg-1)',
      marginTop: 4
    }
  }, a.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--v2-fg-3)',
      marginTop: 2
    }
  }, a.date)))));
}

// Course catalog card — neutral cover with category as typography
function CourseCardV2({
  course,
  onOpen
}) {
  const covers = {
    safety: {
      variant: 'navy',
      label: 'Compliance'
    },
    cyber: {
      variant: 'navy',
      label: 'Security'
    },
    leadership: {
      variant: 'paper',
      label: 'Soft skills'
    },
    customer: {
      variant: 'warm',
      label: 'Customer care'
    },
    excel: {
      variant: 'slate',
      label: 'Analytics'
    },
    onboarding: {
      variant: 'paper',
      label: 'Onboarding'
    }
  };
  const c = covers[course.theme] || covers.leadership;
  const dark = c.variant === 'navy' || c.variant === 'slate';
  const labelColor = dark ? 'rgba(255,255,255,0.7)' : 'var(--v2-fg-3)';
  const titleColor = dark ? '#FFFFFF' : 'var(--v2-fg-1)';
  return /*#__PURE__*/React.createElement(WidgetCard, {
    className: "overflow-hidden flex flex-col h-full transition cursor-pointer hover:shadow-md",
    style: {
      borderColor: 'var(--v2-border-1)'
    },
    onClick: onOpen
  }, /*#__PURE__*/React.createElement("div", {
    className: `v2-cover v2-cover--${c.variant} h-32`
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-cover-label",
    style: {
      color: labelColor
    }
  }, c.label), /*#__PURE__*/React.createElement("div", {
    className: "v2-cover-title",
    style: {
      color: titleColor
    }
  }, course.title), course.required && /*#__PURE__*/React.createElement("span", {
    className: "absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
    style: {
      background: 'var(--v2-danger)',
      color: '#fff',
      borderRadius: 4
    }
  }, "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E"), course.new && !course.required && /*#__PURE__*/React.createElement("span", {
    className: "absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
    style: {
      background: '#fff',
      color: 'var(--v2-fg-1)',
      border: '1px solid var(--v2-border-2)',
      borderRadius: 4
    }
  }, "\u041D\u043E\u0432\u044B\u0439")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 flex-1 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--v2-fg-3)'
    }
  }, course.category), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--v2-border-2)'
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--v2-fg-3)'
    }
  }, course.duration)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--v2-fg-1)',
      lineHeight: 1.35,
      letterSpacing: '-0.005em'
    }
  }, course.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--v2-fg-2)',
      marginTop: 4,
      lineHeight: 1.5
    },
    className: "line-clamp-2"
  }, course.desc), /*#__PURE__*/React.createElement("div", {
    className: "mt-auto pt-4"
  }, course.progress != null ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--v2-fg-2)'
    }
  }, course.progress, "% \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u043E"), /*#__PURE__*/React.createElement("span", {
    className: "v2-num",
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--v2-fg-3)'
    }
  }, "+", course.points, " \u0431\u0430\u043B\u043B\u043E\u0432")), /*#__PURE__*/React.createElement("div", {
    className: "h-1 rounded-full overflow-hidden",
    style: {
      background: 'var(--v2-border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full rounded-full",
    style: {
      width: `${course.progress}%`,
      background: course.required ? 'var(--v2-accent)' : 'var(--v2-primary)'
    }
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-num",
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--v2-fg-3)'
    }
  }, "+", course.points, " \u0431\u0430\u043B\u043B\u043E\u0432"), /*#__PURE__*/React.createElement("button", {
    className: "text-xs font-semibold flex items-center gap-1",
    style: {
      color: 'var(--v2-primary)'
    }
  }, "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-right",
    style: {
      width: 12,
      height: 12
    }
  }))))));
}
window.WidgetCard = WidgetCard;
window.ContinueLearning = ContinueLearning;
window.StatTile = StatTile;
window.LearningPath = LearningPath;
window.UpcomingEvents = UpcomingEvents;
window.Leaderboard = Leaderboard;
window.Achievements = Achievements;
window.CourseCardV2 = CourseCardV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web_app_v2/Widgets.jsx", error: String((e && e.message) || e) }); }

})();
