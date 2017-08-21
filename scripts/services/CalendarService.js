(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "./DateWrapper", "./DateWrapperHijri", "moment", "moment-hijri"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("./DateWrapper"), require("./DateWrapperHijri"), require("moment"), require("moment-hijri"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.DateWrapper, global.DateWrapperHijri, global.moment, global.momentHijri);
		global.CalendarService = mod.exports;
	}
})(this, function (exports, _DateWrapper, _DateWrapperHijri, _moment, _momentHijri) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = createService;
	exports.getWeek = getWeek;
	exports.changeGlobalLang = changeGlobalLang;

	var _DateWrapper2 = _interopRequireDefault(_DateWrapper);

	var _DateWrapperHijri2 = _interopRequireDefault(_DateWrapperHijri);

	var _moment2 = _interopRequireDefault(_moment);

	var _momentHijri2 = _interopRequireDefault(_momentHijri);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * Creates an calendar service
  * 
  * @returns {}
  */

	function createService() {
		var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "en";
		var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "gregorian";

		var service;
		var current;

		switch (type) {
			case 'gregorian':
				service = _DateWrapper2.default;
				current = _moment2.default;
				break;
			case 'hijri':
				service = _DateWrapperHijri2.default;
				current = _momentHijri2.default;
				break;
		}

		_moment2.default.lang(lang);

		return {
			getCalendarMonth: getCalendarMonth.bind(null, current, service),
			getMonth: getMonth.bind(null, current, service)
		};
	}

	function getMonth(moment, service, dt) {
		var dateService = new service(moment, dt);

		return {
			longName: dateService.monthLong(),
			shortName: dateService.monthShort(),
			daysCount: dateService.daysCount(),
			startDayOfMonth: dateService.startDayOfMonth()
		};
	}

	function getCalendarMonth(moment, service, dt) {
		var currentMonth = new service(moment, dt);

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
			daysLong: currentMonth.weekdaysLong(),
			daysShort: currentMonth.weekdaysShort(),
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

	function changeGlobalLang(dateService, lang) {
		dateService.locale(lang);
	}
});