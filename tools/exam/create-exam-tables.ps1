<#
.SYNOPSIS
    Создаёт таблицы и столбцы ИИ-экзаменатора в Dataverse по файлу exam-schema.json.

.DESCRIPTION
    Зачем скрипт, а не клики: в схеме 15 таблиц и 174 столбца, из них 34 подстановки
    и 24 набора выбора. Руками это несколько дней и неизбежные опечатки в логических
    именах, из-за которых потом молча не работают Web API и FetchXML.

    Скрипт идемпотентен: перед созданием каждого объекта проверяет, нет ли его уже,
    поэтому его можно спокойно перезапускать после ошибки — сделанное не дублируется.

    Порядок важен: сначала все таблицы, потом обычные столбцы, потом подстановки
    (цель подстановки должна существовать), в конце — публикация.

    Вход в систему: device code flow, никаких модулей ставить не нужно. Скрипт
    печатает короткий код, вы открываете ссылку и подтверждаете вход тем же
    аккаунтом, под которым работаете с этой средой.

.EXAMPLE
    # Сухой прогон: показать, что будет создано, ничего не меняя
    .\create-exam-tables.ps1

.EXAMPLE
    # Создать по-настоящему
    .\create-exam-tables.ps1 -Apply
#>
[CmdletBinding()]
param(
    [string]$OrgUrl = 'https://genunmanagedenv.crm4.dynamics.com',
    [string]$SchemaPath = (Join-Path $PSScriptRoot 'exam-schema.json'),
    [switch]$Apply,
    [int]$LanguageCode = 1033,
    # Публичный клиент Dataverse (Microsoft). Если тенант его запрещает —
    # подставьте id своей регистрации приложения с правом на Dataverse.
    [string]$ClientId = '51f81489-12ee-4a9e-aaae-a2591f45987d'
)

$ErrorActionPreference = 'Stop'
$OrgUrl = $OrgUrl.TrimEnd('/')
$ApiBase = "$OrgUrl/api/data/v9.2"

# ─────────────────────────────────────────────────────────────── вход в систему
function Get-DataverseToken {
    param([string]$Resource, [string]$ClientId)

    $dc = Invoke-RestMethod -Method Post -Uri 'https://login.microsoftonline.com/common/oauth2/v2.0/devicecode' `
        -Body @{ client_id = $ClientId; scope = "$Resource/.default offline_access" }

    Write-Host ''
    Write-Host '  Нужен вход в систему.' -ForegroundColor Yellow
    Write-Host "  1) откройте $($dc.verification_uri)"
    Write-Host "  2) введите код: $($dc.user_code)" -ForegroundColor Cyan
    Write-Host '  3) войдите тем же аккаунтом, под которым работаете со средой'
    Write-Host ''
    try { Start-Process $dc.verification_uri | Out-Null } catch { }

    $deadline = (Get-Date).AddSeconds([int]$dc.expires_in)
    while ((Get-Date) -lt $deadline) {
        Start-Sleep -Seconds ([int]$dc.interval)
        try {
            $tok = Invoke-RestMethod -Method Post -Uri 'https://login.microsoftonline.com/common/oauth2/v2.0/token' `
                -Body @{ grant_type = 'urn:ietf:params:oauth:grant-type:device_code'; client_id = $ClientId; device_code = $dc.device_code }
            Write-Host '  Вход выполнен.' -ForegroundColor Green
            return $tok.access_token
        } catch {
            $body = ''
            try { $body = $_.ErrorDetails.Message } catch { }
            # authorization_pending — обычное состояние, пока код не подтверждён
            if ($body -notmatch 'authorization_pending' -and $body -notmatch 'slow_down') { throw }
        }
    }
    throw 'Время ожидания входа истекло.'
}

# ────────────────────────────────────────────────────────────────── вызовы API
$script:Token = $null
$script:SolutionName = $null

