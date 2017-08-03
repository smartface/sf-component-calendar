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

  function getMonth(month, year) {
    var date = DateWrapper.date(month, year);

    return {
      longName: DateWrapper.monthsLong(month),
      shortName: DateWrapper.monthsShort(month),
      daysInMonth: DateWrapper.daysInMonth(month),
      startDayOfMonth: DateWrapper.startDayOfMonth(month)
    };
  }
  
  function getCalendarMonth(month){
    const prevMonth = getMonth(month-1);
    const month = getMonth(month);
		const days = []
		var prev = 32 - month.startDayOfMonth;
		var next = 1;
		var row = [];
		days.push(row);
		
		for(var i=1; i <= 35; i++){
			if(i <= month.startDayOfMonth){
				row.push(prev++);
			} else if(i > month.daysInMonth){
				row.push(next++);
			} else {
				row.push(i - month.startDayOfMonth);
			}

			if(i%7 == 0){
				row = [];
				days.push(row);
			}
		}
		
		return {
      daysLong: DateWrapper.weekdaysLong(),
      daysShort: DateWrapper.weekdaysShort(),
		  
		}
  }

  function getWeek() {}

  function changeGlobalLang(lang) {
    DateWrapper.locale(lang);
  }
});