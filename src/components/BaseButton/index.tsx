import React, { useCallback } from "react";
import { GestureResponderEvent, StyleSheet, TouchableNativeFeedback, View } from "react-native";

import * as S from "./styles";
import { BaseButtonProps } from "./types";
import { useTheme } from "../../Theme";

export const BaseButton: React.FC<BaseButtonProps> = ({
    rippleColor,
    children,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    disabled = false,
    ...props
}) => {
    const theme = useTheme();

    const handleOnPress = useCallback(
        (e: GestureResponderEvent) => {
            onPress && onPress(e);
        },
        [onPress],
    );

    return (
        <S.TouchableView {...props}>
            {children}
            <TouchableNativeFeedback
                disabled={disabled}
                background={TouchableNativeFeedback.Ripple(
                    theme.palette[rippleColor ?? "backgroundLightRipple"] as string,
                    false,
                )}
                {...{ onPress: handleOnPress, onPressIn, onPressOut, onLongPress }}>
                <View style={StyleSheet.absoluteFill} />
            </TouchableNativeFeedback>
        </S.TouchableView>
    );
};
