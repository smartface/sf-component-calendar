(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["module", "exports", "./DateWrapper"], factory);
	} else if (typeof exports !== "undefined") {
		factory(module, exports, require("./DateWrapper"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports, global.DateWrapper);
		global.DateWrapperHijri = mod.exports;
	}
})(this, function (module, exports, _DateWrapper) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _DateWrapper2 = _interopRequireDefault(_DateWrapper);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function notValidDateThrowanError(moment, date) {
		if (moment(date).isValid()) {
			throw new Error("Specified date is not valid.");
		}
	}

	var HijriDateService = function (_DateService) {
		_inherits(HijriDateService, _DateService);

		function HijriDateService(moment, date) {
			_classCallCheck(this, HijriDateService);

			return _possibleConstructorReturn(this, _DateService.call(this, moment, date));
		}

		HijriDateService.prototype.weekOfYear = function weekOfYear() {
			return this._moment.week();
		};

		HijriDateService.prototype.clone = function clone() {
			return this._moment.clone();
		};

		HijriDateService.prototype.month = function month() {
			// 	date !== undefined 
			// 	  ? date.month(month)
			// 	  : month 
			// ? 
			return this._date.toObject().months;
			// month ? moment().month(month) : moment.toObject().months;
			// : date.toObject().monts;
		};

		HijriDateService.prototype.year = function year() {
			return this._date().iYear();
		};

		HijriDateService.prototype.day = function day() {
			return this._date().iDay();
		};

		HijriDateService.prototype.startDayOfMonth = function startDayOfMonth() {
			return this._date.clone().iDate(1).weekday();
		};

		HijriDateService.prototype.monthsShort = function monthsShort() {
			return this._date.localeData()._iMonthsShort;
		};

		HijriDateService.prototype.monthShort = function monthShort() {
			return this._date.format("iMMM");
		};

		HijriDateService.prototype.monthLong = function monthLong() {
			return this._date.format("iMMMM");
		};

		HijriDateService.prototype.monthsLong = function monthsLong() {
			return this._date.localeData()._iMonths;
		};

		HijriDateService.prototype.weekdaysShort = function weekdaysShort() {
			return this._moment.weekdaysShort();
		};

		HijriDateService.prototype.weekdaysLong = function weekdaysLong() {
			return this._moment.weekdays();
		};

		HijriDateService.prototype.daysCount = function daysCount() {
			return this._moment(this._date).locale("en").iDaysInMonth();
		};

		HijriDateService.prototype.nextMonth = function nextMonth() {
			return new HijriDateService(this._moment, this._date.clone().add(1, 'iMonth'));
		};

		HijriDateService.prototype.prevMonth = function prevMonth() {
			return new HijriDateService(this._moment, this._date.clone().subtract(1, 'iMonth'));
		};

		HijriDateService.prototype.prevYear = function prevYear() {
			return new HijriDateService(this._moment, this._date.clone().subtract(1, 'iYear'));
		};

		HijriDateService.prototype.nextYear = function nextYear() {
			return new HijriDateService(this._moment, this._date.clone().add(1, 'iYear'));
		};

		HijriDateService.prototype.toObject = function toObject() {
			// var dateObject = this._date.toObject();
			return {
				year: this._date.iYear(),
				day: this._date.iDate(),
				month: this._date.iMonth()
			};
		};

		return HijriDateService;
	}(_DateWrapper2.default);

	exports.default = HijriDateService;
	module.exports = exports["default"];
});