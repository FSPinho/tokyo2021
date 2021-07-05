/**
 * @flow
 */

import React, { Component } from 'react';
import { Box, Text } from '../components';
import { Countries } from '../constants';
import { IMAGES } from '../constants/Countries';
import { StyleSheet, Image, StatusBar, FlatList } from 'react-native';
import { Theme, Palette } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Analytics } from '../utils';
import database from '@react-native-firebase/database';

export type RankingProps = {};
export type RankingState = {
    results: {},
};

export default class Ranking extends Component<RankingProps, RankingState> {
    state: RankingState = {
        results: {},
    };

    componentDidMount(): void {
        Analytics.doSetScreen('to_ranking');

        const ref = database().ref('/results');
        ref.on('value', snapshot => {
            const results = snapshot.val();
            this.setState(state => ({
                ...state,
                results,
            }));
        });
    }

    _renderItem = ({ item, index }) => {
        const c = item;
        const i = index;

        return c.fake ? (
            <Box style={{ height: 96 }} />
        ) : (
            <Box key={c.code} alignCenter marginSmall paddingSmall>
                <Box column paddingSmall>
                    <Box style={_style.imageWrapper}>
                        <Image source={c.image} style={_style.image} />
                    </Box>
                </Box>

                <Box column paddingSmall>
                    <Text font={'title'}>{i + 1}.</Text>
                </Box>

                <Box column paddingSmall>
                    <Box>
                        <Text font={'body2'}>
                            {c.code.toUpperCase()} - {c.name}
                        </Text>
                    </Box>
                    <Box alignCenter>
                        <Box alignCenter>
                            <Icon
                                size={24}
                                name={'medal'}
                                color={Palette.Amber500}
                            />
                            <Text font={'title'}>{c.medals.gold}</Text>
                        </Box>
                        <Box spacer />
                        <Box alignCenter>
                            <Icon
                                size={24}
                                name={'medal'}
                                color={Palette.BlueGray200}
                            />
                            <Text font={'title'}>{c.medals.silver}</Text>
                        </Box>
                        <Box spacer />
                        <Box alignCenter>
                            <Icon
                                size={24}
                                name={'medal'}
                                color={Palette.Brown300}
                            />
                            <Text font={'title'}>{c.medals.bronze}</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    };

    render(): React$Node {
        const countries = [];
        Object.keys(Countries).map(name => {
            const result = this.state.results[Countries[name].toUpperCase()];

            countries.push({
                name: result && result.name ? result.name : name,
                code: Countries[name],
                image: IMAGES[Countries[name]],
                medals: {
                    gold:
                        result && result.medals && result.medals.gold
                            ? result.medals.gold
                            : 0,
                    silver:
                        result && result.medals && result.medals.silver
                            ? result.medals.silver
                            : 0,
                    bronze:
                        result && result.medals && result.medals.bronze
                            ? result.medals.bronze
                            : 0,
                },
            });
        });

        countries.sort((b, a) => {
            if (a.medals.gold != b.medals.gold)
                return a.medals.gold - b.medals.gold;
            if (a.medals.silver != b.medals.silver)
                return a.medals.silver - b.medals.silver;
            return a.medals.bronze - b.medals.bronze;
        });

        return (
            <Box fit primary>
                <StatusBar
                    backgroundColor={Theme.palette.backgroundPrimary}
                    barStyle={'dark-content'}
                />
                <FlatList
                    data={[
                        ...countries,
                        { code: '0', fake: true },
                        { code: '1', fake: true },
                    ]}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.code}
                    getItemLayout={(data, index) => ({
                        length: 96,
                        offset: 96 * index,
                        index,
                    })}
                />
            </Box>
        );
    }
}

const _style = StyleSheet.create({
    image: {
        width: 96,
        height: (96 * 9) / 16,
        borderRadius: Theme.metrics.borderRadius,
    },
    imageWrapper: {
        // borderWidth: 1,
        // borderColor: 'rgba(0, 0, 0, .12)',
        borderRadius: Theme.metrics.borderRadius,
        elevation: 12,
    },
});
