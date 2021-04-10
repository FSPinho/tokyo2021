/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars */

import AsyncStorage from "@react-native-community/async-storage";
import lodash from "lodash";
import { autorun, configure, toJS } from "mobx";
import React, { useEffect, useMemo, useState } from "react";
import { StoreContextValue, Stores } from "./types";
import { Store, StoreKey } from "../types";
import { Config } from "../../config";
import { StoreFlipper } from "../flipper";

export const StoreContext = React.createContext<StoreContextValue | null>(null);

const _getStoreStoragePath = (store: StoreKey): string => `store/${store}`;

const _checkStoreObjects = (storeKey: StoreKey, obj: any): void => {
    if (obj) {
        if (typeof obj.forEach === "function") {
            return obj.forEach(_checkStoreObjects);
        } else if (typeof obj === "object") {
            if (typeof obj.objectSchema === "function") {
                throw new Error(
                    `You're trying to save a Realm object directly on the store "${storeKey}". Use plain objects instead.`,
                );
            } else {
                for (const value of Object.values(obj)) {
                    _checkStoreObjects(storeKey, value);
                }
            }
        }
    }
};

const _loadStores = async (...resetKeys: StoreKey[]): Promise<Stores> => {
    /**
     * The map of stores.
     * */
    const stores: Stores = {} as Stores;

    /**
     * Clearing the given store keys.
     * */
    for (const storeKey of resetKeys) {
        await AsyncStorage.removeItem(_getStoreStoragePath(storeKey));
    }

    /**
     * For each registered store.
     * */
    for (const storeKey of Object.keys(Config.STORE_INITIALIZERS) as StoreKey[]) {
        let restoredStore: Store | null = null;
        const storeStoragePath = _getStoreStoragePath(storeKey);

        /**
         * Let's try to restore it from the local storage.
         * */
        try {
            restoredStore = JSON.parse((await AsyncStorage.getItem(storeStoragePath)) || "") as Store;
        } catch (error) {}

        /**
         * Then we call the initializer providing the restored data.
         * */
        stores[storeKey] = Config.STORE_INITIALIZERS[storeKey](restoredStore);
    }

    return stores;
};

/**
 * Provides all stores via context for all components.
 * */
export const StoreProvider: React.FC = ({ children }) => {
    const [stores, setStores] = useState<Stores | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setStores(await _loadStores());
            } catch (error) {
                console.log(`Can't load stores: ${error.message}`);
            }
        })();
    }, []);

    useEffect(() => {
        /**
         * The "autorun" function will catch all store changes, and
         * will update it back to the local storage.
         * */
        const unbind = Object.values(stores || {}).map((store) => {
            const _updateStoreFile = lodash.debounce(async (store: Store): Promise<void> => {
                try {
                    _checkStoreObjects(store.key, store);
                    await AsyncStorage.setItem(_getStoreStoragePath(store.key), JSON.stringify(store));
                } catch (error) {
                    console.log(`Unable to save ${store.key}:`, error.message);
                }
            }, 600);

            return autorun(() => {
                _updateStoreFile(toJS(store));
            });
        });

        return () => {
            unbind.forEach((u) => u());
        };
    }, [stores]);

    const value = useMemo(() => {
        return {
            stores,
            clear: async (...keys) => {
                setStores(await _loadStores(...keys));
            },
        } as StoreContextValue;
    }, [stores]);

    /**
     * While the stores aren't initialized, we should avoid rendering the children.
     * It should be faster enough to happen before the splash screen goes away.
     * */
    return stores ? (
        <StoreContext.Provider value={value}>
            <StoreFlipper storeContext={value}>{children}</StoreFlipper>
        </StoreContext.Provider>
    ) : null;
};

/**
 * Avoiding mobx to require actions
 * to change store values.
 * */
configure({
    enforceActions: "never",
});
