import React, { useCallback, useImperativeHandle, useMemo, useState } from "react";
import { Box } from "../Box";
import { ScheduleDayProps, ScheduleDayRef } from "./types";
import { Text } from "../Text";
import dateFormat from "dateformat";
import { BoxUnit } from "../Box/types";
import * as S from "./styles";
import { ActivityIndicator, ListRenderItem } from "react-native";
import { ScheduleEvent } from "../../@types";
import { useTheme } from "../../Theme";

export const ScheduleDay = React.forwardRef<ScheduleDayRef, ScheduleDayProps>(({ day }, ref) => {
    const [focused, setFocused] = useState(false);

    const theme = useTheme();

    const ListHeaderComponent = useMemo(() => {
        return (
            <Box margin={BoxUnit.BASE}>
                <Text typography={"title"} value={dateFormat(day.date, "mmm, dd")} />
            </Box>
        );
    }, [day.date]);

    const renderItem = useCallback<ListRenderItem<ScheduleEvent>>(({ item }) => {
        return (
            <Box
                marginLeft={BoxUnit.BASE}
                marginRight={BoxUnit.BASE}
                marginBottom={BoxUnit.BASE}
                padding={BoxUnit.HALF}
                paper>
                <Text typography={"title"} value={dateFormat(item.start, "mmm, dd")} />
            </Box>
        );
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
        <S.List data={day.events} {...{ ListHeaderComponent, renderItem, keyExtractor }} />
    ) : (
        <Box orientation={"column"} padding={BoxUnit.HALF} stretch fit>
            {ListHeaderComponent}

            <Box fitAbsolute contentAlignment={"center"}>
                <ActivityIndicator size={72} color={theme.palette.primary} />
            </Box>
        </Box>
    );
});
