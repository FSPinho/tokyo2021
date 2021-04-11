import React, { useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Box } from "../Box";
import { ScheduleDayProps, ScheduleDayRef } from "./types";
import { Text } from "../Text";
import dateFormat from "dateformat";
import { BoxUnit } from "../Box/types";
import * as S from "./styles";
import { ActivityIndicator, ListRenderItem } from "react-native";
import { ScheduleEvent } from "../../@types";
import { useTheme } from "../../Theme";
import { TimezoneUtil } from "../../utils/TimezoneUtil";
import { ScheduleCard } from "../ScheduleCard";
import { ScheduleDayModal } from "../ScheduleDayModal";
import { ScheduleDayModalRef } from "../ScheduleDayModal/types";

export const ScheduleDay = React.forwardRef<ScheduleDayRef, ScheduleDayProps>(({ day }, ref) => {
    const [focused, setFocused] = useState(false);

    const theme = useTheme();
    const modalRef = useRef<ScheduleDayModalRef>(null);

    const ListHeaderComponent = useMemo(() => {
        const timezoneHR = TimezoneUtil.getTimezone(day.date);
        const timezoneNU = dateFormat("Z");

        return (
            <Box margin={BoxUnit.BASE} orientation={"column"}>
                <Text typography={"title"} value={dateFormat(day.date, "mmmm, dd")} />
                <Text
                    typography={"body1"}
                    value={timezoneHR || timezoneNU}
                    color={"backgroundLightTextSecondary"}
                    numberOfLines={1}
                />
            </Box>
        );
    }, [day.date]);

    const renderItem = useCallback<ListRenderItem<ScheduleEvent>>(({ item }) => {
        return <ScheduleCard event={item} onPress={() => modalRef.current?.focus(item.sport)} />;
    }, []);

    const keyExtractor = useCallback((_, index) => {
        return String(index);
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            setFocused(true);
        },
        blur() {
            setFocused(false);
        },
    }));

    return focused ? (
        <Box orientation={"column"} stretch fit>
            <S.List
                data={day.events}
                {...{
                    ListHeaderComponent,
                    renderItem,
                    keyExtractor,
                    initialNumToRender: 6,
                }}
            />

            <ScheduleDayModal ref={modalRef} />
        </Box>
    ) : (
        <Box orientation={"column"} padding={BoxUnit.HALF} stretch fit>
            {ListHeaderComponent}

            <Box fitAbsolute contentAlignment={"center"}>
                <ActivityIndicator size={72} color={theme.palette.primary} />
            </Box>
        </Box>
    );
});
