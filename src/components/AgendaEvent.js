import React, { useCallback, useEffect } from "react";
import { Box } from "../components";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateFormat from "dateformat";
import { Theme } from "../theme";
import { Text } from ".";
import SPORTS_MAP from "../constants/SportsMap";
import SPORTS_DATA from "../constants/RawSportsData";
import { SvgCss } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const _clear = text => text.replace(/^\s*/, "").replace(/\s*$/, "");

export const AgendaEvent = ({ event, liked, isFirst, isLast, onToggleLike }) => {
    const navigation = useNavigation();

    const _getSportInfo = useCallback(() => {
        const sportKey = _clear(event.sport.name.en);
        let _data = [];
        Object.keys(SPORTS_MAP).map(k => {
            if (SPORTS_MAP[k].includes(sportKey)) {
                _data = [..._data, SPORTS_DATA[k]];
            }
        });

        if (_data.length === 0) {
            console.warn(" --- Can't find data for sport:", sportKey);
        }

        return _data.length
            ? {
                  id: sportKey,
                  sport: event.sport,
                  discipline: event.discipline,
                  icon: event.discipline
                      ? event.discipline.icon.getResource()
                      : event.sport.icon.getResource(),
                  about: _data,
              }
            : null;
    }, [event.discipline, event.sport]);

    const _openSportDetails = useCallback(() => {
        const sportInfo = _getSportInfo();

        if (sportInfo) {
            navigation.navigate("SportDetail", {
                sport: sportInfo,
            });
        }
    }, [_getSportInfo, navigation]);

    useEffect(() => {
        _getSportInfo();
    }, [_getSportInfo]);

    return (
        <Box column fit>
            {Boolean(event.schedule.variable) && (
                <Box fit marginSmall alignCenter>
                    <View style={_style.dotSmall} />
                    <Text
                        color={Theme.palette.backgroundPrimaryText}
                        font={"caption"}
                        fontWeight={"bold"}>
                        *The competition schedule is subjected to change
                        depending on the wave conditions
                    </Text>
                </Box>
            )}
            {!event.schedule.variable && (
                <Box fit marginSmall alignCenter>
                    <View style={_style.dotSmall} />
                    <Text
                        color={Theme.palette.backgroundPrimaryText}
                        font={"caption"}
                        fontWeight={"bold"}>
                        {DateFormat(event.schedule.start, "hh:MM TT")}
                    </Text>
                    <Icon
                        size={16}
                        color={Theme.palette.backgroundPrimaryText}
                        name={"chevron-right"}
                    />
                    <Text
                        color={Theme.palette.backgroundPrimaryText}
                        font={"caption"}
                        fontWeight={"bold"}>
                        {DateFormat(event.schedule.end, "hh:MM TT")}
                    </Text>

                    <Box fit />

                    <TouchableOpacity onPress={() => onToggleLike(event)}>
                        <Box
                            circle
                            paddingSmall
                            color={
                                liked
                                    ? Theme.palette.primary
                                    : Theme.palette.backgroundSecondary
                            }>
                            <Icon
                                name={liked ? "heart" : "heart-outline"}
                                size={24}
                                color={
                                    liked
                                        ? Theme.palette.primaryText
                                        : Theme.palette
                                              .backgroundPrimaryTextDisabled
                                }
                            />
                        </Box>
                    </TouchableOpacity>
                </Box>
            )}

            <Box alignCenter>
                <Box fit>
                    <TouchableOpacity
                        onPress={_openSportDetails}
                        disabled={event.name.includes("Opening")}>
                        <Box alignCenter>
                            {!!event.sport.icon.getResource() && (
                                <Box marginSmall>
                                    <SvgCss
                                        style={_style.icon}
                                        xml={event.sport.icon
                                            .getResource()
                                            .replace("8b2030", "673AB7")}
                                    />
                                </Box>
                            )}
                            <Box column marginSmall>
                                <Text font={"title"}>{_clear(event.name)}</Text>
                            </Box>
                        </Box>
                    </TouchableOpacity>
                </Box>
                {Boolean(event.type === "medal") && (
                    <Box marginSmall>
                        <Box
                            secondary
                            color={Theme.palette.gold}
                            circle
                            paddingSmall>
                            <Icon
                                name={"medal"}
                                size={24}
                                color={Theme.palette.backgroundPrimary}
                            />
                        </Box>
                    </Box>
                )}
            </Box>

            <Box fit column marginSmall>
                <Text font={"caption"}>Venue</Text>
                <Text font={"body2"}>
                    {event.venue.replace("Venues: ", "")}
                </Text>
                <Box spacerVerticalSmall />
                <Text font={"caption"}>Events</Text>
                {event.contents.map((c, cI) => (
                    <Text key={cI} font={"body2"}>
                        ??? {c}
                    </Text>
                ))}
            </Box>
        </Box>
    );
};

const _style = StyleSheet.create({
    icon: {
        width: Theme.metrics.spacing * 8,
        height: Theme.metrics.spacing * 8,
    },
    dotSmall: {
        position: "absolute",
        left: Theme.metrics.spacing * -3 - Theme.metrics.spacing / 2,
        width: Theme.metrics.spacing,
        height: Theme.metrics.spacing,
        borderRadius: Theme.metrics.borderRadius,
        backgroundColor: Theme.palette.primary,
        elevation: 2,
    },
});
