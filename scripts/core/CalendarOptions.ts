/**
 * @typedef CalendarOptions
 * @property {boolean} [useRangeSelection=true] - Activate range selection
 * @property {Object} [theme=null] - Sets custom theme
 * @property {boolean} [justCurrentDays=false] - To display only the month days
 * @property {boolean} [useContext=true] - To use internal calendar-context
 */

export type CalendarOptions = {
  useRangeSelection?: boolean;
  theme?: Object | null;
  justCurrentDays?: boolean;
  useContext?: boolean;
};
