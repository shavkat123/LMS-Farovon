# Power Automate flows для H5P интеграции

Этот документ описывает Power Automate flows, которые нужно создать вручную в [make.powerautomate.com](https://make.powerautomate.com) — Claude Code не работает с Power Automate напрямую.

В составе H5P интеграции потенциально нужны **два flow**:

1. **`H5P xAPI to Dataverse`** — обновляет timestamp + уведомляет наставника при успешном прохождении (TZ §4)
2. **`H5P File Extraction`** — критичный архитектурный flow для распаковки `.h5p` файла (НЕ был в исходном TZ, но без него плеер не работает; см. §0 ниже)

---

## §0. Критичная архитектурная заметка — распаковка `.h5p`

**Проблема.** Библиотека `h5p-standalone` v3.8.2 (которую использует `H5P Player` web-template) **не умеет читать `.h5p` файлы напрямую**. Она ожидает уже распакованную папку:

```
<h5pJsonPath>/
├── h5p.json                # манифест контента
├── content/
│   └── content.json        # данные конкретного контента
└── H5P.InteractiveVideo-1.27/    # библиотеки-зависимости
    ├── library.json
    ├── ...
└── ... (остальные библиотеки)
```

`.h5p` файл — это просто ZIP-архив с этой структурой внутри. Когда HR/Наставник загружает `.h5p` через форму на `/h5p-upload`, файл попадает в Dataverse как бинарный blob в поле `new_h5pcontent.new_h5pfile`. Плеер на `/h5p-lesson?id=<contentId>` тогда не может его отрисовать — он пытается сделать `fetch('/h5p-content/<contentId>/h5p.json')`, который возвращает 404.

**Варианты решения** (выбрать один и реализовать):

### Вариант A — Azure Blob Storage (рекомендуется для прод)

Один раз создаётся:
- Storage account в Azure (cheap tier)
- Container `h5p-content` с public read access (или signed URLs если нужна приватность)

Power Automate flow `H5P File Extraction` срабатывает на создание/обновление записи `new_h5pcontent`:
1. **Trigger**: When a row is added/modified — table `H5P Content` (`new_h5pcontent`)
2. **Get file content**: Get a file column value action — column `new_h5pfile`
3. **Extract ZIP** (через action "Extract archive" в стандартном connector "Filesystem" если внутри Power Platform, или через Azure Function HTTP call)
4. **Upload extracted files to Blob**: Loop через `extracted entries` → "Create blob" в `h5p-content/<new_h5pcontentid>/<entryPath>`
5. **Update record**: записать в `new_h5pcontent.new_extractedurl` (нужно добавить колонку) URL базового пути в Blob
6. **Liquid plays**: в `H5P-Player.webtemplate.source.html` заменить placeholder `var h5pContentBase = '/h5p-content/' + contentId;` на `var h5pContentBase = '{{ content.new_extractedurl }}';`

Плюсы: масштабируемо, стандартно, кэшируется CDN.
Минусы: extra Azure билл (минимальный), нужен access key в flow.

### Вариант B — Pre-extracted web-files

Админ распаковывает `.h5p` файлы на своей машине, получает папки и руками деплоит как web-files в Power Pages. Один контент = десятки web-file записей.

Плюсы: не требует Azure, всё внутри Power Pages.
Минусы: muito muito muito ручной труд, не масштабируется, deploy через `pac pages upload` каждый раз.

### Вариант C — Power Pages "Web Resources" + custom endpoint

Создать Power Automate HTTP-triggered flow, который при GET `/h5p-content/<contentId>/<path>`:
1. Читает `new_h5pfile` из Dataverse
2. Распаковывает ZIP в памяти
3. Отдаёт нужный entry как HTTP response

Плюсы: ленивая распаковка, без Azure.
Минусы: каждый запрос H5P библиотеки (а их десятки на загрузку) триггерит flow, медленно, дорого по APIM лимитам.

**Рекомендация:** для MVP — Вариант B с одним тестовым H5P контентом. Для прод — Вариант A.

---

## §1. Flow `H5P xAPI to Dataverse` (нотификация + timestamp)

Этот flow срабатывает когда новая запись `new_h5pprogress` создаётся (через xAPI POST из плеера) и отправляет email наставнику если стажёр успешно прошёл урок.

### Шаг 1. Создать flow

1. https://make.powerautomate.com → выбрать окружение **genunmanagedenv**
2. **+ Create** → **Automated cloud flow**
3. **Name**: `H5P xAPI to Dataverse`
4. **Trigger**: `When a row is added, modified, or deleted` (Microsoft Dataverse)
   - **Change type**: Added
   - **Table name**: `H5P Progress` (`new_h5pprogress`)
   - **Scope**: Organization
   - **Filter rows**: оставить пустым

### Шаг 2. Условие "успешное прохождение"

Добавить **Condition**:
- `triggerOutputs()?['body/new_completion']` is equal to `true`
- AND `triggerOutputs()?['body/new_scorescaled']` is greater than or equal to `0.7`

### Шаг 3. Если Yes — нотификация наставнику

Внутри ветки **If yes**:

3.1. **Get a row by ID** — table `Contacts`, Row ID = `triggerOutputs()?['body/_new_user_value']`
- Получаем стажёра, у которого должен быть указан наставник.
- *Предполагается, что в `contact` есть lookup-поле на наставника. Если нет — добавить или использовать `parentcustomerid`.*

3.2. **Get a row by ID** — table `Contacts`, Row ID = `outputs('Get_a_row_by_ID')?['body/_<mentor_lookup>_value']`
- Получаем наставника.

3.3. **Send an email (V2)** (Office 365 Outlook):
- **To**: наставник `email`
- **Subject**: `Стажёр {{trainee.fullname}} прошёл H5P урок`
- **Body**:
  ```
  Здравствуйте, {{mentor.firstname}}!
  
  Стажёр {{trainee.fullname}} успешно прошёл H5P урок.
  Балл: {{scorescaled * 100}}%.
  Время: {{utcnow}}.
  
  Подробности: https://genunmanagedenv.crm4.dynamics.com/h5p-progress
  ```

### Шаг 4. Обновить timestamp (всегда — вне условия)

После Condition (на основном уровне):

**Update a row** — table `H5P Progress`, Row ID = `triggerOutputs()?['body/new_h5pprogressid']`:
- `new_lastupdated`: `utcNow()`

### Шаг 5. Сохранить и активировать

**Save** → **Test** (вручную создать тестовую запись `new_h5pprogress` с `new_completion=true`, `new_scorescaled=0.85`) → **Turn on**.

---

## Чек-лист после настройки

- [ ] Создана колонка mentor lookup на `contact` (или решено использовать `parentcustomerid`)
- [ ] Flow `H5P xAPI to Dataverse` создан, протестирован и включён
- [ ] Принято решение по архитектуре распаковки `.h5p` (Вариант A / B / C)
- [ ] Если Вариант A: создан Storage Account + создан flow `H5P File Extraction`
- [ ] Если Вариант B: задокументирован процесс ручной распаковки и деплоя
- [ ] В `H5P-Player.webtemplate.source.html` обновлён `h5pContentBase` под выбранный вариант
- [ ] Сделан end-to-end тест: HR загружает `.h5p` → стажёр проходит урок → наставник получает email
