# H5P Solution для LMS Farovon — инструкция по импорту

Этот пакет добавляет в Dataverse две таблицы для поддержки H5P Interactive Video в портале:

- `new_h5pcontent` — хранилище загруженных `.h5p` файлов (контент)
- `new_h5pprogress` — записи прогресса прохождения уроков (xAPI events)

Префикс таблиц/полей: **`new_`** (паблишер `DefaultPublishergenunmanagedenv`).
Решение: **`LMS`**, версия `1.0.0.0`, unmanaged.

---

## Состав пакета

```
solution/
├── [Content_Types].xml      # Стандартный header zip-пакета
├── solution.xml             # Манифест: solution=LMS, publisher=DefaultPublishergenunmanagedenv
├── customizations.xml       # Пустой контейнер (таблицы создаются вручную, см. ниже)
└── README.md                # Этот файл
```

> **Важно.** В `customizations.xml` нет XML-описаний таблиц. Сгенерировать рабочий Customizations.xml с нуля для двух таблиц с lookup-связями вручную — крайне рискованно: схема Dataverse Customizations.xml содержит сотни обязательных полей метаданных, и любая ошибка ломает импорт. Поэтому пакет создаёт пустой контейнер `LMS`, а таблицы добавляются в него через make.powerapps.com (Путь A) или через `pac` Web API (Путь B). После создания таблиц можно сделать обратный экспорт solution и положить рабочий `customizations.xml` сюда — для будущих окружений.

---

## Путь A — рекомендуемый (make.powerapps.com)

### Шаг 1. Импорт пустого решения `LMS`

```powershell
# Из папки solution/ создать zip
Compress-Archive -Path solution\* -DestinationPath solution.zip -Force

# Импортировать в окружение genunmanagedenv
pac auth create --url https://genunmanagedenv.crm4.dynamics.com
pac solution import --path solution.zip
```

Альтернативно через UI: https://make.powerapps.com → выбрать окружение **genunmanagedenv** → **Solutions** → **Import solution** → загрузить `solution.zip`.

После импорта в списке Solutions появится **LMS** (пустой).

### Шаг 2. Создать таблицу `new_h5pcontent`

1. https://make.powerapps.com → окружение **genunmanagedenv** → **Solutions** → открыть **LMS**
2. **+ New** → **Table** → **Table (advanced properties)**
3. Заполнить:
   - **Display name**: `H5P Content`
   - **Plural display name**: `H5P Contents`
   - **Schema name**: `h5pcontent` (префикс `new_` подставится автоматически → итоговое имя `new_h5pcontent`)
   - **Primary column** → **Edit** → Display name `Name`, Schema name `name` → итог `new_name`, MaxLength `200`
   - **Ownership**: User or team
   - **Enable attachments**: оставить по желанию
4. **Save**

Затем **+ New** → **Column** для каждого поля:

| Display name      | Schema name       | Тип                       | Обязательное | Доп. параметры                          |
|-------------------|-------------------|---------------------------|--------------|------------------------------------------|
| Description       | `description`     | Multiple lines of text    | No           | MaxLength 4000                           |
| H5P File          | `h5pfile`         | File                      | **Yes**      | Max file size 32 MB (или больше при необходимости) |
| Library Type      | `librarytype`     | Text (Single line)        | No           | MaxLength 100                            |
| Duration Seconds  | `durationseconds` | Whole number              | No           | —                                        |
| Uploaded By       | `uploadedby`      | Lookup → **Contact**      | **Yes**      | —                                        |
| Related Course    | `relatedcourse`   | Lookup → **msdynce_course** | No         | —                                        |
| Is Active         | `isactive`        | Yes/No                    | No           | Default = **Yes**                        |

> Все имена колонок указаны без префикса — Power Apps добавит `new_` сам. Итоговые logical names будут `new_description`, `new_h5pfile`, и т.д.

После создания всех колонок: **Save table**.

### Шаг 3. Создать таблицу `new_h5pprogress`

В solution **LMS** → **+ New** → **Table** → **Table (advanced properties)**:
- **Display name**: `H5P Progress`
- **Plural display name**: `H5P Progresses`
- **Schema name**: `h5pprogress` → итог `new_h5pprogress`
- **Primary column**: Display `Name`, Schema `name` → `new_name`, MaxLength 200

