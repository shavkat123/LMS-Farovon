# -*- coding: utf-8 -*-
"""Проверяет вопросы банка до загрузки — те же правила, что у потока создания вопросов,
плюс одно своё: правильный вариант не должен выделяться длиной.

Зачем своё правило: на первом прогоне рецензент отклонил вопрос именно за это — верный
вариант был заметно длиннее прочих, и ответ угадывался без знания урока. Дешевле поймать
здесь, чем платить за рецензию заведомо слабого вопроса.

Запуск: python check-bank.py C:\\tmp\\bank\\lesson-1.json
"""
import io
import json
import re
import sys

LESSONS = r'C:\tmp\narration-lessons.json'


def lesson_text(code):
    for l in json.load(io.open(LESSONS, encoding='utf-8')):
        if l['урок'] == code:
            return l['текст']
    raise SystemExit('нет текста урока %s' % code)


def check(q, text, seen):
    problems = []
    opts = q.get('options') or []
    right = [o for o in opts if o.get('correct')]
    wrong = [o for o in opts if not o.get('correct')]

    quote = q.get('source_quote') or ''
    if not (10 <= len(quote) <= 200):
        problems.append('цитата длиной %d знаков, нужно 10–200' % len(quote))
    if quote not in text:
        problems.append('цитаты нет в тексте урока дословно')

    if q['type'] == 'single':
        if not (4 <= len(opts) <= 5):
            problems.append('вариантов %d, нужно 4–5' % len(opts))
        if len(right) != 1:
            problems.append('верных %d, нужен ровно 1' % len(right))
    elif q['type'] == 'multi':
        if not (5 <= len(opts) <= 7):
            problems.append('вариантов %d, нужно 5–7' % len(opts))
        if not (2 <= len(right) <= 4):
            problems.append('верных %d, нужно 2–4' % len(right))
        if not re.search(r'все верн', q['stem'], re.I):
            problems.append('в формулировке не сказано «выберите все верные»')

    if q['type'] in ('single', 'multi') and wrong:
        avg_wrong = sum(len(o['text']) for o in wrong) / float(len(wrong))
        for o in right:
            if len(o['text']) > avg_wrong * 1.3 and len(o['text']) - avg_wrong > 12:
                problems.append('верный вариант длиннее средних неверных в %.1f раза: «%s»'
                                % (len(o['text']) / avg_wrong, o['text'][:50]))
        for o in wrong:
            if not (o.get('misconception') or '').strip():
                problems.append('у неверного варианта нет заблуждения: «%s»' % o['text'][:50])
        banned = re.compile(r'все перечисленное|всё перечисленное|ничего из перечисленного', re.I)
        if any(banned.search(o['text']) for o in opts):
            problems.append('вариант «всё/ничего из перечисленного» запрещён')

    key = re.sub(r'\s+', ' ', q['stem'].strip().lower())[:400]
    if key in seen:
        problems.append('дубль формулировки')
    seen.add(key)

    if not (q.get('explanation') or '').strip() and q['type'] in ('single', 'multi'):
        problems.append('нет пояснения')
    return problems


def main():
    path = sys.argv[1]
    data = json.load(io.open(path, encoding='utf-8'))
    text = lesson_text(data['lesson'])
    seen = set()
    bad = 0
    counts = {}
    for i, q in enumerate(data['questions'], 1):
        counts[(q['type'], q['difficulty'])] = counts.get((q['type'], q['difficulty']), 0) + 1
        problems = check(q, text, seen)
        mark = 'ок ' if not problems else 'БРАК'
        print('  %s %2d. [%s/%s] %s' % (mark, i, q['type'], q['difficulty'], q['stem'][:70]))
        for p in problems:
            print('          — ' + p)
        bad += 1 if problems else 0
    print('---')
    print('вопросов: %d, с замечаниями: %d' % (len(data['questions']), bad))
    print('состав: ' + ', '.join('%s/%s ×%d' % (t, d, n) for (t, d), n in sorted(counts.items())))
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
