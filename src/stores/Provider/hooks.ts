import { useContext } from "react";
import { Store, StoreKey } from "../types";
import { StoreContextValue, Stores } from "./types";
import { StoreContext } from "./index";

/**
 * Hook to access any store from anywhere in the code.
 * Usage example:
 *      const globalStore = useStore("store-global");
 * */
export const useStore = <T extends Store = Store>(key: StoreKey): T => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error("Can't find a StoreContext, you should wrap App with a StoreProvider.");
    }

    return context.stores[key] as T;
};

export const useStores = (): Stores => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error("Can't find a StoreContext, you should wrap App with a StoreProvider.");
    }

    return context.stores;
};

export const useStoreContext = (): StoreContextValue => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error("Can't find a StoreContext, you should wrap App with a StoreProvider.");
    }

    return context;
};
