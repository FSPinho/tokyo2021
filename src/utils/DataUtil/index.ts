/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScheduleDay, ScheduleEvent, ScheduleMonth, Sports } from "../../@types";
import sportsData from "../../constants/Sports.json";
import moment from "moment";
import dateFormat from "dateformat";

const sports: Sports = sportsData as any;

const getScheduleByDay = (locale: string): Array<ScheduleDay> => {
    const daysMap = {} as Record<string, ScheduleDay>;

    Object.values(sports[locale]).forEach(({ title, icon, schedule }) => {
        schedule.forEach(({ venue, start, end, sessions }) => {
            const event: ScheduleEvent = {
                venue,
                sessions,
                start: moment(start).toDate(),
                end: moment(end).toDate(),
                sport: {
                    title,
                    icon,
                },
            };

            const dayKey = dateFormat(event.start, "yyyy-mm-dd");
            daysMap[dayKey] = {
                date: event.start,
                events: [...(daysMap[dayKey]?.events || []), event],
            };
        });
    });

    return Object.values(daysMap).sort((a, b) => +a.date - +b.date);
};

const getScheduleByMonth = (locale: string): Array<ScheduleMonth> => {
    const monthsMap = {} as Record<string, ScheduleMonth>;

    getScheduleByDay(locale).forEach(({ date, events }) => {
        const monthKey = dateFormat(date, "yyyy-mm");
        monthsMap[monthKey] = {
            date,
            days: [
                ...(monthsMap[monthKey]?.days || []),
                {
                    date,
                    events,
                },
            ],
        };
    });

    return Object.values(monthsMap).sort((a, b) => +a.date - +b.date);
};

export const DataUtil = {
    getScheduleByMonth,
    getScheduleByDay,
};
