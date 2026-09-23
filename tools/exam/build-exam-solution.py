# -*- coding: utf-8 -*-
"""Собирает неуправляемое решение с таблицами ИИ-экзаменатора из exam-schema.json.

Зачем именно так. Создать таблицы вызовами метаданных Dataverse не вышло: политика
условного доступа тенанта режет вход по коду устройства (ошибка 53003), а другие
способы получить токен закрыты ограниченным языковым режимом PowerShell на машине.
Зато `pac` уже авторизован и политику проходит — значит, путь один: импорт решения.

XML не пишется с нуля: за образец берётся уже работающая таблица из выгрузки
существующего решения (по умолчанию new_trajectory). Из неё переносятся системные
столбцы, формы, представления и лента — в них меняются только имена. Пользовательские
столбцы генерируются из схемы. Так исключается целый класс ошибок «Dataverse не принял
структуру», потому что структура взята у таблицы, которая в этой же среде уже живёт.

Запуск:
    python build-exam-solution.py --ref C:\\tmp\\solref\\LMS.zip --out exam-solution.zip
    python build-exam-solution.py --only new_aiprompt --out pilot.zip   # пилот на одной таблице
"""
import argparse
import io
import json
import os
import re
import uuid
import zipfile

SKELETON = 'new_trajectory'          # таблица-образец в эталонной выгрузке
SKELETON_ID = 'new_trajectoryid'
SKELETON_SET = 'new_trajectories'
SKELETON_LABEL = 'Траектория'
LANG = '1033'

# Столбцы образца, которые переносим как есть: системные плюс ключ, состояние и владелец.
KEEP_TYPES = {'primarykey', 'state', 'status', 'owner'}


def esc(s):
    return (s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
             .replace('"', '&quot;'))


def labels(desc, tag='displayname'):
    return '<%s description="%s" languagecode="%s" />' % (tag, esc(desc), LANG)


