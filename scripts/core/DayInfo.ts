import { SpecialDayResult } from "services/SpecialDaysService";

/** 
 * @typedef DayInfo
 * @property {number} weekDay
 * @property {string} longName
 * @property {string} shortName
 * @property {Array<string>} specialDay
 */
export type DayInfo = {
    weekDay: number;
    longName: string;
    shortName: string;
    specialDay: SpecialDayResult[]
}