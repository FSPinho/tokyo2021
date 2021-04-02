import re


def clear(text):
    text = re.sub(r"^\s*", r"", text, flags=re.MULTILINE)
    text = re.sub(r"\s*$", r"", text, flags=re.MULTILINE)

    return text
