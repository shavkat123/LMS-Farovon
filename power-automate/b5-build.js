// Собирает решение с потоком «Проверка покупки награды»:
// триггер Dataverse «при создании new_rewardpurchase», запускается от владельца,
// сверяет цену со справочником, пересчитывает баланс, удаляет поддельные покупки,
// честным — списывает остаток. Портальный /_api/cloudflow на этом сайте неисправен
// (мигрированный ProgramRegistration_V2), поэтому контроль перенесён на сторону Dataverse.
const fs = require('fs');
const path = require('path');

const SRC = 'C:/tmp/flow-fixed';           // берём connectionReferences и каркас решения отсюда
const DST = 'C:/tmp/flow-b5';
const NEW_ID = 'aa00b5f1-64a0-4b5f-9c00-20260831b50f';
const NEW_ID_U = NEW_ID.toUpperCase();
const NAME = 'Проверка покупки награды';

const srcWf = JSON.parse(fs.readFileSync(path.join(SRC, 'Workflows', fs.readdirSync(path.join(SRC, 'Workflows'))[0]), 'utf8'));
const connRefs = srcWf.properties.connectionReferences; // тот же логический референс Dataverse

const TRIG = "triggerOutputs()?['body/";
const RID = TRIG + "_new_rewarditem_value']";
const UID = TRIG + "_new_user_value']";
const PID = TRIG + "new_rewardpurchaseid']";
const PSPENT = TRIG + "new_pointsspent']";
const G = "outputs('Получить_награду')?['body/";
const STOCK = G + "new_stock']", COST = G + "new_pointscost']", ACTIVE = G + "new_isactive']";

const dv = (operationId, parameters, runAfter, extra) => ({
  runAfter: runAfter || {},
  type: 'OpenApiConnection',
  inputs: {
    host: { connectionName: 'shared_commondataserviceforapps', operationId, apiId: '/providers/Microsoft.PowerApps/apis/shared_commondataserviceforapps' },
    parameters,
    authentication: "@parameters('$authentication')",
  },
  ...(extra || {}),
});
const del = (name, runAfter) => dv('DeleteRecord', { entityName: 'new_rewardpurchases', recordId: '@' + PID }, runAfter);

