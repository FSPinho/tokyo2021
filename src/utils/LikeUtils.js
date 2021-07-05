/**
 * @flow
 */

import type { Event } from '../constants/TokyoScheduleData';
import { Analytics } from '.';
import AsyncStorage from '@react-native-community/async-storage';

export type LikedMap = {
    [id: string]: boolean,
};

export interface LikedChangeListener {
    onLikedChange: LikedMap => void;
}

let _listeners: Array<LikedChangeListener> = [];

const getLikedMap = async (): Promise<?LikedMap> => {
    try {
        return JSON.parse(await AsyncStorage.getItem('@liked'));
    } catch (error) {
        console.log("Can't get liked events:", error);
    }

    return null;
};

const setLikedMap = async (map: LikedMap): Promise<void> => {
    try {
        await AsyncStorage.setItem('@liked', JSON.stringify(map));
        _listeners.map((l: LikedChangeListener) => l.onLikedChange(map));
    } catch (error) {
        console.log("Can't get liked events:", error);
    }
};

const toggleLiked = async (event: Event): Promise<void> => {
    Analytics.doSendEvent('to_toggle_like');

    const map = (await getLikedMap()) || {};
    if (map[event.id]) {
        delete map[event.id];
    } else {
        map[event.id] = true;
    }
    await setLikedMap(map);
};

export default {
    getLikedMap,
    setLikedMap,
    toggleLiked,
    addListener: (listener: LikedChangeListener): any =>
        _listeners.push(listener),
    removeListener: (listener: LikedChangeListener): any =>
        _listeners.splice(_listeners.indexOf(listener), 1),
};
