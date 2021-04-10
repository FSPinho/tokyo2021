import codecs
from json import dumps

from bs4 import BeautifulSoup

from src.util.request import get


def get_languages(filter, url, output):
    print("\nRetrieving languages data...", url)

    document = BeautifulSoup(get(url), "html.parser")

    languages = {}
    languages_element = document.select(".tk-languages__dropdown-menu-container--animation ul li a span")

    for lang_element in languages_element:
        lang = lang_element["lang"]
        if lang in filter:
            languages[lang] = lang

    languages_sorted = sorted(languages.values())

    for lang in languages_sorted:
        print("\tFound language %s" % lang)

    with codecs.open(output, "w", encoding="UTF-8") as output_file:
        output_file.write(dumps(languages_sorted, indent=4))

    return languages_sorted
