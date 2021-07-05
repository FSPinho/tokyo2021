/**
 * @flow
 */

import React, { Component, PureComponent } from 'react';
import { Box, Text } from '../components';
import {
    StatusBar,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { Theme } from '../theme';
import SPORTS_DATA from '../constants/RawSportsData';
import SPORTS_MAP from '../constants/SportsMap';
import { SPORTS, DISCIPLINES } from '../constants/TokyoScheduleData';
import type { Sport, Discipline } from '../constants/TokyoScheduleData';
import { Analytics } from '../utils';

export type SportsProps = {
    navigation: any,
};

export default class Sports extends Component<SportsProps> {
    async componentDidMount(): Promise<void> {
        Analytics.doSetScreen('to_liked');
    }

    _openSportDetails = (sport: any): void => {
        this.props.navigation.navigate('SportDetail', { sport });
    };

    _getSportIcon = sportKey => {
        const discipline = DISCIPLINES.filter(
            (discipline: Discipline) =>
                discipline.name.en === SPORTS_MAP[sportKey],
        )[0];

        const sport = SPORTS.filter(
            (sport: Sport) => sport.name.en === SPORTS_MAP[sportKey],
        )[0];

        return {
            sport: sport,
            discipline: discipline,
            icon: discipline
                ? discipline.icon.getResource()
                : sport
                ? sport.icon.getResource()
                : null,
        };
    };

    _renderSportRow = (sport): React$Node => {
        return (
            <TouchableOpacity
                key={sport.id}
                onPress={() => this._openSportDetails(sport)}>
                <Box column rounded primary hideOverflow>
                    <Box marginSmall rounded hideOverflow>
                        <ImageBackground
                            source={sport.image}
                            style={_style.image}>
                            <Box column fitAbsolute justifyEnd>
                                <Box
                                    alignCenter
                                    paddingSmall
                                    style={_style.backgroundLayer}>
                                    {Boolean(sport.icon) && (
                                        <Image
                                            style={_style.icon}
                                            source={sport.icon}
                                        />
                                    )}
                                    <Box paddingSmall>
                                        <Text
                                            color={
                                                Theme.palette.backgroundPrimary
                                            }
                                            font={'title'}>
                                            {sport.name}
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </ImageBackground>
                    </Box>
                </Box>
            </TouchableOpacity>
        );
    };

    render(): React$Node {
        const sports = Object.keys(SPORTS_DATA)
            .map(k => {
                const { sport, discipline, icon } = this._getSportIcon(k);
                return {
                    id: k,
                    sport,
                    discipline,
                    icon,
                    ...SPORTS_DATA[k],
                    about: [SPORTS_DATA[k]]
                };
            })
            .sort((a, b) => a.name.localeCompare(b.name));

        return (
            <Box fit primary>
                <StatusBar
                    backgroundColor={Theme.palette.backgroundPrimary}
                    barStyle={'dark-content'}
                />
                <Box scroll paddingSmall>
                    <Box column paddingSmall>
                        <Text font={'title'}>Sports</Text>
                    </Box>
                    <Box column>
                        {sports.map((sport: any) =>
                            this._renderSportRow(sport),
                        )}
                        <Box spacerVerticalLarge />
                        <Box spacerVerticalLarge />
                        <Box spacerVerticalLarge />
                    </Box>
                </Box>
            </Box>
        );
    }
}

const _style = StyleSheet.create({
    image: {
        width: '100%',
        height: 192,
    },
    icon: {
        width: 48,
        height: 48,
        marginLeft: Theme.metrics.spacing,
        marginRight: Theme.metrics.spacing,
    },
    backgroundLayer: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
    },
});
