import Animated from "react-native-reanimated";

export interface SchedulePaginationHeaderProps {
    title: string;
    width: number;
    scrollOffset: Animated.SharedValue<number>;
}
