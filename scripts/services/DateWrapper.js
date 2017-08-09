(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "moment"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("moment"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.moment);
    global.DateWrapper = mod.exports;
  }
})(this, function (exports, moment) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.weekOfYear = weekOfYear;
  exports.clone = clone;
  exports.date = date;
  exports.monthsShort = monthsShort;
  exports.monthsLong = monthsLong;
  exports.weekdaysShort = weekdaysShort;
  exports.weekdaysLong = weekdaysLong;
  exports.prevYear = prevYear;
  exports.nextYear = nextYear;
  exports.dateLang = dateLang;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function notValidDateThrowanError(date) {
    if (moment(date).isValid()) {
      throw new Error("Specified date is not valid.");
    }
  }

  function weekOfYear(date) {
    return date.week();
  }

  function clone(date) {
    return date.clone();
  }

  function date() {
    var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _date = dt !== null ? typeof dt === "string" || dt instanceof Object ? moment(dt) : clone(dt) : moment();

    var dateObject = _date.toObject();

    var DateWrapper = function () {
      function DateWrapper() {
        _classCallCheck(this, DateWrapper);
      }

      DateWrapper.prototype.month = function month(num) {
        return num ? _month(num, _date) : dateObject.months;
      };

      DateWrapper.prototype.day = function day(num) {
        return num ? _day(num, _date) : dateObject.dates;
      };

      DateWrapper.prototype.year = function year(num) {
        return num ? _year(num, _date) : dateObject.years;
      };

      DateWrapper.prototype.startDayOfMonth = function startDayOfMonth() {
        return _startDayOfMonth(_date.clone().date(1));
      };

      DateWrapper.prototype.monthShort = function monthShort() {
        return monthsShort(_date);
      };

      DateWrapper.prototype.monthLong = function monthLong() {
        return monthsLong(_date);
      };

      DateWrapper.prototype.daysCount = function daysCount() {
        return _daysCount(_date);
      };

      DateWrapper.prototype.nextMonth = function nextMonth() {
        return date(_nextMonth(_date));
      };

      DateWrapper.prototype.prevMonth = function prevMonth() {
        return date(_prevMonth(_date));
      };

      DateWrapper.prototype.toString = function toString() {
        return _date.toString();
      };

      DateWrapper.prototype.toObject = function toObject() {
        return {
          year: dateObject.years,
          day: dateObject.date,
          month: dateObject.months
        };
      };

      return DateWrapper;
    }();

    return new DateWrapper();
  }

  function _month(month, date) {
    return date !== undefined ? date.month(month) : moment().month(month);
  }

  exports.month = _month;
  function _year(year, date) {
    return date !== undefined ? date.year(year) : moment().year(year);
  }

  exports.year = _year;
  function _day(year, date) {
    return date !== undefined ? date.day(year) : moment().day(year);
  }

  exports.day = _day;
  function _startDayOfMonth(date) {
    return date.weekday();
  }

  exports.startDayOfMonth = _startDayOfMonth;
  function monthsShort(date) {
    return date ? moment.monthsShort(date.month()) : moment.monthsShort();
  }

  function monthsLong(date) {
    return date ? moment.months(date.month()) : moment.months();
  }

  function weekdaysShort(date) {
    return date ? moment.weekdaysMin(date.weekday()) : moment.weekdaysMin();
  }

  function weekdaysLong(date) {
    return date ? moment.weekdays(date.weekday()) : moment.weekdays();
  }

  function _daysCount(date) {
    return date.daysInMonth();
  }

  exports.daysCount = _daysCount;
  function _nextMonth(date) {
    return date.clone().add(1, 'month');
  }

  exports.nextMonth = _nextMonth;
  function _prevMonth(date) {
    return date.clone().subtract(1, 'month');
  }

  exports.prevMonth = _prevMonth;
  function prevYear(date) {}

  function nextYear(date) {}

  function dateLang() {
    var sh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "en";

    return moment.locale(sh);
  }
});