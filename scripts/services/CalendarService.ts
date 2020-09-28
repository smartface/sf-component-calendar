import DateService from "./DateWrapper";
import DateServiceHijri, { MomentHijri } from "./DateWrapperHijri";
import createSpecialDaysService, { SpecialDays, SpecialDaysData, SpecialDaysService } from "./SpecialDaysService";
import * as moment from "moment";
import 'moment/locale/ar-sa';
import momentHijri from "moment-hijri";
import { DateObject } from "../core/DateObject";
import { CalendarDayType } from "./CalendarDayType";

type currentMonth = DateService;
export type CalendarPageInnerMonth = {
    longName: string,
    shortName: string,
    daysCount: number,
    date: DateObject,
    normalizedDate: DateObject,
    localeDate: DateObject<string>,
};
export type CalendarPage = {
    longName: string,
    shortName: string,
    daysCount: number,
    startDayOfMonth: number,
    daysLong: string[],
    daysShort: string[],
    daysMin: string[],
    days: CalendarDayType[][],
    date: DateObject,
    localeDate: DateObject<string>,
    normalizedDate: DateObject,
    previousMonth: CalendarPageInnerMonth,
    nextMonth: CalendarPageInnerMonth
}

export type CalendarService = {
    getCalendarMonth: (date?: DateObject) => CalendarPage;
    getMonth: any;
};
/**
 * Creates a service by specified parameters
 * 
 * @param {string} lang - Calendar language
 * @param {string} type - Calendar type
 * @param {Object} specialDays - Special days data
 * @param {integer} dow - Day of week
 * 
 * @returns {Object}
 */
export default function buildCalendarService({ lang = "en", type = "gregorian", specialDays = null, firstDayOfWeek = 0 }: { lang: string, type: string, specialDays: SpecialDaysData, firstDayOfWeek: number }): CalendarService {
    let service: typeof DateService | typeof DateServiceHijri;

    let current: typeof moment;
    service = DateService;
    current = moment;

    switch (type) {
        case 'hijri':
            service = DateServiceHijri;
            current = momentHijri;

            break;
    }

    current.locale(lang);
    const weekdays = current.localeData().weekdays();

    current.updateLocale(lang, {
        week: {
            dow: firstDayOfWeek,
            doy: 6
        }
    });

    const specialDaysService = createSpecialDaysService(specialDays);

    return {
		/**
		 * Returns current calendar month data
		 */
        getCalendarMonth: (date: DateObject) => getCalendarMonth(
            new service(current, date),
            (args: Parameters<ReturnType<typeof createSpecialDaysService>['getSpecialDay']>['0']) => {
                args.lang = lang;
                args.calendar = type;
                return specialDaysService.getSpecialDay(args);
            }),
		/**
		 * Returns current month data
		 */
        getMonth: (date: DateObject) => getMonth(new service(current, date))
    };
}

/**
 * Returns current month data
 * 
 * @private
 * @returns {Object}
 */
function getMonth(service: DateService) {
    return {
        longName: service.monthLong(),
        shortName: service.monthShort(),
        daysCount: service.daysCount(),
        startDayOfMonth: service.startDayOfMonth()
    };
}

/**
 * Returns current calendar month data
 * 
 * @private
 * @returns {Object}
 */
function getCalendarMonth(service: DateService, specialDaysService: SpecialDaysService['getSpecialDay']): CalendarPage {

    const prevMonth = service.prevMonth();
    const nextMonth = service.nextMonth();

    const days: CalendarDayType[][] = [];
    const daysCount = service.daysCount();
    const startDay = service.startDayOfMonth() - 1;

    const startNext = daysCount + startDay;
    // 31 -> 1
    var prev = prevMonth.daysCount() - startDay;
    var next = 1;
    var row: CalendarDayType[] = [];
    days.push(row);

    var maxCol = 7;
    var maxRow = 6;
    var cellCount = maxRow * maxCol;
    var localeDays = [];

    for (var i = 1; i <= cellCount; i++) {
        let isWeekend = false;
        let day: Partial<CalendarDayType>;

        if (i <= startDay) {
            day = {
                day: ++prev,
                month: 'previous',
            };

            isWeekend = prevMonth.isWeekend(day.day);
            day.specialDay = specialDaysService({ ...prevMonth.fromDay(day.day).toNormalizedObject() });
            day.localeDay = prevMonth.localeDate().setDay(day.day).getDate().day;
        } else if (i > startNext) {
            day = {
                day: next++,
                month: 'next',
            };
            isWeekend = nextMonth.isWeekend(day.day);
            day.specialDay = specialDaysService({ ...nextMonth.fromDay(day.day).toNormalizedObject() });
            day.localeDay = nextMonth.localeDate().setDay(day.day).getDate().day;
        } else {
            day = {
                day: i - startDay,
                month: 'current',
            };

            isWeekend = service.isWeekend(day.day);
            day.specialDay = specialDaysService({ ...service.fromDay(day.day).toNormalizedObject() });
            day.localeDay = service.localeDate().setDay(day.day).getDate().day;
        }

        isWeekend && (day.isWeekend = isWeekend);

        row.push(day as CalendarDayType);

        if (i > 0 && i % 7 == 0 && i !== cellCount) {
            row = [];
            days.push(row);
        }
    }

    return {
        // firstDayOfWeek: currentMonth.firstDayOfWeek(),
        longName: service.monthLong(),
        shortName: service.monthShort(),
        daysCount: service.daysCount(),
        startDayOfMonth: service.startDayOfMonth(),
        daysLong: service.weekdaysLong(),
        daysShort: service.weekdaysShort(),
        daysMin: service.weekdaysMin(),
        days,
        date: service.toObject(),
        localeDate: service.localeDate().getDate(),
        normalizedDate: service.toNormalizedObject(),
        previousMonth: {
            longName: prevMonth.monthLong(),
            shortName: prevMonth.monthShort(),
            daysCount: prevMonth.daysCount(),
            date: prevMonth.toObject(),
            normalizedDate: prevMonth.toNormalizedObject(),
            localeDate: prevMonth.localeDate().getDate(),
        },
        nextMonth: {
            longName: nextMonth.monthLong(),
            shortName: nextMonth.monthShort(),
            daysCount: nextMonth.daysCount(),
            date: nextMonth.toObject(),
            normalizedDate: nextMonth.toNormalizedObject(),
            localeDate: nextMonth.localeDate().getDate(),
        }
    };
}
