# -*- coding: utf-8 -*-
"""Проверяет вызовы /_api в шаблонах страниц до заливки на портал.

Зачем: с явными списками полей любая опечатка или поле вне списка даёт 403 90040101 уже
на живом портале, и узнаёшь об этом только из консоли браузера участника. Дешевле поймать
здесь.

Проверяется по каждому вызову:
  1) набор записей существует и для его таблицы включён Web API;
  2) каждое поле из $select, $filter, $orderby есть в Webapi/<таблица>/fields;
  3) GET без $select (запрос «все столбцы») — ошибка;
  4) поля в теле POST (ключи объекта рядом с вызовом) есть в списке.
"""
import io
import os
import re
import sys

SITE = r'C:\Users\fid920251715\Desktop\LMS-farovon\lms-farovon---lms-farovon'
SETTINGS = os.path.join(SITE, 'sitesetting.yml')

# набор записей → логическое имя таблицы (для экзамена правило «+s», для прочих — явно)
EXTRA_SETS = {'contacts': 'contact', 'msdynce_courses': 'msdynce_course'}


def field_lists():
    raw = io.open(SETTINGS, encoding='utf-8', errors='replace').read().replace('\r', '')
    enabled, fields = set(), {}
    for block in re.split(r'(?m)^- ', raw):
        name = re.search(r'adx_name:\s*(\S+)', block)
        value = re.search(r'adx_value:\s*(.*)', block)
        if not name or not value:
            continue
        n, v = name.group(1), value.group(1).strip()
        m = re.match(r'Webapi/([^/]+)/(enabled|fields)$', n)
        if not m:
            continue
        table, kind = m.group(1), m.group(2)
        if kind == 'enabled' and v.lower() == 'true':
            enabled.add(table)
        elif kind == 'fields':
            fields[table] = set(x.strip() for x in v.split(',') if x.strip())
    return enabled, fields


def table_of(entity_set):
    if entity_set in EXTRA_SETS:
        return EXTRA_SETS[entity_set]
    if entity_set.endswith('s'):
        return entity_set[:-1]
    return entity_set


def fields_in_query(q):
    found = set()
    sel = re.search(r'\$select=([^&"\']+)', q)
    if sel:
        found |= set(x.strip() for x in sel.group(1).split(',') if x.strip())
    for part in ('$filter', '$orderby'):
        m = re.search(re.escape(part) + r'=([^&"\']+)', q)
        if m:
            for tok in re.findall(r'\b(_?[a-z]+_[a-z0-9_]+)\b', m.group(1)):
                if tok not in ('eq', 'ne', 'and', 'or', 'desc', 'asc'):
                    found.add(tok)
    return found, bool(sel)


def check(path, enabled, fields):
    src = io.open(path, encoding='utf-8', errors='replace').read()
    problems = []

    # URL вызова: всё, что начинается с /_api/, до закрывающей кавычки, склеивая соседние литералы
    joined = re.sub(r'["\']\s*\+\s*[A-Za-z_][\w.]*(\([^)]*\))?\s*\+\s*["\']', 'X', src)
    joined = re.sub(r'["\']\s*\+\s*\n\s*["\']', '', joined)
    for m in re.finditer(r'/_api/([a-z_]+)(\([^)"\']*\))?([^"\']*)', joined):
        entity_set, query = m.group(1), m.group(3) or ''
        table = table_of(entity_set)
        if table not in enabled:
            problems.append('набор %s: Web API для таблицы %s не включён' % (entity_set, table))
            continue
        allowed = fields.get(table, set())
        used, has_select = fields_in_query(query)
        is_value = '/$value' in query
        if not has_select and not is_value and ('?' in query or not m.group(2)):
            # POST на набор без запроса — это не GET, пропускаем; GET без $select ловим по «?»
            if '?' in query:
                problems.append('%s%s: GET без $select' % (entity_set, query[:60]))
        for f in sorted(used):
            if f not in allowed:
                problems.append('%s: поле «%s» не входит в Webapi/%s/fields' % (entity_set, f, table))

    # тела POST: ключи вида new_xxx: и 'new_xxx@odata.bind' рядом с fetch('/_api/<набор>'
    for m in re.finditer(r"fetch\(\s*'/_api/([a-z_]+)'\s*,\s*\{(.{0,900}?)\}\s*\)", src, re.S):
        entity_set = m.group(1)
        table = table_of(entity_set)
        allowed = fields.get(table, set())
        for key in re.findall(r"['\"]?(new_[a-z0-9_]+)(?:@odata\.bind)?['\"]?\s*:", m.group(2)):
            if key not in allowed:
                problems.append('POST %s: поле тела «%s» не входит в список' % (entity_set, key))
    for m in re.finditer(r"post\('([a-z_]+)'\s*,\s*\{(.{0,900}?)\}\)", src, re.S):
        entity_set = m.group(1)
        table = table_of(entity_set)
        allowed = fields.get(table, set())
        for key in re.findall(r"['\"]?(new_[a-z0-9_]+)(?:@odata\.bind)?['\"]?\s*:", m.group(2)):
            if key not in allowed:
                problems.append('POST %s: поле тела «%s» не входит в список' % (entity_set, key))
    return sorted(set(problems))


def main():
    enabled, fields = field_lists()
    targets = sys.argv[1:] or [
        os.path.join(SITE, 'web-templates', d, f)
        for d in ('exam-certification', 'exam-attempt', 'exam-result', 'exam-certificate')
        for f in os.listdir(os.path.join(SITE, 'web-templates', d)) if f.endswith('.source.html')
    ]
    bad = 0
    for t in targets:
        problems = check(t, enabled, fields)
        name = os.path.basename(t)
        if problems:
            bad += 1
            print('%s — замечаний: %d' % (name, len(problems)))
            for p in problems:
                print('    ' + p)
        else:
            print('%s — чисто' % name)
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