def attribute_xml(col, primary=False):
    """XML одного столбца по образцу реальной выгрузки."""
    logical = col['logical']
    physical = logical
    kind = col['kind']
    display = col['display']
    auto = col.get('format', '') if kind == 'autonumber' else ''

    if kind in ('string', 'autonumber'):
        dvtype, specific = 'nvarchar', (
            '<Format>text</Format>'
            '<MaxLength>%d</MaxLength>'
            '<Length>%d</Length>' % (int(col['max']), int(col['max']) * 2))
    elif kind == 'memo':
        dvtype, specific = 'ntext', ('<Format>text</Format><MaxLength>%d</MaxLength>' % int(col['max']))
    elif kind == 'int':
        dvtype, specific = 'int', '<Format>none</Format><MinValue>-2147483648</MinValue><MaxValue>2147483647</MaxValue>'
    elif kind == 'decimal':
        dvtype, specific = 'decimal', ('<MinValue>-100000000000</MinValue><MaxValue>100000000000</MaxValue>'
                                       '<Accuracy>%d</Accuracy>' % int(col['precision']))
    elif kind == 'bool':
        dvtype = 'bit'
        specific = ('<AppDefaultValue>0</AppDefaultValue>'
                    '<optionset Name="%s_%s">'
                    '<OptionSetType>bit</OptionSetType>'
                    '<IntroducedVersion>1.0.0.0</IntroducedVersion>'
                    '<IsCustomizable>1</IsCustomizable>'
                    '<ExternalTypeName></ExternalTypeName>'
                    '<displaynames>%s</displaynames>'
                    '<Descriptions><Description description="" languagecode="%s" /></Descriptions>'
                    '<options>'
                    '<option value="1" ExternalValue="" IsHidden="0"><labels>%s</labels></option>'
                    '<option value="0" ExternalValue="" IsHidden="0"><labels>%s</labels></option>'
                    '</options></optionset>'
                    % (col['_table'], logical, labels(display), LANG,
                       labels('Да', 'label'), labels('Нет', 'label')))
    elif kind == 'datetime':
        dvtype, specific = 'datetime', '<Format>datetime</Format><CanChangeDateTimeBehavior>1</CanChangeDateTimeBehavior><Behavior>1</Behavior>'
    elif kind == 'dateonly':
        # Поведение оставляем UserLocal: его можно переключить на «Только дата» в конструкторе,
        # а обратно — нельзя. Формат «date» уже прячет время в интерфейсе.
        dvtype, specific = 'datetime', '<Format>date</Format><CanChangeDateTimeBehavior>1</CanChangeDateTimeBehavior><Behavior>1</Behavior>'
    elif kind == 'choice':
        opts = ''
        for i, o in enumerate(col['options']):
            opts += ('<option value="%d" ExternalValue="" IsHidden="0">'
                     '<labels>%s</labels>'
                     '<Descriptions><Description description="" languagecode="%s" /></Descriptions>'
                     '</option>' % (100000000 + i, labels(o, 'label'), LANG))
        dvtype = 'picklist'
        specific = ('<AppDefaultValue>-1</AppDefaultValue>'
                    '<optionset Name="%s_%s">'
                    '<OptionSetType>picklist</OptionSetType>'
                    '<IntroducedVersion>1.0.0.0</IntroducedVersion>'
                    '<IsCustomizable>1</IsCustomizable>'
                    '<ExternalTypeName></ExternalTypeName>'
                    '<displaynames>%s</displaynames>'
                    '<Descriptions><Description description="" languagecode="%s" /></Descriptions>'
                    '<options>%s</options></optionset>'
                    % (col['_table'], logical, labels(display), LANG, opts))
    elif kind == 'lookup':
        dvtype, specific = 'lookup', '<LookupStyle>single</LookupStyle><LookupTypes />'
    elif kind == 'file':
        dvtype, specific = 'file', ('<MaxValue>%d</MaxValue>' % int(col['maxkb']))
    else:
        raise ValueError('неизвестный тип столбца: %s' % kind)

    if primary:
        # Столбец с автонумерацией обязательным быть не должен: значение выдаёт сервер, а
        # коннектор Dataverse требует заполнять любое обязательное поле при создании записи —
        # поток тогда не сохраняется («missing required property item/new_name»).
        auto_number = kind == 'autonumber'
        req = 'none' if auto_number else 'required'
        mask = 'PrimaryName|ValidForAdvancedFind|ValidForForm|ValidForGrid'
        if not auto_number:
            mask += '|RequiredForForm'
        searchable, retrievable = '1', '1'
    else:
        req = 'none'
        mask = 'ValidForAdvancedFind|ValidForForm|ValidForGrid'
        searchable, retrievable = '0', '0'

    return (
        '<attribute PhysicalName="%s">'
        '<Type>%s</Type><Name>%s</Name><LogicalName>%s</LogicalName>'
        '<RequiredLevel>%s</RequiredLevel><DisplayMask>%s</DisplayMask><ImeMode>auto</ImeMode>'
        '<ValidForUpdateApi>1</ValidForUpdateApi><ValidForReadApi>1</ValidForReadApi><ValidForCreateApi>1</ValidForCreateApi>'
        '<IsCustomField>1</IsCustomField><IsAuditEnabled>1</IsAuditEnabled><IsSecured>0</IsSecured>'
        '<IntroducedVersion>1.0.0.0</IntroducedVersion><IsCustomizable>1</IsCustomizable><IsRenameable>1</IsRenameable>'
        '<CanModifySearchSettings>1</CanModifySearchSettings>'
        '<CanModifyRequirementLevelSettings>1</CanModifyRequirementLevelSettings>'
        '<CanModifyAdditionalSettings>1</CanModifyAdditionalSettings>'
        '<SourceType>0</SourceType><IsGlobalFilterEnabled>0</IsGlobalFilterEnabled><IsSortableEnabled>0</IsSortableEnabled>'
        '<CanModifyGlobalFilterSettings>1</CanModifyGlobalFilterSettings>'
        '<CanModifyIsSortableSettings>1</CanModifyIsSortableSettings>'
        '<IsDataSourceSecret>0</IsDataSourceSecret>'
        '<AutoNumberFormat>%s</AutoNumberFormat>'
        '<IsSearchable>%s</IsSearchable><IsFilterable>0</IsFilterable><IsRetrievable>%s</IsRetrievable>'
        '<IsLocalizable>0</IsLocalizable>'
        '%s'
        '<displaynames>%s</displaynames>'
        '<Descriptions><Description description="" languagecode="%s" /></Descriptions>'
        '</attribute>'
        % (physical, dvtype, logical, logical, req, mask, esc(auto), searchable, retrievable,
           specific, labels(display), LANG))


