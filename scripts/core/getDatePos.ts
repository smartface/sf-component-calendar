import { DateObject } from "./DateObject";
import { CalendarPage } from "../services/CalendarService";
import { calculateDatePos } from "./calculateDatePos";
import { calculateDatePosinPrev } from "./calculateDatePosinPrev";
import { calculateDatePosinNext } from "./calculateDatePosinNext";

/**
 * Calculates week and weekday indexes in the month
 * 
 * @param {object} date
 * @param {object} month
 * @param {object} notValue
 * @returns {({weekIndex:number, weekDayIndex:number}|*)}
 */
export function getDatePos(date: DateObject, month: CalendarPage, notValue: {
    weekIndex: number;
    weekDayIndex: number;
} = null) {
    const monthPos = (date.month === month.date.month && 'current') ||
        (date.month === month.nextMonth.date.month && 'next') ||
        (date.month === month.previousMonth.date.month && 'prev');

    switch (monthPos) {
        case 'current':
            return calculateDatePos(month.startDayOfMonth, date.day);
        case 'prev':
            return calculateDatePosinPrev(
                month.startDayOfMonth,
                month.previousMonth.daysCount,
                date.day
            );
        case 'next':
            const posNext = calculateDatePosinNext(
                month.startDayOfMonth,
                month.daysCount,
                date.day
            );

            return posNext;

        default:
            return notValue;
    }
}