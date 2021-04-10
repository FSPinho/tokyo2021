import { styled } from "../../Theme";
import { Box } from "../Box";
import Animated from "react-native-reanimated";

export const Pagination = styled(Box)``;

export const PaginationScroll = styled(Animated.ScrollView)`
    flex: 1;
`;

export const Highlight = styled(Animated.View)`
    position: absolute;
    top: ${(p) => p.theme.units.half}px;
    bottom: ${(p) => p.theme.units.half}px;
    margin-left: ${(p) => p.theme.units.half}px;
    width: ${(p) => p.theme.header.scheduleButtonWidth - p.theme.units.base}px;
    background-color: ${(p) => p.theme.palette.primary.alpha(0.2)};
    border-radius: 18px;
`;
