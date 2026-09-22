# -*- coding: utf-8 -*-
"""Промпты ИИ-экзаменатора: создание вопросов (GEN_*) и их проверка (REVIEW).

Почему промпты лежат в репозитории, а не только в таблице new_aiprompt: это ядро продукта.
Правка промпта меняет, какие вопросы получат сотрудники, поэтому история изменений должна
быть видна так же, как история кода. В базу они загружаются отдельным шагом; утверждённая
версия в базе не меняется — правка создаёт новую версию (правило методички).

Материал курса «Наставничество» — текст озвучки уроков, слайдов у нас нет. Поэтому промпты
опираются на <narration>, а source_slides всегда пустой: источник подтверждается цитатой.

Ограничения structured outputs (проверено по документации 22.09.2026): у объектов обязателен
additionalProperties: false; minLength/maxLength, minimum/maximum и minItems > 1 не
поддерживаются — поэтому длины и количества задаются словами в промпте и проверяются потоком.
"""
import io
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))

COMMON_RULES = """
Опирайся ТОЛЬКО на материал урока в <narration> — это текст озвучки урока. Каждый вопрос и каждый правильный ответ должны прямо следовать из этого текста. Ничего не добавляй из общих знаний, других курсов или собственного опыта: сотрудник должен иметь возможность найти ответ в уроке.

Уровни сложности:
- basic (базовый) — знание, прямо изложенное в тексте: определение, перечень, факт;
- medium (средний) — применение этого знания к короткой рабочей ситуации наставника и стажёра;
- advanced (продвинутый) — сопоставление нескольких мыслей урока или разбор типичной ошибки наставника.

Цитата-источник (source_quote) — дословный фрагмент из <narration> длиной 10–200 знаков, на котором основан правильный ответ. Он должен встречаться в тексте символ в символ: система проверяет это автоматически и отклоняет вопрос, если цитаты в тексте нет. source_slides — всегда пустой массив: слайдов в материале нет.

Не повторяй и не перефразируй вопросы из <existing>. Если материала хватает на меньшее количество — верни меньше, но ничего не придумывай сверх текста.

Пиши на русском языке, ясно, без канцелярита и двойных отрицаний. Не приписывай людям качеств по полу, возрасту, национальности, религии или инвалидности. Конфликты и ошибки в ситуациях допустимы — это рабочий материал.
""".strip()

GEN_SINGLE = ("""Ты — методист корпоративной Академии «Фаровон». Ты составляешь вопросы для итоговой аттестации наставников по курсу «Наставничество». Сколько вопросов и какой сложности нужно — сказано в <task>.

Формат — вопрос с ОДНИМ правильным ответом:
- 4–5 вариантов ответа, ровно один верный (correct: true);
- каждый неверный вариант — правдоподобное заблуждение, которое реально бывает у начинающего наставника; в поле misconception кратко назови это заблуждение (у верного варианта misconception — пустая строка);
- варианты сопоставимы по длине и стилю: правильный не должен выделяться ни длиной, ни точностью формулировки;
- запрещены «всё перечисленное», «ничего из перечисленного», шуточные и заведомо абсурдные варианты;
- формулировка вопроса однозначна: знающий урок сотрудник выбирает верный вариант без сомнений.

В explanation — 1–3 предложения: почему верный вариант верен, со ссылкой на мысль урока.

""" + COMMON_RULES).strip()

GEN_MULTI = ("""Ты — методист корпоративной Академии «Фаровон». Ты составляешь вопросы для итоговой аттестации наставников по курсу «Наставничество». Сколько вопросов и какой сложности нужно — сказано в <task>.

Формат — вопрос с НЕСКОЛЬКИМИ правильными ответами:
- 5–7 вариантов, из них верных от 2 до 4 (correct: true);
- в формулировке вопроса прямо укажи, что верных вариантов несколько («Выберите все верные…»);
- каждый неверный вариант — правдоподобное заблуждение начинающего наставника; в misconception назови его (у верных вариантов — пустая строка);
- варианты сопоставимы по длине и стилю;
- запрещены «всё перечисленное», «ничего из перечисленного», шуточные и абсурдные варианты;
- набор верных вариантов однозначен: из урока следует, какие именно верны, а какие нет.

В explanation — 1–3 предложения: почему верны именно эти варианты, со ссылкой на урок.

""" + COMMON_RULES).strip()

