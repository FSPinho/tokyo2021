import { Element } from "./types";

const clear = (text: string): string =>
    text.replace(/^\s*/g, "").replace(/\s*$/g, "").replace(/\s+/g, " ").replace(/\s,\s/g, ", ");
const getTags = (text: string): Array<string> | null => text.match(/(<[a-zA-Z0-9]+.*?>)|(<\/[a-zA-Z]+>)/g);
const getTagName = (text: string): string | null => (text.match(/<\/?([a-zA-Z0-9]+).*?>/) || [])[1];
const isClosingTag = (text: string): boolean => !!text.match(/<\/([a-zA-Z0-9]+).*?>/);

const extractElements = (text: string): Array<Element | string> => {
    text = text.replace(/<a.*?>/, "").replace(/<\/a>/, "");
    text = text.replace(/<span.*?>/, "").replace(/<\/span>/, "");
    const tags = getTags(text);

    if (!tags) {
        return [clear(text)];
    }

    const openTag = tags[0];
    const tagName = getTagName(openTag);

    if (!tagName) {
        return [];
    }

    let offset = 0;
    let deep = 0;

    for (const tag of tags.slice(1)) {
        const innerTagName = getTagName(tag);

        if (tagName == innerTagName) {
            if (isClosingTag(tag)) {
                deep--;
            } else {
                offset++;
                deep++;
            }
        }

        if (deep === -1) {
            break;
        }
    }

    const contentIndexStart = text.indexOf(`<${tagName}`);
    const contentIndexEnd = text
        .split(`</${tagName}>`)
        .slice(0, offset + 1)
        .join(`</${tagName}>`).length;

    const wrapper = text.slice(contentIndexStart, contentIndexEnd) + `</${tagName}>`;
    const content = wrapper.replace(new RegExp(`^<${tagName}.*?>([^]*)</${tagName}>$`), "$1");

    const preContent = text.substr(0, text.indexOf(wrapper));
    const posContent = text.substr(text.indexOf(wrapper) + wrapper.length);

    return [
        ...extractElements(preContent),
        {
            tag: tagName,
            content: extractElements(content),
        },
        ...extractElements(posContent),
    ].filter((t) => !!t);
};

export const TagUtil = {
    extractElements,
};
