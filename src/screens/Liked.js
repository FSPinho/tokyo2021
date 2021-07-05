/**
 * @flow
 */

import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Box, Text } from '../components';
import { SCHEDULE } from '../constants/TokyoScheduleData';
import DateFormat from 'dateformat';
import type {
    Event,
    EventDay,
    EventHour,
} from '../constants/TokyoScheduleData';
import AgendaEvent from '../components/AgendaEvent';
import { LikeUtils, Analytics } from '../utils';
import { Theme } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Line from '../components/Line';

export type LikedProps = {};
export type LikedState = { events: Array<any> };

export default class Liked extends Component<LikedProps, LikedState> {
    state: LikedState = {
        events: [],
    };
    listener: any;

    async componentDidMount(): Promise<void> {
        Analytics.doSetScreen('to_liked');

        const liked = await LikeUtils.getLikedMap();
        this._onLikedChange(liked);
        this.listener = {
            onLikedChange: this._onLikedChange,
        };
        LikeUtils.addListener(this.listener);
    }

    componentWillUnmount(): void {
        LikeUtils.removeListener(this.listener);
    }

    _onLikedChange = liked => {
        if (liked) {
            const events: Array<any> = [];
            SCHEDULE.map((eventDay: EventDay) => {
                const _dayEvents = [];
                eventDay.events.map((eventHour: EventHour) => {
                    eventHour.events.map((event: Event) => {
                        if (liked[event.id]) {
                            _dayEvents.push(event);
                        }
                    });
                });
                if (_dayEvents.length) {
                    _dayEvents.sort(
                        (e1: any, e2: any) =>
                            +e1.schedule.start - +e2.schedule.start,
                    );
                    events.push({
                        date: eventDay.date,
                        events: _dayEvents,
                    });
                }
            });
            events.sort((e1: any, e2: any) => +e1.date - +e2.start);
            this.setState(state => ({ ...state, events }));
        }
    };

    _doToggleLikeItem = async (event: Event): Promise<void> => {
        await LikeUtils.toggleLiked(event);
    };

    render(): React$Node {
        const { events } = this.state;
        return events.length ? (
            <Box fit primary>
                <Box scroll>
                    <Box column paddingSmall>
                        <Box spacerVerticalLarge />
                        {events.map((eDay: any, i: number) => (
                            <Box key={i} column>
                                <Box spacerVertical />
                                <Box>
                                    <Box spacerLarge />
                                    <Box column alignStretch fit>
                                        <Box>
                                            <Text
                                                font={'title'}
                                                color={Theme.palette.primary}>
                                                {DateFormat(
                                                    eDay.date,
                                                    'dd mmm',
                                                )}
                                            </Text>
                                        </Box>
                                        {eDay.events.map((e: Event) => (
                                            <Box key={e.id}>
                                                <AgendaEvent
                                                    event={e}
                                                    liked={true}
                                                    isFirst={i === 0}
                                                    isLast={
                                                        i === events.length - 1
                                                    }
                                                    onToggleLike={() =>
                                                        this._doToggleLikeItem(
                                                            e,
                                                        )
                                                    }
                                                />
                                                <Box spacer />
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                                <Box spacerVertical />
                                {Boolean(i < events.length - 1) && <Line fit />}
                            </Box>
                        ))}

                        <Box spacerVerticalLarge />
                        <Box spacerVerticalLarge />
                        <Box spacerVerticalLarge />
                    </Box>
                </Box>
            </Box>
        ) : (
            <Box fit centralize primary column>
                <Icon
                    size={72}
                    color={Theme.palette.backgroundPrimaryTextSecondary}
                    name={'heart-outline'}
                />
                <Text style={{ width: 120 }} font={'caption'} center>
                    Your liked events will appear here.
                </Text>
            </Box>
        );
    }
}
