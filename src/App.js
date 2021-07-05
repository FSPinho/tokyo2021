import React, { Component } from "react";
import "react-native-gesture-handler";
import { RootNavigator } from "./navigation";
import { Box } from "./components";
import { RemoteConfig } from "./utils";
import { BannerAd, BannerAdSize, TestIds } from "@react-native-firebase/admob";
import SplashScreen from "react-native-splash-screen";

class App extends Component {
    state = {
        showBanner: false,
        bannerError: false,
    };

    componentDidMount() {
        SplashScreen.hide();

        RemoteConfig.doAddRemoteConfigListener({
            onConfigChange: config => {
                this.setState(state => ({
                    ...state,
                    showBanner: config.ads.banner,
                }));
            },
        });
    }

    render() {
        return (
            <Box primary fit column>
                <RootNavigator />

                {Boolean(this.state.showBanner && !this.state.bannerError) && (
                    <Box centralize primary>
                        <BannerAd
                            unitId={
                                __DEV__
                                    ? TestIds.BANNER
                                    : "ca-app-pub-5594222713152935/8386368045"
                            }
                            size={BannerAdSize.SMART_BANNER}
                            onAdFailedToLoad={() => {
                                console.log("Banner error!");
                                this.setState(state => ({
                                    ...state,
                                    bannerError: true,
                                }));
                            }}
                        />
                    </Box>
                )}
            </Box>
        );
    }
}

export default App;
