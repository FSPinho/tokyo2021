import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NativeModules, Platform } from "react-native";

import enUs from "../locales/en-US.json";
import esES from "../locales/es-ES.json";
import { LocaleContextValue } from "./types";
import { Config } from "../../config";
import I18n from "i18n-js";
import { observer } from "mobx-react";
import { GlobalStore, useStore } from "../../stores";
import { autorun } from "mobx";

export const LocaleContext = React.createContext<LocaleContextValue | null>(null);

const normalizeLocales = (value: string): string => {
    if (value.startsWith("es")) {
        return "es-ES";
    }
    return Config.I18N_DEFAULT_LOCALE;
};

const getLanguageByDevice = (): string => {
    if (NativeModules.SettingsManager) {
        return Platform.OS === "ios"
            ? NativeModules.SettingsManager.settings.AppleLocale ||
                  NativeModules.SettingsManager.settings.AppleLanguages[0]
            : NativeModules.I18nManager.localeIdentifier;
    }

    return Config.I18N_DEFAULT_LOCALE;
};

I18n.defaultLocale = Config.I18N_DEFAULT_LOCALE;
I18n.locale = normalizeLocales(getLanguageByDevice());
I18n.fallbacks = true;
I18n.translations = {
    "en-US": enUs,
    "es-ES": esES,
};

I18n.missingTranslation = (scope) => {
    console.warn(`Missing ${I18n.locale} translation value for the key: ${scope}`);
    return null;
};

export const LocaleProvider: React.FC = observer((props) => {
    const [locale, setLocale] = useState<string>(I18n.locale);

    const global = useStore<GlobalStore>("global");
    const i18n = global.i18n;

    const _setLocale = useCallback((language: string): void => {
        const _localeNormalized = normalizeLocales(language);
        I18n.locale = _localeNormalized;
        setLocale(_localeNormalized);
    }, []);

    useEffect(
        () =>
            autorun(() => {
                const language = i18n?.selectedLanguage ? i18n?.selectedLanguage : getLanguageByDevice();

                _setLocale(language);
            }),
        [_setLocale, i18n],
    );

    const value = useMemo<LocaleContextValue>(() => {
        return {
            locale,
            setLocale: (locale: string) => _setLocale(locale),
            translate: (key, translationData): string => {
                return I18n.t(key, translationData ?? undefined);
            },
        };
    }, [_setLocale, locale]);

    return <LocaleContext.Provider value={value} {...props} />;
});
