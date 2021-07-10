import React, { useEffect } from "react";
import { DefaultTheme, ThemeProvider } from "./Theme";
import { RootNavigator } from "./navigation/RootNavigator";
import { FlipperProvider } from "./utils/FlipperProviderUtil";
import { StoreProvider } from "./stores";
import { LocaleProvider } from "./i18n";
import Splash from "react-native-splash-screen";

export const App: React.FC = () => {
    useEffect(() => {
        Splash.hide();
    }, []);

    return (
        <FlipperProvider>
            <StoreProvider>
                <LocaleProvider>
                    <ThemeProvider theme={DefaultTheme}>
                        <RootNavigator />
                    </ThemeProvider>
                </LocaleProvider>
            </StoreProvider>
        </FlipperProvider>
    );
};
