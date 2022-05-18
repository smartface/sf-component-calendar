import { DateObject } from './DateObject';
import { DayInfo } from './DayInfo';
import { DayMonthInfo } from './DayMonthInfo';

/**
 * @typedef {Object} DateInfo
 * @property {Calendar~DateObject} localeDate
 * @property {Calendar~DateObject} date
 * @property {Calendar~DayInfo} dayInfo
 * @property {Calendar~DayMonthInfo} daymonthInfo
 */
export type DateInfo = {
  localeDate: DateObject<string>;
  date: DateObject;
  dayInfo: DayInfo;
  daymonthInfo: DayMonthInfo;
};
