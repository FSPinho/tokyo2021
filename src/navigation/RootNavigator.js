import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { SportDetail } from "../screens";

const Stack = createStackNavigator();
const AgendaTabs = createMaterialTopTabNavigator();
const MainTabs = createBottomTabNavigator();ß

export const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={null} />
                <Stack.Screen name={"SportDetail"} component={SportDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
