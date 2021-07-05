/**
 * @format
 * @flow
 */
import Palette from './Palette';

const themePalette = {
    primary: Palette.DeepPurple,
    primaryText: Palette.DeepPurple500Text,
    primaryTextPrimary: Palette.DeepPurple500TextPrimary,
    primaryTextSecondary: Palette.DeepPurple500TextSecondary,
    primaryTextDisabled: Palette.DeepPurple500TextDisabled,

    accent: Palette.DeepOrange,
    accentText: Palette.DeepOrange500Text,
    accentTextPrimary: Palette.DeepOrange500TextPrimary,
    accentTextSecondary: Palette.DeepOrange500TextSecondary,
    accentTextDisabled: Palette.DeepOrange500TextDisabled,

    backgroundPrimary: Palette.White,
    backgroundPrimaryText: Palette.WhiteText,
    backgroundPrimaryTextPrimary: Palette.WhiteTextPrimary,
    backgroundPrimaryTextSecondary: Palette.WhiteTextSecondary,
    backgroundPrimaryTextDisabled: Palette.WhiteTextDisabled,

    backgroundSecondary: Palette.Indigo50,
    backgroundSecondaryText: Palette.Indigo50Text,
    backgroundSecondaryTextPrimary: Palette.Indigo50TextPrimary,
    backgroundSecondaryTextSecondary: Palette.Indigo50TextSecondary,
    backgroundSecondaryTextDisabled: Palette.Indigo50TextDisabled,

    error: Palette.Red400,

    gold: Palette.Amber600,
};

export type ThemePalette = $ReadOnly<typeof themePalette>;

const themeMetrics = {
    spacing: 8,
    borderRadius: 16,
};

export type ThemeMetrics = $ReadOnly<typeof themeMetrics>;

const theme = {
    palette: (themePalette: ThemePalette),
    metrics: (themeMetrics: ThemeMetrics),
};

export type Theme = $ReadOnly<typeof theme>;

export default (theme: Theme);