const definition = {
  $schema: 'https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#',
  contentVersion: '1.0.0.0',
  parameters: {
    $connections: { defaultValue: {}, type: 'Object' },
    $authentication: { defaultValue: {}, type: 'SecureObject' },
  },
  triggers: {
    'Когда_создана_покупка': {
      type: 'OpenApiConnectionWebhook',
      inputs: {
        host: { connectionName: 'shared_commondataserviceforapps', operationId: 'SubscribeWebhookTrigger', apiId: '/providers/Microsoft.PowerApps/apis/shared_commondataserviceforapps' },
        parameters: {
          'subscriptionRequest/message': 1,
          'subscriptionRequest/entityname': 'new_rewardpurchase',
          'subscriptionRequest/scope': 4,
        },
        authentication: "@parameters('$authentication')",
      },
    },
  },
  actions: {
    'Инициализировать_earned': {
      runAfter: {},
      type: 'InitializeVariable',
      inputs: { variables: [{ name: 'earned', type: 'integer', value: 0 }] },
    },
    'Инициализировать_spent': {
      runAfter: { 'Инициализировать_earned': ['Succeeded'] },
      type: 'InitializeVariable',
      inputs: { variables: [{ name: 'spent', type: 'integer', value: 0 }] },
    },
    'Условие_целостности': {
      runAfter: { 'Инициализировать_spent': ['Succeeded'] },
      type: 'If',
      expression: {
        and: [
          { not: { equals: ['@' + RID, '@null'] } },
          { not: { equals: ['@' + UID, '@null'] } },
        ],
      },
      else: { actions: { 'Удалить_битую_покупку': del() } },
      actions: {
        'Получить_награду': dv('GetItem', { entityName: 'new_rewarditems', recordId: '@' + RID }),
        'Условие_доступности': {
          runAfter: { 'Получить_награду': ['Succeeded'] },
          type: 'If',
          expression: {
            and: [
              { equals: ['@' + ACTIVE, '@true'] },
              { greater: ['@coalesce(' + STOCK + ', 1)', '@0'] },
              { not: { equals: ['@' + COST, '@null'] } },
            ],
          },
          else: { actions: { 'Удалить_недоступную': del() } },
          actions: {
            // Цена в записи обязана совпадать со справочником: подделку не удаляем, а исправляем —
            // сумма списания важнее наказания, а дальше баланс всё равно пересчитывается по факту.
            'Условие_цены': {
              runAfter: {},
              type: 'If',
              expression: { equals: ['@coalesce(' + PSPENT + ', -1)', '@' + COST] },
              else: {
                actions: {
                  'Исправить_цену': dv('UpdateOnlyRecord', {
                    entityName: 'new_rewardpurchases',
                    recordId: '@' + PID,
                    'item/new_pointsspent': '@' + COST,
                  }),
                },
              },
              actions: {},
            },
            'Список_прогресса': dv('ListRecords', {
              entityName: 'new_h5pprogresses',
              $filter: "_new_user_value eq '@{" + UID + "}' and new_completion eq true",
            }, { 'Условие_цены': ['Succeeded'] }),
            'Цикл_earned': {
              foreach: "@outputs('Список_прогресса')?['body/value']",
              runAfter: { 'Список_прогресса': ['Succeeded'] },
              type: 'Foreach',
              actions: {
                'Плюс_за_урок': {
                  runAfter: {},
                  type: 'IncrementVariable',
                  inputs: { name: 'earned', value: "@add(100, int(formatNumber(mul(float(coalesce(item()?['new_scorescaled'], 0)), 50), '0')))" },
                },
              },
            },
            // Сюда попадает и сама новая покупка (она уже создана) — баланс проверяется «после».
            'Список_покупок': dv('ListRecords', {
              entityName: 'new_rewardpurchases',
              $filter: "_new_user_value eq '@{" + UID + "}'",
            }, { 'Цикл_earned': ['Succeeded'] }),
            'Цикл_spent': {
              foreach: "@outputs('Список_покупок')?['body/value']",
              runAfter: { 'Список_покупок': ['Succeeded'] },
              type: 'Foreach',
              actions: {
                'Плюс_списание': {
                  runAfter: {},
                  type: 'IncrementVariable',
                  inputs: { name: 'spent', value: "@int(coalesce(item()?['new_pointsspent'], 0))" },
                },
              },
            },
            'Условие_баланса': {
              runAfter: { 'Цикл_spent': ['Succeeded'] },
              type: 'If',
              expression: { greaterOrEquals: ["@sub(variables('earned'), variables('spent'))", '@0'] },
              else: { actions: { 'Удалить_покупку_в_минус': del() } },
              actions: {
                'Условие_остатка': {
                  runAfter: {},
                  type: 'If',
                  expression: { equals: ['@' + STOCK, '@null'] },
                  actions: {}, // пустой остаток = без лимита, списывать нечего
                  else: {
                    actions: {
                      'Списать_остаток': dv('UpdateOnlyRecord', {
                        entityName: 'new_rewarditems',
                        recordId: '@' + RID,
                        'item/new_stock': '@sub(' + STOCK + ', 1)',
                      }),
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  outputs: {},
};

const wfJson = {
  properties: { connectionReferences: connRefs, definition, templateName: null },
  schemaVersion: '1.0.0.0',
};

// ── customizations.xml: добавляем второй Workflow-блок
let cust = fs.readFileSync(path.join(SRC, 'customizations.xml'), 'utf8');
const wfBlock = cust.match(/<Workflow [\s\S]*?<\/Workflow>/)[0];
const newBlock = wfBlock
  .replace(/WorkflowId="\{[^}]+\}"/, 'WorkflowId="{' + NEW_ID + '}"')
  .replace(/Name="[^"]*"/, 'Name="' + NAME + '"')
  .replace(/<JsonFileName>[^<]*<\/JsonFileName>/, '<JsonFileName>/Workflows/-' + NEW_ID_U + '.json</JsonFileName>')
  .replace(/description="[^"]*"/, 'description="' + NAME + '"');
if (!cust.includes(NEW_ID)) cust = cust.replace('</Workflows>', newBlock + '\n  </Workflows>');

// ── solution.xml: RootComponent для нового потока (type 29 = Workflow)
let sol = fs.readFileSync(path.join(SRC, 'solution.xml'), 'utf8');
if (/<RootComponents\s*\/>/.test(sol)) {
  sol = sol.replace(/<RootComponents\s*\/>/, '<RootComponents>\n      <RootComponent type="29" id="{' + NEW_ID + '}" behavior="0" />\n    </RootComponents>');
} else if (sol.includes('<RootComponents>') && !sol.includes(NEW_ID)) {
  sol = sol.replace('</RootComponents>', '  <RootComponent type="29" id="{' + NEW_ID + '}" behavior="0" />\n    </RootComponents>');
}
console.log('RootComponents в solution.xml:', sol.includes(NEW_ID) ? 'добавлен' : 'СЕКЦИЯ НЕ НАЙДЕНА — проверить вручную');

// ── запись
fs.rmSync(DST, { recursive: true, force: true });
fs.mkdirSync(path.join(DST, 'Workflows'), { recursive: true });
fs.copyFileSync(path.join(SRC, '[Content_Types].xml'), path.join(DST, '[Content_Types].xml'));
fs.writeFileSync(path.join(DST, 'customizations.xml'), cust);
fs.writeFileSync(path.join(DST, 'solution.xml'), sol);
// кладём ОБА потока: старый (исправленный) и новый контролёр — импорт обновит один и создаст второй
fs.copyFileSync(
  path.join(SRC, 'Workflows', fs.readdirSync(path.join(SRC, 'Workflows'))[0]),
  path.join(DST, 'Workflows', fs.readdirSync(path.join(SRC, 'Workflows'))[0])
);
fs.writeFileSync(path.join(DST, 'Workflows', '-' + NEW_ID_U + '.json'), JSON.stringify(wfJson, null, 2));

// самопроверка
JSON.parse(fs.readFileSync(path.join(DST, 'Workflows', '-' + NEW_ID_U + '.json'), 'utf8'));
const out = fs.readFileSync(path.join(DST, 'Workflows', '-' + NEW_ID_U + '.json'), 'utf8');
[
  ['фильтр прогресса с userId', out.includes("_new_user_value eq '@{triggerOutputs()?['body/_new_user_value']}' and new_completion")],
  ['удаление по id покупки', out.includes("recordId\": \"@triggerOutputs()?['body/new_rewardpurchaseid']\"")],
  ['customizations: 2 workflow', (cust.match(/<Workflow /g) || []).length === 2],
].forEach(([n, ok]) => console.log((ok ? '  ок  ' : 'ПРОВАЛ ') + n));
console.log('готово: ' + DST);
