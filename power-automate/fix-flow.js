// Правит определение потока «Оформить покупку награды» из экспортированного решения.
// Вход: C:\tmp\flow-src (распакованный экспорт). Выход: C:\tmp\flow-fixed (для упаковки в zip).
const fs = require('fs');
const path = require('path');

const SRC = 'C:/tmp/flow-src';
const DST = 'C:/tmp/flow-fixed';

const wfDir = path.join(SRC, 'Workflows');
const wfFile = fs.readdirSync(wfDir).find((f) => f.endsWith('.json'));
const def = JSON.parse(fs.readFileSync(path.join(wfDir, wfFile), 'utf8'));
const D = def.properties.definition;
const problems = [];

// ── 1. Схема триггера: вход rewardItemId пропал (properties пустой), а действия
//       ссылаются на triggerBody()['text']. Восстанавливаем в формате конструктора:
//       ключ text, отображаемое имя rewardItemId.
if (!D.triggers.manual.inputs.schema.properties.text) problems.push('схема триггера была пустой — вход rewardItemId восстановлен');
D.triggers.manual.inputs.schema = {
  type: 'object',
  properties: {
    text: {
      title: 'rewardItemId',
      type: 'string',
      'x-ms-dynamically-added': true,
      description: 'ID награды (GUID записи new_rewarditem)',
      'x-ms-content-hint': 'TEXT',
    },
  },
  required: ['text'],
};

const GET = "outputs('Получить_строку_по_ИД')?['body/";
const STOCK = GET + "new_stock']";
const COST = GET + "new_pointscost']";
const ACTIVE = GET + "new_isactive']";

// ── 2. Условие 1: пустой new_stock = «без лимита», не отказ
const c1 = D.actions['Условие'];
c1.expression = {
  and: [
    { equals: ['@' + ACTIVE, '@true'] },
    { greater: ['@coalesce(' + STOCK + ', 1)', '@0'] },
  ],
};
problems.push('условие 1: пустой остаток теперь проходит как «без лимита»');

// ── 3. Вложенные циклы: Список_строк_2 и Применить_к_каждому_2 лежали ВНУТРИ
//       первого цикла — потраченное умножалось на число пройденных уроков.
const a = c1.actions;
const loop1 = a['Применить_к_каждому'];
const list2 = loop1.actions['Список_строк_2'];
const loop2 = loop1.actions['Применить_к_каждому_2'];
if (list2 && loop2) {
  delete loop1.actions['Список_строк_2'];
  delete loop1.actions['Применить_к_каждому_2'];
  list2.runAfter = { 'Применить_к_каждому': ['Succeeded'] };
  loop2.runAfter = { 'Список_строк_2': ['Succeeded'] };
  a['Список_строк_2'] = list2;
  a['Применить_к_каждому_2'] = loop2;
  a['Условие_2'].runAfter = { 'Применить_к_каждому_2': ['Succeeded'] };
  problems.push('циклы: второй список и цикл вынесены из первого цикла на один уровень');
}

// ── 4. Лишние пробелы внутри кавычек/скобок — GUID не совпадал, лукапы не собирались
a['Список_строк_2'].inputs.parameters['$filter'] = "_new_user_value eq '@{triggerBody()['userId']}'";
const add = a['Условие_2'].actions['Добавление_новой_строки'].inputs.parameters;
add['item/new_rewarditem@odata.bind'] = "new_rewarditems(@{triggerBody()['text']})";
add['item/new_user@odata.bind'] = "contacts(@{triggerBody()['userId']})";
problems.push('фильтр покупок и оба лукапа: убраны пробелы внутри кавычек и скобок');

// ── 5. Обновление остатка: пустой — не трогаем, иначе sub(null,1) роняет поток
a['Условие_2'].actions['Обновить_строку'].inputs.parameters['item/new_stock'] =
  '@if(equals(' + STOCK + ', null), null, sub(' + STOCK + ', 1))';
problems.push('обновление остатка: пустой new_stock не списывается и не роняет поток');

// ── 6. Ответы: одинаковая схема, настоящие boolean/number (без @{...}, которое даёт строку),
//       stock = -1 означает «без лимита»
const schema = {
  type: 'object',
  properties: {
    ok:      { title: 'ok',      'x-ms-dynamically-added': true, type: 'boolean' },
    message: { title: 'message', 'x-ms-dynamically-added': true, type: 'string' },
    balance: { title: 'balance', 'x-ms-dynamically-added': true, type: 'number' },
    stock:   { title: 'stock',   'x-ms-dynamically-added': true, type: 'number' },
  },
};
const r3 = a['Условие_2'].actions['Return_value(s)_to_Power_Pages_3'].inputs;
r3.body = {
  ok: '@true',
  message: 'Покупка оформлена',
  balance: "@sub(sub(variables('earned'), variables('spent')), " + COST + ')',
  stock: '@if(equals(' + STOCK + ', null), -1, sub(' + STOCK + ', 1))',
};
r3.schema = schema;
const r2 = a['Условие_2'].else.actions['Return_value(s)_to_Power_Pages_2'].inputs;
r2.body = {
  ok: '@false',
  message: 'Недостаточно монет',
  balance: "@sub(variables('earned'), variables('spent'))",
  stock: '@coalesce(' + STOCK + ', -1)',
};
r2.schema = schema;
const r1 = c1.else.actions['Return_value(s)_to_Power_Pages'].inputs;
r1.body = {
  ok: '@false',
  message: 'Награда недоступна или закончилась',
  balance: 0,
  stock: '@coalesce(' + STOCK + ', -1)',
};
r1.schema = schema;
problems.push('три ответа: ok — настоящий boolean, balance/stock — числа, схемы идентичны');

// ── запись
fs.rmSync(DST, { recursive: true, force: true });
fs.mkdirSync(path.join(DST, 'Workflows'), { recursive: true });
for (const f of fs.readdirSync(SRC)) {
  const p = path.join(SRC, f);
  if (fs.statSync(p).isFile()) fs.copyFileSync(p, path.join(DST, f));
}
fs.writeFileSync(path.join(DST, 'Workflows', wfFile), JSON.stringify(def, null, 2));

// ── самопроверка
const out = fs.readFileSync(path.join(DST, 'Workflows', wfFile), 'utf8');
const bad = [];
if (/\(\s@\{/.test(out) || /'\s@\{/.test(out)) bad.push('остались пробелы перед @{');
if (/"@\{(true|false)\}"/.test(out)) bad.push('boolean через @{...}');
const top = Object.keys(a);
if (!(top.includes('Список_строк_2') && top.includes('Применить_к_каждому_2'))) bad.push('циклы не на верхнем уровне ветки');
if (Object.keys(loop1.actions).length !== 1) bad.push('в первом цикле лишние действия: ' + Object.keys(loop1.actions).join(','));
JSON.parse(out);

console.log('Исправлено:');
problems.forEach((p) => console.log('  • ' + p));
console.log(bad.length ? 'САМОПРОВЕРКА НЕ ПРОШЛА: ' + bad.join('; ') : 'Самопроверка: ок');
console.log('Порядок в ветке «Если да»: ' + top.join(' → '));
