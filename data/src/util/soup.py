import re

import dateparser
from bs4 import BeautifulSoup


def get_element_name(node):
    length = len(list(node.previous_siblings)) + 1
    if length > 1:
        return '%s:nth-child(%s)' % (node.name, length)
    else:
        return node.name


def get_node_path(node):
    path = [get_element_name(node)]
    for parent in node.parents:
        if parent.name == 'body':
            break
        path.insert(0, get_element_name(parent))
    return ' > '.join(path)


def get_overview_element(document, lang):
    document = BeautifulSoup(str(document).replace("&nbsp;", ""), "html.parser")

    overview_lang_map = {
        "ja-JP": ["競技概要"],
        "en-US": ["Overview"],
        "fr-FR": ["Présentation", "Présentation ", "Présentation&nbsp;"],
        "zh-CN": ["概述"],
        "ko-KR": ["개요", "종목 소개", "경기 소개"],
        "es-ES": ["Descripción general", "Descipción general"],
        "hi-IN": ["अवलोकन"]
    }

    paths = ["h2", "h3", "strong"]

    for tr in overview_lang_map[lang]:
        for path in paths:
            match = document.find_all(path, string=lambda s: s and s.startswith(tr))
            if len(match):
                return match[-1]

    return None


def parse_date(date_str, lang):
    lack_hour_lang_map = {
        "ja-JP": [],
        "en-US": [],
        "fr-FR": ["horaires à déterminer"],
        "zh-CN": [],
        "ko-KR": [],
        "es-ES": ["Horario a determinar"],
        "hi-IN": []
    }

    lack_hour_tr = lack_hour_lang_map[lang]
    if len(lack_hour_tr):
        for tr in lack_hour_tr:
            date_str = date_str.replace(tr, "")

    _date_str = re.sub(r"[^:]*:\s*", r"", date_str, count=1)
    _date_str = re.sub(r"\s*:\s*", r":", _date_str)

    _date_beg = re.sub(r"(\d{1,2}:\d{1,2}).*(\d{1,2}:\d{1,2}).*", r"", _date_str, count=1)

    if re.search(r".*(\d{1,2}:\d{1,2}).*(\d{1,2}:\d{1,2}).*", _date_str):
        _date_sta = _date_beg + " " + re.sub(r".*[^\d](\d{1,2}:\d{1,2})[^\d]*(\d{1,2}:\d{1,2}).*", r"\1", _date_str, count=1)
        _date_end = _date_beg + " " + re.sub(r".*[^\d](\d{1,2}:\d{1,2})[^\d]*(\d{1,2}:\d{1,2}).*", r"\2", _date_str, count=1)
    else:
        _date_sta = _date_beg + " 00:00"
        _date_end = _date_beg + " 00:00"

    # schedule https://tokyo2020.org/es/calendario/atletismo-calendario
    _date_sta = _date_sta.replace(r"29:50", r"19:50")

    locales = [lang.split("-")[0]]
    date_formats = ["%a %d %b %H:%M", "%A %d %b %H:%M", "%a %d %B %H:%M", "%A %d %B %H:%M"]

    parsed_sta = dateparser.parse(_date_sta, locales=locales, date_formats=date_formats, settings={"TIMEZONE": "+0900", "RETURN_AS_TIMEZONE_AWARE": True})
    parsed_end = dateparser.parse(_date_end, locales=locales, date_formats=date_formats, settings={"TIMEZONE": "+0900", "RETURN_AS_TIMEZONE_AWARE": True})
    
    return parsed_sta, parsed_end
