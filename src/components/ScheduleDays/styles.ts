import { styled } from "../../Theme";
import Animated from "react-native-reanimated";
import { View } from "react-native";

export const HScroll = styled(Animated.ScrollView)`
    flex: 1;
`;

export const Page = styled(View)<{ width: number }>`
    width: ${(p) => p.width}px;
`;
