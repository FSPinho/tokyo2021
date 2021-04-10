import { styled } from "../../Theme";
import React from "react";
import { FlatListProps } from "react-native";
import { ScheduleEvent } from "../../@types";

export const List = styled.FlatList`
    flex: 1;
` as React.FC<FlatListProps<ScheduleEvent>>;