def relationship_xml(child, col):
    """Связь «многие к одному»: именно она создаёт столбец-подстановку."""
    name = '%s_%s_%s' % (child, col['logical'].replace('new_', '', 1), col['target'])
    return (
        '<EntityRelationship Name="%s">'
        '<EntityRelationshipType>OneToMany</EntityRelationshipType>'
        '<IsCustomizable>1</IsCustomizable><IntroducedVersion>1.0.0.0</IntroducedVersion>'
        '<IsHierarchical>0</IsHierarchical>'
        '<ReferencingEntityName>%s</ReferencingEntityName>'
        '<ReferencedEntityName>%s</ReferencedEntityName>'
        '<CascadeAssign>NoCascade</CascadeAssign><CascadeDelete>RemoveLink</CascadeDelete>'
        '<CascadeArchive>RemoveLink</CascadeArchive><CascadeReparent>NoCascade</CascadeReparent>'
        '<CascadeShare>NoCascade</CascadeShare><CascadeUnshare>NoCascade</CascadeUnshare>'
        '<CascadeRollupView>NoCascade</CascadeRollupView>'
        '<IsValidForAdvancedFind>1</IsValidForAdvancedFind>'
        '<ReferencingAttributeName>%s</ReferencingAttributeName>'
        '<RelationshipDescription><Descriptions>'
        '<Description description="" languagecode="%s" /></Descriptions></RelationshipDescription>'
        '<EntityRelationshipRoles>'
        '<EntityRelationshipRole>'
        '<NavPaneDisplayOption>UseCollectionName</NavPaneDisplayOption>'
        '<NavPaneArea>Details</NavPaneArea><NavPaneOrder>10000</NavPaneOrder>'
        '<NavigationPropertyName>%s</NavigationPropertyName>'
        '<RelationshipRoleType>1</RelationshipRoleType>'
        '</EntityRelationshipRole>'
        '<EntityRelationshipRole>'
        '<NavigationPropertyName>%s</NavigationPropertyName>'
        '<RelationshipRoleType>0</RelationshipRoleType>'
        '</EntityRelationshipRole>'
        '</EntityRelationshipRoles>'
        '</EntityRelationship>'
        % (name, child, col['target'], col['logical'], LANG, col['logical'], name)), name


def rename(xml, table, label, setname):
    """Переносим образец на новую таблицу: меняются только имена."""
    xml = xml.replace(SKELETON + 'Id', table + 'Id')
    xml = xml.replace(SKELETON_ID, table + 'id')
    xml = xml.replace(SKELETON_SET, setname)
    xml = xml.replace(SKELETON, table)
    xml = xml.replace(SKELETON_LABEL, esc(label))
    # Новые идентификаторы форм и представлений: старые заняты таблицей-образцом.
    xml = re.sub(r'\{?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}?',
                 lambda m: ('{%s}' % uuid.uuid4()) if m.group(0).startswith('{') else str(uuid.uuid4()),
                 xml)
    return xml


