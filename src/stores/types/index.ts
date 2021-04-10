export type StoreKey = "global";

/**
 * RealmUtil objects are used to save global information,
 * module states and screen specific flows. Each store
 * should have its own unique key.
 * */
export interface Store {
    /**
     * Unique identifier for the store. It will be used to save
     * and restore the store object from the local storage.
     * */
    key: StoreKey;

    /**
     * Same version of Config.APP_VERSION, also used during store
     * restore to handle possible incompatibilities.
     * */
    version: string;
}

export type StoreInitializer<T extends Store = Store> = (restoredStore: T | null) => T;
