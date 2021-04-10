import { ProductionConfig } from "./production";
import { DevelopmentConfig } from "./development";

let _config = ProductionConfig;

if (__DEV__ || process.env.DEVELOPMENT === "true" || process.env.DEV === "true") {
    _config = { ..._config, ...DevelopmentConfig };
}

/**
 * Require local config only if exists.
 * Note: the require should be done in
 * that way in order to avoid react
 * native server to complain about
 * the missing module.
 * */
const localPackageName = "./local";
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    _config = { ..._config, ...require(localPackageName).LocalConfig };
} catch (_) {}

export const Config = _config;
