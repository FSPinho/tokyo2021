/* eslint-disable @typescript-eslint/no-explicit-any */
export type TranslatorFunction = (
    translation: string,
    translationData?: Record<string, string | number> | null,
) => string;
