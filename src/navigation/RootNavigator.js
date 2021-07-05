import React from 'react';
import { AgendaPage, Box, Text } from '../components';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import DateFormat from 'dateformat';

import { Liked, Ranking, SportDetail, Sports } from '../screens';
import { Theme } from '../theme';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { SCHEDULE } from '../constants/TokyoScheduleData';

const tabs = {};
SCHEDULE.map((e, i) => {
    tabs[e.date.toISOString()] = {
        screen: () => (
            <AgendaPage
                eventDay={e}
                index={i}
                onNext={() => {}}
                onPrev={() => {}}
            />
        ),
        navigationOptions: {
            tabBarLabel: ({  tintColor }) => (
                <Text font={'body2'} color={tintColor}>
                    {DateFormat(e.date, 'dd/mm')}
                </Text>
            ),
            swipeEnabled: true,
        },
    };
});

const TabNavigator = createMaterialTopTabNavigator(tabs, {
    swipeEnabled: true,
    lazy: true,
    lazyPlaceholderComponent: () => (
        <Box fitAbsolute centralize>
            <ActivityIndicator color={Theme.palette.primary} />
        </Box>
    ),
    initialLayout: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    tabBarOptions: {
        activeTintColor: Theme.palette.primary,
        inactiveTintColor: Theme.palette.backgroundPrimaryTextSecondary,
        pressColor: Theme.palette.primary,
        pressOpacity: 0.5,
        scrollEnabled: true,
        tabStyle: {
            width: 84,
            height: 56,
        },
        indicatorStyle: {
            backgroundColor: Theme.palette.primary,
            height: 4,
        },
        style: {
            backgroundColor: Theme.palette.backgroundPrimary,
        },
    },
});

const RootNavigator = createStackNavigator({
    Home: {
        screen: createMaterialBottomTabNavigator(
            {
                Home: {
                    screen: TabNavigator,
                    navigationOptions: {
                        tabBarIcon: ({  tintColor }) => (
                            <MIcon
                                name={'home-outline'}
                                color={tintColor}
                                size={24}
                            />
                        ),
                        tabBarColor: Theme.palette.backgroundPrimary,
                    },
                },
                Sports: {
                    screen: Sports,
                    navigationOptions: {
                        tabBarIcon: ({  tintColor }) => (
                            <MIcon
                                name={'racquetball'}
                                color={tintColor}
                                size={24}
                            />
                        ),
                        tabBarColor: Theme.palette.backgroundPrimary,
                    },
                },
                Ranking: {
                    screen: Ranking,
                    navigationOptions: {
                        tabBarIcon: ({  tintColor }) => (
                            <MIcon
                                name={'trophy-outline'}
                                color={tintColor}
                                size={24}
                            />
                        ),
                        tabBarColor: Theme.palette.backgroundPrimary,
                    },
                },
                Liked: {
                    screen: Liked,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <MIcon
                                name={'heart-outline'}
                                color={tintColor}
                                size={24}
                            />
                        ),
                        tabBarColor: Theme.palette.backgroundPrimary,
                    },
                },
            },
            {
                labeled: false,
                activeColor: Theme.palette.primary,
                inactiveColor: Theme.palette.backgroundPrimaryTextSecondary,
                barStyle: {
                    backgroundColor: Theme.palette.backgroundPrimary,
                    margin: Theme.metrics.spacing * 4,
                    borderRadius: Theme.metrics.borderRadius * 2,
                    overflow: 'hidden',
                    position: 'absolute',
                    width: 'auto',
                    elevation: 10,
                },
                backBehavior: 'history',
            },
        ),
        navigationOptions: {
            headerTitle: () => <Text font={'title'}>Tokyo 2020</Text>,
            headerStyle: {
                elevation: 0,
            },
            headerShown: false,
        },
    },
    SportDetail: {
        screen: SportDetail,
        navigationOptions: ({ navigation }) => ({
            headerTitle: (
                <Box fit style={{maxWidth: Dimensions.get("window").width - 128}}>
                    <Text style={{ fontSize: 18, marginLeft: -16 }} numberOfLines={1} fontWeight={"bold"}>
                        {navigation.getParam('sport').about.map(a => a.name).join(" / ")}
                    </Text>
                </Box>
            )
        }),
    },
});

export default createAppContainer(RootNavigator);
