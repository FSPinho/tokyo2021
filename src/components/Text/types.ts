import React from "react";
import { TextProps as RNTextProps } from "react-native";
import Animated from "react-native-reanimated";
import { DefaultTheme } from "styled-components";

export type TextWeight =
    | "ThinItalic"
    | "Thin"
    | "SemiBoldItalic"
    | "SemiBold"
    | "Regular"
    | "MediumItalic"
    | "Medium"
    | "LightItalic"
    | "Light"
    | "Italic"
    | "ExtraLightItalic"
    | "ExtraLight"
    | "ExtraBoldItalic"
    | "ExtraBold"
    | "BoldItalic"
    | "Bold"
    | "BlackItalic"
    | "Black";

/**
 * Text style presets.
 * */
export type TextTypography = "title" | "subtitle" | "body1" | "body2";

export interface TextProps extends RNTextProps {
    /**
     * The text to be displayed. It should only be used to show
     * variable text values.
     * E.g.
     *      <Text value={block.name}/>
     * */
    value?: string | null;

    /**
     * The key of the translated text to be displayed.
     * E.g.
     *      <Text translation={"timekeeper.MODULE_NAME"}/>
     * */
    translation?: string | null;

    /**
     * The data for text interpolation.
     * */
    translationData?: Record<string, string | number> | null;

    /**
     * Sets the text style preset.
     * */
    typography: TextTypography;

    /**
     * Shows the text as italic.
     * */
    italic?: boolean | null;

    /**
     * Sets the text color.
     * */
    color?: keyof DefaultTheme.Palette | string | null;

    /**
     * If true, aligns the text at center.
     * */
    align?: "center" | "left" | "right" | null;

    /**
     * Font weight to override the preset.
     * */
    weight?: TextWeight | null;

    /**
     * Animated value between 0 and 1. If given,
     * this value will be used to animate the
     * font size.
     * */
    fontSizeAnimatedValue?: Animated.Value<number> | null;

    /**
     *
     * You can add a custom EllipsisMode when the text has
     * line more than numberOfLines props
     */
    EllipsisModeComponent?: React.ReactElement;

    /**
     * You can add a custom element on the end of the text
     */
    TrailTextComponent?: React.ReactElement;

    /**
     * Sets the text to upper, lower and capital case.
     * */
    textTransform?: string;
}

export interface TextPreset {
    weight?: TextWeight;
    fontSize?: number | Animated.Value<number> | Animated.Node<number>;
    lineHeight?: number;
    letterSpacing?: number;
    textTransform?: string;
}
