/**
 * @flow
 */

import React, {useCallback, useReducer, useRef, useState} from "react";
import { Box, Text } from "../components";
import {
    Dimensions,
    Modal,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import DateFormat from "dateformat";
import { Calendar } from "react-native-calendars";
import { SCHEDULE } from "../constants/TokyoScheduleData";
import { Theme } from "../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Analytics } from "../utils";
import Carousel from "react-native-snap-carousel"

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const CARD_WIDTH = SCREEN_WIDTH - Theme.metrics.spacing;

const Agenda = () => {
    const [index, setIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    const carrousel = useRef<Carrou>(null);

    const _doToggleModal = useCallback(() => {
        setModalOpen(curr => !curr);
    }, []);

    const _doNext = useCallback(() => {
        Analytics.doSendEvent("to_agenda_forward_day").then(null);

        if (carouselRef) {
            setTimeout(() => this.refs.carousel.snapToNext(), 250);
        }
    }, []);

    const _doPrev = useCallback(() => {
        Analytics.doSendEvent("to_agenda_backward_day");
        if (this.refs.carousel) {
            setTimeout(() => this.refs.carousel.snapToPrev(), 250);
        }
    }, []);

    const _onPageChanged = useCallback(index => {
        this.setState(state => ({ ...state, index }));
    }, []);

    const _onDaySelected = useCallback(({ day, month }) => {
        Analytics.doSendEvent("to_agenda_open_calendar");

        let index = 0;
        SCHEDULE.map((eventDay, i) => {
            if (
                eventDay.date.getDate() === day &&
                eventDay.date.getMonth() === month - 1
            ) {
                index = i;
            }
        });
        this.setState(
            state => ({ ...state, index, modalOpen: false }),
            () => {
                if (this.refs.carousel) {
                    setTimeout(() => this.refs.carousel.snapToItem(index), 250);
                }
            },
        );
    }, []);

    return (
        <Box fit primary column alignCenter>
            <StatusBar
                backgroundColor={Theme.palette.backgroundPrimary}
                barStyle={"dark-content"}
            />
            <Box column fit>
                <Text>Title</Text>
            </Box>

            <Box centralize paper circle style={_style.dateRow}>
                <TouchableOpacity onPress={_doPrev} disabled={index === 0}>
                    <Box circle centralize marginSmall padding>
                        <Icon
                            name={"chevron-left"}
                            size={24}
                            color={
                                index > 0
                                    ? Theme.palette
                                          .backgroundPrimaryTextSecondary
                                    : Theme.palette
                                          .backgroundPrimaryTextDisabled
                            }
                        />
                    </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={_doToggleModal}>
                    <Box
                        paper
                        circle
                        color={Theme.palette.primary}
                        marginSmall
                        padding>
                        <Box spacerSmall />
                        <Text font={"title"} color={Theme.palette.primaryText}>
                            {DateFormat(SCHEDULE[index].date, "dd mmm")}
                        </Text>
                        <Box spacerSmall />
                    </Box>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={_doNext}
                    disabled={index === SCHEDULE.length - 1}>
                    <Box circle centralize marginSmall padding primary>
                        <Icon
                            name={"chevron-right"}
                            size={24}
                            color={
                                index < SCHEDULE.length - 1
                                    ? Theme.palette
                                          .backgroundPrimaryTextSecondary
                                    : Theme.palette
                                          .backgroundPrimaryTextDisabled
                            }
                        />
                    </Box>
                </TouchableOpacity>
            </Box>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}
                onRequestClose={_doToggleModal}>
                <Box centralize fit>
                    <Box centralize column paper padding style={_style.modal}>
                        <Text font={"title"}>Calendar</Text>

                        <Calendar
                            current={SCHEDULE[index].date}
                            minDate={SCHEDULE[0].date}
                            maxDate={SCHEDULE[SCHEDULE.length - 1].date}
                            onDayPress={_onDaySelected}
                            monthFormat={"MMMM yyyy"}
                            markedDates={{
                                [DateFormat(
                                    SCHEDULE[index].date,
                                    "yyyy-mm-dd",
                                )]: {
                                    selected: true,
                                    selectedColor: Theme.palette.primary,
                                },
                            }}
                            theme={{
                                textSectionTitleColor:
                                    Theme.palette.primaryText,
                                arrowColor: Theme.palette.primary,
                            }}
                        />
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

const _style = StyleSheet.create({
    card: {
        backgroundColor: Theme.palette.backgroundPrimary,
        width: CARD_WIDTH,
        height: "100%",
    },
    cardContainer: {
        alignItems: "flex-start",
    },
    dateRow: {
        position: "absolute",
        top: Theme.metrics.spacing * 2,
        elevation: 12,
    },
    modal: {
        elevation: 24,
    },
    pagination: {
        position: "absolute",
        top: 0,
        height: 240,
    },
});

export default withNavigation(Agenda);
