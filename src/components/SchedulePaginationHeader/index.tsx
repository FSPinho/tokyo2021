import React, { useCallback, useState } from "react";
import Animated, { useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import * as S from "./styles";
import { Text } from "../Text";
import { SchedulePaginationHeaderProps } from "./types";
import { LayoutChangeEvent, LayoutRectangle, useWindowDimensions, View, ViewStyle } from "react-native";

export const SchedulePaginationHeader: React.FC<SchedulePaginationHeaderProps> = ({ title, width, scrollOffset }) => {
    const [baseLayout, setBaseLayout] = useState<LayoutRectangle | null>(null);

    const windowSize = useWindowDimensions();

    const leftOffset = useDerivedValue(() => {
        if (baseLayout) {
            const offset = scrollOffset.value - baseLayout.x;
            const maxOffset = baseLayout.width - windowSize.width;
            return Math.round(Math.max(Math.min(offset, maxOffset), 0));
        }

        return 0;
    }, [baseLayout]);

    const style = useAnimatedStyle<ViewStyle>(
        () => ({
            transform: [{ translateX: leftOffset.value }],
        }),
        [],
    );

    const onLayout = useCallback(({ nativeEvent: { layout } }: LayoutChangeEvent) => {
        setBaseLayout(layout);
    }, []);

    return (
        <View onLayout={onLayout} style={{ width }}>
            <Animated.View style={style} onLayout={onLayout}>
                <S.PaginationHeader contentAlignment={"center"} style={{ width: windowSize.width }}>
                    <Text typography={"body2"} value={title} />
                </S.PaginationHeader>
            </Animated.View>
        </View>
    );
};
