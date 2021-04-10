import React from "react";
import * as S from "./styles";
import { Text } from "../Text";
import { SchedulePaginationProps } from "./types";

export const SchedulePaginationButton: React.FC<SchedulePaginationProps> = ({ title, onPress }) => {
    return (
        <S.DayButton contentAlignment={"center"} onPress={onPress}>
            <Text typography={"body2"} value={title} />
        </S.DayButton>
    );
};
