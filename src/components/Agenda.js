/**
 * @flow
 */

import React, { Component } from 'react';
import { Box, Text, Line, AgendaPage } from '../components';
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Image,
    Modal,
    StatusBar,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import DateFormat from 'dateformat';
import { Calendar } from 'react-native-calendars';
import { SCHEDULE } from '../constants/TokyoScheduleData';
import type {
    Event,
    EventHour,
    EventDay,
} from '../constants/TokyoScheduleData';
import { Theme } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Analytics } from '../utils';
import { ActivityIndicator } from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const CARD_WIDTH = SCREEN_WIDTH - Theme.metrics.spacing;
const CARD_HEIGHT = SCREEN_HEIGHT - Theme.metrics.spacing;
const CARD_SHADOW_MARGIN = Theme.metrics.spacing * 1.8;

class Agenda extends Component {
    state = {
        index: 0,
        modalOpen: false,
    };

    _doToggleModal = () => {
        this.setState(state => ({ ...state, modalOpen: !state.modalOpen }));
    };

    _doNext = () => {
        Analytics.doSendEvent('to_agenda_forward_day');

        if (this.refs.carousel) {
            setTimeout(() => this.refs.carousel.snapToNext(), 250);
        }
    };

    _doPrev = () => {
        Analytics.doSendEvent('to_agenda_backward_day');
        if (this.refs.carousel) {
            setTimeout(() => this.refs.carousel.snapToPrev(), 250);
        }
    };

    _onPageChanged = (index) => {
        this.setState(state => ({ ...state, index }));
    };

    _onDaySelected = ({ day, month }) => {
        Analytics.doSendEvent('to_agenda_open_calendar');

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
    };

    render() {
        const { index } = this.state;

        return (
            <Box fit primary column alignCenter>
                <StatusBar
                    backgroundColor={Theme.palette.backgroundPrimary}
                    barStyle={'dark-content'}
                />
                <Box column fit>
                    <Text>Title</Text>
                </Box>

                <Box centralize paper circle style={_style.dateRow}>
                    <TouchableOpacity
                        onPress={this._doPrev}
                        disabled={index === 0}>
                        <Box circle centralize marginSmall padding>
                            <Icon
                                name={'chevron-left'}
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
                    <TouchableOpacity onPress={this._doToggleModal}>
                        <Box
                            paper
                            circle
                            color={Theme.palette.primary}
                            marginSmall
                            padding>
                            <Box spacerSmall />
                            <Text
                                font={'title'}
                                color={Theme.palette.primaryText}>
                                {DateFormat(SCHEDULE[index].date, 'dd mmm')}
                            </Text>
                            <Box spacerSmall />
                        </Box>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._doNext}
                        disabled={index === SCHEDULE.length - 1}>
                        <Box circle centralize marginSmall padding primary>
                            <Icon
                                name={'chevron-right'}
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
                    animationType={'slide'}
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalOpen}
                    onRequestClose={this._doToggleModal}>
                    <Box centralize fit>
                        <Box
                            centralize
                            column
                            paper
                            padding
                            style={_style.modal}>
                            <Text font={'title'}>Calendar</Text>

                            <Calendar
                                current={SCHEDULE[index].date}
                                minDate={SCHEDULE[0].date}
                                maxDate={SCHEDULE[SCHEDULE.length - 1].date}
                                onDayPress={this._onDaySelected}
                                monthFormat={'MMMM yyyy'}
                                markedDates={{
                                    [DateFormat(
                                        SCHEDULE[index].date,
                                        'yyyy-mm-dd',
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
    }
}

const _style = StyleSheet.create({
    card: {
        backgroundColor: Theme.palette.backgroundPrimary,
        width: CARD_WIDTH,
        height: '100%',
    },
    cardContainer: {
        alignItems: 'flex-start',
    },
    dateRow: {
        position: 'absolute',
        top: Theme.metrics.spacing * 2,
        elevation: 12,
    },
    modal: {
        elevation: 24,
    },
    pagination: {
        position: 'absolute',
        top: 0,
        height: 240,
    },
});

export default withNavigation(Agenda);
