import { Store, StoreKey } from "../types";

export type Stores = Record<StoreKey, Store>;

export interface StoreContextValue {
    stores: Stores;
    clear: (...keys: StoreKey[]) => Promise<void>;
}
