# -*- coding: utf-8 -*-
"""Генерирует yml прав на таблицы экзамена по матрице из раздела 3.3 методички.

Почему генератором, а не руками: прав 23, у каждого своя область, набор флагов и
связь с contact. Ошибка в одном поле не видна глазом, а на портале превращается в
тихий 403 при сохранении ответа. Матрица ниже — дословный перенос таблицы из 3.3.

Правило Append/AppendTo: чтобы POST с @odata.bind прошёл, Append нужен на создаваемой
таблице, а AppendTo — на той, куда ведёт ссылка. Поэтому у new_exam и new_examticketitem
стоит appendto, хотя участник их только читает.
"""
import io
import os

AUTH = '2ccfddf9-a538-f111-88b5-7ced8d76b3cc'          # Authenticated Users
ADMINS = '3b5fe5f3-a538-f111-88b5-7ced8d76b3cc'        # Administrators
EXAM_ADMIN = 'a1b2c3d4-1111-2222-3333-000000000005'    # Аттестация: администратор (новая роль)

GLOBAL = 756150000
CONTACT = 756150001

# файл, имя, таблица, область, связь с contact, роли, флаги (c r w d append appendto), зачем
P = [
    # ─── участник
    ('Exam-Read', 'Exam Read', 'new_exam', GLOBAL, None, [AUTH], 'r__.aA',
     'Участник читает условия экзамена. AppendTo — чтобы его попытка сослалась на экзамен.'),
    ('Exam-Attempt-Self', 'Exam Attempt Self', 'new_examattempt', CONTACT,
     'new_examattempt_contact_contact', [AUTH], 'cr_.aA',
     'Свои попытки: создаёт и читает. Статусы и баллы проставляет поток, не участник.'),
    ('Exam-TicketItem-Self', 'Exam Ticket Item Self', 'new_examticketitem', CONTACT,
     'new_examticketitem_contact_contact', [AUTH], 'r__.aA',
     'Свой билет. Ключа в нём нет до финализации. AppendTo — чтобы ответ сослался на задание.'),
    ('Exam-Answer-Self', 'Exam Answer Self', 'new_examanswer', CONTACT,
     'new_examanswer_contact_contact', [AUTH], 'cr_.aA',
     'Ответы участник только создаёт и читает; правку ответа даёт создание новой записи.'),
    ('Exam-Submission-Self', 'Exam Submission Self', 'new_examsubmission', CONTACT,
     'new_examsubmission_contact_contact', [AUTH], 'cr_.aA',
     'Команда «Завершить» — это создание записи, обработку делает поток.'),
    ('Exam-Appeal-Self', 'Exam Appeal Self', 'new_examappeal', CONTACT,
     'new_examappeal_contact_contact', [AUTH], 'cr_.aA',
     'Апелляцию участник подаёт и видит её статус.'),
    ('Certification-Self', 'Certification Self', 'new_certification', CONTACT,
     'new_certification_contact_contact', [AUTH], 'r__.aA',
     'Свой сертификат.'),

    # ─── администратор аттестации
    ('Exam-Admin-Manage', 'Exam Admin Manage', 'new_exam', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'crw.aA',
     'Настройка и публикация экзамена.'),
    ('Exam-Module-Admin', 'Exam Module Admin', 'new_exammodule', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'crw.aA',
     'Модули экзамена и их материалы.'),
    ('Exam-Question-Admin', 'Exam Question Admin', 'new_examquestion', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'crw.aA',
     'Банк вопросов. Участнику доступа нет: внутри хранится ключ.'),
    ('Exam-Prompt-Admin', 'Exam Prompt Admin', 'new_aiprompt', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'crw.aA',
     'Промпты. Утверждённая версия не меняется — правка создаёт новую.'),
    ('Exam-Slide-Admin', 'Exam Slide Admin', 'new_examslide', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'crwDaA',
     'Слайды — рабочие данные: при повторном извлечении старые удаляются, поэтому есть Delete.'),
    ('Exam-Job-Admin', 'Exam Job Admin', 'new_aijob', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'cr_.aA',
     'Задания на генерацию вопросов: создаются, дальше их ведёт поток.'),
    ('Exam-AdminAction-Admin', 'Exam Admin Action', 'new_examadminaction', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'cr_.aA',
     'Нейтрализация вопроса, аннулирование попытки, дополнительная попытка.'),
    ('Exam-Attempt-Admin', 'Exam Attempt Admin', 'new_examattempt', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'r__.aA',
     'Чтение чужих попыток для разбора и отчётов. Изменяет их только поток.'),
    ('Exam-TicketItem-Admin', 'Exam Ticket Item Admin', 'new_examticketitem', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'r__.aA', ''),
    ('Exam-Answer-Admin', 'Exam Answer Admin', 'new_examanswer', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'r__.aA', ''),
    ('Exam-Submission-Admin', 'Exam Submission Admin', 'new_examsubmission', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'r__.aA', ''),
    ('Exam-Appeal-Admin', 'Exam Appeal Admin', 'new_examappeal', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'r__.aA', ''),
    ('Exam-Grade-Admin', 'Exam Grade Admin', 'new_examgrade', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'r__.aA',
     'Прогоны ИИ-оценки: смотреть можно, менять нельзя — это доказательная база.'),
    ('Exam-Log-Admin', 'Exam Log Admin', 'new_examlog', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'r__.aA',
     'Журнал только на чтение: записи журнала не правятся.'),
    ('Certification-Admin', 'Certification Admin', 'new_certification', GLOBAL, None, [ADMINS, EXAM_ADMIN], 'r__.aA', ''),

    # ─── добавлено после живого прогона 22.09.2026 (в конец списка: номера прав идут по порядку)
    ('Exam-AdminAction-Self', 'Exam Admin Action Self', 'new_examadminaction', CONTACT,
     'new_examadminaction_contact_contact', [AUTH], 'r__.__',
     'Участник читает только свои действия администратора: так страница аттестации видит выданные ему '
     'дополнительные попытки и считает лимит так же, как поток сборки билета. '
     'Нейтрализации к сотруднику не привязаны и ему не видны.'),
]