def build(ref_zip, schema_path, out_path, only=None):
    ref = zipfile.ZipFile(ref_zip)
    cust = ref.read('customizations.xml').decode('utf-8')
    sol = ref.read('solution.xml').decode('utf-8')

    skel = re.search(r'<Entity>\s*<Name[^>]*>%s<.*?</Entity>' % SKELETON, cust, re.S).group(0)
    head = skel[skel.find('<EntityInfo>'):skel.find('<attributes>') + len('<attributes>')]
    sys_attrs = ''
    for a in re.findall(r'<attribute PhysicalName="[^"]+">.*?</attribute>', skel, re.S):
        t = re.search(r'<Type>(\w+)</Type>', a).group(1)
        custom = re.search(r'<IsCustomField>(\d)</IsCustomField>', a).group(1) == '1'
        if t in KEEP_TYPES or not custom:
            sys_attrs += a
    tail = skel[skel.find('</attributes>'):skel.find('</EntityInfo>') + len('</EntityInfo>')]
    formxml = re.search(r'<FormXml>.*?</FormXml>', skel, re.S).group(0)
    queries = re.search(r'<SavedQueries>.*?</SavedQueries>', skel, re.S).group(0)
    ribbon = re.search(r'<RibbonDiffXml>.*?</RibbonDiffXml>', skel, re.S).group(0)

    schema = json.load(io.open(schema_path, encoding='utf-8'))
    tables = schema['tables']
    if only:
        wanted = set(only)
        tables = [t for t in tables if t['logical'] in wanted]
        if not tables:
            raise SystemExit('в схеме нет таблиц: %s' % ', '.join(only))
    known = set(t['logical'] for t in tables)

    entities, rels, roots, externals = [], [], [], set()

    for t in tables:
        table, label, setname = t['logical'], t['display'], t['logical'] + 's'
        attrs = attribute_xml(dict(t['primary']['type'],
                                   logical=t['primary']['logical'],
                                   display=t['primary']['display'],
                                   _table=table), primary=True)
        for c in t['columns']:
            col = dict(c, _table=table)
            if c['kind'] == 'lookup':
                if c['target'] not in known:
                    externals.add(c['target'])
                xml, _ = relationship_xml(table, c)
                rels.append(xml)
            attrs += attribute_xml(col)

        # Системные столбцы образца (ключ, владелец, состояние, служебные даты) идут первыми:
        # на них ссылаются перенесённые формы и представления.
        body = (rename(head, table, label, setname) +
                rename(sys_attrs, table, label, setname) + attrs +
                rename(tail, table, label, setname) +
                rename(formxml, table, label, setname) +
                rename(queries, table, label, setname) + ribbon)
        entities.append('<Entity><Name LocalizedName="%s" OriginalName="%s">%s</Name>%s</Entity>'
                        % (esc(label), esc(label), table, body))
        roots.append('<RootComponent type="1" schemaName="%s" behavior="0" />' % table)

    # Таблицы вне решения, на которые смотрят подстановки, добавляем пустыми ссылками —
    # без этого импорт считает связь висячей.
    for ext in sorted(externals):
        entities.append('<Entity><Name LocalizedName="%s" OriginalName="">%s</Name>'
                        '<EntityInfo><entity Name="%s" unmodified="1"><attributes /></entity></EntityInfo>%s</Entity>'
                        % (ext, ext, ext, ribbon))
        roots.append('<RootComponent type="1" schemaName="%s" behavior="1" />' % ext)

    customizations = (
        '<?xml version="1.0" encoding="utf-8"?>'
        '<ImportExportXml xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        '<Entities>' + ''.join(entities) + '</Entities>'
        '<Roles />'
        '<Workflows />'
        '<FieldSecurityProfiles />'
        '<Templates />'
        '<EntityMaps />'
        '<EntityRelationships>' + ''.join(rels) + '</EntityRelationships>'
        '<OrganizationSettings />'
        '<optionsets />'
        '<CustomControls />'
        '<EntityDataProviders />'
        '<Languages><Language>' + LANG + '</Language></Languages>'
        '</ImportExportXml>')

    publisher = re.search(r'<Publisher>.*?</Publisher>', sol, re.S).group(0)
    s = schema['solution']
    solution = (
        '<?xml version="1.0" encoding="utf-8"?>'
        '<ImportExportXml version="9.2.26083.162" SolutionPackageVersion="9.2" languagecode="%s" '
        'generatedBy="CrmLive" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        '<SolutionManifest>'
        '<UniqueName>%s</UniqueName>'
        '<LocalizedNames><LocalizedName description="%s" languagecode="%s" /></LocalizedNames>'
        '<Descriptions />'
        '<Version>1.0.0.0</Version>'
        '<Managed>0</Managed>'
        '%s'
        '<RootComponents>%s</RootComponents>'
        '<MissingDependencies />'
        '</SolutionManifest>'
        '</ImportExportXml>'
        % (LANG, s['uniquename'], esc(s['display']), LANG, publisher, ''.join(roots)))

    content_types = ('<?xml version="1.0" encoding="utf-8"?>'
                     '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
                     '<Default Extension="xml" ContentType="application/octet-stream" /></Types>')

    with zipfile.ZipFile(out_path, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('solution.xml', solution.encode('utf-8'))
        z.writestr('customizations.xml', customizations.encode('utf-8'))
        z.writestr('[Content_Types].xml', content_types.encode('utf-8'))

    n_cols = sum(len(t['columns']) for t in tables)
    print('решение:      %s (%.1f КБ)' % (out_path, os.path.getsize(out_path) / 1024.0))
    print('таблиц:       %d' % len(tables))
    print('столбцов:     %d' % n_cols)
    print('связей:       %d' % len(rels))
    if externals:
        print('внешние цели: %s' % ', '.join(sorted(externals)))


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--ref', default=r'C:\tmp\solref\LMS.zip', help='выгрузка существующего решения — образец')
    p.add_argument('--schema', default=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'exam-schema.json'))
    p.add_argument('--out', default='exam-solution.zip')
    p.add_argument('--only', help='создать решение только для этих таблиц, через запятую')
    a = p.parse_args()
    build(a.ref, a.schema, a.out, a.only.split(',') if a.only else None)
