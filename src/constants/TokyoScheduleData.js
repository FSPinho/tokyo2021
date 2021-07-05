import RawData from './RawData';
import DateFormat from 'dateformat';

const _clear = s => {
    return s
        .replace(/^\s*/gi, '')
        .replace(/\s*$/gi, '')
        .replace(/(-|\s)+/gi, '_')
        .toLowerCase();
};

const _generateId = (...args) => {
    return args.length === 0
        ? 'NULL'
        : args.length === 1
        ? args[0]
        : args.reduce((a, b) => _clear(a) + '__' + _clear(b));
};

export const SPORTS = [];
Object.keys(RawData.sports).map(k => {
    const _sport = RawData.sports[k];
    SPORTS.push({
        __meta: { id: _sport.id },
        id: _generateId(_sport.name),
        name: { en: _sport.name, pt: '' },
        image: { getResource: () => _sport.image },
        icon: {
            getResource: () =>
                !_sport.icon || _sport.icon.includes('<body')
                    ? null
                    : _sport.icon,
        },
    });
});
export const getSportById = id => SPORTS.filter(s => s.__meta.id === id)[0];

export const DISCIPLINES = [];
Object.keys(RawData.disciplines).map(k => {
    const _discipline = RawData.disciplines[k];
    DISCIPLINES.push({
        __meta: { id: _discipline.id },
        id: _generateId(
            getSportById(_discipline.sport).name.en,
            _discipline.name,
        ),
        name: { en: _discipline.name, pt: '' },
        image: { getResource: () => _discipline.image },
        icon: {
            getResource: () =>
                !_discipline.icon || _discipline.icon.includes('<body')
                    ? null
                    : _discipline.icon,
        },
        sport: getSportById(_discipline.sport),
    });
});
export const getDisciplineById = id =>
    DISCIPLINES.filter(d => d.__meta.id === id)[0];

const _SCHEDULE = [];
const _eventsMetaData = {
    serialId: 0,
    eventsMap: {},
};
Object.keys(RawData.events).map(k => {
    const _eventDay = RawData.events[k];
    _eventDay.map(_event => {
        const _dateStart = new Date(_event.date_start.replace('+0900', ''));
        const _dateEnd = new Date(_event.date_end.replace('+0900', ''));

        _dateStart.setHours(_dateStart.getHours() - 9);
        _dateEnd.setHours(_dateEnd.getHours() - 9);

        const _dayKey = DateFormat(_dateStart, 'dd-mm');
        const _hourKey = DateFormat(_dateStart, 'dd-mm-HH-MM');

        if (!_eventsMetaData.eventsMap[_dayKey]) {
            _eventsMetaData.eventsMap[_dayKey] = {
                date: _dateStart,
                events: {},
            };
        }

        if (!_eventsMetaData.eventsMap[_dayKey].events[_hourKey]) {
            _eventsMetaData.eventsMap[_dayKey].events[_hourKey] = {
                date: _dateStart,
                events: [],
            };
        }

        _eventsMetaData.eventsMap[_dayKey].events[_hourKey].events.push({
            __meta: {
                id: _eventsMetaData.serialId++,
            },
            id: _generateId(
                getSportById(_event.sport).name.en,
                getDisciplineById(_event.discipline)
                    ? getDisciplineById(_event.discipline).name.en
                    : 'NULL',
                _event.name,
                _event.venue,
                _hourKey,
            ),
            name: _event.name,
            contents: _event.contents,
            venue: _event.venue,
            type: _event.type,
            sport: getSportById(_event.sport),
            discipline: getDisciplineById(_event.discipline),
            schedule: {
                variable: !_event.date_start,
                start: _dateStart,
                end: _dateEnd,
            },
        });
    });
});

Object.keys(_eventsMetaData.eventsMap).map(key => {
    const _day = _eventsMetaData.eventsMap[key];
    const _eventDay = {
        date: _day.date,
        events: [],
    };
    Object.keys(_day.events).map(hourKey => {
        const _hour = _day.events[hourKey];
        _hour.events.sort((e1, e2) => +e1.schedule.start - +e2.schedule.start);
        _eventDay.events.push({
            date: _hour.date,
            events: _hour.events,
        });
    });
    _eventDay.events.sort((e1, e2) => +e1.date - +e2.date);
    _SCHEDULE.push(_eventDay);
});

_SCHEDULE.sort((e1, e2) => +e1.date - +e2.date);

export const SCHEDULE = _SCHEDULE;

export default {
    Sports: SPORTS,
};
