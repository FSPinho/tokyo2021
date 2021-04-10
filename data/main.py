from src.languages import get_languages
from src.sports import get_sports
from src.util.url import path

DEF_ROOT_URL = "https://tokyo2020.org/"

DEF_LANGUAGES_URL = path(DEF_ROOT_URL)
DEF_LANGUAGES_FILTER = [
    "en-US",
    "es-ES",
]
DEF_LANGUAGES_OUTPUT_FILE = "../src/constants/Languages.json"

DEF_SPORTS_URL = path(DEF_ROOT_URL, "/LANG/sports/")
DEF_SPORTS_OUTPUT_FILE = "../src/constants/Sports.json"

languages = get_languages(filter=DEF_LANGUAGES_FILTER, url=DEF_LANGUAGES_URL, output=DEF_LANGUAGES_OUTPUT_FILE)
sports = get_sports(languages=languages, url=DEF_SPORTS_URL, output=DEF_SPORTS_OUTPUT_FILE)
