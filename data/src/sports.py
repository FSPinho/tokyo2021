import codecs
from json import dumps

from bs4 import BeautifulSoup

from src.util.request import get
from src.util.soup import get_overview_node
from src.util.text import clear
from src.util.url import path, domain


def get_sports(languages, url, output):
    print("Retrieving sports data...", url)

    sports = {}

    for lang in languages:
        sports[lang] = {}

        lang_url = path(url, lang=lang)
        print("\tRetrieving sports for lang...", lang_url)

        document = BeautifulSoup(get(lang_url), "html.parser")
        sports_elements = document.select(".tk-disciplines__link")

        for sport_element in sports_elements:
            sport_id = sport_element["href"].replace("/", "")

            title_element = sport_element.select("h2")[0]
            image_element = sport_element.select("div")[0]

            title = clear(title_element.text)
            print("\t\tFound sport %s - %s" % (sport_id, title))

            icon_id = image_element["class"][1].replace("tk-", "")
            icon_url = path(domain(lang_url), "/d3images/pictograms/olympics/%s.svg" % icon_id)
            print("\t\t\tRetrieving icon %s" % icon_url)
            icon = get(icon_url)

            about_url = path(lang_url, sport_id)
            print("\t\t\tRetrieving about %s" % about_url)
            about_document = BeautifulSoup(get(about_url), "html.parser")

            about_image_url = about_document.select(".tk-lead-block__picture source")[0]["srcset"].split(", http")[0]
            about_image_alt = about_document.select(".tk-lead-block__picture img")[0]["alt"]

            about_has_tabs = len(about_document.select(".tk-article__tabs-list")) > 0

            if about_has_tabs:
                print("\t\t\tRetrieving about tabs...")
                about_texts = []

                tabs_names = [tab["data-name"] for tab in about_document.select(".tk-article__tabs-list li a")]
                tabs_titles = [tab.text for tab in about_document.select(".tk-article__tabs-list li a")]

                for tab_name, tab_title in zip(tabs_names, tabs_titles):
                    tab_url = path(domain(about_url), "/LANG/library/sports/tabs/%s" % tab_name,
                                   lang=lang,
                                   prev_url_loc=True)
                    print("\t\t\tRetrieving about tab %s" % tab_url)
                    tab_document = BeautifulSoup(get(tab_url), "html.parser")
                    about_element = get_overview_node(tab_document, lang).parent
                    about_element.select("*")[0].string.replace_with(tab_title)
                    about_texts.append(about_element.prettify())

            else:
                print("\t\t\tRetrieving about article...")
                about_texts = [get_overview_node(about_document, lang).parent.prettify()]

            sports[lang][sport_id] = {
                "title": title,
                "icon": icon,
                "about": {
                    "texts": about_texts,
                    "image": {
                        "url": about_image_url,
                        "alt": about_image_alt
                    }
                }
            }
            break

    with codecs.open(output, "w", encoding="UTF-8") as output_file:
        output_file.write(dumps(sports, indent=4, ensure_ascii=False))

    return sorted(sports)