Колонки:

| Display name        | Schema name         | Тип                              | Обязательное | Доп. параметры                  |
|---------------------|---------------------|----------------------------------|--------------|----------------------------------|
| User                | `user`              | Lookup → **Contact**             | **Yes**      | —                                |
| H5P Content         | `h5pcontent`        | Lookup → **H5P Content** (`new_h5pcontent`) | **Yes** | Создаст 1:N связь автоматически |
| Score Raw           | `scoreraw`          | Decimal number                   | No           | Precision 2                      |
| Score Max           | `scoremax`          | Decimal number                   | No           | Precision 2                      |
| Score Scaled        | `scorescaled`       | Decimal number                   | No           | Precision 4, Min 0, Max 1        |
| Completion          | `completion`        | Yes/No                           | No           | Default = **No**                 |
| Success             | `success`           | Yes/No                           | No           | Default = **No**                 |
| Duration Seconds    | `durationseconds`   | Whole number                     | No           | —                                |
| Attempts            | `attempts`          | Whole number                     | No           | Default = **1**                  |
| Last Position       | `lastposition`      | Decimal number                   | No           | Precision 2                      |
| xAPI Statements     | `xapistatements`    | Multiple lines of text           | No           | MaxLength 100000 (или больше)    |
| Last Updated        | `lastupdated`       | Date and Time                    | No           | Time zone behaviour: User local  |

**Save table**.

### Шаг 4. Проверить связь 1:N

В **H5P Content** → вкладка **Relationships** должна появиться запись типа **One-to-many** с Related table = `new_h5pprogress`. Имя relationship по умолчанию: `new_h5pcontent_new_h5pprogress` или похожее — запомните это имя, оно понадобится в FetchXML позже.

### Шаг 5. Опубликовать изменения

В solution **LMS** → **Publish all customizations**.

---

## Путь B — программный (Dataverse Web API через PowerShell)

Если ручное создание не подходит (несколько окружений, повторяемость) — таблицы можно создать через REST API. См. документацию Microsoft:
- POST `/api/data/v9.2/EntityDefinitions` — создание таблицы
- POST `/api/data/v9.2/EntityDefinitions(LogicalName='new_h5pcontent')/Attributes` — создание колонок
- POST `/api/data/v9.2/RelationshipDefinitions` — создание lookup-связей

Готовый PowerShell-скрипт для этого пути могу подготовить отдельно по запросу — на текущем этапе ТЗ требует только пакет solution и инструкцию.

---

## Verification — что должно быть после создания

В Dataverse (https://make.powerapps.com → Tables) должны появиться:

- ✅ **H5P Content** (`new_h5pcontent`) — 9 колонок включая primary `new_name`
- ✅ **H5P Progress** (`new_h5pprogress`) — 13 колонок включая primary `new_name`
- ✅ Связь 1:N: `new_h5pcontent` → `new_h5pprogress` через `new_h5pcontent` lookup
- ✅ Обе таблицы в solution **LMS**

Быстрая проверка через `pac`:
```powershell
pac data list --schema-name new_h5pcontent
pac data list --schema-name new_h5pprogress
```

---

## Что дальше

После того как таблицы созданы и подтверждены, следующие шаги (вне этого пакета):

1. Раздать table permissions для Power Pages (см. ТЗ §3.5) — четыре `.tablepermission.yml` файла
2. Создать web-templates `h5p-player` / `h5p-upload` / `h5p-progress-list` (ТЗ §3.2)
3. Создать web-pages под URL `/h5p-lesson`, `/h5p-upload`, `/h5p-progress` (ТЗ §3.3)
4. Положить дистрибутив `h5p-standalone` в web-files (ТЗ §3.4)
5. Сделать basic-form `h5p-upload-form` (ТЗ §3.6)
6. Подготовить `POWER_AUTOMATE_FLOW.md` (ТЗ §4)

Эти шаги делать **только после подтверждения**, что таблицы существуют в Dataverse.

---

## Откат

Если что-то пошло не так и нужно удалить:
1. https://make.powerapps.com → **Solutions** → открыть **LMS** → удалить таблицы изнутри solution
2. **Solutions** → выделить **LMS** → **Delete**

> Удаление таблицы Dataverse невозвратно теряет данные. Если в таблицах уже есть записи — сначала экспортируйте их.
