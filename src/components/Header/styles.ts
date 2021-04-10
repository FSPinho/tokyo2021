import { styled } from "../../Theme";
import { Box } from "../Box";
import { Image } from "react-native";

export const Header = styled(Box)`
    height: ${(p) => p.theme.header.height}px;
    background-color: ${(p) => p.theme.palette.backgroundLight};
`;

export const Flag = styled(Image)`
    border-radius: 4px;
    width: 30px;
    height: 20px;

    border-color: black;
    border-width: 1px;
`;
