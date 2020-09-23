"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
function notValidDateThrowanError(moment, date) {
    if (moment(date)
        .isValid()) {
        throw new Error("Specified date is not valid.");
    }
}
var HijriDateService = /** @class */ (function (_super) {
    __extends(HijriDateService, _super);
    function HijriDateService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HijriDateService.prototype.month = function () {
        return this._date.format("iM");
    };
    HijriDateService.prototype.year = function () {
        return this._date.format("iYYYY");
    };
    HijriDateService.prototype.day = function () {
        return this._date.format("iD");
    };
    HijriDateService.prototype.localeDate = function () {
        var now = this._date.clone();
        var localeDate = { day: now.format("iD"), month: now.format("iM"), year: now.format("iYYYY") };
        return {
            setDay: function (day) {
                localeDate.day = now.month(0).date(day).format("D");
                return this;
            },
            setMonth: function (month) {
                localeDate.month = now.month(month).format("iM");
                return this;
            },
            setYear: function (year) {
                localeDate.month = now.year(year).format("iYYYY");
                return this;
            },
            getDate: function () {
                return __assign({}, localeDate);
            },
        };
        // return this._date.format("D-M-YYYY").toObject();
    };
    HijriDateService.prototype.isWeekend = function (day) {
        var wd = this._date.iDate(day).day();
        return wd === 4 || wd === 5;
    };
    HijriDateService.prototype.startDayOfMonth = function () {
        return this.clone().iDate(1).weekday() + 1;
    };
    HijriDateService.prototype.monthsShort = function () {
        return this._date.localeData()._iMonthsShort;
    };
    HijriDateService.prototype.monthShort = function () {
        return this._date.format("iMMM");
    };
    HijriDateService.prototype.monthLong = function () {
        return this._date.format("iMMMM");
    };
    HijriDateService.prototype.monthsLong = function () {
        return this._date.localeData()._iMonths;
    };
    HijriDateService.prototype.weekdaysShort = function () {
        return this._moment.weekdaysShort();
    };
    HijriDateService.prototype.weekdaysLong = function () {
        return this._moment.weekdays();
    };
    HijriDateService.prototype.daysCount = function () {
        return this._date.locale("en").iDaysInMonth();
    };
    HijriDateService.prototype.nextMonth = function () {
        return new HijriDateService(this._moment, this.clone().add(1, 'iMonth'));
    };
    HijriDateService.prototype.prevMonth = function () {
        return new HijriDateService(this._moment, this.clone().subtract(1, 'iMonth'));
    };
    HijriDateService.prototype.prevYear = function () {
        return new HijriDateService(this._moment, this.clone().subtract(1, 'iYear'));
    };
    HijriDateService.prototype.nextYear = function () {
        return new HijriDateService(this._moment, this.clone().add(1, 'iYear'));
    };
    HijriDateService.prototype.toObject = function () {
        return {
            year: this._date.iYear(),
            day: this._date.iDate().day(),
            month: this._date.iMonth() + 1
        };
    };
    HijriDateService.prototype.toNormalizedObject = function () {
        return {
            year: this._date.iYear(),
            day: this._date.iDate().day(),
            month: this._date.iMonth() + 1,
            calendar: "hijri",
            lang: this._lang
        };
    };
    return HijriDateService;
}(DateWrapper_1.default));
exports.default = HijriDateService;
//# sourceMappingURL=DateWrapperHijri.js.map