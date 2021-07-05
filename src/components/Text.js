/**
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text as RNText } from 'react-native';
import { Style } from 'react-native-typography';
import type { TextProps as RNTextProps } from 'react-native/Libraries/Text/TextProps';
import type { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { material, robotoWeights } from 'react-native-typography';
import { Theme } from '../theme';

const FONTS = {
    display4: {
        ...material.display4Object,
        fontSize: 112,
        lineHeight: 128,
    },
    display3: {
        ...material.display3Object,
        fontSize: 56,
        lineHeight: 64,
    },
    display2: {
        ...material.display2Object,
        fontSize: 45,
        lineHeight: 52,
    },
    display1: {
        ...material.display1Object,
        fontSize: 34,
        lineHeight: 40,
    },
    headline: {
        ...material.headlineObject,
        fontSize: 24,
        lineHeight: 32,
    },
    title: {
        ...material.titleObject,
        fontSize: 20,
        lineHeight: 28,
    },
    subheading: {
        ...material.subheadingObject,
        fontSize: 16,
        lineHeight: 24,
    },
    body2: {
        ...material.body2Object,
        fontSize: 14,
        lineHeight: 24,
    },
    body1: {
        ...material.body1Object,
        fontSize: 14,
        lineHeight: 20,
    },
    caption: {
        ...material.captionObject,
        fontSize: 12,
        lineHeight: 16,
    },
    button: {
        ...material.buttonObject,
        fontSize: 14,
        lineHeight: 20,
    },
};

const FONT_WEIGHTS = {
    thin: robotoWeights.thin,
    light: robotoWeights.light,
    regular: robotoWeights.regular,
    medium: robotoWeights.medium,
    bold: robotoWeights.bold,
    condensed: robotoWeights.condensed,
    condensedBold: robotoWeights.condensedBold,
};

export type TextFont = $Keys<typeof FONTS>;
export type TextFontWeight = $Keys<typeof FONT_WEIGHTS>;

export type TextProps = {
    style?: any,

    color?: string,
    center?: boolean,
    secondary?: boolean,
    disabled?: ?boolean,
    fit?: boolean,

    font?: TextFont,
    fontWeight?: TextFontWeight,

    textProps?: RNTextProps,

    shadow?: boolean,
};

class Text extends Component<TextProps> {
    render() {
        const {
            color,
            center,
            style,
            secondary,
            disabled,
            fit,

            font,
            fontWeight,
            textProps,
            shadow,
            ...props
        } = this.props;

        let _typeFace = {};

        if (font && FONTS[font]) {
            _typeFace = { ..._typeFace, ...FONTS[font] };
        } else {
            _typeFace = { ..._typeFace, ...FONTS['body1'] };
        }

        if (fontWeight && FONT_WEIGHTS[fontWeight]) {
            _typeFace = { ..._typeFace, ...FONT_WEIGHTS[fontWeight] };
        }

        return (
            <RNText
                style={[
                    _typeFace,
                    {
                        color:
                            color ||
                            _typeFace.color ||
                            (disabled
                                ? Theme.palette.backgroundPrimaryTextDisabled
                                : secondary
                                ? Theme.palette.backgroundPrimaryTextSecondary
                                : Theme.palette.backgroundPrimaryTextPrimary),
                        textAlign: center ? 'center' : 'left',
                        opacity: secondary ? 0.7 : 1,
                    },
                    fit ? _style.fit : undefined,
                    shadow ? _style.shadow : undefined,
                    style,
                ]}
                {...textProps}
                {...(props: Object)}
            />
        );
    }
}

const _style = StyleSheet.create({
    fit: {
        flex: 1,
    },
    shadow: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
});

export default Text;