function Invoke-Dv {
    param(
        [ValidateSet('GET', 'POST', 'PATCH', 'DELETE')][string]$Method,
        [string]$Path,
        $Body,
        [switch]$AllowNotFound
    )
    $uri = if ($Path -match '^https?://') { $Path } else { "$ApiBase/$($Path.TrimStart('/'))" }
    $headers = @{
        Authorization      = "Bearer $script:Token"
        'OData-MaxVersion' = '4.0'
        'OData-Version'    = '4.0'
        Accept             = 'application/json'
    }
    if ($script:SolutionName -and $Method -ne 'GET') { $headers['MSCRM.SolutionUniqueName'] = $script:SolutionName }

    $json = $null
    if ($null -ne $Body) { $json = ($Body | ConvertTo-Json -Depth 30 -Compress) }

    for ($try = 1; $try -le 5; $try++) {
        try {
            if ($null -ne $json) {
                $utf8 = [System.Text.Encoding]::UTF8.GetBytes($json)
                return Invoke-RestMethod -Method $Method -Uri $uri -Headers $headers -Body $utf8 -ContentType 'application/json; charset=utf-8'
            }
            return Invoke-RestMethod -Method $Method -Uri $uri -Headers $headers
        } catch {
            $status = $null
            try { $status = [int]$_.Exception.Response.StatusCode } catch { }
            if ($status -eq 404 -and $AllowNotFound) { return $null }
            if ($status -eq 429 -or $status -eq 503) {
                $wait = 5 * $try
                Write-Host "    ждём $wait с (сервер просит притормозить)" -ForegroundColor DarkGray
                Start-Sleep -Seconds $wait
                continue
            }
            $detail = ''
            try { $detail = $_.ErrorDetails.Message } catch { }
            if (-not $detail) { $detail = $_.Exception.Message }
            throw "$Method $uri`n    $detail"
        }
    }
    throw "$Method $uri — не удалось после 5 попыток"
}

# ──────────────────────────────────────────────────────── сборка тел метаданных
function New-Label {
    param([string]$Text, [int]$Lang = $LanguageCode)
    @{
        '@odata.type'    = 'Microsoft.Dynamics.CRM.Label'
        LocalizedLabels  = @(@{ '@odata.type' = 'Microsoft.Dynamics.CRM.LocalizedLabel'; Label = $Text; LanguageCode = $Lang })
    }
}

function ConvertTo-SchemaName {
    # new_examattempt → new_ExamAttempt: логическое имя всё равно станет строчным,
    # но схемное имя принято писать с заглавной — так его показывает конструктор.
    param([string]$Logical)
    $p = $Logical.Split('_', 2)
    if ($p.Count -lt 2) { return $Logical }
    return $p[0] + '_' + $p[1].Substring(0, 1).ToUpper() + $p[1].Substring(1)
}