def flags(code):
    """'crw.aA' → create, read, write, без delete, append, appendto."""
    return {
        'create': 'c' in code,
        'read': 'r' in code,
        'write': 'w' in code,
        'delete': 'D' in code,
        'append': 'a' in code,
        'appendto': 'A' in code,
    }


def main():
    root = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                        '..', '..', 'lms-farovon---lms-farovon', 'table-permissions'))
    seq = 0x20
    for fname, name, table, scope, rel, roles, code, why in P:
        seq += 1
        f = flags(code)
        gid = 'a1b2c3d4-3333-4444-5555-0000000000%02x' % seq
        lines = []
        if why:
            for part in why.split('. '):
                part = part.strip()
                if part:
                    lines.append('# ' + part + ('' if part.endswith('.') else '.'))
            lines.append('#')
        lines.append('adx_append: %s' % str(f['append']).lower())
        lines.append('adx_appendto: %s' % str(f['appendto']).lower())
        lines.append('adx_contactrelationship: %s' % (rel or ''))
        lines.append('adx_create: %s' % str(f['create']).lower())
        lines.append('adx_delete: %s' % str(f['delete']).lower())
        lines.append('adx_entitylogicalname: %s' % table)
        lines.append('adx_entityname: %s' % name)
        lines.append('adx_entitypermission_webrole:')
        for r in roles:
            lines.append('- %s' % r)
        lines.append('adx_entitypermissionid: %s' % gid)
        lines.append('adx_parententitypermission: ')
        lines.append('adx_read: %s' % str(f['read']).lower())
        lines.append('adx_scope: %d' % scope)
        lines.append('adx_write: %s' % str(f['write']).lower())
        path = os.path.join(root, fname + '.tablepermission.yml')
        io.open(path, 'w', encoding='utf-8', newline='\n').write('\n'.join(lines) + '\n')
        print('  %-26s %-22s %s' % (fname, table, 'Contact' if scope == CONTACT else 'Global'))
    print('создано файлов прав: %d' % len(P))


if __name__ == '__main__':
    main()
