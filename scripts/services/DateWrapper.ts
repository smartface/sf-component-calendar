import { Moment, isMoment, } from "moment";
import moment = require("moment");
import { DateObject } from "../core/DateObject";
import { instanceofDateObject } from "./instanceofDateObject";

function notValidDateThrowanError(date: Moment, strDate: string) {
    if (!date.isValid()) {
        throw new Error(`[${strDate}] Specified date is not valid.`);
    }
}

function sortDays(days) {
    return (num) => days[num]
}

export interface iDateService {
    
}
export default class DateService<T extends Moment = Moment> {
    protected _date: T;
    protected daysMap: any[];
    protected _lang: string = "en";

    constructor(protected _moment: typeof moment, date: T | DateObject) {
        this.setDate(date, "DD-MM-YYYY");
        const firstDay = this.firstDayOfWeek();
        this.daysMap = [0, 1, 2, 3, 4, 5, 6].reduce((acc, num, index) => {
            if (index >= firstDay) {
                acc[index - firstDay] = num;
            } else {
                acc[7 - firstDay + index] = num;
            }

            return acc;
        }, []);
    }

    private setDate(date: DateObject | T | undefined, format = "DD-MM-YYYY") {
        if (isMoment(date)) {
            this._date = date.clone() as T;
        } else {
            let dateStr: string;
            if (date === undefined) {
                this._date = moment() as T;
            } else if (instanceofDateObject(date)) {
                date.day = date.day || 1;
                this._date = moment(`${date.day}-${date.month}-${date.year}`, format) as T;
                // this._date = moment(date, format) as T;
                notValidDateThrowanError(this._date, `${date.day}-${date.month}-${date.year}`);
            } else {
                throw new Error("Invalid date object");
            }
        }
    }

    weekOfYear() {
        return this._date.weeks();
    }

    clone(): T {
        return this._date.clone() as T;
    }

    localeDate() {
        var now = this._date.clone();
        const localeDate = { day: now.format("D"), month: now.format("M"), year: now.format("YYYY") };
        return {
            setDay(day) {
                localeDate.day = now.month(0).date(day).format("D");
                return this;
            },
            setMonth(month) {
                localeDate.month = now.month(month).format("M");
                return this;
            },
            setYear(year) {
                localeDate.year = now.year(year).format("YYYY");
                return this
            },
            getDate() {
                return { ...localeDate };
            }
        }
        // return this._date.format("D-M-YYYY").toObject();
    }

    nextDay() {
        var newdate = this._date.clone()
        newdate.add(1, 'day');
        return new DateService(this._moment, newdate);
    }

    prevDay() {
        var newdate = this._date.clone();
        newdate.subtract(1, 'day');
        return new DateService(this._moment, newdate);
    }

    fromDay(day) {
        var newdate = this._date.clone().date(day);
        return new DateService(this._moment, newdate);
    }

    month() {
        return this._date.format("M");;
    }

    year() {
        return this._date.format("YYYY");
    }

    day() {
        return this._date.format("D");
    }

    startDayOfMonth() {
        return this._date.clone().date(1).weekday() + 1;
    }

    monthsShort() {
        return this._moment.monthsShort();
    }

    monthShort() {
        return this._moment.monthsShort(this._date.month());
    }

    monthLong() {
        return this._moment.months(this._date.month());
    }

    monthsLong() {
        return this._moment.months();
    }

    weekdaysShort() {
        return this.daysMap.map(sortDays(this._moment.localeData().weekdaysShort()));
    }

    weekdaysMin() {
        return this.daysMap.map(sortDays(this._moment.localeData().weekdaysMin()));
    }

    weekdaysLong(): string[] {
        return this.daysMap.map(sortDays(this._moment.localeData().weekdays()));
    }

    firstDayOfWeek() {
        return this._moment.localeData().firstDayOfWeek();
    }

    daysCount() {
        return this._date.daysInMonth();
    }

    nextMonth() {
        var newdate = this._date.clone()
        newdate.add(1, 'month');
        return new DateService(this._moment, newdate)
    }

    prevMonth() {
        var newdate = this._date.clone();
        newdate.subtract(1, 'month');
        return new DateService(this._moment, newdate);
    }

    prevYear() { }

    nextYear() { }

    isWeekend(day) {
        const wd = this._date.clone().date(day).day();

        return wd === 0 || wd === 6;
    }

    setDateLang(lang = "en") {
        this._lang = lang;
        this._moment.updateLocale(lang, null);
    }

    toObject(): DateObject {
        var dateObject = this._date.toObject();
        return {
            year: dateObject.years,
            day: dateObject.date,
            month: ++dateObject.months
        };
    }

    toNormalizedObject(): DateObject & {lang: string, calendar: string} {
        var dateObject = this._date.toObject();

        return {
            year: dateObject.years,
            day: dateObject.date,
            month: ++dateObject.months,
            calendar: "gregorian",
            lang: this._lang
        };
    }
    
    dispose() {
        this._date = null;
        this._moment = null;
    }
}
