(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './DateWrapper'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./DateWrapper'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.DateWrapper);
    global.CalendarService = mod.exports;
  }
})(this, function (exports, _DateWrapper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getMonth = getMonth;
  exports.getCalendarMonth = getCalendarMonth;
  exports.getWeek = getWeek;
  exports.changeGlobalLang = changeGlobalLang;

  var DateWrapper = _interopRequireWildcard(_DateWrapper);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function getMonth(dt) {
    var date = DateWrapper.date(dt);

    return {
      longName: date.monthLong(),
      shortName: date.monthShort(),
      daysCount: date.daysCount(),
      startDayOfMonth: date.startDayOfMonth()
    };
  }

  function getCalendarMonth(dt) {
    var currentMonth = DateWrapper.date(dt);
    var prevMonth = currentMonth.prevMonth();
    var nextMonth = currentMonth.nextMonth();

    var days = [];
    var prev = prevMonth.daysCount() - currentMonth.startDayOfMonth() + 1;
    var next = 1;
    var row = [];
    days.push(row);

    var maxCol = 7;
    var maxRow = 5;
    var cellCount = maxRow * maxCol;

    for (var i = 1; i <= cellCount; i++) {
      if (i <= currentMonth.startDayOfMonth()) {
        row.push(prev++);
      } else if (i > currentMonth.daysCount() + 1) {
        row.push(next++);
      } else {
        row.push(i - currentMonth.startDayOfMonth());
      }

      if (i % 7 == 0 && cellCount !== i) {
        row = [];
        days.push(row);
      }
    }

    return {
      longName: currentMonth.monthLong(),
      shortName: currentMonth.monthShort(),
      daysCount: currentMonth.daysCount(),
      startDayOfMonth: currentMonth.startDayOfMonth(),
      daysLong: DateWrapper.weekdaysLong(),
      daysShort: DateWrapper.weekdaysShort(),
      days: days,
      date: currentMonth.toObject(),
      previousMonth: {
        longName: prevMonth.monthLong(),
        shortName: prevMonth.monthShort(),
        daysCount: prevMonth.daysCount(),
        date: prevMonth.toObject()
      },
      nextMonth: {
        longName: nextMonth.monthLong(),
        shortName: nextMonth.monthShort(),
        daysCount: nextMonth.daysCount(),
        date: nextMonth.toObject()
      }
    };
  }

  function getWeek() {}

  function changeGlobalLang(lang) {
    DateWrapper.locale(lang);
  }
});