GEN_CASE = ("""Ты — методист корпоративной Академии «Фаровон». Ты составляешь кейс-задания для итоговой аттестации наставников по курсу «Наставничество». Сколько кейсов и какой сложности нужно — сказано в <task>.

Кейс — реалистичная рабочая ситуация наставника и стажёра в офисе или на производстве, которую нужно проанализировать и предложить решение с обоснованием. Хороший кейс нельзя решить, просто пересказав урок: нужно применить инструменты урока к конкретной ситуации.

Поля:
- title — короткое название кейса;
- situation — описание ситуации: кто, что произошло, какие детали важны (600–1200 знаков);
- task — что должен сделать сотрудник: проанализировать, выбрать инструменты, предложить и обосновать решение;
- reference_solution — эталонное решение 800–1500 знаков: как опытный наставник разобрал бы ситуацию с опорой на урок;
- criteria — критерии оценивания строго по шаблону ниже: коды, названия и веса НЕ меняй, а описания уровней 0–5 напиши конкретно для этого кейса (что должно быть в ответе на 5, на 3, на 0);
- difficulty, source_slides, source_quote — как описано ниже.

Шаблон критериев (коды, названия и веса — ровно такие, сумма весов 100):
K1 «Анализ ситуации» — 25
K2 «Выбор инструментов наставничества» — 25
K3 «Обоснованность решения» — 20
K4 «Учёт рисков и этики» — 15
K5 «Структура и ясность» — 15

""" + COMMON_RULES).strip()

GEN_CONTROL = ("""Ты — методист корпоративной Академии «Фаровон». Ты составляешь контрольные вопросы с развёрнутым письменным ответом для итоговой аттестации наставников по курсу «Наставничество». Сколько вопросов и какой сложности нужно — сказано в <task>.

Контрольный вопрос проверяет, что сотрудник понимает ключевую идею урока и может изложить её своими словами.

Поля:
- stem — формулировка вопроса;
- reference_answer — эталонный ответ 300–600 знаков;
- key_elements — 3–6 ключевых элементов, которые обязательно должны прозвучать в хорошем ответе;
- criteria — критерии строго по шаблону ниже: коды, названия и веса НЕ меняй, описания уровней 0–5 напиши конкретно для этого вопроса;
- difficulty, source_slides, source_quote — как описано ниже.

Шаблон критериев (сумма весов 100):
K1 «Полнота ключевых элементов» — 60
K2 «Точность, нет ошибок по существу» — 40

""" + COMMON_RULES).strip()

REVIEW = """Ты — независимый рецензент аттестационных вопросов Академии «Фаровон» по курсу «Наставничество». Твоя задача — не пропустить в банк вопрос, который несправедлив к сотруднику.

На вход ты получаешь текст урока в <narration>, цитату-источник в <source_quote> и сам вопрос.

Для вопросов с выбором варианты даны БЕЗ отметок, какие верны. Сначала реши вопрос сам, опираясь только на текст урока, и верни идентификаторы выбранных тобой вариантов в answer_option_ids. Это главная проверка: если знающий урок человек не может однозначно выбрать правильный ответ, вопрос плохой.
Для письменных заданий (кейс, контрольный вопрос) answer_option_ids — пустой массив; тебе дано задание, эталонное решение и критерии.

Проверки (каждая — pass и короткий comment по-русски):
- wording — формулировка грамотная и понятная, без двусмысленностей и двойных отрицаний;
- unambiguous — у вопроса один однозначный правильный ответ (для выбора) или ясное задание (для письменных);
- matches_material — правильный ответ и эталон прямо следуют из текста урока, ничего не взято со стороны; цитата-источник действительно подтверждает правильный ответ;
- difficulty_matches — заявленный уровень сложности соответствует вопросу (basic — факт из текста, medium — применение к ситуации, advanced — сопоставление или разбор ошибки);
- distractors_plausible — неверные варианты правдоподобны, не абсурдны, правильный не выделяется длиной или формой (для письменных — pass: true, comment: "n/a");
- rubric_usable — по критериям и эталону можно справедливо оценить ответ, уровни 0–5 различимы (для вопросов с выбором — pass: true, comment: "n/a");
- no_bias — нет оскорблений и стереотипов по полу, возрасту, национальности, религии или инвалидности. Конфликт наставника и стажёра или описанная ошибка нарушением не считаются.

verdict — accept, только если все проверки пройдены; иначе reject. В comment — одно-два предложения: главная причина решения.

Будь строг: лучше отклонить сомнительный вопрос, чем выставить сотруднику несправедливую оценку.""".strip()


def criterion_item():
    levels = {str(i): {"type": "string"} for i in range(6)}
    return {
        "type": "object",
        "properties": {
            "code": {"type": "string"},
            "name": {"type": "string"},
            "description": {"type": "string"},
            "weight": {"type": "integer"},
            "levels": {
                "type": "object",
                "properties": levels,
                "required": [str(i) for i in range(6)],
                "additionalProperties": False,
            },
        },
        "required": ["code", "name", "description", "weight", "levels"],
        "additionalProperties": False,
    }


DIFFICULTY = {"type": "string", "enum": ["basic", "medium", "advanced"]}
SLIDES = {"type": "array", "items": {"type": "integer"}}

CHOICE_SCHEMA = {
    "type": "object",
    "properties": {
        "questions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "stem": {"type": "string"},
                    "options": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "text": {"type": "string"},
                                "correct": {"type": "boolean"},
                                "misconception": {"type": "string"},
                            },
                            "required": ["text", "correct", "misconception"],
                            "additionalProperties": False,
                        },
                    },
                    "explanation": {"type": "string"},
                    "difficulty": DIFFICULTY,
                    "source_slides": SLIDES,
                    "source_quote": {"type": "string"},
                },
                "required": ["stem", "options", "explanation", "difficulty", "source_slides", "source_quote"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["questions"],
    "additionalProperties": False,
}

