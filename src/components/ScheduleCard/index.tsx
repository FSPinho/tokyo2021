import React from "react";
import { BoxUnit } from "../Box/types";
import { Box } from "../Box";
import { Text } from "../Text";
import dateFormat from "dateformat";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as S from "../ScheduleDay/styles";
import { BaseButton } from "../BaseButton";
import { ScheduleCardProps } from "./types";
import { useTheme } from "../../Theme";

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ event, onPress }) => {
    const theme = useTheme();

    return (
        <BaseButton
            onPress={onPress}
            disabled={!event.sport.about}
            rippleColor={"primary"}
            orientation={"column"}
            marginLeft={BoxUnit.BASE}
            marginRight={BoxUnit.BASE}
            marginBottom={BoxUnit.BASE}
            padding={BoxUnit.HALF}
            paper>
            <Box contentAlignment={"left-center"} margin={BoxUnit.HALF}>
                <Text typography={"body2"} value={dateFormat(event.start, "HH:MM tt")} />
                <Icon name={"chevron-right"} size={18} />
                <Text typography={"body2"} value={dateFormat(event.end, "HH:MM tt")} />

                <Box fit />

                {event.sessions.some((s) =>
                    /(^final)|(\sfinal)|(medal\s+match)|(\s+oro\s+)|(\s+bronce\s+)/i.test(s),
                ) && <Icon name={"medal"} size={24} color={theme.palette.primary} />}
            </Box>
            <Box contentAlignment={"left-center"}>
                {!!event.sport.icon && (
                    <Box marginLeft={BoxUnit.HALF} marginRight={BoxUnit.HALF}>
                        <S.SportIcon xml={event.sport.icon.replace(/(#8b2030)/gi, theme.palette.primary)} />
                    </Box>
                )}
                <Box margin={BoxUnit.HALF} fit>
                    <Text typography={"title"} value={event.sport.title} />
                </Box>
            </Box>

            {!!event.sessions.length && (
                <Box contentAlignment={"left-center"} margin={BoxUnit.HALF} orientation={"column"}>
                    {event.sessions.map((session, idx) => (
                        <Box key={idx} paddingBottom={BoxUnit.HALF} contentAlignment={"left-center"}>
                            <Text typography={"body2"} value={"• "} />
                            <Text typography={"body1"} value={session} />
                        </Box>
                    ))}
                </Box>
            )}
        </BaseButton>
    );
};
