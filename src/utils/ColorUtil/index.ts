const HEX_REGEX = /^#([\dA-Fa-f]{3}){1,2}$/;
const HEX_ALPHA_REGEX = /^#([\dA-Fa-f]{4}){1,2}$/;
const RGB_REGEX = /^rgb(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*)$/;
const RGB_ALPHA_REGEX = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/;

const pad = (x: string, l: number): string => (x.length >= l ? x : pad(`0${x}`, l));
const paddedHex = (x: number): string => pad(x.toString(16), 2);

const toRGBAArray = (color: string, alpha?: number): [number, number, number, number] => {
    let r = 0,
        g = 0,
        b = 0,
        a = alpha ?? 1;

    if (HEX_REGEX.test(color) || HEX_ALPHA_REGEX.test(color)) {
        const cell = color.length === 4 || color.length === 5 ? 1 : 2;
        const dec = (x: string): number => (cell === 1 ? parseInt(x + x, 16) : parseInt(x, 16));

        r = dec(color.substr(1, cell));
        g = dec(color.substr(1 + cell, cell));
        b = dec(color.substr(1 + cell * 2, cell));

        if (HEX_ALPHA_REGEX.test(color)) {
            a = dec(color.substr(1 + cell * 3, cell)) / 255;
        }
    } else if (RGB_REGEX.test(color) || RGB_ALPHA_REGEX.test(color)) {
        const colorParts = color
            .replace(/rgba?/, "")
            .replace(/[\s()]*/g, "")
            .split(",");
        r = parseInt(colorParts[0]);
        g = parseInt(colorParts[1]);
        b = parseInt(colorParts[2]);

        if (RGB_ALPHA_REGEX.test(color)) {
            a = parseFloat(colorParts[3]);
        }
    }

    return [r, g, b, alpha ?? a];
};

const toRGBA = (color: string, alpha?: number): string => {
    const [r, g, b, a] = toRGBAArray(color, alpha);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const toHEX = (color: string, alpha?: number): string => {
    const [r, g, b, a] = toRGBAArray(color, alpha);
    return `#${paddedHex(r)}${paddedHex(g)}${paddedHex(b)}${paddedHex(Math.round(a * 255))}`;
};

export const ColorUtil = {
    toRGBAArray,
    toRGBA,
    toHEX,
};