function New-AttributeBody {
    param([hashtable]$Col)

    $base = @{
        SchemaName   = ConvertTo-SchemaName $Col.logical
        DisplayName  = New-Label $Col.display
        RequiredLevel = @{ Value = 'None' }
    }

    switch ($Col.kind) {
        'string' {
            $base['@odata.type'] = 'Microsoft.Dynamics.CRM.StringAttributeMetadata'
            $base['MaxLength'] = [int]$Col.max
            $base['FormatName'] = @{ Value = 'Text' }
        }
        'autonumber' {
            $base['@odata.type'] = 'Microsoft.Dynamics.CRM.StringAttributeMetadata'
            $base['MaxLength'] = [int]$Col.max
            $base['FormatName'] = @{ Value = 'Text' }
            $base['AutoNumberFormat'] = $Col.format
        }
        'memo' {
            $base['@odata.type'] = 'Microsoft.Dynamics.CRM.MemoAttributeMetadata'
            $base['MaxLength'] = [int]$Col.max
            $base['Format'] = 'TextArea'
        }
        'int' {
            $base['@odata.type'] = 'Microsoft.Dynamics.CRM.IntegerAttributeMetadata'
            $base['Format'] = 'None'
            $base['MinValue'] = -2147483648
            $base['MaxValue'] = 2147483647
        }
        'decimal' {
            $base['@odata.type'] = 'Microsoft.Dynamics.CRM.DecimalAttributeMetadata'
            $base['Precision'] = [int]$Col.precision
            $base['MinValue'] = -100000000000
            $base['MaxValue'] = 100000000000
        }
        'bool' {
            $base['@odata.type'] = 'Microsoft.Dynamics.CRM.BooleanAttributeMetadata'
            $base['OptionSet'] = @{
                '@odata.type' = 'Microsoft.Dynamics.CRM.BooleanOptionSetMetadata'
                TrueOption    = @{ Value = 1; Label = (New-Label 'Да') }
                FalseOption   = @{ Value = 0; Label = (New-Label 'Нет') }
            }
        }
        'datetime' {
            $base['@odata.type'] = 'Microsoft.Dynamics.CRM.DateTimeAttributeMetadata'
            $base['Format'] = 'DateAndTime'
            $base['DateTimeBehavior'] = @{ Value = 'UserLocal' }
        }
        'dateonly' {
            $base['@odata.type'] = 'Microsoft.Dynamics.CRM.DateTimeAttributeMetadata'
            $base['Format'] = 'DateOnly'
            $base['DateTimeBehavior'] = @{ Value = 'DateOnly' }
        }
        'choice' {
            $opts = @()
            for ($i = 0; $i -lt $Col.options.Count; $i++) {
                $opts += @{ Value = 100000000 + $i; Label = (New-Label $Col.options[$i]) }
            }
            $base['@odata.type'] = 'Microsoft.Dynamics.CRM.PicklistAttributeMetadata'
            $base['OptionSet'] = @{
                '@odata.type'  = 'Microsoft.Dynamics.CRM.OptionSetMetadata'
                IsGlobal       = $false
                OptionSetType  = 'Picklist'
                Options        = $opts
            }
        }
        'file' {
            $base['@odata.type'] = 'Microsoft.Dynamics.CRM.FileAttributeMetadata'
            $base['MaxSizeInKB'] = [int]$Col.maxkb
        }
        default { throw "неизвестный тип столбца: $($Col.kind)" }
    }
    return $base
}

# ──────────────────────────────────────────────────────────────────── действия
function Test-Table {
    param([string]$Logical)
    $r = Invoke-Dv GET "EntityDefinitions(LogicalName='$Logical')?`$select=LogicalName" -AllowNotFound
    return $null -ne $r
}

function Test-Column {
    param([string]$Table, [string]$Logical)
    $r = Invoke-Dv GET "EntityDefinitions(LogicalName='$Table')/Attributes(LogicalName='$Logical')?`$select=LogicalName" -AllowNotFound
    return $null -ne $r
}

function Test-Relationship {
    param([string]$SchemaName)
    $r = Invoke-Dv GET "RelationshipDefinitions?`$select=SchemaName&`$filter=SchemaName eq '$SchemaName'"
    return ($r.value.Count -gt 0)
}

function New-Table {
    param([hashtable]$Tbl)
    $primary = New-AttributeBody ([hashtable]$Tbl.primary.type + @{ logical = $Tbl.primary.logical; display = $Tbl.primary.display })
    $primary['IsPrimaryName'] = $true
    $body = @{
        '@odata.type'          = 'Microsoft.Dynamics.CRM.EntityMetadata'
        SchemaName             = ConvertTo-SchemaName $Tbl.logical
        DisplayName            = New-Label $Tbl.display
        DisplayCollectionName  = New-Label $Tbl.plural
        OwnershipType          = 'UserOwned'
        IsActivity             = $false
        HasNotes               = $false
        HasActivities          = $false
        Attributes             = @($primary)
    }
    Invoke-Dv POST 'EntityDefinitions' $body | Out-Null
}

