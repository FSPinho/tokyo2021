import codecs
from os.path import isfile

import requests


def get(url):
    key = url.replace("/", "_").replace(":", "").replace(".", "-")
    path = "/tmp/tk-cache--%s" % key

    if isfile(path):
        with codecs.open(path, "r", encoding="UTF-8") as cache:
            content = cache.read()
            if content:
                return content

    content = requests.get(url).content.decode(encoding="UTF-8")

    with codecs.open(path, "w", encoding="UTF-8") as cache:
        cache.write(content)

    return content
