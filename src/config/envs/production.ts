import { EnvironmentConfig } from "../types";
import { StoreInitializer, StoreKey } from "../../stores";

export const ProductionConfig: EnvironmentConfig = {
    I18N_DEFAULT_LOCALE: "en-US",
    STORE_INITIALIZERS: {} as Record<StoreKey, StoreInitializer>,
};
