import {BoxContentAlignment, BoxOrientation, BoxProps} from "./types";
import {styled} from "../../Theme";
import {IDefaultTheme} from "../../Theme/Styled";

const _doMapStyles = (dict: Record<string, unknown[]>, value: unknown): string => {
    for (const style in dict) {
        if (dict.hasOwnProperty(style) && dict[style].indexOf(value) !== -1) {
            return style;
        }
    }

    return "";
};

export const ViewBox = styled.View<BoxProps>`
    ${(props: BoxProps) => {
        const _orientation: BoxOrientation = props.orientation || "row";
        const _contentAlignment: BoxContentAlignment = props.contentAlignment || "top-left";

        const _hAlignProp = _orientation === "column" ? "align-items" : "justify-content";
        const _vAlignProp = _orientation === "row" ? "align-items" : "justify-content";

        const _hAlignValue = _doMapStyles(
            {
                "flex-start": ["top-left", "bottom-left", "left-center"],
                "flex-end": ["top-right", "bottom-right", "right-center"],
                center: ["center", "bottom-center", "top-center"],
            },
            _contentAlignment,
        );

        const _vAlignValue = _doMapStyles(
            {
                "flex-start": ["top-center", "top-left", "top-right"],
                "flex-end": ["bottom-center", "bottom-left", "bottom-right"],
                center: ["center", "left-center", "right-center"],
            },
            _contentAlignment,
        );

        return `
            ${_hAlignProp}: ${_hAlignValue};
            ${_vAlignProp}: ${_vAlignValue};
        `;
    }};

    flex-direction: ${(props: BoxProps) => props.orientation || "row"};

    ${(props: BoxProps) => (props.padding ? `padding: ${props.padding}px;` : "")}
    ${(props: BoxProps) => (props.paddingTop ? `padding-top: ${props.paddingTop}px;` : "")}
    ${(props: BoxProps) => (props.paddingLeft ? `padding-left: ${props.paddingLeft}px;` : "")}
    ${(props: BoxProps) => (props.paddingRight ? `padding-right: ${props.paddingRight}px;` : "")}
    ${(props: BoxProps) => (props.paddingBottom ? `padding-bottom: ${props.paddingBottom}px;` : "")}
    
    ${(props: BoxProps) =>
        props.paddingTopLeft ? `padding-top: ${props.paddingTopLeft}px; padding-left: ${props.paddingTopLeft}px;` : ""}
    ${(props: BoxProps) =>
        props.paddingTopRight
            ? `padding-top: ${props.paddingTopRight}px; padding-right: ${props.paddingTopRight}px;`
            : ""}
    ${(props: BoxProps) =>
        props.paddingBottomLeft
            ? `padding-bottom: ${props.paddingBottomLeft}px; padding-left: ${props.paddingBottomLeft}px;`
            : ""}
    ${(props: BoxProps) =>
        props.paddingBottomRight
            ? `padding-bottom: ${props.paddingBottomRight}px; padding-right: ${props.paddingBottomRight}px;`
            : ""}
    
    ${(props: BoxProps) => (props.margin ? `margin: ${props.margin}px;` : "")}
    ${(props: BoxProps) => (props.marginTop ? `margin-top: ${props.marginTop}px;` : "")}
    ${(props: BoxProps) => (props.marginLeft ? `margin-left: ${props.marginLeft}px;` : "")}
    ${(props: BoxProps) => (props.marginRight ? `margin-right: ${props.marginRight}px;` : "")}
    ${(props: BoxProps) => (props.marginBottom ? `margin-bottom: ${props.marginBottom}px;` : "")}
   
    ${(props: BoxProps) =>
        typeof props.fit === "boolean" ? "flex: 1;" : typeof props.fit === "number" ? `flex: ${props.fit};` : ""}
    
    ${(props: BoxProps) =>
        typeof props.grow === "boolean"
            ? "flex-grow: 1;"
            : typeof props.grow === "number"
            ? `flex-grow: ${props.grow};`
            : ""}
    
    ${(props: BoxProps) =>
        props.fitAbsolute ? "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px;" : ""}
    
    ${(props: BoxProps) => (props.stretch ? "align-items: stretch;" : "")}
    
    ${(props) =>
        props.paper ? `border-radius: ${props.theme.paper.borderRadius}px; elevation: 0; background-color: white;` : ""}
    ${(props) => (props.paperWithoutRoundedCorners ? "elevation: 0; background-color: white;" : "")}
        
    ${(props) => (props.spacerHorizontal ? `width: ${props.spacerHorizontal}px;` : "")}
    ${(props) => (props.spacerVertical ? `height: ${props.spacerVertical}px;` : "")}
    
    ${(props) => (props.elevated ? "elevation: 4;" : "")}
    
    ${(props) =>
        props.backgroundColor
            ? `background-color: ${
                  props.theme.palette[props.backgroundColor as keyof IDefaultTheme.Palette] || props.backgroundColor
              }`
            : ""}
    
    ${(props) => (props.bordered ? "border: black 1px solid;" : "")}
    
    ${(props) => (props.hidden ? "display: none;" : "")}

    ${(props) => (props.circle ? "border-radius: 1920px;" : "")}
`;
