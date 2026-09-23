# -*- coding: utf-8 -*-
"""Упаковывает облачные потоки экзамена в решение для `pac solution import`.

Тот же приём, что и с таблицами: конструктор Power Automate нам недоступен без интерактивного
входа (политика условного доступа), зато импорт решения через pac работает. Определения
потоков лежат рядом с кодом в power-automate/exam/*.flow.json — это заодно решает старую
проблему «конструктор молча переименовал действие, и портал перестал работать».

Соответствие «файл → поток» держится в flows.json: там же идентификаторы, чтобы повторный
импорт обновлял тот же поток, а не создавал второй.

Запуск:
    python build-exam-flows.py --out C:\\tmp\\exam-flows.zip
    python build-exam-flows.py --only F-A6 --out C:\\tmp\\flow-pilot.zip
"""
import argparse
import io
import json
import os
import re
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
FLOWDIR = os.path.abspath(os.path.join(HERE, '..', '..', 'power-automate', 'exam'))
REGISTRY = os.path.join(FLOWDIR, 'flows.json')
REF_SOLUTION = r'C:\tmp\solref2\LMSfarovon.zip'   # откуда берём блок издателя


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


def build(out_path, only=None, ref=REF_SOLUTION, unique='LMSExam', display='LMS Exam'):
    flows = json.load(io.open(REGISTRY, encoding='utf-8'))['flows']
    if only:
        wanted = set(only)
        flows = [f for f in flows if f['code'] in wanted]
        if not flows:
            raise SystemExit('в flows.json нет потоков: %s' % ', '.join(only))

    nodes, roots, files = [], [], {}
    for f in flows:
        src = os.path.join(FLOWDIR, f['file'])
        definition = json.load(io.open(src, encoding='utf-8'))          # заодно проверяем JSON
        gid = f['id'].lower()
        json_name = '/Workflows/%s-%s.json' % (f['code'], gid.upper())
        files[json_name.lstrip('/')] = json.dumps(definition, ensure_ascii=False, indent=2)

        # StateCode 1 / StatusCode 2 — поток включён; 0/1 — выключен.
        state, status = (1, 2) if f.get('enabled', True) else (0, 1)
        nodes.append(
            '<Workflow WorkflowId="{%s}" Name="%s">'
            '<JsonFileName>%s</JsonFileName>'
            '<Type>1</Type><Subprocess>%d</Subprocess><Category>5</Category><Mode>0</Mode>'
            '<Scope>4</Scope><OnDemand>0</OnDemand><TriggerOnCreate>0</TriggerOnCreate>'
            '<TriggerOnDelete>0</TriggerOnDelete><AsyncAutodelete>0</AsyncAutodelete>'
            '<SyncWorkflowLogOnFailure>0</SyncWorkflowLogOnFailure>'
            '<StateCode>%d</StateCode><StatusCode>%d</StatusCode>'
            '<RunAs>1</RunAs><IsTransacted>1</IsTransacted>'
            '<IntroducedVersion>1.0.0.0</IntroducedVersion><IsCustomizable>1</IsCustomizable>'
            '<BusinessProcessType>0</BusinessProcessType>'
            '<IsCustomProcessingStepAllowedForOtherPublishers>1</IsCustomProcessingStepAllowedForOtherPublishers>'
            '<ModernFlowType>0</ModernFlowType><PrimaryEntity>none</PrimaryEntity>'
            '<LocalizedNames><LocalizedName languagecode="1033" description="%s" /></LocalizedNames>'
            '</Workflow>'
            % (gid, esc(f['name']), json_name, 1 if f.get('child') else 0, state, status, esc(f['name'])))
        roots.append('<RootComponent type="29" id="{%s}" behavior="0" />' % gid)

    customizations = (
        '<?xml version="1.0" encoding="utf-8"?>'
        '<ImportExportXml xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        '<Entities />'
        '<Roles />'
        '<Workflows>' + ''.join(nodes) + '</Workflows>'
        '<FieldSecurityProfiles />'
        '<Templates />'
        '<EntityMaps />'
        '<EntityRelationships />'
        '<OrganizationSettings />'
        '<optionsets />'
        '<CustomControls />'
        '<EntityDataProviders />'
        '<Languages><Language>1033</Language></Languages>'
        '</ImportExportXml>')

    ref_sol = zipfile.ZipFile(ref).read('solution.xml').decode('utf-8')
    publisher = re.search(r'<Publisher>.*?</Publisher>', ref_sol, re.S).group(0)

    solution = (
        '<?xml version="1.0" encoding="utf-8"?>'
        '<ImportExportXml version="9.2.26083.162" SolutionPackageVersion="9.2" languagecode="1033" '
        'generatedBy="CrmLive" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        '<SolutionManifest>'
        '<UniqueName>%s</UniqueName>'
        '<LocalizedNames><LocalizedName description="%s" languagecode="1033" /></LocalizedNames>'
        '<Descriptions /><Version>1.0.0.0</Version><Managed>0</Managed>'
        '%s'
        '<RootComponents>%s</RootComponents>'
        '<MissingDependencies />'
        '</SolutionManifest></ImportExportXml>'
        % (unique, esc(display), publisher, ''.join(roots)))

    content_types = ('<?xml version="1.0" encoding="utf-8"?>'
                     '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
                     '<Default Extension="xml" ContentType="application/octet-stream" />'
                     '<Default Extension="json" ContentType="application/octet-stream" /></Types>')

    with zipfile.ZipFile(out_path, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('solution.xml', solution.encode('utf-8'))
        z.writestr('customizations.xml', customizations.encode('utf-8'))
        z.writestr('[Content_Types].xml', content_types.encode('utf-8'))
        for name, body in files.items():
            z.writestr(name, body.encode('utf-8'))

    print('решение: %s (%.1f КБ)' % (out_path, os.path.getsize(out_path) / 1024.0))
    for f in flows:
        print('  %-6s %-34s %s' % (f['code'], f['name'], 'включён' if f.get('enabled', True) else 'выключен'))


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--out', default=r'C:\tmp\exam-flows.zip')
    p.add_argument('--only', help='коды потоков через запятую, например F-A6')
    p.add_argument('--ref', default=REF_SOLUTION)
    a = p.parse_args()
    build(a.out, a.only.split(',') if a.only else None, a.ref)
