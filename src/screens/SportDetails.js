import React, { Component } from 'react';
import { Box, Text } from '../components';
import { Image, StatusBar, StyleSheet } from 'react-native';
import DateFormat from 'dateformat';
import { Theme } from '../theme';
import { SCHEDULE } from '../constants/TokyoScheduleData';
import AgendaEvent from '../components/AgendaEvent';
import { Analytics, LikeUtils } from '../utils';
import Line from '../components/Line';
import { delayedRender } from '../components/DelayedRender';

class SportDetail extends Component {
    state = {
        liked: {},
    };
    listener;

    async componentDidMount() {
        Analytics.doSetScreen('to_sport_detail');

        const liked = await LikeUtils.getLikedMap();
        this._onLikedChange(liked);
        this.listener = {
            onLikedChange: this._onLikedChange,
        };
        LikeUtils.addListener(this.listener);
    }

    componentWillUnmount() {
        LikeUtils.removeListener(this.listener);
    }

    _onLikedChange = liked => {
        if (liked) {
            this.setState(state => ({ ...state, liked }));
        }
    };

    _doToggleLikeItem = async (event) => {
        await LikeUtils.toggleLiked(event);
    };

    get events() {
        const events = [];
        SCHEDULE.map((eventDay) => {
            const _dayEvents = [];
            eventDay.events.map((eventHour) => {
                eventHour.events.map((event) => {
                    if (
                        this.sport.discipline &&
                        event.discipline &&
                        event.discipline.id === this.sport.discipline.id
                    ) {
                        _dayEvents.push(event);
                    } else if (
                        this.sport.sport &&
                        event.sport.id === this.sport.sport.id
                    ) {
                        _dayEvents.push(event);
                    } else {
                        // console.log(
                        //     ' --- ',
                        //     this.sport.sport,
                        //     this.sport.discipline,
                        //     this.sport.id,
                        // );
                    }
                });
            });
            if (_dayEvents.length) {
                _dayEvents.sort(
                    (e1, e2) =>
                        +e1.schedule.start - +e2.schedule.start,
                );
                events.push({
                    date: eventDay.date,
                    events: _dayEvents,
                });
            }
        });
        events.sort((e1, e2) => +e1.date - +e2.start);
        return events;
    }

    get sport() {
        return this.props.navigation.getParam('sport');
    }

    render() {
        const sport = this.sport;
        const events = this.events;

        console.log(" --- ", sport.about)

        return (
            <Box fit primary>
                <StatusBar
                    backgroundColor={Theme.palette.backgroundPrimary}
                    barStyle={'dark-content'}
                />
                <Box scroll paddingSmall>
                    <Box column>
                        {sport.about.map((about, i) => (
                            <Box key={i} column>
                                <Box paddingSmall>
                                    <Box rounded hideOverflow>
                                        <Image
                                            style={_style.image}
                                            source={about.image}
                                        />
                                    </Box>
                                </Box>

                                {about.about.map((s, i) => (
                                    <Box key={i} paddingSmall>
                                        <Text font={s.type}>{s.text}</Text>
                                    </Box>
                                ))}

                                {!Boolean(about.length) && (
                                    <Box padding centralize>
                                        <Text font={'caption'}>
                                            Description coming soon...
                                        </Text>
                                    </Box>
                                )}
                            </Box>
                        ))}

                        {events.map((eDay, i) => (
                            <Box key={i} column>
                                <Box spacerVertical />
                                <Box>
                                    <Box spacerLarge />
                                    <Box column alignStretch fit>
                                        <Box alignCenter>
                                            <Text
                                                font={'title'}
                                                color={Theme.palette.primary}>
                                                {DateFormat(
                                                    eDay.date,
                                                    'dd mmm',
                                                )}
                                            </Text>
                                        </Box>
                                        {eDay.events.map((e) => (
                                            <Box key={e.id}>
                                                <AgendaEvent
                                                    event={e}
                                                    liked={
                                                        this.state.liked[e.id]
                                                    }
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
                    </Box>
                </Box>
            </Box>
        );
    }
}

const _style = StyleSheet.create({
    image: {
        width: '100%',
    },
});

export default delayedRender(SportDetail);