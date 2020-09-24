import { DateObject } from "../core/DateObject";
export function instanceofDateObject(date: Object): date is DateObject {
    return date.hasOwnProperty("year")
        && typeof date['year'] === 'number'
        && date.hasOwnProperty("month")
        && typeof date['month'] === 'number'
        && date.hasOwnProperty("day")
        && typeof date['day'] === 'number';
}
