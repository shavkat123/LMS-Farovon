# Power Automate flows для H5P интеграции

Этот документ описывает Power Automate flows, которые нужно создать вручную в [make.powerautomate.com](https://make.powerautomate.com) — Claude Code не работает с Power Automate напрямую.

В составе H5P интеграции нужны **два flow**:

1. **`H5P File to SharePoint`** — при загрузке `.h5p` файла: аннотация → распаковка → SharePoint → обновление записи (§0)
2. **`H5P xAPI to Dataverse`** — при успешном прохождении урока: обновляет timestamp + уведомляет наставника (§1)

---

## §0. Flow `H5P File to SharePoint` (загрузка и распаковка)

### Архитектура

При загрузке `.h5p` через форму на `/h5p-upload` Power Pages сохраняет файл как **аннотацию (Notes)** на записи `new_h5pcontent`. Flow перехватывает эту аннотацию, распаковывает `.h5p` (ZIP-архив) и загружает все файлы в **SharePoint Document Library**. Плеер на `/h5p-lesson?id=<contentId>` читает распакованные файлы напрямую из SharePoint по URL в поле `new_sharepointurl`.

```text
Пользователь → Basic Form (attach .h5p)
  → Dataverse: создаётся annotation на new_h5pcontent
  → [этот Flow срабатывает]
  → Извлекает ZIP в SharePoint: /sites/LMS-Content/h5p-content/<contentId>/h5p.json ...
  → Обновляет new_h5pcontent.new_sharepointurl = "<base URL папки>"
  → Удаляет аннотацию
  → H5P Player читает h5p.json, content/content.json и библиотеки прямо из SharePoint
```

### Предварительные требования

1. **SharePoint Document Management** включён для таблицы `new_h5pcontent`:

   - make.powerapps.com → Tables → H5P Content → Settings → Document management: включить
   - SharePoint site: `https://<your-tenant>.sharepoint.com/sites/LMS-Content`
   - Library `new_h5pcontent` создаётся автоматически при включении

2. **Connector для распаковки ZIP** — выбрать один из двух вариантов:

   - **Вариант E1 (Encodian, рекомендуется)**: premium connector, есть action "Extract Archive". Требует лицензию Encodian (~$10/мес или есть в некоторых E5 планах).
   - **Вариант E2 (Azure Function)**: бесплатный Consumption tier + небольшая Function (см. Приложение A).

3. **CORS в SharePoint**: чтобы h5p-standalone мог делать `fetch()` из браузера к SharePoint, нужно добавить домен Power Pages в список разрешённых источников SharePoint.

   - SharePoint Admin Center → Sharing → Allow sharing with external users OR
   - Настроить через PowerShell: `Set-SPOSite -Identity <site> -AllowDownloadingNonWebViewableFiles $true`
   - Альтернатива без CORS: проксировать запросы через Power Pages Liquid (сложнее).

### Шаг 1. Создать flow

1. [make.powerautomate.com](https://make.powerautomate.com) → выбрать окружение **genunmanagedenv**
2. **+ Create** → **Automated cloud flow**
3. **Name**: `H5P File to SharePoint`
4. **Trigger**: `When a row is added, modified, or deleted` (Microsoft Dataverse)
   - **Change type**: Added
   - **Table name**: `Notes` (`annotation`)
   - **Scope**: Organization

### Шаг 2. Проверить тип родительской записи

Добавить **Condition**:

```text
triggerOutputs()?['body/objecttypecode']  is equal to  new_h5pcontent
```

- **If No**: добавить action **Terminate** (Status: Succeeded) — аннотация к другой таблице, игнорируем.

### Шаг 3. Получить содержимое аннотации (ветка If Yes)

3.1. **Get a row by ID** — table `Notes`, Row ID = `triggerOutputs()?['body/annotationid']`

- В response получаем `documentbody` (base64), `filename`, `filesize`, `_objectid_value`.

3.2. Записать переменные:

- **Initialize variable** — Name: `contentId`, Type: String, Value: `outputs('Get_annotation')?['body/_objectid_value']`
- **Initialize variable** — Name: `spBaseUrl`, Type: String, Value: `https://<your-tenant>.sharepoint.com/sites/LMS-Content/h5p-content/@{variables('contentId')}`

### Шаг 4E1. Распаковать ZIP через Encodian

*(Используйте этот шаг ИЛИ Шаг 4E2)*

4.1. **Encodian: Decode Base64 to File**

- File: `outputs('Get_annotation')?['body/documentbody']`

4.2. **Encodian: Extract Archive**

- File: результат предыдущего шага
- В результате — массив `entries` с полями `Name` (путь внутри архива) и `Content` (base64 файла).

### Шаг 4E2. Распаковать ZIP через Azure Function

*(Используйте этот шаг ИЛИ Шаг 4E1)*

4.1. **HTTP** action:

- **Method**: POST
- **URI**: `https://<your-function-app>.azurewebsites.net/api/ExtractH5P`
- **Headers**: `{ "Content-Type": "application/json" }`
- **Body**:

  ```json
  {
    "base64": "@{outputs('Get_annotation')?['body/documentbody']}"
  }
  ```

Response: массив `[{ "name": "h5p.json", "content": "<base64>" }, ...]`

См. **Приложение A** для кода Azure Function.

### Шаг 5. Загрузить распакованные файлы в SharePoint

**Apply to each** по массиву `entries` из шага 4:

5.1. **SharePoint: Create file**

- **Site Address**: `https://<your-tenant>.sharepoint.com/sites/LMS-Content`
- **Folder Path**: `/h5p-content/@{variables('contentId')}/@{items('Apply_to_each')?['Name']}`
  *(SharePoint автоматически создаёт подпапки)*
- **File Name**: `@{last(split(items('Apply_to_each')?['Name'], '/'))}`
- **File Content**: `@{base64ToBinary(items('Apply_to_each')?['Content'])}`

### Шаг 6. Обновить запись new_h5pcontent

**Update a row** — table `H5P Content` (`new_h5pcontent`), Row ID = `variables('contentId')`:

- `new_sharepointurl`: `@{variables('spBaseUrl')}`
- `new_filename`: `outputs('Get_annotation')?['body/filename']`
- `new_filesize`: `outputs('Get_annotation')?['body/filesize']`

### Шаг 7. Удалить аннотацию

**Delete a row** — table `Notes`, Row ID = `triggerOutputs()?['body/annotationid']`

### Шаг 8. Сохранить и активировать

**Save** → **Test** (загрузить тестовый `.h5p` через форму) → проверить в SharePoint что файлы появились → проверить что `new_sharepointurl` заполнено → **Turn on**.

---

## §1. Flow `H5P xAPI to Dataverse` (нотификация + timestamp)

Этот flow срабатывает когда новая запись `new_h5pprogress` создаётся (через xAPI POST из плеера) и отправляет email наставнику если стажёр успешно прошёл урок.

### Шаг 1. Создать flow

1. [make.powerautomate.com](https://make.powerautomate.com) → выбрать окружение **genunmanagedenv**
2. **+ Create** → **Automated cloud flow**
3. **Name**: `H5P xAPI to Dataverse`
4. **Trigger**: `When a row is added, modified, or deleted` (Microsoft Dataverse)
   - **Change type**: Added
   - **Table name**: `H5P Progress` (`new_h5pprogress`)
   - **Scope**: Organization

### Шаг 2. Условие "успешное прохождение"

Добавить **Condition**:

- `triggerOutputs()?['body/new_completion']` is equal to `true`
- AND `triggerOutputs()?['body/new_scorescaled']` is greater than or equal to `0.7`

### Шаг 3. Если Yes — нотификация наставнику

Внутри ветки **If yes**:

3.1. **Get a row by ID** — table `Contacts`, Row ID = `triggerOutputs()?['body/_new_user_value']`

- Получаем стажёра.

3.2. **Get a row by ID** — table `Contacts`, Row ID = `outputs('Get_trainee')?['body/_parentcustomerid_value']`

- Получаем наставника (поле `parentcustomerid` или отдельный lookup — уточнить в make.powerapps.com).

3.3. **Send an email (V2)** (Office 365 Outlook):

- **To**: `outputs('Get_mentor')?['body/emailaddress1']`
- **Subject**: `Стажёр @{outputs('Get_trainee')?['body/fullname']} прошёл H5P урок`
- **Body**:

  ```text
  Здравствуйте, @{outputs('Get_mentor')?['body/firstname']}!

  Стажёр @{outputs('Get_trainee')?['body/fullname']} успешно прошёл H5P урок.
  Балл: @{mul(triggerOutputs()?['body/new_scorescaled'], 100)}%.
  Время: @{utcNow()}.

  Подробности: https://genunmanagedenv.powerappsportals.com/h5p-progress
  ```

### Шаг 4. Обновить timestamp (всегда — вне условия)

После Condition (на основном уровне):

**Update a row** — table `H5P Progress` (`new_h5pprogress`), Row ID = `triggerOutputs()?['body/new_h5pprogressid']`:

- `new_lastupdated`: `utcNow()`

### Шаг 5. Сохранить и активировать

**Save** → **Test** (создать тестовую запись `new_h5pprogress` с `new_completion=true`, `new_scorescaled=0.85`) → **Turn on**.

---

## Приложение A — Azure Function для распаковки .h5p

Если нет Encodian, создать Function App (Consumption tier, ~бесплатно до 1М вызовов):

**Язык**: JavaScript (Node.js 18)  
**Trigger**: HTTP trigger  
**Function name**: `ExtractH5P`

```javascript
const AdmZip = require('adm-zip');

module.exports = async function (context, req) {
    const base64 = req.body?.base64;
    if (!base64) {
        context.res = { status: 400, body: 'Missing base64' };
        return;
    }
    const buffer = Buffer.from(base64, 'base64');
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries()
        .filter(e => !e.isDirectory)
        .map(e => ({
            name: e.entryName,
            content: e.getData().toString('base64')
        }));
    context.res = { body: entries };
};
```

`package.json`: `{ "dependencies": { "adm-zip": "^0.5.10" } }`

Деплой: `func azure functionapp publish <app-name>` или через Azure Portal.

---

## Чек-лист после настройки

- [ ] SharePoint Document Management включён для `new_h5pcontent`, site: `/sites/LMS-Content`
- [ ] CORS настроен: Power Pages домен разрешён в SharePoint для cross-origin fetch
- [ ] Выбран вариант распаковки: **Encodian** (E1) или **Azure Function** (E2)
- [ ] Flow `H5P File to SharePoint` создан, протестирован и включён
- [ ] После тестовой загрузки проверено: `new_sharepointurl` заполнено, файлы есть в SharePoint
- [ ] Flow `H5P xAPI to Dataverse` создан, протестирован и включён
- [ ] Создана колонка mentor lookup на `contact` (или решено использовать `parentcustomerid`)
- [ ] End-to-end тест: HR загружает `.h5p` → плеер открывается → стажёр проходит → наставник получает email
