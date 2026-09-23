// Вторая правка потока: валидация триггера не должна отбрасывать вызов на входе
// (иначе портал получает отказ, а в журнале пусто и диагностировать нечего),
// а id награды принимается и по внутреннему ключу text, и по имени rewardItemId.
const fs = require('fs');
const path = require('path');

const DIR = 'C:/tmp/flow-fixed';
const wfDir = path.join(DIR, 'Workflows');
const wfFile = fs.readdirSync(wfDir).find((f) => f.endsWith('.json'));
const p = path.join(wfDir, wfFile);
const def = JSON.parse(fs.readFileSync(p, 'utf8'));
const D = def.properties.definition;

// 1. Схема: поле описано, но НЕ обязательно — валидация на входе ничего не режет.
D.triggers.manual.inputs.schema.required = [];

// 2. Все чтения id награды — через coalesce обоих ключей.
const ID = "coalesce(triggerBody()?['text'], triggerBody()?['rewardItemId'])";
const a = D.actions;
a['Получить_строку_по_ИД'].inputs.parameters.recordId = '@' + ID;
const c2 = a['Условие'].actions['Условие_2'].actions;
c2['Добавление_новой_строки'].inputs.parameters['item/new_rewarditem@odata.bind'] = 'new_rewarditems(@{' + ID + '})';
c2['Обновить_строку'].inputs.parameters.recordId = '@' + ID;

fs.writeFileSync(p, JSON.stringify(def, null, 2));

// самопроверка
const out = fs.readFileSync(p, 'utf8');
const checks = [
  ["required пуст", /"required": \[\]/.test(out)],
  ["recordId через coalesce", out.includes('"recordId": "@' + ID + '"')],
  ["bind через coalesce", out.includes('new_rewarditems(@{' + ID + '})')],
  ["старых одиночных чтений text не осталось", !/@triggerBody\(\)\['text'\]/.test(out)],
];
JSON.parse(out);
checks.forEach(([n, ok]) => console.log((ok ? '  ок  ' : 'ПРОВАЛ ') + n));
process.exit(checks.every(([, ok]) => ok) ? 0 : 1);