CASE_SCHEMA = {
    "type": "object",
    "properties": {
        "questions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "situation": {"type": "string"},
                    "task": {"type": "string"},
                    "reference_solution": {"type": "string"},
                    "criteria": {"type": "array", "items": criterion_item()},
                    "difficulty": DIFFICULTY,
                    "source_slides": SLIDES,
                    "source_quote": {"type": "string"},
                },
                "required": ["title", "situation", "task", "reference_solution", "criteria",
                             "difficulty", "source_slides", "source_quote"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["questions"],
    "additionalProperties": False,
}

CONTROL_SCHEMA = {
    "type": "object",
    "properties": {
        "questions": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "stem": {"type": "string"},
                    "reference_answer": {"type": "string"},
                    "key_elements": {"type": "array", "items": {"type": "string"}},
                    "criteria": {"type": "array", "items": criterion_item()},
                    "difficulty": DIFFICULTY,
                    "source_slides": SLIDES,
                    "source_quote": {"type": "string"},
                },
                "required": ["stem", "reference_answer", "key_elements", "criteria",
                             "difficulty", "source_slides", "source_quote"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["questions"],
    "additionalProperties": False,
}


def check():
    # Схема повторяется у каждой из семи проверок: $ref в structured outputs работает,
    # но плоская схема проще читается и не зависит от этой возможности.
    return {
        "type": "object",
        "properties": {"pass": {"type": "boolean"}, "comment": {"type": "string"}},
        "required": ["pass", "comment"],
        "additionalProperties": False,
    }


CHECKS = ["wording", "unambiguous", "matches_material", "difficulty_matches",
          "distractors_plausible", "rubric_usable", "no_bias"]

REVIEW_SCHEMA = {
    "type": "object",
    "properties": {
        "answer_option_ids": {"type": "array", "items": {"type": "string"}},
        "checks": {
            "type": "object",
            "properties": {k: check() for k in CHECKS},
            "required": CHECKS,
            "additionalProperties": False,
        },
        "verdict": {"type": "string", "enum": ["accept", "reject"]},
        "comment": {"type": "string"},
    },
    "required": ["answer_option_ids", "checks", "verdict", "comment"],
    "additionalProperties": False,
}

# model / effort / max_tokens — по таблице 3.1 методички: генератор и рецензент — разные модели
# (п. 6.3 ТЗ), чтобы рецензент не «соглашался сам с собой».
PROMPTS = [
    dict(code="GEN_SINGLE", text=GEN_SINGLE, schema=CHOICE_SCHEMA, model="claude-sonnet-5", effort="medium", max_tokens=8000),
    dict(code="GEN_MULTI", text=GEN_MULTI, schema=CHOICE_SCHEMA, model="claude-sonnet-5", effort="medium", max_tokens=8000),
    dict(code="GEN_CASE", text=GEN_CASE, schema=CASE_SCHEMA, model="claude-sonnet-5", effort="medium", max_tokens=8000),
    dict(code="GEN_CONTROL", text=GEN_CONTROL, schema=CONTROL_SCHEMA, model="claude-sonnet-5", effort="medium", max_tokens=8000),
    dict(code="REVIEW", text=REVIEW, schema=REVIEW_SCHEMA, model="claude-opus-5", effort="medium", max_tokens=6000),
    # v2 — тот же рецензент на Sonnet 5 (22.09.2026). Стартовый банк пишет Opus прямо в чате,
    # чтобы не тратить кредиты API, и рецензент обязан быть другой моделью. Побочный эффект:
    # проверка дешевле примерно в 2,5 раза. Когда банк начнёт пополняться генератором LMS
    # (он на Sonnet), рецензента стоит вернуть на Opus новой версией.
    dict(code="REVIEW", version=2, text=REVIEW, schema=REVIEW_SCHEMA, model="claude-sonnet-5", effort="medium", max_tokens=6000),
]

EFFORT_CHOICE = {"low": 100000000, "medium": 100000001, "high": 100000002}


def main():
    out = []
    for p in PROMPTS:
        schema_text = json.dumps(p["schema"], ensure_ascii=False, separators=(",", ":"))
        out.append({
            "code": p["code"],
            "version": p.get("version", 1),
            "model": p["model"],
            "effort": p["effort"],
            "effortChoice": EFFORT_CHOICE[p["effort"]],
            "maxTokens": p["max_tokens"],
            "systemText": p["text"],
            "schemaJson": schema_text,
        })
        print('  %-12s v%d %-16s effort=%-6s max_tokens=%-5d текст %4d знаков, схема %4d знаков'
              % (p["code"], p.get("version", 1), p["model"], p["effort"], p["max_tokens"], len(p["text"]), len(schema_text)))
    path = os.path.join(HERE, 'prompts.json')
    io.open(path, 'w', encoding='utf-8', newline='\n').write(json.dumps(out, ensure_ascii=False, indent=2) + '\n')
    print('сохранено:', path)


if __name__ == '__main__':
    main()
