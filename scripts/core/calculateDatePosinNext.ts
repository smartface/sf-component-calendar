import { ROWCOUNT, WEEKDAYS } from './constants';
export function calculateDatePosinNext(startDayOfCurrentMonth: number, daysCountofCurrentMonth: number, day: number) {
  const start = daysCountofCurrentMonth - 1 + startDayOfCurrentMonth;
  const weekDayIndex = (start + day - 1) % WEEKDAYS;
  const weekIndex = Math.round((start + day + 1) / WEEKDAYS) - 1;
  return {
    weekIndex: weekIndex > ROWCOUNT ? -2 : weekIndex,
    weekDayIndex: weekIndex > ROWCOUNT ? -2 : weekDayIndex
  };
}
