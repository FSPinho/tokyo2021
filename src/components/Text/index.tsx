import React from "react";
import { TextStyle } from "react-native";
import Animated from "react-native-reanimated";

import { HCText, TEXT_PRESETS } from "./styles";
import { TextProps } from "./types";
import { useTranslation } from "../../i18n";

export const Text: React.FC<TextProps> = ({
    value,
    translation,
    translationData,
    typography,
    fontSizeAnimatedValue,
    weight,
    style,
    children,
    numberOfLines,
    TrailTextComponent,
    ...props
}) => {
    let preset = TEXT_PRESETS[typography];

    if (!preset) {
        preset = TEXT_PRESETS["body1"];
    }

    const translatedText = useTranslation(translation, translationData);

    /**
     * Creating an style object from animatable preset properties.
     * */
    const animatedPresetStyle: Animated.AnimateStyle<TextStyle> = {};

    /**
     * Currently only fontSize is animatable.
     * */
    const { fontSize, ...presetStyle } = preset;

    if (fontSizeAnimatedValue) {
        animatedPresetStyle.fontSize = fontSizeAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, preset.fontSize as number],
        });
    } else {
        animatedPresetStyle.fontSize = fontSize;
    }

    if (weight) {
        presetStyle.weight = weight;
    }

    return (
        <HCText numberOfLines={numberOfLines} style={[style, animatedPresetStyle]} {...presetStyle} {...props}>
            {translatedText || value || translation || children}
            {TrailTextComponent}
        </HCText>
    );
};
