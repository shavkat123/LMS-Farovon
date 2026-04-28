# Power Automate flows для H5P интеграции

Этот документ описывает Power Automate flows, которые нужно создать вручную в [make.powerautomate.com](https://make.powerautomate.com) — Claude Code не работает с Power Automate напрямую.

В составе H5P интеграции нужны **два flow**:

1. **`H5P Extract to SharePoint`** — при загрузке `.h5p` в SharePoint: распаковка ZIP → файлы в ту же папку → удаление оригинала (§0)
2. **`H5P xAPI to Dataverse`** — при успешном прохождении урока: обновляет timestamp + уведомляет наставника (§1)

---

## §0. Flow `H5P Extract to SharePoint`

### Архитектура

SharePoint Document Management включён для таблицы `new_h5pcontent` (site: `https://farovon.sharepoint.com/sites/dait`). При загрузке `.h5p` файла через Documents tab в make.powerapps.com (или напрямую в SharePoint) этот flow:

1. Обнаруживает новый `.h5p` файл в библиотеке SharePoint
2. Скачивает его содержимое
3. Извлекает ZIP (`.h5p` — это обычный ZIP-архив)
4. Загружает распакованные файлы (`h5p.json`, `content/`, библиотеки) в ту же папку SharePoint
5. Удаляет оригинальный `.h5p` файл

После этого плеер на `/h5p-lesson?id=<contentId>` читает `sharepointdocumentlocation.absoluteurl` (адрес папки записи в SharePoint), откуда h5p-standalone напрямую загружает `h5p.json`, `content/content.json` и библиотеки.

```text
HR → Documents tab → uploads test.h5p
  → [Flow срабатывает на файл в SharePoint]
  → Скачивает test.h5p, распаковывает ZIP
  → Загружает h5p.json, content/, H5P.InteractiveVideo-1.27/ … в ту же папку
  → Удаляет test.h5p
  → Плеер: fetch("<absoluteurl>/h5p.json") → OK
```

### Предварительные требования

1. SharePoint Document Management включён для `new_h5pcontent`, site: `https://farovon.sharepoint.com/sites/dait` — **уже выполнено**.

2. **Имя библиотеки** — проверьте в SharePoint (`https://farovon.sharepoint.com/sites/dait`) как называется библиотека, созданная для `new_h5pcontent`. Обычно это логическое имя сущности или её отображаемое имя.

3. **CORS / аутентификация**: h5p-standalone делает браузерные `fetch()` к SharePoint URL из `absoluteurl`. Для этого:

   - Пользователь портала должен быть аутентифицирован в том же AAD-тенанте (уже есть)
   - Браузер должен иметь активную сессию SharePoint — при SSO это происходит автоматически
   - Если возникают ошибки 401/CORS: открыть `https://farovon.sharepoint.com` один раз для установки сессии

4. **Connector для распаковки ZIP** — выбрать один вариант:

   - **Вариант E1 (Encodian)**: premium connector, action "Extract Archive"
   - **Вариант E2 (Azure Function)**: бесплатный Consumption tier (см. Приложение A)

### Шаг 1. Создать flow

1. [make.powerautomate.com](https://make.powerautomate.com) → окружение **genunmanagedenv**
2. **+ Create** → **Automated cloud flow**
3. **Name**: `H5P Extract to SharePoint`
4. **Trigger**: `When a file is created or modified (properties only)` (SharePoint)
   - **Site Address**: `https://farovon.sharepoint.com/sites/dait`
   - **Library Name**: `<имя библиотеки new_h5pcontent>` — проверить в SharePoint

### Шаг 2. Фильтр: только .h5p файлы

Добавить **Condition**:

```text
endsWith(triggerOutputs()?['body/{FilenameWithExtension}'], '.h5p')  is equal to  true
```

- **If No**: **Terminate** (Status: Succeeded) — файл другого типа, игнорируем.

### Шаг 3. Скачать содержимое файла (ветка If Yes)

3.1. **SharePoint: Get file content using path**

- **Site Address**: `https://farovon.sharepoint.com/sites/dait`
- **File Path**: `triggerOutputs()?['body/{FullPath}']`

Результат: `body/body` — бинарное содержимое файла (base64 или поток).

3.2. Записать переменную:

- **Initialize variable** — Name: `folderPath`, Type: String
- Value: `replace(triggerOutputs()?['body/{FullPath}'], concat('/', triggerOutputs()?['body/{FilenameWithExtension}']), '')`

### Шаг 4E1. Извлечь ZIP через Encodian

> Используйте этот шаг ИЛИ Шаг 4E2

4.1. **Encodian: Extract Archive**

- File: `outputs('Get_file_content')?['body/body']`

В результате — массив `entries` с полями `Name` (путь внутри архива) и `Content` (base64).

### Шаг 4E2. Извлечь ZIP через Azure Function

> Используйте этот шаг ИЛИ Шаг 4E1

4.1. **HTTP** action:

- **Method**: POST
- **URI**: `https://<your-function-app>.azurewebsites.net/api/ExtractH5P`
- **Headers**: `{ "Content-Type": "application/json" }`
- **Body**:

  ```json
  {
    "base64": "@{base64(outputs('Get_file_content')?['body/body'])}"
  }
  ```

Response: `[{ "name": "h5p.json", "content": "<base64>" }, ...]`

### Шаг 5. Загрузить извлечённые файлы в SharePoint

**Apply to each** по массиву `entries` из шага 4:

5.1. **SharePoint: Create file**

- **Site Address**: `https://farovon.sharepoint.com/sites/dait`
- **Folder Path**: `@{variables('folderPath')}/@{replace(items('Apply_to_each')?['Name'], last(split(items('Apply_to_each')?['Name'], '/')), '')}`
- **File Name**: `@{last(split(items('Apply_to_each')?['Name'], '/'))}`
- **File Content**: `@{base64ToBinary(items('Apply_to_each')?['Content'])}`

### Шаг 6. Удалить оригинальный .h5p файл

Добавить действие **SharePoint: Delete file**:

- **Site Address**: `https://farovon.sharepoint.com/sites/dait`
- **File Identifier**: `triggerOutputs()?['body/{Id}']`

### Шаг 7. Сохранить и активировать

**Save** → **Test** (загрузить тестовый `.h5p` через Documents tab) → проверить в SharePoint что в папке записи появились `h5p.json`, `content/` и библиотеки → **Turn on**.

---

## §1. Flow `H5P xAPI to Dataverse` (нотификация + timestamp)

Этот flow срабатывает когда новая запись `new_h5pprogress` создаётся (через xAPI POST из плеера) и отправляет email наставнику если стажёр успешно прошёл урок.

### §1 Шаг 1. Создать flow

1. [make.powerautomate.com](https://make.powerautomate.com) → окружение **genunmanagedenv**
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

- [ ] Проверено имя библиотеки SharePoint для `new_h5pcontent` (используется в триггере flow)
- [ ] Выбран вариант распаковки: **Encodian** (E1) или **Azure Function** (E2)
- [ ] Flow `H5P Extract to SharePoint` создан, протестирован и включён
- [ ] End-to-end тест: загрузить `.h5p` через Documents tab → в SharePoint появились `h5p.json` и `content/` → открыть `/h5p-lesson?id=<guid>` → контент воспроизводится
- [ ] Flow `H5P xAPI to Dataverse` создан, протестирован и включён
- [ ] Создана колонка mentor lookup на `contact` (или решено использовать `parentcustomerid`)
- [ ] End-to-end тест: стажёр проходит урок → наставник получает email
