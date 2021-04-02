import re


def path(root, *args, lang=None, prev_url_loc=False):
    _path = "%s/%s" % (root, "/".join(args))
    _path = re.sub(r"([^:])/+", r"\1/", _path, flags=re.MULTILINE)

    if lang:
        _path = _path.replace("LANG", lang.split("-")[0])

        if not prev_url_loc:
            if lang.split("-")[0] == "es":
                _path = _path.replace("sports", "deportes")

    return _path


def domain(url):
    return re.sub(r"(org/).*", r"\1", url)
