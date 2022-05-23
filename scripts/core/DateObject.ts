/**
 * @typedef {Object} DateObject
 * @property {number} day
 * @property {number} month
 * @property {number} year
 */
export type DateObject<T extends string | number = number> = {
  day: T;
  month: T;
  year: T;
};
