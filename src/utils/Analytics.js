/**
 * @flow
 */

import analytics from '@react-native-firebase/analytics';

export type AnalyticsEvent =
    | 'to_toggle_like'
    | 'to_agenda_forward_day'
    | 'to_agenda_backward_day'
    | 'to_agenda_open_calendar';

export type AnalyticsScreen =
    | 'to_schedule'
    | 'to_sports'
    | 'to_sport_detail'
    | 'to_liked'
    | 'to_ranking';

export type AnalyticsEventProperty = 'sport_name' | 'discipline_name';

export default {
    doSendEvent: async (
        event: AnalyticsEvent,
        properties?: ?{ [AnalyticsEventProperty]: string },
    ) => {
        await analytics().logEvent(event, properties);
    },
    doSetScreen: async (screen: AnalyticsScreen) => {
        await analytics().setCurrentScreen(screen, screen);
    },
};
