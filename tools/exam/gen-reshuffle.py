# -*- coding: utf-8 -*-
"""Перемешивает варианты у уже загруженных вопросов урока и отправляет их на повторную проверку.

Понадобилось после того, как выяснилось, что во всех загруженных вопросах верный вариант
стоял первым: рецензия в таком порядке могла выиграть от тяги модели к первому варианту.
Вопрос находится по new_contenthash, варианты перемешиваются тем же детерминированным
способом, что и в загрузчике, статус ставится «На проверке» — поток F-B5 ловит это изменение
и отправляет вопрос рецензенту заново.

Запуск: python gen-reshuffle.py C:\\tmp\\bank\\lesson-1.json → C:\\tmp\\reshuffle.js
"""
import importlib.util
import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('loader', os.path.join(HERE, 'gen-load-bank.py'))
loader = importlib.util.module_from_spec(spec)
spec.loader.exec_module(loader)


def main():
    data = json.load(io.open(sys.argv[1], encoding='utf-8'))
    patches = []
    for q in data['questions']:
        if q['type'] not in ('single', 'multi'):
            continue
        opts = [{'id': 'abcdefg'[i], 'text': o['text'], 'correct': bool(o['correct']),
                 'misconception': o.get('misconception', '')}
                for i, o in enumerate(loader.shuffled(q['options'], q['stem']))]
        patches.append({'hash': loader.content_hash(q['stem']),
                        'optionsjson': json.dumps(opts, ensure_ascii=False),
                        'key': '|'.join(o['id'] for o in opts if o['correct'])})

    js = r'''(async () => {
  const MODULE = "__MODULE__";
  const P = __PATCHES__;
  const th = await (await fetch('/_layout/tokenhtml', {credentials:'same-origin'})).text();
  const tok = (th.match(/value="([^"]+)"/) || [])[1];
  const H = {'Content-Type':'application/json','Accept':'application/json','__RequestVerificationToken':tok};
  const rows = (await (await fetch("/_api/new_examquestions?$select=new_examquestionid,new_contenthash&$filter=_new_module_value eq " + MODULE + "&$top=500",
    {headers:{Accept:'application/json'}, credentials:'same-origin'})).json()).value || [];
  const byHash = {}; rows.forEach(r => byHash[r.new_contenthash] = r.new_examquestionid);
  let ok = 0; const miss = [], errs = [], keys = [];
  for (const p of P) {
    const id = byHash[p.hash];
    if (!id) { miss.push(p.hash.slice(0, 40)); continue; }
    const res = await fetch('/_api/new_examquestions(' + id + ')', {method:'PATCH', headers:H, credentials:'same-origin',
      body: JSON.stringify({ new_optionsjson: p.optionsjson, new_status: 100000000 })});
    if (res.status === 204) { ok++; keys.push(p.key); } else errs.push(res.status + ' ' + (await res.text()).slice(0, 100));
  }
  return 'перемешано и отправлено на проверку: ' + ok + ' | новые ключи: ' + keys.join(', ') +
         (miss.length ? ' | не найдены: ' + miss.length : '') + (errs.length ? ' | ошибки: ' + errs.join(' ; ') : '');
})()'''
    js = js.replace('__MODULE__', data['module']).replace('__PATCHES__', json.dumps(patches, ensure_ascii=False))
    io.open(r'C:\tmp\reshuffle.js', 'w', encoding='utf-8').write(js)
    print('скрипт готов: урок %s, вопросов %d' % (data['lesson'], len(patches)))


if __name__ == '__main__':
    main()
