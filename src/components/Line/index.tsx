import React from "react";
import * as S from "./styles";
import { LineProps } from "./types";

export const Line: React.FC<LineProps> = ({ vertical }) => {
    return !!vertical ? <S.VLine /> : <S.HLine />;
};
