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


def get_overview_node(document, lang):
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
