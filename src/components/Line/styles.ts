import { View } from "react-native";
import { styled } from "../../Theme";

export const HLine = styled(View)`
    width: 100%;
    height: 1px;

    background-color: ${(props) => props.theme.palette.backgroundLightGrey.alpha(0.8)};
`;

export const VLine = styled(View)`
    width: 1px;
    height: 100%;

    background-color: ${(props) => props.theme.palette.backgroundLightGrey.alpha(0.8)};
`;
