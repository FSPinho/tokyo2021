/* eslint-disable @typescript-eslint/no-explicit-any */

import { StoreInitializer, StoreKey } from "../stores";

export interface EnvironmentConfig {
    I18N_DEFAULT_LOCALE: string;
    STORE_INITIALIZERS: Record<StoreKey, StoreInitializer<any>>;
}
