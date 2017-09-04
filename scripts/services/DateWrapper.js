(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["module", "exports"], factory);
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
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function notValidDateThrowanError(date, strDate) {
		if (!date.isValid()) {
			throw new Error("[" + strDate + "] Specified date is not valid.");
		}
	}

	var DateService = function () {
		function DateService(moment, date) {
			var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "DD-MM-YYYY";

			_classCallCheck(this, DateService);

			this._moment = moment;

			if (moment.isMoment(date)) {
				this._date = date.clone();
			} else {
				if (date instanceof Object) {
					// date.month--;
					date.day = date.day || 1;
					date = date.day + "-" + date.month + "-" + date.year;
				}

				if (date) {
					this._date = moment(date, format);
					notValidDateThrowanError(this._date, date);
				}
			}
		}

		DateService.prototype.weekOfYear = function weekOfYear() {
			return this._moment.week();
		};

		DateService.prototype.clone = function clone() {
			return this._moment.clone();
		};

		DateService.prototype.localeDate = function localeDate() {
			var now = this._date.clone();

			return {
				setDay: function setDay(day) {
					now.date(day).format("D");
					return this;
				},
				setMonth: function setMonth(month) {
					now.month(month).format("M");
					return this;
				},
				setYear: function setYear(year) {
					now.year(year).format("YYYY");
					return this;
				},
				getDate: function getDate() {
					return { day: now.format("D"), month: now.format("M"), year: now.format("YYYY") };
				}
			};
			// return this._date.format("D-M-YYYY").toObject();
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
			return this._date.clone().date(1).weekday() + 1;
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
			return this._moment.weekdaysShort();
		};

		DateService.prototype.weekdaysMin = function weekdaysMin() {
			return this._moment.weekdaysMin();
		};

		DateService.prototype.weekdaysLong = function weekdaysLong() {
			return this._moment.weekdays();
		};

		DateService.prototype.daysCount = function daysCount() {
			return this._date.daysInMonth();
		};

		DateService.prototype.nextMonth = function nextMonth(moment, date) {
			var newdate = this._date.clone();
			newdate.add(1, 'month');
			return new DateService(this._moment, newdate);
		};

		DateService.prototype.prevMonth = function prevMonth(date) {
			var newdate = this._date.clone();
			newdate.subtract(1, 'month');
			return new DateService(this._moment, newdate);
		};

		DateService.prototype.prevYear = function prevYear(date) {};

		DateService.prototype.nextYear = function nextYear(date) {};

		DateService.prototype.dateLang = function dateLang() {
			var sh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "en";

			this._moment.updateLocale(sh);
		};

		DateService.prototype.toObject = function toObject() {
			var dateObject = this._date.toObject();
			return {
				year: dateObject.years,
				day: dateObject.date,
				month: ++dateObject.months
			};
		};

		DateService.prototype.toNormalizedObject = function toNormalizedObject() {
			var dateObject = this._date.toObject();

			return {
				year: dateObject.years,
				day: dateObject.date,
				month: ++dateObject.months
			};
		};

		DateService.prototype.dispose = function dispose() {
			this._date = null;
			this._moment = null;
		};

		return DateService;
	}();

	exports.default = DateService;
	module.exports = exports["default"];
});