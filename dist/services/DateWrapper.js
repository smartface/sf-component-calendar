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
var moment_1 = require("moment");
var moment = require("moment");
var instanceofDateObject_1 = require("./instanceofDateObject");
function notValidDateThrowanError(date, strDate) {
    if (!date.isValid()) {
        throw new Error("[" + strDate + "] Specified date is not valid.");
    }
}
function sortDays(days) {
    return function (num) { return days[num]; };
}
var DateService = /** @class */ (function () {
    function DateService(_moment, date) {
        this._moment = _moment;
        this._lang = "en";
        this.setDate(date, "DD-MM-YYYY");
        var firstDay = this.firstDayOfWeek();
        this.daysMap = [0, 1, 2, 3, 4, 5, 6].reduce(function (acc, num, index) {
            if (index >= firstDay) {
                acc[index - firstDay] = num;
            }
            else {
                acc[7 - firstDay + index] = num;
            }
            return acc;
        }, []);
    }
    DateService.prototype.setDate = function (date, format) {
        if (format === void 0) { format = "DD-MM-YYYY"; }
        if (moment_1.isMoment(date)) {
            this._date = date.clone();
        }
        else {
            var dateStr = void 0;
            if (instanceofDateObject_1.instanceofDateObject(date)) {
                // date.month--;
                date.day = date.day || 1;
                this._date = moment(date.day + "-" + date.month + "-" + date.year, format);
                this._date = moment(date, format);
                notValidDateThrowanError(this._date, date.day + "-" + date.month + "-" + date.year);
            }
            else if (date === undefined) {
                this._date = moment();
            }
            else {
                throw new Error("Invalid date object");
            }
        }
    };
    DateService.prototype.weekOfYear = function () {
        return this._date.weeks();
    };
    DateService.prototype.clone = function () {
        return this._date.clone();
    };
    DateService.prototype.localeDate = function () {
        var now = this._date.clone();
        // const localeDate = {dayName: now.dayName(),day: now.format("D"), month: now.format("M"), year: now.format("YYYY")};
        var localeDate = { day: now.format("D"), month: now.format("M"), year: now.format("YYYY") };
        return {
            setDay: function (day) {
                localeDate.day = now.month(0).date(day).format("D");
                return this;
            },
            setMonth: function (month) {
                localeDate.month = now.month(month).format("M");
                return this;
            },
            setYear: function (year) {
                localeDate.year = now.year(year).format("YYYY");
                return this;
            },
            getDate: function () {
                return __assign({}, localeDate);
            }
        };
        // return this._date.format("D-M-YYYY").toObject();
    };
    DateService.prototype.nextDay = function () {
        var newdate = this._date.clone();
        newdate.add(1, 'day');
        return new DateService(this._moment, newdate);
    };
    DateService.prototype.prevDay = function () {
        var newdate = this._date.clone();
        newdate.subtract(1, 'day');
        return new DateService(this._moment, newdate);
    };
    DateService.prototype.fromDay = function (day) {
        var newdate = this._date.clone().date(day);
        return new DateService(this._moment, newdate);
    };
    DateService.prototype.month = function () {
        return this._date.format("M");
        ;
    };
    DateService.prototype.year = function () {
        return this._date.format("YYYY");
    };
    DateService.prototype.day = function () {
        return this._date.format("D");
    };
    DateService.prototype.startDayOfMonth = function () {
        return this._date.clone().date(1).weekday() + 1;
    };
    DateService.prototype.monthsShort = function () {
        return this._moment.monthsShort();
    };
    DateService.prototype.monthShort = function () {
        return this._moment.monthsShort(this._date.month());
    };
    DateService.prototype.monthLong = function () {
        return this._moment.months(this._date.month());
    };
    DateService.prototype.monthsLong = function () {
        return this._moment.months();
    };
    DateService.prototype.weekdaysShort = function () {
        return this.daysMap.map(sortDays(this._moment.localeData().weekdaysShort()));
    };
    DateService.prototype.weekdaysMin = function () {
        return this.daysMap.map(sortDays(this._moment.localeData().weekdaysMin()));
    };
    DateService.prototype.weekdaysLong = function () {
        return this.daysMap.map(sortDays(this._moment.localeData().weekdays()));
    };
    DateService.prototype.firstDayOfWeek = function () {
        return this._moment.localeData().firstDayOfWeek();
    };
    DateService.prototype.daysCount = function () {
        return this._date.daysInMonth();
    };
    DateService.prototype.nextMonth = function () {
        var newdate = this._date.clone();
        newdate.add(1, 'month');
        return new DateService(this._moment, newdate);
    };
    DateService.prototype.prevMonth = function () {
        var newdate = this._date.clone();
        newdate.subtract(1, 'month');
        return new DateService(this._moment, newdate);
    };
    DateService.prototype.prevYear = function () { };
    DateService.prototype.nextYear = function () { };
    DateService.prototype.isWeekend = function (day) {
        var wd = this._date.clone().date(day).day();
        return wd === 0 || wd === 6;
    };
    DateService.prototype.setDateLang = function (lang) {
        if (lang === void 0) { lang = "en"; }
        this._lang = lang;
        this._moment.updateLocale(lang, null);
    };
    DateService.prototype.toObject = function () {
        var dateObject = this._date.toObject();
        return {
            year: dateObject.years,
            day: dateObject.date,
            month: ++dateObject.months
        };
    };
    DateService.prototype.toNormalizedObject = function () {
        var dateObject = this._date.toObject();
        return {
            year: dateObject.years,
            day: dateObject.date,
            month: ++dateObject.months,
            calendar: "gregorian",
            lang: this._lang
        };
    };
    DateService.prototype.dispose = function () {
        this._date = null;
        this._moment = null;
    };
    return DateService;
}());
exports.default = DateService;
//# sourceMappingURL=DateWrapper.js.map