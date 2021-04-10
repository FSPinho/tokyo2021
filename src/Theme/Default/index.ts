import type { IDefaultTheme } from "../Styled/index";

export const DefaultTheme: IDefaultTheme = {
    palette: {
        /**
         * Primary
         */
        primary: "#9C27B0",
        primaryDark: "#7B1FA2",
        primaryLight: "#D3E0F4",
        primaryText: "#FFFFFF",
        primaryRipple: "#FFFFFF",

        /**
         * Backgrounds
         */
        backgroundLight: "#FFFFFF",
        backgroundLightText: "#2F3542",
        backgroundLightTextSecondary: "#57606F",
        backgroundLightTextTertiary: "#8A8D93",
        backgroundLightRipple: "#1157B944",
        backgroundLightGrey: "#E4E5E8",
        backgroundLightGreySecondary: "#E9EAEE",
        backgroundLightGreyText: "#2F3542",
        backgroundLightGreyRipple: "#1157B988",

        /**
         * Warns
         */
        accent: "#FFC107",
        accentText: "#FFFFFF",
        accentRipple: "#FFFFFF",
    },
    units: {
        none: 0,
        half: 7,
        base: 14,
        double: 28,
    },
    header: {
        height: 48,
        scheduleButtonWidth: 58,
    },
    splashScreen: {
        delay: 400,
    },
    button: {
        borderRadius: 10,
        floatingActionButtonSize: 84,
    },
    paper: {
        borderRadius: 16,
        elevation: 4,
    },
    transition: {
        duration: {
            /**
             * These values are based on Material Design guidelines.
             * https://material.io/design/motion/speed.html#duration
             * */
            small: 180,
            smallReverse: 100,
            medium: 250,
            mediumReverse: 200,
            large: 300,
            largeReverse: 250,
        },
        easing: {
            bezier: [0.4, 0.0, 0.2, 1],
        },
    },
    popupMenu: {
        backgroundColor: "black",
        opacity: 0.2,
    },
};
