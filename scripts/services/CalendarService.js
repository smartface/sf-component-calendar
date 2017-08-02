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

  function getMonth() {
    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var month = DateWrapper.date(num);

    return {
      longName: DateWrapper.monthsLong(month),
      shortName: DateWrapper.monthsShort(month),
      daysInMonth: DateWrapper.daysInMonth(month),
      daysLong: DateWrapper.weekdaysLong(),
      daysShort: DateWrapper.weekdaysShort(),
      startDayOfMonth: DateWrapper.startDayOfMonth()
    };
  }

  function getWeek() {}

  function changeGlobalLang(lang) {
    DateWrapper.locale(lang);
  }
});