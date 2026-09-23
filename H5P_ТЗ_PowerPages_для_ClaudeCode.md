# Техническое задание для Claude Code

# H5P Interactive Video в Power Pages LMS-Farovon

## 1. Контекст проекта

У меня есть существующий Power Pages сайт, экспортированный через Power Platform CLI. Структура проекта:

```
lms-farovon---lms-farovon/
├── web-pages/         # 35 страниц (включая onboarding, my-adaptation, view-course-details)
├── web-templates/     # 62 Liquid шаблона
├── web-files/         # Статика (CSS, JS, изображения)
├── basic-forms/       # Формы CRUD для Dataverse
├── content-snippets/  # Контентные сниппеты (i18n)
├── table-permissions/ # Права на Dataverse таблицы
├── lists/             # Списки записей
├── webrole.yml        # Роли: HR, Наставник, Руководитель, Новый сотрудник
├── website.yml        # Конфигурация сайта
└── sitesetting.yml    # Настройки
```

Сайт уже использует:
- **Авторизацию через Azure AD** (настроена)
- **Dataverse таблицы**: `msdynce_course`, `msdynce_registration`, `contact`, `adx_webrole`
- **Liquid шаблоны** с FetchXML запросами к Dataverse
- **Bootstrap 5** для верстки
- **Web Roles** для разграничения доступа
- **Table Permissions** для каждой таблицы

**Пример существующего Liquid шаблона** из проекта (`web-templates/view-course-details/View-Course-Details.webtemplate.source.html`):

```liquid
{% if request.params['id'] and request.IsPreview != true %}
{% assign courseid = request.params['id'] | xml_escape %}
{% fetchxml courseselected %}
<fetch>
  <entity name="msdynce_course">
    <attribute name="msdynce_coursename" />
    <attribute name="msdynce_coursedescription" />
    <filter>
      <condition attribute="msdynce_courseid" operator="eq" value="{{courseid}}" />
    </filter>
  </entity>
</fetch>
{% endfetchxml %}
{% endif %}
```

## 2. Цель работ