function New-Column {
    param([string]$Table, [hashtable]$Col)
    Invoke-Dv POST "EntityDefinitions(LogicalName='$Table')/Attributes" (New-AttributeBody $Col) | Out-Null
}

function Get-RelationshipName {
    param([string]$Child, [string]$Field, [string]$Parent)
    # По образцу существующей new_h5pprogress_user_contact
    $short = $Field -replace '^new_', ''
    return "$($Child)_$($short)_$Parent"
}

function New-Lookup {
    param([string]$Child, [hashtable]$Col)
    $rel = Get-RelationshipName $Child $Col.logical $Col.target
    $body = @{
        '@odata.type'               = 'Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata'
        SchemaName                  = $rel
        ReferencedEntity            = $Col.target
        ReferencingEntity           = $Child
        CascadeConfiguration        = @{ Assign = 'NoCascade'; Delete = 'RemoveLink'; Merge = 'NoCascade'; Reparent = 'NoCascade'; Share = 'NoCascade'; Unshare = 'NoCascade' }
        AssociatedMenuConfiguration = @{ Behavior = 'UseCollectionName'; Group = 'Details'; Order = 10000; IsCustomizable = $true }
        Lookup                      = @{
            '@odata.type' = 'Microsoft.Dynamics.CRM.LookupAttributeMetadata'
            SchemaName    = ConvertTo-SchemaName $Col.logical
            DisplayName   = New-Label $Col.display
            RequiredLevel = @{ Value = 'None' }
        }
    }
    Invoke-Dv POST 'RelationshipDefinitions' $body | Out-Null
}

# ────────────────────────────────────────────────────────────────────── запуск
$schema = Get-Content -Raw -Encoding UTF8 $SchemaPath | ConvertFrom-Json -AsHashtable
$sol = $schema.solution

Write-Host ''
Write-Host "Среда:   $OrgUrl"
Write-Host "Схема:   $SchemaPath"
Write-Host "Решение: $($sol.display) ($($sol.uniquename))"
Write-Host "Режим:   $(if ($Apply) { 'СОЗДАНИЕ' } else { 'сухой прогон — ничего не меняется' })" -ForegroundColor $(if ($Apply) { 'Yellow' } else { 'Gray' })

$script:Token = Get-DataverseToken -Resource $OrgUrl -ClientId $ClientId

$who = Invoke-Dv GET 'WhoAmI'
Write-Host "Подключено, UserId $($who.UserId)" -ForegroundColor Green

# решение
$existing = Invoke-Dv GET "solutions?`$select=uniquename,friendlyname&`$filter=uniquename eq '$($sol.uniquename)'"
if ($existing.value.Count -eq 0) {
    if ($Apply) {
        $pub = Invoke-Dv GET "publishers?`$select=publisherid,uniquename&`$filter=customizationprefix eq '$($sol.publisherprefix)'"
        if ($pub.value.Count -eq 0) { throw "не найден издатель с префиксом '$($sol.publisherprefix)'" }
        Invoke-Dv POST 'solutions' @{
            uniquename            = $sol.uniquename
            friendlyname          = $sol.display
            version               = '1.0.0.0'
            'publisherid@odata.bind' = "/publishers($($pub.value[0].publisherid))"
        } | Out-Null
        Write-Host "решение $($sol.uniquename) создано" -ForegroundColor Green
    } else {
        Write-Host "решение $($sol.uniquename) будет создано" -ForegroundColor DarkGray
    }
} else {
    Write-Host "решение $($sol.uniquename) уже есть"
}
if ($Apply) { $script:SolutionName = $sol.uniquename }

$plan = [ordered]@{ tables = 0; columns = 0; lookups = 0; skipped = 0; failed = 0 }
$errors = @()

