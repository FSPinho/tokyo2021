import React, { useCallback, useMemo } from "react";

import { Box } from "../Box";
import * as S from "./styles";
import { useWindowDimensions } from "react-native";
import { useLocale } from "../../i18n";
import { DataUtil } from "../../utils/DataUtil";
import { ScheduleDay } from "../ScheduleDay";
import Animated, {
    runOnJS,
    scrollTo,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";
import { SchedulePagination } from "../SchedulePagination";
import { ScheduleDayRef } from "../ScheduleDay/types";
import lodash from "lodash";

export const ScheduleDays: React.FC = () => {
    const { width } = useWindowDimensions();

    const daysRefs = useMemo<Record<number, ScheduleDayRef | null>>(() => ({}), []);
    const scroll = useSharedValue(0);
    const scrollPos = useSharedValue(0);
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const schedule = DataUtil.getScheduleByDay(useLocale().locale);

    const focus = useCallback(
        lodash.debounce((index) => {
            Object.entries(daysRefs).forEach(([idx, ref]) => {
                if (String(index) === String(idx)) {
                    ref?.focus();
                } else {
                    ref?.blur();
                }
            });
        }, 350),
        [daysRefs],
    );

    useDerivedValue(() => {
        scrollTo(scrollRef, scroll.value, 0, true);
    }, []);

    const index = useDerivedValue(() => {
        return Math.round(scroll.value / width);
    }, []);

    useDerivedValue(() => {
        runOnJS(focus)(index.value);
    }, []);

    const scrollOffset = useDerivedValue(() => {
        return scrollPos.value / width;
    }, []);

    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: ({ contentOffset: { x } }) => {
                scrollPos.value = x;
            },
            onMomentumEnd: ({ contentOffset: { x } }) => {
                scroll.value = x;
                scroll.value = Math.round(x / width) * width;
            },
        },
        [],
    );

    const onIndexPress = useCallback(
        (index) => {
            scroll.value = index * width;
        },
        [scroll.value, width],
    );

    return (
        <Box orientation={"column"} fit>
            <SchedulePagination scrollOffset={scrollOffset} onIndexPress={onIndexPress} />
            <S.HScroll ref={scrollRef} onMomentumScrollEnd={scrollHandler} scrollEventThrottle={16} horizontal>
                {schedule.map((day, key) => (
                    <S.Page key={key} width={width}>
                        <ScheduleDay ref={(ref) => (daysRefs[key] = ref)} day={day} />
                    </S.Page>
                ))}
            </S.HScroll>
        </Box>
    );
};
