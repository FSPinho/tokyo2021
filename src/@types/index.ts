export interface Sport {
    title: string;
    icon: string;
    about: {
        texts: Array<string>;
        image: {
            alt: string;
            url: string;
        };
    };
    schedule: Array<Omit<ScheduleEvent, "sport">>;
}

export interface SportRaw {
    title: string;
    icon: string;
    schedule: Array<Omit<ScheduleEventRaw, "sport">>;
    about: {
        text: Array<string>;
        image: {
            alt: string;
            utl: string;
        };
    };
}

export interface ScheduleEvent {
    sport: Sport;
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