# 1) таблицы
Write-Host ''
Write-Host '── Шаг 1: таблицы ──'
foreach ($t in $schema.tables) {
    if (Test-Table $t.logical) { Write-Host "   есть      $($t.logical)"; $plan.skipped++; continue }
    if (-not $Apply) { Write-Host "   создать   $($t.logical)  ($($t.display))" -ForegroundColor DarkGray; $plan.tables++; continue }
    try { New-Table $t; Write-Host "   создана   $($t.logical)" -ForegroundColor Green; $plan.tables++ }
    catch { Write-Host "   ОШИБКА    $($t.logical)" -ForegroundColor Red; $errors += $_.ToString(); $plan.failed++ }
}

# 2) обычные столбцы
Write-Host ''
Write-Host '── Шаг 2: столбцы ──'
$targets = @()
foreach ($t in $schema.tables) { $targets += ,@($t.logical, $t.columns) }
foreach ($k in $schema.extracolumns.Keys) { $targets += ,@($k, $schema.extracolumns[$k]) }

foreach ($pair in $targets) {
    $table = $pair[0]; $cols = $pair[1]
    foreach ($c in $cols) {
        if ($c.kind -eq 'lookup') { continue }
        if ((Test-Table $table) -and (Test-Column $table $c.logical)) { $plan.skipped++; continue }
        if (-not $Apply) { Write-Host "   создать   $table.$($c.logical)  [$($c.kind)]" -ForegroundColor DarkGray; $plan.columns++; continue }
        try { New-Column $table $c; Write-Host "   создан    $table.$($c.logical)" -ForegroundColor Green; $plan.columns++ }
        catch { Write-Host "   ОШИБКА    $table.$($c.logical)" -ForegroundColor Red; $errors += $_.ToString(); $plan.failed++ }
    }
}

# 3) подстановки — после того, как все таблицы существуют
Write-Host ''
Write-Host '── Шаг 3: подстановки ──'
foreach ($t in $schema.tables) {
    foreach ($c in $t.columns) {
        if ($c.kind -ne 'lookup') { continue }
        $rel = Get-RelationshipName $t.logical $c.logical $c.target
        if ((Test-Table $t.logical) -and (Test-Column $t.logical $c.logical)) { $plan.skipped++; continue }
        if (-not $Apply) { Write-Host "   создать   $($t.logical).$($c.logical) → $($c.target)   [$rel]" -ForegroundColor DarkGray; $plan.lookups++; continue }
        try { New-Lookup $t.logical $c; Write-Host "   создана   $($t.logical).$($c.logical) → $($c.target)" -ForegroundColor Green; $plan.lookups++ }
        catch { Write-Host "   ОШИБКА    $($t.logical).$($c.logical) → $($c.target)" -ForegroundColor Red; $errors += $_.ToString(); $plan.failed++ }
    }
}

# 4) публикация
if ($Apply -and $plan.failed -eq 0) {
    Write-Host ''
    Write-Host 'Публикую изменения…'
    try { Invoke-Dv POST 'PublishAllXml' @{} | Out-Null; Write-Host 'Опубликовано.' -ForegroundColor Green }
    catch { Write-Host "публикация не удалась: $_" -ForegroundColor Yellow }
}

Write-Host ''
Write-Host '── Итог ──'
Write-Host "   таблиц:      $($plan.tables)"
Write-Host "   столбцов:    $($plan.columns)"
Write-Host "   подстановок: $($plan.lookups)"
Write-Host "   пропущено (уже было): $($plan.skipped)"
Write-Host "   ошибок:      $($plan.failed)" -ForegroundColor $(if ($plan.failed) { 'Red' } else { 'Gray' })

if ($errors.Count -gt 0) {
    $log = Join-Path $PSScriptRoot 'create-exam-tables.errors.txt'
    $errors | Out-File -FilePath $log -Encoding UTF8
    Write-Host ''
    Write-Host "Подробности ошибок: $log" -ForegroundColor Yellow
    Write-Host 'Скрипт идемпотентен — после исправления его можно запустить снова.'
}
if (-not $Apply) {
    Write-Host ''
    Write-Host 'Это был сухой прогон. Чтобы создать, добавьте -Apply' -ForegroundColor Yellow
}
