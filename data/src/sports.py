import codecs
import re
from json import dumps

from bs4 import BeautifulSoup

from src.util.request import get
from src.util.soup import get_overview_element, parse_date
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

            title_element = sport_element.select_one("h2")
            image_element = sport_element.select_one("div")

            title = clear(title_element.text)
            print("\t\tFound sport %s - %s" % (sport_id, title))

            icon_id = image_element["class"][1].replace("tk-", "")
            icon_url = path(domain(lang_url), "/d3images/pictograms/olympics/%s.svg" % icon_id)
            print("\t\t\tRetrieving icon %s" % icon_url)
            icon = get(icon_url)

            about_url = path(lang_url, sport_id)
            print("\t\t\tRetrieving about %s" % about_url)
            about_document = BeautifulSoup(get(about_url), "html.parser")

            about_image_url = about_document.select_one(".tk-lead-block__picture source")["srcset"].split(", http")[0]
            about_image_alt = about_document.select_one(".tk-lead-block__picture img")["alt"]

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
                    tab_overview_element = get_overview_element(tab_document, lang)

                    if tab_overview_element:
                        about_element = tab_overview_element.parent
                        about_element.select_one("*").string.replace_with(tab_title)
                        about_texts.append(about_element.prettify())

            else:
                print("\t\t\tRetrieving about article...")
                about_texts = [get_overview_element(about_document, lang).parent.prettify()]

            schedule_url = about_document.select_one("li:nth-child(2) a.tk-details-sport__nav-link")["href"]
            print("\t\t\tRetrieving schedule %s" % schedule_url)
            schedule_document = BeautifulSoup(get(schedule_url), "html.parser")

            schedule = []
            schedule_days_elements = schedule_document.select(".tk-article__body .tk-article__part.markdown")

            for schedule_day_element in schedule_days_elements:
                for p in schedule_day_element.select("div > p"):
                    if not re.search(r"\d{2}:\d{2}", p.text):
                        p.decompose()

                hours_elements_count = len(schedule_day_element.select("ul"))

                for hour_index in range(hours_elements_count):
                    date_index = hour_index * 3 + 1
                    date_str = schedule_day_element.select_one(
                        "h4:nth-child(%d), p:nth-child(%d)" % (date_index, date_index)
                    ).text
                    date_start, date_end = parse_date(date_str, lang)

                    if not date_start or not date_end:
                        print(" >>>>>>>>>>> INVALID DATE <<<<<<<<<<<")
                        print(date_str)
                        return {}

                    venue_index = hour_index * 3 + 2
                    venue_str = schedule_day_element.select_one(
                        "h4:nth-child(%d), p:nth-child(%d)" % (venue_index, venue_index)
                    ).text

                    events = []
                    events_index = hour_index * 3 + 3
                    events_elements = schedule_day_element.select("ul:nth-child(%d) li" % events_index)

                    for event_element in events_elements:
                        events.append(event_element.text)

                    schedule.append({
                        "venue": venue_str,
                        "start": date_start.strftime("%Y-%m-%dT%H:%M:%S%z"),
                        "end": date_end.strftime("%Y-%m-%dT%H:%M:%S%z"),
                        "sessions": events
                    })

            sports[lang][sport_id] = {
                "title": title,
                "icon": icon,
                "schedule": schedule,
                "about": {
                    "texts": about_texts,
                    "image": {
                        "url": about_image_url,
                        "alt": about_image_alt
                    }
                }
            }

    with codecs.open(output, "w", encoding="UTF-8") as output_file:
        output_file.write(dumps(sports, indent=4, ensure_ascii=False))

    return sports
