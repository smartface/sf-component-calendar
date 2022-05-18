import DateService from './DateWrapper';
import DateServiceHijri, { MomentHijri } from './DateWrapperHijri';
import createSpecialDaysService, { SpecialDays, SpecialDaysData, SpecialDaysService } from './SpecialDaysService';
import moment from 'moment';
import 'moment/locale/ar-sa';
import momentHijri from 'moment-hijri';
import { DateObject } from '../core/DateObject';
import { CalendarDayType } from './CalendarDayType';

type currentMonth = DateService;
export type CalendarPageInnerMonth = {
  longName: string;
  shortName: string;
  daysCount: number;
  date: DateObject;
  normalizedDate: DateObject;
  localeDate: DateObject<string>;
};
export type CalendarPage = {
  tomonth: boolean;
  longName: string;
  shortName: string;
  daysCount: number;
  startDayOfMonth: number;
  daysLong: string[];
  daysShort: string[];
  daysMin: string[];
  days: CalendarDayType[][];
  date: DateObject;
  localeDate: DateObject<string>;
  normalizedDate: DateObject;
  previousMonth: CalendarPageInnerMonth;
  nextMonth: CalendarPageInnerMonth;
};

export type CalendarService = {
  setSpecialDaysService(specialDaysService: SpecialDaysData): void;
  getCalendarMonth: (date?: DateObject, today?: Date) => CalendarPage;
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
export default function buildCalendarService({
  lang = 'en',
  type = 'gregorian',
  specialDays = null,
  firstDayOfWeek = 0
}: {
  lang: string;
  type: string;
  specialDays: SpecialDaysData;
  firstDayOfWeek: number;
}): CalendarService {
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

  let specialDaysService = createSpecialDaysService(specialDays);

  return {
    setSpecialDaysService(specialDays: SpecialDaysData) {
      specialDaysService = createSpecialDaysService(specialDays);
    },
    /**
     * Returns current calendar month data
     */
    getCalendarMonth: (date: DateObject, today: Date = new Date()) =>
      getCalendarMonth(new service(current, date, today), (args: Parameters<ReturnType<typeof createSpecialDaysService>['getSpecialDay']>['0']) => {
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

  const today = service.today();

  const startNext = daysCount + startDay;
  // 31 -> 1
  let prev = prevMonth.daysCount() - startDay;
  let next = 1;
  let row: CalendarDayType[] = [];
  days.push(row);

  let maxCol = 7;
  let maxRow = 6;
  let cellCount = maxRow * maxCol;
  let localeDays = [];
  const current = service.toObject();

  for (let i = 1; i <= cellCount; i++) {
    let isWeekend = false;
    let dayData: CalendarDayType = {
      day: 0,
      isWeekend: false,
      localeDay: '',
      month: 'current',
      specialDay: [],
      today: false
    };

    if (i <= startDay) {
      dayData.day = ++prev;
      dayData.month = 'previous';

      isWeekend = prevMonth.isWeekend(dayData.day);
      dayData.specialDay = specialDaysService({
        ...prevMonth.fromDay(dayData.day).toNormalizedObject()
      });
      dayData.localeDay = prevMonth.localeDate().setDay(dayData.day).getDate().day;
    } else if (i > startNext) {
      dayData.day = next++;
      dayData.month = 'next';

      isWeekend = nextMonth.isWeekend(dayData.day);
      dayData.specialDay = specialDaysService({
        ...nextMonth.fromDay(dayData.day).toNormalizedObject()
      });
      dayData.localeDay = nextMonth.localeDate().setDay(dayData.day).getDate().day;
    } else {
      dayData.day = i - startDay;
      dayData.month = 'current';

      isWeekend = service.isWeekend(dayData.day);
      dayData.specialDay = specialDaysService({
        ...service.fromDay(dayData.day).toNormalizedObject()
      });
      dayData.localeDay = service.localeDate().setDay(dayData.day).getDate().day;

      if (today.date() === dayData.day && today.month() + 1 === current.month && today.year() === current.year) {
        dayData.today = true;
      }
    }

    isWeekend && (dayData.isWeekend = isWeekend);

    row.push(dayData);

    if (i > 0 && i % 7 == 0 && i !== cellCount) {
      row = [];
      days.push(row);
    }
  }

  return {
    // firstDayOfWeek: currentMonth.firstDayOfWeek(),
    tomonth: today.month() + 1 === current.month,
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
      localeDate: prevMonth.localeDate().getDate()
    },
    nextMonth: {
      longName: nextMonth.monthLong(),
      shortName: nextMonth.monthShort(),
      daysCount: nextMonth.daysCount(),
      date: nextMonth.toObject(),
      normalizedDate: nextMonth.toNormalizedObject(),
      localeDate: nextMonth.localeDate().getDate()
    }
  };
}
