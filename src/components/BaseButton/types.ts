import { TouchableNativeFeedbackProps, ViewProps } from "react-native";
import { DefaultTheme } from "styled-components";
import { BoxProps } from "../Box/types";

export interface BaseButtonProps
    extends Pick<TouchableNativeFeedbackProps, "onPress" | "onPressIn" | "onPressOut" | "onLongPress">,
        BoxProps,
        ViewProps {
    rippleColor?: keyof DefaultTheme.Palette;
    disabled?: boolean;
}
