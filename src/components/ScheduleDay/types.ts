import { ScheduleDay } from "../../@types";

export interface ScheduleDayProps {
    day: ScheduleDay;
}

export interface ScheduleDayRef {
    focus(): void;
    blur(): void;
}