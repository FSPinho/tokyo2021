export interface Sport {
    title: string;
    icon: string;
    schedule: Array<Omit<ScheduleEvent, "sport">>;
}

export interface SportRaw {
    title: string;
    icon: string;
    schedule: Array<Omit<ScheduleEventRaw, "sport">>;
}

export interface ScheduleEvent {
    sport: Omit<Sport, "schedule">;
    venue: string;
    start: Date;
    end: Date;
    sessions: Array<string>;
}

export interface ScheduleEventRaw extends Omit<ScheduleEvent, "start" | "end"> {
    start: string;
    end: string;
}

export interface ScheduleDay {
    date: Date;
    events: Array<ScheduleEvent>;
}

export interface ScheduleMonth {
    date: Date;
    days: Array<ScheduleDay>;
}

export type SportsRaw = Record<string, Record<string, SportRaw>>;
export type Sports = Record<string, Record<string, Sport>>;
