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
		var daysCount = currentMonth.daysCount();
		var startDay = currentMonth.startDayOfMonth();
		var startNext = daysCount + startDay;
		// 31 -> 1
		var prev = prevMonth.daysCount() - startDay;
		var next = 1;
		var row = [];
		days.push(row);

		var maxCol = 7;
		var maxRow = 6;
		var cellCount = maxRow * maxCol;

		for (var i = 0; i < cellCount; i++) {
			var day = void 0;
			if (i < currentMonth.startDayOfMonth()) {
				day = {
					day: ++prev,
					month: 'previous',
					isSpecialDay: false
				};
			} else if (i >= startNext) {
				day = {
					day: next++,
					month: 'next',
					isSpecialDay: false
				};
			} else {
				day = {
					day: i - startDay + 1,
					month: 'current',
					isSpecialDay: false
				};
			}

			row.push(day);

			if (row.length === 1 || row.length === 7) {
				day.isWeekend = true;
			}

			if (i > 0 && (i + 1) % 7 == 0 && i !== cellCount - 1) {
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