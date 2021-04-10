import { useContext, useMemo } from "react";
import { LocaleContextValue } from "./LocaleProvider/types";
import { LocaleContext } from "./LocaleProvider";
import { TranslatorFunction } from "./types";

export const useLocale = (): LocaleContextValue => {
    const locale = useContext(LocaleContext);

    if (!locale) {
        throw new Error("You should wrap all elements inside a LocaleProvider.");
    }

    return locale;
};

export const useTranslator = (): TranslatorFunction => {
    const locale = useLocale();
    return locale.translate;
};

export const useTranslation = (
    translation?: string | null,
    translationData?: Record<string, string | number> | null,
): string | null | undefined => {
    const locale = useLocale();

    return useMemo<string | null | undefined>(() => {
        return translation ? locale.translate(translation, translationData) : translation;
    }, [locale, translation, translationData]);
};
