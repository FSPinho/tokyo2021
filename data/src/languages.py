import codecs
from json import dumps

from bs4 import BeautifulSoup

from src.util.request import get


def get_languages(url, output):
    print("\nRetrieving languages data...", url)

    document = BeautifulSoup(get(url), "html.parser")

    languages = {}
    languages_element = document.select(".tk-languages__dropdown-menu-container--animation ul li a span")

    for lang_element in languages_element:
        lang = lang_element["lang"]
        languages[lang] = lang

    for lang in sorted(languages.values()):
        print("\tFound language %s" % lang)

    with codecs.open(output, "w", encoding="UTF-8") as output_file:
        output_file.write(dumps(languages, indent=4))

    return sorted(languages.values())
