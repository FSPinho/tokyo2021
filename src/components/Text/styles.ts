import Animated from "react-native-reanimated";
import Styled, { DefaultTheme } from "styled-components/native";
import { Text } from "react-native";
import { TextPreset, TextProps, TextTypography } from "./types";

export const TEXT_PRESETS: Record<TextTypography, TextPreset> = {
    title: {
        fontSize: 24,
        lineHeight: 28,
        weight: "Bold",
        letterSpacing: 0.0,
    },
    subtitle: {
        fontSize: 20,
        lineHeight: 22,
        weight: "SemiBold",
        letterSpacing: 0.0,
    },
    body1: {
        fontSize: 16,
        lineHeight: 18,
        weight: "Regular",
        letterSpacing: 1,
    },
    body2: {
        fontSize: 16,
        lineHeight: 18,
        weight: "Bold",
        letterSpacing: 1,
    },
};
const AnimatedText = Animated.createAnimatedComponent(Text);
export const HCText = Styled(AnimatedText)<TextPreset & Pick<TextProps, "italic" | "color" | "align">>`
    ${(props) =>
        props.weight ? `font-family: "Montserrat-${props.weight || "Regular"}${props.italic ? "Italic" : ""}";` : ""}
    ${(props) => (props.fontSize ? `font-size: ${props.fontSize}px;` : "")}
    ${(props) => (props.lineHeight ? `line-height: ${props.lineHeight}px;` : "")}
    ${(props) => (props.letterSpacing ? `letter-spacing: ${props.letterSpacing}px;` : "")}
    ${(props) => (props.textTransform ? `text-transform: ${props.textTransform};` : "")}

    color: ${(props) =>
        props.color
            ? `${props.theme.palette[props.color as keyof DefaultTheme.Palette] || props.color}`
            : props.theme.palette.backgroundLightText};

    border: 1px transparent solid;
    text-align-vertical: center;

    ${(props) => (props.align ? `text-align: ${props.align};` : "")};
`;
