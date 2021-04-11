import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../pages/Home";
import SLIcon from "react-native-vector-icons/SimpleLineIcons";
import { useTheme } from "../Theme";
import { StatusBar } from "react-native";

const Tab = createBottomTabNavigator();

export const RootNavigator: React.FC = () => {
    const theme = useTheme();
    return (
        <>
            <StatusBar backgroundColor={theme.palette.backgroundLight} barStyle={"dark-content"} />
            <NavigationContainer>
                <Tab.Navigator
                    lazy
                    tabBarOptions={{
                        showLabel: false,
                        activeTintColor: theme.palette.primary,
                        inactiveTintColor: theme.palette.backgroundLightTextTertiary,
                    }}>
                    <Tab.Screen
                        name="Home"
                        component={Home}
                        options={{ tabBarIcon: ({ color }) => <SLIcon name={"event"} size={20} color={color} /> }}
                    />

                    <Tab.Screen
                        name="Sports"
                        component={Home}
                        options={{ tabBarIcon: ({ color }) => <SLIcon name={"grid"} size={20} color={color} /> }}
                    />

                    <Tab.Screen
                        name="Medals"
                        component={Home}
                        options={{ tabBarIcon: ({ color }) => <SLIcon name={"trophy"} size={20} color={color} /> }}
                    />

                    <Tab.Screen
                        name="Favorites"
                        component={Home}
                        options={{ tabBarIcon: ({ color }) => <SLIcon name={"heart"} size={20} color={color} /> }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
};