Добавить в существующий портал поддержку **H5P Interactive Video** — видео с интерактивными вопросами по ходу просмотра. Использовать open-source библиотеку **h5p-standalone** (https://github.com/tunapanda/h5p-standalone).

Сценарий использования:
1. HR/Наставник создаёт `.h5p` файл в Lumi Desktop, загружает в портал
2. Новый сотрудник открывает страницу урока, видит интерактивное видео
3. На определённых временных метках видео паузится → появляется вопрос
4. После ответа продолжается, прогресс сохраняется в Dataverse через xAPI

## 3. Что нужно создать

### 3.1 Dataverse таблицы (подготовить solution для импорта)

Так как Claude Code не может напрямую создавать Dataverse таблицы, нужно подготовить **`solution.zip`** который пользователь импортирует через `pac solution import` или через make.powerapps.com.

**Таблица 1: H5P Content (`cr_h5pcontent`)**

Поля:
- `cr_h5pcontentid` — Primary key (GUID, автоматически)
- `cr_name` — Текст 200, обязательное (название контента)
- `cr_description` — Многострочный текст, опционально
- `cr_h5pfile` — File field, обязательное (хранит .h5p файл)
- `cr_librarytype` — Текст 100 (например "H5P.InteractiveVideo")
- `cr_durationseconds` — Число, опционально
- `cr_uploadedby` — Lookup на `contact`, обязательное
- `cr_relatedcourse` — Lookup на `msdynce_course`, опционально
- `cr_isactive` — Yes/No, default Yes

**Таблица 2: H5P Progress (`cr_h5pprogress`)**

Поля:
- `cr_h5pprogressid` — Primary key
- `cr_name` — Текст (для display, например "John Doe — Урок 1")
- `cr_user` — Lookup на `contact`, обязательное
- `cr_h5pcontent` — Lookup на `cr_h5pcontent`, обязательное
- `cr_scoreraw` — Decimal
- `cr_scoremax` — Decimal
- `cr_scorescaled` — Decimal (0.0–1.0)
- `cr_completion` — Yes/No, default No
- `cr_success` — Yes/No, default No
- `cr_durationseconds` — Число
- `cr_attempts` — Число, default 1
- `cr_lastposition` — Decimal (секунды)
- `cr_xapistatements` — Многострочный текст (JSON массив)
- `cr_lastupdated` — Дата и время

**Связь между таблицами:** `cr_h5pcontent` (1) → `cr_h5pprogress` (N) — один контент, много прогрессов от разных пользователей.

**Что подготовить Claude Code:**
- Папка `solution/` с `Solution.xml`, `Customizations.xml`, `[Content_Types].xml`
- Структура совместимая с импортом через `pac solution import`
- README.md с пошаговой инструкцией для пользователя как импортировать solution

### 3.2 Web Templates (Liquid шаблоны)

Создать три новых файла **строго по структуре существующих шаблонов**:

#### 3.2.1 `web-templates/h5p-player/`

Файлы:
- `H5P-Player.webtemplate.yml` — метаданные (по образцу `web-templates/view-course-details/View-Course-Details.webtemplate.yml`)
- `H5P-Player.webtemplate.source.html` — Liquid логика

Содержимое `H5P-Player.webtemplate.source.html`:

```liquid
{% if request.params['id'] %}
{% assign contentid = request.params['id'] | xml_escape %}

{% fetchxml h5pcontent %}
<fetch>
  <entity name="cr_h5pcontent">
    <attribute name="cr_name" />
    <attribute name="cr_description" />
    <attribute name="cr_h5pfile" />
    <attribute name="cr_librarytype" />
    <attribute name="cr_durationseconds" />
    <filter>
      <condition attribute="cr_h5pcontentid" operator="eq" value="{{contentid}}" />
    </filter>
  </entity>
</fetch>
{% endfetchxml %}

{% if h5pcontent.results.entities.size > 0 %}
{% assign content = h5pcontent.results.entities[0] %}

<div class="h5p-player-wrapper">
  <h2>{{ content.cr_name }}</h2>
  <div id="h5p-container-{{contentid}}" class="h5p-container"></div>
</div>

<link rel="stylesheet" href="/h5p-styles/h5p.css">
<script src="/h5p-frame.bundle.js"></script>

<script>
(function() {
  var contentId = '{{contentid}}';
  var fileUrl = '{{ content.cr_h5pfile.Url }}'; // URL к .h5p файлу из Dataverse
  var userId = '{{ user.contactid }}';
  
  // Инициализация h5p-standalone
  new H5PStandalone.H5P(
    document.getElementById('h5p-container-' + contentId),
    {
      h5pJsonPath: fileUrl,
      frameJs: '/h5p-frame.bundle.js',
      frameCss: '/h5p-styles/h5p.css'
    }
  ).then(function(h5pInstance) {
    h5pInstance.on('xAPI', function(event) {
      var statement = event.data.statement;
      sendXAPIToWebApi(contentId, userId, statement);
    });
  });
  
  function sendXAPIToWebApi(contentId, userId, statement) {
    var token = "{{ request.params['__RequestVerificationToken'] }}";
    fetch('/_api/cr_h5pprogresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        '__RequestVerificationToken': token
      },
      body: JSON.stringify({
        'cr_user@odata.bind': '/contacts(' + userId + ')',
        'cr_h5pcontent@odata.bind': '/cr_h5pcontents(' + contentId + ')',
        'cr_scoreraw': statement.result ? statement.result.score.raw : null,
        'cr_scoremax': statement.result ? statement.result.score.max : null,
        'cr_scorescaled': statement.result ? statement.result.score.scaled : null,
        'cr_completion': statement.result ? statement.result.completion : false,
        'cr_xapistatements': JSON.stringify(statement)
      })
    }).then(function(r) {
      console.log('xAPI saved:', r.status);
    }).catch(function(e) {
      console.error('xAPI save failed:', e);
    });
  }
})();
</script>
{% else %}
<div class="alert alert-warning">H5P контент не найден</div>
{% endif %}
{% endif %}
```

#### 3.2.2 `web-templates/h5p-upload/`

Liquid шаблон с формой для HR и Наставника. Использует `basic-form` для записи в `cr_h5pcontent`:

```liquid
{% unless user.roles contains 'HR' or user.roles contains 'Наставник' or user.roles contains 'Administrators' %}
<div class="alert alert-danger">Доступ запрещён</div>
{% else %}

<h2>Загрузка H5P контента</h2>
{% include 'BasicForm' key:'h5p-upload-form' %}

<div class="alert alert-info mt-3">
  <strong>Как создать .h5p файл:</strong>
  <ol>
    <li>Скачайте Lumi Desktop с <a href="https://lumi.education" target="_blank">lumi.education</a></li>
    <li>Создайте Interactive Video с вопросами</li>
    <li>Экспортируйте как .h5p файл</li>
    <li>Загрузите файл через форму выше</li>
  </ol>
</div>

{% endunless %}
```

#### 3.2.3 `web-templates/h5p-progress-list/`

Шаблон для Наставника — показывает прогресс его стажёров по H5P урокам:

```liquid
{% unless user.roles contains 'Наставник' or user.roles contains 'HR' or user.roles contains 'Administrators' %}
<div class="alert alert-danger">Доступ запрещён</div>
{% else %}

{% fetchxml progress %}
<fetch>
  <entity name="cr_h5pprogress">
    <attribute name="cr_name" />
    <attribute name="cr_user" />
    <attribute name="cr_h5pcontent" />
    <attribute name="cr_scorescaled" />
    <attribute name="cr_completion" />
    <attribute name="cr_lastupdated" />
    <order attribute="cr_lastupdated" descending="true" />
  </entity>
</fetch>
{% endfetchxml %}

<table class="table">
  <thead>
    <tr>
      <th>Стажёр</th>
      <th>Урок</th>
      <th>Балл</th>
      <th>Завершён</th>
      <th>Обновлено</th>
    </tr>
  </thead>
  <tbody>
    {% for p in progress.results.entities %}
    <tr>
      <td>{{ p.cr_user.name }}</td>
      <td>{{ p.cr_h5pcontent.name }}</td>
      <td>{% if p.cr_scorescaled %}{{ p.cr_scorescaled | times: 100 | round }}%{% else %}—{% endif %}</td>
      <td>{% if p.cr_completion %}<span class="badge bg-success">Да</span>{% else %}<span class="badge bg-secondary">Нет</span>{% endif %}</td>
      <td>{{ p.cr_lastupdated | date: 'dd.MM.yyyy HH:mm' }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

{% endunless %}
```

### 3.3 Web Pages

Создать три страницы в `web-pages/`. Каждая папка должна содержать:
- `[PageName].webpage.yml` — метаданные
- `[PageName].webpage.copy.html` — основной HTML (использует `{% include %}`)
- `[PageName].webpage.custom_css.css` — кастомный CSS
- `[PageName].webpage.custom_javascript.js` — кастомный JS
- `content-pages/[PageName].en-US.webpage.copy.html` — локализованный контент

**По образцу `web-pages/view-course-details/`** — полностью повторить структуру.

#### 3.3.1 `web-pages/h5p-lesson/`

URL: `/h5p-lesson?id={contentId}`
Подключает шаблон `H5P Player`. Доступ: все аутентифицированные пользователи.

#### 3.3.2 `web-pages/h5p-upload/`

URL: `/h5p-upload`
Подключает шаблон `H5P Upload`. Доступ: только HR, Наставник, Administrators.

#### 3.3.3 `web-pages/h5p-progress/`

URL: `/h5p-progress`
Подключает шаблон `H5P Progress List`. Доступ: только Наставник, HR, Administrators.

### 3.4 Web Files (h5p-standalone)

Скачать с https://github.com/tunapanda/h5p-standalone/releases последнюю версию и положить в `web-files/`:

- `h5p-frame.bundle.js` (главный JS файл библиотеки)
- `h5p.css` (стили)
- Папка `fonts/` (если есть в дистрибутиве)

Каждый файл должен сопровождаться `[filename].webfile.yml`. Образец взять из существующих `web-files/bootstrap.min.css.webfile.yml`.

### 3.5 Table Permissions

Создать четыре файла в `table-permissions/` по образцу существующих:

#### `H5P-Content-Read.tablepermission.yml`

Read доступ к `cr_h5pcontent` для всех Authenticated Users.

#### `H5P-Content-Write.tablepermission.yml`

Create/Write/Delete для ролей HR, Наставник, Administrators.

#### `H5P-Progress-Self.tablepermission.yml`

Создание и чтение **только своих** записей `cr_h5pprogress` для роли Новый сотрудник. Использовать `adx_scope: 756150004` (Self).

#### `H5P-Progress-Mentor.tablepermission.yml`

Чтение записей прогресса своих стажёров для роли Наставник. Использовать `adx_scope: 756150001` (Contact).

### 3.6 Basic Form для загрузки

Создать `basic-forms/h5p-upload-form/`:
- `H5P-Upload-Form.basicform.yml` — конфигурация формы
- `H5P-Upload-Form.basicform.basicformmetadata.yml` — метаданные полей

Форма должна быть привязана к таблице `cr_h5pcontent`, mode = Insert. Поля: `cr_name`, `cr_description`, `cr_h5pfile`, `cr_relatedcourse`. Образец взять из `basic-forms/edit-attendee/`.

### 3.7 Site Markers и Web Page Rules

Если нужно — добавить новые маркеры в `sitemarker.yml` для удобной ссылки из меню навигации.

## 4. Power Automate flow (отдельная инструкция)

Так как Claude Code не работает с Power Automate напрямую, **подготовить только инструкцию** в файле `POWER_AUTOMATE_FLOW.md`:

Описание flow "H5P xAPI to Dataverse":
1. Trigger: When a row is added in Dataverse table `cr_h5pprogress`
2. Action 1: Если `cr_completion = true` И `cr_scorescaled >= 0.7` — отправить email наставнику стажёра
3. Action 2: Обновить запись `cr_h5pprogress` — установить `cr_lastupdated = utcNow()`

Подробные шаги создания flow в make.powerautomate.com со скриншотами полей.

## 5. Acceptance Criteria

После завершения работ должны работать сценарии:

1. **Импорт solution с таблицами** — пользователь импортирует подготовленный solution.zip через make.powerapps.com и видит таблицы `cr_h5pcontent` и `cr_h5pprogress` в Dataverse.

2. **Загрузка контента**: HR логинится → переходит на `/h5p-upload` → загружает .h5p файл → видит подтверждение.

3. **Прохождение урока**: Новый сотрудник переходит по ссылке `/h5p-lesson?id={contentId}` → видит интерактивное видео → на 2:14 появляется вопрос → отвечает → видео продолжается.

4. **Сохранение прогресса**: После завершения видео в таблице `cr_h5pprogress` появляется запись с `cr_completion=true` и `cr_scorescaled` от 0 до 1.

5. **Просмотр прогресса**: Наставник на `/h5p-progress` видит таблицу с прогрессом стажёров.

6. **Безопасность**: Новый сотрудник не может открыть `/h5p-upload` (получает "Доступ запрещён"). Не может видеть чужой прогресс.

## 6. Структура изменений

```
lms-farovon---lms-farovon/
├── solution/                                    [НОВАЯ ПАПКА]
│   ├── Solution.xml
│   ├── Customizations.xml
│   ├── [Content_Types].xml
│   └── README.md
├── web-pages/
│   ├── h5p-lesson/                              [НОВАЯ]
│   ├── h5p-upload/                              [НОВАЯ]
│   └── h5p-progress/                            [НОВАЯ]
├── web-templates/
│   ├── h5p-player/                              [НОВАЯ]
│   ├── h5p-upload/                              [НОВАЯ]
│   └── h5p-progress-list/                       [НОВАЯ]
├── web-files/
│   ├── h5p-frame.bundle.js                      [НОВЫЙ]
│   ├── h5p-frame.bundle.js.webfile.yml          [НОВЫЙ]
│   ├── h5p.css                                  [НОВЫЙ]
│   └── h5p.css.webfile.yml                      [НОВЫЙ]
├── basic-forms/
│   └── h5p-upload-form/                         [НОВАЯ]
├── table-permissions/
│   ├── H5P-Content-Read.tablepermission.yml     [НОВЫЙ]
│   ├── H5P-Content-Write.tablepermission.yml    [НОВЫЙ]
│   ├── H5P-Progress-Self.tablepermission.yml    [НОВЫЙ]
│   └── H5P-Progress-Mentor.tablepermission.yml  [НОВЫЙ]
└── POWER_AUTOMATE_FLOW.md                       [НОВЫЙ — инструкция]
```

## 7. Порядок выполнения

1. Сначала подготовить `solution/` папку с XML для Dataverse таблиц + README с инструкцией
2. Дождаться от пользователя подтверждения что таблицы созданы в Dataverse
3. После этого создавать web-templates, web-pages, web-files, table-permissions
4. В конце создать `POWER_AUTOMATE_FLOW.md` с инструкцией для пользователя

## 8. Критически важные правила

1. **Не сломай существующие файлы** — все изменения только аддитивные. Существующие 35 страниц должны продолжать работать.

2. **Соблюдай Power Pages соглашения** — структура папок, формат YAML, имена файлов должны точно соответствовать существующим в проекте. Брать образцы из `web-pages/view-course-details/` и `web-templates/view-course-details/`.

3. **Используй существующие GUID для ролей** из `webrole.yml`:
   - HR: `a1b2c3d4-1111-2222-3333-000000000001`
   - Наставник: `a1b2c3d4-1111-2222-3333-000000000002`
   - Руководитель: `a1b2c3d4-1111-2222-3333-000000000003`
   - Новый сотрудник: `a1b2c3d4-1111-2222-3333-000000000004`
   - Authenticated Users: `2ccfddf9-a538-f111-88b5-7ced8d76b3cc`

4. **Префикс таблиц `cr_`** — стандартный для кастомных таблиц в Dataverse. Если у пользователя другой prefix (`new_`, `lms_`) — спросить и заменить во всех местах.

5. **Web API Authentication** — все вызовы к Dataverse Web API из JS требуют `__RequestVerificationToken`. Использовать стандартный pattern из документации Power Pages.

6. **Нагрузочные ограничения** — Power Pages Web API имеет лимит 1000 запросов на пользователя в минуту. xAPI события отправлять с throttling (не чаще раза в 5 секунд).

## 9. Команды для деплоя

После завершения работ пользователь применит изменения командами:

```bash
# Импорт solution с таблицами
pac solution import --path ./solution.zip

# Загрузка изменений сайта
pac pages upload --path ./lms-farovon---lms-farovon

# Очистка кэша портала (через make.powerpages.microsoft.com)
```
