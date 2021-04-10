import React, { useMemo } from "react";
import dateFormat from "dateformat";
import * as S from "./styles";
import { Header } from "../Header";
import { Box } from "../Box";
import { useLocale, useTranslator } from "../../i18n";
import { DataUtil } from "../../utils/DataUtil";
import Animated, {
    scrollTo,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";
import { SchedulePaginationHeader } from "../SchedulePaginationHeader";
import { useWindowDimensions } from "react-native";
import { SchedulePaginationButton } from "../SchedulePaginationButton";
import { SchedulePaginationProps } from "./types";
import { useTheme } from "../../Theme";

export const SchedulePagination: React.FC<SchedulePaginationProps> = ({ scrollOffset, onIndexPress }) => {
    const { locale } = useLocale();
    const scheduleByMonth = useMemo(() => DataUtil.getScheduleByMonth(locale), [locale]);
    const scheduleByDay = useMemo(() => DataUtil.getScheduleByDay(locale), [locale]);

    const theme = useTheme();
    const translator = useTranslator();
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const innerScrollOffset = useSharedValue(0);
    const windowDimensions = useWindowDimensions();

    useDerivedValue(() => {
        scrollTo(
            scrollRef,
            theme.header.scheduleButtonWidth * scrollOffset.value - windowDimensions.width / 2 + 52 / 2,
            0,
            true,
        );
    });

    const highlightTranslation = useDerivedValue(() => {
        return scrollOffset.value * theme.header.scheduleButtonWidth;
    }, []);

    const highlightStyle = useAnimatedStyle(
        () => ({
            transform: [{ translateX: highlightTranslation.value }],
        }),
        [],
    );

    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: ({ contentOffset: { x } }) => {
                innerScrollOffset.value = x;
            },
        },
        [],
    );

    return (
        <S.Pagination backgroundColor={"backgroundLight"} orientation={"column"} elevated>
            <Header title={translator("general.SCHEDULE")} />

            <Box stretch>
                <S.PaginationScroll horizontal ref={scrollRef} scrollEventThrottle={16} onScroll={scrollHandler}>
                    <Box orientation={"column"}>
                        <Box>
                            {scheduleByMonth.map(({ date, days }) => (
                                <SchedulePaginationHeader
                                    key={`month-${dateFormat(date, "yyyy-mm-dd")}`}
                                    title={dateFormat(date, "mmmm")}
                                    scrollOffset={innerScrollOffset}
                                    width={theme.header.scheduleButtonWidth * days.length}
                                />
                            ))}
                        </Box>

                        <Box>
                            <S.Highlight style={highlightStyle} />

                            {scheduleByDay.map(({ date }, innerIndex) => (
                                <SchedulePaginationButton
                                    key={`day-${dateFormat(date, "yyyy-mm-dd")}`}
                                    title={dateFormat(date, "dd")}
                                    onPress={() => onIndexPress(innerIndex)}
                                />
                            ))}
                        </Box>
                    </Box>
                </S.PaginationScroll>
            </Box>
        </S.Pagination>
    );
};
