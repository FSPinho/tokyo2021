import { ViewProps } from "react-native";
import { DefaultTheme } from "styled-components";

export type BoxContentAlignment =
    | "center"
    | "bottom-center"
    | "top-center"
    | "left-center"
    | "right-center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

export type BoxOrientation = "row" | "column";

export enum BoxUnit {
    NONE = 1,
    HALF = 2,
    BASE = 3,
    DOUBLE = 4,
}

export interface BoxProps extends ViewProps {
    /**
     * Sets the content items alignment.
     * Default is top-left.
     * */
    contentAlignment?: BoxContentAlignment;

    /**
     * Sets the content distribution orientation.
     * Default is row.
     * */
    orientation?: BoxOrientation;

    /**
     * General spacing.
     * Default is Unit.Base.
     * TODO: Move it to a theme.
     * */
    padding?: BoxUnit;
    paddingTop?: BoxUnit;
    paddingLeft?: BoxUnit;
    paddingRight?: BoxUnit;
    paddingBottom?: BoxUnit;
    paddingTopLeft?: BoxUnit;
    paddingTopRight?: BoxUnit;
    paddingBottomLeft?: BoxUnit;
    paddingBottomRight?: BoxUnit;

    margin?: BoxUnit;
    marginTop?: BoxUnit;
    marginLeft?: BoxUnit;
    marginRight?: BoxUnit;
    marginBottom?: BoxUnit;

    spacerHorizontal?: BoxUnit;
    spacerVertical?: BoxUnit;

    /**
     * Whether true, will attribute "flex: 1" to the box.
     * */
    fit?: boolean | number;

    /**
     * Whether true, will attribute "flex-grow: 1" to the box.
     * */
    grow?: boolean | number;

    /**
     * Whether true, will fit the box to parent using absolute position.
     * */
    fitAbsolute?: boolean;

    /**
     * Whether true, will stretch the content using "alignItems: stretch"
     * */
    stretch?: boolean;

    /**
     * Whether the box should have a paper appearance.
     * */
    paper?: boolean;
    paperWithoutRoundedCorners?: boolean;

    /**
     * Whether should have circle borders.
     * */
    circle?: boolean;

    /**
     * Whether box should have a back shadow.
     * */
    elevated?: boolean;

    /**
     * Sets the background color value.
     * */
    backgroundColor?: keyof DefaultTheme.Palette | string;

    /**
     * Applies black border on the box.
     * Currently used for dev purposes.
     * */
    bordered?: boolean;

    /**
     * Applies a display none to the box.
     * */
    hidden?: boolean;
}
