import { Store } from "../../types";

export interface GlobalStore extends Store {
    i18n: GlobalStore.I18n;
}

export namespace GlobalStore {
    export interface I18n {
        selectedLanguage: string | null;
        setLanguage(value: string): void;
    }
}
