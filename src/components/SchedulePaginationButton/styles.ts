import { styled } from "../../Theme";
import { BaseButton } from "../BaseButton";

export const DayButton = styled(BaseButton)`
    width: ${(p) => p.theme.header.scheduleButtonWidth - p.theme.units.base}px;
    margin: ${(p) => p.theme.units.half}px;
    padding: ${(p) => p.theme.units.half}px;
    border-radius: 24px;
`;
