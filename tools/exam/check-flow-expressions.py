# -*- coding: utf-8 -*-
"""Проверяет выражения в определениях потоков до импорта.

Зачем: Power Automate принимает решение целиком, а потом отдельно пытается сохранить
каждый поток — и ошибка вида «не закрыта скобка» всплывает только там, уже после
нескольких минут импорта. Дешевле поймать её локально.

Что проверяется:
  1. баланс скобок в каждом выражении (строки, начинающиеся с @ или содержащие @{...});
  2. ссылки на несуществующие действия в outputs('…') / body('…') / items('…');
  3. runAfter, указывающий на действие, которого нет рядом.
"""
import io
import json
import os
import re
import sys

FLOWDIR = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                       '..', '..', 'power-automate', 'exam'))


def balanced(expr):
    """Скобки вне строковых литералов. В выражениях литералы — в одинарных кавычках,
    причём '' внутри литерала означает одну кавычку."""
    depth = 0
    i = 0
    in_str = False
    while i < len(expr):
        c = expr[i]
        if in_str:
            if c == "'":
                if i + 1 < len(expr) and expr[i + 1] == "'":
                    i += 2
                    continue
                in_str = False
        else:
            if c == "'":
                in_str = True
            elif c == '(':
                depth += 1
            elif c == ')':
                depth -= 1
                if depth < 0:
                    return False, 'лишняя закрывающая скобка'
        i += 1
    if in_str:
        return False, 'незакрытая кавычка'
    if depth != 0:
        return False, 'не закрыто скобок: %d' % depth
    return True, ''


def interpolations(s):
    """Куски вида @{...}. Фигурные скобки считаем с учётом строковых литералов:
    в выражении часто собирают JSON, и скобка внутри кавычек не закрывает вставку."""
    out = []
    i = 0
    while True:
        start = s.find('@{', i)
        if start < 0:
            return out
        j = start + 2
        depth = 1
        in_str = False
        while j < len(s):
            c = s[j]
            if in_str:
                if c == "'":
                    if j + 1 < len(s) and s[j + 1] == "'":
                        j += 2
                        continue
                    in_str = False
            else:
                if c == "'":
                    in_str = True
                elif c == '{':
                    depth += 1
                elif c == '}':
                    depth -= 1
                    if depth == 0:
                        break
            j += 1
        out.append(s[start + 2:j])
        i = j + 1


def collect_strings(node, path, out):
    if isinstance(node, dict):
        for k, v in node.items():
            collect_strings(v, path + '/' + str(k), out)
    elif isinstance(node, list):
        for n, v in enumerate(node):
            collect_strings(v, path + '/' + str(n), out)
    elif isinstance(node, str):
        out.append((path, node))


def subblocks(body):
    """Вложенные наборы действий: ветки If, ветки Switch и его default."""
    out = []
    if not isinstance(body, dict):
        return out
    if isinstance(body.get('actions'), dict):
        out.append(body['actions'])
    els = body.get('else')
    if isinstance(els, dict) and isinstance(els.get('actions'), dict):
        out.append(els['actions'])
    cases = body.get('cases')
    if isinstance(cases, dict):
        for c in cases.values():
            if isinstance(c, dict) and isinstance(c.get('actions'), dict):
                out.append(c['actions'])
    default = body.get('default')
    if isinstance(default, dict) and isinstance(default.get('actions'), dict):
        out.append(default['actions'])
    return out


def action_names(actions, acc):
    for name, body in actions.items():
        acc.add(name)
        for blk in subblocks(body):
            action_names(blk, acc)
    return acc


def check_file(path):
    problems = []
    d = json.load(io.open(path, encoding='utf-8'))
    definition = d['properties']['definition']
    names = action_names(definition.get('actions', {}), set())
    names |= set(definition.get('triggers', {}).keys())

    strings = []
    collect_strings(definition, '', strings)
    for where, s in strings:
        if '@' not in s:
            continue
        # выражения целиком (@…) и вставки @{…}
        exprs = []
        if s.startswith('@') and not s.startswith('@{'):
            exprs.append(s[1:])
        exprs.extend(interpolations(s))
        for e in exprs:
            ok, why = balanced(e)
            if not ok:
                problems.append('%s — %s: %s' % (where, why, e[:110]))
        for fn in ('outputs', 'body', 'items'):
            for ref in re.findall(r"%s\('([^']+)'\)" % fn, s):
                if ref not in names and ref not in ('Try', 'Catch'):
                    problems.append('%s — ссылка на неизвестное действие: %s(%r)' % (where, fn, ref))

    def check_run_after(actions, siblings):
        for name, body in actions.items():
            if not isinstance(body, dict):
                continue
            for target in (body.get('runAfter') or {}):
                if target not in siblings:
                    problems.append('%s: runAfter указывает на «%s», которого нет на этом уровне' % (name, target))
            for blk in subblocks(body):
                check_run_after(blk, set(blk.keys()))

    check_run_after(definition.get('actions', {}), set(definition.get('actions', {}).keys()))
    return problems


def main():
    files = sorted(f for f in os.listdir(FLOWDIR) if f.endswith('.flow.json'))
    bad = 0
    for f in files:
        problems = check_file(os.path.join(FLOWDIR, f))
        if problems:
            bad += 1
            print('%s — замечаний: %d' % (f, len(problems)))
            for p in problems:
                print('    ' + p)
        else:
            print('%s — чисто' % f)
    print('---')
    print('файлов: %d, с замечаниями: %d' % (len(files), bad))
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
