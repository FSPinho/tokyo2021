import dateFormat from "dateformat";
import { parse } from "@typescript-eslint/parser";

const timezones = {} as Record<string, string>;
timezones["-12"] = "(GMT -12:00) Eniwetok, Kwajalein";
timezones["-11"] = "(GMT -11:00) Midway Island, Samoa";
timezones["-10"] = "(GMT -10:00) Hawaii";
timezones["-9"] = "(GMT -9:00) Alaska";
timezones["-8"] = "(GMT -8:00) Pacific Time (US &amp; Canada)";
timezones["-7"] = "(GMT -7:00) Mountain Time (US &amp; Canada)";
timezones["-6"] = "(GMT -6:00) Central Time (US &amp; Canada), Mexico City";
timezones["-5"] = "(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima";
timezones["-4"] = "(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz";
timezones["-3.5"] = "(GMT -3:30) Newfoundland";
timezones["-3"] = "(GMT -3:00) Brazil, Buenos Aires, Georgetown";
timezones["-2"] = "(GMT -2:00) Mid-Atlantic";
timezones["-1"] = "(GMT -1:00 hour) Azores, Cape Verde Islands";
timezones["0"] = "(GMT) Western Europe Time, London, Lisbon, Casablanca";
timezones["1"] = "(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris";
timezones["2"] = "(GMT +2:00) Kaliningrad, South Africa";
timezones["3"] = "(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg";
timezones["3.5"] = "(GMT +3:30) Tehran";
timezones["4"] = "(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi";
timezones["4.5"] = "(GMT +4:30) Kabul";
timezones["5"] = "(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent";
timezones["5.5"] = "(GMT +5:30) Bombay, Calcutta, Madras, New Delhi";
timezones["6"] = "(GMT +6:00) Almaty, Dhaka, Colombo";
timezones["7"] = "(GMT +7:00) Bangkok, Hanoi, Jakarta";
timezones["8"] = "(GMT +8:00) Beijing, Perth, Singapore, Hong Kong";
timezones["9"] = "(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk";
timezones["9.5"] = "(GMT +9:30) Adelaide, Darwin";
timezones["10"] = "(GMT +10:00) Eastern Australia, Guam, Vladivostok";
timezones["11"] = "(GMT +11:00) Magadan, Solomon Islands, New Caledonia";
timezones["12"] = "(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka";

const getTimezone = (date: Date): string | null => {
    const tz = String(parseInt(dateFormat(date, "o")) / 100).replace(".3", ".5");
    return timezones[parseInt(tz)] || null;
};

export const TimezoneUtil = {
    getTimezone,
};
