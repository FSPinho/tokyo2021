import { styled } from "../../Theme";
import React from "react";
import { FlatListProps, ScrollView } from "react-native";
import { ScheduleEvent } from "../../@types";
import { SvgCss } from "react-native-svg";
import { Box } from "../Box";

export const List = styled.FlatList`
    flex: 1;
` as React.FC<FlatListProps<ScheduleEvent>>;

export const SportIcon = styled(SvgCss)`
    width: 36px;
    height: 36px;
`;

export const ModalScrollWrapper = styled(Box)`
    overflow: hidden;
    elevation: 40;
`;

export const ModalScroll = styled(ScrollView)`
    flex: 1;
`;
