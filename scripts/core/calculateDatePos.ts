import { WEEKDAYS } from './constants';
/**
 * Calcucalte given day's week and weekday index
 *
 * @param {number} startDayOfMonth
 * @param {number} day
 */
export function calculateDatePos(startDayOfMonth: number, day: number) {
  const start = startDayOfMonth - 1;
  day = day - 1;
  const weekDayIndex = (start + day) % WEEKDAYS;
  const weekIndex = Math.ceil((start + day + 1) / WEEKDAYS) - 1;
  return {
    weekIndex,
    weekDayIndex
  };
}
