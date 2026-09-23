# -*- coding: utf-8 -*-
"""Собирает скрипт для браузера, который загружает вопросы урока в банк через портальный Web API.

Вопросы ложатся в статусе «На проверке» и без задания ИИ — это сигнал потоку F-B5 отправить
каждый рецензенту в LMS. Сам загрузчик ничего не одобряет: в банк вопрос попадает только
после независимой проверки другой моделью.

Повторный запуск безопасен: вопросы, чья нормализованная формулировка уже есть в уроке,
пропускаются (тот же ключ new_contenthash, что у потока создания вопросов).

Запуск: python gen-load-bank.py C:\\tmp\\bank\\lesson-1.json  → C:\\tmp\\load_bank.js
"""
import hashlib
import io
import json
import random
import re
import sys

EXAM = 'c83371f4-52b2-f111-aaac-000d3adcd7a2'     # «Наставничество — аттестация»

TYPE = {'single': 100000000, 'multi': 100000001, 'case': 100000002, 'control': 100000003}
DIFFICULTY = {'basic': 100000000, 'medium': 100000001, 'advanced': 100000002}
POINTS = {'single': 1, 'multi': 1, 'case': 10, 'control': 5}


def content_hash(stem):
    return re.sub(r'\s+', ' ', stem.strip().lower())[:400]


def shuffled(options, stem):
    """Перемешивает варианты до присвоения букв.

    Зачем: и я, и генератор LMS пишем верный вариант первым, и буквы по порядку делали его
    всегда «a». Участник этого не видит — страница экзамена перемешивает сама, — но рецензент
    получает варианты в исходном порядке, а у моделей есть тяга к первому варианту, и слепая
    проверка теряет смысл. Порядок зависит только от текста вопроса, поэтому повторная
    загрузка даёт те же буквы.
    """
    seed = int(hashlib.md5(stem.encode('utf-8')).hexdigest(), 16)
    rnd = random.Random(seed)
    opts = list(options)
    for _ in range(20):
        rnd.shuffle(opts)
        if not opts[0].get('correct'):
            break          # верный вариант не должен стоять первым «по привычке»
    return opts


def main():
    data = json.load(io.open(sys.argv[1], encoding='utf-8'))
    rows = []
    for q in data['questions']:
        row = {
            'new_type': TYPE[q['type']],
            'new_difficulty': DIFFICULTY[q['difficulty']],
            'new_stem': q['stem'],
            'new_explanation': q.get('explanation', ''),
            'new_sourcequote': q['source_quote'],
            'new_points': POINTS[q['type']],
            'new_status': 100000000,          # На проверке → поток отправит рецензенту
            'new_source': 100000000,          # ИИ: вопрос написан моделью, пусть и вне LMS
            'new_version': 1,
            'new_exposures': 0,
            'new_slides': '',
            'new_contenthash': content_hash(q['stem']),
        }
        if q['type'] in ('single', 'multi'):
            row['new_optionsjson'] = json.dumps(
                [{'id': 'abcdefg'[i], 'text': o['text'], 'correct': bool(o['correct']),
                  'misconception': o.get('misconception', '')}
                 for i, o in enumerate(shuffled(q['options'], q['stem']))],
                ensure_ascii=False)
        else:
            row['new_reference'] = q.get('reference', '')
            row['new_rubricjson'] = json.dumps(q.get('rubric', {}), ensure_ascii=False)
        rows.append(row)

    js = r'''(async () => {
  const EXAM = "__EXAM__", MODULE = "__MODULE__";
  const ROWS = __ROWS__;
  const th = await (await fetch('/_layout/tokenhtml', {credentials:'same-origin'})).text();
  const tok = (th.match(/value="([^"]+)"/) || [])[1];
  const H = {'Content-Type':'application/json','Accept':'application/json','__RequestVerificationToken':tok};
  const have = await (await fetch("/_api/new_examquestions?$select=new_contenthash&$filter=_new_module_value eq " + MODULE + "&$top=500",
    {headers:{Accept:'application/json'}, credentials:'same-origin'})).json();
  const seen = new Set((have.value || []).map(q => q.new_contenthash));
  let added = 0, skipped = 0; const errs = [];
  for (const r of ROWS) {
    if (seen.has(r.new_contenthash)) { skipped++; continue; }
    const body = Object.assign({}, r, {
      'new_exam@odata.bind': '/new_exams(' + EXAM + ')',
      'new_module@odata.bind': '/new_exammodules(' + MODULE + ')'
    });
    const res = await fetch('/_api/new_examquestions', {method:'POST', headers:H, credentials:'same-origin', body: JSON.stringify(body)});
    if (res.status === 204 || res.status === 201) added++;
    else errs.push(res.status + ' ' + (await res.text()).slice(0, 120));
  }
  return 'загружено ' + added + ', пропущено как уже существующие ' + skipped + (errs.length ? ' | ошибки: ' + errs.join(' ; ') : '');
})()'''
    js = (js.replace('__EXAM__', EXAM)
            .replace('__MODULE__', data['module'])
            .replace('__ROWS__', json.dumps(rows, ensure_ascii=False)))
    io.open(r'C:\tmp\load_bank.js', 'w', encoding='utf-8').write(js)
    print('скрипт готов: урок %s, вопросов %d' % (data['lesson'], len(rows)))


if __name__ == '__main__':
    main()
