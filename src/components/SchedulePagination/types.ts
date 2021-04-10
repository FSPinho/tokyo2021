import Animated from "react-native-reanimated";

export interface SchedulePaginationProps {
    scrollOffset: Animated.SharedValue<number>;
    onIndexPress(index: number): void;
}
