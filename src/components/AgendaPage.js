import React, { Component } from 'react';
import { Box } from '../components';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import DateFormat from 'dateformat';
import { Theme } from '../theme';
import { Text } from '.';
import AgendaEvent from './AgendaEvent';
import { Analytics, LikeUtils } from '../utils';
import { delayedRender } from '../components/DelayedRender';


class AgendaPage extends Component {
    state = {
        liked: {},
    };
    listener;

    async componentDidMount() {
        Analytics.doSetScreen('to_schedule');

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

    _doRenderEvent = ({item: eventHour}) => {
        return (
            <Box alignStart column paddingSmall>
                <Box spacerVerticalSmall />
                <Box centralize>
                    <Box spacerSmall />
                    <View style={_style.dot} />
                    <Box spacer />
                    <Text
                        color={Theme.palette.primary}
                        font={'title'}>
                        {DateFormat(
                            eventHour.date,
                            'hh:MM TT',
                        )}
                    </Text>
                </Box>
                <Box spacerVertical />
                <Box>
                    <Box spacerLarge />
                    <Box
                        fit
                        primary
                        style={_style.card}
                        rounded
                        column>
                        <Box spacerVertical />

                        {eventHour.events.map(
                            (
                                event,
                                eIndex,
                            ) => (
                                <Box
                                    key={event.id}
                                    column>
                                    <View
                                        style={
                                            eventHour
                                                .events
                                                .length -
                                            1 ===
                                            eIndex
                                                ? _style.lineLast
                                                : _style.line
                                        }
                                    />

                                    <AgendaEvent
                                        event={event}
                                        liked={
                                            this.state
                                                .liked[
                                                event.id
                                                ]
                                        }
                                        isFirst={
                                            eIndex === 0
                                        }
                                        isLast={
                                            eventHour
                                                .events
                                                .length -
                                            1 ===
                                            eIndex
                                        }
                                        onToggleLike={() =>
                                            this._doToggleLikeItem(
                                                event,
                                            )
                                        }
                                    />

                                    {!Boolean(
                                        eventHour.events
                                            .length -
                                        1 ===
                                        eIndex,
                                    ) && (
                                        <Box
                                            spacerVerticalLarge
                                        />
                                    )}
                                </Box>
                            ),
                        )}
                    </Box>
                    <Box spacerSmall />
                </Box>
                <Box spacerVerticalLarge />
            </Box>
        );
    }

    render() {
        const item = this.props.eventDay;

        return (
            <Box fit primary>
                <StatusBar
                    backgroundColor={Theme.palette.backgroundPrimary}
                    barStyle={'dark-content'}
                />

                <FlatList style={{ flex: 1 }}
                          data={item.events}
                          renderItem={this._doRenderEvent} keyExtractor={(_, index) => String(index)}
                          ListFooterComponent={
                              <Box column>
                                  <Box spacerVerticalLarge />
                                  <Box spacerVerticalLarge />
                              </Box>
                          } />
            </Box>
        );
    }
}

const _style = StyleSheet.create({
    card: {
        // elevation: 8,
        marginRight: Theme.metrics.spacing,
    },
    cardDate: {
        borderBottomLeftRadius: 0,
    },
    line: {
        width: 2,
        top: Theme.metrics.spacing * -5,
        bottom: Theme.metrics.spacing * -2,
        left: Theme.metrics.spacing * -2 - 1,
        backgroundColor: Theme.palette.primary,
        position: 'absolute',
    },
    lineLast: {
        width: 2,
        height: Theme.metrics.spacing * 9,
        top: Theme.metrics.spacing * -5,
        left: Theme.metrics.spacing * -2 - 1,
        backgroundColor: Theme.palette.primary,
        position: 'absolute',
    },
    dot: {
        width: Theme.metrics.spacing * 2,
        height: Theme.metrics.spacing * 2,
        marginTop: 3,
        borderRadius: Theme.metrics.borderRadius,
        backgroundColor: Theme.palette.primary,
        elevation: 4,
    },
});


export default delayedRender(AgendaPage);