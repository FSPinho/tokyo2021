/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ViewBox } from "./styles";
import { BoxProps, BoxUnit } from "./types";
import { IDefaultTheme, useTheme } from "../../Theme/Styled";

const unitMap = (theme: IDefaultTheme): Record<BoxUnit, number> => ({
    [BoxUnit.NONE]: theme.units.none,
    [BoxUnit.HALF]: theme.units.half,
    [BoxUnit.BASE]: theme.units.base,
    [BoxUnit.DOUBLE]: theme.units.double,
});

export const Box: React.FC<BoxProps> = ({ children, ...props }) => {
    const theme = useTheme();

    const spacingKeys: (keyof BoxProps)[] = [
        "spacerVertical",
        "spacerHorizontal",
        "padding",
        "paddingTop",
        "paddingLeft",
        "paddingRight",
        "paddingBottom",
        "paddingTopLeft",
        "paddingTopRight",
        "paddingBottomLeft",
        "paddingBottomRight",
        "margin",
        "marginTop",
        "marginLeft",
        "marginRight",
        "marginBottom",
    ];

    spacingKeys.forEach((key) => {
        if (typeof props[key] !== "number") {
            (props[key] as BoxUnit) = BoxUnit.NONE;
        }
        (props[key] as BoxUnit) = unitMap(theme)[props[key] as BoxUnit];
    });

    return <ViewBox {...(props as any)}>{children}</ViewBox>;
};
