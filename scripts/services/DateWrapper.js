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
  exports.day = day;
  exports.weekOfYear = weekOfYear;
  exports.date = date;
  exports.month = month;
  exports.startDayOfMonth = startDayOfMonth;
  exports.monthsShort = monthsShort;
  exports.monthsLong = monthsLong;
  exports.weekdaysShort = weekdaysShort;
  exports.weekdaysLong = weekdaysLong;
  exports.daysInMonth = daysInMonth;
  exports.nextMonth = nextMonth;
  exports.prevMonth = prevMonth;
  exports.prevYear = prevYear;
  exports.nextYear = nextYear;
  exports.dateLang = dateLang;


  function notValidDateThrowanError(date) {
    if (moment(date).isValid()) {
      throw new Error("Specified date is not valid.");
    }
  }

  function day(date) {
    return date.week();
  }

  function weekOfYear(date) {
    return date.week();
  }

  function date() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    return str ? moment(str) : moment();
  }

  function month(num, date) {
    return date !== undefined ? moment(date).month(num) : moment().month(num);
  }

  function startDayOfMonth(date) {
    return date.weekday();
  }

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

  function daysInMonth(date) {
    return date.daysInMonth();
  }

  function nextMonth(date) {
    return moment();
  }

  function prevMonth(date) {}

  function prevYear(date) {}

  function nextYear(date) {}

  function dateLang() {
    var sh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "en";

    return moment.locale(sh);
  }
});