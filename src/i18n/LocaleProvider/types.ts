export interface LocaleContextValue {
    locale: string;
    setLocale: (locale: string) => void;
    translate: (translation: string, translationData?: Record<string, string | number> | null) => string;
}
