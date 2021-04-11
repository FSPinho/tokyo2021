import { ScheduleEvent } from "../../@types";

export interface ScheduleCardProps {
    event: ScheduleEvent;
    onPress(): void;
}
