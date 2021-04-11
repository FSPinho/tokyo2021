import { Sport } from "../../@types";

export interface ScheduleDayModalRef {
    focus(sport: Sport): void;
    blur(): void;
}
