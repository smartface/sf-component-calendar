"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateWrapper_1 = require("./DateWrapper");
var DateWrapperHijri_1 = require("./DateWrapperHijri");
var SpecialDaysService_1 = require("./SpecialDaysService");
var moment = require("moment");
require("moment/locale/ar-sa");
var moment_hijri_1 = require("moment-hijri");
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
function buildCalendarService(_a) {
    var _b = _a.lang, lang = _b === void 0 ? "en" : _b, _c = _a.type, type = _c === void 0 ? "gregorian" : _c, _d = _a.specialDays, specialDays = _d === void 0 ? null : _d, _e = _a.firstDayOfWeek, firstDayOfWeek = _e === void 0 ? 0 : _e;
    var service;
    var current;
    service = DateWrapper_1.default;
    current = moment;
    switch (type) {
        case 'hijri':
            service = DateWrapperHijri_1.default;
            current = moment_hijri_1.default;
            break;
    }
    current.locale(lang);
    var weekdays = current.localeData().weekdays();
    current.updateLocale(lang, {
        week: {
            dow: firstDayOfWeek,
            doy: 6
        }
    });
    var specialDaysService = SpecialDaysService_1.default(specialDays);
    return {
        /**
         * Returns current calendar month data
         */
        getCalendarMonth: function (date) { return getCalendarMonth(new service(current, date), function (args) {
            args.lang = lang;
            args.calendar = type;
            return specialDaysService.getSpecialDay(args);
        }); },
        /**
         * Returns current month data
         */
        getMonth: function (date) { return getMonth(new service(current, date)); }
    };
}
exports.default = buildCalendarService;
/**
 * Returns current month data
 *
 * @private
 * @returns {Object}
 */
function getMonth(service) {
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
function getCalendarMonth(service, specialDaysService) {
    var prevMonth = service.prevMonth();
    var nextMonth = service.nextMonth();
    var days = [];
    var daysCount = service.daysCount();
    var startDay = service.startDayOfMonth() - 1;
    var startNext = daysCount + startDay;
    // 31 -> 1
    var prev = prevMonth.daysCount() - startDay;
    var next = 1;
    var row = [];
    days.push(row);
    var maxCol = 7;
    var maxRow = 6;
    var cellCount = maxRow * maxCol;
    var localeDays = [];
    for (var i = 1; i <= cellCount; i++) {
        var isWeekend = false;
        var day = void 0;
        if (i <= startDay) {
            day = {
                day: ++prev,
                month: 'previous',
            };
            isWeekend = prevMonth.isWeekend(day.day);
            day.specialDay = specialDaysService(__assign({}, prevMonth.fromDay(day.day).toNormalizedObject()));
            day.localeDay = prevMonth.localeDate().setDay(day.day).getDate().day;
        }
        else if (i > startNext) {
            day = {
                day: next++,
                month: 'next',
            };
            isWeekend = nextMonth.isWeekend(day.day);
            day.specialDay = specialDaysService(__assign({}, nextMonth.fromDay(day.day).toNormalizedObject()));
            day.localeDay = nextMonth.localeDate().setDay(day.day).getDate().day;
        }
        else {
            day = {
                day: i - startDay,
                month: 'current',
            };
            isWeekend = service.isWeekend(day.day);
            day.specialDay = specialDaysService(__assign({}, service.fromDay(day.day).toNormalizedObject()));
            day.localeDay = service.localeDate().setDay(day.day).getDate().day;
        }
        isWeekend && (day.isWeekend = isWeekend);
        row.push(day);
        // if(row.length === 1 || row.length === 7) {
        // }
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
        days: days,
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
//# sourceMappingURL=CalendarService.js.map