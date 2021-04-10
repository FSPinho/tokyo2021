import { useMemo } from "react";
import Animated, { Easing } from "react-native-reanimated";
import { useTheme } from "./Styled";

export const useEasing = (): Animated.EasingFunction => {
    const theme = useTheme();
    return useMemo(() => {
        const [x1, y1, x2, y2] = theme.transition.easing.bezier;
        return Easing.bezier(x1, y1, x2, y2);
    }, [theme]);
};
