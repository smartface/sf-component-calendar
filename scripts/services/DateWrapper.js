(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['module', 'exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(module, exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports);
		global.DateWrapper = mod.exports;
	}
})(this, function (module, exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function notValidDateThrowanError(moment, date) {
		if (moment(date).isValid()) {
			throw new Error("Specified date is not valid.");
		}
	}

	/*export function date(moment, dt = null) {
 	moment = moment || require("moment");
 
 	const _date = dt !== null ?
 		typeof dt === "string" || dt instanceof Object ?
 		moment(dt) :
 		clone(dt) :
 		moment();
 
 	const dateObject = _date.toObject();
 
 	class DateWrapper {
 		month(num) {
 			return num ? month.call(null, moment, num, _date) : dateObject.months;
 		}
 
 		day(num) {
 			return num ? day.call(null, moment, num, _date) : dateObject.dates;
 		}
 
 		year(num) {
 			return num ? year.call(null, moment, num, _date) : dateObject.years;
 		}
 
 		startDayOfMonth() {
 			return startDayOfMonth(_date.clone()
 				.date(1));
 		}
 
 		monthShort() {
 			return monthsShort.call(null, moment, _date);
 		}
 
 		monthLong() {
 			return monthsLong.call(null, moment, _date);
 		}
 
 		daysCount() {
 			return daysCount(_date);
 		}
 
 		nextMonth() {
 			return date(nextMonth(_date));
 		}
 
 		prevMonth() {
 			return date.call(null, moment, prevMonth(_date));
 		}
 
 		toString() {
 			return _date.toString();
 		}
 
 		toObject() {
 			return {
 				year: dateObject.years,
 				day: dateObject.date,
 				month: dateObject.months
 			};
 		}
 	}
 
 	return new DateWrapper();
 }*/

	/*export function dateScope(moment) {
   return function dateCaller(fn, dt=null){
     const _date = dt !== null
       ? typeof dt === "string" || dt instanceof Object
     		? moment(dt)
     		: clone(dt)
   		: moment();
 		
 		const args = arguments.length > 1 ? [moment, ...Array.prototype.slice.call(arguments, 2), _date] : [moment];
     return fn.apply(null, args);
   };
 }
 */
	// export function 

	var DateService = function () {
		function DateService(moment, date) {
			_classCallCheck(this, DateService);

			this._moment = moment;
			this._date = moment(date);
		}

		DateService.prototype.weekOfYear = function weekOfYear() {
			return this._moment.week();
		};

		DateService.prototype.clone = function clone() {
			return this._moment.clone();
		};

		DateService.prototype.month = function month() {
			// 	date !== undefined 
			// 	  ? date.month(month)
			// 	  : month 
			// ? 
			return this._date.toObject().months;
			// month ? moment().month(month) : moment.toObject().months;
			// : date.toObject().monts;
		};

		DateService.prototype.year = function year() {
			return this._date().year();
		};

		DateService.prototype.day = function day(_day, date) {
			return this._date().day();
		};

		DateService.prototype.startDayOfMonth = function startDayOfMonth() {
			return this._date.clone().date(1).weekday();
		};

		DateService.prototype.monthsShort = function monthsShort() {
			return this._moment.monthsShort();
		};

		DateService.prototype.monthShort = function monthShort() {
			return this._moment.monthsShort(this._date.month());
		};

		DateService.prototype.monthLong = function monthLong() {
			return this._moment.months(this._date.month());
		};

		DateService.prototype.monthsLong = function monthsLong() {
			return this._moment.months();
		};

		DateService.prototype.weekdaysShort = function weekdaysShort() {
			return this._moment.weekdaysMin();
		};

		DateService.prototype.weekdaysLong = function weekdaysLong() {
			return this._moment.weekdays();
		};

		DateService.prototype.daysCount = function daysCount() {
			return this._date.daysInMonth();
		};

		DateService.prototype.nextMonth = function nextMonth(moment, date) {
			return new DateService(this._moment, this._date.clone().add(1, 'month'));
		};

		DateService.prototype.prevMonth = function prevMonth(date) {
			return new DateService(this._moment, this._date.clone().subtract(1, 'month'));
		};

		DateService.prototype.prevYear = function prevYear(date) {};

		DateService.prototype.nextYear = function nextYear(date) {};

		DateService.prototype.dateLang = function dateLang() {
			var sh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "en";

			return this._moment.locale(sh);
		};

		DateService.prototype.toObject = function toObject() {
			var dateObject = this._date.toObject();
			return {
				year: dateObject.years,
				day: dateObject.date,
				month: dateObject.months
			};
		};

		DateService.prototype.dispose = function dispose() {
			this._date = null;
			this._moment = null;
		};

		return DateService;
	}();

	exports.default = DateService;
	module.exports = exports['default'];
});