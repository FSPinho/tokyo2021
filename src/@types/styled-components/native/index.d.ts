import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
    export namespace DefaultTheme {
        export interface Palette {
            primary: string;
            primaryDark: string;
            primaryLight: string;
            primaryText: string;
            primaryRipple: string;
            accent: string;
            accentText: string;
            accentRipple: string;

            backgroundLight: string;
            backgroundLightText: string;
            backgroundLightTextSecondary: string;
            backgroundLightTextTertiary: string;
            backgroundLightRipple: string;
            backgroundLightGrey: string;
            backgroundLightGreySecondary: string;
            backgroundLightGreyText: string;
            backgroundLightGreyRipple: string;
        }

        export interface Units {
            none: number;
            half: number;
            base: number;
            double: number;
        }

        export interface HeaderOptions {
            height: number;
            scheduleButtonWidth: number;
        }

        export interface SplashScreenOptions {
            delay: number;
        }

        export interface ButtonOptions {
            borderRadius: number;
            floatingActionButtonSize: number;
        }

        export interface PaperOptions {
            borderRadius: number;
            elevation: number;
        }

        /**
         * Reverse is the value used for collapsible elements,
         * where the collapse animation can be faster than the
         * expand animation.
         * */
        export interface TransitionDurationOptions {
            /**
             * Elements with small area transitions.
             * */
            small: number;
            smallReverse: number;

            /**
             * Elements with larger area transitions.
             * */
            medium: number;
            mediumReverse: number;

            /**
             * Elements with large movements on the screen.
             * */
            large: number;
            largeReverse: number;
        }

        export interface TransitionEasingOptions {
            bezier: number[];
        }

        export interface TransitionOptions {
            duration: TransitionDurationOptions;
            easing: TransitionEasingOptions;
        }

        export interface PopupMenuOptions {
            /** Backdrop color */
            backgroundColor: string;

            /** Backdrop opacity */
            opacity: number;
        }
    }

    export interface DefaultTheme {
        palette: DefaultTheme.Palette;
        units: DefaultTheme.Units;
        header: DefaultTheme.HeaderOptions;
        splashScreen: DefaultTheme.SplashScreenOptions;
        button: DefaultTheme.ButtonOptions;
        paper: DefaultTheme.PaperOptions;
        transition: DefaultTheme.TransitionOptions;
        popupMenu: DefaultTheme.PopupMenuOptions;
    }
}
