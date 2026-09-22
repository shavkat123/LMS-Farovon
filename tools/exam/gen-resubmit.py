# -*- coding: utf-8 -*-
"""Отправляет на повторную проверку отклонённые вопросы урока после правки.

Зачем: рецензент чаще всего отклоняет не сам вопрос, а поле рядом с ним — например,
уровень «advanced» у вопроса, который просто воспроизводит факт урока. Такой вопрос
достаточно поправить в JSON урока (уровень, варианты, пояснение, цитату) и вернуть
рецензенту. Трогаются только вопросы в статусе «Отклонён» — одобренные не проверяются
повторно и не тратят деньги.

Вопрос находится по new_contenthash, поэтому формулировку менять нельзя: изменённый
вопрос — это новый вопрос, его надо загрузить заново, а старый вывести.

Запуск: python gen-resubmit.py C:\\tmp\\bank\\lesson-4.json → C:\\tmp\\resubmit.js
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
        body = {'new_difficulty': loader.DIFFICULTY[q['difficulty']],
                'new_explanation': q.get('explanation', ''),
                'new_sourcequote': q['source_quote'],
                'new_status': 100000000}
        if q['type'] in ('single', 'multi'):
            body['new_optionsjson'] = json.dumps(
                [{'id': 'abcdefg'[i], 'text': o['text'], 'correct': bool(o['correct']),
                  'misconception': o.get('misconception', '')}
                 for i, o in enumerate(loader.shuffled(q['options'], q['stem']))],
                ensure_ascii=False)
        patches.append({'hash': loader.content_hash(q['stem']), 'body': body})

    js = r'''(async () => {
  const MODULE = "__MODULE__";
  const P = __PATCHES__;
  const th = await (await fetch('/_layout/tokenhtml', {credentials:'same-origin'})).text();
  const tok = (th.match(/value="([^"]+)"/) || [])[1];
  const H = {'Content-Type':'application/json','Accept':'application/json','__RequestVerificationToken':tok};
  const rows = (await (await fetch("/_api/new_examquestions?$select=new_examquestionid,new_contenthash,new_status&$filter=_new_module_value eq " + MODULE + "&$top=500",
    {headers:{Accept:'application/json'}, credentials:'same-origin'})).json()).value || [];
  const byHash = {}; rows.forEach(r => byHash[r.new_contenthash] = r);
  let ok = 0; const errs = [];
  for (const p of P) {
    const row = byHash[p.hash];
    if (!row || row.new_status !== 100000002) continue;
    const res = await fetch('/_api/new_examquestions(' + row.new_examquestionid + ')', {method:'PATCH', headers:H, credentials:'same-origin',
      body: JSON.stringify(p.body)});
    if (res.status === 204) ok++; else errs.push(res.status + ' ' + (await res.text()).slice(0, 100));
  }
  return 'возвращено на проверку: ' + ok + (errs.length ? ' | ошибки: ' + errs.join(' ; ') : '');
})()'''
    js = js.replace('__MODULE__', data['module']).replace('__PATCHES__', json.dumps(patches, ensure_ascii=False))
    io.open(r'C:\tmp\resubmit.js', 'w', encoding='utf-8').write(js)
    print('скрипт готов: урок %s, вопросов в файле %d' % (data['lesson'], len(patches)))


if __name__ == '__main__':
    main()
