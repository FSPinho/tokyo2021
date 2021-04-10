import { observable } from "mobx";
import { StoreInitializer } from "../../types";
import { GlobalStore } from "./types";
import { Config } from "../../../config";

/**
 * StoreGlobal initializer, used to create or restore
 * the global store.
 * */
export const storeGlobalInitializer: StoreInitializer<GlobalStore> = (
    restoredStore: GlobalStore | null,
): GlobalStore => {
    const store: GlobalStore = {
        key: "global",
        version: Config.APP_VERSION,

        i18n: {
            selectedLanguage: null,
            /**
             * Use to set a new language for the app
             * */
            setLanguage(value: string) {
                this.selectedLanguage = value;
            },
        },
    };

    /**
     * Restoring the previous store state.
     * */
    if (restoredStore) {
        if (restoredStore.i18n) {
            if (restoredStore.i18n.selectedLanguage) {
                store.i18n.selectedLanguage = restoredStore.i18n.selectedLanguage;
            }
        }
    }

    return observable(store);
};

Config.STORE_INITIALIZERS["global"] = storeGlobalInitializer;
